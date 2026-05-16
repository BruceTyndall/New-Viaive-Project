'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface HeroProps {
  eyebrow?: string
  headline?: string
  italicHeadline?: string
  lede?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  imageSrc?: string
  imageAlt?: string
}

const INTENTS = [
  { key: 'family', label: 'Family & Legacy', href: '/?intent=family' },
  { key: 'wellness', label: 'Wellness & Silence', href: '/?intent=somatic' },
  { key: 'safari', label: 'Safari & Camps', href: '/?intent=safari' },
  { key: 'hotel', label: 'The Right Hotel', href: '/?intent=hotel' },
]

export function Hero({
  eyebrow = 'Editorial Intelligence · Est. since the standard mattered',
  headline = 'The travel decisions',
  italicHeadline = 'that quietly shape a life.',
  lede = 'Viaive is an editorial advisory for travelers who treat every booking as a decision — not a transaction. We audit the world\'s hotels, ships, camps and villas, then place you inside the ones that hold the standard.',
  primaryCta = { label: 'Start Planning', href: '/start-planning' },
  secondaryCta = { label: 'Begin a private brief', href: '/concierge' },
  imageSrc = 'https://images.unsplash.com/photo-1683510157012-01a812870de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2400',
  imageAlt = 'A private overwater villa at twilight — the kind of stay Viaive\'s editorial advisors quietly secure for clients.',
}: HeroProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: '#000' }}>
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        fetchPriority="high"
        className="object-cover scale-105"
        sizes="100vw"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 min-h-screen max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col justify-end pb-24 lg:pb-32 text-white">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-px bg-white/50" aria-hidden="true" />
            <span className="text-[11px] tracking-[0.32em] uppercase text-white/70">{eyebrow}</span>
          </div>

          {/* Headline */}
          <h1
            className="text-white"
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(44px, 6.5vw, 92px)',
              lineHeight: 0.98,
              letterSpacing: '-0.02em',
              fontWeight: 400,
            }}
          >
            {headline}
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 300 }}>{italicHeadline}</em>
          </h1>

          {/* Lede */}
          <p className="mt-8 max-w-xl text-white/80 text-[17px] leading-relaxed">{lede}</p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={primaryCta.href}
              data-analytics-id="home:hero:start-planning"
              className="group inline-flex items-center gap-3 px-7 py-4 text-[13px] tracking-[0.18em] uppercase transition-all duration-300"
              style={{ backgroundColor: 'var(--white)', color: 'var(--stone)' }}
              onMouseOver={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor = 'var(--gold)'
              }}
              onMouseOut={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor = 'var(--white)'
              }}
            >
              {primaryCta.label}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>

            <Link
              href={secondaryCta.href}
              data-analytics-id="home:hero:concierge"
              className="inline-flex items-center gap-2 text-[13px] tracking-[0.18em] uppercase text-white/90 hover:text-white pb-1 transition-colors duration-200"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.30)' }}
            >
              {secondaryCta.label}
            </Link>
          </div>

          {/* Intent chips */}
          <div className="mt-14">
            <div className="text-[11px] tracking-[0.28em] uppercase text-white/50 mb-4">I&apos;m planning for —</div>
            <div className="flex flex-wrap gap-2">
              {INTENTS.map((i) => (
                <Link
                  key={i.key}
                  href={i.href}
                  data-analytics-id={`home:hero:intent:${i.key}`}
                  className="px-4 py-2 text-[13px] tracking-wide transition-all duration-200 backdrop-blur-sm"
                  style={{ border: '1px solid rgba(255,255,255,0.25)' }}
                >
                  {i.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-6 right-6 lg:right-12 text-[10px] tracking-[0.3em] uppercase text-white/40 z-10"
        aria-hidden="true"
      >
        Scroll · The Standard
      </div>
    </section>
  )
}
