'use client'

import { useState, useActionState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { submitBrief, type BriefState } from '@/app/(site)/_actions/brief'

const INTENTS = ['Family & Legacy', 'Honeymoon', 'Wellness · Somatic', 'Safari', 'Cruise / Yacht', 'Ski Week', 'City Suite', "I'm not sure yet"]
const BUDGETS = ['$25–50k', '$50–100k', '$100–250k', '$250k+', 'Prefer not to say']

interface StepperState {
  intent: string
  dates: string
  budget: string
  email: string
  note: string
}

function BriefStepper({ source }: { source?: string }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<StepperState>({ intent: '', dates: '', budget: '', email: '', note: '' })
  const [state, formAction, isPending] = useActionState<BriefState, FormData>(submitBrief, null)

  if (state?.success) {
    return (
      <div className="bg-white text-stone p-8 lg:p-10 border border-white/10 text-center">
        <div className="text-gold mb-4">
          <Check size={40} className="mx-auto" />
        </div>
        <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '28px', lineHeight: 1.1 }}>
          Brief received.
        </h3>
        <p className="mt-3 text-black/65 text-[15px]">
          A senior advisor will write back within 18 hours. No newsletter. No sales call.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="bg-white text-stone p-8 lg:p-10 border border-white/10">
      <input type="hidden" name="intent" value={data.intent} />
      <input type="hidden" name="dates" value={data.dates} />
      <input type="hidden" name="budget" value={data.budget} />
      <input type="hidden" name="source" value={source ?? 'web'} />

      <div className="flex items-center gap-2 mb-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 transition ${i <= step ? 'bg-gold' : 'bg-black/10'}`}
          />
        ))}
      </div>

      {step === 0 && (
        <div>
          <label className="text-[11px] tracking-[0.24em] uppercase text-black/55 block mb-4">
            Step 1 · What kind of trip
          </label>
          <div className="grid grid-cols-2 gap-2">
            {INTENTS.map((intent) => (
              <button
                key={intent}
                type="button"
                onClick={() => setData({ ...data, intent })}
                className={`px-4 py-3 text-left text-[13px] border transition ${
                  data.intent === intent
                    ? 'border-stone bg-stone text-white'
                    : 'border-black/15 hover:border-stone'
                }`}
              >
                {intent}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            disabled={!data.intent}
            className="mt-7 w-full bg-stone text-white py-4 text-[12px] tracking-[0.18em] uppercase disabled:opacity-40 hover:bg-gold hover:text-stone transition flex items-center justify-center gap-2"
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
            className="w-full border-b border-black/20 focus:border-stone outline-none py-3 text-[15px] bg-transparent mb-6"
          />
          <div className="text-[12px] text-black/55 mb-3">Approximate budget</div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {BUDGETS.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setData({ ...data, budget: b })}
                className={`px-3 py-2.5 text-[12px] border transition ${
                  data.budget === b
                    ? 'border-stone bg-stone text-white'
                    : 'border-black/15 hover:border-stone'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
          <div className="flex gap-3 mt-7">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="px-5 py-4 text-[12px] tracking-[0.18em] uppercase border border-black/20 hover:border-stone transition"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!data.dates || !data.budget}
              className="flex-1 bg-stone text-white py-4 text-[12px] tracking-[0.18em] uppercase disabled:opacity-40 hover:bg-gold hover:text-stone transition flex items-center justify-center gap-2"
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
            name="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Email address"
            type="email"
            required
            className="w-full border-b border-black/20 focus:border-stone outline-none py-3 text-[15px] bg-transparent mb-4"
          />
          <textarea
            name="notes"
            value={data.note}
            onChange={(e) => setData({ ...data, note: e.target.value })}
            placeholder="Anything we should know (optional) — quiet preferences, dietary needs, the one thing that has to land."
            rows={3}
            className="w-full border border-black/15 focus:border-stone outline-none p-3 text-[14px] bg-transparent resize-none"
          />
          {state?.error && (
            <p className="mt-3 text-red-600 text-[13px]">{state.error}</p>
          )}
          <div className="flex gap-3 mt-7">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-4 text-[12px] tracking-[0.18em] uppercase border border-black/20 hover:border-stone transition"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!data.email || isPending}
              data-analytics-id="brief:submit"
              className="flex-1 bg-gold text-stone py-4 text-[12px] tracking-[0.18em] uppercase disabled:opacity-40 hover:bg-stone hover:text-white transition flex items-center justify-center gap-2"
            >
              {isPending ? 'Sending…' : <>Send the brief <ArrowRight size={14} /></>}
            </button>
          </div>
          <div className="mt-5 text-[11px] text-black/50 text-center">
            We read it personally. No newsletter, no sales call.
          </div>
        </div>
      )}
    </form>
  )
}

interface Props {
  source?: string
}

export function Brief({ source }: Props) {
  return (
    <section id="brief" className="relative py-28 lg:py-36 bg-stone text-white overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1699311401054-f22f33f5b9ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-stone via-stone/85 to-stone" />

      <div className="relative max-w-[1100px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
          <div>
            <div className="text-[11px] tracking-[0.32em] uppercase text-gold mb-5">
              The Private Brief · 20 Minutes
            </div>
            <h2
              style={{
                fontFamily: 'Fraunces, serif',
                fontSize: 'clamp(36px, 4.2vw, 56px)',
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
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
                'Read by a senior advisor (not routed)',
                'Booked under preferred partner programs',
                'Perks, upgrades, breakfasts attached',
                'Average response: under 18 hours',
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check size={16} className="text-gold mt-1 flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <BriefStepper source={source} />
        </div>
      </div>
    </section>
  )
}
