export function Footer() {
  const cols = [
    {
      h: "The Desks",
      l: [
        ["Hotel Desk", "/desks/hotel"],
        ["Family Desk", "/desks/family"],
        ["Safari Desk", "/desks/safari"],
        ["Asia Intelligence", "/desks/asia-intelligence"],
        ["Concierge Brief", "/desks/concierge"],
      ],
    },
    {
      h: "Specialty Planning",
      l: [
        ["Honeymoons", "/honeymoons"],
        ["Villa Stays", "/villa-stays"],
        ["Wellness Travel", "/wellness-travel"],
        ["Luxury Cruises", "/luxury-cruises"],
        ["Yacht Charters", "/luxury-yacht-charters"],
        ["Private Aviation", "/private-charter"],
        ["Ski Travel", "/luxury-ski-travel"],
        ["Custom Itineraries", "/luxury-travel-planning"],
      ],
    },
    {
      h: "Regions",
      l: [
        ["Africa", "/regions/africa"],
        ["Asia", "/regions/asia"],
        ["Europe", "/regions/europe"],
        ["Middle East", "/regions/middle-east"],
        ["Latin America", "/regions/latin-america"],
        ["North America", "/regions/north-america"],
        ["Oceania", "/regions/oceania"],
      ],
    },
    {
      h: "The House",
      l: [
        ["The Viaive Standard", "/standard"],
        ["About Viaive", "/about"],
        ["Why Book With Us", "/why-book-with-viaive"],
        ["Field Guides", "/guides"],
        ["The Atlas", "/destinations"],
        ["Collections", "/collections"],
      ],
    },
  ];

  return (
    <footer className="bg-[#0b0b0c] text-white pt-24 pb-10 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_3fr] gap-12 pb-16 border-b border-white/10">
          <div>
            <div
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: "40px",
                letterSpacing: "0.01em",
                fontWeight: 400,
              }}
            >
              viaive
            </div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-white/50 mt-2">
              Editorial Intelligence · Est.
            </div>
            <p className="mt-6 text-white/60 text-[14px] leading-relaxed max-w-sm">
              A private travel advisory for people who treat every booking as a decision. Audited
              hotels, named relationships, and a standard you can feel before you arrive.
            </p>
            <a
              href="/desks/concierge"
              className="inline-flex items-center gap-2 mt-7 px-6 py-3 border border-white/30 hover:bg-white hover:text-black transition text-[11px] tracking-[0.22em] uppercase"
            >
              Begin a private brief →
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {cols.map((c) => (
              <div key={c.h}>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#c8a96a] mb-5">
                  {c.h}
                </div>
                <ul className="space-y-3">
                  {c.l.map(([t, h]) => (
                    <li key={t}>
                      <a
                        href={h}
                        className="text-white/65 hover:text-white text-[13px] transition"
                      >
                        {t}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[11px] text-white/40 tracking-wide">
          <div>© 2026 Viaive. All editorial work is property of the desk.</div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/privacy" className="hover:text-white transition">Privacy</a>
            <a href="/terms" className="hover:text-white transition">Terms</a>
            <a href="/affiliate-disclosure" className="hover:text-white transition">Affiliate Disclosure</a>
            <a href="/legal-disclaimer" className="hover:text-white transition">Legal</a>
            <a href="/medical-disclaimer" className="hover:text-white transition">Medical</a>
            <a href="/financial-disclaimer" className="hover:text-white transition">Financial</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
