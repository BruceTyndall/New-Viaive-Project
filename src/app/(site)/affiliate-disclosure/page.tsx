import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Affiliate Disclosure | Viaive',
  description: 'How we monetize through hotel partnerships',
}

export default function Page() {
  return (
    <>
      <Nav />
      <main className="space-y-8 sm:space-y-12">
        <div className="max-w-[70ch] mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            Affiliate Disclosure
          </h1>

          <div className="prose prose-stone max-w-none text-stone">
            <p>Effective May 2026</p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Introduction</h2>
            <p>
              At Viaive, we believe in transparency. This page discloses how we monetize through affiliate partnerships and how that relationship works for our users.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Stay22 Partnership</h2>
            <p>
              Viaive partners with Stay22, a hotel discovery and booking platform, to provide seamless hotel shopping experiences. When we recommend hotels or link to hotel booking pages, many of those links are Stay22 affiliate links. Stay22 compensates Viaive when you click through one of our links and book a hotel.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">What This Means for You</h2>
            <p>
              Several important points:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>No additional cost:</strong> You pay the same price whether you book directly on a hotel website or through our Stay22 link</li>
              <li><strong>Transparent disclosure:</strong> We mark affiliate links where appropriate and disclose our relationship upfront</li>
              <li><strong>Your choice:</strong> You are free to book directly with hotels or use any platform you prefer</li>
              <li><strong>Data privacy:</strong> Your booking information goes directly to the hotel and Stay22; Viaive does not have access to your personal transaction details</li>
            </ul>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">How We Use Affiliate Income</h2>
            <p>
              Affiliate revenue helps sustain Viaive and funds our editorial operations. This enables us to maintain a team of travel experts, curate destination guides, and continue to provide independent travel advisory services.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Editorial Integrity</h2>
            <p>
              Our editorial recommendations are never driven by affiliate potential. We recommend hotels, destinations, and travel experiences based on their merit, authenticity, and fit for our readers' needs. Our team has decades of luxury travel experience and makes recommendations independently of commission structures. If a property is exceptional, we recommend it. If it is not, we don't—regardless of affiliate arrangements.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Questions?</h2>
            <p>
              If you have questions about our affiliate partnerships or how our monetization works, please reach out:
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
