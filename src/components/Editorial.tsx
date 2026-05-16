const PIECES = [
  {
    cat: 'Decision Guide',
    title: 'Bangkok: the Chao Phraya vs Sukhumvit decision, in one read',
    excerpt: 'Eight properties audited against service depth, room layout, river vs city access, and food after night four. The three our desk repeats most often.',
    img: 'https://images.unsplash.com/photo-1562880847-3baf56c46a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    href: '/destinations/thailand',
    read: '6 min',
  },
  {
    cat: 'Editorial Intelligence',
    title: "Tokyo 2026: the hotel class that reset the city",
    excerpt: 'Aman, Janu, Bulgari, Park Hyatt reopening — and the quiet ryokan that still outperforms all of them for a certain kind of traveler.',
    img: 'https://images.unsplash.com/photo-1604928141064-207cea6f571f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    href: '/destinations/tokyo',
    read: '9 min',
  },
  {
    cat: 'Field Guide',
    title: 'Paris: the palace decision without the noise',
    excerpt: 'Cheval Blanc, Le Bristol, The Ritz, Crillon — and which one fits the trip you are trying to take, not the one that photographs best.',
    img: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    href: '/destinations/paris',
    read: '7 min',
  },
]

export function Editorial() {
  return (
    <section className="bg-stone text-white py-28 lg:py-36">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="text-[11px] tracking-[0.32em] uppercase text-gold mb-5">
              Field Guides · The Editorial
            </div>
            <h2
              style={{
                fontFamily: 'Fraunces, serif',
                fontSize: 'clamp(36px, 4.4vw, 60px)',
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                fontWeight: 400,
              }}
            >
              Read what we tell
              <br />
              <em style={{ fontWeight: 300 }}>our private clients first.</em>
            </h2>
          </div>
          <a
            href="/concierge"
            data-analytics-id="editorial:cta:concierge"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-white/70 hover:text-white border-b border-white/20 hover:border-white pb-1 transition self-start lg:self-end"
          >
            Talk to an advisor →
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PIECES.map((p) => (
            <a
              key={p.href}
              href={p.href}
              data-analytics-id={`editorial:card:${p.href.replace(/\//g, '-').replace(/^-/, '')}`}
              className="group"
            >
              <div className="aspect-[4/5] overflow-hidden mb-6 bg-black">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                />
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">
                {p.cat} · {p.read}
              </div>
              <h3
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: '28px',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                }}
                className="group-hover:text-gold transition"
              >
                {p.title}
              </h3>
              <p className="mt-3 text-white/65 text-[15px] leading-relaxed">{p.excerpt}</p>
              <div className="mt-5 text-[11px] tracking-[0.24em] uppercase text-white/50 group-hover:text-white transition">
                Read the guide →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
