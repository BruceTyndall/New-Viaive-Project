import { DESTINATIONS } from '../../../docs/figma/source/src/app/data/destinations'

type AllowedHotelTier = 'Palace' | 'Resort' | 'Boutique' | 'Villa' | 'Riad' | 'Ryokan'

const ALLOWED_HOTEL_TIERS = new Set<AllowedHotelTier>([
  'Palace',
  'Resort',
  'Boutique',
  'Villa',
  'Riad',
  'Ryokan',
])

const EXPLICIT_TIER_NORMALIZATION: Record<string, AllowedHotelTier> = {
  Buyout: 'Villa',
  Suite: 'Palace',
}

const MONTH_LOOKUP: Record<string, string> = {
  Apr: '04',
  Aug: '08',
  Dec: '12',
  Feb: '02',
  Jan: '01',
  Jul: '07',
  Jun: '06',
  Mar: '03',
  May: '05',
  Nov: '11',
  Oct: '10',
  Sep: '09',
}

const toLexicalParagraph = (text: string) => ({
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
} as const)

const removeUndefined = <T extends Record<string, unknown>>(value: T) =>
  Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined)) as T

const normalizeHotelTier = (tier: string): AllowedHotelTier => {
  if (ALLOWED_HOTEL_TIERS.has(tier as AllowedHotelTier)) {
    return tier as AllowedHotelTier
  }

  const normalizedTier = EXPLICIT_TIER_NORMALIZATION[tier]

  if (normalizedTier) {
    return normalizedTier
  }

  throw new Error(`Unsupported hotel tier "${tier}" in destination source data`)
}

const parseLastReviewed = (value: string) => {
  const [month, year] = value.split(' ')
  const monthNumber = MONTH_LOOKUP[month]

  if (!monthNumber || !year) {
    throw new Error(`Unsupported lastReviewed format "${value}"`)
  }

  const lastDayOfMonth = new Date(Date.UTC(Number(year), Number(monthNumber), 0)).getUTCDate()

  return `${year}-${monthNumber}-${String(lastDayOfMonth).padStart(2, '0')}T00:00:00.000Z`
}

export const hotelTierNormalizationMap = Object.entries(EXPLICIT_TIER_NORMALIZATION).map(
  ([sourceTier, normalizedTier]) => ({
    normalizedTier,
    sourceTier,
  }),
)

export const destinationSeeds = DESTINATIONS.map((destination) => ({
  conciergeIntent: destination.conciergeIntent,
  country: destination.country,
  ctaBody: destination.ctaBody,
  ctaEyebrow: destination.ctaEyebrow,
  ctaHeadline: destination.ctaHeadline,
  geoAnswer: destination.geoAnswer,
  h1: destination.h1,
  h1Italic: destination.h1Italic,
  heroEyebrow: destination.heroEyebrow,
  hotels: destination.hotels.map((hotel) =>
    removeUndefined({
      name: hotel.name,
      neighborhood: hotel.neighborhood,
      note: hotel.note,
      tier: normalizeHotelTier(hotel.tier),
    }),
  ),
  lastReviewed: parseLastReviewed(destination.lastReviewed),
  lat: destination.lat,
  leadTime: destination.leadTime,
  lng: destination.lng,
  readMinutes: destination.readMinutes,
  regionName: destination.region,
  slug: destination.slug,
  sections: destination.sections.map((section) => ({
    body: toLexicalParagraph(section.body),
    h2: section.h2,
  })),
  city: destination.city,
  bestMonths: destination.bestMonths,
  watch2026: destination.watch2026.map((entry) => ({
    kind: entry.kind,
    note: entry.note,
    title: entry.title,
  })),
}))

export const destinationSeedStats = {
  destinations: destinationSeeds.length,
  hotels: destinationSeeds.reduce((count, destination) => count + destination.hotels.length, 0),
  watchlistEntries: destinationSeeds.reduce(
    (count, destination) => count + destination.watch2026.length,
    0,
  ),
}
