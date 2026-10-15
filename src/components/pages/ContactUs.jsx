import { ArrowLeft, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const name = form.get("name") || "";
    const email = form.get("email") || "";
    const phone = form.get("phone") || "";
    const message = form.get("message") || "";

    const subject = `Touch Energy Contact Request - ${name}`;
    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n\n` +
      `Message:\n${message}`;

    const gmailUrl = new URL("https://mail.google.com/mail/");
    gmailUrl.searchParams.set("view", "cm");
    gmailUrl.searchParams.set("fs", "1");
    gmailUrl.searchParams.set("to", "support@touchenergy.in");
    gmailUrl.searchParams.set("su", subject);
    gmailUrl.searchParams.set("body", body);

    window.open(gmailUrl.toString(), "_blank", "noopener,noreferrer");

    setSubmitted(true);
  };

  return (
    <main className="contact-page">
      <div className="contact-page-glow contact-page-glow-one" />
      <div className="contact-page-glow contact-page-glow-two" />

      <header className="contact-header">
        <a href={import.meta.env.BASE_URL + ""} className="contact-brand">
          <span className="brand-mark">
            <span />
            <span />
          </span>
          <span>Touch Energy</span>
        </a>

        <a href={import.meta.env.BASE_URL + ""} className="contact-back">
          <ArrowLeft size={16} />
          Back to home
        </a>
      </header>

      <section className="contact-hero">
        <div className="contact-label">
          <span>06</span>
          CONTACT Touch Energy
        </div>

        <h1>
          Let's keep
          <br />
          <em>life moving.</em>
        </h1>

        <p>
          Have a question about a Touch Energy inverter, installation,
          support, or finding the right power solution? Our team is
          here to help.
        </p>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <div className="contact-info-heading">
            <span>GET IN TOUCH</span>
            <h2>We're here when you need us.</h2>
          </div>

          <div className="contact-info-list">
            <a
              href="mailto:support@touchenergy.in"
              className="contact-info-card"
            >
              <div className="contact-info-icon">
                <Mail size={20} strokeWidth={1.5} />
              </div>

              <div>
                <span>EMAIL</span>
                <strong>support@touchenergy.in</strong>
              </div>

              <ArrowUpRight size={18} />
            </a>

            <a
              href="tel:+914132969766"
              className="contact-info-card"
            >
              <div className="contact-info-icon">
                <Phone size={20} strokeWidth={1.5} />
              </div>

              <div>
                <span>PHONE</span>
                <strong>0413-2969766</strong>
              </div>

              <ArrowUpRight size={18} />
            </a>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <MapPin size={20} strokeWidth={1.5} />
              </div>

              <div>
                <span>LOCATION</span>
                <strong>No. 70, Chinna Veerampattinam Road, Ariyankuppam, Puducherry - 605007, India</strong>
              </div>
            </div>
          </div>

          <div className="contact-map-section">
            <div className="contact-map-heading">
              <span>FIND US</span>
              <h3>Visit Touch Energy</h3>
              <p>
                No. 70, Chinna Veerampattinam Road, Ariyankuppam,
                Puducherry - 605007, India
              </p>
            </div>

            <div className="contact-map">
              <iframe
                title="Touch Energy Technologies location"
                src="https://maps.google.com/maps?q=No.%2070%2C%20Chinna%20Veerampattinam%20Road%2C%20Ariyankuppam%2C%20Puducherry%20605007%2C%20India&output=embed"
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <a
              className="contact-map-directions"
              href="https://www.google.com/maps/search/?api=1&query=No.%2070%2C%20Chinna%20Veerampattinam%20Road%2C%20Ariyankuppam%2C%20Puducherry%20605007%2C%20India"
              target="_blank"
              rel="noreferrer"
            >
              Get Directions <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="contact-note">
            <span>Touch Energy SUPPORT</span>
            <p>
              For product enquiries, installation assistance and
              general support, send us a message and our team will
              get back to you.
            </p>
          </div>
        </div>

        <div className="contact-form-wrap">
          <div className="contact-form-top">
            <span>01 / MESSAGE</span>
            <span>Touch Energy</span>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              <span>Your name</span>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
              />
            </label>

            <label>
              <span>Email address</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              <span>Phone number</span>
              <input
                type="tel"
                name="phone"
                placeholder="+91"
              />
            </label>

            <label>
              <span>How can we help?</span>
              <textarea
                name="message"
                rows="5"
                placeholder="Tell us what you need..."
                required
              />
            </label>

            <button type="submit" className="contact-submit">
              {submitted ? "Opening email..." : "Send message"}
              <ArrowUpRight size={18} />
            </button>
          </form>

          <p className="contact-form-disclaimer">
            This temporary form opens your default email application.
          </p>
        </div>
      </section>

      <footer className="contact-footer">
        <span>POWER THAT MOVES LIFE.</span>
        <span>© {new Date().getFullYear()} Touch Energy</span>
      </footer>
    </main>
  );
}

export default ContactUs;




