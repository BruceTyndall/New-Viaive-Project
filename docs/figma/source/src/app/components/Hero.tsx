import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

const INTENTS = [
  { key: "family", label: "Family & Legacy" },
  { key: "fleet", label: "Fleet Intelligence" },
  { key: "somatic", label: "Somatic Silence" },
  { key: "cruise", label: "The Cruise Standard" },
];

export function Hero() {
  return (
    <section className="relative h-[100vh] min-h-[720px] w-full overflow-hidden bg-black">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1683510157012-01a812870de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2400"
        alt="A private overwater villa at twilight — the kind of stay Viaive's editorial advisors quietly secure for clients."
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col justify-end pb-24 lg:pb-32 text-white">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8 text-[11px] tracking-[0.32em] uppercase text-white/70">
            <span className="w-10 h-px bg-white/50" />
            <span>Editorial Intelligence · Est. since the standard mattered</span>
          </div>

          <h1
            className="text-white"
            style={{
              fontFamily: "Fraunces, serif",
              fontSize: "clamp(44px, 6.5vw, 92px)",
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            The travel decisions
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>that quietly</em> shape a life.
          </h1>

          <p className="mt-8 max-w-xl text-white/80 text-[17px] leading-relaxed">
            Viaive is an editorial advisory for travelers who treat every booking as a decision —
            not a transaction. We audit the world's hotels, ships, camps and villas, then place
            you inside the ones that hold the standard.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/start-planning"
              data-analytics-id="home:hero:start-planning"
              className="group inline-flex items-center gap-3 bg-white text-black px-7 py-4 text-[13px] tracking-[0.18em] uppercase hover:bg-[#c8a96a] hover:text-black transition-all duration-300"
            >
              Start Planning
              <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
            </a>
            <a
              href="/concierge"
              data-analytics-id="home:hero:concierge"
              className="inline-flex items-center gap-2 text-[13px] tracking-[0.18em] uppercase text-white/90 hover:text-white border-b border-white/30 hover:border-white pb-1 transition"
            >
              Begin a private brief
            </a>
          </div>

          <div className="mt-14">
            <div className="text-[11px] tracking-[0.28em] uppercase text-white/50 mb-4">
              I'm planning for —
            </div>
            <div className="flex flex-wrap gap-2">
              {INTENTS.map((i) => (
                <a
                  key={i.key}
                  href={`/?intent=${i.key}`}
                  className="px-4 py-2 border border-white/25 hover:border-white hover:bg-white/10 text-[13px] tracking-wide transition rounded-full backdrop-blur-sm"
                >
                  {i.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 lg:right-12 text-[10px] tracking-[0.3em] uppercase text-white/40 z-10">
        Scroll · The Standard
      </div>
    </section>
  );
}
