import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  createCartBuyNowOrder,
  verifyRazorpayPayment,
} from "../../api/orders";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

function Checkout({
  cartItems,
  onIncrease,
  onDecrease,
  onClear,
}) {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pin: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [paymentState, setPaymentState] = useState("idle");
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paidOrderId, setPaidOrderId] = useState("");

  const hasUnpricedItems = cartItems.some(
    (item) => item.price == null
  );

  const subtotal = hasUnpricedItems
    ? null
    : cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

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
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    }

    if (!form.address.trim()) {
      nextErrors.address = "Address is required.";
    }

    if (!form.city.trim()) {
      nextErrors.city = "City is required.";
    }

    if (!form.state.trim()) {
      nextErrors.state = "State is required.";
    }

    if (!form.pin.trim()) {
      nextErrors.pin = "PIN code is required.";
    } else if (!/^\d{6}$/.test(form.pin)) {
      nextErrors.pin = "Enter a valid 6-digit PIN.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const getOrderStatus = async (orderId) => {
    const token = localStorage.getItem("touch-energy-token");

    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Unable to check payment status."
      );
    }

    return data.order;
  };

  const waitForPaymentConfirmation = async (orderId) => {
    const maxAttempts = 15;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        const order = await getOrderStatus(orderId);

        if (order?.paymentStatus === "PAID") {
          return order;
        }

        if (order?.paymentStatus === "FAILED") {
          throw new Error(
            "The payment was marked as failed. Please try again."
          );
        }
      } catch (error) {
        if (attempt === maxAttempts) {
          throw error;
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    return null;
  };

  const handlePlaceOrder = async () => {
    if (!validate() || isSubmitting) {
      return;
    }

    if (cartItems.length === 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setPaymentState("idle");
    setPaymentMessage("");

    try {
      const razorpayLoaded = await loadRazorpayScript();

      if (!razorpayLoaded) {
        throw new Error(
          "Unable to load the Razorpay payment window. Please check your internet connection and try again."
        );
      }

      const orderData = {
        customerEmail: form.email.trim(),
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        shippingAddress: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          addressLine1: form.address.trim(),
          addressLine2: "",
          city: form.city.trim(),
          state: form.state.trim(),
          postalCode: form.pin.trim(),
          country: "India",
        },
      };

      setPaymentState("creating");
      setPaymentMessage("Creating your secure payment order...");

      const result = await createCartBuyNowOrder(orderData);

      const savedOrder = result?.order;
      const razorpayOrder = result?.razorpay;

      if (!savedOrder?._id) {
        throw new Error(
          "The server did not return a valid order reference."
        );
      }

      if (!razorpayOrder?.orderId || !razorpayOrder?.keyId) {
        throw new Error(
          "The payment gateway order was not created correctly."
        );
      }

      setPaymentState("checkout");
      setPaymentMessage("Opening secure payment...");

      const options = {
        key: razorpayOrder.keyId,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency || "INR",
        name: "Touch Energy",
        description: "Touch Energy product purchase",
        order_id: razorpayOrder.orderId,

        prefill: {
          name: form.name.trim(),
          email: form.email.trim(),
          contact: form.phone.trim(),
        },

        notes: {
          touchEnergyOrderId: String(savedOrder._id),
        },

        theme: {
          color: "#111111",
        },

        handler: async (response) => {
          try {
            setPaymentState("verifying");
            setPaymentMessage(
              "Payment received. Waiting for secure confirmation..."
            );

            await verifyRazorpayPayment({
              orderId: savedOrder._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            setPaymentState("confirming");
            setPaymentMessage(
              "Payment submitted. Confirming your order..."
            );

            const confirmedOrder =
              await waitForPaymentConfirmation(savedOrder._id);

            if (!confirmedOrder) {
              setPaymentState("pending");
              setPaymentMessage(
                "Your payment was submitted successfully, but confirmation is still pending. Please check your account shortly."
              );
              return;
            }

            setPaidOrderId(savedOrder._id);
            setPaymentState("paid");
            setPaymentMessage(
              "Payment confirmed successfully."
            );

            onClear();
          } catch (error) {
            setPaymentState("failed");
            setSubmitError(
              error.message ||
                "Payment verification could not be completed. Please contact Touch Energy support."
            );
          } finally {
            setIsSubmitting(false);
          }
        },

        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
            setPaymentState("idle");
            setPaymentMessage("");
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        const description =
          response?.error?.description ||
          "The payment could not be completed.";

        setIsSubmitting(false);
        setPaymentState("failed");
        setSubmitError(description);
        setPaymentMessage("");
      });

      razorpay.open();
    } catch (error) {
      setIsSubmitting(false);
      setPaymentState("failed");
      setSubmitError(
        error.message ||
          "Could not create the payment order. Please try again."
      );
      setPaymentMessage("");
    }
  };

  if (authLoading) {
    return (
      <main className="auth-page">
        <p>Loading account...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: "/checkout" }}
        replace
      />
    );
  }

  if (cartItems.length === 0 && paymentState !== "paid") {
    return (
      <main className="checkout-page">
        <section className="checkout-empty">
          <div className="container">
            <div className="checkout-empty-icon">
              <ShoppingBag size={28} strokeWidth={1.4} />
            </div>

            <span>YOUR CART IS EMPTY</span>

            <h1>
              Nothing to check out
              <strong>yet.</strong>
            </h1>

            <p>
              Explore the Touch Energy range and choose the
              inverter that fits your home.
            </p>

            <Link
              to="/#products"
              className="checkout-primary-button"
            >
              Explore our products
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (paymentState === "paid") {
    return (
      <main className="checkout-page">
        <section className="checkout-empty">
          <div className="container">
            <div className="checkout-empty-icon">
              <Check size={28} strokeWidth={1.6} />
            </div>

            <span>PAYMENT CONFIRMED</span>

            <h1>
              Your order is
              <strong>confirmed.</strong>
            </h1>

            <p>
              Your payment has been confirmed successfully.
              Your Touch Energy order is now being processed.
            </p>

            {paidOrderId && (
              <p>
                Order reference: <strong>{paidOrderId}</strong>
              </p>
            )}

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                className="checkout-primary-button"
                onClick={() => navigate("/account")}
              >
                View my account
                <ArrowRight size={17} />
              </button>

              <Link
                to="/#products"
                className="checkout-primary-button"
              >
                Continue shopping
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <section className="checkout-hero">
        <div className="checkout-glow" />

        <div className="container">
          <Link to="/#products" className="checkout-back">
            <ArrowLeft size={15} />
            Continue shopping
          </Link>

          <motion.div
            className="checkout-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span>Touch Energy CHECKOUT</span>

            <h1>
              Complete your
              <strong>order.</strong>
            </h1>

            <p>
              Enter your details and complete your purchase
              securely through Razorpay.
            </p>
          </motion.div>

          {submitError && (
            <div
              role="alert"
              style={{
                marginBottom: "20px",
                padding: "14px 16px",
                border: "1px solid rgba(180, 40, 40, 0.25)",
                background: "rgba(180, 40, 40, 0.06)",
                borderRadius: "10px",
              }}
            >
              {submitError}
            </div>
          )}

          {paymentMessage && (
            <div
              style={{
                marginBottom: "20px",
                padding: "14px 16px",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: "10px",
              }}
            >
              {paymentMessage}
            </div>
          )}

          <div className="checkout-grid">
            <motion.div
              className="checkout-form-card"
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="checkout-card-heading">
                <span>01</span>

                <div>
                  <small>CUSTOMER INFORMATION</small>
                  <h2>Your details</h2>
                </div>
              </div>

              <div className="checkout-fields">
                <div className="checkout-field full">
                  <label>Full Name *</label>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      updateField("name", e.target.value)
                    }
                    placeholder="Enter your full name"
                  />

                  {errors.name && <small>{errors.name}</small>}
                </div>

                <div className="checkout-field">
                  <label>Email *</label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      updateField("email", e.target.value)
                    }
                    placeholder="you@example.com"
                  />

                  {errors.email && (
                    <small>{errors.email}</small>
                  )}
                </div>

                <div className="checkout-field">
                  <label>Phone *</label>

                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      updateField("phone", e.target.value)
                    }
                    placeholder="10-digit mobile number"
                  />

                  {errors.phone && (
                    <small>{errors.phone}</small>
                  )}
                </div>

                <div className="checkout-field full">
                  <label>Delivery Address *</label>

                  <textarea
                    rows="4"
                    value={form.address}
                    onChange={(e) =>
                      updateField("address", e.target.value)
                    }
                    placeholder="House / flat number, street, area"
                  />

                  {errors.address && (
                    <small>{errors.address}</small>
                  )}
                </div>

                <div className="checkout-field">
                  <label>City *</label>

                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) =>
                      updateField("city", e.target.value)
                    }
                    placeholder="City"
                  />

                  {errors.city && (
                    <small>{errors.city}</small>
                  )}
                </div>

                <div className="checkout-field">
                  <label>State *</label>

                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) =>
                      updateField("state", e.target.value)
                    }
                    placeholder="State"
                  />

                  {errors.state && (
                    <small>{errors.state}</small>
                  )}
                </div>

                <div className="checkout-field">
                  <label>PIN Code *</label>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength="6"
                    value={form.pin}
                    onChange={(e) =>
                      updateField(
                        "pin",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    placeholder="6-digit PIN"
                  />

                  {errors.pin && <small>{errors.pin}</small>}
                </div>
              </div>

              <div className="checkout-section-divider" />

              <div className="checkout-card-heading">
                <span>02</span>

                <div>
                  <small>PAYMENT</small>
                  <h2>Secure payment</h2>
                </div>
              </div>

              <div className="checkout-payment-options">
                <div className="checkout-payment active">
                  <span className="checkout-payment-radio">
                    <Check size={12} />
                  </span>

                  <span>
                    <strong>Online Payment</strong>
                    <small>
                      Secure payment through Razorpay.
                    </small>
                  </span>
                </div>

                <div className="checkout-payment">
                  <span className="checkout-payment-radio">
                    <Check size={12} />
                  </span>

                  <span>
                    <strong>100% Advance Payment</strong>
                    <small>
                      Payment is required before order
                      processing.
                    </small>
                  </span>
                </div>
              </div>

              <p className="checkout-demo-note">
                Your payment is processed securely by
                Razorpay. Touch Energy does not receive or
                store your card or UPI credentials.
              </p>
            </motion.div>

            <motion.aside
              className="checkout-summary-card"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="checkout-summary-heading">
                <span>03</span>

                <div>
                  <small>ORDER SUMMARY</small>
                  <h2>Your order</h2>
                </div>
              </div>

              <div className="checkout-summary-items">
                {cartItems.map((item) => (
                  <div
                    className="checkout-summary-item"
                    key={item.id}
                  >
                    <div className="checkout-summary-image">
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <span>{item.quantity}</span>
                    </div>

                    <div>
                      <strong>{item.name}</strong>
                      <small>{item.category}</small>
                    </div>

                    <b>
                      {item.price == null
                        ? "Price on Request"
                        : `₹${(
                            item.price * item.quantity
                          ).toLocaleString("en-IN")}`}
                    </b>
                  </div>
                ))}
              </div>

              <div className="checkout-summary-divider" />

              <div className="checkout-total-row">
                <span>Subtotal</span>

                <strong>
                  {subtotal == null
                    ? "Price on Request"
                    : `₹${subtotal.toLocaleString("en-IN")}`}
                </strong>
              </div>

              <div className="checkout-total-row muted">
                <span>Delivery</span>
                <span>Confirmed later</span>
              </div>

              <div className="checkout-summary-divider" />

              <div className="checkout-grand-total">
                <span>Total</span>

                <strong>
                  {subtotal == null
                    ? "Price on Request"
                    : `₹${subtotal.toLocaleString("en-IN")}`}
                </strong>
              </div>

              <button
                type="button"
                className="checkout-place-button"
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Processing..."
                  : "Pay securely"}
                <ArrowRight size={17} />
              </button>

              <p className="checkout-secure-note">
                You will be redirected to the secure
                Razorpay payment window. Your cart will only
                be cleared after payment is confirmed.
              </p>
            </motion.aside>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Checkout;
