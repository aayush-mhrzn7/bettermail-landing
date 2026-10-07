import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | BetterMail",
  description: "What BetterMail collects, how it is used, and how it is protected.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="legal">
      <h1>Privacy Policy</h1>
      <p className="updated">Last updated: January 2026</p>

      <section>
        <p>
          <strong>Better Mail AI</strong> is an AI-powered Chrome extension
          designed to help users rewrite and improve their emails. Your privacy
          is very important to us, and this Privacy Policy explains what data we
          collect, how we use it, and how we protect it.
        </p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li>
            <strong>Email Content:</strong> Text you choose to rewrite is
            processed temporarily to generate improved versions. We do not
            permanently store this content.
          </li>
          <li>
            <strong>Usage Data:</strong> Basic, anonymous usage information
            (such as feature usage and error logs) may be collected to improve
            the extension.
          </li>
          <li>
            <strong>Account Information (if applicable):</strong> If you sign
            in, we may store your email address or authentication identifier.
          </li>
        </ul>

        <h2>
          2. How We Use Your Information
        </h2>
        <ul>
          <li>To provide and improve email rewriting features</li>
          <li>To maintain performance, security, and reliability</li>
          <li>To fix bugs and improve user experience</li>
        </ul>

        <h2>3. Data Storage and Security</h2>
        <p>
          Email content submitted for rewriting is processed securely and is not
          stored long-term. We use reasonable technical and organizational
          measures to protect your data from unauthorized access.
        </p>

        <h2>4. Third-Party Services</h2>
        <p>
          We may use trusted third-party AI services to process email text.
          These services are only used to generate rewritten content and are
          required to comply with applicable data protection standards.
        </p>

        <h2>5. Data Sharing</h2>
        <p>
          We do <strong>not</strong> sell, rent, or trade your personal data.
          Data is only shared when necessary to provide the service or when
          required by law.
        </p>

        <h2>6. Your Rights</h2>
        <p>
          Depending on your location, you may have rights to access, correct, or
          delete your personal data. You may also stop using the extension at
          any time by uninstalling it.
        </p>

        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated revision date.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
        </p>
        <p>
          <a href="mailto:dev.aayushmaharjan497@gmail.com">dev.aayushmaharjan497@gmail.com</a>
        </p>
      </section>
    </div>
  );
}
