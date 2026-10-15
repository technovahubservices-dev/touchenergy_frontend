import { useMemo, useState } from "react";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import products from "../../data/products";

const appliances = [
  {
    id: "lights",
    label: "Lights",
    description: "Everyday lighting",
  },
  {
    id: "fans",
    label: "Fans",
    description: "Ceiling and table fans",
  },
  {
    id: "tv",
    label: "TV",
    description: "Entertainment",
  },
  {
    id: "wifi",
    label: "Wi-Fi",
    description: "Router and network",
  },
  {
    id: "fridge",
    label: "Refrigerator",
    description: "Kitchen essentials",
  },
  {
    id: "work",
    label: "Work setup",
    description: "Laptop and desk",
  },
];

const homeSizes = [
  {
    id: "essential",
    label: "Essential",
    description: "Key essentials during an outage",
    level: 1,
  },
  {
    id: "most",
    label: "Most rooms",
    description: "Comfort across most of your home",
    level: 2,
  },
  {
    id: "whole",
    label: "Whole home",
    description: "Broader everyday backup coverage",
    level: 3,
  },
];

function FindYourInverter() {
  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const [homeSize, setHomeSize] = useState(null);

  const toggleAppliance = (id) => {
    setSelectedAppliances((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const recommendation = useMemo(() => {
    if (!homeSize || selectedAppliances.length === 0) {
      return null;
    }

    const selectedCoverage =
      homeSizes.find((item) => item.id === homeSize)?.level ?? 1;

    const scoredProducts = products.map((product) => {
      const applianceMatches = selectedAppliances.filter((appliance) =>
        product.supportedAppliances.includes(appliance)
      ).length;

      const applianceScore =
        selectedAppliances.length > 0
          ? applianceMatches / selectedAppliances.length
          : 0;

      const coverageDifference = Math.abs(
        product.coverageLevel - selectedCoverage
      );

      const coverageScore = Math.max(0, 1 - coverageDifference * 0.5);

      const score = applianceScore * 0.7 + coverageScore * 0.3;

      return {
        product,
        score,
        applianceMatches,
      };
    });

    scoredProducts.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.product.coverageLevel - b.product.coverageLevel;
    });

    return scoredProducts[0];
  }, [selectedAppliances, homeSize]);

  const alternatives = useMemo(() => {
    if (!recommendation) {
      return [];
    }

    return products
      .filter((product) => product.id !== recommendation.product.id)
      .slice(0, 2);
  }, [recommendation]);

  const reset = () => {
    setSelectedAppliances([]);
    setHomeSize(null);
  };

  const canRecommend =
    selectedAppliances.length > 0 && homeSize !== null;

  return (
    <section className="find-inverter" id="find-your-inverter">
      <div className="find-inverter-glow" />

      <div className="container">
        <motion.div
          className="find-inverter-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="section-label">
            <span>04</span>
            FIND YOUR INVERTER
          </div>

          <h2>
            Power that fits
            <span>your home.</span>
          </h2>

          <p>
            Tell us what you want to keep running and how much of your home
            you want covered. We'll match you with the closest Touch Energy
            option.
          </p>
        </motion.div>

        <div className="find-inverter-layout">
          <motion.div
            className="find-inverter-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="finder-step">
              <div className="finder-step-header">
                <div>
                  <span>01</span>
                  <h3>What do you want powered?</h3>
                </div>

                {selectedAppliances.length > 0 && (
                  <span className="finder-selection-count">
                    {selectedAppliances.length} selected
                  </span>
                )}
              </div>

              <div className="appliance-grid">
                {appliances.map((appliance) => {
                  const selected = selectedAppliances.includes(appliance.id);

                  return (
                    <button
                      key={appliance.id}
                      type="button"
                      className={`appliance-option ${
                        selected ? "is-selected" : ""
                      }`}
                      onClick={() => toggleAppliance(appliance.id)}
                    >
                      <span className="appliance-check">
                        {selected && <Check size={14} strokeWidth={2.5} />}
                      </span>

                      <span>
                        <strong>{appliance.label}</strong>
                        <small>{appliance.description}</small>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="finder-divider" />

            <div className="finder-step">
              <div className="finder-step-header">
                <div>
                  <span>02</span>
                  <h3>How much of your home?</h3>
                </div>
              </div>

              <div className="home-size-list">
                {homeSizes.map((size) => {
                  const selected = homeSize === size.id;

                  return (
                    <button
                      key={size.id}
                      type="button"
                      className={`home-size-option ${
                        selected ? "is-selected" : ""
                      }`}
                      onClick={() => setHomeSize(size.id)}
                    >
                      <span className="home-size-radio">
                        {selected && <span />}
                      </span>

                      <span className="home-size-copy">
                        <strong>{size.label}</strong>
                        <small>{size.description}</small>
                      </span>

                      <ArrowRight size={17} />
                    </button>
                  );
                })}
              </div>
            </div>

            {canRecommend && (
              <button
                type="button"
                className="finder-reset"
                onClick={reset}
              >
                <RotateCcw size={15} />
                Start again
              </button>
            )}
          </motion.div>

          <motion.div
            className="find-inverter-result"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {!recommendation ? (
              <div className="finder-empty">
                <span className="finder-empty-number">03</span>

                <div>
                  <span className="finder-empty-label">
                    YOUR MATCH
                  </span>

                  <h3>
                    Build your setup
                    <span>to see your inverter.</span>
                  </h3>

                  <p>
                    Select at least one appliance and choose your desired
                    home coverage.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="finder-result-top">
                  <span>03 / YOUR MATCH</span>

                  <span className="finder-match">
                    <Check size={14} />
                    MATCHED
                  </span>
                </div>

                <div className="finder-product">
                  <div className="finder-product-image">
                    <div className="finder-product-glow" />

                    <motion.img
                      src={recommendation.product.image}
                      alt={recommendation.product.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>

                  <div className="finder-product-info">
                    <span className="finder-product-category">
                      {recommendation.product.badge}
                    </span>

                    <h3>{recommendation.product.name}</h3>

                    <strong>{recommendation.product.tagline}</strong>

                    <p>{recommendation.product.idealFor}</p>

                    <div className="finder-product-price">
                      <small>FROM</small>
                      <span>
                        ₹
                        {recommendation.product.price.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>

                    <a
                      href={`#${recommendation.product.id}`}
                      className="finder-result-button"
                    >
                      Explore product
                      <ArrowRight size={17} />
                    </a>
                  </div>
                </div>

                {alternatives.length > 0 && (
                  <div className="finder-alternatives">
                    <span>OTHER OPTIONS</span>

                    <div>
                      {alternatives.map((product) => (
                        <a
                          key={product.id}
                          href={`#${product.id}`}
                        >
                          <span>{product.name}</span>
                          <ArrowRight size={14} />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>

        <p className="finder-disclaimer">
          Product matching shown here is a demonstration of the Touch Energy
          selection experience. Final inverter selection should be based on
          verified product specifications and actual electrical load
          requirements.
        </p>
      </div>
    </section>
  );
}

export default FindYourInverter;




