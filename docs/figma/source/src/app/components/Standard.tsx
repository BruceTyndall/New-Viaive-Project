const PILLARS = [
  { n: "01", t: "Audited, not aggregated", b: "Every property in our Atlas is read against a written standard — service depth, room quality, food integrity, sound. If a hotel slips, we say so before you arrive." },
  { n: "02", t: "Editorial over algorithmic", b: "No paid placements. No SEO-padded lists of 47 hotels in Tokyo. A field guide names the four worth a return and tells you which one fits you." },
  { n: "03", t: "Advisor-led, not engine-led", b: "Booked under our partner programs — Four Seasons Preferred, Virtuoso, Belmond Bellini, Rosewood Elite — so your stay carries perks the public site cannot show." },
  { n: "04", t: "Decision-grade intelligence", b: "We measure what changes the trip: weather windows, refurb status, GM tenure, captain quality, migration weeks. The data behind a quiet recommendation." },
];

export function Standard() {
  return (
    <section className="bg-white py-28 lg:py-36 border-y border-black/5">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="text-[11px] tracking-[0.32em] uppercase text-black/50 mb-5">
            The Viaive Standard · Methodology
          </div>
          <h2
            style={{
              fontFamily: "Fraunces, serif",
              fontSize: "clamp(36px, 4.4vw, 60px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              fontWeight: 400,
              color: "#1a1a1a",
            }}
          >
            A standard you can feel
            <br />
            <em style={{ fontWeight: 300 }}>before you arrive.</em>
          </h2>
          <p className="mt-6 text-[17px] text-black/60 leading-relaxed">
            The luxury travel category is loud, paid, and quietly compromised. We built Viaive to
            be the opposite — an editorial intelligence desk whose only product is the next
            decision being the right one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10">
          {PILLARS.map((p) => (
            <div key={p.n} className="bg-white p-10 lg:p-14">
              <div className="flex items-baseline gap-5 mb-4">
                <span
                  style={{ fontFamily: "Fraunces, serif", fontWeight: 300 }}
                  className="text-[#c8a96a] text-[40px]"
                >
                  {p.n}
                </span>
                <h3
                  style={{
                    fontFamily: "Fraunces, serif",
                    fontSize: "26px",
                    letterSpacing: "-0.01em",
                  }}
                  className="text-black"
                >
                  {p.t}
                </h3>
              </div>
              <p className="text-black/65 leading-relaxed text-[15px]">{p.b}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/standard"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-black hover:text-[#c8a96a] border-b border-black hover:border-[#c8a96a] pb-1 transition"
          >
            Read the full methodology
          </a>
        </div>
      </div>
    </section>
  );
}
