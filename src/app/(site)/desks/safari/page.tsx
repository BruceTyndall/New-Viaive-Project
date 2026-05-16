import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Editorial } from '@/components/Editorial'
import { Proof } from '@/components/Proof'
import { FAQ } from '@/components/FAQ'
import { Brief } from '@/components/Brief'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Safari Desk — Viaive',
  description:
    'The Viaive Safari Desk holds 14 country-bench relationships. We audit camps against guide quality, migration timing, and food — before we place you.',
  openGraph: {
    title: 'Safari Desk — Viaive',
    description: '14 country-bench safari relationships. Decision-grade intelligence, not a list.',
    type: 'website',
  },
}

export default function SafariDeskPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Editorial />
        <Proof />
        <FAQ />
        <Brief source="desks-safari" />
      </main>
      <Footer />
    </>
  )
}
