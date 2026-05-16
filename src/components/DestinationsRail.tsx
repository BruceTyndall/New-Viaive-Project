import { ArrowDown } from 'lucide-react'
import type { DestinationConfig } from '@/types/destination'

interface Props {
  destinations: DestinationConfig[]
}

export function DestinationsRail({ destinations }: Props) {
  return (
    <section className="bg-stone text-white py-20 lg:py-24 border-y-2 border-[var(--stone)]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="text-[11px] tracking-[0.32em] uppercase text-gold mb-5">
              Field Guides · Highest-Revenue Cities
            </div>
            <h2
              style={{
                fontFamily: 'Fraunces, serif',
                fontSize: 'clamp(34px, 4.2vw, 56px)',
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                fontWeight: 400,
              }}
            >
              The placements driving
              <br />
              <em style={{ fontWeight: 300 }}>more than half of our 2026 inquiries.</em>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {destinations.map((d) => (
            <a
              key={d.slug}
              href={`/destinations/${d.slug}`}
              data-analytics-id={`rail:destination:${d.slug}`}
              className="group relative border-2 border-white/20 hover:border-[var(--gold)] bg-black/30 p-8 lg:p-10 transition-all duration-300 shadow-[0_0_0_0_var(--gold)] hover:shadow-[6px_6px_0_0_var(--gold)]"
            >
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">
                {d.region} · {d.hotels.length} audited
              </div>
              <div
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: '40px',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {d.city}
              </div>
              <div className="mt-4 text-[13px] text-white/60 leading-relaxed">
                {d.geoAnswer.split('.')[0]}.
              </div>
              <div className="mt-6 flex items-center justify-between text-[11px] tracking-[0.24em] uppercase">
                <span className="text-white/50">Best: {d.bestMonths}</span>
                <span className="inline-flex items-center gap-1.5 text-gold group-hover:gap-3 transition-all">
                  Read <ArrowDown size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
