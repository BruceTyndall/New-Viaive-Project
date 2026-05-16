import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { stay22DeepLink, stay22MapEmbedUrl } from '@/lib/stay22'
import { EmailCapture } from '@/components/EmailCapture'

export async function generateStaticParams() {
  return ['tokyo', 'maldives', 'bangkok'].map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'destinations',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const dest = docs[0]
    if (dest) {
      return {
        title: dest.seo?.metaTitle ?? `${dest.city} — Luxury Hotels & Travel Guide`,
        description:
          dest.seo?.metaDescription ??
          dest.geoAnswer.slice(0, 155),
      }
    }
  } catch {
    // fallback
  }
  return { title: 'Destination Guide' }
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'destinations',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const dest = docs[0]
  if (!dest) notFound()

  const mapUrl = stay22MapEmbedUrl({ lat: dest.lat, lng: dest.lng, city: dest.city })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: dest.city,
    description: dest.geoAnswer,
    url: `https://viaive.com/destinations/${dest.slug}`,
    touristType: { '@type': 'Audience', audienceType: 'Luxury traveller' },
  }

  return (
    <main id="main-content" style={{ backgroundColor: 'var(--paper)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero band */}
      <section
        className="pt-40 pb-16 px-6 lg:px-12"
        style={{ borderBottom: '1px solid rgba(26,26,26,0.10)' }}
      >
        <div className="max-w-[1280px] mx-auto">
          {dest.heroEyebrow && (
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-6"
              style={{ color: 'var(--stone-mid)' }}
            >
              {dest.heroEyebrow}
            </p>
          )}
          <h1
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(48px, 6vw, 80px)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: 'var(--stone)',
            }}
          >
            {dest.h1}
            {dest.h1Italic && (
              <>
                {' '}
                <em style={{ fontWeight: 300, fontStyle: 'italic' }}>{dest.h1Italic}</em>
              </>
            )}
          </h1>

          {/* Meta strip */}
          <div className="mt-8 flex flex-wrap gap-6 text-[12px] tracking-wide" style={{ color: 'var(--stone-mid)' }}>
            {dest.bestMonths && <span>Best months: {dest.bestMonths}</span>}
            {dest.leadTime && <span>Lead time: {dest.leadTime}</span>}
            {dest.readMinutes && <span>{dest.readMinutes} min read</span>}
            {dest.lastReviewed && (
              <span>
                Last reviewed:{' '}
                {new Date(dest.lastReviewed).toLocaleDateString('en-GB', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Two-col body */}
      <section className="px-6 lg:px-12 py-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">
            {/* Main content */}
            <article>
              {/* GEO answer — first paragraph */}
              <p
                className="text-[18px] leading-[1.75] mb-10"
                style={{ color: 'var(--stone)', maxWidth: '70ch' }}
              >
                {dest.geoAnswer}
              </p>

              {/* Body sections */}
              {dest.sections && dest.sections.length > 0 && (
                <div className="space-y-12">
                  {dest.sections.map((section, i) => (
                    <div key={section.id ?? i}>
                      {section.h2 && (
                        <h2
                          className="mb-4"
                          style={{
                            fontFamily: 'Fraunces, serif',
                            fontSize: 'clamp(24px, 2.5vw, 36px)',
                            lineHeight: 1.1,
                            letterSpacing: '-0.015em',
                            color: 'var(--stone)',
                          }}
                        >
                          {section.h2}
                        </h2>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Audited hotels */}
              {dest.hotels && dest.hotels.length > 0 && (
                <div className="mt-16">
                  <h2
                    className="mb-8"
                    style={{
                      fontFamily: 'Fraunces, serif',
                      fontSize: 'clamp(28px, 3vw, 42px)',
                      lineHeight: 1.05,
                      letterSpacing: '-0.02em',
                      color: 'var(--stone)',
                    }}
                  >
                    Audited Hotels
                  </h2>
                  <div className="space-y-px" style={{ border: '1px solid rgba(26,26,26,0.10)' }}>
                    {dest.hotels.map((hotel, i) => (
                      <div
                        key={hotel.id ?? i}
                        className="flex items-start justify-between gap-6 px-6 py-5"
                        style={{ backgroundColor: 'var(--paper-alt)', borderBottom: '1px solid rgba(26,26,26,0.08)' }}
                      >
                        <div>
                          <p
                            style={{
                              fontFamily: 'Fraunces, serif',
                              fontSize: '18px',
                              color: 'var(--stone)',
                            }}
                          >
                            {hotel.name}
                          </p>
                          {hotel.neighborhood && (
                            <p className="text-[12px] mt-0.5" style={{ color: 'var(--stone-mid)' }}>
                              {hotel.neighborhood}
                              {hotel.tier && ` · ${hotel.tier}`}
                            </p>
                          )}
                          {hotel.note && (
                            <p
                              className="text-[13px] mt-2 leading-relaxed"
                              style={{ color: 'var(--stone-mid)' }}
                            >
                              {hotel.note}
                            </p>
                          )}
                        </div>
                        <a
                          href={stay22DeepLink(hotel.name, dest.city)}
                          rel="sponsored nofollow"
                          target="_blank"
                          data-analytics-id={`destination:${dest.slug}:hotel:${hotel.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="shrink-0 px-4 py-2 text-[11px] tracking-[0.2em] uppercase transition-colors duration-150"
                          style={{
                            border: '1px solid rgba(200,169,106,0.5)',
                            color: 'var(--gold)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Check rates →
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2026 Watchlist */}
              {dest.watch2026 && dest.watch2026.length > 0 && (
                <div className="mt-16">
                  <h2
                    className="mb-8"
                    style={{
                      fontFamily: 'Fraunces, serif',
                      fontSize: 'clamp(24px, 2.5vw, 36px)',
                      lineHeight: 1.1,
                      letterSpacing: '-0.015em',
                      color: 'var(--stone)',
                    }}
                  >
                    2026 Watchlist
                  </h2>
                  <div className="space-y-4">
                    {dest.watch2026.map((item, i) => (
                      <div
                        key={item.id ?? i}
                        className="flex gap-4 p-5"
                        style={{ backgroundColor: 'var(--paper-alt)', border: '1px solid rgba(26,26,26,0.08)' }}
                      >
                        {item.kind && (
                          <span
                            className="text-[10px] tracking-[0.2em] uppercase shrink-0 mt-0.5"
                            style={{
                              color:
                                item.kind === 'Opening'
                                  ? 'var(--gold)'
                                  : item.kind === 'Refurb'
                                    ? 'var(--stone-mid)'
                                    : 'var(--muted)',
                            }}
                          >
                            {item.kind}
                          </span>
                        )}
                        <div>
                          {item.title && (
                            <p
                              className="text-[15px] font-medium"
                              style={{ color: 'var(--stone)', fontFamily: 'Inter, system-ui, sans-serif' }}
                            >
                              {item.title}
                            </p>
                          )}
                          {item.note && (
                            <p
                              className="text-[13px] mt-1 leading-relaxed"
                              style={{ color: 'var(--stone-mid)' }}
                            >
                              {item.note}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Concierge CTA */}
              {(dest.ctaHeadline || dest.ctaBody) && (
                <div
                  className="mt-20 p-10"
                  style={{ backgroundColor: 'var(--stone)', color: 'var(--white)' }}
                >
                  {dest.ctaEyebrow && (
                    <p className="text-[10px] tracking-[0.3em] uppercase mb-4 text-white/60">
                      {dest.ctaEyebrow}
                    </p>
                  )}
                  {dest.ctaHeadline && (
                    <h2
                      className="mb-4"
                      style={{
                        fontFamily: 'Fraunces, serif',
                        fontSize: 'clamp(28px, 3vw, 42px)',
                        lineHeight: 1.05,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {dest.ctaHeadline}
                    </h2>
                  )}
                  {dest.ctaBody && (
                    <p className="text-[15px] leading-relaxed mb-8 text-white/80 max-w-[50ch]">
                      {dest.ctaBody}
                    </p>
                  )}
                  <Link
                    href={`/concierge${dest.conciergeIntent ? `?intent=${dest.conciergeIntent}` : ''}`}
                    data-analytics-id={`destination:${dest.slug}:cta:concierge`}
                    className="inline-flex items-center gap-2 px-7 py-4 text-[12px] tracking-[0.22em] uppercase transition-colors duration-200 hover:bg-white hover:text-black"
                    style={{ border: '1px solid rgba(255,255,255,0.30)', color: 'var(--white)' }}
                  >
                    Begin a brief →
                  </Link>
                </div>
              )}
            </article>

            {/* Sticky sidebar */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              {/* Stay22 map */}
              <div
                className="w-full overflow-hidden mb-6"
                style={{ aspectRatio: '4/5' }}
              >
                <iframe
                  src={mapUrl}
                  title={`Hotels in ${dest.city}`}
                  className="w-full h-full"
                  loading="lazy"
                  style={{ border: 0 }}
                />
              </div>

              {/* Desk link */}
              <div
                className="p-6"
                style={{ backgroundColor: 'var(--paper-alt)', border: '1px solid rgba(26,26,26,0.10)' }}
              >
                <p
                  className="text-[10px] tracking-[0.3em] uppercase mb-4"
                  style={{ color: 'var(--stone-mid)' }}
                >
                  Advisory
                </p>
                <p
                  className="text-[14px] leading-relaxed mb-5"
                  style={{ color: 'var(--stone-mid)' }}
                >
                  Planning a trip to {dest.city}? Our Asia Intelligence desk
                  has named relationships at every property listed here.
                </p>
                <Link
                  href="/desks/asia-intelligence"
                  data-analytics-id={`destination:${dest.slug}:sidebar:desk`}
                  className="block text-center px-5 py-3 text-[11px] tracking-[0.2em] uppercase transition-colors duration-150 hover:bg-stone hover:text-white"
                  style={{ border: '1px solid var(--stone)', color: 'var(--stone)' }}
                >
                  Asia Intelligence desk →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Email capture */}
      <EmailCapture />
    </main>
  )
}
