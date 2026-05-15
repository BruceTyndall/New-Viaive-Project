import Link from 'next/link'

interface FooterColumn {
  heading: string
  links: Array<{ label: string; href: string }>
}

interface FooterProps {
  columns?: FooterColumn[]
  legalLinks?: Array<{ label: string; href: string }>
  disclosure?: string
  copyright?: string
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    heading: 'The Desks',
    links: [
      { label: 'Hotel Desk', href: '/desks/hotel' },
      { label: 'Family Desk', href: '/desks/family' },
      { label: 'Safari Desk', href: '/desks/safari' },
      { label: 'Asia Intelligence', href: '/desks/asia-intelligence' },
      { label: 'Concierge Brief', href: '/desks/concierge' },
    ],
  },
  {
    heading: 'Specialty Planning',
    links: [
      { label: 'Honeymoons', href: '/honeymoons' },
      { label: 'Villa Stays', href: '/villa-stays' },
      { label: 'Wellness Travel', href: '/wellness-travel' },
      { label: 'Luxury Cruises', href: '/luxury-cruises' },
      { label: 'Yacht Charters', href: '/luxury-yacht-charters' },
      { label: 'Private Aviation', href: '/private-charter' },
      { label: 'Ski Travel', href: '/luxury-ski-travel' },
    ],
  },
  {
    heading: 'Regions',
    links: [
      { label: 'Africa', href: '/regions/africa' },
      { label: 'Asia', href: '/regions/asia' },
      { label: 'Europe', href: '/regions/europe' },
      { label: 'Middle East', href: '/regions/middle-east' },
      { label: 'Latin America', href: '/regions/latin-america' },
      { label: 'North America', href: '/regions/north-america' },
      { label: 'Oceania', href: '/regions/oceania' },
    ],
  },
  {
    heading: 'The House',
    links: [
      { label: 'The Viaive Standard', href: '/standard' },
      { label: 'About Viaive', href: '/about' },
      { label: 'Why Book With Us', href: '/why-book-with-viaive' },
      { label: 'Field Guides', href: '/guides' },
      { label: 'The Atlas', href: '/destinations' },
      { label: 'Collections', href: '/collections' },
    ],
  },
]

const DEFAULT_LEGAL: Array<{ label: string; href: string }> = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
  { label: 'Legal', href: '/legal-disclaimer' },
]

export function Footer({
  columns = DEFAULT_COLUMNS,
  legalLinks = DEFAULT_LEGAL,
  disclosure = 'Affiliate · We may earn from bookings at no cost to you.',
  copyright = '© 2026 Viaive. All editorial work is property of the desk.',
}: FooterProps) {
  return (
    <footer
      role="contentinfo"
      className="pt-24 pb-10"
      style={{ backgroundColor: 'var(--stone-alt)', color: 'var(--white)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Main grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.4fr_3fr] gap-12 pb-16"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                fontFamily: 'Fraunces, serif',
                fontSize: '40px',
                letterSpacing: '0.01em',
                fontWeight: 400,
              }}
            >
              viaive
            </div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/50 mt-2">
              Editorial Intelligence
            </p>
            <p className="mt-6 text-white/60 text-[14px] leading-relaxed max-w-sm">
              A private travel advisory for people who treat every booking as a decision. Audited hotels,
              named relationships, and a standard you can feel before you arrive.
            </p>
            <Link
              href="/desks/concierge"
              data-analytics-id="footer:cta:begin-brief"
              className="inline-flex items-center gap-2 mt-7 px-6 py-3 text-[11px] tracking-[0.22em] uppercase text-white hover:bg-white hover:text-black transition-colors duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.30)' }}
            >
              Begin a private brief →
            </Link>

            {/* Affiliate disclosure */}
            <p className="mt-8 text-[10px] leading-relaxed text-white/40 max-w-xs">
              <span
                className="inline-block w-2 h-2 rounded-full mr-2 align-middle"
                style={{ backgroundColor: 'var(--gold)' }}
                aria-hidden="true"
              />
              {disclosure}
            </p>
          </div>

          {/* Nav columns */}
          <nav aria-label="Footer navigation" className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5">
                  {col.heading}
                </p>
                <ul className="space-y-3 list-none" role="list">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        data-analytics-id={`footer:nav:${link.href.replace(/\//g, '-').slice(1)}`}
                        className="text-white/65 hover:text-white text-[13px] transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Legal row */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[11px] text-white/40 tracking-wide">
          <p>{copyright}</p>
          <nav aria-label="Legal links">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none" role="list">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
