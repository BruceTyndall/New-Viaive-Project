import type { Metadata } from 'next'

export const metadata: Metadata = { robots: 'noindex' }

/* ─── Color token catalog -------------------------------------------------- */
const colors = [
  { name: '--paper',             hex: '#F9F7F2',                    role: 'Primary background' },
  { name: '--paper-alt',         hex: '#F4F1EA',                    role: 'Inset surfaces' },
  { name: '--stone',             hex: '#1a1a1a',                    role: 'Ink, borders, dark sections' },
  { name: '--stone-alt',         hex: '#0b0b0c',                    role: 'Deep tile interior' },
  { name: '--stone-mid',         hex: '#4A4A4A',                    role: 'Secondary text on paper' },
  { name: '--gold',              hex: '#c8a96a',                    role: 'Accent, hover, affiliate flag' },
  { name: '--gold-soft',         hex: 'rgba(200,169,106,0.4)',       role: 'Dividers, low-emphasis borders' },
  { name: '--white',             hex: '#FFFFFF',                    role: 'Type on dark sections only' },
  { name: '--muted',             hex: '#9aa3b2',                    role: 'Neutral status' },
  { name: '--success-editorial', hex: '#5f7a5b',                    role: 'Reserved — approved badge' },
  { name: '--warning-editorial', hex: '#a06a2c',                    role: 'Reserved — review-needed' },
]

/* ─── Type scale catalog --------------------------------------------------- */
const typeScale = [
  {
    label: 'Eyebrow',
    family: 'Inter 500',
    style: { fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase' as const, lineHeight: 1.2 },
    sample: 'SECTION EYEBROW',
  },
  {
    label: 'Meta / Label',
    family: 'Inter 500',
    style: { fontFamily: 'Inter, system-ui, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '0.30em', textTransform: 'uppercase' as const, lineHeight: 1.2 },
    sample: 'TIER LABEL · STATUS FLAG',
  },
  {
    label: 'Micro',
    family: 'Inter 400',
    style: { fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', lineHeight: 1.4 },
    sample: 'Micro caption text',
  },
  {
    label: 'Small',
    family: 'Inter 400',
    style: { fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', lineHeight: 1.55 },
    sample: 'Small captions, disclosures, footnotes',
  },
  {
    label: 'Body Tight',
    family: 'Inter 400',
    style: { fontFamily: 'Inter, system-ui, sans-serif', fontSize: '15px', lineHeight: 1.6 },
    sample: 'Body tight — condensed editorial, sidebar copy',
  },
  {
    label: 'Body',
    family: 'Inter 400',
    style: { fontFamily: 'Inter, system-ui, sans-serif', fontSize: '18px', lineHeight: 1.7 },
    sample: 'Body — long-form editorial prose, the comfortable reading size.',
  },
  {
    label: 'H3',
    family: 'Fraunces 400',
    style: { fontFamily: 'Fraunces, serif', fontSize: '30px', lineHeight: 1.1, letterSpacing: '-0.01em' },
    sample: 'Section Heading',
  },
  {
    label: 'H2',
    family: 'Fraunces 400',
    style: { fontFamily: 'Fraunces, serif', fontSize: 'clamp(34px, 4.2vw, 56px)', lineHeight: 1.02, letterSpacing: '-0.02em' },
    sample: 'Rail & Module Heading',
  },
  {
    label: 'H1',
    family: 'Fraunces 400',
    style: { fontFamily: 'Fraunces, serif', fontSize: 'clamp(40px, 5.4vw, 72px)', lineHeight: 1, letterSpacing: '-0.025em' },
    sample: 'Page Lead Headline',
  },
  {
    label: 'Display Italic',
    family: 'Fraunces 300 italic',
    style: { fontFamily: 'Fraunces, serif', fontSize: 'clamp(40px, 5.4vw, 72px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1, letterSpacing: '-0.025em' },
    sample: 'Display Italic Emphasis',
  },
]

/* ─── Space scale catalog -------------------------------------------------- */
const spaceScale = [
  { name: '--space-0',  value: '0',     px: 0 },
  { name: '--space-1',  value: '4px',   px: 4 },
  { name: '--space-2',  value: '8px',   px: 8 },
  { name: '--space-3',  value: '12px',  px: 12 },
  { name: '--space-4',  value: '16px',  px: 16 },
  { name: '--space-5',  value: '20px',  px: 20 },
  { name: '--space-6',  value: '24px',  px: 24 },
  { name: '--space-8',  value: '32px',  px: 32 },
  { name: '--space-10', value: '40px',  px: 40 },
  { name: '--space-12', value: '48px',  px: 48 },
  { name: '--space-16', value: '64px',  px: 64 },
  { name: '--space-20', value: '80px',  px: 80 },
  { name: '--space-24', value: '96px',  px: 96 },
  { name: '--space-32', value: '128px', px: 128 },
]

/* ─── Shadow catalog ------------------------------------------------------- */
const shadows = [
  { name: 'paper-lift',      label: 'shadow-paper-lift',      shadow: '6px 6px 0 0 #1a1a1a',    use: 'Card resting state' },
  { name: 'paper-lift-gold', label: 'shadow-paper-lift-gold', shadow: '6px 6px 0 0 #c8a96a',    use: 'Card highlight / hover' },
  { name: 'paper-lift-lg',   label: 'shadow-paper-lift-lg',   shadow: '8px 8px 0 0 #c8a96a',    use: 'Hero CTA' },
  { name: 'paper-lift-xl',   label: 'shadow-paper-lift-xl',   shadow: '12px 12px 0 0 #1a1a1a',  use: 'Exit-intent modal' },
]

/* ─────────────────────────────────────────────────────────────────────────── */

export default function StyleGuidePage() {
  return (
    <main style={{ backgroundColor: 'var(--paper)', color: 'var(--stone)', minHeight: '100vh', padding: '64px 48px', maxWidth: '1280px', margin: '0 auto' }}>
      <header style={{ marginBottom: '80px', borderBottom: 'var(--border-rule)', paddingBottom: '32px' }}>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--stone-mid)', marginBottom: '12px' }}>
          Internal · noindex
        </p>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(40px, 5.4vw, 72px)', lineHeight: 1, letterSpacing: '-0.025em' }}>
          Viaive Style Guide
        </h1>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '18px', lineHeight: 1.7, color: 'var(--stone-mid)', marginTop: '16px' }}>
          Digital Stone &amp; Paper — v1.0.0 · Source: docs/figma/source/docs/design-tokens.json
        </p>
      </header>

      {/* ── 1. Color Swatches ─────────────────────────────────────────────── */}
      <section style={{ marginBottom: '96px' }}>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--stone-mid)', marginBottom: '24px' }}>
          01 — Color
        </p>
        <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(34px, 4.2vw, 56px)', lineHeight: 1.02, letterSpacing: '-0.02em', marginBottom: '40px' }}>
          Color Tokens
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
          {colors.map((c) => (
            <div key={c.name} style={{ border: 'var(--border-rule)', overflow: 'hidden' }}>
              <div
                style={{
                  height: '96px',
                  backgroundColor: c.hex,
                  border: c.hex === '#FFFFFF' ? '1px solid rgba(26,26,26,0.15)' : undefined,
                }}
              />
              <div style={{ padding: '16px', backgroundColor: 'var(--paper-alt)' }}>
                <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--stone-mid)', marginBottom: '4px' }}>
                  {c.name}
                </p>
                <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
                  {c.hex}
                </p>
                <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', color: 'var(--stone-mid)', lineHeight: 1.4 }}>
                  {c.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. Type Scale ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: '96px' }}>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--stone-mid)', marginBottom: '24px' }}>
          02 — Typography
        </p>
        <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(34px, 4.2vw, 56px)', lineHeight: 1.02, letterSpacing: '-0.02em', marginBottom: '40px' }}>
          Type Scale
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {typeScale.map((step) => (
            <div key={step.label} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '24px', alignItems: 'start', borderBottom: 'var(--border-hairline)', padding: '24px 0' }}>
              <div>
                <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--stone-mid)', marginBottom: '4px' }}>
                  {step.label}
                </p>
                <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', color: 'var(--stone-mid)' }}>
                  {step.family}
                </p>
              </div>
              <p style={step.style}>{step.sample}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Space Scale ────────────────────────────────────────────────── */}
      <section style={{ marginBottom: '96px' }}>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--stone-mid)', marginBottom: '24px' }}>
          03 — Space
        </p>
        <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(34px, 4.2vw, 56px)', lineHeight: 1.02, letterSpacing: '-0.02em', marginBottom: '40px' }}>
          Space Scale
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {spaceScale.map((s) => (
            <div key={s.name} style={{ display: 'grid', gridTemplateColumns: '140px auto 1fr', gap: '16px', alignItems: 'center' }}>
              <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', fontWeight: 500, color: 'var(--stone-mid)' }}>
                {s.name}
              </p>
              <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', fontWeight: 600, minWidth: '48px' }}>
                {s.value}
              </p>
              <div
                style={{
                  height: '16px',
                  backgroundColor: 'var(--stone)',
                  width: s.px === 0 ? '2px' : `${s.px}px`,
                  minWidth: s.px === 0 ? '2px' : undefined,
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Shadow Patterns ────────────────────────────────────────────── */}
      <section style={{ marginBottom: '96px' }}>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--stone-mid)', marginBottom: '24px' }}>
          04 — Shadows
        </p>
        <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(34px, 4.2vw, 56px)', lineHeight: 1.02, letterSpacing: '-0.02em', marginBottom: '40px' }}>
          Shadow Patterns
        </h2>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '15px', lineHeight: 1.6, color: 'var(--stone-mid)', marginBottom: '48px', maxWidth: '70ch' }}>
          All shadows are solid color offsets with zero blur. No <code style={{ fontFamily: 'monospace', fontSize: '13px', backgroundColor: 'var(--paper-alt)', padding: '1px 6px' }}>drop-shadow</code> blur values anywhere.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '48px' }}>
          {shadows.map((s) => (
            <div key={s.name}>
              <div
                style={{
                  border: 'var(--border-rule)',
                  backgroundColor: 'var(--paper)',
                  boxShadow: s.shadow,
                  padding: '32px 24px',
                  marginBottom: '16px',
                }}
              >
                <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', fontWeight: 500, textAlign: 'center' }}>
                  {s.label}
                </p>
              </div>
              <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--stone-mid)', marginBottom: '4px' }}>
                .{s.label}
              </p>
              <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', color: 'var(--stone-mid)' }}>
                {s.use}
              </p>
              <p style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--stone-mid)', marginTop: '4px' }}>
                {s.shadow}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Focus Ring Demo ────────────────────────────────────────────── */}
      <section style={{ marginBottom: '96px' }}>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--stone-mid)', marginBottom: '24px' }}>
          05 — Focus
        </p>
        <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(34px, 4.2vw, 56px)', lineHeight: 1.02, letterSpacing: '-0.02em', marginBottom: '40px' }}>
          Focus Ring
        </h2>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '15px', lineHeight: 1.6, color: 'var(--stone-mid)', marginBottom: '32px', maxWidth: '70ch' }}>
          Tab to the button below to see the gold focus ring. Spec: <code style={{ fontFamily: 'monospace', fontSize: '13px', backgroundColor: 'var(--paper-alt)', padding: '1px 6px' }}>outline: 2px solid #c8a96a; outline-offset: 4px</code> — never <code style={{ fontFamily: 'monospace', fontSize: '13px', backgroundColor: 'var(--paper-alt)', padding: '1px 6px' }}>outline: none</code>.
        </p>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            style={{
              border: 'var(--border-rule)',
              backgroundColor: 'var(--stone)',
              color: 'var(--white)',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '15px',
              fontWeight: 500,
              padding: '12px 32px',
              cursor: 'pointer',
            }}
          >
            Tab to me — Primary CTA
          </button>
          <button
            style={{
              border: 'var(--border-rule)',
              backgroundColor: 'var(--paper)',
              color: 'var(--stone)',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '15px',
              fontWeight: 500,
              padding: '12px 32px',
              cursor: 'pointer',
            }}
          >
            Tab to me — Secondary CTA
          </button>
          <a
            href="#focus-demo"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '15px',
              color: 'var(--stone)',
              textDecoration: 'underline',
            }}
          >
            Tab to me — Link
          </a>
        </div>
      </section>

      {/* ── 6. Motion Demo ────────────────────────────────────────────────── */}
      <section id="focus-demo" style={{ marginBottom: '96px' }}>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--stone-mid)', marginBottom: '24px' }}>
          06 — Motion
        </p>
        <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(34px, 4.2vw, 56px)', lineHeight: 1.02, letterSpacing: '-0.02em', marginBottom: '40px' }}>
          Press Pattern &amp; Easing
        </h2>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '15px', lineHeight: 1.6, color: 'var(--stone-mid)', marginBottom: '32px', maxWidth: '70ch' }}>
          Hover the buttons below to see the Stone & Paper press pattern: +2px translate, shadow collapses to zero. Uses <code style={{ fontFamily: 'monospace', fontSize: '13px', backgroundColor: 'var(--paper-alt)', padding: '1px 6px' }}>ease-stone</code> — <code style={{ fontFamily: 'monospace', fontSize: '13px', backgroundColor: 'var(--paper-alt)', padding: '1px 6px' }}>cubic-bezier(0.2, 0.7, 0.2, 1)</code>.
        </p>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', color: 'var(--stone-mid)', marginBottom: '40px' }}>
          ↓ Motion disabled when <code style={{ fontFamily: 'monospace', fontSize: '12px', backgroundColor: 'var(--paper-alt)', padding: '1px 6px' }}>prefers-reduced-motion: reduce</code> is active (System Settings → Accessibility → Reduce Motion).
        </p>
        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
          {/* Stone surface press */}
          <div>
            <button
              className="shadow-paper-lift hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-press transition-all duration-200 ease-stone"
              style={{
                border: 'var(--border-rule)',
                backgroundColor: 'var(--stone)',
                color: 'var(--white)',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '15px',
                fontWeight: 500,
                padding: '16px 40px',
                cursor: 'pointer',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              Stone Surface — Press
            </button>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', color: 'var(--stone-mid)' }}>
              shadow-paper-lift → shadow-press on hover
            </p>
          </div>
          {/* Paper card press */}
          <div>
            <button
              className="shadow-paper-lift-gold hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-press transition-all duration-200 ease-stone"
              style={{
                border: 'var(--border-rule)',
                backgroundColor: 'var(--paper)',
                color: 'var(--stone)',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '15px',
                fontWeight: 500,
                padding: '16px 40px',
                cursor: 'pointer',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              Paper Card — Press
            </button>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', color: 'var(--stone-mid)' }}>
              shadow-paper-lift-gold → shadow-press on hover
            </p>
          </div>
        </div>

        {/* Easing reference table */}
        <div style={{ marginTop: '48px', border: 'var(--border-rule)', overflow: 'hidden' }}>
          <div style={{ backgroundColor: 'var(--stone)', color: 'var(--white)', padding: '12px 24px' }}>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase' }}>
              Easing Reference
            </p>
          </div>
          {[
            { token: '--ease-stone / ease-stone', curve: 'cubic-bezier(0.2, 0.7, 0.2, 1)',  use: 'Decisive — buttons, links, press patterns' },
            { token: '--ease-paper / ease-paper', curve: 'cubic-bezier(0.4, 0, 0.2, 1)',    use: 'Settle — modals, drawers, sidebars' },
          ].map((row, i) => (
            <div key={row.token} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0', borderTop: i === 0 ? undefined : 'var(--border-hairline)', padding: '16px 24px' }}>
              <code style={{ fontFamily: 'monospace', fontSize: '12px' }}>{row.token}</code>
              <code style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--stone-mid)' }}>{row.curve}</code>
              <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', color: 'var(--stone-mid)' }}>{row.use}</p>
            </div>
          ))}
          {[
            { token: '--duration-fast',   value: '150ms', use: 'Micro hover, focus ring' },
            { token: '--duration-base',   value: '200ms', use: 'Press, color, border' },
            { token: '--duration-slow',   value: '300ms', use: 'Rail hover, accordion' },
            { token: '--duration-scroll', value: '600ms', use: 'Anchor scrolls' },
          ].map((row) => (
            <div key={row.token} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0', borderTop: 'var(--border-hairline)', padding: '16px 24px' }}>
              <code style={{ fontFamily: 'monospace', fontSize: '12px' }}>{row.token}</code>
              <code style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--stone-mid)' }}>{row.value}</code>
              <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', color: 'var(--stone-mid)' }}>{row.use}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: 'var(--border-rule)', paddingTop: '32px' }}>
        <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '13px', color: 'var(--stone-mid)' }}>
          Viaive Style Guide · Phase 3: TOKENS · Internal use only · Not indexed
        </p>
      </footer>
    </main>
  )
}
