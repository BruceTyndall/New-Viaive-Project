'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

const DESKS = [
  { href: '/desks/hotel', label: 'Hotel Desk', sub: 'Suites, upgrades, perks' },
  { href: '/desks/family', label: 'Family Desk', sub: 'Multi-gen, legacy travel' },
  { href: '/desks/safari', label: 'Safari Desk', sub: 'Private camps, conservancies' },
  { href: '/desks/asia-intelligence', label: 'Asia Intelligence', sub: 'Regional authority desk' },
  { href: '/desks/concierge', label: 'Private Brief', sub: 'Begin a custom journey' },
]

const NAV_LINKS = [
  { href: '/destinations', label: 'Atlas' },
  { href: '/regions', label: 'Regions' },
  { href: '/standard', label: 'The Standard' },
  { href: '/guides', label: 'Field Guides' },
  { href: '/why-book-with-viaive', label: 'Why Viaive' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-nav)',
        transition: 'border-color 200ms ease, background-color 200ms ease',
        backgroundColor: scrolled ? 'rgba(11,11,12,0.90)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      }}
    >
      <nav
        className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between"
        aria-label="Primary navigation"
      >
        {/* Wordmark */}
        <Link href="/" aria-label="Viaive home" className="flex items-center gap-3">
          <span style={{ fontFamily: 'Fraunces, serif', fontSize: '26px', letterSpacing: '0.02em', color: 'var(--white)', fontWeight: 400 }}>
            viaive
          </span>
          <span className="hidden sm:inline-block w-px h-4 bg-white/30" aria-hidden="true" />
          <span className="hidden sm:inline text-[11px] tracking-[0.3em] uppercase text-white/60">
            Editorial Intelligence
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8 text-[13px] tracking-wide text-white list-none" role="list">
          {/* Desks dropdown */}
          <li className="relative group">
            <button
              className="py-2 text-white/90 hover:text-white transition-colors duration-150"
              aria-haspopup="true"
              aria-expanded="false"
              data-analytics-id="nav:desks:toggle"
            >
              Desks
            </button>
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-[400px]"
              role="menu"
            >
              <div style={{ backgroundColor: 'var(--stone-alt)', border: '1px solid rgba(255,255,255,0.08)' }} className="p-2">
                {DESKS.map((d) => (
                  <Link
                    key={d.href}
                    href={d.href}
                    role="menuitem"
                    data-analytics-id={`nav:desks:${d.href.split('/').pop()}`}
                    className="block px-4 py-3 hover:bg-white/5 transition-colors duration-150 group/item"
                  >
                    <div className="flex items-center justify-between">
                      <span style={{ fontFamily: 'Fraunces, serif', fontSize: '17px', color: 'var(--white)' }}>{d.label}</span>
                      <span className="text-white/30 group-hover/item:translate-x-1 transition-transform duration-150" aria-hidden="true">→</span>
                    </div>
                    <div className="text-[12px] text-white/50 mt-0.5">{d.sub}</div>
                  </Link>
                ))}
              </div>
            </div>
          </li>

          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                data-analytics-id={`nav:primary:${l.href.replace('/', '')}`}
                className="text-white/90 hover:text-white transition-colors duration-150 py-2 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white hover:after:w-full after:transition-[width] after:duration-200"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/desks/concierge"
            data-analytics-id="nav:cta:begin-brief"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-[12px] tracking-[0.18em] uppercase text-white transition-colors duration-200 hover:bg-white hover:text-black"
            style={{ border: '1px solid rgba(255,255,255,0.30)' }}
          >
            Begin a brief
          </Link>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{ backgroundColor: 'var(--stone-alt)', borderTop: '1px solid rgba(255,255,255,0.08)' }}
          className="lg:hidden px-6 py-6 text-white"
        >
          <ul className="space-y-1 list-none mb-4" role="list">
            {DESKS.map((d) => (
              <li key={d.href}>
                <Link
                  href={d.href}
                  onClick={() => setOpen(false)}
                  data-analytics-id={`nav:mobile:${d.href.split('/').pop()}`}
                  className="flex items-center justify-between py-3 border-b border-white/8 text-white/85 hover:text-white transition-colors duration-150"
                >
                  <span style={{ fontFamily: 'Fraunces, serif', fontSize: '18px' }}>{d.label}</span>
                  <span className="text-white/30" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 border-b border-white/8 text-[14px] text-white/70 hover:text-white tracking-wide transition-colors duration-150"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/desks/concierge"
            onClick={() => setOpen(false)}
            data-analytics-id="nav:mobile:begin-brief"
            className="block text-center px-5 py-3.5 mt-2 text-[12px] tracking-[0.18em] uppercase text-white hover:bg-white hover:text-black transition-colors duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.30)' }}
          >
            Begin a brief
          </Link>
        </div>
      )}
    </header>
  )
}
