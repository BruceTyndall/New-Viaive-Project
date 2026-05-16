import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy | Viaive',
  description: 'How we collect, use, and protect your data',
}

export default function Page() {
  return (
    <>
      <Nav />
      <main className="space-y-8 sm:space-y-12">
        <div className="max-w-[70ch] mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            Privacy Policy
          </h1>

          <div className="prose prose-stone max-w-none text-stone">
            <p>Effective May 2026</p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Introduction</h2>
            <p>
              Viaive is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Data Collection</h2>
            <p>We collect information in the following ways:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Information you provide directly (name, email address, travel preferences)</li>
              <li>Information collected automatically (IP address, browser type, pages visited, time spent)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Information from third-party partners (such as Stay22 for affiliate purposes)</li>
            </ul>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Use of Data</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Respond to your inquiries and requests</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Analyze user behavior to improve user experience</li>
              <li>Comply with legal obligations</li>
              <li>Process affiliate transactions through Stay22</li>
            </ul>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your browsing experience, remember your preferences, and understand how you interact with our site. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Third-Party Sharing</h2>
            <p>
              We may share your information with trusted third parties, including Stay22 (for hotel affiliate partnerships), email service providers (Brevo), and analytics services. We do not sell your personal data to third parties.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information. However, no method of transmission over the Internet is completely secure. While we strive to protect your data, we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Your Rights</h2>
            <p>
              Depending on your location, you may have the right to access, correct, or delete your personal information. If you are in the EU, you have rights under the General Data Protection Regulation (GDPR). If you are in California, you have rights under the California Consumer Privacy Act (CCPA). To exercise these rights, please contact us at <strong>hello@viaive.com</strong>.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
              <br />
              <strong>Email:</strong> hello@viaive.com
            </p>

            <div className="mt-8 pt-8 border-t border-stone text-sm text-muted">
              <p>
                Last updated: May 2026
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-stone text-sm text-muted">
              <p>
                <a href="/privacy" className="text-stone hover:text-gold">Privacy Policy</a>
                {' · '}
                <a href="/terms" className="text-stone hover:text-gold">Terms of Service</a>
                {' · '}
                <a href="/affiliate-disclosure" className="text-stone hover:text-gold">Affiliate Disclosure</a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
