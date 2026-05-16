import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Destination } from '@/payload-types'

export const metadata: Metadata = {
  title: 'The Atlas — Destinations',
  description:
    "Viaive's curated atlas of audited destinations. Hotel intelligence, watchlists, and editorial guidance for luxury travellers.",
}

export default async function DestinationsPage() {
  let destinations: Destination[] = []

  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'destinations',
      limit: 100,
      sort: 'city',
    })
    destinations = docs
  } catch {
    // empty state handled below
  }

  return (
    <main
      id="main-content"
      style={{ backgroundColor: 'var(--paper)', minHeight: '100vh' }}
    >
      {/* Header */}
      <section
        className="pt-40 pb-16 px-6 lg:px-12"
        style={{ borderBottom: '1px solid rgba(26,26,26,0.10)' }}
      >
        <div className="max-w-[1280px] mx-auto">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-6"
            style={{ color: 'var(--stone-mid)' }}
          >
            Editorial Atlas
          </p>
          <h1
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(40px, 5.4vw, 72px)',
              lineHeight: 1,
              letterSpacing: '-0.025em',
              color: 'var(--stone)',
            }}
          >
            Destinations
          </h1>
          <p
            className="mt-6 text-[17px] leading-relaxed max-w-[50ch]"
            style={{ color: 'var(--stone-mid)' }}
          >
            Audited cities, curated hotels, and 2026 watchlists. Every entry
            reflects a desk visit, not a press trip.
          </p>
        </div>
      </section>

      {/* Destination grid */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[1280px] mx-auto">
          {destinations.length === 0 ? (
            <div className="py-20 text-center">
              <p
                className="text-[11px] tracking-[0.3em] uppercase mb-4"
                style={{ color: 'var(--stone-mid)' }}
              >
                Coming soon
              </p>
              <p
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: 'clamp(28px, 3vw, 42px)',
                  color: 'var(--stone)',
                }}
              >
                The atlas is being curated.
              </p>
              <p className="mt-4 text-[15px]" style={{ color: 'var(--stone-mid)' }}>
                Destinations are added when our advisors have stayed there.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: 'rgba(26,26,26,0.10)' }}>
              {destinations.map((dest) => (
                <Link
                  key={dest.id}
                  href={`/destinations/${dest.slug}`}
                  data-analytics-id={`atlas:destination:${dest.slug}`}
                  className="group block p-8 transition-colors duration-150"
                  style={{ backgroundColor: 'var(--paper)' }}
                >
                  {/* Region/country */}
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-3 transition-colors duration-150"
                    style={{ color: 'var(--stone-mid)' }}
                  >
                    {dest.country}
                  </p>

                  {/* City headline */}
                  <h2
                    className="mb-3 transition-colors duration-150 group-hover:text-gold"
                    style={{
                      fontFamily: 'Fraunces, serif',
                      fontSize: 'clamp(24px, 2.5vw, 36px)',
                      lineHeight: 1.05,
                      letterSpacing: '-0.015em',
                      color: 'var(--stone)',
                    }}
                  >
                    {dest.city}
                  </h2>

                  {/* GEO answer preview */}
                  <p
                    className="text-[14px] leading-relaxed line-clamp-3"
                    style={{ color: 'var(--stone-mid)' }}
                  >
                    {dest.geoAnswer}
                  </p>

                  {/* Meta */}
                  <div className="mt-5 flex items-center gap-4 text-[11px] tracking-wide" style={{ color: 'var(--stone-mid)' }}>
                    {dest.bestMonths && (
                      <span>Best: {dest.bestMonths}</span>
                    )}
                    {dest.readMinutes && (
                      <span>{dest.readMinutes} min read</span>
                    )}
                    <span
                      className="ml-auto text-[11px] tracking-[0.2em] uppercase transition-colors duration-150 group-hover:text-stone"
                      style={{ color: 'var(--stone-mid)' }}
                    >
                      Read →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
