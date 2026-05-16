export type Hotel = {
  name: string
  neighborhood: string
  note: string
  tier: 'Suite' | 'Villa' | 'Resort' | 'Buyout'
}

export type Watch2026 = { kind: 'Opening' | 'Refurb' | 'Watch'; title: string; note: string }

export type DestinationConfig = {
  slug: string
  city: string
  country: string
  region: string
  lat: number
  lng: number
  bestMonths: string
  leadTime: string
  readMinutes: number
  lastReviewed: string
  heroEyebrow: string
  h1: string
  h1Italic: string
  geoAnswer: string
  hotels: Hotel[]
  watch2026: Watch2026[]
  sections: { h2: string; body: string }[]
  ctaEyebrow: string
  ctaHeadline: string
  ctaBody: string
  conciergeIntent: string
}
