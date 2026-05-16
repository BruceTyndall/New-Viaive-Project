import type { Metadata } from 'next'
import { STATIC_DESTINATIONS } from '@/data/destinations'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { DestinationsRail } from '@/components/DestinationsRail'
import { Editorial } from '@/components/Editorial'
import { Proof } from '@/components/Proof'
import { FAQ } from '@/components/FAQ'
import { Brief } from '@/components/Brief'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Asia Intelligence Desk — Viaive',
  description:
    'The Viaive Asia Desk covers Bangkok, Tokyo, and beyond. Audited placements under Four Seasons Preferred and Virtuoso partner programs.',
  openGraph: {
    title: 'Asia Intelligence Desk — Viaive',
    description: 'Audited Asia placements. Bangkok, Tokyo, and beyond.',
    type: 'website',
  },
}

export default async function AsiaDeskPage() {
  const asiaDestinations = STATIC_DESTINATIONS.filter((d) => d.region === 'Asia')

  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <DestinationsRail destinations={asiaDestinations} />
        <Editorial />
        <Proof />
        <FAQ />
        <Brief source="desks-asia" />
      </main>
      <Footer />
    </>
  )
}
