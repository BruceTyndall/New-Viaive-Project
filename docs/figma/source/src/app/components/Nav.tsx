import { useState, useEffect } from "react";
import { Menu, Search, X } from "lucide-react";

const DESKS = [
  { href: "/desks/hotel", label: "Hotel Desk", sub: "Suites, upgrades, perks" },
  { href: "/desks/family", label: "Family Desk", sub: "Multi-gen, legacy travel" },
  { href: "/desks/safari", label: "Safari Desk", sub: "Private camps, conservancies" },
  { href: "/desks/asia-intelligence", label: "Asia Intelligence", sub: "Regional authority desk" },
  { href: "/desks/concierge", label: "Private Brief", sub: "Begin a custom journey" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0b0b0c]/85 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between text-white">
        <a href="/" className="flex items-center gap-2" aria-label="Viaive home">
          <span style={{ fontFamily: "Fraunces, serif", fontSize: "26px", letterSpacing: "0.02em" }}>
            viaive
          </span>
          <span className="hidden sm:inline-block w-px h-4 bg-white/30" />
          <span className="hidden sm:inline text-[11px] tracking-[0.3em] uppercase text-white/60">
            Editorial Intelligence
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-8 text-[13px] tracking-wide">
          <li className="relative group">
            <button className="hover:text-white/70 transition py-2">Desks</button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-[420px]">
              <div className="bg-[#0b0b0c] border border-white/10 rounded-sm shadow-2xl p-2">
                {DESKS.map((d) => (
                  <a
                    key={d.href}
                    href={d.href}
                    className="block px-4 py-3 hover:bg-white/5 transition group/item"
                  >
                    <div className="flex items-center justify-between">
                      <span style={{ fontFamily: "Fraunces, serif", fontSize: "17px" }}>
                        {d.label}
                      </span>
                      <span className="text-white/30 group-hover/item:translate-x-1 transition">→</span>
                    </div>
                    <div className="text-[12px] text-white/50 mt-0.5">{d.sub}</div>
                  </a>
                ))}
              </div>
            </div>
          </li>
          <li><a href="/destinations" className="hover:text-white/70 transition">Atlas</a></li>
          <li><a href="/regions" className="hover:text-white/70 transition">Regions</a></li>
          <li><a href="/standard" className="hover:text-white/70 transition">The Standard</a></li>
          <li><a href="/guides" className="hover:text-white/70 transition">Field Guides</a></li>
          <li><a href="/why-book-with-viaive" className="hover:text-white/70 transition">Why Viaive</a></li>
        </ul>

        <div className="flex items-center gap-3">
          <button aria-label="Search" className="p-2 hover:bg-white/5 rounded-full transition hidden sm:block">
            <Search size={18} />
          </button>
          <a
            href="/desks/concierge"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-white/30 hover:bg-white hover:text-black transition text-[12px] tracking-[0.18em] uppercase"
          >
            Begin a brief
          </a>
          <button
            className="lg:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden bg-[#0b0b0c] border-t border-white/10 px-6 py-6 space-y-4 text-white">
          {["Atlas", "Regions", "The Standard", "Field Guides", "Why Viaive"].map((l) => (
            <a key={l} href="#" className="block py-2 border-b border-white/5">{l}</a>
          ))}
          <a
            href="/desks/concierge"
            className="block text-center px-5 py-3 border border-white/30 mt-4 text-[12px] tracking-[0.18em] uppercase"
          >
            Begin a brief
          </a>
        </div>
      )}
    </header>
  );
}
