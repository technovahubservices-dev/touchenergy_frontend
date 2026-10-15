import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Headphones,
  LifeBuoy,
  MessageCircle,
  Wrench,
} from "lucide-react";

const supportCards = [
  {
    icon: MessageCircle,
    number: "01",
    title: "SALES SUPPORT",
    description:
      "Get help with product enquiries, quotations, and choosing the right Touch Energy solution.",
    action: "Contact sales",
    href: "mailto:sales@touchenergy.in",
  },
  {
    icon: LifeBuoy,
    number: "02",
    title: "TECHNICAL SUPPORT",
    description:
      "Get assistance with product specifications, operation, and technical questions.",
    action: "Get technical help",
    href: "mailto:support@touchenergy.in",
  },
  {
    icon: Wrench,
    number: "03",
    title: "INSTALLATION SUPPORT",
    description:
      "Contact our team for installation guidance and assistance with your system.",
    action: "Installation help",
    href: "mailto:support@touchenergy.in",
  },
  {
    icon: Headphones,
    number: "04",
    title: "AFTER-SALES & WARRANTY",
    description:
      "For after-sales assistance and warranty enquiries, contact our support team.",
    action: "Contact support",
    href: "mailto:support@touchenergy.in",
  },
];

function Support() {
  return (
    <section className="support-section" id="support">
      <div className="support-glow" />

      <div className="container">
        <motion.div
          className="support-heading"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="section-label support-label">
            <span>06</span>
            CUSTOMER SUPPORT
          </div>

          <h2>
            Here when
            <span>you need us.</span>
          </h2>

          <p>
            From product enquiries and installation guidance to after-sales
            and warranty assistance, Touch Energy is here to help.
          </p>
        </motion.div>

        <div className="support-grid">
          {supportCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                className="support-card"
                key={card.number}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -8 }}
              >
                <div className="support-card-top">
                  <span>{card.number}</span>

                  <div className="support-card-icon">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="support-card-content">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>

                <a href={card.href} className="support-card-link">
                  {card.action}
                  <ArrowUpRight size={16} />
                </a>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="support-contact"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="support-contact-icon">
            <MessageCircle size={22} strokeWidth={1.5} />
          </div>

          <div className="support-contact-copy">
            <span>NEED MORE HELP?</span>
            <h3>Talk to the Touch Energy team.</h3>
            <p>
              Email support@touchenergy.in. Our standard response time is
              1–2 business days.
            </p>
          </div>

          <a
            href="https://wa.me/919345952875"
            className="support-contact-button"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp us
            <ArrowUpRight size={17} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Support;
