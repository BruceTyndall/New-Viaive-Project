import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="bg-[#0b0b0c] text-white py-20 lg:py-24 border-t border-white/5">
      <div className="max-w-[920px] mx-auto px-6 lg:px-12 text-center">
        <div className="text-[11px] tracking-[0.32em] uppercase text-[#c8a96a] mb-5">
          The Quiet Letter · Monthly
        </div>
        <h2
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: "clamp(30px, 3.6vw, 44px)",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            fontWeight: 400,
          }}
        >
          One letter a month.
          <br />
          <em style={{ fontWeight: 300 }}>The placements we'd actually make.</em>
        </h2>
        <p className="mt-5 text-white/65 text-[15px] leading-relaxed max-w-xl mx-auto">
          A short editorial brief from the desk — opening reports, refurb watch, the property
          we'd quietly switch a client to this month. No promotions, no list.
        </p>

        {done ? (
          <div className="mt-10 inline-flex items-center gap-3 text-[14px] text-white/80">
            <Check size={18} className="text-[#c8a96a]" />
            Received. The next letter ships first of the month.
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
            className="mt-10 flex flex-col sm:flex-row items-stretch gap-2 max-w-xl mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent border border-white/20 focus:border-white outline-none px-5 py-4 text-[15px] placeholder:text-white/40"
              aria-label="Email"
            />
            <button
              type="submit"
              data-analytics-id="home:email-capture:subscribe"
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-7 py-4 text-[12px] tracking-[0.2em] uppercase hover:bg-[#c8a96a] transition"
            >
              Subscribe <ArrowRight size={14} />
            </button>
          </form>
        )}
        <div className="mt-5 text-[11px] text-white/40">
          You'll receive one letter per month. Unsubscribe anytime. No sharing, no resale.
        </div>
      </div>
    </section>
  );
}
