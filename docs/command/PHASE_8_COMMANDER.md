# Phase 8 Commander — SEO & Performance

**Paste this entire file as the first message of a new Claude Code session.**
**Model: Sonnet 4.6 (commander) + Sonnet 4.6 (workers)**

---

## Your role

You are the Phase 8 commander for the Viaive project. Your job is to coordinate two parallel Sonnet workers — one for structured data + metadata, one for sitemap/robots/performance — then merge, verify, tag, and output the Phase 9 commander prompt.

---

## Pre-flight

```bash
git checkout main && git pull
git tag | grep green   # must show phase-7-integrations-green
pnpm drift:check       # exit 0
npx tsc --noEmit       # 0 errors
pnpm dev:doppler &
```

---

## Workers — spawn both in parallel

---

### Worker A prompt — Structured data + metadata (Sonnet 4.6)

```
You are adding JSON-LD structured data and enriching metadata across all Viaive routes.
Working directory: this worktree. Confirm with git status — must be clean.

## Your job — 4 tasks

### Task 1: Homepage (src/app/(site)/page.tsx)
Add Organization + TravelAgency JSON-LD in a <script type="application/ld+json"> tag:
```tsx
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'TravelAgency'],
  name: 'Viaive',
  url: 'https://viaive.com',
  description: 'Luxury travel editorial advisory. Audited hotels, named advisor relationships, and a standard you can feel before you arrive.',
  contactPoint: { '@type': 'ContactPoint', email: 'hello@viaive.com', contactType: 'customer service' },
}
```

### Task 2: Destination pages (4 pages in src/app/(site)/destinations/*)
Add TouristDestination + FAQPage JSON-LD to each. Build from the dest DestinationConfig:

```tsx
const destinationSchema = {
  '@context': 'https://schema.org',
  '@type': 'TouristDestination',
  name: dest.city,
  description: dest.geoAnswer,
  touristType: 'Luxury traveler',
  geo: { '@type': 'GeoCoordinates', latitude: dest.lat, longitude: dest.lng },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: `When is the best time to visit ${dest.city}?`, acceptedAnswer: { '@type': 'Answer', text: `Best months: ${dest.bestMonths}` } },
    { '@type': 'Question', name: `How far in advance should I book a luxury hotel in ${dest.city}?`, acceptedAnswer: { '@type': 'Answer', text: dest.leadTime } },
  ],
}
```

Inject both as <script type="application/ld+json"> in the page return, ABOVE the <Nav />.

### Task 3: Best-of pages (src/app/(site)/best/*)
Add ItemList JSON-LD listing the ranked hotels. Pull hotels from the matching STATIC_DESTINATIONS entry:

```tsx
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `Best Hotels in ${city} 2026`,
  numberOfItems: dest.hotels.length,
  itemListElement: dest.hotels.map((h, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: h.name,
    description: h.note,
  })),
}
```

### Task 4: Legal pages — noindex robots meta
Add `robots: { index: false, follow: false }` to metadata exports for privacy, terms (but NOT affiliate-disclosure — that must be indexed per FTC best practice).

Actually: keep affiliate-disclosure indexed. Only add noindex to /privacy and /terms.

## Files you may touch
- src/app/(site)/page.tsx
- src/app/(site)/destinations/thailand/page.tsx
- src/app/(site)/destinations/tokyo/page.tsx
- src/app/(site)/destinations/paris/page.tsx
- src/app/(site)/destinations/dubai/page.tsx
- src/app/(site)/best/tokyo-hotels/page.tsx
- src/app/(site)/best/paris-hotels/page.tsx
- src/app/(site)/privacy/page.tsx (metadata only)
- src/app/(site)/terms/page.tsx (metadata only)

## After finishing
1. npx tsc --noEmit — 0 errors
2. pnpm drift:check — exit 0
3. Spot-check: curl http://localhost:3000/destinations/tokyo | grep "application/ld+json" — must match
4. git add src/app/\(site\)/
5. git commit -m "Phase 8: JSON-LD structured data + noindex on legal pages"
6. git push
```

---

### Worker B prompt — Sitemap, robots, performance (Sonnet 4.6)

```
You are implementing the sitemap, robots.txt, and performance improvements for the Viaive project.
Working directory: this worktree. Confirm with git status — must be clean.

## Task 1: Sitemap (src/app/sitemap.ts)

Create src/app/sitemap.ts — NOT inside the (site) route group, at the root app level:

```ts
import type { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://viaive.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/start-planning`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/concierge`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/desks/hotel`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/desks/family`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/desks/safari`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/desks/asia`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/destinations/thailand`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/destinations/tokyo`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/destinations/paris`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/destinations/dubai`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/best/tokyo-hotels`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/best/paris-hotels`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/compare/villa-vs-hotel`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/compare/direct-vs-advisor-vs-portal`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/affiliate-disclosure`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    // privacy and terms excluded — noindexed
  ]
}
```

## Task 2: Robots (src/app/robots.ts)

```ts
import type { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://viaive.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/(internal)'] },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  }
}
```

## Task 3: Site layout performance (src/app/(site)/layout.tsx)

Add these to the <head> equivalent via Next.js metadata or direct tags:
- `<link rel="preconnect" href="https://fonts.bunny.net" />`
- `<link rel="dns-prefetch" href="https://scripts.stay22.com" />`
- `<link rel="dns-prefetch" href="https://www.stay22.com" />`

In Next.js App Router, add these via the layout's metadata export or as `<link>` tags in the layout JSX.

## Task 4: next.config.ts — compression + image optimization

Verify these are set in nextConfig:
```ts
compress: true,
images: {
  formats: ['image/avif', 'image/webp'],
  // (keep existing localPatterns and remotePatterns — just add formats)
},
```

## Files you may touch
- src/app/sitemap.ts (create)
- src/app/robots.ts (create)
- src/app/(site)/layout.tsx (preconnect hints only)
- next.config.ts (compress + image formats only)

## Do NOT touch page files — those are Worker A's territory.

## After finishing
1. npx tsc --noEmit — 0 errors
2. pnpm drift:check — exit 0
3. curl http://localhost:3000/sitemap.xml — must return XML with 17 URLs
4. curl http://localhost:3000/robots.txt — must return valid robots
5. git add src/app/sitemap.ts src/app/robots.ts src/app/\(site\)/layout.tsx next.config.ts
6. git commit -m "Phase 8: sitemap, robots, preconnect hints, image optimization"
7. git push
```

---

## After both workers complete

```bash
git checkout main && git pull
npx tsc --noEmit
pnpm drift:check
curl http://localhost:3000/sitemap.xml | grep -c '<url>' # should be 17
curl http://localhost:3000/destinations/tokyo | grep -c 'ld+json' # should be >= 2
```

---

## Tagging

```bash
git tag phase-8-seo-green main
git push origin phase-8-seo-green
pnpm drift:check
```

---

## Session close — tell Bruce

```
Phase 8 complete and tagged phase-8-seo-green.

✓ JSON-LD: Organization on homepage, TouristDestination+FAQPage on 4 destination pages, ItemList on 2 best-of pages
✓ Sitemap: /sitemap.xml with 17 routes (privacy/terms excluded — noindexed)
✓ Robots: /robots.txt blocking /admin, /api, /(internal)
✓ Performance: compression enabled, AVIF/WebP image formats, preconnect hints
✓ drift-check: 0 violations
✓ TypeScript: 0 errors

Next phase: Phase 9 — Launch QA — model: Opus 4.7
```

Then print the exact contents of `docs/command/PHASE_9_COMMANDER.md` prefixed with:

```
=== COPY EVERYTHING BELOW THIS LINE AND PASTE INTO A NEW CLAUDE CODE SESSION ===
```
