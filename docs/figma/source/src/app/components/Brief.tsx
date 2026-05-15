import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const INTENTS = ["Family & Legacy", "Honeymoon", "Wellness · Somatic", "Safari", "Cruise / Yacht", "Ski Week", "City Suite", "I'm not sure yet"];
const BUDGETS = ["$25–50k", "$50–100k", "$100–250k", "$250k+", "Prefer not to say"];

export function Brief() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ intent: "", dates: "", budget: "", email: "", note: "" });

  return (
    <section id="brief" className="relative py-28 lg:py-36 bg-[#0b0b0c] text-white overflow-hidden">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1699311401054-f22f33f5b9ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0c] via-[#0b0b0c]/85 to-[#0b0b0c]" />

      <div className="relative max-w-[1100px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
          <div>
            <div className="text-[11px] tracking-[0.32em] uppercase text-[#c8a96a] mb-5">
              The Private Brief · 20 Minutes
            </div>
            <h2
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: "clamp(36px, 4.2vw, 56px)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              Tell us the trip
              <br />
              <em style={{ fontWeight: 300 }}>only you would notice.</em>
            </h2>
            <p className="mt-6 text-white/70 text-[16px] leading-relaxed">
              Our concierge reads every brief personally. You receive a written placement —
              not a quote — within two business days. No fees, no obligation, no sales call.
            </p>
            <ul className="mt-8 space-y-3 text-[14px] text-white/75">
              {[
                "Read by a senior advisor (not routed)",
                "Booked under preferred partner programs",
                "Perks, upgrades, breakfasts attached",
                "Average response: under 18 hours",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check size={16} className="text-[#c8a96a] mt-1 flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white text-black p-8 lg:p-10 border border-white/10">
            <div className="flex items-center gap-2 mb-8">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 transition ${i <= step ? "bg-[#c8a96a]" : "bg-black/10"}`}
                />
              ))}
            </div>

            {step === 0 && (
              <div>
                <label className="text-[11px] tracking-[0.24em] uppercase text-black/55 block mb-4">
                  Step 1 · What kind of trip
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {INTENTS.map((i) => (
                    <button
                      key={i}
                      onClick={() => setData({ ...data, intent: i })}
                      className={`px-4 py-3 text-left text-[13px] border transition ${
                        data.intent === i
                          ? "border-black bg-black text-white"
                          : "border-black/15 hover:border-black"
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(1)}
                  disabled={!data.intent}
                  className="mt-7 w-full bg-black text-white py-4 text-[12px] tracking-[0.18em] uppercase disabled:opacity-40 hover:bg-[#c8a96a] hover:text-black transition flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight size={14} />
                </button>
              </div>
            )}

            {step === 1 && (
              <div>
                <label className="text-[11px] tracking-[0.24em] uppercase text-black/55 block mb-4">
                  Step 2 · When & how much
                </label>
                <input
                  value={data.dates}
                  onChange={(e) => setData({ ...data, dates: e.target.value })}
                  placeholder="Approximate dates (e.g. March 2026, two weeks)"
                  className="w-full border-b border-black/20 focus:border-black outline-none py-3 text-[15px] bg-transparent mb-6"
                />
                <div className="text-[12px] text-black/55 mb-3">Approximate budget</div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {BUDGETS.map((b) => (
                    <button
                      key={b}
                      onClick={() => setData({ ...data, budget: b })}
                      className={`px-3 py-2.5 text-[12px] border transition ${
                        data.budget === b
                          ? "border-black bg-black text-white"
                          : "border-black/15 hover:border-black"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-7">
                  <button onClick={() => setStep(0)} className="px-5 py-4 text-[12px] tracking-[0.18em] uppercase border border-black/20 hover:border-black transition">
                    Back
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!data.dates || !data.budget}
                    className="flex-1 bg-black text-white py-4 text-[12px] tracking-[0.18em] uppercase disabled:opacity-40 hover:bg-[#c8a96a] hover:text-black transition flex items-center justify-center gap-2"
                  >
                    Continue <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <label className="text-[11px] tracking-[0.24em] uppercase text-black/55 block mb-4">
                  Step 3 · Where to send the placement
                </label>
                <input
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder="Email address"
                  type="email"
                  className="w-full border-b border-black/20 focus:border-black outline-none py-3 text-[15px] bg-transparent mb-4"
                />
                <textarea
                  value={data.note}
                  onChange={(e) => setData({ ...data, note: e.target.value })}
                  placeholder="Anything we should know (optional) — quiet preferences, dietary needs, the one thing that has to land."
                  rows={3}
                  className="w-full border border-black/15 focus:border-black outline-none p-3 text-[14px] bg-transparent resize-none"
                />
                <div className="flex gap-3 mt-7">
                  <button onClick={() => setStep(1)} className="px-5 py-4 text-[12px] tracking-[0.18em] uppercase border border-black/20 hover:border-black transition">
                    Back
                  </button>
                  <button
                    disabled={!data.email}
                    className="flex-1 bg-[#c8a96a] text-black py-4 text-[12px] tracking-[0.18em] uppercase disabled:opacity-40 hover:bg-black hover:text-white transition flex items-center justify-center gap-2"
                  >
                    Send the brief <ArrowRight size={14} />
                  </button>
                </div>
                <div className="mt-5 text-[11px] text-black/50 text-center">
                  We read it personally. No newsletter, no sales call.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
