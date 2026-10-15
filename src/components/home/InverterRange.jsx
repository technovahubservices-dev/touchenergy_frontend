import { motion } from "framer-motion";
import { ArrowUpRight, Check, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import products from "../../data/products";

function InverterRange({ onAddToCart, cartItems }) {
  return (
    <section className="inverter-range" id="products">
      <div className="inverter-range-glow" />

      <div className="container">
        <motion.div
          className="inverter-range-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="section-label">
            <span>03</span>
            OUR PRODUCTS
          </div>

          <div className="inverter-range-title-row">
            <h2>
              Power for
              <span>every kind of home.</span>
            </h2>

            <p>
              Explore the Touch Energy range and find the power
              experience that fits your everyday life.
            </p>
          </div>
        </motion.div>

        <div className="inverter-range-grid">
          {products.map((product, index) => {
            const cartItem = cartItems.find(
              (item) => item.id === product.id
            );

            const isAdded = Boolean(cartItem);

            return (
              <motion.article
                className="range-product"
                key={product.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                }}
              >
                <Link
                  to={`/products/${product.id}`}
                  className="range-product-media"
                  aria-label={`View ${product.name}`}
                >
                  <span className="range-product-badge">
                    {product.badge}
                  </span>

                  {isAdded && (
                    <span className="range-product-added">
                      <Check size={12} />
                      IN CART
                    </span>
                  )}

                  <motion.img
                    src={product.image}
                    alt={product.name}
                    whileHover={{ scale: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />

                  <div className="range-product-orb" />
                </Link>

                <div className="range-product-content">
                  <span className="range-product-category">
                    {product.category}
                  </span>

                  <Link
                    to={`/products/${product.id}`}
                    className="range-product-title-link"
                  >
                    <h3>{product.name}</h3>
                  </Link>

                  <strong>{product.tagline}</strong>

                  <p>{product.description}</p>

                  <div className="range-product-bottom">
                    <div>
                      <small>FROM</small>

                      <span>
                        {typeof product.price === "number" ? `₹${product.price.toLocaleString("en-IN")}` : "Request a Quote"}
                      </span>
                    </div>

                    <div className="range-product-actions">
                      <button
                        type="button"
                        className={`range-icon-button ${
                          isAdded ? "is-added" : ""
                        }`}
                        aria-label={
                          isAdded
                            ? `${product.name} is in cart`
                            : `Add ${product.name} to cart`
                        }
                        onClick={() => onAddToCart(product)}
                      >
                        {isAdded ? (
                          <Check size={17} />
                        ) : (
                          <ShoppingBag size={17} />
                        )}
                      </button>

                      <Link
                        to={`/products/${product.id}`}
                        className="range-explore-button"
                      >
                        Explore
                        <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default InverterRange;







