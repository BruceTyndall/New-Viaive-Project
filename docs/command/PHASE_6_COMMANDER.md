# Phase 6 Commander — Content & CMS Seeding

**Paste this entire file as the first message of a new Claude Code session.**
**Model: Sonnet 4.6 (commander) + Haiku 4.5 (workers)**

---

## Your role

You are the Phase 6 commander for the Viaive project. Your job is to coordinate two parallel Haiku workers that write seed scripts for all Payload collections and globals, then run the seed, verify, tag the release, and output the Phase 7 commander prompt for Bruce.

The dev server must be running for seeding to work (`pnpm dev:doppler`).

---

## Pre-flight

```bash
git checkout main && git pull
git tag | grep green   # must show phase-5b-pages-green
pnpm drift:check       # must exit 0, 0 info items
npx tsc --noEmit       # must be 0 errors
pnpm dev:doppler &     # keep running for the duration of this session
```

If any check fails: stop and tell Bruce.

---

## Architecture before writing any code

Phase 6 adds one directory: `src/seed/`

```
src/seed/
├── destinations.ts   ← Worker A
├── regions.ts        ← Worker A
├── desks.ts          ← Worker B
├── bestOf.ts         ← Worker B
├── compares.ts       ← Worker B
├── pages.ts          ← Worker B
├── legal.ts          ← Worker B
├── globals.ts        ← Worker B
└── index.ts          ← Worker B (runs all in correct order)
```

All seed scripts use the Payload local API (not REST). Pattern:
```ts
import { getPayload } from 'payload'
import config from '@payload-config'

export async function seedX() {
  const payload = await getPayload({ config })
  // upsert — safe to re-run
  const existing = await payload.find({ collection: 'x', where: { slug: { equals: 'y' } }, limit: 1 })
  if (existing.docs.length > 0) {
    console.log('x:y already seeded — skipping')
    return
  }
  await payload.create({ collection: 'x', data: { ... } })
  console.log('seeded x:y')
}
```

**Upsert logic is mandatory** — seed scripts must be idempotent (safe to run twice without duplicates).

---

## Workers — spawn both in parallel

---

### Worker A prompt — Destinations + Regions seed (Haiku 4.5)

```
You are writing Payload CMS seed scripts for the Viaive project.
Working directory: this worktree (confirm with git status).

## Your ONLY job
Create exactly these 2 files:
- src/seed/destinations.ts
- src/seed/regions.ts

## Do NOT touch any other file. Do NOT run the seeds — just write them.

## Destinations seed (src/seed/destinations.ts)

Seed 4 destination documents. Pull data from src/data/destinations.ts — the STATIC_DESTINATIONS array already has all 4 (thailand, tokyo, paris, dubai). Map each DestinationConfig into the Payload 'destinations' collection fields.

Key fields to seed per destination (check src/fields/cmsSpec.ts for exact field names):
- slug
- city, country, region
- lat, lng
- bestMonths, leadTime, readMinutes, lastReviewed
- heroEyebrow, h1, h1Italic, geoAnswer
- hotels (array)
- watch2026 (array)
- sections (array of h2 + body richtext)
- ctaEyebrow, ctaHeadline, ctaBody, conciergeIntent

Use upsert logic — check if slug exists before creating.

## Regions seed (src/seed/regions.ts)

Seed 4 region documents. The 'regions' collection likely has: slug, name, description.

Seed:
- { slug: 'asia', name: 'Asia', description: 'Bangkok, Tokyo, Bali, and beyond.' }
- { slug: 'europe', name: 'Europe', description: 'Paris, Rome, London, and beyond.' }
- { slug: 'middle-east', name: 'Middle East', description: 'Dubai, Abu Dhabi, and beyond.' }
- { slug: 'americas', name: 'Americas', description: 'New York, Miami, Mexico, and beyond.' }

## After writing both files
1. npx tsc --noEmit — fix any errors in the seed files
2. git add src/seed/destinations.ts src/seed/regions.ts
3. git commit -m "Phase 6: destinations + regions seed scripts"
4. git push
```

---

### Worker B prompt — All other collections + globals seed (Haiku 4.5)

```
You are writing Payload CMS seed scripts for the Viaive project.
Working directory: this worktree (confirm with git status).

## Your ONLY job
Create exactly these 7 files:
- src/seed/desks.ts
- src/seed/bestOf.ts
- src/seed/compares.ts
- src/seed/pages.ts
- src/seed/legal.ts
- src/seed/globals.ts
- src/seed/index.ts

## Do NOT touch any other file. Do NOT run the seeds — just write them.

## Desks seed (src/seed/desks.ts)
Seed 4 desk documents for the 'desks' collection:
- hotel: { slug: 'hotel', name: 'Hotel Desk', leadTime: '2–4 weeks', priceFloor: '$1,200/night', specialties: ['Preferred partner upgrades', 'Four Seasons', 'Virtuoso', 'Belmond Bellini'] }
- family: { slug: 'family', name: 'Family Desk', leadTime: '6–8 weeks', priceFloor: '$800/night', specialties: ['Multi-room configurations', 'Child-friendly villas', 'Nanny coordination'] }
- safari: { slug: 'safari', name: 'Safari Desk', leadTime: '6–12 months', priceFloor: '$2,000/night', specialties: ['Kenya', 'Tanzania', 'Rwanda', 'Botswana', 'South Africa'] }
- asia: { slug: 'asia', name: 'Asia Intelligence Desk', leadTime: '4–6 weeks', priceFloor: '$900/night', specialties: ['Thailand', 'Japan', 'Bali', 'Vietnam', 'Maldives'] }

## Best-of seed (src/seed/bestOf.ts)
Seed 2 bestOf documents:
- { slug: 'tokyo-hotels', title: 'Best Hotels in Tokyo 2026', city: 'Tokyo', updatedAt: '2026-02' }
- { slug: 'paris-hotels', title: 'Best Hotels in Paris 2026', city: 'Paris', updatedAt: '2026-03' }

## Compares seed (src/seed/compares.ts)
Seed 2 compare documents:
- { slug: 'villa-vs-hotel', title: 'Villa vs Hotel', question: 'Should you book a villa or a hotel?' }
- { slug: 'direct-vs-advisor-vs-portal', title: 'Direct vs Advisor vs Portal', question: 'What is the best way to book a luxury hotel?' }

## Pages seed (src/seed/pages.ts)
Seed 3 page documents for the 'pages' collection:
- { slug: 'home', title: 'Home', ... }
- { slug: 'start-planning', title: 'Start Planning', ... }
- { slug: 'concierge', title: 'Concierge', ... }
For pages, only seed the fields the collection requires. Check src/fields/cmsSpec.ts for exact fields.

## Legal seed (src/seed/legal.ts)
Seed 3 legal documents:
- { slug: 'privacy', title: 'Privacy Policy', lastUpdated: '2026-05' }
- { slug: 'terms', title: 'Terms of Use', lastUpdated: '2026-05' }
- { slug: 'affiliate-disclosure', title: 'Affiliate Disclosure', lastUpdated: '2026-05' }

## Globals seed (src/seed/globals.ts)
Seed these globals using payload.updateGlobal():
- navigation: { primaryLinks: [{ label: 'Start Planning', href: '/start-planning' }, { label: 'Concierge', href: '/concierge' }, { label: 'Desks', href: '#desks' }] }
- footer: { tagline: 'Luxury travel, decided.', legalLinks: [{ label: 'Privacy', href: '/privacy' }, { label: 'Terms', href: '/terms' }, { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' }] }
- viaiveStandard: { headline: 'The Viaive Standard', body: 'Every placement is audited against service depth, room quality, and food integrity. We hold preferred-partner status under Four Seasons, Virtuoso, and Belmond Bellini — which means upgrades, amenities, and access that the same booking on a portal cannot match.' }
- proof: { items: [{ quote: 'The brief came back in 14 hours. One property, one room category, three sentences on why. Exactly what I needed.', attribution: 'Verified client, Tokyo 2025' }, { quote: 'We stopped booking direct after our first Viaive placement. The difference in service on arrival was immediate.', attribution: 'Verified client, Paris 2025' }, { quote: 'Safari desks are the hardest to trust. This one had been to every camp they recommended.', attribution: 'Verified client, Kenya 2025' }] }
- newsletter: { headline: 'The Placement List', subhead: 'One hotel note, once a month. No itineraries. No aggregated lists.' }
- novaExitIntent: { headline: 'Before you go —', body: 'One senior advisor. One placement. Back within 18 hours.', ctaLabel: 'Start a brief', ctaHref: '/start-planning' }

## Index (src/seed/index.ts)
The master runner — must run in dependency order:

```ts
import { seedRegions } from './regions'
import { seedDestinations } from './destinations'
import { seedDesks } from './desks'
import { seedBestOf } from './bestOf'
import { seedCompares } from './compares'
import { seedPages } from './pages'
import { seedLegal } from './legal'
import { seedGlobals } from './globals'

async function main() {
  console.log('=== Viaive CMS Seed ===')
  await seedRegions()
  await seedDestinations()
  await seedDesks()
  await seedBestOf()
  await seedCompares()
  await seedPages()
  await seedLegal()
  await seedGlobals()
  console.log('=== Seed complete ===')
  process.exit(0)
}

main().catch((e) => { console.error(e); process.exit(1) })
```

## After writing all 7 files
1. npx tsc --noEmit — fix any type errors
2. git add src/seed/
3. git commit -m "Phase 6: CMS seed scripts for all collections and globals"
4. git push
```

---

## After both workers complete — run the seed

```bash
git checkout main && git pull
# Make sure dev server is running (pnpm dev:doppler)
npx tsx src/seed/index.ts
```

Verify output shows "Seed complete" with no errors. If any collection fails, fix the seed script and re-run (upsert logic makes re-runs safe).

---

## Verification

```bash
pnpm drift:check       # must still exit 0
npx tsc --noEmit       # 0 errors
# Confirm seed data is live via Payload admin
curl http://localhost:3000/api/destinations?limit=4  # should return 4 docs
curl http://localhost:3000/api/desks?limit=5         # should return 4 docs
```

---

## Tagging

```bash
git checkout main && git pull
git tag phase-6-content-green main
git push origin phase-6-content-green
pnpm drift:check
```

---

## Session close — tell Bruce

```
Phase 6 complete and tagged phase-6-content-green.

✓ All collections seeded: destinations (4), regions (4), desks (4), bestOf (2), compares (2), pages (3), legal (3)
✓ All globals seeded: navigation, footer, viaiveStandard, proof, newsletter, novaExitIntent
✓ drift-check: 0 violations
✓ TypeScript: 0 errors

Next phase: Phase 7 — Integrations (Stay22, Brevo, R2) — model: Sonnet 4.6
```

Then print the exact contents of `docs/command/PHASE_7_COMMANDER.md` prefixed with:

```
=== COPY EVERYTHING BELOW THIS LINE AND PASTE INTO A NEW CLAUDE CODE SESSION ===
```
