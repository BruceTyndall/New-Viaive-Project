import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Terms of Service | Viaive',
  description: 'Legal terms governing use of Viaive',
}

export default function Page() {
  return (
    <>
      <Nav />
      <main className="space-y-8 sm:space-y-12">
        <div className="max-w-[70ch] mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            Terms of Service
          </h1>

          <div className="prose prose-stone max-w-none text-stone">
            <p>Effective May 2026</p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Introduction</h2>
            <p>
              Welcome to Viaive. These Terms of Service govern your access to and use of the Viaive website and services. By accessing or using Viaive, you agree to be bound by these terms. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">User Responsibilities</h2>
            <p>
              When using Viaive, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not engage in any conduct that restricts or inhibits access to Viaive</li>
              <li>Not transmit harmful, malicious, or offensive content</li>
              <li>Respect the intellectual property rights of Viaive and third parties</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Intellectual Property Rights</h2>
            <p>
              All content on Viaive, including text, graphics, logos, images, and software, is the property of Viaive or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or transmit this content without prior written permission from Viaive.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Limitations of Liability</h2>
            <p>
              Viaive provides its services on an "as-is" basis. To the fullest extent permitted by law, Viaive disclaims all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall Viaive be liable for indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Third-Party Links</h2>
            <p>
              Viaive may contain links to third-party websites, including hotel booking platforms accessed through our Stay22 affiliate partnership. These links are provided for your convenience, but Viaive is not responsible for the content, accuracy, or practices of third-party websites. When you click on an affiliate link, you are leaving Viaive and entering a third-party site. Please review the terms and privacy policies of any third-party sites before providing personal information.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Changes to Terms</h2>
            <p>
              Viaive reserves the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of Viaive after changes are posted constitutes your acceptance of the modified terms.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Termination</h2>
            <p>
              Viaive may terminate or suspend your access to our services, without cause or liability, at any time and for any reason, including for violation of these Terms of Service.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Governing Law</h2>
            <p>
              These Terms of Service and your use of Viaive are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the state and federal courts located in that jurisdiction.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have questions about these Terms of Service, please contact us at:
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
