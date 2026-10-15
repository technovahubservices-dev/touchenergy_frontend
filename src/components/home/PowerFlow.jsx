import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "GRID",
    text: "Normal power flows into your home.",
  },
  {
    number: "02",
    title: "Touch Energy",
    text: "The inverter manages the transition.",
  },
  {
    number: "03",
    title: "HOME",
    text: "Your essential power keeps moving.",
  },
];

function PowerFlow() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-it-works-glow" />

      <div className="container">
        <motion.div
          className="how-it-works-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">
            <span>02</span>
            HOW IT WORKS
          </div>

          <div className="how-it-works-title-row">
            <h2>
              Power that
              <span>keeps moving.</span>
            </h2>

            <p>
              When the grid goes quiet, Touch Energy helps keep
              everyday life powered.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="how-it-works-video"
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={import.meta.env.BASE_URL + "images/hero/hero-poster.jpg"}
          >
            <source
              src={import.meta.env.BASE_URL + "videos/how-it-works/how-it-works.mp4"}
              type="video/mp4"
            />
          </video>

          <div className="how-it-works-video-overlay" />

          <div className="how-it-works-video-caption">
            <span className="video-status">
              <i />
              POWER TRANSITION
            </span>

            <strong>Automatic backup. Minimal interruption.</strong>
          </div>
        </motion.div>

        <div className="how-it-works-steps">
          {steps.map((step, index) => (
            <motion.div
              className="how-it-works-step"
              key={step.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
              }}
            >
              <span className="how-it-works-number">
                {step.number}
              </span>

              <div>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </div>

              {index < steps.length - 1 && (
                <ArrowRight className="how-it-works-arrow" size={18} />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="how-it-works-note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <CheckCircle2 size={17} />
          <span>Designed for seamless everyday power continuity.</span>
        </motion.div>
      </div>
    </section>
  );
}

export default PowerFlow;


