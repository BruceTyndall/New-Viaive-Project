interface TrustBarProps {
  eyebrow?: string
  items?: string[]
}

const DEFAULT_ITEMS = [
  'Virtuoso · member network',
  'Four Seasons Preferred Partner',
  'Belmond Bellini Club',
  'Rosewood Elite',
  'Aman Inner Circle',
  'Rocco Forte Knights',
]

export function TrustBar({
  eyebrow = 'Verified Partner Programs · Real Perks, Not Affiliations',
  items = DEFAULT_ITEMS,
}: TrustBarProps) {
  return (
    <section
      aria-label="Partner programs"
      style={{ backgroundColor: 'var(--paper-alt)', borderTop: 'var(--border-hairline)', borderBottom: 'var(--border-hairline)' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
        <p className="text-[10px] tracking-[0.32em] uppercase text-center mb-6" style={{ color: 'var(--stone-mid)' }}>
          {eyebrow}
        </p>
        <ul
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 overflow-x-auto snap-x"
          role="list"
          aria-label="Partner programs"
        >
          {items.map((item) => (
            <li key={item} className="snap-start flex-shrink-0">
              <span
                className="text-[13px] tracking-wide"
                style={{ fontFamily: 'Fraunces, serif', color: 'var(--stone-mid)' }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
