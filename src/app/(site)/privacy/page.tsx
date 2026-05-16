import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Viaive collects, uses, and protects your personal information when you use our advisory services.',
}

export default async function PrivacyPage() {
  let title = 'Privacy Policy'
  let lastUpdated: string | null = null
  let hasCmsContent = false

  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'legal',
      where: { slug: { equals: 'privacy' } },
      limit: 1,
    })
    const page = docs[0]
    if (page) {
      title = page.title ?? title
      lastUpdated = page.lastUpdated ?? null
      hasCmsContent = !!page.body
    }
  } catch {
    // static fallback
  }

  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'January 2026'

  return (
    <main
      id="main-content"
      style={{ backgroundColor: 'var(--paper)', minHeight: '100vh' }}
    >
      <section className="pt-40 pb-20 px-6 lg:px-12">
        <div className="max-w-[1280px] mx-auto">
          <div style={{ maxWidth: '70ch' }}>
            {/* Eyebrow */}
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-6"
              style={{ color: 'var(--stone-mid)' }}
            >
              Legal
            </p>

            {/* Title */}
            <h1
              className="mb-4"
              style={{
                fontFamily: 'Fraunces, serif',
                fontSize: 'clamp(36px, 4.5vw, 60px)',
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
                color: 'var(--stone)',
              }}
            >
              {title}
            </h1>

            {/* Last updated */}
            <p
              className="text-[13px] mb-12"
              style={{ color: 'var(--stone-mid)' }}
            >
              Last updated: {formattedDate}
            </p>

            {/* Body */}
            {hasCmsContent ? (
              <div
                className="text-[17px] leading-[1.75] space-y-6"
                style={{ color: 'var(--stone)' }}
              >
                {/* CMS rich text would be rendered here via a serializer in Phase 6 */}
                <p style={{ color: 'var(--stone-mid)', fontStyle: 'italic' }}>
                  Content managed in Payload CMS.
                </p>
              </div>
            ) : (
              <div
                className="text-[17px] leading-[1.75] space-y-6"
                style={{ color: 'var(--stone)' }}
              >
                <p>
                  Viaive (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to
                  protecting your personal information. This policy explains how we collect, use,
                  and safeguard data when you use our advisory services.
                </p>

                <h2
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: '24px',
                    lineHeight: 1.2,
                    color: 'var(--stone)',
                    marginTop: '2.5rem',
                  }}
                >
                  Information we collect
                </h2>
                <p>
                  When you submit a brief or sign up for our editorial newsletter, we collect the
                  information you provide: name, email address, phone number (optional), and the
                  details of your trip enquiry.
                </p>

                <h2
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: '24px',
                    lineHeight: 1.2,
                    color: 'var(--stone)',
                    marginTop: '2.5rem',
                  }}
                >
                  How we use it
                </h2>
                <p>
                  We use your information solely to respond to your advisory enquiry and, with
                  your consent, to send you our editorial newsletter. We do not sell, rent, or
                  share your personal information with third parties for marketing purposes.
                </p>

                <h2
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: '24px',
                    lineHeight: 1.2,
                    color: 'var(--stone)',
                    marginTop: '2.5rem',
                  }}
                >
                  Affiliate relationships
                </h2>
                <p>
                  Viaive participates in affiliate programmes. When you book a hotel through a
                  link on our site, we may receive a commission from the property. This does not
                  affect the price you pay or our editorial recommendations. For full details, see
                  our{' '}
                  <Link
                    href="/affiliate-disclosure"
                    className="underline transition-colors duration-150 hover:text-gold"
                    style={{ color: 'var(--stone)' }}
                  >
                    Affiliate Disclosure
                  </Link>
                  .
                </p>

                <h2
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: '24px',
                    lineHeight: 1.2,
                    color: 'var(--stone)',
                    marginTop: '2.5rem',
                  }}
                >
                  Your rights
                </h2>
                <p>
                  You have the right to access, correct, or delete any personal information we
                  hold about you. To exercise these rights, email{' '}
                  <a
                    href="mailto:hello@viaive.com"
                    className="underline transition-colors duration-150 hover:text-gold"
                    style={{ color: 'var(--stone)' }}
                  >
                    hello@viaive.com
                  </a>
                  .
                </p>
              </div>
            )}

            {/* Legal cross-links */}
            <div
              className="mt-16 pt-8 flex flex-wrap gap-6 text-[12px] tracking-wide"
              style={{ borderTop: '1px solid rgba(26,26,26,0.10)', color: 'var(--stone-mid)' }}
            >
              <Link href="/terms" className="hover:text-stone transition-colors duration-150">
                Terms of service →
              </Link>
              <Link
                href="/affiliate-disclosure"
                className="hover:text-stone transition-colors duration-150"
              >
                Affiliate disclosure →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
