import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

interface IntentCard {
  key: string
  eyebrow: string
  title: string
  body: string
  href: string
  metric: string
}

interface IntentRouterProps {
  headline?: string
  italicHeadline?: string
  cards?: IntentCard[]
}

const DEFAULT_CARDS: IntentCard[] = [
  {
    key: 'hotel',
    eyebrow: "I know where I'm going",
    title: 'Find the right hotel',
    body: 'Audited suites, named upgrades, and perks under our preferred-partner programs. Booked, not searched.',
    href: '/desks/hotel?intent=hotel',
    metric: '27 cities · 6 partner programs',
  },
  {
    key: 'family',
    eyebrow: "I'm planning for the family",
    title: 'Multi-gen, audited',
    body: 'Properties that hold a standard for the four-year-old and the eighty-year-old at the same table.',
    href: '/desks/family?intent=family',
    metric: 'Family Desk · 18hr response',
  },
  {
    key: 'somatic',
    eyebrow: 'I need a quiet week',
    title: 'Wellness & somatic silence',
    body: 'Sanctuary properties read against sound, light, food integrity and the people running them.',
    href: '/start-planning?intent=somatic',
    metric: 'Sanctuary briefs · 18hr response',
  },
  {
    key: 'unsure',
    eyebrow: "I'm not sure yet",
    title: 'Start with a conversation',
    body: 'A 20-minute brief with a senior advisor. We listen for the trip behind the trip.',
    href: '/concierge?intent=open',
    metric: 'Senior advisor · no sales call',
  },
]

export function IntentRouter({
  headline = 'Tell us what kind of trip',
  italicHeadline = 'only you would notice.',
  cards = DEFAULT_CARDS,
}: IntentRouterProps) {
  return (
    <section
      id="intent"
      aria-labelledby="intent-heading"
      className="py-24 lg:py-32 bg-paper-alt"
      style={{ borderBottom: 'var(--border-hairline)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[0.32em] uppercase text-stone-mid mb-5">
              Where to begin
            </p>
            <h2
              id="intent-heading"
              className="text-stone"
              style={{
                fontFamily: 'Fraunces, serif',
                fontSize: 'clamp(34px, 4.2vw, 56px)',
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
          {cards.map((card) => (
            <Link
              key={card.key}
              href={card.href}
              data-analytics-id={`home:intent-router:${card.key}`}
              className="group relative bg-paper hover:bg-stone-alt p-8 lg:p-10 transition-all duration-500 flex flex-col min-h-[220px]"
              style={{ border: 'var(--border-hairline)' }}
            >
              <p className="text-[11px] tracking-[0.28em] uppercase text-stone-mid group-hover:text-gold transition-colors duration-500">
                {card.eyebrow}
              </p>
              <h3
                className="mt-3 text-stone group-hover:text-white transition-colors duration-500"
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: '30px',
                  lineHeight: 1.08,
                  letterSpacing: '-0.01em',
                  fontWeight: 400,
                }}
              >
                {card.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-stone-mid group-hover:text-white/70 transition-colors duration-500">
                {card.body}
              </p>
              <div className="mt-auto pt-6 flex items-center justify-between gap-4">
                <span className="text-[11px] tracking-[0.24em] uppercase text-stone-mid group-hover:text-gold transition-colors duration-500">
                  {card.metric}
                </span>
                <ArrowUpRight
                  size={22}
                  className="flex-shrink-0 text-stone-mid group-hover:text-gold group-hover:rotate-12 transition-all duration-300"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
