import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";

function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}) {
  const itemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const hasUnpricedItems = cartItems.some(
    (item) => item.price == null
  );

  const subtotal = hasUnpricedItems
    ? null
    : cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

  const handleCheckout = () => {
    const orderLines = cartItems
      .map(
        (item) =>
          `${item.name} Ã— ${item.quantity} â€” ${
            item.price == null
              ? "Price on Request"
              : `â‚¹${(item.price * item.quantity).toLocaleString("en-IN")}`
          }`
      )
      .join("\n");

    const subject = encodeURIComponent(
      "Touch Energy Order Request"
    );

    const body = encodeURIComponent(
      `Hello Touch Energy Team,

I would like to place an order for the following products:

${orderLines}

Subtotal: ${subtotal == null ? "Price on Request" : `â‚¹${subtotal.toLocaleString("en-IN")}`}

Customer Details:
Name:
Phone:
Email:
Address:

Please contact me to confirm the order, delivery details and installation.

Thank you.`
    );

    window.location.href =
      `mailto:sales@touchenergy.in?subject=${subject}&body=${body}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            aria-label="Shopping cart"
          >
            <div className="cart-drawer-header">
              <div>
                <span className="cart-drawer-label">
                  YOUR CART
                </span>

                <h2>
                  Shopping bag
                  {itemCount > 0 && (
                    <span> ({itemCount})</span>
                  )}
                </h2>
              </div>

              <button
                type="button"
                className="cart-close"
                onClick={onClose}
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <div className="cart-empty-icon">
                  <ShoppingBag
                    size={25}
                    strokeWidth={1.4}
                  />
                </div>

                <span>YOUR BAG IS EMPTY</span>

                <h3>
                  Find something
                  <strong>worth powering.</strong>
                </h3>

                <p>
                  Explore our inverter range and add the
                  right Touch Energy product to your cart.
                </p>

                <button
                  type="button"
                  className="cart-empty-button"
                  onClick={() => {
                    onClose();

                    window.location.href = import.meta.env.BASE_URL + "#products";
                  }}
                >
                  Explore our products
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <motion.div
                      className="cart-item"
                      key={item.id}
                      layout
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -12,
                      }}
                    >
                      <Link
                        to={`/products/${item.id}`}
                        className="cart-item-image"
                        onClick={onClose}
                        aria-label={`View ${item.name}`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                        />
                      </Link>

                      <div className="cart-item-details">
                        <div className="cart-item-top">
                          <div>
                            <span>{item.category}</span>

                            <Link
                              to={`/products/${item.id}`}
                              onClick={onClose}
                              className="cart-item-product-link"
                            >
                              <h3>{item.name}</h3>
                            </Link>
                          </div>

                          <button
                            type="button"
                            className="cart-remove"
                            onClick={() =>
                              onRemove(item.id)
                            }
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="cart-item-bottom">
                          <div className="cart-quantity">
                            <button
                              type="button"
                              onClick={() =>
                                onDecrease(item.id)
                              }
                              aria-label={`Decrease ${item.name} quantity`}
                            >
                              <Minus size={13} />
                            </button>

                            <span>
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                onIncrease(item.id)
                              }
                              aria-label={`Increase ${item.name} quantity`}
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          <strong>
                            {item.price == null
                              ? "Price on Request"
                              : `â‚¹${(item.price * item.quantity).toLocaleString("en-IN")}`}
                          </strong>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="cart-drawer-footer">
                  <button
                    type="button"
                    className="cart-clear"
                    onClick={onClear}
                  >
                    Clear cart
                  </button>

                  <div className="cart-subtotal">
                    <span>Subtotal</span>
                    <strong>
                      {subtotal == null
                        ? "Price on Request"
                        : `â‚¹${subtotal.toLocaleString("en-IN")}`}
                    </strong>
                  </div>

                  <p className="cart-note">
                    Taxes, delivery and final
                    installation charges will be
                    confirmed by the Touch Energy team.
                  </p>

                  <Link
  to="/checkout"
  className="cart-checkout-button"
  onClick={onClose}
>
  Continue to checkout
  <ArrowRight size={17} />
</Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;






