import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "How is Viaive different from a traditional luxury travel agent?",
    a: "Most agencies sell volume. We run a desk model — five senior advisors, each with a verified bench of properties they have personally inspected. Every recommendation passes the Viaive Standard, an internal methodology that audits service depth, room quality, food integrity and on-the-ground sound. We publish the editorial behind it so you can read the reasoning before you book.",
  },
  {
    q: "Do you charge a fee?",
    a: "No planning fee for our advisory work on hotels, ships, villas, safari and ski. We're compensated by our preferred-partner programs, which is why we book under Four Seasons Preferred, Virtuoso, Belmond Bellini Club, Rosewood Elite and similar — at no cost to you, with perks attached. For complex multi-stop itineraries, we may quote a planning retainer upfront.",
  },
  {
    q: "Will I pay more booking through Viaive?",
    a: "You pay the same published rate the hotel offers anyone. The difference is what comes with it: complimentary upgrades when available, daily breakfast, $100 property credits, late checkout, and a name on the front desk that the General Manager knows. We do not mark up.",
  },
  {
    q: "How fast do you respond to a brief?",
    a: "Most briefs receive a written placement — not a list — within 18 hours. Concierge-level urgent travel (a missed connection, a property switch on the ground) is responded to within the hour, by an advisor who already knows your file.",
  },
  {
    q: "What if I'm not sure what kind of trip I want yet?",
    a: "That's the most common brief we receive. The 20-minute call is designed for it. We listen for what you don't say — the trip behind the trip — and return one or two written placements that fit the life you're trying to live, not the search you'd type into Google.",
  },
  {
    q: "Do you work with families and children?",
    a: "Yes. Our Family Desk (VIA-WO-104) specializes in multi-generational and legacy travel — properties that hold a standard for a four-year-old and an eighty-year-old at the same table. We audit kids' clubs, room layouts, medical access and quiet hours before we place you.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-white py-28 lg:py-36">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <div className="text-[11px] tracking-[0.32em] uppercase text-black/50 mb-5">
            Questions, answered editorially
          </div>
          <h2
            style={{
              fontFamily: "Fraunces, serif",
              fontSize: "clamp(34px, 4vw, 52px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              fontWeight: 400,
              color: "#1a1a1a",
            }}
          >
            What clients ask
            <br />
            <em style={{ fontWeight: 300 }}>before the first brief.</em>
          </h2>
        </div>

        <div
          className="divide-y divide-black/10 border-y border-black/10"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          {FAQS.map((f, i) => (
            <div
              key={i}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              className="py-2"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-start justify-between gap-6 py-6 text-left group"
              >
                <span
                  itemProp="name"
                  style={{
                    fontFamily: "Fraunces, serif",
                    fontSize: "22px",
                    lineHeight: 1.25,
                    color: "#1a1a1a",
                  }}
                  className="group-hover:text-[#c8a96a] transition"
                >
                  {f.q}
                </span>
                <span className="text-black/40 flex-shrink-0 mt-1">
                  {open === i ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              {open === i && (
                <div
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                  className="pb-7 pr-10"
                >
                  <p itemProp="text" className="text-black/65 text-[15px] leading-relaxed">
                    {f.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
