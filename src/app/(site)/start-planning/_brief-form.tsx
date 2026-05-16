'use client'

import { useActionState } from 'react'
import { submitBrief, type BriefState } from '../_actions/brief'

interface BriefFormProps {
  intent?: string
  desk?: string
  source?: string
}

export function BriefForm({ intent = 'planning', desk = '', source = 'web' }: BriefFormProps) {
  const [state, action, pending] = useActionState<BriefState, FormData>(submitBrief, null)

  if (state?.success) {
    return (
      <div
        className="py-16 text-center"
        style={{ backgroundColor: 'var(--paper-alt)', border: '1px solid rgba(26,26,26,0.12)' }}
      >
        <p
          className="text-[11px] tracking-[0.3em] uppercase mb-4"
          style={{ color: 'var(--stone-mid)' }}
        >
          Received
        </p>
        <h2
          style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(28px, 3vw, 42px)',
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
            color: 'var(--stone)',
          }}
        >
          We&rsquo;ll be in touch.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed" style={{ color: 'var(--stone-mid)' }}>
          Your brief has been received. Expect a reply within one business day.
        </p>
      </div>
    )
  }

  return (
    <form action={action} noValidate>
      <input type="hidden" name="intent" value={intent} />
      {desk && <input type="hidden" name="desk" value={desk} />}
      <input type="hidden" name="source" value={source} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="bf-name"
            className="text-[11px] tracking-[0.25em] uppercase"
            style={{ color: 'var(--stone-mid)' }}
          >
            Name
          </label>
          <input
            id="bf-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className="px-4 py-3 text-[15px] outline-none transition-colors duration-150"
            style={{
              border: '1px solid rgba(26,26,26,0.20)',
              backgroundColor: 'var(--paper)',
              color: 'var(--stone)',
            }}
            data-analytics-id={`${source}:brief:name`}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="bf-email"
            className="text-[11px] tracking-[0.25em] uppercase"
            style={{ color: 'var(--stone-mid)' }}
          >
            Email
          </label>
          <input
            id="bf-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            required
            className="px-4 py-3 text-[15px] outline-none transition-colors duration-150"
            style={{
              border: '1px solid rgba(26,26,26,0.20)',
              backgroundColor: 'var(--paper)',
              color: 'var(--stone)',
            }}
            data-analytics-id={`${source}:brief:email`}
          />
        </div>

        {/* Dates */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="bf-dates"
            className="text-[11px] tracking-[0.25em] uppercase"
            style={{ color: 'var(--stone-mid)' }}
          >
            Travel Dates
          </label>
          <input
            id="bf-dates"
            name="dates"
            type="text"
            placeholder="e.g. March 2026, flexible"
            className="px-4 py-3 text-[15px] outline-none transition-colors duration-150"
            style={{
              border: '1px solid rgba(26,26,26,0.20)',
              backgroundColor: 'var(--paper)',
              color: 'var(--stone)',
            }}
            data-analytics-id={`${source}:brief:dates`}
          />
        </div>

        {/* Budget */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="bf-budget"
            className="text-[11px] tracking-[0.25em] uppercase"
            style={{ color: 'var(--stone-mid)' }}
          >
            Budget Range
          </label>
          <input
            id="bf-budget"
            name="budget"
            type="text"
            placeholder="e.g. $10k–20k per person"
            className="px-4 py-3 text-[15px] outline-none transition-colors duration-150"
            style={{
              border: '1px solid rgba(26,26,26,0.20)',
              backgroundColor: 'var(--paper)',
              color: 'var(--stone)',
            }}
            data-analytics-id={`${source}:brief:budget`}
          />
        </div>

        {/* Notes — full width */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label
            htmlFor="bf-notes"
            className="text-[11px] tracking-[0.25em] uppercase"
            style={{ color: 'var(--stone-mid)' }}
          >
            Tell us about the trip
          </label>
          <textarea
            id="bf-notes"
            name="notes"
            rows={5}
            placeholder="Destination ideas, occasions, what matters most to you…"
            className="px-4 py-3 text-[15px] leading-relaxed outline-none resize-none transition-colors duration-150"
            style={{
              border: '1px solid rgba(26,26,26,0.20)',
              backgroundColor: 'var(--paper)',
              color: 'var(--stone)',
            }}
            data-analytics-id={`${source}:brief:notes`}
          />
        </div>
      </div>

      {state?.error && (
        <p className="mt-4 text-[13px]" style={{ color: 'var(--warning-editorial)' }}>
          {state.error}
        </p>
      )}

      <div className="mt-8">
        <button
          type="submit"
          disabled={pending}
          className="px-8 py-4 text-[12px] tracking-[0.22em] uppercase text-white transition-colors duration-200 hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--stone)', border: '1px solid var(--stone)' }}
          data-analytics-id={`${source}:brief:submit`}
        >
          {pending ? 'Sending…' : 'Send my brief →'}
        </button>
      </div>
    </form>
  )
}
