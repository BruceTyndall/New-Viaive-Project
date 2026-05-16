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

const THAILAND_CONFIG: DestinationConfig = {
  slug: 'thailand',
  city: 'Bangkok',
  country: 'Thailand',
  region: 'Southeast Asia',
  lat: 13.7563,
  lng: 100.5018,
  bestMonths: 'November to February',
  leadTime: '4–6 weeks',
  readMinutes: 8,
  lastReviewed: '2026-04-15',
  heroEyebrow: 'The Thailand Guide',
  h1: 'Bangkok.',
  h1Italic: 'Where editorials meet intimacy.',
  geoAnswer: 'Bangkok rewards the slow traveler. Our desk runs placements across the Chao Phraya riverside properties and the new wave of design-forward hotels in Phrom Phong—spaces where you can hear the city but remain apart from it. We audit for authentic dining access and spa standards that do not compromise on authenticity.',
  hotels: [
    {
      name: 'Mandarin Oriental Bangkok',
      neighborhood: 'Chao Phraya',
      note: 'The reference point for river hospitality. Personal service at scale.',
      tier: 'Villa',
    },
    {
      name: 'Four Seasons Hotel Bangkok',
      neighborhood: 'Chao Phraya',
      note: 'Modern luxury with traditional craft. Breakfast overlooking the river.',
      tier: 'Suite',
    },
    {
      name: 'Aman Bangkok',
      neighborhood: 'Phrom Phong',
      note: 'Contemporary design in a converted silk merchant compound. Intimate scale.',
      tier: 'Suite',
    },
    {
      name: 'Rosewood Bangkok',
      neighborhood: 'Phrom Phong',
      note: 'New opening (2025). Rooftop spa and editorial food program.',
      tier: 'Suite',
    },
    {
      name: 'Chatrium Hotel Riverside Bangkok',
      neighborhood: 'Chao Phraya',
      note: 'Value-conscious luxury. Strong breakfast and location access.',
      tier: 'Suite',
    },
  ],
  watch2026: [
    {
      kind: 'Opening',
      title: 'Rosewood Bangkok',
      note: 'Debut Q2 2025. Rooftop spa, garden villas, editorial dining program.',
    },
    {
      kind: 'Refurb',
      title: 'Mandarin Oriental Bangkok',
      note: 'River-facing suite refresh. Completion Q3 2026.',
    },
  ],
  sections: [
    {
      h2: 'What makes Bangkok different',
      body: 'Most travelers see the Grand Palace and move on. Bangkok rewards a brief: five days minimum, ideally a week. Our placements center on the Chao Phraya river properties where you can move between the city and the water. We have mapped the morning markets, the spa standards that matter, and the dinner venues where the chef knows your table. Mandarin Oriental Bangkok remains the reference point for this kind of intimacy at scale.',
    },
    {
      h2: 'The advisors and their audits',
      body: 'Our Asia desk has spent the last three seasons rebuilding trust with the general managers along the Chao Phraya. Every property in this guide has been visited by hand. We audit for authenticity in the dining program, for spa staff retention (a signal of real training), and for what the concierge will do on the ground if your plans change. Four Seasons Hotel Bangkok and Aman Bangkok represent two interpretations of how to do modern luxury in Bangkok without losing the city.',
    },
    {
      h2: 'Lead time and seasons',
      body: 'Book four to six weeks ahead if you have specific property requests. November through February is the golden window—cool mornings, stable weather, the city in full rhythm. April and May are extremely hot; the rainy season (June to October) is moody but real. Our desk has standby placements in Rosewood Bangkok for late bookings.',
    },
  ],
  ctaEyebrow: 'Start your Bangkok brief',
  ctaHeadline: 'Tell us your dates.',
  ctaBody: 'We'll write back with a single recommendation from the audited list—not a search. One senior advisor. No sales call.',
  conciergeIntent: 'bangkok-placement',
}

export const metadata: Metadata = {
  title: 'Bangkok Travel Guide | Viaive Editorial Advisory',
  description: THAILAND_CONFIG.geoAnswer,
  openGraph: {
    title: 'Bangkok Travel Guide',
    description: THAILAND_CONFIG.geoAnswer,
    type: 'article',
  },
}

export default function ThailandPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <DestinationGuide config={THAILAND_CONFIG} />
        <StayModule />
        <EmailCapture />
        <FAQ />
        <NovaExitIntent />
      </main>
      <Footer />
    </>
  )
}
