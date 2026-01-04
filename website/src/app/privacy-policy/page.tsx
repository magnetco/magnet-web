import { DocumentCentered } from '@/components/sections/document-centered'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <DocumentCentered id="document" headline="Privacy Policy" subheadline={<p>Last updated on January 3, 2026.</p>}>
        <p>
          Magnet ("<strong>Magnet</strong>," "<strong>we</strong>," "<strong>us</strong>," or "<strong>our</strong>") is
          a growth architecture firm that designs high-performance websites and the systems behind them. We respect your
          privacy and are committed to protecting your personal information. This Privacy Policy describes how we
          collect, use, store, and protect information when you interact with our website and services.
        </p>

        <h2>Information We Collect</h2>
        <p>We collect information in two ways: information you provide directly and information collected automatically.</p>

        <h3>Information You Provide</h3>
        <p>
          When you submit our contact form or otherwise reach out to us, we collect:
        </p>
        <ul>
          <li>
            <strong>Name</strong> — to address you personally
          </li>
          <li>
            <strong>Email address</strong> — to respond to your inquiry
          </li>
          <li>
            <strong>Company name</strong> (optional) — to understand your business context
          </li>
          <li>
            <strong>Message content</strong> — to understand your goals and how we can help
          </li>
        </ul>

        <h3>Information Collected Automatically</h3>
        <p>
          When you visit our website, we may automatically collect limited technical information such as browser type,
          device information, IP address, and general usage patterns. This helps us understand how visitors use our site
          and improve the experience.
        </p>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to your inquiries and communications</li>
          <li>Schedule and conduct strategy consultations</li>
          <li>Provide our services if we enter into an engagement</li>
          <li>Improve our website and user experience</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p>
          We do not use your information for automated decision-making or profiling. We do not sell your personal
          information.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We use carefully selected third-party services to operate our website and deliver our services. These
          providers process data on our behalf and are contractually obligated to protect your information:
        </p>
        <ul>
          <li>
            <strong>Vercel</strong> — hosts our website and processes requests. Subject to{' '}
            <Link href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Vercel's Privacy Policy
            </Link>
            .
          </li>
          <li>
            <strong>Neon</strong> — provides our database infrastructure where contact form submissions are securely
            stored. Subject to{' '}
            <Link href="https://neon.tech/privacy-policy" target="_blank" rel="noopener noreferrer">
              Neon's Privacy Policy
            </Link>
            .
          </li>
          <li>
            <strong>Resend</strong> — delivers transactional emails, including notifications when you contact us.
            Subject to{' '}
            <Link href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Resend's Privacy Policy
            </Link>
            .
          </li>
          <li>
            <strong>Sanity</strong> — powers our content management system for blog posts and other content. Subject to{' '}
            <Link href="https://www.sanity.io/legal/privacy" target="_blank" rel="noopener noreferrer">
              Sanity's Privacy Policy
            </Link>
            .
          </li>
        </ul>

        <h2>Data Security and Retention</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your information from unauthorized
          access, alteration, or disclosure. Our website is served over HTTPS, and our database connections are
          encrypted.
        </p>
        <p>
          We retain contact form submissions and inquiry data for as long as necessary to respond to your request and
          maintain our business records. If we enter into a client relationship, we retain relevant information for the
          duration of that relationship and as required by applicable law.
        </p>

        <h2>Your Rights</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
        <ul>
          <li>The right to access the personal information we hold about you</li>
          <li>The right to request correction of inaccurate information</li>
          <li>The right to request deletion of your information</li>
          <li>The right to object to or restrict certain processing</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us using the information below. We will respond to your
          request within a reasonable timeframe.
        </p>

        <h2>Cookies</h2>
        <p>
          Our website uses minimal, essential cookies required for basic functionality. We do not use tracking cookies
          or third-party advertising cookies. If we change this practice in the future, we will update this policy and
          provide appropriate notice.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be reflected by updating the "Last
          updated" date at the top of this page. Continued use of our website after any changes indicates acceptance of
          the updated policy.
        </p>

        <h2>Contact Us</h2>
        <p>If you have questions about this Privacy Policy or how we handle your information, please contact us:</p>
        <p>
          <strong>Magnet</strong>
          <br />
          Email: <Link href="mailto:privacy@magnet.co">privacy@magnet.co</Link>
        </p>
      </DocumentCentered>
    </>
  )
}
