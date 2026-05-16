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

const TOKYO_CONFIG: DestinationConfig = {
  slug: 'tokyo',
  city: 'Tokyo',
  country: 'Japan',
  region: 'East Asia',
  lat: 35.6762,
  lng: 139.6503,
  bestMonths: 'March to May, September to November',
  leadTime: '6–8 weeks',
  readMinutes: 9,
  lastReviewed: '2026-04-20',
  heroEyebrow: 'The Tokyo Guide',
  h1: 'Tokyo.',
  h1Italic: 'Precision as hospitality.',
  geoAnswer: 'Tokyo is a study in discipline. The hotels here do not improvise. Our desk audits for properties where the front desk reads the room before you speak, where breakfast is not theatre but a commitment to ingredient integrity, and where the rooftop bar staff knows every regular by face. We place travelers in properties that understand quiet luxury.',
  hotels: [
    {
      name: 'Four Seasons Hotel Tokyo',
      neighborhood: 'Minato',
      note: 'Marunouchi's standard. Rooftop bar overlooking the Imperial Palace.',
      tier: 'Suite',
    },
    {
      name: 'Peninsula Tokyo',
      neighborhood: 'Chiyoda',
      note: 'Minimalist precision. Japanese hospitality with international polish.',
      tier: 'Suite',
    },
    {
      name: 'Aman Tokyo',
      neighborhood: 'Nihonbashi',
      note: 'The quietest hotel in the city. Rooftop Spa with temple views.',
      tier: 'Villa',
    },
    {
      name: 'Mandarin Oriental Tokyo',
      neighborhood: 'Nihonbashi',
      note: 'Contemporary Japanese design. 38th-floor bar and kaiseki dining.',
      tier: 'Suite',
    },
    {
      name: 'The Ritz-Carlton Tokyo',
      neighborhood: 'Minato',
      note: 'Mid-town location. Strong afternoon tea and spa programs.',
      tier: 'Suite',
    },
  ],
  watch2026: [
    {
      kind: 'Opening',
      title: 'Bulgari Tokyo',
      note: 'Debut Q3 2026. Ginza location. Italian luxury with Japanese craftsmanship.',
    },
    {
      kind: 'Opening',
      title: 'Rosewood Tokyo',
      note: 'Spring 2027 (early signals). Shibuya district.',
    },
  ],
  sections: [
    {
      h2: 'Why Tokyo demands respect',
      body: 'Tokyo is unforgiving to the passive traveler. The city rewards curiosity and preparation. Our desk has mapped the districts where you should stay (Chiyoda, Minato, Nihonbashi), the neighborhoods where English-speaking staff is reliable, and the seasonal patterns that make or break a visit. Four Seasons Hotel Tokyo and Aman Tokyo represent opposite philosophies: one is a headquarters for the city, the other a retreat from it.',
    },
    {
      h2: 'The audit and the standard',
      body: 'Tokyo hospitality is technical. We audit for front-desk anticipation, for breakfast sourcing (a marker of hotel philosophy), for spa staff consistency, and for how the concierge handles last-minute changes. Peninsula Tokyo and Mandarin Oriental Tokyo both score highly on ingredient integrity and cultural translation—the ability to guide a Western guest through Japanese convention without explanation.',
    },
    {
      h2: 'Seasons and lead time',
      body: 'Book six to eight weeks ahead for spring (cherry blossom season, late March through April) and autumn (crisp weather, September through November). Summer is hot and humid; winter is dry but cold. Our desk maintains standby rooms at Aman Tokyo for travelers booking within three weeks.',
    },
  ],
  ctaEyebrow: 'Start your Tokyo brief',
  ctaHeadline: 'We audit by district and season.',
  ctaBody: 'Send your travel dates and neighborhood preference. We'll recommend a single property where every detail has been verified on the ground.',
  conciergeIntent: 'tokyo-placement',
}

export const metadata: Metadata = {
  title: 'Tokyo Travel Guide | Viaive Editorial Advisory',
  description: TOKYO_CONFIG.geoAnswer,
  openGraph: {
    title: 'Tokyo Travel Guide',
    description: TOKYO_CONFIG.geoAnswer,
    type: 'article',
  },
}

export default function TokyoPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <DestinationGuide config={TOKYO_CONFIG} />
        <StayModule />
        <EmailCapture />
        <FAQ />
        <NovaExitIntent />
      </main>
      <Footer />
    </>
  )
}
