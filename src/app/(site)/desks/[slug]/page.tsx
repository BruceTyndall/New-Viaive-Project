import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Desk } from '@/payload-types'
import { BriefForm } from '../../start-planning/_brief-form'

const DESK_SLUGS = ['hotel', 'family', 'safari', 'asia-intelligence', 'concierge'] as const
type DeskSlug = (typeof DESK_SLUGS)[number]

const DESK_LABELS: Record<DeskSlug, string> = {
  hotel: 'Hotel Desk',
  family: 'Family Desk',
  safari: 'Safari Desk',
  'asia-intelligence': 'Asia Intelligence',
  concierge: 'Private Concierge',
}

export async function generateStaticParams() {
  return DESK_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const label = DESK_LABELS[slug as DeskSlug] ?? 'Advisory Desk'
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'desks',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const desk = docs[0]
    if (desk) {
      return {
        title: `${desk.name} — Advisory Desk`,
        description:
          desk.eyebrow ?? `Viaive's ${desk.name} — specialist travel advisory desk.`,
      }
    }
  } catch {
    // fallback
  }
  return {
    title: `${label} — Advisory Desk`,
    description: `Viaive's ${label} — specialist travel advisory desk.`,
  }
}

export default async function DeskPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!DESK_SLUGS.includes(slug as DeskSlug)) notFound()

  let desk: Desk | null = null
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'desks',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    desk = docs[0] ?? null
  } catch {
    // DB unavailable — render placeholder
  }

  const deskLabel = DESK_LABELS[slug as DeskSlug] ?? slug

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
            Advisory Desk
          </p>
          <h1
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(40px, 5.4vw, 72px)',
              lineHeight: 1,
              letterSpacing: '-0.025em',
              color: 'var(--stone)',
              maxWidth: '20ch',
            }}
          >
            {desk?.name ?? deskLabel}
          </h1>
          {desk?.eyebrow && (
            <p
              className="mt-4 text-[18px] leading-relaxed max-w-[54ch]"
              style={{ color: 'var(--stone-mid)' }}
            >
              {desk.eyebrow}
            </p>
          )}

          {/* Meta strip */}
          {desk && (desk.leadTime || desk.priceFloor || (desk.specialties?.length ?? 0) > 0) && (
            <div
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 pt-8"
              style={{ borderTop: '1px solid rgba(26,26,26,0.10)' }}
            >
              {desk.leadTime && (
                <div>
                  <p
                    className="text-[10px] tracking-[0.25em] uppercase mb-1"
                    style={{ color: 'var(--stone-mid)' }}
                  >
                    Lead time
                  </p>
                  <p
                    style={{ color: 'var(--stone)', fontFamily: 'Fraunces, serif', fontSize: '14px' }}
                  >
                    {desk.leadTime}
                  </p>
                </div>
              )}
              {desk.priceFloor && (
                <div>
                  <p
                    className="text-[10px] tracking-[0.25em] uppercase mb-1"
                    style={{ color: 'var(--stone-mid)' }}
                  >
                    From
                  </p>
                  <p
                    style={{ color: 'var(--stone)', fontFamily: 'Fraunces, serif', fontSize: '14px' }}
                  >
                    {desk.priceFloor}
                  </p>
                </div>
              )}
              {(desk.specialties?.length ?? 0) > 0 && (
                <div>
                  <p
                    className="text-[10px] tracking-[0.25em] uppercase mb-1"
                    style={{ color: 'var(--stone-mid)' }}
                  >
                    Specialties
                  </p>
                  <p style={{ color: 'var(--stone)', fontSize: '14px' }}>
                    {desk.specialties!.map((s) => s.label).filter(Boolean).join(' · ')}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Sample briefs */}
      {(desk?.sampleBriefs?.length ?? 0) > 0 && (
        <section
          className="py-16 px-6 lg:px-12"
          style={{ borderBottom: '1px solid rgba(26,26,26,0.10)' }}
        >
          <div className="max-w-[1280px] mx-auto">
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-10"
              style={{ color: 'var(--stone-mid)' }}
            >
              Recent journeys
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {desk!.sampleBriefs!.map((brief, i) => (
                <div
                  key={brief.id ?? i}
                  className="p-6"
                  style={{
                    backgroundColor: 'var(--paper-alt)',
                    border: '1px solid rgba(26,26,26,0.08)',
                  }}
                >
                  {brief.title && (
                    <p
                      className="mb-3"
                      style={{
                        fontFamily: 'Fraunces, serif',
                        fontSize: '18px',
                        lineHeight: 1.2,
                        color: 'var(--stone)',
                      }}
                    >
                      {brief.title}
                    </p>
                  )}
                  {brief.outcome && (
                    <p
                      className="text-[13px] leading-relaxed"
                      style={{ color: 'var(--stone-mid)' }}
                    >
                      {brief.outcome}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {(desk?.faq?.length ?? 0) > 0 && (
        <section
          className="py-16 px-6 lg:px-12"
          style={{ borderBottom: '1px solid rgba(26,26,26,0.10)' }}
        >
          <div className="max-w-[1280px] mx-auto" style={{ maxWidth: '70ch' }}>
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-10"
              style={{ color: 'var(--stone-mid)' }}
            >
              Common questions
            </p>
            <div className="space-y-8">
              {desk!.faq!.map((item, i) => (
                <div key={item.id ?? i}>
                  {item.question && (
                    <h3
                      className="mb-3"
                      style={{
                        fontFamily: 'Fraunces, serif',
                        fontSize: '22px',
                        lineHeight: 1.2,
                        color: 'var(--stone)',
                      }}
                    >
                      {item.question}
                    </h3>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brief form — desk prefilled */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-[1280px] mx-auto">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-6"
            style={{ color: 'var(--stone-mid)' }}
          >
            Begin a brief
          </p>
          <h2
            className="mb-12"
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(28px, 3vw, 42px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--stone)',
              maxWidth: '18ch',
            }}
          >
            Ready to plan with the{' '}
            <em style={{ fontWeight: 300, fontStyle: 'italic' }}>{desk?.name ?? deskLabel}</em>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-16">
            <BriefForm intent={slug} desk={slug} source={`desks-${slug}`} />
            <aside>
              <div
                className="p-8"
                style={{
                  backgroundColor: 'var(--paper-alt)',
                  border: '1px solid rgba(26,26,26,0.10)',
                }}
              >
                <p
                  className="text-[10px] tracking-[0.3em] uppercase mb-4"
                  style={{ color: 'var(--gold)' }}
                >
                  What happens next
                </p>
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: 'var(--stone-mid)' }}
                >
                  Your brief goes directly to the {desk?.name ?? deskLabel}. A named advisor
                  will follow up within one business day — no AI, no call centre.
                </p>
                {desk?.ctaHref && (
                  <Link
                    href={desk.ctaHref}
                    data-analytics-id={`desks:${slug}:cta:sidebar`}
                    className="block mt-6 text-[12px] tracking-[0.2em] uppercase transition-colors duration-150"
                    style={{ color: 'var(--stone)' }}
                  >
                    Learn more about this desk →
                  </Link>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
