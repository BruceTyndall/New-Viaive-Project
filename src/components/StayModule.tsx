import { Search, MapPin, Sparkles } from 'lucide-react'

export function StayModule() {
  return (
    <section className="bg-paper py-24 lg:py-32 border-y border-black/5">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-center">
          <div>
            <div className="text-[11px] tracking-[0.32em] uppercase text-black/50 mb-5">
              The Stay Module · Powered by partner programs
            </div>
            <h2
              style={{
                fontFamily: 'Fraunces, serif',
                fontSize: 'clamp(34px, 4vw, 52px)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                fontWeight: 400,
                color: 'var(--stone)',
              }}
            >
              Search audited stays.
              <br />
              <em style={{ fontWeight: 300 }}>Booked under our perks.</em>
            </h2>
            <p className="mt-6 text-black/65 text-[16px] leading-relaxed max-w-md">
              Live rates from Four Seasons Preferred, Belmond Bellini, Rosewood Elite and Virtuoso
              partner properties. Every booking through Viaive carries advisor amenities — at no cost above the public rate.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-black/55">
              <span className="inline-flex items-center gap-2"><Sparkles size={14} className="text-gold" /> Complimentary upgrades</span>
              <span className="inline-flex items-center gap-2"><Sparkles size={14} className="text-gold" /> $100 property credit</span>
              <span className="inline-flex items-center gap-2"><Sparkles size={14} className="text-gold" /> Daily breakfast for two</span>
            </div>
          </div>

          <div className="bg-white border border-black/10 p-6 lg:p-8 shadow-[8px_8px_0_0_var(--stone)]">
            <div className="text-[10px] tracking-[0.3em] uppercase text-black/40 mb-5">
              Stay Search · Demonstration
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="text-[11px] tracking-[0.2em] uppercase text-black/50">Destination</span>
                <div className="mt-2 flex items-center gap-3 border-b border-black/15 focus-within:border-black pb-2">
                  <MapPin size={16} className="text-black/40" />
                  <input
                    placeholder="Tokyo, Paris, Bangkok…"
                    className="flex-1 bg-transparent outline-none text-[15px] py-1.5"
                    aria-label="Destination"
                  />
                </div>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-black/50">Check in</span>
                  <input
                    type="date"
                    className="mt-2 w-full bg-transparent outline-none border-b border-black/15 focus:border-black pb-2 text-[14px]"
                    aria-label="Check in"
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-black/50">Check out</span>
                  <input
                    type="date"
                    className="mt-2 w-full bg-transparent outline-none border-b border-black/15 focus:border-black pb-2 text-[14px]"
                    aria-label="Check out"
                  />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-black/50">Guests</span>
                  <select className="mt-2 w-full bg-transparent outline-none border-b border-black/15 focus:border-black pb-2 text-[14px]">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n}>{n} guest{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-black/50">Tier</span>
                  <select className="mt-2 w-full bg-transparent outline-none border-b border-black/15 focus:border-black pb-2 text-[14px]">
                    <option>Suite & above</option>
                    <option>Villa / Residence</option>
                    <option>Resort buyout</option>
                  </select>
                </label>
              </div>
              <a
                href="/concierge"
                data-analytics-id="stay-module:cta:concierge"
                className="w-full mt-2 flex items-center justify-center gap-2 bg-stone text-white py-4 text-[12px] tracking-[0.2em] uppercase hover:bg-gold hover:text-stone transition"
              >
                <Search size={14} />
                Search audited stays
              </a>
              <p className="text-[11px] text-black/45 leading-relaxed pt-1">
                Affiliate disclosure: bookings completed through Viaive's partner programs may
                generate commission at no cost to you. We do not mark up published rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
