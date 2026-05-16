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

const PARIS_CONFIG: DestinationConfig = {
  slug: 'paris',
  city: 'Paris',
  country: 'France',
  region: 'Western Europe',
  lat: 48.8566,
  lng: 2.3522,
  bestMonths: 'April to June, September to October',
  leadTime: '4–6 weeks',
  readMinutes: 10,
  lastReviewed: '2026-04-18',
  heroEyebrow: 'The Paris Guide',
  h1: 'Paris.',
  h1Italic: 'Where time moves to breakfast pace.',
  geoAnswer: 'Paris does not reveal itself in a week. Our desk places travelers in Left Bank properties where the lobby staff speaks with neighborhood merchants, where breakfast includes bread from a specific bakery, and where the hotel acts as an extension of your life in the city rather than an interruption of it. We audit for access to gardens, for relationships with museums, and for kitchens that understand market seasons.',
  hotels: [
    {
      name: 'Hotel Plaza Athénée',
      neighborhood: '8th Arrondissement',
      note: 'Iconic. Michelin-starred dining. Direct Champs-Élysées access.',
      tier: 'Suite',
    },
    {
      name: 'Four Seasons Hotel Paris',
      neighborhood: '8th Arrondissement',
      note: 'Former ministry building. Garden courtyard. Signature spa.',
      tier: 'Suite',
    },
    {
      name: 'L\'Astrance Boutique Hotel',
      neighborhood: '7th Arrondissement',
      note: 'Left Bank minimalism. Near Musée d\'Orsay. Strong local dining partnerships.',
      tier: 'Suite',
    },
    {
      name: 'Ritz Paris',
      neighborhood: 'Place Vendôme',
      note: 'Recently reopened. Dining program includes three Michelin kitchens.',
      tier: 'Suite',
    },
    {
      name: 'Belmond Cadogan',
      neighborhood: '7th Arrondissement',
      note: 'Sister property to Belmond London. Garden access. Editorial breakfast program.',
      tier: 'Villa',
    },
  ],
  watch2026: [
    {
      kind: 'Refurb',
      title: 'Hotel Plaza Athénée',
      note: 'Suite refresh. Completion Q2 2026.',
    },
    {
      kind: 'Opening',
      title: 'Nolinski Paris',
      note: 'Luxury debut in the Marais. Spring 2026.',
    },
  ],
  sections: [
    {
      h2: 'Why Paris is not a quick study',
      body: 'Paris rewards the slow arrival. Spend at least five days—longer if your schedule allows. Our desk places you in neighborhoods where you can walk to breakfast, where the morning market is a social architecture, and where the hotel staff has a relationship with the neighborhood. Hotel Plaza Athénée is the Right Bank standard; L\'Astrance Boutique Hotel is the Left Bank alternative—two entirely different Paris experiences.',
    },
    {
      h2: 'The desk audit: gardens, museums, markets',
      body: 'We audit for hotel gardens (a rarity in Paris and a mark of institutional weight), for museum director relationships (some hotels have secured private access), and for breakfast ingredient sourcing. Four Seasons Hotel Paris maintains a partnership with a specific boulangerie in the 6th. Ritz Paris has rebuilt its dining program under the direction of three Michelin-starred chefs. These details matter.',
    },
    {
      h2: 'Seasons and lead time',
      body: 'April through June is the Paris season—spring light, manageable crowds, warmer days. September through October reverses the rhythm: crisp mornings, the same light quality, fewer tourists. Book four to six weeks ahead if you have neighborhood preferences. Winter (November–February) is quiet and cold; summer (July–August) is expensive and crowded.',
    },
  ],
  ctaEyebrow: 'Start your Paris brief',
  ctaHeadline: 'We audit by neighborhood and season.',
  ctaBody: 'Tell us your dates and which bank of the Seine calls to you. We'll place you in a property where breakfast is an event, not a transaction.',
  conciergeIntent: 'paris-placement',
}

export const metadata: Metadata = {
  title: 'Paris Travel Guide | Viaive Editorial Advisory',
  description: PARIS_CONFIG.geoAnswer,
  openGraph: {
    title: 'Paris Travel Guide',
    description: PARIS_CONFIG.geoAnswer,
    type: 'article',
  },
}

export default function ParisPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <DestinationGuide config={PARIS_CONFIG} />
        <StayModule />
        <EmailCapture />
        <FAQ />
        <NovaExitIntent />
      </main>
      <Footer />
    </>
  )
}
