import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import products from "../../data/products";

function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return products;
    }

    return products.filter((product) =>
      [
        product.name,
        product.category,
        product.tagline,
        product.description,
        ...(product.features || []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(value)
    );
  }, [query]);

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="search-overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          <motion.div
            className="search-overlay"
            initial={{ opacity: 0, y: -35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -35 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="search-overlay-inner">
              <div className="search-overlay-top">
                <span>Touch Energy SEARCH</span>

                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close search"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="search-input-wrap">
                <Search size={22} />

                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  placeholder="Search Touch Energy..."
                />

                {query && (
                  <button
                    type="button"
                    className="search-clear"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="search-results">
                <div className="search-results-header">
                  <span>
                    {query
                      ? "SEARCH RESULTS"
                      : "EXPLORE Touch Energy"}
                  </span>

                  <small>
                    {results.length}{" "}
                    {results.length === 1
                      ? "result"
                      : "results"}
                  </small>
                </div>

                {results.length > 0 ? (
                  <div className="search-results-list">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className="search-result"
                        onClick={handleClose}
                      >
                        <div className="search-result-image">
                          <img
                            src={product.image}
                            alt={product.name}
                          />
                        </div>

                        <div className="search-result-content">
                          <span>{product.category}</span>
                          <strong>{product.name}</strong>
                          <p>{product.tagline}</p>
                        </div>

                        <ArrowRight size={17} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="search-no-results">
                    <Search size={25} />
                    <strong>No results found.</strong>
                    <p>
                      Try searching for Core, Plus, Pro,
                      Home, or power.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default SearchOverlay;

