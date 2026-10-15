import { useMemo, useState } from "react";
import { ArrowUpRight, Check, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import products from "../../data/products";

const categories = [
  "All Products",
  "Integrated Backup Systems",
  "Lithium Batteries",
  "Hybrid ESS",
];

function getProductCategory(product) {
  if (product.id === "energy-box-1000") {
    return "Integrated Backup Systems";
  }

  if (product.id === "stack20") {
    return "Hybrid ESS";
  }

  return "Lithium Batteries";
}

function Shop({ onAddToCart, cartItems = [] }) {
  const [category, setCategory] = useState("All Products");
  const [sortOrder, setSortOrder] = useState("default");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "All Products") {
      result = result.filter(
        (product) => getProductCategory(product) === category
      );
    }

    if (sortOrder === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [category, sortOrder]);

  return (
    <main className="shop-page inverter-range">
      <div className="inverter-range-glow" />

      <div className="container">
        <div className="inverter-range-heading">
          <div className="section-label">
            <span>01</span> TOUCH ENERGY CATALOGUE
          </div>

          <div className="inverter-range-title-row">
            <h1>
              Explore our
              <span>products.</span>
            </h1>

            <p>
              Discover backup power systems, lithium batteries,
              and energy storage solutions for your needs.
            </p>
          </div>
        </div>

        <div className="shop-toolbar">
          <div
            className="shop-categories"
            aria-label="Filter products by category"
          >
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={
                  category === item
                    ? "shop-category active"
                    : "shop-category"
                }
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="shop-sort">
            <span>Sort by</span>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
            >
              <option value="default">Featured</option>
              <option value="name-asc">Name: A–Z</option>
              <option value="name-desc">Name: Z–A</option>
            </select>
          </label>
        </div>

        <p className="shop-results">
          Showing {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
        </p>

        {filteredProducts.length > 0 ? (
          <div className="inverter-range-grid">
            {filteredProducts.map((product) => {
              const isAdded = cartItems.some(
                (item) => item.id === product.id
              );

              return (
                <article
                  className="range-product"
                  key={product.id}
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

                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
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
                        <small>PRICE</small>
                        <span>
                          {typeof product.price === "number"
                            ? `₹${product.price.toLocaleString("en-IN")}`
                            : "Request a Quote"}
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
                </article>
              );
            })}
          </div>
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </main>
  );
}

export default Shop;
