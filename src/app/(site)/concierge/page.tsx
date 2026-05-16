import type { Metadata } from 'next'
import { TrustBar } from '@/components/TrustBar'
import { BriefForm } from '../start-planning/_brief-form'

export const metadata: Metadata = {
  title: 'Private Concierge Brief',
  description:
    'Begin a private concierge brief with Viaive. An advisor will build your itinerary with audited hotels and genuine relationships.',
}

export default function ConciergePage() {
  return (
    <main id="main-content" style={{ backgroundColor: 'var(--paper)', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        className="pt-40 pb-16 px-6 lg:px-12"
        style={{ borderBottom: '1px solid rgba(26,26,26,0.10)' }}
      >
        <div className="max-w-[1280px] mx-auto">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-6"
            style={{ color: 'var(--stone-mid)' }}
          >
            Private Advisory
          </p>
          <h1
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(40px, 5.4vw, 72px)',
              lineHeight: 1,
              letterSpacing: '-0.025em',
              color: 'var(--stone)',
              maxWidth: '18ch',
            }}
          >
            Begin a{' '}
            <em style={{ fontWeight: 300, fontStyle: 'italic' }}>private</em>{' '}
            brief.
          </h1>
          <p
            className="mt-6 text-[18px] leading-[1.7] max-w-[54ch]"
            style={{ color: 'var(--stone-mid)' }}
          >
            Our concierge desk handles the most complex itineraries — multi-destination journeys,
            villa buyouts, and occasions that can&apos;t go wrong.
          </p>
        </div>
      </section>

      {/* Trust reassurance — post-decision */}
      <TrustBar />

      {/* Form */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-16">
            <BriefForm intent="concierge" desk="concierge" source="concierge" />

            <aside>
              <div
                className="p-8"
                style={{ backgroundColor: 'var(--paper-alt)', border: '1px solid rgba(26,26,26,0.10)' }}
              >
                <p
                  className="text-[10px] tracking-[0.3em] uppercase mb-5"
                  style={{ color: 'var(--gold)' }}
                >
                  The Viaive Standard
                </p>
                <ul className="space-y-5 text-[13px] leading-relaxed" style={{ color: 'var(--stone-mid)' }}>
                  {[
                    'Every hotel we recommend has been stayed in by our team.',
                    'Named relationships with GMs at over 200 properties worldwide.',
                    'No booking fees — our advisors are paid by the hotels, not you.',
                    'Response within one business day, always.',
                  ].map((line) => (
                    <li key={line} className="flex gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: 'var(--gold)' }}
                        aria-hidden="true"
                      />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
