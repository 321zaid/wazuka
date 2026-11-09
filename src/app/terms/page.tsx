import { LegalPage } from '@/components/LegalPage';

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" lastUpdated="[DATE]">
      <h2>1. About these terms</h2>
      <p>
        These Terms & Conditions ("Terms") apply to your use of this website,
        <strong>[WEBSITE ADDRESS]</strong> (the "Website"), operated by{' '}
        <strong>[BUSINESS LEGAL NAME]</strong>, trading as WAZUKA ("WAZUKA", "we", "us", "our"),
        registered at <strong>[BUSINESS ADDRESS]</strong>, <strong>[COUNTRY]</strong>. By using the
        Website you agree to these Terms. If you do not agree, please do not use the Website.
      </p>

      <h2>2. What this Website is</h2>
      <p>
        The Website is a product showcase. You cannot buy products or make payments on the Website.
        To enquire about or order a product, you contact us by WhatsApp, phone or email using the
        details shown on the Website.
      </p>

      <h2>3. Product information</h2>
      <p>
        We try to keep descriptions, images, specifications and availability accurate. However:
      </p>
      <ul>
        <li>
          Product photos are for illustration. Colors, finishes and packaging may look different on
          your screen or differ slightly from the actual product.
        </li>
        <li>
          Specifications, models and designs may change without notice.
        </li>
        <li>
          Products shown may be out of stock or no longer available.
        </li>
        <li>
          Any prices shown (if any) are for guidance only and may change. The price that applies is
          the one we confirm to you in writing when you place your order.
        </li>
        <li>
          We may correct errors or inaccuracies at any time, including after an enquiry or order.
        </li>
      </ul>

      <h2>4. Enquiries and orders</h2>
      <ul>
        <li>
          Contacting us about a product is an enquiry, not a contract.
        </li>
        <li>
          An order is accepted only when we confirm it to you in writing (for example by WhatsApp or
          email). We may decline or cancel an order, for example if a product is unavailable or a
          price was shown in error. If you have already paid, we will refund you.
        </li>
        <li>
          Payment methods, payment timing, delivery or collection options and charges are agreed
          with you when you order: <strong>[PAYMENT METHODS]</strong>,{' '}
          <strong>[DELIVERY AREAS AND CHARGES]</strong>.
        </li>
      </ul>

      <h2>5. Delivery, returns, warranty and refunds</h2>
      <p>
        <strong>[DESCRIBE YOUR DELIVERY TIMES, RETURN AND EXCHANGE POLICY (for example, damaged or
        faulty items), AND ANY MANUFACTURER OR STORE WARRANTY PERIOD AND HOW TO CLAIM IT.]</strong>
        Nothing in these Terms limits any rights you have under the consumer protection laws of{' '}
        <strong>[COUNTRY]</strong>.
      </p>

      <h2>6. Safe use of products</h2>
      <p>
        Many of our products are electrical, gas-powered, or made of glass or ceramic. For your
        safety:
      </p>
      <ul>
        <li>Always read and follow the manufacturer's instructions and warnings before use.</li>
        <li>
          Check that the voltage, plug type and power rating of electrical products suit your home
          before use.
        </li>
        <li>
          Gas cookers and their connections must be installed and checked by a qualified person.
          Never use a gas appliance if you smell gas; turn off the supply, ventilate the area and
          get professional help.
        </li>
        <li>Use only suitable cookware with induction cookers.</li>
        <li>
          Glass and ceramic items can break or chip. Handle with care and do not use damaged items.
          Avoid sudden temperature changes unless the product is designed for it.
        </li>
        <li>
          Keep appliances away from children and do not leave them unattended while in use.
        </li>
      </ul>
      <p>
        We are not responsible for harm caused by misuse, incorrect installation, or not following
        the manufacturer's instructions.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        All content on the Website, including the WAZUKA name, logo, text, photos, graphics and
        design, belongs to us or is used with permission, and is protected by intellectual property
        laws. You may view the Website and share its links for personal, non-commercial use. You may
        not copy, reproduce, modify, sell or republish our content without our written permission.
      </p>

      <h2>8. Acceptable use</h2>
      <p>
        You must not: use the Website unlawfully; try to damage, overload, hack or gain unauthorized
        access to the Website or its systems; use automated tools to copy the Website at scale; or
        pretend to be us or another person.
      </p>

      <h2>9. Links and third-party services</h2>
      <p>
        The Website links to third-party services such as WhatsApp, Instagram, Facebook and Google
        Maps. We do not control them and are not responsible for their content, privacy practices
        or availability. Your use of them is under their own terms.
      </p>

      <h2>10. Disclaimer and limits on our liability</h2>
      <p>
        The Website is provided "as is" and "as available". We do not promise it will always be
        available, error-free or free of harmful components. To the fullest extent allowed by law,
        we are not liable for any indirect or consequential loss arising from your use of, or
        inability to use, the Website or from relying on information on it. Nothing in these Terms
        excludes or limits liability that cannot legally be excluded or limited, including liability
        for death or personal injury caused by negligence, or for fraud.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update these Terms and the Website at any time. The "Last updated" date shows when
        the Terms last changed. Continuing to use the Website after a change means you accept the
        updated Terms.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These Terms are governed by the laws of <strong>[COUNTRY]</strong>, and the courts of{' '}
        <strong>[COUNTRY / CITY]</strong> have jurisdiction, subject to any consumer rights you have
        that cannot be limited by contract.
      </p>

      <h2>13. Contact us</h2>
      <p>
        <strong>[BUSINESS LEGAL NAME]</strong> (WAZUKA)<br />
        Email: <strong>[CONTACT EMAIL]</strong> | WhatsApp / Phone: <strong>[NUMBER]</strong> |
        Address: <strong>[BUSINESS ADDRESS]</strong>
      </p>

      <hr className="my-8" />

      <p className="text-sm text-navy-900/50">
        <em>
          These legal texts are well-structured drafts, not legal advice. Please have a local lawyer
          or a qualified adviser check them before going live.
        </em>
      </p>
    </LegalPage>
  );
};