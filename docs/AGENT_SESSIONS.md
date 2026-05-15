# Viaive — Claude Code Mobile Session Launcher

## How this works

Each phase of the Viaive build runs as a separate Claude Code session.
You start each one from the **+** button in the Claude Code mobile app.

The session status in the app follows this lifecycle:

```
"Needs input"  ← agent asks you to confirm scope before starting
"Connected"    ← agent is actively building
"Needs input"  ← agent needs approval to push to GitHub
"Needs input"  ← agent asks you to review the PR
"Connected"    ← agent tags the release after you approve
idle           ← session complete, ready to close
```

You never need to be at your computer. Every approval is on the phone.

---

## How to start a session (step by step)

1. Open the Claude Code mobile app
2. Tap **+** (top right)
3. Select the `New-Viaive-Project` repo
4. Select the **model** listed above the prompt block (critical — see table below)
5. Copy the **entire prompt block** for the phase (everything inside the code fence)
6. Paste it and send
7. You'll get a notification when it needs your input

---

## Model selection guide

Match the model to the work. Wrong model = wasted credits or missed edge cases.

| Phase | Model | Why |
|---|---|---|
| 5a — Pages (architecture) | **Sonnet 4.6** | Novel decisions: global data wiring, page archetypes, dynamic routes |
| 5b — Pages (pattern routes) | **Haiku 4.5** | Pure pattern repetition — no new decisions needed |
| 6 — Content seeding | **Haiku 4.5** | Mechanical: read schema, create records, repeat |
| 7 — Integrations | **Sonnet 4.6** | Multi-service API wiring with real failure modes |
| 8 — SEO & Performance | **Sonnet 4.6** | Analytical audit + structured data decisions |
| 9 — Launch QA | **Opus 4.7** | Final gate — requires judgment, not just execution |

---

## Permission setup (already configured)

`.claude/settings.json` in this repo is pre-configured so that:
- File reading, writing, editing → **auto-approved** (no notification)
- TypeScript checks, installs, curl → **auto-approved**
- `git push`, `gh pr create` → **always asks** (you'll see "Needs input")

This means you only get interrupted when something is about to go to GitHub.

---

## Phase 5a — Pages & Routing (Architecture + Unique Routes)

**Model: Sonnet 4.6**

This session establishes the data-wiring pattern and builds the 7 structurally
unique routes. Phase 5b will stamp out the remaining 8 using these patterns.

Copy this entire block:

```
Viaive · Phase 5a · Pages & Routing — Architecture

Read CLAUDE.md before anything else — it is the single source of truth for
this build.

Then confirm the previous phase tag exists:
  git tag | grep phase-4-components-green

If the tag does not exist, stop immediately and tell me.

If it exists, ask me this exact question before writing any code:
"Phase 4 tag confirmed. I'm about to wire Nav/Footer to Payload globals and
build the 7 architecturally unique routes. Branch will be phase-5a-pages-arch.
Reply 'go' to start or 'wait' to review anything first."

Wait for my reply before touching any files.

---

SCOPE (only after I reply 'go'):

Setup:
  git checkout main && git pull
  git checkout -b phase-5a-pages-arch
  pnpm dev:doppler

Read these files before creating any page:
  docs/figma/source/docs/PAGE_ARCHETYPE_SPECS.md
  docs/figma/source/docs/ROUTE_TO_TEMPLATE_MAP.md
  docs/figma/source/docs/RESPONSIVE_BEHAVIOR.md

TASK 1 — Wire src/app/(site)/layout.tsx (highest priority):
  Import Nav and Footer from src/components/
  Fetch 'navigation' global via Payload local API (getPayload + findGlobal)
  Fetch 'footer' global via Payload local API
  Pass fetched data as props to Nav and Footer
  Include static fallbacks for when globals are empty (first-run safe)
  Verify: curl localhost:3000 → 200, curl localhost:3000/admin → 200

TASK 2 — Build these 7 routes under src/app/(site)/:
  /start-planning          → Intake archetype (brief request form, writes to briefs collection)
  /concierge               → Intake archetype (same pattern as /start-planning)
  /about                   → Editorial archetype (establish the canonical editorial layout)
  /destinations            → Atlas index (list all destinations from Payload)
  /destinations/[slug]     → Destination flagship (most complex — Payload data fetch, full layout)
  /desks/[slug]            → Dynamic desk route (covers all 5 desk variants with one file)
  /privacy                 → Legal archetype (establish the canonical legal layout)

Rules for every page:
  - Server component only — no 'use client' unless the page requires a form
  - Fetch Payload data in the page, pass as props to components
  - Components must not fetch their own data
  - generateMetadata or export const metadata on every page
  - generateStaticParams on /destinations/[slug] and /desks/[slug] using seeded slugs:
      destinations: ['tokyo', 'maldives', 'bangkok']
      desks: ['hotel', 'family', 'safari', 'asia-intelligence', 'concierge']
  - curl each route after creation — must return 200
  - npx tsc --noEmit after every 2 routes — fix before continuing

Constraints:
  - Never put pages in root src/app/ — only src/app/(site)/
  - Never add routes under /api/ — Payload owns that namespace
  - Never modify src/components/, src/styles/, src/collections/, src/globals/
  - Import components from src/components/ — do not rewrite them

---

END GATE:
When all 7 routes pass and tsc is 0 errors:
1. Commit: "Phase 5a: (site)/layout wired, 7 unique route archetypes"
2. Push (this will ask for your approval — approve it)
3. Open PR targeting main (this will ask for your approval — approve it)
4. Then ask me this:

"PR #[N] is open: [URL]

Built:
• src/app/(site)/layout.tsx — Nav + Footer wired to Payload globals
• /start-planning — Intake archetype
• /concierge — Intake archetype
• /about — Editorial archetype
• /destinations — Atlas index
• /destinations/[slug] — Destination flagship with generateStaticParams
• /desks/[slug] — Dynamic desk with generateStaticParams
• /privacy — Legal archetype

Verified:
• TypeScript: 0 errors
• All 7 routes: 200
• /admin still works: 200
• Token scan: clean

Reply 'approved and merged' after you merge the PR."

Then wait. When I reply 'approved and merged':
  git checkout main && git pull
  git tag phase-5a-pages-green main
  git push origin phase-5a-pages-green

Then tell me Phase 5a is complete and Phase 5b is ready to start.
```

---

## Phase 5b — Pages & Routing (Pattern Routes)

**Model: Haiku 4.5**

Phase 5a must be merged and tagged `phase-5a-pages-green` before starting this.
These routes all follow patterns already established in 5a — no new decisions needed.

Copy this entire block:

```
Viaive · Phase 5b · Pages & Routing — Pattern Routes

Read CLAUDE.md before anything else.

Then confirm the previous phase tag exists:
  git tag | grep phase-5a-pages-green

If the tag does not exist, stop immediately and tell me.

If it exists, ask me this before writing any code:
"Phase 5a tag confirmed. I'm about to stamp out 8 remaining routes using
the patterns established in 5a. Branch will be phase-5b-pages-patterns.
Reply 'go' to start."

Wait for my reply before touching any files.

---

SCOPE (only after I reply 'go'):

Setup:
  git checkout main && git pull
  git checkout -b phase-5b-pages-patterns
  pnpm dev:doppler

First, read the 7 pages built in phase-5a to understand the established patterns:
  src/app/(site)/about/page.tsx        (Editorial archetype pattern)
  src/app/(site)/privacy/page.tsx      (Legal archetype pattern)
  src/app/(site)/destinations/page.tsx (Atlas index pattern)
  src/app/(site)/destinations/[slug]/page.tsx (Destination archetype pattern)

Then build these 8 routes by applying those patterns:
  /standard                → Editorial archetype (copy /about pattern)
  /why-book-with-viaive    → Editorial archetype (copy /about pattern)
  /regions/[slug]          → Atlas archetype (similar to /destinations/[slug])
  /guides                  → Editorial index (similar to /destinations index)
  /guides/[slug]           → Editorial archetype (copy /about pattern)
  /terms                   → Legal archetype (copy /privacy pattern exactly)
  /affiliate-disclosure    → Legal archetype (copy /privacy pattern exactly)

For /regions/[slug] generateStaticParams, use placeholder slugs: ['europe', 'southeast-asia', 'east-africa']
For /guides/[slug] generateStaticParams, use placeholder slugs: ['best-safari-camps', 'maldives-guide', 'tokyo-design-hotels']

Rules:
  - Server component only
  - generateMetadata on every page
  - curl each route after creation — must return 200
  - npx tsc --noEmit after every 2 routes — fix before continuing
  - Do not modify src/app/(site)/layout.tsx or any file from 5a
  - Do not modify src/components/, src/styles/, src/collections/, src/globals/

---

END GATE:
When all 8 routes pass and tsc is 0 errors:
1. Commit: "Phase 5b: 8 pattern routes — editorial, atlas, legal archetypes"
2. Push (this will ask for your approval — approve it)
3. Open PR targeting main (this will ask for your approval — approve it)
4. Then ask me this:

"PR #[N] is open: [URL]

Built:
• /standard — Editorial archetype
• /why-book-with-viaive — Editorial archetype
• /regions/[slug] — Atlas archetype with generateStaticParams
• /guides — Editorial index
• /guides/[slug] — Editorial archetype with generateStaticParams
• /terms — Legal archetype
• /affiliate-disclosure — Legal archetype

Total routes across 5a + 5b: 18 of 18

Verified:
• TypeScript: 0 errors
• All 8 routes: 200
• All 18 total routes: 200
• /admin still works: 200
• Token scan: clean

Reply 'approved and merged' after you merge the PR."

Then wait. When I reply 'approved and merged':
  git checkout main && git pull
  git tag phase-5b-pages-green main
  git push origin phase-5b-pages-green

Then tell me all 18 routes are live on main and Phase 6 is ready to start.
```

---

## Phase 6 — Content & CMS Seeding

**Model: Haiku 4.5** — purely mechanical, no architectural decisions.

Copy this entire block:

```
Viaive · Phase 6 · Content & CMS Seeding

Read CLAUDE.md before anything else.

Confirm the previous phase tag:
  git tag | grep phase-5b-pages-green

If the tag does not exist, stop and tell me.

If it exists, ask me this before starting:
"Phase 5b tag confirmed. I'm about to seed Payload globals and 3 destination
records (Tokyo, Maldives, Bangkok) plus 5 desk records.
No code changes — data population only via Payload local API scripts.
Reply 'go' to start."

Wait for my reply.

---

SCOPE (only after I reply 'go'):

Setup:
  git checkout main && git pull
  git checkout -b phase-6-content
  pnpm dev:doppler

Read before starting:
  docs/figma/source/docs/CMS_FIELD_MAPPING.md
  docs/figma/source/data/ (source content for seeding)

Tasks:
1. Write a seed script at scripts/seed-globals.ts that populates:
   - navigation global: brand, primaryLinks[], ctaLabel, ctaHref
   - footer global: columns[], legalLinks[], disclosure
   - newsletter global: title, lede, placeholder, consentText, successText
   - viaiveStandard global: intro, criteria[]
   - proof global: metrics[], quotes[]

2. Write a seed script at scripts/seed-content.ts that creates:
   - 3 destination documents: Tokyo, Maldives, Bangkok
   - 5 desk documents: hotel, family, safari, asia-intelligence, concierge
   Use docs/figma/source/data/ as the source of truth for content.

3. Run both scripts:
   pnpm tsx scripts/seed-globals.ts
   pnpm tsx scripts/seed-content.ts

4. Verify every seeded record renders on its route (200 + content visible in curl output)

Constraints:
- Scripts use Payload local API (getPayload + payload.create / payload.updateGlobal)
- Never modify src/components/, src/styles/, or any page files
- Media placeholder: use a valid Unsplash URL if R2 isn't set up yet

---

END GATE:
When seeding is done:
1. Commit all seed scripts: "Phase 6: content seed scripts + initial data"
2. Push (approval required — approve on phone)
3. Open PR targeting main (approval required)
4. Ask me:

"PR #[N] is open: [URL]

Seeded:
• Globals: navigation, footer, newsletter, viaiveStandard, proof
• Destinations: Tokyo, Maldives, Bangkok
• Desks: hotel, family, safari, asia-intelligence, concierge

Verified:
• /destinations/tokyo → 200 with content
• /destinations/maldives → 200 with content
• /desks/hotel → 200 with content
• TypeScript: 0 errors

Reply 'approved and merged' after merging."

When I reply:
  git checkout main && git pull
  git tag phase-6-content-green main
  git push origin phase-6-content-green

Tell me Phase 6 is complete.
```

---

## Phase 7 — Integrations

**Model: Sonnet 4.6** — multi-service API wiring with real failure modes.

Copy this entire block:

```
Viaive · Phase 7 · Integrations

Read CLAUDE.md before anything else.

Confirm the previous phase tag:
  git tag | grep phase-6-content-green

If it does not exist, stop and tell me.

If it exists, ask me:
"Phase 6 tag confirmed. I'm about to wire Stay22 affiliate embeds, verify
Brevo email capture end-to-end, and port NovaExitIntent.
Reply 'go' to start."

Wait for my reply.

---

SCOPE (only after I reply 'go'):

Setup:
  git checkout main && git pull
  git checkout -b phase-7-integrations
  pnpm dev:doppler

Read before starting:
  docs/figma/source/docs/AFFILIATE_MODULE_DESIGN_SPEC.md
  src/lib/stay22.ts (use it — never hand-write affiliate URLs)
  docs/figma/source/src/app/components/NovaExitIntent.tsx (source to port)

Tasks:
1. Wire Stay22 Spark embed into DestinationGuide sidebar
   - Use lib/stay22.ts to generate embed URL
   - Affiliate disclosure required on every Stay22 surface (see AFFILIATE_MODULE_DESIGN_SPEC)
   - rel="sponsored nofollow" on every affiliate anchor
   - Confirm with: grep -r 'sponsored' src/

2. Port NovaExitIntent from docs/figma/source/ to src/components/NovaExitIntent.tsx
   - 'use client' — triggered by mouseleave with clientY <= 0 after minDwellSec
   - sessionStorage["nova:fired"]="1" suppression (fires once per session)
   - Mobile: bottom sheet; Desktop: center modal with 12px stone shadow
   - Full a11y: role="dialog", aria-modal, focus trap, Esc dismisses
   - Add to homepage src/app/(site)/page.tsx

3. Test Brevo end-to-end (requires BREVO_API_KEY + BREVO_LIST_ID in Doppler):
   - Submit a real email to /newsletter/subscribe
   - Confirm it appears in the Brevo contact list
   - If keys not in Doppler, document what's needed and skip with a note

4. Verify R2 image URLs resolve on all seeded destination pages

Constraints:
- Never modify src/styles/ or src/collections/
- Use lib/stay22.ts — never construct Stay22 URLs manually

---

END GATE:
1. Commit: "Phase 7: Stay22 wired, NovaExitIntent ported, Brevo verified"
2. Push (approval required)
3. Open PR (approval required)
4. Ask me:

"PR #[N] is open: [URL]

Integrated:
• Stay22 Spark embed on all 3 destination pages
• Affiliate disclosure on every Stay22 surface
• rel='sponsored nofollow' on all affiliate anchors
• NovaExitIntent ported and wired to homepage
• Brevo: [tested / keys missing — needs Doppler config]

Verified:
• TypeScript: 0 errors
• /destinations/tokyo Stay22 embed present
• Nova exit intent fires on mouseleave, suppressed after first fire
• Affiliate grep: [count] anchors all carry rel=sponsored nofollow

Reply 'approved and merged' after merging."

When I reply:
  git checkout main && git pull
  git tag phase-7-integrations-green main
  git push origin phase-7-integrations-green

Tell me Phase 7 is complete.
```

---

## Phase 8 — SEO & Performance

**Model: Sonnet 4.6** — analytical audit + structured data decisions.

Copy this entire block:

```
Viaive · Phase 8 · SEO & Performance

Read CLAUDE.md before anything else.

Confirm the previous phase tag:
  git tag | grep phase-7-integrations-green

If it does not exist, stop and tell me.

If it exists, ask me:
"Phase 7 tag confirmed. I'm about to add JSON-LD schema, sitemap.xml,
robots.txt, and run Lighthouse on the homepage and a destination page.
Reply 'go' to start."

Wait for my reply.

---

SCOPE (only after I reply 'go'):

Setup:
  git checkout main && git pull
  git checkout -b phase-8-seo
  pnpm dev:doppler

Read before starting:
  docs/figma/source/docs/SEO_GEO_CONTENT_BLOCK_SPEC.md

Tasks:
1. Add Organization + TravelAgency JSON-LD to the homepage
2. Add TouristDestination + FAQPage JSON-LD to /destinations/[slug]
3. Add ItemList JSON-LD to /best/[slug] (if that route exists)
4. Generate sitemap.xml at src/app/sitemap.ts (Next.js 15 format)
5. Generate robots.txt at src/app/robots.ts
6. Add scroll-margin-top: 96px to all anchor-target sections (nav clearance)
7. Verify every page has a unique <title> and <meta description>
8. Run Lighthouse CLI on / and /destinations/tokyo — report scores

Acceptance gates (do not open PR until these pass):
  Lighthouse SEO >= 95
  Lighthouse a11y >= 95
  No missing alt text on any image

---

END GATE:
1. Commit: "Phase 8: JSON-LD schema, sitemap, robots, SEO metadata"
2. Push (approval required)
3. Open PR (approval required)
4. Ask me:

"PR #[N] is open: [URL]

SEO done:
• Organization + TravelAgency JSON-LD: homepage
• TouristDestination + FAQPage JSON-LD: all destination pages
• sitemap.xml: generated (routes listed below)
• robots.txt: deployed

Lighthouse scores:
  Homepage   — SEO: [score] | a11y: [score] | Performance: [score]
  Tokyo page — SEO: [score] | a11y: [score] | Performance: [score]

TypeScript: 0 errors

Reply 'approved and merged' after merging."

When I reply:
  git checkout main && git pull
  git tag phase-8-seo-green main
  git push origin phase-8-seo-green

Tell me Phase 8 is complete. Phase 9 (launch QA) is the final gate.
```

---

## Phase 9 — Launch QA (Final Gate)

**Model: Opus 4.7** — final gate, requires judgment not just execution.
Select it in the model picker before pasting the prompt.

Copy this entire block:

```
Viaive · Phase 9 · Launch QA

Read CLAUDE.md before anything else.

Confirm the previous phase tag:
  git tag | grep phase-8-seo-green

If it does not exist, stop and tell me.

If it exists, ask me:
"Phase 8 tag confirmed. I'm running the full launch QA gate.
This is the final check before production. I will not pass anything
that doesn't meet every acceptance criterion.
Reply 'go' to begin the audit."

Wait for my reply.

---

SCOPE (only after I reply 'go'):

Setup:
  git checkout main && git pull
  git checkout -b phase-9-qa
  pnpm dev:doppler

Run every check below. Record the result for each. Do not skip any.

GATE 1 — TypeScript
  npx tsc --noEmit
  Required: 0 errors

GATE 2 — Build
  pnpm build:doppler
  Required: succeeds, no errors, no warnings about missing env vars

GATE 3 — All 18 routes return 200
  Curl every route. List results. Any 404 or 500 is a blocker.

GATE 4 — Token compliance
  grep -r "border-radius\|blur(\|#ffffff\|#fff\b" src/app/(site)/ src/components/
  Required: 0 matches

GATE 5 — Affiliate compliance
  grep -r "stay22\|booking.com\|hotels.com" src/ --include="*.tsx" --include="*.ts"
  Every match must use lib/stay22.ts — no hand-written URLs
  Every Stay22 anchor must have rel="sponsored nofollow"

GATE 6 — Payload admin
  curl localhost:3000/admin → must return 200 with Payload admin HTML
  CSS isolation must hold — admin must not look broken

GATE 7 — NovaExitIntent
  Confirm sessionStorage suppression logic is present
  Confirm Esc key handler is present
  Confirm focus trap is present

GATE 8 — Brief form
  Submit a test brief at /concierge
  Confirm it writes to the briefs collection in Payload admin

GATE 9 — Image alt text
  Every <img> and Next.js <Image> must have a non-empty alt attribute
  grep -r 'alt=""' src/app/(site)/ src/components/ — 0 matches allowed
  (decorative images: alt="" is valid ONLY with role="presentation")

GATE 10 — Lighthouse (final)
  Run on: /, /destinations/tokyo, /concierge
  Required: SEO >= 95, a11y >= 95, Performance >= 85 mobile

---

After all gates pass, ask me:

"LAUNCH QA COMPLETE

Gate results:
  TypeScript:      PASS — 0 errors
  Build:           PASS
  18 routes:       PASS — all 200
  Token scan:      PASS — 0 violations
  Affiliate scan:  PASS — all anchors compliant
  Payload admin:   PASS
  NovaExitIntent:  PASS
  Brief form:      PASS
  Image alt text:  PASS
  Lighthouse /:    SEO [score] | a11y [score] | Perf [score]
  Lighthouse dest: SEO [score] | a11y [score] | Perf [score]

Viaive is ready for production deployment.

Reply 'go live' to deploy, or list any changes you want first."

If any gate fails, fix it before asking for the go-live reply.

When I reply 'go live':
  Confirm Vercel project is connected to main branch
  Confirm viaive.com DNS points to Vercel
  Tell me the production URL and what to check first.
```

---

## Phase status reference

| Phase | Model | Status | Start prompt title |
|---|---|---|---|
| 1–4 | — | ✅ Complete | — |
| 5a | Sonnet 4.6 | ⬜ Not started | `Viaive · Phase 5a · Pages & Routing — Architecture` |
| 5b | Haiku 4.5 | ⬜ Not started | `Viaive · Phase 5b · Pages & Routing — Pattern Routes` |
| 6 | Haiku 4.5 | ⬜ Not started | `Viaive · Phase 6 · Content & CMS Seeding` |
| 7 | Sonnet 4.6 | ⬜ Not started | `Viaive · Phase 7 · Integrations` |
| 8 | Sonnet 4.6 | ⬜ Not started | `Viaive · Phase 8 · SEO & Performance` |
| 9 | Opus 4.7 | ⬜ Not started | `Viaive · Phase 9 · Launch QA` |

Update the status column as you merge each PR and confirm the tag.
