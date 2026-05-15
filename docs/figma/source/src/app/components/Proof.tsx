const QUOTES = [
  {
    q: "We've travelled with the big names. Viaive is the first advisory that actually changed where we stayed — and the third night told us why.",
    a: "M.K.",
    r: "Family of five · Returning client, four journeys",
  },
  {
    q: "I asked for a quiet week. They gave me a property that would not be on the first ten pages of a Google search. That is the product.",
    a: "Dr. L.",
    r: "Wellness brief · Bali → Kyoto",
  },
  {
    q: "Our family office uses Viaive for the trips that have to land. It is the most decision-grade travel intelligence we have found.",
    a: "Principal",
    r: "Single-family office, NY",
  },
];

const STATS = [
  { v: "27", l: "Cities in the live Atlas" },
  { v: "14", l: "Country-bench safari relationships" },
  { v: "6", l: "Preferred-partner programs" },
  { v: "92%", l: "Returning client rate, 24-month window" },
];

export function Proof() {
  return (
    <section className="bg-[#f6f3ee] py-28 lg:py-36">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10 mb-20">
          {STATS.map((s) => (
            <div key={s.l} className="bg-[#f6f3ee] p-8 text-center">
              <div
                style={{
                  fontFamily: "Fraunces, serif",
                  fontSize: "56px",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  fontWeight: 300,
                  color: "#c8a96a",
                }}
              >
                {s.v}
              </div>
              <div className="mt-3 text-[11px] tracking-[0.24em] uppercase text-black/60">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {QUOTES.map((q, i) => (
            <figure key={i} className="bg-white p-10 border border-black/5">
              <div
                style={{ fontFamily: "Fraunces, serif", color: "#c8a96a", fontWeight: 300 }}
                className="text-[56px] leading-none mb-2"
              >
                "
              </div>
              <blockquote
                style={{
                  fontFamily: "Fraunces, serif",
                  fontSize: "20px",
                  lineHeight: 1.4,
                  color: "#1a1a1a",
                  fontWeight: 400,
                }}
              >
                {q.q}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-black/10">
                <div className="text-[14px] text-black">— {q.a}</div>
                <div className="text-[12px] text-black/55 mt-1">{q.r}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
