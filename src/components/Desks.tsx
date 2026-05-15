import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Desk {
  tag: string
  title: string
  href: string
  blurb: string
  image: string
  imageAlt: string
  cta: string
}

interface DesksProps {
  headline?: string
  italicHeadline?: string
  desks?: Desk[]
}

const DEFAULT_DESKS: Desk[] = [
  {
    tag: 'Hotel Desk',
    title: 'Hotel Desk',
    href: '/desks/hotel',
    blurb: 'Suites we have personally inspected. Upgrades, breakfasts, $100 credits and quiet preferences negotiated by name — not by booking engine.',
    image: 'https://images.unsplash.com/photo-1513323813850-c7318e3efc71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    imageAlt: 'An elevated hotel suite with considered design — Hotel Desk, Viaive',
    cta: 'Brief the Hotel Desk',
  },
  {
    tag: 'Family Desk',
    title: 'Family Desk',
    href: '/desks/family',
    blurb: 'Multi-generational journeys that hold a standard for the four-year-old and the eighty-year-old at the same table. Legacy travel, audited.',
    image: 'https://images.unsplash.com/photo-1627599139213-6f5649231b38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    imageAlt: 'A family gathered at a sunset terrace — Family Desk, Viaive',
    cta: 'Plan a Family Journey',
  },
  {
    tag: 'Safari Desk',
    title: 'Safari Desk',
    href: '/desks/safari',
    blurb: 'Private conservancies, the right guide for the right migration week, and camps that have not quietly slipped. A 14-country bench of relationships.',
    image: 'https://images.unsplash.com/photo-1577971132997-c10be9372519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    imageAlt: 'A private camp at dusk on the African savanna — Safari Desk, Viaive',
    cta: 'Open the Safari Desk',
  },
  {
    tag: 'Asia Intelligence',
    title: 'Asia Intelligence Desk',
    href: '/desks/asia-intelligence',
    blurb: 'Tokyo, Kyoto, Seoul, Bangkok, Singapore — read by a desk that lives there, not a buyer in another time zone. Global authority, locally written.',
    image: 'https://images.unsplash.com/photo-1604928141064-207cea6f571f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
    imageAlt: 'A Tokyo temple district at dawn — Asia Intelligence Desk, Viaive',
    cta: 'Enter Asia Intelligence',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Brief',
    body: '20 minutes. Phone or written. You tell us what matters; we listen for what you didn\'t say.',
  },
  {
    num: '02',
    title: 'Audit',
    body: 'We read your dates against a live bench of rooms, captains, guides, and weather. We rule things out.',
  },
  {
    num: '03',
    title: 'Place',
    body: 'You receive a placement, not a list. Booked under our partner programs, with perks attached.',
  },
]

export function Desks({
  headline = 'We don\'t sell trips.',
  italicHeadline = 'We staff a desk for yours.',
  desks = DEFAULT_DESKS,
}: DesksProps) {
  return (
    <section
      aria-labelledby="desks-heading"
      className="py-28 lg:py-36"
      style={{ backgroundColor: 'var(--stone-alt)', color: 'var(--white)' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[0.32em] uppercase text-gold mb-5">
              The Five Desks · Phase I
            </p>
            <h2
              id="desks-heading"
              style={{
                fontFamily: 'Fraunces, serif',
                fontSize: 'clamp(36px, 4.4vw, 64px)',
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                fontWeight: 400,
              }}
            >
              {headline}
              <br />
              <em style={{ fontWeight: 300 }}>{italicHeadline}</em>
            </h2>
          </div>
          <Link
            href="/about"
            data-analytics-id="home:desks:how-it-works"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-white/70 hover:text-white pb-1 transition-colors duration-200 self-start lg:self-end"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.20)' }}
          >
            How the desk model works
          </Link>
        </div>

        {/* Desk cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {desks.map((desk) => (
            <Link
              key={desk.href}
              href={desk.href}
              data-analytics-id={`home:desks:${desk.href.split('/').pop()}`}
              className="group relative overflow-hidden transition-all duration-500"
              style={{
                backgroundColor: 'rgba(0,0,0,0.40)',
                border: '1px solid rgba(255,255,255,0.10)',
              }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={desk.image}
                  alt={desk.imageAlt}
                  fill
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" aria-hidden="true" />
                <div className="absolute top-5 left-5 text-[10px] tracking-[0.3em] uppercase text-white/60 font-mono">
                  {desk.tag}
                </div>
              </div>

              {/* Copy */}
              <div className="p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4">
                  <h3
                    style={{
                      fontFamily: 'Fraunces, serif',
                      fontSize: '30px',
                      lineHeight: 1.1,
                      letterSpacing: '-0.01em',
                      fontWeight: 400,
                    }}
                  >
                    {desk.title}
                  </h3>
                  <ArrowUpRight
                    size={22}
                    className="text-white/40 group-hover:text-gold group-hover:rotate-12 transition-all duration-300 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-4 text-white/65 leading-relaxed text-[15px]">{desk.blurb}</p>
                <p className="mt-6 text-[11px] tracking-[0.24em] uppercase text-gold group-hover:text-white transition-colors duration-300">
                  {desk.cta} →
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Process steps */}
        <div
          className="mt-12 grid grid-cols-1 md:grid-cols-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.10)', borderLeft: '1px solid rgba(255,255,255,0.10)' }}
        >
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="p-8"
              style={{
                backgroundColor: 'var(--stone-alt)',
                borderRight: '1px solid rgba(255,255,255,0.10)',
                borderBottom: '1px solid rgba(255,255,255,0.10)',
              }}
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">Step {step.num}</p>
              <h3
                style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', fontWeight: 400 }}
                className="mb-3"
              >
                {step.title}
              </h3>
              <p className="text-white/60 text-[14px] leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
