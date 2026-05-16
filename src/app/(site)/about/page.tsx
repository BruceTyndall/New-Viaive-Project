import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export const metadata: Metadata = {
  title: 'About Viaive',
  description:
    'An editorial travel advisory for people who treat every booking as a decision. Audited hotels, named relationships, and a standard you can feel before you arrive.',
}

export default async function AboutPage() {
  let title = 'An editorial advisory for\npeople who decide.'
  let body: string | null = null

  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'about' } },
      limit: 1,
    })
    if (docs[0]) {
      title = docs[0].title ?? title
    }
  } catch {
    // static fallback for first-run
  }

  return (
    <main
      id="main-content"
      style={{ backgroundColor: 'var(--paper)', minHeight: '100vh' }}
    >
      {/* Editorial header */}
      <section className="pt-40 pb-20 px-6 lg:px-12" style={{ borderBottom: '1px solid rgba(26,26,26,0.10)' }}>
        <div className="max-w-[1280px] mx-auto">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-8"
            style={{ color: 'var(--stone-mid)' }}
          >
            The House
          </p>
          <h1
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(40px, 5.4vw, 72px)',
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              color: 'var(--stone)',
              maxWidth: '20ch',
              whiteSpace: 'pre-line',
            }}
          >
            {title}
          </h1>
        </div>
      </section>

      {/* Editorial body */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-20">
            {/* Main prose */}
            <article
              className="text-[18px] leading-[1.75] space-y-6"
              style={{ color: 'var(--stone)', maxWidth: '70ch' }}
            >
              {body ? (
                <p>{body}</p>
              ) : (
                <>
                  <p>
                    Viaive is a private travel advisory built on a single conviction: the best
                    journeys begin before departure, in the decisions that shape them. We exist for
                    travellers who regard every booking as a choice worth making deliberately.
                  </p>
                  <p>
                    Our advisors have stayed in the hotels we recommend. They hold named
                    relationships with general managers at over 200 properties worldwide. When we
                    say a suite has a view, we have stood in it. When we flag a refurbishment, we
                    have seen the before.
                  </p>
                  <p>
                    There are no booking fees. Our advisors earn from the properties, not from you.
                    That removes the incentive to upsell and replaces it with an incentive to impress.
                  </p>
                  <p>
                    We operate five desks — Hotel, Family, Safari, Asia Intelligence, and a private
                    Concierge service for itineraries that require closer handling. Each desk is
                    staffed by specialists who work only in their domain.
                  </p>
                </>
              )}
            </article>

            {/* Sidebar — the Standard */}
            <aside>
              <div
                className="p-8 sticky top-28"
                style={{ backgroundColor: 'var(--paper-alt)', border: '1px solid rgba(26,26,26,0.10)' }}
              >
                <p
                  className="text-[10px] tracking-[0.3em] uppercase mb-6"
                  style={{ color: 'var(--gold)' }}
                >
                  The Viaive Standard
                </p>
                <ul className="space-y-5">
                  {[
                    'Every hotel is personally stayed by an advisor before recommendation.',
                    'Named relationships at 200+ properties worldwide.',
                    'No booking fees — ever.',
                    'Reply within one business day.',
                    'Five specialist desks, not generalists.',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[13px] leading-relaxed"
                      style={{ color: 'var(--stone-mid)' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: 'var(--gold)' }}
                        aria-hidden="true"
                      />
                      {item}
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
