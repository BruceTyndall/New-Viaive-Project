import { getPayload } from 'payload'

import config from '../../payload.config'
import {
  destinationSeeds,
  destinationSeedStats,
  hotelTierNormalizationMap,
} from './destinations'

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const uniqueRegionNames = Array.from(
  new Set(destinationSeeds.map((destination) => destination.regionName)),
)

type PayloadInstance = Awaited<ReturnType<typeof getPayload>>

type RegionDoc = {
  id: number
}

type DestinationDoc = {
  id: number
  slug: string
  hotels?: unknown[] | null
  lastReviewed?: string | null
  watch2026?: unknown[] | null
}

async function upsertRegion(payload: PayloadInstance, regionName: string): Promise<RegionDoc> {
  const slug = slugify(regionName)
  const existing = await payload.find({
    collection: 'regions',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (existing.docs[0]) {
    return existing.docs[0] as unknown as RegionDoc
  }

  return (await payload.create({
    collection: 'regions',
    data: {
      name: regionName,
      slug,
    },
    depth: 0,
    overrideAccess: true,
  })) as unknown as RegionDoc
}

async function upsertDestination(
  payload: PayloadInstance,
  destination: (typeof destinationSeeds)[number],
  regionId: number,
): Promise<DestinationDoc> {
  const existing = await payload.find({
    collection: 'destinations',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: {
      slug: {
        equals: destination.slug,
      },
    },
  })

  const data = {
    bestMonths: destination.bestMonths,
    city: destination.city,
    conciergeIntent: destination.conciergeIntent,
    country: destination.country,
    ctaBody: destination.ctaBody,
    ctaEyebrow: destination.ctaEyebrow,
    ctaHeadline: destination.ctaHeadline,
    geoAnswer: destination.geoAnswer,
    h1: destination.h1,
    h1Italic: destination.h1Italic,
    heroEyebrow: destination.heroEyebrow,
    hotels: destination.hotels,
    lastReviewed: destination.lastReviewed,
    lat: destination.lat,
    leadTime: destination.leadTime,
    lng: destination.lng,
    readMinutes: destination.readMinutes,
    region: regionId,
    sections: destination.sections,
    slug: destination.slug,
    watch2026: destination.watch2026,
  }

  if (existing.docs[0]) {
    return (await payload.update({
      collection: 'destinations',
      data: data as never,
      depth: 0,
      id: existing.docs[0].id,
      overrideAccess: true,
    })) as unknown as DestinationDoc
  }

  return (await payload.create({
    collection: 'destinations',
    data: data as never,
    depth: 0,
    overrideAccess: true,
  })) as unknown as DestinationDoc
}

async function syncRegionDestinations(
  payload: PayloadInstance,
  regionId: number,
  destinationIds: number[],
) {
  await payload.update({
    collection: 'regions',
    data: {
      destinations: destinationIds,
    },
    depth: 0,
    id: regionId,
    overrideAccess: true,
  })
}

const NINETY_DAYS_IN_MS = 90 * 24 * 60 * 60 * 1000

const isWithinLast90Days = (value: string | null | undefined) => {
  if (!value) {
    return false
  }

  const timestamp = new Date(value).getTime()

  return Number.isFinite(timestamp) && Date.now() - timestamp <= NINETY_DAYS_IN_MS
}

async function main() {
  const payload = await getPayload({ config })
  const regionIds = new Map<string, number>()
  const destinationIdsByRegion = new Map<string, number[]>()

  for (const regionName of uniqueRegionNames) {
    const region = await upsertRegion(payload, regionName)
    regionIds.set(regionName, region.id)
  }

  for (const destination of destinationSeeds) {
    const regionId = regionIds.get(destination.regionName)

    if (!regionId) {
      throw new Error(`Missing region for destination "${destination.slug}"`)
    }

    const seededDestination = await upsertDestination(payload, destination, regionId)
    const existingDestinationIds = destinationIdsByRegion.get(destination.regionName) || []

    existingDestinationIds.push(seededDestination.id)
    destinationIdsByRegion.set(destination.regionName, existingDestinationIds)
  }

  for (const [regionName, destinationIds] of destinationIdsByRegion.entries()) {
    const regionId = regionIds.get(regionName)

    if (!regionId) {
      throw new Error(`Missing region id for "${regionName}"`)
    }

    await syncRegionDestinations(payload, regionId, destinationIds)
  }

  const seededDestinations = await payload.find({
    collection: 'destinations',
    depth: 0,
    limit: destinationSeeds.length,
    overrideAccess: true,
    pagination: false,
    where: {
      or: destinationSeeds.map((destination) => ({
        slug: {
          equals: destination.slug,
        },
      })),
    },
  })

  const totals = seededDestinations.docs.reduce(
    (counts: { hotels: number; watchlistEntries: number }, destination: DestinationDoc) => {
      counts.hotels += Array.isArray(destination.hotels) ? destination.hotels.length : 0
      counts.watchlistEntries += Array.isArray(destination.watch2026)
        ? destination.watch2026.length
        : 0

      return counts
    },
    { hotels: 0, watchlistEntries: 0 },
  )

  if (seededDestinations.docs.length !== 3) {
    throw new Error(`Expected 3 seeded destinations, found ${seededDestinations.docs.length}`)
  }

  if (totals.hotels !== 24) {
    throw new Error(`Expected 24 seeded hotels, found ${totals.hotels}`)
  }

  for (const destination of seededDestinations.docs) {
    if (!Array.isArray(destination.watch2026) || destination.watch2026.length < 1) {
      throw new Error(`Destination "${destination.slug}" is missing required watchlist entries`)
    }

    if (!isWithinLast90Days(destination.lastReviewed)) {
      throw new Error(
        `Destination "${destination.slug}" lastReviewed is not within the last 90 days: ${destination.lastReviewed}`,
      )
    }
  }

  console.log(
    JSON.stringify(
      {
        hotelTierNormalizationMap,
        seededDestinations: seededDestinations.docs.length,
        seededHotels: totals.hotels,
        seededWatchlistEntries: totals.watchlistEntries,
        sourceStats: destinationSeedStats,
      },
      null,
      2,
    ),
  )

  if (payload.db.destroy) {
    await payload.db.destroy()
  }

  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
