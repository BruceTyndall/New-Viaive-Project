import { ImageWithFallback } from "./figma/ImageWithFallback";

const PIECES = [
  {
    cat: "Decision Guide",
    title: "Maldives: the resort decision, in one read",
    excerpt: "27 properties audited against villa layout, house reef, ferry vs seaplane time, and food after night four. The four we'd return to.",
    img: "https://images.unsplash.com/photo-1614350391736-ed8619d63c06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    href: "/destinations/maldives",
    read: "14 min",
  },
  {
    cat: "Editorial Intelligence",
    title: "Aman's new generation: still the standard, or quietly slipping?",
    excerpt: "A property-by-property field reading of the Inner Circle portfolio — the openings that hold, the renovations to wait on, and where the silence still lives.",
    img: "https://images.unsplash.com/photo-1683510157012-01a812870de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    href: "/guides/aman-standard",
    read: "11 min",
  },
  {
    cat: "Field Guide",
    title: "Tokyo: where to actually stay in 2026",
    excerpt: "Aman, Janu, Bulgari, Four Seasons Otemachi, the new Capella — and which neighborhood is right for the trip you're trying to take.",
    img: "https://images.unsplash.com/photo-1604928141064-207cea6f571f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    href: "/destinations/tokyo",
    read: "18 min",
  },
];

export function Editorial() {
  return (
    <section className="bg-[#0b0b0c] text-white py-28 lg:py-36">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="text-[11px] tracking-[0.32em] uppercase text-[#c8a96a] mb-5">
              Field Guides · The Editorial
            </div>
            <h2
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: "clamp(36px, 4.4vw, 60px)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              Read what we tell
              <br />
              <em style={{ fontWeight: 300 }}>our private clients first.</em>
            </h2>
          </div>
          <a
            href="/guides"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-white/70 hover:text-white border-b border-white/20 hover:border-white pb-1 transition self-start lg:self-end"
          >
            All 43 field guides →
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PIECES.map((p) => (
            <a key={p.href} href={p.href} className="group">
              <div className="aspect-[4/5] overflow-hidden mb-6 bg-black">
                <ImageWithFallback
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                />
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#c8a96a] mb-3">
                {p.cat} · {p.read}
              </div>
              <h3
                style={{
                  fontFamily: "Fraunces, serif",
                  fontSize: "28px",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                }}
                className="group-hover:text-[#e8c98a] transition"
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
  );
}
