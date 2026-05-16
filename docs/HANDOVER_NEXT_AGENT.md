# Handover — Phase 5b

**Generated:** 2026-05-15 (post Phase 5a tag)
**For the next agent picking up Phase 5b**

---

## ⚠️ Model to use for this phase: **Haiku 4.5**

Per the phase table in [CLAUDE.md](../CLAUDE.md). Phase 5b is 11 pattern routes — each is a thin composition of already-built components over static data. No new components are needed. Haiku is the right model.

---

## What just happened

Phase 5a (Sonnet 4.6) is complete and tagged `phase-5a-pages-green` at `ea90a5d`.

**What was built:**
- 10 missing components (Atlas, Brief, DestinationGuide, DestinationsRail, Editorial, FAQ, NovaExitIntent, Proof, Standard, StayModule)
- 7 Phase 5a routes: `/`, `/start-planning`, `/concierge`, `/desks/hotel`, `/desks/family`, `/desks/safari`, `/desks/asia`
- `src/data/destinations.ts` — static fallback data for 4 destinations (Thailand/Bangkok, Tokyo, Paris, Dubai)
- `src/types/destination.ts` — `DestinationConfig` type used by destination pages
- `src/app/(site)/_actions/brief.ts` — server action for Brief form submissions

All 17 components are now in `src/components/`. All are frozen. Do not modify them.

---

## Before you do ANYTHING

```bash
# 1. Pick up latest main
git checkout main && git pull

# 2. Confirm phase-5a-pages-green tag exists on main
git tag | grep green
# → must show phase-5a-pages-green among others

# 3. Zero-drift gate
pnpm drift:check
# → must exit 0 ("clean — no drift.")
# 11 info items (the 11 Phase 5b routes) are expected and not violations

# 4. Start your branch
git checkout -b phase-5b-pages-patterns

# 5. Boot dev server
pnpm dev:doppler
```

---

## Phase 5b — exact scope

11 routes. No new components. Data composition only.

### Route group: Destinations (4 routes)

| # | Route | Archetype | Spine |
|---|---|---|---|
| 1 | `src/app/(site)/destinations/thailand/page.tsx` | destination | Nav · DestinationGuide · StayModule · EmailCapture · FAQ · Footer · NovaExitIntent |
| 2 | `src/app/(site)/destinations/tokyo/page.tsx` | destination | same |
| 3 | `src/app/(site)/destinations/paris/page.tsx` | destination | same |
| 4 | `src/app/(site)/destinations/dubai/page.tsx` | destination | same |

Static destination data lives in `src/data/destinations.ts` — **all 4 destinations are already there**. Use the same Payload-with-static-fallback pattern from `/`:

```ts
import { STATIC_DESTINATIONS } from '@/data/destinations'

export default async function ThailandPage() {
  let dest = STATIC_DESTINATIONS.find(d => d.slug === 'thailand')!
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({ collection: 'destinations', where: { slug: { equals: 'thailand' } }, limit: 1 })
    if (result.docs[0]) dest = result.docs[0] as unknown as DestinationConfig
  } catch { /* Payload not seeded yet — static fallback */ }
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

**Metadata per destination:** Use `h1` + `geoAnswer` from `DestinationConfig` to populate `title` and `description`. Example for Thailand:
- title: `'Where to Stay in Bangkok 2026 — Viaive'`
- description: the `geoAnswer` field from `STATIC_DESTINATIONS`

**JSON-LD:** Add `TouristDestination` + `FAQPage` schema on each destination page (see archetype spec in `docs/figma/source/docs/PAGE_ARCHETYPE_SPECS.md` § 4 Destination).

---

### Route group: Best-of (2 routes)

| # | Route | Archetype | Spine |
|---|---|---|---|
| 5 | `src/app/(site)/best/tokyo-hotels/page.tsx` | best-of | Nav · Hero · Editorial · StayModule · FAQ · Footer · NovaExitIntent |
| 6 | `src/app/(site)/best/paris-hotels/page.tsx` | best-of | same |

These are pure static pages — no Payload collection for best-of exists yet. Compose from existing components:
- `Hero` — headline from props (pass `eyebrow`, `h1`, `h1Italic` as hardcoded strings)
- `Editorial` — 3 anonymized case-study blocks (hardcoded, same as desk pages)
- `StayModule` — pull hotels from the matching `DestinationConfig` in `STATIC_DESTINATIONS`
  - Tokyo: `STATIC_DESTINATIONS.find(d => d.slug === 'tokyo')`
  - Paris: `STATIC_DESTINATIONS.find(d => d.slug === 'paris')`
- `FAQ` — hardcoded Q&A list tailored to "best hotels [city]" queries

**Add `ItemList` JSON-LD** with the ranked hotels from `StayModule.hotels` (required per archetype spec).

**Metadata:**
- Tokyo: `title: 'Best Hotels in Tokyo 2026 — Viaive'`
- Paris: `title: 'Best Hotels in Paris 2026 — Viaive'`

---

### Route group: Compare (2 routes)

| # | Route | Archetype | Spine |
|---|---|---|---|
| 7 | `src/app/(site)/compare/villa-vs-hotel/page.tsx` | compare | Nav · Hero · FAQ · Brief · Footer |
| 8 | `src/app/(site)/compare/direct-vs-advisor-vs-portal/page.tsx` | compare | same |

Both are no-affiliate pages designed to drive Brief. Keep them simple:
- `Hero` — comparison question as headline
- `FAQ` — comparison Q&A (who wins and why, hardcoded)
- `Brief` — source prop identifies the page (`source="compare-villa-vs-hotel"`)

No `StayModule` on compare pages. No `NovaExitIntent` on compare pages (these are already bottom-funnel, don't interrupt).

**Metadata:**
- Villa vs Hotel: `title: 'Villa vs Hotel — Which to Book — Viaive'`
- Direct vs Advisor: `title: 'Book Direct vs Travel Advisor vs Portal — Viaive'`

---

### Route group: Legal (3 routes)

| # | Route | Archetype | Spine |
|---|---|---|---|
| 9 | `src/app/(site)/privacy/page.tsx` | legal | Nav · richText body · Footer |
| 10 | `src/app/(site)/terms/page.tsx` | legal | Nav · richText body · Footer |
| 11 | `src/app/(site)/affiliate-disclosure/page.tsx` | legal | Nav · richText body · partners table · Footer |

Rules per archetype spec:
- Body capped at 70ch (`max-w-[70ch] mx-auto`)
- `lastUpdated` field renders at top (hardcode as `'May 2026'`)
- Affiliate disclosure additionally renders a `partners[]` table (Stay22, Brevo)
- All three pages link to each other in the footer or body

These are pure server components — no Payload fetch needed, all content hardcoded inline. Keep them minimal; they exist for compliance, not for SEO.

---

## Phase 5a learnings (do not repeat these errors)

1. **No event handlers in RSC.** All 17 components are server-safe already. If a component needs `onClick`, `onSubmit`, etc., it already uses `'use client'`. Do not add `'use client'` to page files — they are server components.

2. **DestinationsRail is prop-driven.** Pass destinations as a prop; do not hard-code data inside the component.

3. **Brief requires `source` prop.** Always pass `<Brief source="<route-slug>" />` — this is how the server action knows which page originated the brief.

4. **Static data fallback pattern.** Payload collections are not seeded yet for most content. Every page that touches Payload must wrap the fetch in `try/catch` and fall back to static data. See `src/app/(site)/page.tsx` for the canonical example.

5. **NovaExitIntent is a portal-style modal.** It renders itself into the document body. Place it as the last child of the component tree, not inside `<main>`. See the homepage for the pattern.

6. **All affiliate hrefs must go through `lib/stay22.ts`.** The `StayModule` component already does this internally. Do not construct Stay22 URLs by hand in page files.

---

## Verification before opening the PR

```bash
pnpm drift:check                   # exit 0 required — 0 info items remaining
npx tsc --noEmit                   # 0 errors required

# All 11 new routes must return 200
for r in \
  /destinations/thailand \
  /destinations/tokyo \
  /destinations/paris \
  /destinations/dubai \
  /best/tokyo-hotels \
  /best/paris-hotels \
  /compare/villa-vs-hotel \
  /compare/direct-vs-advisor-vs-portal \
  /privacy \
  /terms \
  /affiliate-disclosure; do
  printf '%s → %s\n' "$r" "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000$r")"
done
# Every route must print 200

# The 7 Phase 5a routes must still return 200 (regression check)
for r in / /start-planning /concierge /desks/hotel /desks/family /desks/safari /desks/asia; do
  printf '%s → %s\n' "$r" "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000$r")"
done
```

After all checks pass, run `pnpm drift:check` one final time — it should now show **0 info** (all 18 routes exist).

---

## Reference files (read these first)

1. [CLAUDE.md](../CLAUDE.md) — zero-drift policy + stop conditions
2. [docs/figma/source/docs/ROUTE_TO_TEMPLATE_MAP.md](figma/source/docs/ROUTE_TO_TEMPLATE_MAP.md) — authoritative route ↔ component spines
3. [docs/figma/source/docs/PAGE_ARCHETYPE_SPECS.md](figma/source/docs/PAGE_ARCHETYPE_SPECS.md) — archetype rules (destination, best-of, compare, legal)
4. [src/data/destinations.ts](../src/data/destinations.ts) — static destination data (all 4 cities)
5. [src/types/destination.ts](../src/types/destination.ts) — `DestinationConfig` type
6. [src/app/(site)/page.tsx](../src/app/(site)/page.tsx) — canonical Payload-with-fallback pattern
7. [src/app/(site)/desks/hotel/page.tsx](../src/app/(site)/desks/hotel/page.tsx) — simplest route pattern to copy

---

## End-of-session protocol

After Bruce replies "approved and merged" to your PR:

```bash
git checkout main && git pull
git tag phase-5b-pages-green main
git push origin phase-5b-pages-green
pnpm drift:check        # must exit 0 — 0 info items (all 18 routes exist)
```

Then rewrite **this file** for Phase 6 (Haiku 4.5 — content & CMS seeding).

The chain: 5b (Haiku) → **6 (Haiku)** → 7 (Sonnet) → 8 (Sonnet) → 9 (Opus).

---

## What NOT to do

- Do **not** build any route outside the 11 listed above — all others are built or out of scope
- Do **not** create new components — all 17 are built and frozen
- Do **not** modify any file in `src/components/`, `src/styles/`, `src/payload/`, `src/collections/`, `src/globals/`, `src/migrations/`, `src/blocks/`, `src/fields/`, `src/access/`
- Do **not** use dynamic `[slug]` segments — every route is a discrete folder
- Do **not** construct a Stay22 URL outside `lib/stay22.ts`
- Do **not** import a font outside `src/styles/fonts.css`
- Do **not** skip `pnpm drift:check` at session start or session end
