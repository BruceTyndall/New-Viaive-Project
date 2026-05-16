import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Nav } from '@/components/Nav'
import { DestinationGuide } from '@/components/DestinationGuide'
import { StayModule } from '@/components/StayModule'
import { EmailCapture } from '@/components/EmailCapture'
import { FAQ } from '@/components/FAQ'
import { NovaExitIntent } from '@/components/NovaExitIntent'
import { Footer } from '@/components/Footer'
import type { DestinationConfig } from '@/types/destination'

const DUBAI_CONFIG: DestinationConfig = {
  slug: 'dubai',
  city: 'Dubai',
  country: 'United Arab Emirates',
  region: 'Middle East',
  lat: 25.2048,
  lng: 55.2708,
  bestMonths: 'October to April',
  leadTime: '3–4 weeks',
  readMinutes: 7,
  lastReviewed: '2026-04-17',
  heroEyebrow: 'The Dubai Guide',
  h1: 'Dubai.',
  h1Italic: 'Contemporary luxury by the waterfront.',
  geoAnswer: 'Dubai is a 50-year-old city operating on a 30-year timeline. Our desk audits for properties that understand the shift from pure opulence to architectural and culinary coherence. The best hotels here combine impeccable service standards with editorial dining programs and curated wellness offerings. We place travelers in waterfront properties with direct museum and beach access.',
  hotels: [
    {
      name: 'Emirates Palace Abu Dhabi',
      neighborhood: 'Abu Dhabi',
      note: 'Palace-scale luxury. Golf course and private beach. Regional headquarters quality.',
      tier: 'Resort',
    },
    {
      name: 'Four Seasons Resort Dubai',
      neighborhood: 'Jumeirah',
      note: 'Beach villa suites. Lagoon setting. Contemporary spa program.',
      tier: 'Villa',
    },
    {
      name: 'Burj Al Arab Jumeirah',
      neighborhood: 'Jumeirah',
      note: 'The icon. Landmark status with personalized service standards.',
      tier: 'Suite',
    },
    {
      name: 'Jumeirah Al Naseem',
      neighborhood: 'Madinat Jumeirah',
      note: 'Resort villa community. Water gardens. Editorial food program.',
      tier: 'Villa',
    },
    {
      name: 'Mandarin Oriental Jumeirah',
      neighborhood: 'Jumeirah',
      note: 'Newer property. Culinary focus. Direct beach access.',
      tier: 'Suite',
    },
  ],
  watch2026: [
    {
      kind: 'Opening',
      title: 'Atlantis The Royal',
      note: 'Celebrity chef collaborations. Aquatic center. Completion Q1 2026.',
    },
    {
      kind: 'Refurb',
      title: 'Burj Al Arab Jumeirah',
      note: 'Suite refresh program. Phased through Q4 2026.',
    },
  ],
  sections: [
    {
      h2: 'Why Dubai is misunderstood',
      body: 'Dubai has matured from spectacle to substance. The best hotels no longer compete on size alone—they compete on culinary direction, on spa expertise, and on the depth of their cultural partnerships. Four Seasons Resort Dubai and Mandarin Oriental Jumeirah both represent a new generation of Dubai hospitality: waterfront access, design coherence, and editorial dining programs that would anchor a major city.',
    },
    {
      h2: 'The audit: from opulence to design',
      body: 'We audit for food sourcing (a desert city with supply chain sophistication), for spa staff certifications (many properties over-promise), and for concierge relationships with museums and galleries. Jumeirah Al Naseem has an editorial relationship with a Michelin-starred chef; Burj Al Arab Jumeirah has redefined service density without losing coherence. These distinctions matter when you are spending 10 days in one city.',
    },
    {
      h2: 'Seasons and lead time',
      body: 'October through April is the Dubai season—low temperatures, blue skies, stable weather. May through September is 50°C+ heat and generally avoided. Book three to four weeks ahead during peak season (December–February). Summer bookings are easier but require heat-tolerance planning.',
    },
  ],
  ctaEyebrow: 'Start your Dubai brief',
  ctaHeadline: 'We place you in the new Dubai.',
  ctaBody: 'Tell us your travel dates and whether you want a beach villa, a waterfront suite, or a resort property. We'll recommend based on your trip intention, not hotel inventory.',
  conciergeIntent: 'dubai-placement',
}

export const metadata: Metadata = {
  title: 'Dubai Travel Guide | Viaive Editorial Advisory',
  description: DUBAI_CONFIG.geoAnswer,
  openGraph: {
    title: 'Dubai Travel Guide',
    description: DUBAI_CONFIG.geoAnswer,
    type: 'article',
  },
}

export default function DubaiPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <DestinationGuide config={DUBAI_CONFIG} />
        <StayModule />
        <EmailCapture />
        <FAQ />
        <NovaExitIntent />
      </main>
      <Footer />
    </>
  )
}
