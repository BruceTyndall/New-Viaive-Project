import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { StayModule } from '@/components/StayModule'
import { Editorial } from '@/components/Editorial'
import { Proof } from '@/components/Proof'
import { FAQ } from '@/components/FAQ'
import { Brief } from '@/components/Brief'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Hotel Desk — Viaive',
  description:
    'The Viaive Hotel Desk audits properties against service depth, room quality, and food integrity. Booked under Four Seasons Preferred, Virtuoso, and Belmond Bellini.',
  openGraph: {
    title: 'Hotel Desk — Viaive',
    description: 'Audited hotel placements under preferred-partner programs. No markups.',
    type: 'website',
  },
}

export default function HotelDeskPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <StayModule />
        <Editorial />
        <Proof />
        <FAQ />
        <Brief source="desks-hotel" />
      </main>
      <Footer />
    </>
  )
}
