import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Heart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const values = [
  {
    number: "01",
    title: "DESIGNED FOR EVERYDAY LIFE",
    description:
      "Power that fits naturally into the way people live, work and connect.",
    icon: Heart,
  },
  {
    number: "02",
    title: "ENGINEERED WITH PURPOSE",
    description:
      "Thoughtful technology focused on protection, control and continuity.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "BUILT FOR WHAT'S NEXT",
    description:
      "A modern approach to residential power designed around evolving everyday needs.",
    icon: Sparkles,
  },
];

function InverterShowcase() {
  return (
    <section className="about-volterra" id="about">
      <div className="about-volterra-glow" />

      <div className="container">
        <motion.div
          className="about-volterra-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="section-label">
            <span>01</span>
            ABOUT Touch Energy
          </div>

          <h2>
            Power designed
            <span>around life.</span>
          </h2>

          <p>
            Touch Energy exists to make backup power feel
            simple, intelligent and dependable — keeping
            everyday life moving when the grid goes quiet.
          </p>
        </motion.div>

        <div className="about-volterra-layout">
          <motion.div
            className="about-volterra-visual"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="about-volterra-image-stack">

              <motion.div
                className="about-volterra-main-image"
                whileHover={{ scale: 1.015 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <img
                  src={import.meta.env.BASE_URL + "images/about/about-main.png"}
                  alt="Touch Energy power designed around modern life"
                />

                <div className="about-volterra-image-overlay">
                  <span>Touch Energy</span>
                  <strong>POWER THAT MOVES LIFE.</strong>
                </div>
              </motion.div>

              <motion.div
                className="about-volterra-detail-image"
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -6,
                  scale: 1.025,
                }}
              >
                <img
                  src={import.meta.env.BASE_URL + "images/about/about-detail.png"}
                  alt="Touch Energy inverter engineering detail"
                />

                <div className="about-volterra-detail-label">
                  <span>ENGINEERED</span>
                  <strong>WITH PURPOSE</strong>
                </div>
              </motion.div>

              <div className="about-volterra-image-number">
                02
              </div>

            </div>
          </motion.div>

          <div className="about-volterra-values">
            {values.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  className="about-volterra-value"
                  key={item.number}
                  initial={{
                    opacity: 0,
                    x: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="about-value-top">
                    <span>{item.number}</span>
                    <Icon
                      size={19}
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="about-value-copy">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <span className="about-value-line" />
                </motion.article>
              );
            })}

            <motion.a
              href={import.meta.env.BASE_URL + "#products"}
              className="about-volterra-explore"
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.35,
              }}
            >
              Explore our products
              <ArrowUpRight size={16} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InverterShowcase;






