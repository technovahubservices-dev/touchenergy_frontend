import { motion } from "framer-motion";
import {
  Activity,
  Cpu,
  ShieldCheck,
  Volume2,
} from "lucide-react";

const technologies = [
  {
    number: "01",
    title: "Pure Sine Wave",
    description:
      "Clean and stable AC output designed for sensitive electronics and everyday appliances.",
    icon: Activity,
  },
  {
    number: "02",
    title: "Smart Protection",
    description:
      "Continuous monitoring helps protect the inverter and connected appliances from electrical irregularities.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Intelligent Control",
    description:
      "Built-in control logic continuously manages power delivery for consistent performance.",
    icon: Cpu,
  },
  {
    number: "04",
    title: "Low Noise",
    description:
      "Engineered airflow and intelligent operation help keep the inverter quiet during everyday use.",
    icon: Volume2,
  },
];

function Technology() {
  return (
    <section className="technology-section technology-cinematic" id="technology">
      <div className="technology-grid-bg" />

      <div className="container">

        <motion.div
          className="technology-intro"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="section-label">
            <span>05</span>
            TECHNOLOGY
          </div>

          <h2>
            Engineered
            <span>beneath the surface.</span>
          </h2>

          <p>
            Thoughtful technology works quietly in the background,
            helping Touch Energy deliver a refined and dependable everyday
            power experience.
          </p>
        </motion.div>


        <motion.div
          className="technology-video-wrap"
          initial={{ opacity: 0, y: 45, scale: 0.98 }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="technology-video-frame">

            <video
              className="technology-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={import.meta.env.BASE_URL + "images/hero/hero-poster.jpg"}
            >
              <source
                src={import.meta.env.BASE_URL + "videos/technology/technology.mp4"}
                type="video/mp4"
              />
            </video>

            <div className="technology-video-shade" />

            <div className="technology-video-top">
              <span>Touch Energy TECHNOLOGY</span>
              <span>ENGINEERED / 01</span>
            </div>

            <div className="technology-video-bottom">
              <span>
                INSIDE THE EXPERIENCE
              </span>

              <div className="technology-video-status">
                <i />
                TECHNOLOGY IN MOTION
              </div>
            </div>

          </div>
        </motion.div>


        <div className="technology-features">

          {technologies.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                className="technology-feature"
                key={item.number}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >

                <div className="technology-feature-top">
                  <span>{item.number}</span>

                  <div className="technology-icon">
                    <Icon
                      size={19}
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                <div className="technology-feature-copy">
                  <h3>{item.title}</h3>

                  <p>
                    {item.description}
                  </p>
                </div>

              </motion.article>
            );
          })}

        </div>


        <motion.div
          className="technology-bottom"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <div>
            <span>THE Touch Energy APPROACH</span>

            <strong>
              Advanced technology.
              <em>Simple experience.</em>
            </strong>
          </div>

          <div className="technology-pulse">
            <span />
            <span />
            <span />
            <span />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default Technology;




