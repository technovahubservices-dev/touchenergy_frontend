import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";
import products from "../../data/products";

function ProductDetails({ onAddToCart }) {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const productImages = {
  "energy-box-1000": [
    `${import.meta.env.BASE_URL}images/products/energy-box-1000/box1000_1.png`,
    `${import.meta.env.BASE_URL}images/products/energy-box-1000/box1000_2.png`,
    `${import.meta.env.BASE_URL}images/products/energy-box-1000/box1000_3.png`,
  ],
  "tlf-1208100": [
    `${import.meta.env.BASE_URL}images/products/tlf-1208100/tlf-1208100-1.png`,
    `${import.meta.env.BASE_URL}images/products/tlf-1208100/tlf-1208100-2.png`,
    `${import.meta.env.BASE_URL}images/products/tlf-1208100/tlf-1208100-3.png`,
  ],
  "tlf-1208200": [
    `${import.meta.env.BASE_URL}images/products/tlf-1208200/tlf-1208200-1.png`,
    `${import.meta.env.BASE_URL}images/products/tlf-1208200/tlf-1208200-2.png`,
    `${import.meta.env.BASE_URL}images/products/tlf-1208200/tlf-1208200-3.png`,
  ],
  "tlf-2408100": [
    `${import.meta.env.BASE_URL}images/products/tlf-2408100/tlf-2408100-1.png`,
    `${import.meta.env.BASE_URL}images/products/tlf-2408100/tlf-2408100-2.png`,
    `${import.meta.env.BASE_URL}images/products/tlf-2408100/tlf-2408100-3.png`,
  ],
  "talis5": [
    `${import.meta.env.BASE_URL}images/products/talis5/talis5-1.png`,
    `${import.meta.env.BASE_URL}images/products/talis5/talis5-2.png`,
    `${import.meta.env.BASE_URL}images/products/talis5/talis5-3.png`,
  ],
  "talis7": [
    `${import.meta.env.BASE_URL}images/products/talis7/talis7-1.png`,
    `${import.meta.env.BASE_URL}images/products/talis7/talis7-2.png`,
    `${import.meta.env.BASE_URL}images/products/talis7/talis7-3.png`,
  ],
  "stack20": [
    `${import.meta.env.BASE_URL}images/products/stack20/stack20-1.png`,
    `${import.meta.env.BASE_URL}images/products/stack20/stack20-2.png`,
  ],
};

  const product = useMemo(
    () => products.find((item) => item.id === productId),
    [productId]
  );

  if (!product) {
    return (
      <main className="product-not-found">
        <div className="container">
          <span>PRODUCT NOT FOUND</span>

          <h1>
            This product
            <strong>doesn't exist.</strong>
          </h1>

          <Link to="/#products" className="product-back-button">
            <ArrowLeft size={16} />
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  const hasPrice =
    typeof product.price === "number" &&
    Number.isFinite(product.price);

  const total = hasPrice ? product.price * quantity : null;

  const handleAddToCart = () => {
    if (!hasPrice || typeof onAddToCart !== "function") return;

    for (let index = 0; index < quantity; index += 1) {
      onAddToCart(product, false);
    }
};

  const isTechnicalProduct = Boolean(product.specifications);

  return (
    <main className="product-details-page">
      <section className="product-details-hero">
        <div className="product-details-glow" />

        <div className="container">
          <Link to="/#products" className="product-back-link">
            <ArrowLeft size={15} />
            Back to products
          </Link>

          <div className="product-details-grid">
            <motion.div
              className="product-details-visual"
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="product-details-orb" />

              <span className="product-details-badge">
                {product.badge}
              </span>

              <motion.img
  key={
    productImages[product.id]
      ? productImages[product.id][activeImageIndex]
      : product.image
  }
  className="product-details-main-image"
  src={
    productImages[product.id]
      ? productImages[product.id][activeImageIndex]
      : product.image
  }
  alt={`${product.name} product image`}
  initial={{ opacity: 0.7 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.25 }}
/>

{productImages[product.id] && (
  <div className="product-image-thumbnails">
    {productImages[product.id].map((image, index) => (
      <button
        key={image}
        type="button"
        className={`product-image-thumbnail ${
          activeImageIndex === index ? "active" : ""
        }`}
        onClick={() => setActiveImageIndex(index)}
        aria-label={`View ${product.name} image ${index + 1}`}
        aria-pressed={activeImageIndex === index}
      >
        <img
          src={image}
          alt={`${product.name} view ${index + 1}`}
        />
      </button>
    ))}
  </div>
)}
            </motion.div>

            <motion.div
              className="product-details-content"
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="product-details-category">
                {product.category}
              </span>

              <h1>{product.name}</h1>

              <h2>{product.tagline}</h2>

              <p className="product-details-description">
                {product.description}
              </p>

              {isTechnicalProduct && (
            <div className="product-quick-specs">
              {product.id === "stack20" ? (
                <>
                  <div>
                    <strong>6 kW</strong>
                    <span>Inverter output</span>
                  </div>
                  <div>
                    <strong>20.48 kWh</strong>
                    <span>Battery capacity</span>
                  </div>
                  <div>
                    <strong>51.2 V Ã‚Â· 400 Ah</strong>
                    <span>Battery bank</span>
                  </div>
                </>
              ) : product.id === "tlf-1208200" ? (
                <>
                  <div>
                    <strong>12.8 V</strong>
                    <span>Nominal voltage</span>
                  </div>
                  <div>
                    <strong>200 Ah</strong>
                    <span>Rated capacity</span>
                  </div>
                  <div>
                    <strong>2.56 kWh</strong>
                    <span>Nominal energy</span>
                  </div>
                </>
              ) : product.id === "talis5" ? (
             <>
               <div>
                 <strong>51.2 V</strong>
                 <span>Nominal voltage</span>
               </div>
               <div>
                 <strong>100 Ah</strong>
                 <span>Rated capacity</span>
               </div>
               <div>
                 <strong>5.12 kWh</strong>
                 <span>Nominal energy</span>
               </div>
             </>
           ) : product.id === "tlf-2408100" ? (
             <>
               <div>
                 <strong>25.6 V</strong>
                 <span>Nominal voltage</span>
               </div>
               <div>
                 <strong>100 Ah</strong>
                 <span>Rated capacity</span>
               </div>
               <div>
                 <strong>2.56 kWh</strong>
                 <span>Nominal energy</span>
               </div>
             </>
           ) : product.id === "talis7" ? (
          <>
            <div>
              <strong>73.6 V</strong>
              <span>Nominal voltage</span>
            </div>
            <div>
              <strong>100 Ah</strong>
              <span>Rated capacity</span>
            </div>
            <div>
              <strong>7.36 kWh</strong>
              <span>Nominal energy</span>
            </div>
          </>
        ) : (
             <>
               <div>
                 <strong>12.8 V</strong>
                    <span>Nominal voltage</span>
                  </div>
                  <div>
                    <strong>100 Ah</strong>
                    <span>Rated capacity</span>
                  </div>
                  <div>
                    <strong>1.28 kWh</strong>
                    <span>Nominal energy</span>
                  </div>
                </>
              )}
            </div>
          )}

              {hasPrice ? (
                <div className="product-details-price">
                  <small>PRICE</small>
                  <strong>
                    ₹{product.price.toLocaleString("en-IN")}
                  </strong>
                </div>
              ) : (
                <div className="product-enquiry-price">
                  <span>Pricing</span>
                  <strong>Request a quote</strong>
                  <p>
                    Contact our team for product pricing and availability.
                  </p>
                  <Link to="/contact">Enquire now <ArrowRight size={15} /></Link>
                </div>
              )}

              <div className="product-details-divider" />

              {hasPrice && (
                <>
                  <div className="product-details-purchase">
                    <div className="product-quantity">
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity((current) =>
                            Math.max(1, current - 1)
                          )
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus size={15} />
                      </button>

                      <span>{quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          setQuantity((current) => current + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus size={15} />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="product-add-button"
                      onClick={handleAddToCart}
                    >
                      <ShoppingBag size={17} />

                      <span className="product-add-label">
                        Add to cart
                      </span>

                      <span>
                        ₹{total.toLocaleString("en-IN")}
                      </span>
                    </button>

                    <button
                      type="button"
                      className="product-checkout-button"
            onClick={() => {
              window.location.href =
                import.meta.env.BASE_URL +
                `buy-now/${product.id}?quantity=${quantity}`;
            }}
                    >
                      Buy now
                      <ArrowRight size={17} />
                    </button>
                  </div>

                  <Link
                    to="/contact"
                    className="product-quote-button"
                  >
                    Request a Quote
                    <ArrowRight size={17} />
                  </Link>

                  <div className="product-details-note">
                    <ShoppingBag size={15} />
                    <span>
                      Add this product to your shopping bag and
                      continue exploring Touch Energy.
                    </span>
                  </div>
                </>
              )}

              {product.datasheet && (
                <a
                  className="product-datasheet-button"
                  href={product.datasheet}
                  target="_blank"
                  rel="noreferrer"
                  download
                >
                  <Download size={17} />
                  Download Datasheet
                </a>
              )}

              {product.warranty && (
                <p className="product-warranty-note">
                  <strong>Warranty:</strong> {product.warranty}
                </p>
              )}
            </motion.div>

      <div className="product-details-feature-list">
                {(product.features || []).map((feature) => (
                  <div key={feature}>
                    <span>
                      <Check size={14} />
                    </span>
                    {feature}
                  </div>
                ))}
              </div>

          </div>
        </div>
      </section>

      {isTechnicalProduct && (
        <>
          <section className="product-specifications-section">
            <div className="container">
              <div className="product-specifications-heading">
                <span>TECHNICAL INFORMATION</span>
                <h2>
                  Product
                  <strong> specifications</strong>
                </h2>
                <p>
                  Key technical details for this model.
                </p>
              </div>

              <div className="product-specifications-grid">
                {Object.entries(product.specifications).map(
                  ([section, specifications]) => (
                    <motion.div
                      className="product-specification-card"
                      key={section}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3>{section}</h3>

                      <div className="product-specification-table-wrap">
                        <table className="product-specification-table">
                          <tbody>
                            {Object.entries(specifications).map(
                              ([label, value]) => (
                                <tr key={label}>
                                  <th scope="row">{label}</th>
                                  <td>{value}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </section>

          {product.applications?.length > 0 && (
            <section className="product-applications-section">
              <div className="container">
                <div className="product-specifications-heading">
                  <span>DESIGNED FOR</span>
                  <h2>
                    Applications
                  </h2>
                </div>

                <div className="product-applications-grid">
                  {product.applications.map((application) => (
                    <div
                      className="product-application-item"
                      key={application}
                    >
                      <Check size={17} />
                      <span>{application}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {product.safetyNotes?.length > 0 && (
            <section className="product-safety-section">
              <div className="container">
                <div className="product-specifications-heading">
                  <span>IMPORTANT INFORMATION</span>
                  <h2>Product & safety notes</h2>
                </div>

                <ul className="product-safety-list">
                  {product.safetyNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </>
      )}

      {product.backupTimes?.length > 0 && (
        <section className="product-specifications-section">
          <div className="container">
            <div className="product-specifications-heading">
              <span>INDICATIVE BACKUP TIME</span>
              <h2>Estimated <strong>backup duration</strong></h2>
              <p>
                Estimates for different connected loads. Actual backup
                time depends on operating conditions.
              </p>
            </div>

            <div className="product-specification-table-wrap">
              <table className="product-specification-table">
                <thead>
                  <tr>
                    <th scope="col">Load</th>
                    <th scope="col">Example</th>
                    <th scope="col">Indicative backup</th>
                  </tr>
                </thead>
                <tbody>
                  {product.backupTimes.map((item) => (
                    <tr key={item.load}>
                      <th scope="row">{item.load}</th>
                      <td>{item.example}</td>
                      <td>{item.backup}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="product-warranty-note">
              Estimates assume 90% usable battery energy and 85%
              conversion efficiency at resistive load. For guidance only.
            </p>
          </div>
        </section>
      )}

      {product.technicalNotes?.length > 0 && (
        <section className="product-safety-section">
          <div className="container">
            <div className="product-specifications-heading">
              <span>DATASHEET NOTES</span>
              <h2>Technical <strong>notes</strong></h2>
            </div>

            <ul className="product-safety-list">
              {product.technicalNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {product.certifications?.length > 0 && (
        <section className="product-applications-section">
          <div className="container">
            <div className="product-specifications-heading">
              <span>QUALITY & COMPLIANCE</span>
              <h2>Certifications</h2>
            </div>

            <div className="product-applications-grid">
              {product.certifications.map((item) => (
                <div className="product-application-item" key={item}>
                  <Check size={17} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {product.manufacturerDetails && (
        <section className="product-safety-section">
          <div className="container">
            <div className="product-specifications-heading">
              <span>MANUFACTURER</span>
              <h2>Product <strong>information</strong></h2>
            </div>

            <div className="product-specification-table-wrap">
              <table className="product-specification-table">
                <tbody>
                  <tr>
                    <th scope="row">Company</th>
                    <td>{product.manufacturerDetails.company}</td>
                  </tr>
                  <tr>
                    <th scope="row">Registered address</th>
                    <td>{product.manufacturerDetails.address}</td>
                  </tr>
                  <tr>
                    <th scope="row">Website</th>
                    <td>
                      <a
                        href={product.manufacturerDetails.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {product.manufacturerDetails.website}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Datasheet revision</th>
                    <td>{product.manufacturerDetails.datasheetRevision}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
      {!isTechnicalProduct && (
        <section className="product-details-engineering">
          <div className="container">
            <div className="product-engineering-heading">
              <span>ENGINEERED FOR EVERYDAY POWER</span>

              <h2>
                Designed around
                <strong>real everyday life.</strong>
              </h2>
            </div>

            <div className="product-engineering-grid">
              {(product.features || []).map((feature, index) => (
                <motion.div
                  className="product-engineering-item"
                  key={feature}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                >
                  <span>0{index + 1}</span>
                  <Check size={17} />
                  <strong>{feature}</strong>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="product-details-discovery">
        <div className="container">
          <div>
            <span>
              {isTechnicalProduct
                ? "HAVE QUESTIONS?"
                : "NOT SURE WHICH ONE?"}
            </span>

            <h2>
              {isTechnicalProduct ? (
                <>
                  Need product
                  <strong> information?</strong>
                </>
              ) : (
                <>
                  Find the inverter
                  <strong> that fits your home.</strong>
                </>
              )}
            </h2>
          </div>

          {isTechnicalProduct ? (
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=sales%40touchenergy.in"
              className="product-discovery-button"
            >
              Contact sales
              <ArrowRight size={17} />
            </a>
          ) : (
            <Link
              to="/#find-your-inverter"
              className="product-discovery-button"
            >
              Find your inverter
              <ArrowRight size={17} />
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
















