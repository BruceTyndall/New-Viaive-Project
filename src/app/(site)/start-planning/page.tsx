import type { Metadata } from 'next'
import { BriefForm } from './_brief-form'

export const metadata: Metadata = {
  title: 'Start Planning',
  description:
    'Tell us about the journey you have in mind. A Viaive advisor will follow up within one business day.',
}

export default function StartPlanningPage() {
  return (
    <main id="main-content" style={{ backgroundColor: 'var(--paper)', minHeight: '100vh' }}>
      {/* Hero header */}
      <section
        className="pt-40 pb-16 px-6 lg:px-12"
        style={{ borderBottom: '1px solid rgba(26,26,26,0.10)' }}
      >
        <div className="max-w-[1280px] mx-auto">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-6"
            style={{ color: 'var(--stone-mid)' }}
          >
            Advisory Brief
          </p>
          <h1
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(40px, 5.4vw, 72px)',
              lineHeight: 1,
              letterSpacing: '-0.025em',
              color: 'var(--stone)',
              maxWidth: '16ch',
            }}
          >
            Start{' '}
            <em style={{ fontWeight: 300, fontStyle: 'italic' }}>planning</em>{' '}
            your journey.
          </h1>
          <p
            className="mt-6 text-[18px] leading-[1.7] max-w-[54ch]"
            style={{ color: 'var(--stone-mid)' }}
          >
            Share what you have in mind. We'll route your brief to the right desk and follow up
            within one business day.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-16">
            {/* Form */}
            <BriefForm intent="planning" source="start-planning" />

            {/* Reassurance panel */}
            <aside>
              <div
                className="p-8"
                style={{ backgroundColor: 'var(--paper-alt)', border: '1px solid rgba(26,26,26,0.10)' }}
              >
                <p
                  className="text-[10px] tracking-[0.3em] uppercase mb-5"
                  style={{ color: 'var(--gold)' }}
                >
                  How it works
                </p>
                <ul className="space-y-6">
                  {[
                    {
                      step: '01',
                      title: 'Submit your brief',
                      body: 'A few details about your journey — dates, budget, what matters most.',
                    },
                    {
                      step: '02',
                      title: 'Advisor match',
                      body: "We route you to the desk that fits your trip. You'll hear back within one business day.",
                    },
                    {
                      step: '03',
                      title: 'Private advisory',
                      body: 'A named advisor builds your itinerary with audited hotels and genuine relationships.',
                    },
                  ].map((item) => (
                    <li key={item.step} className="flex gap-5">
                      <span
                        className="text-[11px] tracking-[0.2em] mt-1 shrink-0"
                        style={{ color: 'var(--stone-mid)', fontVariantNumeric: 'tabular-nums' }}
                      >
                        {item.step}
                      </span>
                      <div>
                        <p
                          className="text-[14px] font-medium mb-1"
                          style={{ color: 'var(--stone)', fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                          {item.title}
                        </p>
                        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--stone-mid)' }}>
                          {item.body}
                        </p>
                      </div>
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
