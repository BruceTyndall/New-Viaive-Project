# Phase 5b Commander — 11 Pattern Routes

**Paste this entire file as the first message of a new Claude Code session.**
**Model: Sonnet 4.6 (commander) + Haiku 4.5 (workers)**

---

## Your role

You are the Phase 5b commander for the Viaive project. Your job is to coordinate three parallel Haiku workers, each building a discrete group of routes, then merge all three to main, verify, tag the release, and output the Phase 6 commander prompt for Bruce to copy-paste into the next session.

Do not write any route files yourself. Spawn workers for all implementation.

---

## Pre-flight (run before spawning workers)

```bash
git checkout main && git pull
git tag | grep green   # must show phase-5a-pages-green
pnpm drift:check       # must exit 0, 11 info items expected
npx tsc --noEmit       # must be 0 errors
pnpm dev:doppler &     # start dev server in background — keep it running
```

If any check fails: stop and tell Bruce. Do not proceed.

---

## Workers — spawn all three in parallel

Use the Agent tool with `isolation: "worktree"` and `run_in_background: true` for Workers A and B, then send Worker C without background. After all three complete, proceed to merge.

---

### Worker A prompt — Destination pages (Haiku 4.5)

```
You are building 4 destination pages for the Viaive luxury travel site. 
Working directory: this worktree (run git status to confirm it's clean).

## Your ONLY job
Create exactly these 4 files — nothing else:
- src/app/(site)/destinations/thailand/page.tsx
- src/app/(site)/destinations/tokyo/page.tsx
- src/app/(site)/destinations/paris/page.tsx
- src/app/(site)/destinations/dubai/page.tsx

## Do NOT touch any other file. All components are frozen in src/components/.

## Pattern (copy exactly for each destination)

```ts
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { STATIC_DESTINATIONS, getDestination } from '@/data/destinations'
import type { DestinationConfig } from '@/types/destination'
import { Nav } from '@/components/Nav'
import { DestinationGuide } from '@/components/DestinationGuide'
import { StayModule } from '@/components/StayModule'
import { EmailCapture } from '@/components/EmailCapture'
import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'
import { NovaExitIntent } from '@/components/NovaExitIntent'

export const metadata: Metadata = {
  title: '[City], Audited — Where to Stay in [City] 2026 — Viaive',
  description: '[dest.geoAnswer from STATIC_DESTINATIONS]',
  openGraph: {
    title: '[City], Audited — Where to Stay in [City] 2026 — Viaive',
    description: '[dest.geoAnswer]',
    type: 'website',
  },
}

export default async function [City]Page() {
  let dest: DestinationConfig = getDestination('[slug]')
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'destinations',
      where: { slug: { equals: '[slug]' } },
      limit: 1,
    })
    if (result.docs[0]) dest = result.docs[0] as unknown as DestinationConfig
  } catch { /* static fallback */ }

  return (
    <>
      <Nav />
      <main id="main-content">
        <DestinationGuide destination={dest} />
        <StayModule hotels={dest.hotels} />
        <EmailCapture />
        <FAQ />
        <NovaExitIntent />
      </main>
      <Footer />
    </>
  )
}
```

## Slug → City mapping
- thailand → Bangkok (geoAnswer already in STATIC_DESTINATIONS)
- tokyo → Tokyo
- paris → Paris
- dubai → Dubai

## After creating all 4 files
1. Run: npx tsc --noEmit — fix any errors
2. Run: pnpm drift:check — must exit 0
3. git add src/app/\(site\)/destinations/
4. git commit -m "Phase 5b: 4 destination pages"
5. git push
```

---

### Worker B prompt — Best-of + Compare pages (Haiku 4.5)

```
You are building 4 pages for the Viaive luxury travel site.
Working directory: this worktree (run git status to confirm it's clean).

## Your ONLY job
Create exactly these 4 files — nothing else:
- src/app/(site)/best/tokyo-hotels/page.tsx
- src/app/(site)/best/paris-hotels/page.tsx
- src/app/(site)/compare/villa-vs-hotel/page.tsx
- src/app/(site)/compare/direct-vs-advisor-vs-portal/page.tsx

## Do NOT touch any other file.

## Best-of pattern (tokyo-hotels and paris-hotels)

```ts
import type { Metadata } from 'next'
import { STATIC_DESTINATIONS, getDestination } from '@/data/destinations'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Editorial } from '@/components/Editorial'
import { StayModule } from '@/components/StayModule'
import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'
import { NovaExitIntent } from '@/components/NovaExitIntent'

export const metadata: Metadata = {
  title: 'Best Hotels in [City] 2026 — Viaive',
  description: 'The [N] best hotels in [City] for 2026, audited by the Viaive [City/Asia] Intelligence Desk. Ranked by service depth, room quality, and placement record.',
  openGraph: { title: '...', description: '...', type: 'website' },
}

export default function Best[City]HotelsPage() {
  const dest = getDestination('[slug]') // 'tokyo' or 'paris'
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Editorial />
        <StayModule hotels={dest.hotels} />
        <FAQ />
        <NovaExitIntent />
      </main>
      <Footer />
    </>
  )
}
```

## Compare pattern (both compare pages — no affiliate, no NovaExitIntent)

```ts
import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { FAQ } from '@/components/FAQ'
import { Brief } from '@/components/Brief'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: '[Question] — Viaive',
  description: '...',
  openGraph: { title: '...', description: '...', type: 'website' },
}

export default function [Name]Page() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <FAQ />
        <Brief source="compare-[slug]" />
      </main>
      <Footer />
    </>
  )
}
```

## Titles
- best/tokyo-hotels: "Best Hotels in Tokyo 2026 — Viaive"
- best/paris-hotels: "Best Hotels in Paris 2026 — Viaive"
- compare/villa-vs-hotel: "Villa vs Hotel — Which to Book — Viaive"
- compare/direct-vs-advisor-vs-portal: "Book Direct vs Travel Advisor vs Portal — Viaive"

## After creating all 4 files
1. Run: npx tsc --noEmit — fix any errors
2. Run: pnpm drift:check — must exit 0
3. git add src/app/\(site\)/best/ src/app/\(site\)/compare/
4. git commit -m "Phase 5b: best-of and compare pages"
5. git push
```

---

### Worker C prompt — Legal pages (Haiku 4.5)

```
You are building 3 legal pages for the Viaive luxury travel site.
Working directory: this worktree (run git status to confirm it's clean).

## Your ONLY job
Create exactly these 3 files — nothing else:
- src/app/(site)/privacy/page.tsx
- src/app/(site)/terms/page.tsx
- src/app/(site)/affiliate-disclosure/page.tsx

## Do NOT touch any other file.

## Legal page pattern

Each page: Nav + 70ch-capped prose body + Footer. No other components.
Body uses Tailwind prose. lastUpdated hardcoded as 'May 2026'.

```ts
import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: '[Title] — Viaive',
  description: '...',
  robots: { index: true, follow: true },
}

export default function [Name]Page() {
  return (
    <>
      <Nav />
      <main id="main-content" className="max-w-[70ch] mx-auto px-6 py-20">
        <p className="text-muted text-sm mb-8">Last updated: May 2026</p>
        <h1 className="font-display text-4xl text-stone mb-10">[Title]</h1>
        {/* prose content below — use <h2>, <p>, <ul> with Tailwind classes */}
      </main>
      <Footer />
    </>
  )
}
```

## Content to include

**privacy/page.tsx**
- Title: "Privacy Policy"
- Sections: Information We Collect (name, email from Brief form; no payment data stored by Viaive), How We Use It (advisory correspondence, email newsletter via Brevo), Third-Party Services (Stay22 affiliate links, Brevo, Cloudflare), Your Rights (email hello@viaive.com to request deletion), Contact.

**terms/page.tsx**
- Title: "Terms of Use"
- Sections: Advisory Nature (Viaive provides editorial recommendations, not booking guarantees), No Warranty on Availability (hotel inventory and rates change), Affiliate Links (we earn commission via Stay22 at no cost to you — see affiliate-disclosure), Governing Law (England & Wales), Contact.

**affiliate-disclosure/page.tsx**
- Title: "Affiliate Disclosure"
- Required by FTC: state that Viaive earns commission from Stay22 hotel bookings
- Partners table: Stay22 (hotel bookings), Brevo (email service — not consumer-facing)
- State that affiliate status does not influence editorial placements
- Link back to /privacy and /terms

All three pages link to each other in body or footer note.

## After creating all 3 files
1. Run: npx tsc --noEmit — fix any errors
2. Run: pnpm drift:check — must exit 0
3. git add src/app/\(site\)/privacy/ src/app/\(site\)/terms/ src/app/\(site\)/affiliate-disclosure/
4. git commit -m "Phase 5b: legal pages"
5. git push
```

---

## Merge protocol (after all 3 workers complete)

For each worker, verify before merging:
1. Worker's drift check exited 0
2. TypeScript 0 errors
3. Committed and pushed to their worktree branch

Then merge sequentially — Worker A → main, Worker B → main, Worker C → main.

After all three are merged, on main:

```bash
git pull
pnpm drift:check   # must now show: block: 0  high: 0  info: 0  (all 18 routes exist)
npx tsc --noEmit   # must be 0 errors

# Smoke test all 11 new routes
for r in \
  /destinations/thailand /destinations/tokyo /destinations/paris /destinations/dubai \
  /best/tokyo-hotels /best/paris-hotels \
  /compare/villa-vs-hotel /compare/direct-vs-advisor-vs-portal \
  /privacy /terms /affiliate-disclosure; do
  printf '%s → %s\n' "$r" "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000$r")"
done
# Every route must print 200

# Also regression-check Phase 5a routes
for r in / /start-planning /concierge /desks/hotel /desks/family /desks/safari /desks/asia; do
  printf '%s → %s\n' "$r" "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000$r")"
done
```

If any route returns non-200 or drift check shows violations: fix before tagging.

---

## Tagging

```bash
git checkout main && git pull
git tag phase-5b-pages-green main
git push origin phase-5b-pages-green
pnpm drift:check   # final confirmation — must show 0 info
```

---

## Session close — tell Bruce

After tagging, tell Bruce:

```
Phase 5b complete and tagged phase-5b-pages-green.

✓ drift-check: 0 violations, 0 info (all 18 routes present)
✓ TypeScript: 0 errors
✓ All 18 routes: 200

Workers used:
• Worker A (Haiku): destinations/thailand, /tokyo, /paris, /dubai
• Worker B (Haiku): best/tokyo-hotels, /paris-hotels, compare/villa-vs-hotel, /direct-vs-advisor-vs-portal
• Worker C (Haiku): privacy, terms, affiliate-disclosure

Next phase: Phase 6 — Content & CMS seeding — model: Haiku 4.5
```

Then print the exact contents of `docs/command/PHASE_6_COMMANDER.md` prefixed with:

```
=== COPY EVERYTHING BELOW THIS LINE AND PASTE INTO A NEW CLAUDE CODE SESSION ===
```
