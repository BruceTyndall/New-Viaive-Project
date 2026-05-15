import { Fragment } from "react";
import { stay22DeepLink, stay22MapEmbedUrl } from "../lib/stay22";
import { ArrowUpRight, Clock, MapPin, Calendar, Sparkles } from "lucide-react";
import type { DestinationConfig } from "../data/destinations";

const WATCH_TINT: Record<string, string> = {
  Opening: "#c8a96a",
  Refurb: "#9aa3b2",
  Watch: "#1a1a1a",
};

/** Replaces {{Hotel Name}} markers with Stay22 deep-linked anchors. */
function renderBody(body: string, city: string, slugBase: string) {
  const parts = body.split(/(\{\{[^}]+\}\})/g);
  return parts.map((p, idx) => {
    const m = p.match(/^\{\{(.+)\}\}$/);
    if (!m) return <Fragment key={idx}>{p}</Fragment>;
    const name = m[1];
    return (
      <a
        key={idx}
        href={stay22DeepLink(name, city)}
        rel="sponsored nofollow"
        data-analytics-id={`${slugBase}:link:${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
        className="underline decoration-[#c8a96a] decoration-2 underline-offset-4 hover:text-[#c8a96a] transition"
      >
        {name}
      </a>
    );
  });
}

export function DestinationGuide({ config }: { config: DestinationConfig }) {
  const slugBase = `dest-${config.slug}`;

  return (
    <section
      id={`destination-${config.slug}`}
      className="bg-[#F9F7F2] py-24 lg:py-32 relative"
      itemScope
      itemType="https://schema.org/TouristDestination"
    >
      {/* Paper grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">
          {/* ─────────── BODY ─────────── */}
          <article className="max-w-none">
            <div className="text-[11px] tracking-[0.32em] uppercase text-[#4A4A4A] mb-4">
              {config.heroEyebrow}
            </div>

            <h2
              itemProp="name"
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: "clamp(40px, 5.4vw, 72px)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
                fontWeight: 400,
                color: "#1a1a1a",
              }}
            >
              {config.h1}
              <br />
              <em style={{ fontWeight: 300 }}>{config.h1Italic}</em>
            </h2>

            {/* Meta strip */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 mb-10 text-[12px] text-[#4A4A4A] border-y-2 border-[#1a1a1a]/15 py-4">
              <span className="inline-flex items-center gap-2"><Clock size={14} /> {config.readMinutes} min read</span>
              <span className="inline-flex items-center gap-2"><Calendar size={14} /> Best: {config.bestMonths}</span>
              <span className="inline-flex items-center gap-2"><MapPin size={14} /> {config.hotels.length} audited properties</span>
              <span className="inline-flex items-center gap-2">Lead time · {config.leadTime}</span>
            </div>

            {/* GEO answer box */}
            <div
              className="border-2 border-[#1a1a1a] bg-white p-6 lg:p-8 mb-10 shadow-[6px_6px_0_0_#1a1a1a]"
              itemProp="description"
            >
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#c8a96a] mb-3">
                The Answer · For readers in a hurry
              </div>
              <p
                style={{
                  fontFamily: "Fraunces, serif",
                  fontSize: "20px",
                  lineHeight: 1.45,
                  color: "#1a1a1a",
                }}
              >
                {config.geoAnswer}
              </p>
            </div>

            {/* 2026 Watchlist — the GEO advantage block */}
            {config.watch2026.length > 0 && (
              <div className="mb-10 border-2 border-[#1a1a1a] bg-[#1a1a1a] text-white p-6 lg:p-8 shadow-[6px_6px_0_0_#c8a96a]">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#c8a96a] mb-5">
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
                          borderColor: WATCH_TINT[w.kind] + "66",
                        }}
                      >
                        {w.kind}
                      </span>
                      <div className="flex-1">
                        <div
                          style={{ fontFamily: "Fraunces, serif", fontSize: "17px" }}
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

            {/* Body sections with Spark-targetable anchors */}
            <div
              className="space-y-6 text-[#1a1a1a]"
              style={{ fontSize: "18px", lineHeight: 1.7, maxWidth: "70ch" }}
            >
              {config.sections.map((s, i) => (
                <Fragment key={i}>
                  <h3
                    style={{
                      fontFamily: "Fraunces, serif",
                      fontSize: "30px",
                      lineHeight: 1.1,
                      letterSpacing: "-0.01em",
                      marginTop: i === 0 ? 0 : "1.5em",
                    }}
                  >
                    {s.h2}
                  </h3>
                  <p>{renderBody(s.body, config.city, slugBase)}</p>
                </Fragment>
              ))}
            </div>

            {/* Stone CTA */}
            <div className="mt-12 border-2 border-[#1a1a1a] bg-[#1a1a1a] text-white p-8 lg:p-10 shadow-[8px_8px_0_0_#c8a96a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_0_#c8a96a] transition-all duration-200">
              <div className="text-[11px] tracking-[0.3em] uppercase text-[#c8a96a] mb-3">
                {config.ctaEyebrow}
              </div>
              <h3
                style={{
                  fontFamily: "Fraunces, serif",
                  fontSize: "30px",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
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
                className="inline-flex items-center gap-2 mt-6 bg-white text-black px-6 py-3.5 text-[12px] tracking-[0.2em] uppercase hover:bg-[#c8a96a] transition"
              >
                Start a {config.city} brief <ArrowUpRight size={14} />
              </a>
            </div>
          </article>

          {/* ─────────── STICKY SIDEBAR — Stay22 Map + Hotel List ─────────── */}
          <aside className="lg:sticky lg:top-28 self-start space-y-5">
            <div className="border-2 border-[#1a1a1a] bg-white shadow-[6px_6px_0_0_#1a1a1a]">
              <div className="border-b-2 border-[#1a1a1a] px-5 py-3 flex items-center justify-between">
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#1a1a1a]">
                  Stay22 · Live Map
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#c8a96a]">
                  {config.city}
                </span>
              </div>
              <div className="relative aspect-[4/5] bg-[#F4F1EA]">
                <iframe
                  title={`Stay22 ${config.city} Map`}
                  src={stay22MapEmbedUrl({ lat: config.lat, lng: config.lng, zoom: 12, city: `${config.city}, ${config.country}` })}
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="border-t-2 border-[#1a1a1a] px-5 py-3 text-[10px] text-[#4A4A4A] tracking-wide">
                Affiliate · We may earn from bookings at no cost to you.
              </div>
            </div>

            <div className="border-2 border-[#1a1a1a] bg-white shadow-[6px_6px_0_0_#1a1a1a]">
              <div className="border-b-2 border-[#1a1a1a] px-5 py-3 flex items-center justify-between">
                <span className="text-[10px] tracking-[0.3em] uppercase">
                  The {config.hotels.length} · Audited
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#4A4A4A]">
                  Viaive Standard
                </span>
              </div>
              <ul>
                {config.hotels.map((h, i) => (
                  <li
                    key={h.name}
                    className={`px-5 py-3.5 flex items-start justify-between gap-3 hover:bg-[#F9F7F2] transition ${
                      i !== config.hotels.length - 1 ? "border-b border-[#1a1a1a]/10" : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <a
                        href={stay22DeepLink(h.name, config.city)}
                        rel="sponsored nofollow"
                        data-analytics-id={`${slugBase}:sidebar:${h.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className="text-[#1a1a1a] hover:text-[#c8a96a] transition block"
                        style={{ fontFamily: "Fraunces, serif", fontSize: "16px", lineHeight: 1.2 }}
                      >
                        {h.name}
                      </a>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-[#c8a96a] mt-1">
                        {h.tier} · {h.neighborhood}
                      </div>
                      <div className="text-[12px] text-[#4A4A4A] mt-1 leading-snug">{h.note}</div>
                    </div>
                    <ArrowUpRight size={14} className="text-[#4A4A4A] flex-shrink-0 mt-1" />
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
