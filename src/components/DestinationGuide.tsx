import { Fragment } from 'react'
import { stay22DeepLink, stay22MapEmbedUrl } from '@/lib/stay22'
import { ArrowUpRight, Clock, MapPin, Calendar, Sparkles } from 'lucide-react'
import type { DestinationConfig } from '@/types/destination'

const WATCH_TINT: Record<string, string> = {
  Opening: 'var(--gold)',
  Refurb: '#9aa3b2',
  Watch: 'var(--stone)',
}

function renderBody(body: string, city: string, slugBase: string) {
  const parts = body.split(/(\{\{[^}]+\}\})/g)
  return parts.map((p, idx) => {
    const m = p.match(/^\{\{(.+)\}\}$/)
    if (!m) return <Fragment key={idx}>{p}</Fragment>
    const name = m[1]
    return (
      <a
        key={idx}
        href={stay22DeepLink(name, city)}
        rel="sponsored nofollow"
        data-analytics-id={`${slugBase}:link:${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
        className="underline decoration-[var(--gold)] decoration-2 underline-offset-4 hover:text-gold transition"
      >
        {name}
      </a>
    )
  })
}

interface Props {
  config: DestinationConfig
}

export function DestinationGuide({ config }: Props) {
  const slugBase = `dest-${config.slug}`

  return (
    <section
      id={`destination-${config.slug}`}
      className="bg-paper py-24 lg:py-32 relative"
      itemScope
      itemType="https://schema.org/TouristDestination"
    >
      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">
          <article className="max-w-none">
            <div className="text-[11px] tracking-[0.32em] uppercase text-black/60 mb-4">
              {config.heroEyebrow}
            </div>

            <h2
              itemProp="name"
              style={{
                fontFamily: 'Fraunces, serif',
                fontSize: 'clamp(40px, 5.4vw, 72px)',
                lineHeight: 1,
                letterSpacing: '-0.025em',
                fontWeight: 400,
                color: 'var(--stone)',
              }}
            >
              {config.h1}
              <br />
              <em style={{ fontWeight: 300 }}>{config.h1Italic}</em>
            </h2>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 mb-10 text-[12px] text-black/60 border-y-2 border-black/15 py-4">
              <span className="inline-flex items-center gap-2"><Clock size={14} /> {config.readMinutes} min read</span>
              <span className="inline-flex items-center gap-2"><Calendar size={14} /> Best: {config.bestMonths}</span>
              <span className="inline-flex items-center gap-2"><MapPin size={14} /> {config.hotels.length} audited properties</span>
              <span className="inline-flex items-center gap-2">Lead time · {config.leadTime}</span>
            </div>

            <div
              className="border-2 border-[var(--stone)] bg-white p-6 lg:p-8 mb-10 shadow-[6px_6px_0_0_var(--stone)]"
              itemProp="description"
            >
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">
                The Answer · For readers in a hurry
              </div>
              <p
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: '20px',
                  lineHeight: 1.45,
                  color: 'var(--stone)',
                }}
              >
                {config.geoAnswer}
              </p>
            </div>

            {config.watch2026.length > 0 && (
              <div className="mb-10 border-2 border-[var(--stone)] bg-stone text-white p-6 lg:p-8 shadow-[6px_6px_0_0_var(--gold)]">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-gold mb-5">
                  <Sparkles size={12} />
                  The 2026 Watchlist · {config.city}
                </div>
                <ul className="space-y-3.5">
                  {config.watch2026.map((w, i) => (
                    <li
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-5 pb-3 border-b border-white/10 last:border-0 last:pb-0"
                    >
                      <span
                        className="text-[10px] tracking-[0.24em] uppercase px-2 py-1 border self-start whitespace-nowrap"
                        style={{
                          color: WATCH_TINT[w.kind],
                          borderColor: (WATCH_TINT[w.kind] ?? '#9aa3b2') + '66',
                        }}
                      >
                        {w.kind}
                      </span>
                      <div className="flex-1">
                        <div
                          style={{ fontFamily: 'Fraunces, serif', fontSize: '17px' }}
                          className="text-white"
                        >
                          {w.title}
                        </div>
                        <div className="text-[13px] text-white/65 mt-0.5 leading-relaxed">{w.note}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className="space-y-6 text-stone"
              style={{ fontSize: '18px', lineHeight: 1.7, maxWidth: '70ch' }}
            >
              {config.sections.map((s, i) => (
                <Fragment key={i}>
                  <h3
                    style={{
                      fontFamily: 'Fraunces, serif',
                      fontSize: '30px',
                      lineHeight: 1.1,
                      letterSpacing: '-0.01em',
                      marginTop: i === 0 ? 0 : '1.5em',
                    }}
                  >
                    {s.h2}
                  </h3>
                  <p>{renderBody(s.body, config.city, slugBase)}</p>
                </Fragment>
              ))}
            </div>

            <div className="mt-12 border-2 border-[var(--stone)] bg-stone text-white p-8 lg:p-10 shadow-[8px_8px_0_0_var(--gold)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_var(--gold)] transition-all duration-200">
              <div className="text-[11px] tracking-[0.3em] uppercase text-gold mb-3">
                {config.ctaEyebrow}
              </div>
              <h3
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: '30px',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                }}
              >
                {config.ctaHeadline}
              </h3>
              <p className="mt-3 text-white/70 max-w-md text-[15px] leading-relaxed">
                {config.ctaBody}
              </p>
              <a
                href={`/concierge?intent=${config.conciergeIntent}`}
                data-analytics-id={`${slugBase}:cta:concierge`}
                className="inline-flex items-center gap-2 mt-6 bg-white text-stone px-6 py-3.5 text-[12px] tracking-[0.2em] uppercase hover:bg-gold transition"
              >
                Start a {config.city} brief <ArrowUpRight size={14} />
              </a>
            </div>
          </article>

          <aside className="lg:sticky lg:top-28 self-start space-y-5">
            <div className="border-2 border-[var(--stone)] bg-white shadow-[6px_6px_0_0_var(--stone)]">
              <div className="border-b-2 border-[var(--stone)] px-5 py-3 flex items-center justify-between">
                <div className="text-[10px] tracking-[0.3em] uppercase text-stone">
                  Stay22 · Live Map
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-gold">
                  {config.city}
                </span>
              </div>
              <div className="relative aspect-[4/5] bg-paper">
                <iframe
                  title={`Stay22 ${config.city} Map`}
                  src={stay22MapEmbedUrl({ lat: config.lat, lng: config.lng, zoom: 12, city: `${config.city}, ${config.country}` })}
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="border-t-2 border-[var(--stone)] px-5 py-3 text-[10px] text-black/60 tracking-wide">
                Affiliate · We may earn from bookings at no cost to you.
              </div>
            </div>

            <div className="border-2 border-[var(--stone)] bg-white shadow-[6px_6px_0_0_var(--stone)]">
              <div className="border-b-2 border-[var(--stone)] px-5 py-3 flex items-center justify-between">
                <span className="text-[10px] tracking-[0.3em] uppercase">
                  The {config.hotels.length} · Audited
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-black/60">
                  Viaive Standard
                </span>
              </div>
              <ul>
                {config.hotels.map((h, i) => (
                  <li
                    key={h.name}
                    className={`px-5 py-3.5 flex items-start justify-between gap-3 hover:bg-paper transition ${i !== config.hotels.length - 1 ? 'border-b border-black/10' : ''}`}
                  >
                    <div className="flex-1 min-w-0">
                      <a
                        href={stay22DeepLink(h.name, config.city)}
                        rel="sponsored nofollow"
                        data-analytics-id={`${slugBase}:sidebar:${h.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        className="text-stone hover:text-gold transition block"
                        style={{ fontFamily: 'Fraunces, serif', fontSize: '16px', lineHeight: 1.2 }}
                      >
                        {h.name}
                      </a>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-gold mt-1">
                        {h.tier} · {h.neighborhood}
                      </div>
                      <div className="text-[12px] text-black/60 mt-1 leading-snug">{h.note}</div>
                    </div>
                    <ArrowUpRight size={14} className="text-black/40 flex-shrink-0 mt-1" />
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
