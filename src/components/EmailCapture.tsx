'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface EmailCaptureProps {
  eyebrow?: string
  headline?: string
  italicHeadline?: string
  lede?: string
  placeholder?: string
  consentText?: string
  successText?: string
}

export function EmailCapture({
  eyebrow = 'The Quiet Letter · Monthly',
  headline = 'One letter a month.',
  italicHeadline = 'The placements we\'d actually make.',
  lede = 'A short editorial brief from the desk — opening reports, refurb watch, the property we\'d quietly switch a client to this month. No promotions, no list.',
  placeholder = 'your@email.com',
  consentText = 'You\'ll receive one letter per month. Unsubscribe anytime. No sharing, no resale.',
  successText = 'Received. The next letter ships first of the month.',
}: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setState('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setState('success')
        setEmail('')
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg(data?.error ?? 'Something went wrong. Please try again.')
        setState('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setState('error')
    }
  }

  const isSubmitting = state === 'submitting'

  return (
    <section
      aria-labelledby="email-capture-heading"
      className="py-20 lg:py-24"
      style={{ backgroundColor: 'var(--stone-alt)', color: 'var(--white)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="max-w-[920px] mx-auto px-6 lg:px-12 text-center">
        <p className="text-[11px] tracking-[0.32em] uppercase text-gold mb-5">{eyebrow}</p>

        <h2
          id="email-capture-heading"
          style={{
            fontFamily: 'Fraunces, serif',
            fontSize: 'clamp(30px, 3.6vw, 44px)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            fontWeight: 400,
          }}
        >
          {headline}
          <br />
          <em style={{ fontWeight: 300 }}>{italicHeadline}</em>
        </h2>

        <p className="mt-5 text-white/65 text-[15px] leading-relaxed max-w-xl mx-auto">{lede}</p>

        {state === 'success' ? (
          <div
            className="mt-10 inline-flex items-center gap-3 text-[14px] text-white/80"
            role="status"
            aria-live="polite"
          >
            <Check size={18} className="text-gold flex-shrink-0" aria-hidden="true" />
            {successText}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col sm:flex-row items-stretch gap-2 max-w-xl mx-auto"
            noValidate
          >
            <label htmlFor="email-capture-input" className="sr-only">
              Email address
            </label>
            <input
              id="email-capture-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              autoComplete="email"
              disabled={isSubmitting}
              className="flex-1 bg-transparent px-5 py-4 text-[15px] placeholder:text-white/40 outline-none transition-colors duration-150 disabled:opacity-50"
              style={{
                border: state === 'error' ? '1px solid var(--warning-editorial)' : '1px solid rgba(255,255,255,0.20)',
              }}
              aria-describedby={state === 'error' ? 'email-capture-error' : 'email-capture-consent'}
              aria-invalid={state === 'error'}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              data-analytics-id="home:email-capture:subscribe"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-[12px] tracking-[0.2em] uppercase transition-colors duration-200 disabled:opacity-60"
              style={{
                backgroundColor: isSubmitting ? 'var(--stone-mid)' : 'var(--white)',
                color: 'var(--stone)',
              }}
            >
              {isSubmitting ? 'Sending…' : 'Subscribe'}
              {!isSubmitting && <ArrowRight size={14} aria-hidden="true" />}
            </button>
          </form>
        )}

        {state === 'error' && (
          <p
            id="email-capture-error"
            role="alert"
            aria-live="polite"
            className="mt-3 text-[13px]"
            style={{ color: 'var(--warning-editorial)' }}
          >
            {errorMsg}
          </p>
        )}

        <p id="email-capture-consent" className="mt-5 text-[11px] text-white/40">
          {consentText}
        </p>
      </div>
    </section>
  )
}
