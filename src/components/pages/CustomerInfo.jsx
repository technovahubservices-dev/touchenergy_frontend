import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  MessageCircle,
  MapPin,
} from "lucide-react";

const sections = [
  {
    id: "payment",
    title: "Payment Terms",
    content: (
      <>
        <p>100% advance payment is required against the Proforma Invoice (PI).</p>
        <p>Orders are processed upon confirmation and receipt of payment.</p>
        <p>
          Accepted payment methods: Online Bank Transfer, NEFT, RTGS, IMPS,
          and UPI. Payment details will be provided through the Proforma
          Invoice or an authorized payment channel.
        </p>
      </>
    ),
  },
  {
    id: "support",
    title: "Customer Support",
    content: (
      <>
        <p>
          Our support covers sales enquiries, technical assistance,
          installation, after-sales service, and warranty support.
        </p>
        <p>
          Standard response time: 1–2 business days.
        </p>
        <p>
          <Mail size={16} />{" "}
          <a href="mailto:support@touchenergy.in">
            support@touchenergy.in
          </a>
        </p>
      </>
    ),
  },
  {
    id: "warranty",
    title: "Warranty",
    content: (
      <p>
        Warranty terms are product-specific and are governed by the
        applicable Warranty Card supplied with the product. Please refer
        to that card for coverage, exclusions, claim procedures, and
        repair or replacement conditions.
      </p>
    ),
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    content: (
      <>
        <p>We ship across India using Surface Mode – Door-to-Door service.</p>
        <ul>
          <li>South India: approximately 1–3 days.</li>
          <li>North India: approximately 7–10 days.</li>
          <li>
            Other locations: delivery time depends on the destination and
            transporter availability.
          </li>
        </ul>
        <p>
          Freight charges are additional and depend on the destination,
          shipment weight or volume, and transporter charges.
        </p>
        <p>
          All delivery timelines are indicative and may vary due to
          location, product availability, and logistics.
        </p>
      </>
    ),
  },
  {
    id: "returns",
    title: "Returns, Replacements & Refunds",
    content: (
      <>
        <p>
          Return, replacement, and refund eligibility is governed by the
          terms in the applicable Product Warranty Card.
        </p>
        <p>
          Please contact our support team before returning a product.
        </p>
        <p>
          <Mail size={16} />{" "}
          <a href="mailto:support@touchenergy.in">
            support@touchenergy.in
          </a>
        </p>
      </>
    ),
  },
  {
    id: "company",
    title: "About Touch Energy",
    content: (
      <>
        <p>
          Touch Energy Technologies Pvt. Ltd. provides energy products
          and solutions. For the detailed company profile, product
          portfolio, and capabilities, request the official company
          brochure from our team.
        </p>
        <p>
          <Mail size={16} />{" "}
          <a href="mailto:sales@touchenergy.in?subject=Request%20for%20Company%20Brochure">
            Request Company Brochure
          </a>
        </p>
      </>
    ),
  },
];

function CustomerInfo() {
  return (
    <main className="customer-info-page">
      <div className="container">
        <Link to="/" className="customer-info-back">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <header className="customer-info-header">
          <span>TOUCH ENERGY / CUSTOMER INFORMATION</span>
          <h1>Policies & Customer Support</h1>
          <p>
            Payment, delivery, warranty, returns, and support information
            for Touch Energy customers.
          </p>
        </header>

        <nav className="customer-info-nav" aria-label="Customer information">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </nav>

        <div className="customer-info-sections">
          {sections.map((section) => (
            <section
              className="customer-info-section"
              id={section.id}
              key={section.id}
            >
              <h2>{section.title}</h2>
              <div className="customer-info-copy">{section.content}</div>
            </section>
          ))}
        </div>

        <section className="customer-info-contact">
          <h2>Contact Touch Energy</h2>
          <p>
            <strong>Touch Energy Technologies Pvt. Ltd.</strong>
          </p>
          <p>
            <MapPin size={16} /> No. 70, Chinna Veerampattinam Road,
            Ariyankuppam, Puducherry – 605007, India.
          </p>
          <p>Monday–Saturday, 9:30 AM–6:00 PM</p>
          <div className="customer-info-actions">
            <a href="mailto:sales@touchenergy.in">
              <Mail size={16} /> Sales Enquiry
              <ArrowUpRight size={14} />
            </a>
            <a href="mailto:support@touchenergy.in">
              <Mail size={16} /> Support
              <ArrowUpRight size={14} />
            </a>
            <a
              href="https://wa.me/919345952875"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={16} /> WhatsApp
              <ArrowUpRight size={14} />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

export default CustomerInfo;
