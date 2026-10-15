import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lock,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";
import products from "../../data/products";
import {
  createBuyNowOrder,
  verifyRazorpayPayment,
} from "../../api/orders";
import { useAuth } from "../../context/AuthContext";

const RAZORPAY_SCRIPT_URL =
  "https://checkout.razorpay.com/v1/checkout.js";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true), {
        once: true,
      });
      existingScript.addEventListener("error", () => resolve(false), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });

function BuyNowCheckout() {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading: authLoading, isAuthenticated } = useAuth();

  const product = useMemo(
    () =>
      products.find(
        (item) =>
          String(item.id) === String(productId) ||
          String(item.slug || "") === String(productId)
      ),
    [productId]
  );

  const requestedQuantity = Number(searchParams.get("quantity") || 1);
  const quantity =
    Number.isInteger(requestedQuantity) && requestedQuantity >= 1
      ? Math.min(requestedQuantity, 20)
      : 1;

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentState, setPaymentState] = useState("idle");

  useEffect(() => {
    if (!user) return;

    setForm((current) => ({
      ...current,
      name: current.name || user.name || "",
      email: current.email || user.email || "",
      phone: current.phone || user.phone || "",
    }));
  }, [user]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", {
        replace: true,
        state: {
          from: `/buy-now/${productId}?quantity=${quantity}`,
        },
      });
    }
  }, [
    authLoading,
    isAuthenticated,
    navigate,
    productId,
    quantity,
  ]);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));

    setSubmitError("");
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Full name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    }

    if (!form.addressLine1.trim()) {
      nextErrors.addressLine1 = "Address is required.";
    }

    if (!form.city.trim()) {
      nextErrors.city = "City is required.";
    }

    if (!form.state.trim()) {
      nextErrors.state = "State is required.";
    }

    if (!form.postalCode.trim()) {
      nextErrors.postalCode = "PIN code is required.";
    } else if (!/^\d{6}$/.test(form.postalCode.trim())) {
      nextErrors.postalCode = "Enter a valid 6-digit PIN.";
    }

    if (!form.country.trim()) {
      nextErrors.country = "Country is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const pollPaymentStatus = async (orderId) => {
    const API_BASE_URL =
      import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    const token = localStorage.getItem("touch-energy-token");

    for (let attempt = 0; attempt < 15; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        const response = await fetch(
          `${API_BASE_URL}/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json().catch(() => ({}));

        if (!response.ok || !data.success) {
          continue;
        }

        const currentOrder = data.order;

        if (currentOrder?.paymentStatus === "PAID") {
          setPaymentState("success");
          setPaymentMessage(
            "Payment confirmed successfully. Your order has been placed."
          );
          return;
        }

        if (currentOrder?.paymentStatus === "FAILED") {
          setPaymentState("failed");
          setPaymentMessage(
            "The payment was not completed. Please try again."
          );
          return;
        }
      } catch {
        // Continue polling because webhook confirmation can take a moment.
      }
    }

    setPaymentState("pending");
    setPaymentMessage(
      "Payment was submitted. Confirmation is still pending. You can check the order status from your account."
    );
  };

  const handlePayment = async () => {
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");
    setPaymentMessage("");
    setPaymentState("idle");

    try {
      const razorpayLoaded = await loadRazorpayScript();

      if (!razorpayLoaded) {
        throw new Error(
          "Unable to load Razorpay Checkout. Please check your internet connection and try again."
        );
      }

      const result = await createBuyNowOrder({
        productId,
        quantity,
        customerEmail: form.email.trim(),
        shippingAddress: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          addressLine1: form.addressLine1.trim(),
          addressLine2: form.addressLine2.trim(),
          city: form.city.trim(),
          state: form.state.trim(),
          postalCode: form.postalCode.trim(),
          country: form.country.trim(),
        },
      });

      const razorpayData = result.razorpay;
      const mongoOrderId = result.order?.id;

      if (!razorpayData?.orderId || !razorpayData?.keyId || !mongoOrderId) {
        throw new Error(
          "The server did not return a valid payment order."
        );
      }

      const options = {
        key: razorpayData.keyId,
        amount: razorpayData.amount,
        currency: razorpayData.currency || "INR",
        name: "Touch Energy Technologies Pvt. Ltd.",
        description: product?.name || "Touch Energy Product",
        order_id: razorpayData.orderId,

        prefill: {
          name: form.name.trim(),
          email: form.email.trim(),
          contact: form.phone.trim(),
        },

        notes: {
          mongoOrderId: String(mongoOrderId),
          productId: String(productId),
        },

        theme: {
          color: "#111827",
        },

        handler: async (paymentResponse) => {
          try {
            setPaymentState("verifying");
            setPaymentMessage("Verifying your payment securely...");

            await verifyRazorpayPayment({
              ...paymentResponse,
              orderId: mongoOrderId,
            });

            setPaymentMessage(
              "Payment received. Waiting for final confirmation..."
            );

            await pollPaymentStatus(mongoOrderId);
          } catch (error) {
            setPaymentState("failed");
            setPaymentMessage(
              error.message || "Unable to verify the payment."
            );
          } finally {
            setIsSubmitting(false);
          }
        },

        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
            setPaymentState("idle");
            setPaymentMessage(
              "Payment window was closed. Your order has not been marked as paid."
            );
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        setIsSubmitting(false);
        setPaymentState("failed");
        setPaymentMessage(
          response?.error?.description ||
            "Payment failed. Please try again."
        );
      });

      razorpay.open();
    } catch (error) {
      setIsSubmitting(false);
      setPaymentState("failed");
      setSubmitError(
        error.message || "Unable to start the payment."
      );
    }
  };

  if (authLoading) {
    return (
      <main className="checkout-page">
        <section className="container">
          <div className="checkout-form-card">
            <p>Loading account...</p>
          </div>
        </section>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!product) {
    return (
      <main className="checkout-page">
        <section className="container">
          <section className="checkout-empty">
            <div className="checkout-empty-icon">
              <ShoppingBag size={28} />
            </div>
            <h1>Product unavailable</h1>
            <p>
              The product you selected is no longer available.
            </p>
            <Link to="/#products" className="checkout-primary-button">
              Back to products
              <ArrowRight size={17} />
            </Link>
          </section>
        </section>
      </main>
    );
  }

  const displayPrice =
    typeof product.price === "number"
      ? product.price * quantity
      : null;

  if (paymentState === "success") {
    return (
      <main className="checkout-page">
        <section className="container">
          <motion.section
            className="checkout-empty"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="checkout-empty-icon">
              <Check size={30} />
            </div>

            <h1>Payment successful</h1>

            <p>{paymentMessage}</p>

            <div className="checkout-payment active">
              <Lock size={17} />
              <span>Your payment has been confirmed.</span>
            </div>

            <Link to="/account" className="checkout-primary-button">
              View my orders
              <ArrowRight size={17} />
            </Link>
          </motion.section>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <section className="checkout-hero">
        <div className="checkout-glow" />

        <div className="container">
          <Link to={`/products/${productId}`} className="checkout-back">
            <ArrowLeft size={16} />
            Back to product
          </Link>

          <div className="checkout-heading">
            <span>SECURE CHECKOUT</span>
            <h1>Complete your purchase</h1>
            <p>
              Enter your delivery details and continue securely with
              Razorpay.
            </p>
          </div>
        </div>
      </section>

      <section className="container checkout-grid">
        <motion.div
          className="checkout-form-card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="checkout-card-heading">
            <div>
              <span>DELIVERY DETAILS</span>
              <h2>Where should we deliver?</h2>
            </div>
          </div>

          <div className="checkout-fields">
            <div className="checkout-field">
              <label htmlFor="buy-name">Full name *</label>
              <input
                id="buy-name"
                value={form.name}
                onChange={(event) =>
                  updateField("name", event.target.value)
                }
                placeholder="Enter your full name"
              />
              {errors.name && <small>{errors.name}</small>}
            </div>

            <div className="checkout-field">
              <label htmlFor="buy-email">Email *</label>
              <input
                id="buy-email"
                type="email"
                value={form.email}
                onChange={(event) =>
                  updateField("email", event.target.value)
                }
                placeholder="you@example.com"
              />
              {errors.email && <small>{errors.email}</small>}
            </div>

            <div className="checkout-field">
              <label htmlFor="buy-phone">Phone *</label>
              <input
                id="buy-phone"
                type="tel"
                value={form.phone}
                onChange={(event) =>
                  updateField("phone", event.target.value)
                }
                placeholder="10-digit mobile number"
              />
              {errors.phone && <small>{errors.phone}</small>}
            </div>

            <div className="checkout-field full">
              <label htmlFor="buy-address">Address *</label>
              <input
                id="buy-address"
                value={form.addressLine1}
                onChange={(event) =>
                  updateField("addressLine1", event.target.value)
                }
                placeholder="House / building / street"
              />
              {errors.addressLine1 && (
                <small>{errors.addressLine1}</small>
              )}
            </div>

            <div className="checkout-field full">
              <label htmlFor="buy-address2">
                Address line 2
              </label>
              <input
                id="buy-address2"
                value={form.addressLine2}
                onChange={(event) =>
                  updateField("addressLine2", event.target.value)
                }
                placeholder="Area / landmark (optional)"
              />
            </div>

            <div className="checkout-field">
              <label htmlFor="buy-city">City *</label>
              <input
                id="buy-city"
                value={form.city}
                onChange={(event) =>
                  updateField("city", event.target.value)
                }
                placeholder="City"
              />
              {errors.city && <small>{errors.city}</small>}
            </div>

            <div className="checkout-field">
              <label htmlFor="buy-state">State *</label>
              <input
                id="buy-state"
                value={form.state}
                onChange={(event) =>
                  updateField("state", event.target.value)
                }
                placeholder="State"
              />
              {errors.state && <small>{errors.state}</small>}
            </div>

            <div className="checkout-field">
              <label htmlFor="buy-postal">PIN code *</label>
              <input
                id="buy-postal"
                inputMode="numeric"
                maxLength={6}
                value={form.postalCode}
                onChange={(event) =>
                  updateField(
                    "postalCode",
                    event.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="6-digit PIN"
              />
              {errors.postalCode && (
                <small>{errors.postalCode}</small>
              )}
            </div>

            <div className="checkout-field">
              <label htmlFor="buy-country">Country *</label>
              <input
                id="buy-country"
                value={form.country}
                onChange={(event) =>
                  updateField("country", event.target.value)
                }
                placeholder="Country"
              />
              {errors.country && (
                <small>{errors.country}</small>
              )}
            </div>
          </div>

          {submitError && (
            <p className="checkout-demo-note">
              {submitError}
            </p>
          )}

          {paymentMessage && (
            <p className="checkout-secure-note">
              {paymentMessage}
            </p>
          )}

          <button
            type="button"
            className="checkout-place-button"
            onClick={handlePayment}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Processing..."
              : `Pay securely${
                  displayPrice != null
                    ? ` · ₹${displayPrice.toLocaleString("en-IN")}`
                    : ""
                }`}
            {!isSubmitting && <ArrowRight size={18} />}
          </button>

          <div className="checkout-secure-note">
            <Lock size={16} />
            <span>
              Your payment is processed securely by Razorpay.
            </span>
          </div>
        </motion.div>

        <motion.aside
          className="checkout-summary-card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <div className="checkout-summary-heading">
            <span>YOUR PRODUCT</span>
            <h2>Order summary</h2>
          </div>

          <div className="checkout-summary-items">
            <div className="checkout-summary-item">
              <div className="checkout-summary-image">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                ) : (
                  <ShoppingBag size={22} />
                )}
              </div>

              <div>
                <strong>{product.name}</strong>
                <span>Quantity: {quantity}</span>
              </div>
            </div>
          </div>

          <div className="checkout-summary-divider" />

          <div className="checkout-total-row">
            <span>Product subtotal</span>
            <strong>
              {displayPrice != null
                ? `₹${displayPrice.toLocaleString("en-IN")}`
                : "Price on Request"}
            </strong>
          </div>

          <div className="checkout-total-row muted">
            <span>Shipping</span>
            <span>Calculated later</span>
          </div>

          <div className="checkout-grand-total">
            <span>Total payable</span>
            <strong>
              {displayPrice != null
                ? `₹${displayPrice.toLocaleString("en-IN")}`
                : "Calculated by server"}
            </strong>
          </div>

          <p className="checkout-demo-note">
            The final payment amount is calculated and validated by
            the Touch Energy server. The price shown here is only a
            product summary.
          </p>
        </motion.aside>
      </section>
    </main>
  );
}

export default BuyNowCheckout;
