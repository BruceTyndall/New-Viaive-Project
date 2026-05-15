export const homepageSeed = {
  title: 'VIAIVE Homepage',
  route: '/',
  h1: 'The travel decisions that quietly shape a life.',
  reviewStatus: 'staging',
  reviewNotes: 'Seeded from the Accessnewviaive Figma Make package.',
  lastReviewedAt: '2026-05-14',
  hero: {
    eyebrow: 'Editorial Intelligence · Private Advisory',
    headline: 'The travel decisions that quietly shape a life.',
    dek: "VIAIVE is an editorial advisory for travelers who treat every booking as a decision, not a transaction. We audit hotels, ships, camps and villas, then route you toward the ones that hold the standard.",
    imageUrl:
      'https://images.unsplash.com/photo-1683510157012-01a812870de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2400',
    primaryCTA: {
      label: 'Start Planning',
      url: '/start-planning',
      analyticsId: 'home:hero:start-planning',
      style: 'primary',
    },
    secondaryCTA: {
      label: 'Concierge',
      url: '/concierge',
      analyticsId: 'home:hero:concierge',
      style: 'text',
    },
    visualVariant: 'editorial',
  },
  intentRouter: [
    {
      label: 'Find the right hotel',
      travelerIntent: 'hotel',
      description:
        'Audited suites, named upgrades, and preferred-partner programs. Booked, not searched.',
      targetUrl: '/desks/hotel',
      iconOrVisualCue: 'Hotel desk',
      priority: 1,
    },
    {
      label: 'Plan for family',
      travelerIntent: 'family',
      description:
        'Properties that hold a standard for the four-year-old and the eighty-year-old at the same table.',
      targetUrl: '/desks/family',
      iconOrVisualCue: 'Family desk',
      priority: 2,
    },
    {
      label: 'Build a safari brief',
      travelerIntent: 'safari',
      description:
        'Camp, guide, season, aircraft, and conservation context read as one decision.',
      targetUrl: '/desks/safari',
      iconOrVisualCue: 'Safari desk',
      priority: 3,
    },
    {
      label: 'Navigate Asia',
      travelerIntent: 'asia',
      description:
        'Tokyo, Thailand, Singapore, Bali, and beyond with hotels, transfers, and timing held together.',
      targetUrl: '/desks/asia',
      iconOrVisualCue: 'Asia desk',
      priority: 4,
    },
  ],
  serviceDeskHighlights: [
    {
      title: 'Hotel Advisory',
      slug: 'hotel',
      copy: 'The right room, rate context, upgrade path, and booking channel.',
      href: '/desks/hotel',
    },
    {
      title: 'Family & Legacy',
      slug: 'family',
      copy: 'Multi-generation trips planned around rhythm, care, and delight.',
      href: '/desks/family',
    },
    {
      title: 'Safari',
      slug: 'safari',
      copy: 'Season, camp, guide, aircraft, and conservation standards in one brief.',
      href: '/desks/safari',
    },
  ],
  featuredDestinations: [
    {
      title: 'Tokyo',
      slug: 'tokyo',
      copy: 'A city where the hotel decision changes the entire trip.',
      href: '/destinations/tokyo',
      imageUrl:
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
    },
    {
      title: 'Thailand',
      slug: 'thailand',
      copy: 'Beach, city, wellness, and family routes that need careful sequencing.',
      href: '/destinations/thailand',
      imageUrl:
        'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
    },
    {
      title: 'Paris',
      slug: 'paris',
      copy: 'Palace choices, neighborhood context, and a softer version of precision.',
      href: '/destinations/paris',
      imageUrl:
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600',
    },
  ],
  featuredArticles: [
    {
      title: 'When should I use a luxury travel advisor?',
      copy: 'Use one when the trip has consequences: family complexity, high rates, limited inventory, or decisions that need private context.',
    },
    {
      title: 'How VIAIVE thinks about hotels',
      copy: 'We separate design theater from operational reliability, room truth, service memory, and upgrade leverage.',
    },
  ],
  hotelAdvisoryModule: {
    enabled: true,
    title: 'Hotel advisory without the marketplace noise.',
    copy: 'When Stay22 is enabled, hotel modules render as disclosed monetization surfaces. Until then, the module stays clean and advisory-led.',
    stay22Eligible: true,
    cta: {
      label: 'Open Hotel Desk',
      url: '/desks/hotel',
      analyticsId: 'home:hotel-module:desk',
      style: 'primary',
    },
  },
  planningProcess: [
    {
      stepTitle: 'Brief',
      stepDescription: 'Tell us the trip behind the trip: occasion, constraints, taste, pace, and risk.',
    },
    {
      stepTitle: 'Route',
      stepDescription: 'We turn intent into a short decision path: desk, destination, hotel, or concierge.',
    },
    {
      stepTitle: 'Approve',
      stepDescription: 'Bruce reviews the recommendation path before it becomes a client-facing plan.',
    },
  ],
  affiliateDisclosureTeaser: {
    enabled: true,
    label: 'Affiliate disclosure',
    copy: 'Some hotel and travel-resource modules may earn VIAIVE a commission at no additional cost to travelers. We keep disclosure visible and editorial control separate from partner economics.',
    link: '/affiliate-disclosure',
  },
  finalCTA: {
    headline: 'Start with the trip only you would notice.',
    copy: 'Open a private planning brief or let the concierge desk route you to the right first move.',
    primaryCTA: {
      label: 'Start Planning',
      url: '/start-planning',
      analyticsId: 'home:final:start-planning',
      style: 'primary',
    },
    secondaryCTA: {
      label: 'Concierge',
      url: '/concierge',
      analyticsId: 'home:final:concierge',
      style: 'secondary',
    },
  },
  seo: {
    metaTitle: 'VIAIVE | Luxury Travel Advisory',
    metaDescription:
      'VIAIVE is a luxury travel decision-and-intake engine for hotels, destinations, family travel, safari planning, and private concierge briefs.',
    canonicalUrl: 'https://viaive.com/',
    ogTitle: 'VIAIVE Luxury Travel Advisory',
    ogDescription:
      'A premium, editorial travel advisory built around better luxury travel decisions.',
    robots: 'indexFollow',
    schemaType: 'TravelAgency',
    llmsTxt: 'reviewRequired',
  },
  geo: {
    answerSummary:
      'VIAIVE helps luxury travelers decide where to stay, when to use an advisor, and how to route complex trips through hotel, family, safari, Asia, and concierge planning desks.',
    aiSearchIntent: 'homepage',
    citationSummary: 'Homepage source of truth for VIAIVE advisory positioning.',
    confidenceNotes: 'Seed copy requires Bruce approval before live status.',
    keyQuestions: [
      {
        question: 'What is VIAIVE?',
        shortAnswer:
          'VIAIVE is a luxury travel advisory and decision engine for travelers who want hotel, destination, and concierge guidance before booking.',
      },
      {
        question: 'How does VIAIVE help plan luxury travel?',
        shortAnswer:
          'VIAIVE routes each trip through the right advisory path, then turns intent into hotel, destination, and concierge recommendations.',
      },
      {
        question: 'When should I use a luxury travel advisor?',
        shortAnswer:
          'Use one when the trip has high cost, family complexity, limited inventory, or decisions where mistakes are expensive.',
      },
      {
        question: 'What types of trips can VIAIVE help plan?',
        shortAnswer:
          'VIAIVE supports hotel-led trips, family travel, safari planning, Asia itineraries, wellness, villas, cruises, yachts, and private concierge briefs.',
      },
      {
        question: 'How does VIAIVE choose hotels and destinations?',
        shortAnswer:
          'VIAIVE evaluates hotels and destinations against editorial standards, service reliability, traveler intent, timing, and monetization-safe next steps.',
      },
    ],
  },
} as const

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? Widen<U>[]
        : T extends object
          ? { -readonly [K in keyof T]: Widen<T[K]> }
          : T

export type HomepageSeed = Widen<typeof homepageSeed>
