import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";

function Footer() {
  const scrollToSection = (id) => {
    const target = document.querySelector(id);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <footer className="volterra-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <button
              type="button"
              className="footer-logo"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
            >
              Touch Energy
            </button>

            <p>
              Power that moves life.
              <br />
              Designed for everyday continuity.
            </p>

            <a
              href="mailto:support@touchenergy.in"
              className="footer-email"
            >
              support@touchenergy.in
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="footer-links-column">
            <span className="footer-column-title">EXPLORE</span>

            <Link to="/#about">About Touch Energy</Link>

            <Link to="/#products">Our Products</Link>

            <Link to="/#technology">Technology</Link>

            <Link to="/#how-it-works">How It Works</Link>
          </div>

          <div className="footer-links-column">
            <span className="footer-column-title">SUPPORT</span>

            <button
              type="button"
              onClick={() => scrollToSection("#support")}
            >
              Product Support
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("#support")}
            >
              Installation
            </button>

            <Link to="/contact">
              Contact Us
              <ArrowUpRight size={14} />
            </Link>

            <a href="mailto:support@touchenergy.in">
              Email Support
            </a>
          </div>

          <div className="footer-links-column">
            <span className="footer-column-title">CONTACT</span>

            <a href="tel:+914132969766">
              <Phone size={14} />
              0413-2969766
            </a>

            <a
              href="https://wa.me/919345952875?text=Hello%20Touch%20Energy%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>

            <a href="mailto:sales@touchenergy.in">
              <Mail size={14} />
              Sales
            </a>

            <a href="mailto:support@touchenergy.in">
              <Mail size={14} />
              Support
            </a>
          </div>
        </div>

        <div className="footer-social-links">
          <a
            href="https://www.linkedin.com/company/touch-energy-technologies-pvt-ltd/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>

          <a
            href="https://www.instagram.com/touch_energy_india/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram size={18} />
            Instagram
          </a>
        </div>
        <div className="footer-company-details">
          <p>
            <strong>Touch Energy Technologies Pvt. Ltd.</strong>
          </p>

          <p>
            <MapPin size={15} />
            No. 70, Chinna Veerampattinam Road, Ariyankuppam,
            Puducherry – 605007, India.
          </p>

          <p>
            Business Hours: Monday to Saturday – 9:30 AM to 6:00 PM
          </p>
        </div>

        <div className="footer-statement">
          <span>Touch Energy</span>

          <h2>
            POWER THAT
            <br />
            MOVES LIFE.
          </h2>

          <ArrowUpRight
            className="footer-statement-arrow"
            size={30}
          />
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Touch Energy Technologies Pvt. Ltd.
            All rights reserved.
          </span>

          <div className="footer-bottom-links">
            <Link to="/customer-info">Customer Information</Link>
            <Link to="/customer-info#returns">Returns & Refunds</Link>
            <Link to="/customer-info#payment">Payment Terms</Link>
          </div>

          <span>POWER / TECHNOLOGY / CONTINUITY</span>
        </div>
      </div>
          <p className="footer-credit">
        Powered by{" "}
        <a
          href="https://technovahub.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TechnovaHub
        </a>
      </p>
    </footer>
  );
}

export default Footer;






