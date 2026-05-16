const ATLAS = [
  {
    href: '/destinations/tokyo',
    name: 'Tokyo',
    country: 'Japan',
    note: 'The vertical standard',
    img: 'https://images.unsplash.com/photo-1604928141064-207cea6f571f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    span: 'lg:col-span-2 lg:row-span-2',
    large: true,
  },
  {
    href: '/destinations/paris',
    name: 'Paris',
    country: 'France',
    note: 'Gallic standard',
    img: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    span: '',
    large: false,
  },
  {
    href: '/destinations/thailand',
    name: 'Bangkok',
    country: 'Thailand',
    note: 'River & Sukhumvit audit',
    img: 'https://images.unsplash.com/photo-1562880847-3baf56c46a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    span: '',
    large: false,
  },
  {
    href: '/destinations/dubai',
    name: 'Dubai',
    country: 'UAE',
    note: 'Beyond the spectacle',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    span: '',
    large: false,
  },
]

export function Atlas() {
  return (
    <section className="bg-paper py-28 lg:py-36" id="atlas">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <div className="text-[11px] tracking-[0.32em] uppercase text-black/50 mb-5">
              The Viaive Atlas · 27 Cities Audited
            </div>
            <h2
              style={{
                fontFamily: 'Fraunces, serif',
                fontSize: 'clamp(36px, 4.4vw, 60px)',
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                fontWeight: 400,
                color: 'var(--stone)',
              }}
            >
              Field guides for the
              <br />
              <em style={{ fontWeight: 300 }}>places we'd actually return to.</em>
            </h2>
          </div>
          <a
            href="/concierge"
            data-analytics-id="atlas:cta:concierge"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-black/70 hover:text-black border-b border-black/20 hover:border-black pb-1 transition self-start lg:self-end"
          >
            Start a private brief →
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 lg:gap-5 lg:h-[720px]">
          {ATLAS.map((d, i) => (
            <a
              key={d.href}
              href={d.href}
              data-analytics-id={`atlas:destination:${d.href.split('/').pop()}`}
              className={`group relative overflow-hidden bg-black ${d.span} ${i === 0 ? 'col-span-2' : ''}`}
            >
              <img
                src={d.img}
                alt={`Luxury travel guide to ${d.name} — Viaive Atlas`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1400ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 group-hover:from-black/70 transition" />
              <div className="relative h-full min-h-[260px] p-6 lg:p-8 flex flex-col justify-end text-white">
                <div className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-2">
                  {d.country}
                </div>
                <div
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: d.large ? '48px' : '30px',
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {d.name}
                </div>
                <div className="mt-2 text-[13px] text-white/70 italic" style={{ fontFamily: 'Fraunces, serif' }}>
                  — {d.note}
                </div>
                <div className="mt-4 text-[11px] tracking-[0.24em] uppercase text-gold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  Read the field guide →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
