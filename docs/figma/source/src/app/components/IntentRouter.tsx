import { ArrowUpRight } from "lucide-react";

const INTENTS = [
  {
    key: "hotel",
    eyebrow: "I know where I'm going",
    title: "Find the right hotel",
    body: "Audited suites, named upgrades, and perks under our preferred-partner programs. Booked, not searched.",
    href: "/desks/hotel?intent=hotel",
    metric: "27 cities · 6 partner programs",
  },
  {
    key: "family",
    eyebrow: "I'm planning for the family",
    title: "Multi-gen, audited",
    body: "Properties that hold a standard for the four-year-old and the eighty-year-old at the same table.",
    href: "/desks/family?intent=family",
    metric: "Family Desk · VIA-WO-104",
  },
  {
    key: "somatic",
    eyebrow: "I need a quiet week",
    title: "Wellness & somatic silence",
    body: "Sanctuary properties read against sound, light, food integrity and the people running them.",
    href: "/start-planning?intent=somatic",
    metric: "Sanctuary briefs · 18hr response",
  },
  {
    key: "unsure",
    eyebrow: "I'm not sure yet",
    title: "Start with a conversation",
    body: "A 20-minute brief with a senior advisor. We listen for the trip behind the trip.",
    href: "/concierge?intent=open",
    metric: "Senior advisor · no sales call",
  },
];

export function IntentRouter() {
  return (
    <section id="intent" className="bg-white py-24 lg:py-32 border-b border-black/5">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-[11px] tracking-[0.32em] uppercase text-black/50 mb-5">
              Where to begin
            </div>
            <h2
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: "clamp(34px, 4.2vw, 56px)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                fontWeight: 400,
                color: "#1a1a1a",
              }}
            >
              Tell us what kind of trip
              <br />
              <em style={{ fontWeight: 300 }}>only you would notice.</em>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
          {INTENTS.map((i) => (
            <a
              key={i.key}
              href={i.href}
              data-analytics-id={`home:intent-router:${i.key}`}
              className="group relative bg-[#f6f3ee] hover:bg-[#0b0b0c] border border-black/5 p-8 lg:p-10 transition-all duration-500"
            >
              <div className="flex flex-col h-full min-h-[220px]">
                <div className="text-[11px] tracking-[0.28em] uppercase text-black/50 group-hover:text-[#c8a96a] transition">
                  {i.eyebrow}
                </div>
                <h3
                  style={{
                    fontFamily: "Fraunces, serif",
                    fontSize: "32px",
                    lineHeight: 1.08,
                    letterSpacing: "-0.01em",
                  }}
                  className="mt-3 text-black group-hover:text-white transition"
                >
                  {i.title}
                </h3>
                <p className="mt-3 text-black/65 group-hover:text-white/70 text-[15px] leading-relaxed transition">
                  {i.body}
                </p>
                <div className="mt-auto pt-6 flex items-center justify-between gap-4">
                  <span className="text-[11px] tracking-[0.24em] uppercase text-black/50 group-hover:text-[#c8a96a] transition">
                    {i.metric}
                  </span>
                  <ArrowUpRight
                    size={22}
                    className="text-black/30 group-hover:text-[#c8a96a] group-hover:rotate-12 transition flex-shrink-0"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
