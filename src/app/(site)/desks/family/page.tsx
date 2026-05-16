import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Editorial } from '@/components/Editorial'
import { Proof } from '@/components/Proof'
import { FAQ } from '@/components/FAQ'
import { Brief } from '@/components/Brief'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Family Desk — Viaive',
  description:
    'The Viaive Family Desk specializes in multi-generational travel. We audit kids\' clubs, room layouts, medical access, and quiet hours before we place you.',
  openGraph: {
    title: 'Family Desk — Viaive',
    description: 'Multi-generational and legacy travel, audited. Properties that hold a standard at every age.',
    type: 'website',
  },
}

export default function FamilyDeskPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Editorial />
        <Proof />
        <FAQ />
        <Brief source="desks-family" />
      </main>
      <Footer />
    </>
  )
}
