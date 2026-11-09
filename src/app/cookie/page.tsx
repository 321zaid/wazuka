import { LegalPage } from '@/components/LegalPage';

export default function CookiePage() {
  return (
    <LegalPage title="Cookie Policy" lastUpdated="[DATE]">
      <h2>1. What are cookies?</h2>
      <p>
        Cookies are small files that websites can store on your device. Similar technologies include
        local storage and tracking pixels.
      </p>

      <h2>2. Our approach</h2>
      <p>
        This Website does <strong>not</strong> use cookies or similar technologies for advertising,
        tracking or analytics. We do not use Google Analytics, advertising pixels or embedded
        third-party content that sets cookies. Because of this, we do not show a cookie banner.
      </p>

      <h2>3. Technical storage</h2>
      <p>
        The Website does not store any information on your device.
      </p>

      <h2>4. Third-party websites and services</h2>
      <p>
        When you click a link or button that takes you to another service (such as WhatsApp,
        Instagram, Facebook or Google Maps), that service may set its own cookies under its own
        policy. We do not control them.
      </p>

      <h2>5. Controlling cookies</h2>
      <p>
        You can block or delete cookies in your browser settings. Doing this will not affect your
        ability to use this Website.
      </p>

      <h2>6. Changes</h2>
      <p>
        If we add tools that use cookies in the future (for example analytics), we will update this
        policy and ask for your consent first where the law requires it.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions? Email <strong>[CONTACT EMAIL]</strong>.
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