import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowUpRight } from "lucide-react";

const DESKS = [
  {
    tag: "VIA-WO-103",
    title: "Hotel Desk",
    href: "/desks/hotel",
    blurb:
      "Suites we have personally inspected. Upgrades, breakfasts, $100 credits and quiet preferences negotiated by name — not by booking engine.",
    image: "https://images.unsplash.com/photo-1513323813850-c7318e3efc71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400",
    cta: "Brief the Hotel Desk",
  },
  {
    tag: "VIA-WO-104",
    title: "Family Desk",
    href: "/desks/family",
    blurb:
      "Multi-generational journeys that hold a standard for the four-year-old and the eighty-year-old at the same table. Legacy travel, audited.",
    image: "https://images.unsplash.com/photo-1627599139213-6f5649231b38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400",
    cta: "Plan a Family Journey",
  },
  {
    tag: "VIA-WO-105",
    title: "Safari Desk",
    href: "/desks/safari",
    blurb:
      "Private conservancies, the right guide for the right migration week, and camps that haven't quietly slipped. A 14-country bench of relationships.",
    image: "https://images.unsplash.com/photo-1577971132997-c10be9372519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400",
    cta: "Open the Safari Desk",
  },
  {
    tag: "VIA-WO-107",
    title: "Asia Intelligence Desk",
    href: "/desks/asia-intelligence",
    blurb:
      "Tokyo, Kyoto, Seoul, Bangkok, Singapore, Hong Kong — read by a desk that lives there, not a buyer in another time zone. Global authority, locally written.",
    image: "https://images.unsplash.com/photo-1604928141064-207cea6f571f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400",
    cta: "Enter Asia Intelligence",
  },
];

export function Desks() {
  return (
    <section className="bg-[#0b0b0c] text-white py-28 lg:py-36">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="text-[11px] tracking-[0.32em] uppercase text-[#c8a96a] mb-5">
              The Five Desks · Phase I
            </div>
            <h2
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: "clamp(36px, 4.4vw, 64px)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              We don't sell trips.
              <br />
              <em style={{ fontWeight: 300 }}>We staff a desk for yours.</em>
            </h2>
          </div>
          <a
            href="/about"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-white/70 hover:text-white border-b border-white/20 hover:border-white pb-1 transition self-start lg:self-end"
          >
            How the desk model works
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {DESKS.map((d) => (
            <a
              key={d.tag}
              href={d.href}
              className="group relative overflow-hidden bg-black/40 border border-white/10 hover:border-white/30 transition-all duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <ImageWithFallback
                  src={d.image}
                  alt={`${d.title} — Viaive`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute top-5 left-5 text-[10px] tracking-[0.3em] uppercase text-white/60 font-mono">
                  {d.tag}
                </div>
              </div>
              <div className="p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4">
                  <h3
                    style={{
                      fontFamily: "Fraunces, serif",
                      fontSize: "32px",
                      lineHeight: 1.1,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {d.title}
                  </h3>
                  <ArrowUpRight
                    size={22}
                    className="text-white/40 group-hover:text-[#c8a96a] group-hover:rotate-12 transition flex-shrink-0 mt-1"
                  />
                </div>
                <p className="mt-4 text-white/65 leading-relaxed text-[15px]">{d.blurb}</p>
                <div className="mt-6 text-[11px] tracking-[0.24em] uppercase text-[#c8a96a] group-hover:text-white transition">
                  {d.cta} →
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {[
            { k: "01", t: "Brief", b: "20 minutes. Phone or written. You tell us what matters; we listen for what you didn't say." },
            { k: "02", t: "Audit", b: "We read your dates against a live bench of rooms, captains, guides, and weather. We rule things out." },
            { k: "03", t: "Place", b: "You receive a placement, not a list. Booked under our partner programs, with perks attached." },
          ].map((s) => (
            <div key={s.k} className="bg-[#0b0b0c] p-8">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#c8a96a] mb-4">Step {s.k}</div>
              <div
                style={{ fontFamily: "Fraunces, serif", fontSize: "24px" }}
                className="mb-3"
              >
                {s.t}
              </div>
              <div className="text-white/60 text-[14px] leading-relaxed">{s.b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
