import { LegalPage } from '@/components/LegalPage';

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="[DATE]">
      <h2>1. Who we are</h2>
      <p>
        This Website is run by <strong>[BUSINESS LEGAL NAME]</strong>, trading as WAZUKA,{' '}
        <strong>[BUSINESS ADDRESS]</strong>, <strong>[COUNTRY]</strong>. For privacy questions
        contact <strong>[CONTACT EMAIL]</strong>.
      </p>

      <h2>2. The short version</h2>
      <p>
        You can browse this Website without creating an account or filling in any form. We do not
        run advertising or tracking tools on it. We only receive your personal details if you choose
        to contact us.
      </p>

      <h2>3. Information we may receive</h2>
      <ul>
        <li>
          <strong>When you contact us</strong> by WhatsApp, phone or email: your name (if given),
          phone number or email address, and the content of your message. We use this only to reply
          to your enquiry, handle your order, and provide after-sales support.
        </li>
        <li>
          <strong>Technical data automatically processed by our hosting provider:</strong> such as
          your IP address, browser type, device type, pages requested and time of visit. This is
          used to deliver the Website, keep it secure and fix technical problems.
        </li>
        <li>[IF ANALYTICS IS ADDED LATER, DESCRIBE IT HERE.]</li>
      </ul>

      <h2>4. Why we use it and our basis</h2>
      <p>
        To answer your enquiries and fulfil orders (to take steps you ask for); to keep the Website
        secure and working (our legitimate interests); and to meet legal or accounting obligations.
        <strong>[ADJUST THE LEGAL BASIS WORDING TO THE LAW OF YOUR COUNTRY.]</strong>
      </p>

      <h2>5. Who we share it with</h2>
      <p>
        We do not sell your personal data. We use these services to run the Website and talk with
        you:
      </p>
      <ul>
        <li><strong>Cloudflare</strong> (website hosting and security).</li>
        <li>
          <strong>WhatsApp / Meta</strong>, or your email provider, when you message us through
          them. Their own privacy policies apply.
        </li>
        <li>
          <strong>GitHub</strong> and <strong>Supabase</strong> are used by us to store the
          Website's code and product listings. They do not receive visitors' personal data from
          this Website. <strong>[CONFIRM IN PHASE 2.]</strong>
        </li>
        <li>
          Delivery or payment partners, only if you place an order and only as needed to complete
          it: <strong>[LIST IF ANY]</strong>.
        </li>
      </ul>
      <p>
        Some of these providers may process data outside your country.
      </p>

      <h2>6. How long we keep it</h2>
      <p>
        Enquiry and order messages are kept only as long as needed to help you and meet legal, tax
        and accounting duties: <strong>[RETENTION PERIOD]</strong>. Hosting logs are kept for a
        short period by the provider.
      </p>

      <h2>7. Your rights</h2>
      <p>
        Depending on the law where you live, you may have the right to ask for access to, correction
        of, or deletion of your personal data, to object to or restrict its use, and to complain to
        your data protection authority. To use these rights, email <strong>[CONTACT EMAIL]</strong>.
        <strong>[ADD ANY SPECIFIC WORDING REQUIRED BY THE DATA PROTECTION LAW OF YOUR COUNTRY.]</strong>
      </p>

      <h2>8. Children</h2>
      <p>
        The Website is intended for adults. We do not knowingly collect personal data from children.
      </p>

      <h2>9. Security</h2>
      <p>
        We take reasonable steps to protect the Website and any information we hold. No online
        service is completely secure.
      </p>

      <h2>10. Cookies</h2>
      <p>
        See our <a href="/cookies" className="text-blue-700 hover:underline no-underline">
          Cookie Policy
        </a>.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update this policy. The "Last updated" date shows the latest version.
      </p>

      <h2>12. Contact</h2>
      <p>
        <strong>[BUSINESS LEGAL NAME]</strong> (WAZUKA), <strong>[BUSINESS ADDRESS]</strong>,{' '}
        <strong>[CONTACT EMAIL]</strong>, <strong>[NUMBER]</strong>
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