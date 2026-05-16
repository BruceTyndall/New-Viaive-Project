import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { STATIC_DESTINATIONS } from '@/data/destinations'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { TrustBar } from '@/components/TrustBar'
import { IntentRouter } from '@/components/IntentRouter'
import { Desks } from '@/components/Desks'
import { Atlas } from '@/components/Atlas'
import { DestinationsRail } from '@/components/DestinationsRail'
import { DestinationGuide } from '@/components/DestinationGuide'
import { Standard } from '@/components/Standard'
import { Editorial } from '@/components/Editorial'
import { StayModule } from '@/components/StayModule'
import { Proof } from '@/components/Proof'
import { Brief } from '@/components/Brief'
import { EmailCapture } from '@/components/EmailCapture'
import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'
import { NovaExitIntent } from '@/components/NovaExitIntent'

export const metadata: Metadata = {
  title: 'Viaive — Luxury travel, decided.',
  description:
    'An editorial travel advisory for people who treat every booking as a decision. Audited hotels, named relationships, and a standard you can feel before you arrive.',
  openGraph: {
    title: 'Viaive — Luxury travel, decided.',
    description:
      'An editorial travel advisory for people who treat every booking as a decision.',
    type: 'website',
  },
}

export default async function HomePage() {
  let destinations = STATIC_DESTINATIONS

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'destinations', limit: 4, where: { _status: { equals: 'published' } } })
    if (result.docs.length > 0) destinations = result.docs as unknown as typeof STATIC_DESTINATIONS
  } catch {
    // CMS unseeded — use static fallback
  }

  const [thailand, tokyo, paris] = destinations

  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <IntentRouter />
        <Desks />
        <Atlas />
        <DestinationsRail destinations={destinations} />
        {thailand && <DestinationGuide config={thailand} />}
        {tokyo && <DestinationGuide config={tokyo} />}
        {paris && <DestinationGuide config={paris} />}
        <Standard />
        <Editorial />
        <StayModule />
        <Proof />
        <Brief source="home" />
        <EmailCapture />
        <FAQ />
      </main>
      <Footer />
      <NovaExitIntent />
    </>
  )
}
