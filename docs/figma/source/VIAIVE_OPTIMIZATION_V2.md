# VIAIVE Second-Pass Optimization Result

> Codex-style handoff. Repository context: Figma Make project (Vite + React + Tailwind v4). Implementation target stack: Payload CMS · Payload Auth · Supabase Postgres · Cloudflare R2 · Doppler · Playwright · GitHub. Verified vs. assumed facts are marked inline.

---

## Revenue Thesis

VIAIVE launches as a **luxury travel decision-and-intake engine**, not an editorial encyclopedia. Phase 1 ships six Payload-editable pages whose only job is to convert high-intent traffic into one of four measurable next steps:

1. **Concierge brief submission** (highest LTV — six- and seven-figure trips)
2. **Stay22 / hotel-affiliate click** (immediate, attributable revenue)
3. **Email capture** (owned audience compounding)
4. **Internal click into a money page** (best-of, compare, destination)

Editorial volume is a long-term moat, not a launch lever. Every Phase 1 page must prove a revenue path before Phase 2 ships. If a page cannot name its conversion goal in one sentence, it does not ship in Phase 1.

**Assumption (mark unverified):** Stay22 has been signed and is ready for activation. Other affiliate networks (Booking.com Partner, Plum Guide, Virtuoso Voyager Club referrals, Marriott Luminous) are scaffolded as inactive placeholders in Payload.

---

## What To Keep From Original Plan

| Keep | Why |
|---|---|
| Five-Desk service model (Hotel · Family · Safari · Asia · Concierge) | Real positioning differentiator vs. OTA / agency. Already brand-aligned. |
| Editorial brand voice — Fraunces serif + restrained ink palette | High-AOV audience signals trust through restraint. Don't soften it. |
| The Viaive Standard methodology page (`/standard`) | Trust artifact for both GEO and human readers; cited by FAQ + compare pages. |
| Atlas mosaic and field-guide system | The internal-linking spine for SEO. Build it slowly. |
| Preferred-partner trust bar (Four Seasons Preferred, Virtuoso, Belmond Bellini, etc.) | Verified, defensible proof. Keep above the fold. |
| FAQ block with Schema.org markup | Direct GEO / AI-Overview surface. Already implemented. |
| Six-disclaimer legal footer pattern | Compliance-correct for medical / financial / affiliate territory. |
| Long-term 131-page route map | Use as content inventory + internal-link target list — not launch order. |

---

## What To Change

| From | To | Reason |
|---|---|---|
| `/desks/concierge` | `/concierge` (canonical) | Shorter, memorable, stronger CTA token. Old slug 301s. |
| `/desks/asia-intelligence` | `/desks/asia` | Cleaner; "Asia Intelligence Desk" stays as H1 + meta title. |
| `/collections/best-luxury-hotels-{city}` | `/best/{city}-hotels` | Higher-volume query pattern; clearer user intent; better CTR. |
| `/guides/*` (for decision pages) | `/compare/*` | Splits *editorial* guides from *decision* guides — different intent, different conversion path. |
| "Start a private brief" as primary CTA | **"Start Planning"** as primary CTA | "Brief" reads as final step; "Start Planning" lowers psychological cost of first click. Keep "Begin a private brief" as secondary CTA on `/concierge`. |
| Hero intent chips as decoration | Hero intent chips as a **first-class Payload-editable Intent Router section** | Each chip routes to a hidden home variant or pre-filtered concierge intake — measurable. |
| Single homepage variant | One canonical `/` with **server-side intent overlay**; A/B variants `/h/editorial` and `/h/advisor` deferred to Phase 3 | Ship one strong home first; instrument; then split-test. |
| Atlas without monetization | Atlas tiles **plus** a Stay-module embed on each destination page | Atlas drives discovery; destination pages monetize. |
| No email capture | **Inline email capture** in footer + post-FAQ + post-Brief thank-you (`/concierge/thanks`) | Owned audience is non-negotiable for solo-founder ops. |

---

## What To Cut From Launch

Defer entirely from Phase 1:

- All 7 `/regions/*` hubs — Phase 4
- 22 of 27 `/destinations/*` pages — keep only Tokyo, Paris, Thailand, Dubai, Maldives for Phases 1–2
- All `/account/*` and paywall routes (Polar Protocol, Intelligence Reports) — Phase 5+
- Homepage A/B variants `/h/editorial`, `/h/advisor`, `/h/destinations-editorial` — Phase 3
- `/honeymoons`, `/villa-stays`, `/wellness-travel`, `/luxury-cruises`, `/luxury-yacht-charters`, `/private-charter`, `/luxury-ski-travel`, `/luxury-travel-planning` as standalone routes — Phase 3 (converted into `/compare/*` or `/guides/*` instead)
- The 26-piece editorial intelligence archive — Phase 4
- Collections (`/collections/*`) — Phase 4 (replaced by `/best/*` in Phase 3)

**Rule:** if a page does not have a Stay22 module, a concierge CTA, an email capture, OR a direct link to a page that does — it does not ship in Phases 1–3.

---

## What To Add

1. **`/start-planning`** — a lighter-weight intake than `/concierge`. Three-question wizard (intent · dates · email). Goal: maximize top-of-funnel capture. Routes to `/concierge` for full brief.
2. **`/concierge/thanks`** — post-submission page with: confirmation, advisor name, ETA, three featured destination tiles, email capture, Stay22 "while you wait" module.
3. **Stay22 embed block** (`stay22EmbedBlock`) — Payload-managed; appears on destinations + best-of pages.
4. **Inline email capture component** — three placements: footer, post-FAQ, thank-you page. Single field, Schema.org `NewsletterAction`.
5. **`/compare/villa-vs-hotel`**, **`/compare/direct-vs-advisor-vs-portal`**, **`/compare/suite-vs-villa-vs-residence`** — Phase 3 decision pages.
6. **`/best/tokyo-hotels`**, **`/best/paris-hotels`**, **`/best/maldives-resorts`** — Phase 3 affiliate money pages.
7. **GEO answer summary field** on every page (200-char editable AI-Overview block, surfaced as both JSON-LD `description` and an above-the-fold blurb on the page itself).
8. **`reviewStatus` workflow** — Bruce only sees `readyForReview` queue in Payload admin.
9. **`qaSnapshots` collection** — stores Playwright desktop/mobile screenshots per route, per deploy.
10. **`affiliateClicks` table** — server-logged click events with route, slot, partner, anonymized session.

---

## Revenue-First Route Priority

### Phase 1 — CMS + Design Revenue Proof (6 pages)

```
/                       homepage          singleton    Concierge CTA + intent router
/desks/hotel            serviceDesks      collection   Hotel inquiry + Stay22
/desks/family           serviceDesks      collection   Family brief
/desks/safari           serviceDesks      collection   Safari brief
/desks/asia             serviceDesks      collection   Asia brief + Tokyo internal link
/concierge              forms             singleton    Full intake form + thanks
```

### Phase 2 — Intake + High-Intent SEO (8 pages)

```
/start-planning                 lightweight intake wizard
/destinations/thailand          destinations + Stay22
/destinations/tokyo             destinations + Stay22
/destinations/paris             destinations + Stay22
/destinations/dubai             destinations + Stay22
/privacy                        legal
/terms                          legal
/affiliate-disclosure           legal (Stay22 disclosure live)
```

### Phase 3 — Money Pages (11 pages)

```
/best/tokyo-hotels              hotels collection rollup
/best/paris-hotels
/best/maldives-resorts
/compare/villa-vs-hotel         decision guide
/compare/direct-vs-advisor-vs-portal
/compare/suite-vs-villa-vs-residence
/guides/private-air-charter
/guides/yacht-charter
/guides/honeymoon
/guides/villa-stays
/guides/wellness-planning
```

### Phase 4 — Authority

Regional hubs (7), remaining destinations (22), editorial archive (26), collections, remaining specialty guides.

### Phase 5+ — Paywall / Account

`/account/library`, `/account/checkout/polar-protocol`, `/account/intelligence-reports/*`.

---

## Full Long-Term Route Architecture

The full 131-page architecture from the original brief is **preserved verbatim as the long-term content inventory and internal-linking target map**. It is not deleted, not re-prioritized, not re-slugged beyond the canonical decisions in Section 6 of the source prompt. Reference: `viaive_route_inventory_v1.json` (to be generated from Payload `redirects` + `taxonomy` collections on Phase 4 expansion).

---

## Payload CMS Field Requirements

### Collections

| Collection | Auth | Purpose | Phase |
|---|---|---|---|
| `homepage` | singleton | Hero + intent router + featured | 1 |
| `pages` | admin | Generic static (about, why-viaive, standard, legal) | 1–2 |
| `serviceDesks` | admin | The five desks | 1 |
| `destinations` | admin | Field guides per place | 2–4 |
| `articles` | admin | Editorial + decision guides | 3–4 |
| `hotels` | admin | Property database; powers best-of rollups | 3 |
| `affiliatePartners` | admin | Stay22 + future networks | 1 |
| `affiliateOffers` | admin | Specific deals/properties | 1 |
| `affiliatePlacements` | admin | Where a partner/offer appears | 1 |
| `affiliateClicks` | system | Click event log | 1 |
| `media` | admin | R2-backed binaries, metadata in Postgres | 1 |
| `forms` | admin | Form schemas (concierge, start-planning, email) | 1 |
| `leads` | restricted | Form submissions | 1 |
| `redirects` | admin | 301 map (old slug → canonical) | 1 |
| `taxonomy` | admin | Intent tags, regions, trip types | 1 |
| `qaSnapshots` | system | Playwright screenshots | 1 |

### Globals

`siteSettings` · `navigation` · `affiliateSettings` · `seoGeoSettings` · `themeSettings`

### Shared Field Groups (Payload blocks)

```ts
seo:            { metaTitle, metaDescription, canonical, robots, ogImage }
geo:            { answerSummary (200 char), faqEntries[], schemaType }
primaryCTA:     { label, href, intent, analyticsId }
secondaryCTA:   { label, href, analyticsId }
affiliateModules: relationship → affiliatePlacements (multi)
internalLinks:  array of { label, href, rationale }
reviewStatus:   enum
mediaRights:    { credit, license, sourceUrl, expiresAt }
```

### Review Status Enum

```
draft → staging → readyForReview → approved → live → archived
```

Bruce queue = `where: { reviewStatus: { equals: 'readyForReview' } }` only.

---

## Figma Make / Stitch Required Files

### Markdown (12)

```
DESIGN_SYSTEM.md
COMPONENT_LIBRARY.md
PAGE_ARCHETYPE_SPECS.md
ROUTE_TO_TEMPLATE_MAP.md
CMS_FIELD_MAPPING.md
RESPONSIVE_BEHAVIOR.md
IMAGE_ASSET_DIRECTION.md
INTERACTION_MOTION_SPEC.md
SEO_GEO_CONTENT_BLOCK_SPEC.md
AFFILIATE_MODULE_DESIGN_SPEC.md
ACCESSIBILITY_SPEC.md
IMPLEMENTATION_HANDOFF.md
```

### JSON (5)

```
design-tokens.json    colors, spacing, type ramp, motion easings
components.json       component name → props → routes used → Payload mapping
routes.json           every route → archetype → Payload collection → CTA → metric
cms-fields.json       Payload schema definitions per collection
assets-manifest.json  R2 asset paths → media collection IDs → routes referenced
```

### Visual (per Phase 1 page)

- Raw HTML/CSS export
- `screen-desktop.png` (1440 wide)
- `screen-mobile.png` (390 wide)
- Component-state screenshots (default · hover · focus · empty · error · loading)

### Per-Route Spec Schema (Figma Make must return this for every route)

```
route, archetype, businessGoal, userIntent, seoRole, geoRole,
payloadCollection, payloadFields[], components[], sectionOrder[],
primaryCTA, secondaryCTA, affiliateEligibility,
mobileNotes, internalLinkTargets[], imageRequirements[],
conversionMetric, reviewStatusDefault
```

### Per-Component Spec Schema

```
name, visualPurpose, props[], payloadFieldMap{},
desktopBehavior, mobileBehavior,
states{ default, hover, focus, active, disabled, empty, error, loading },
a11yNotes, routesUsedOn[]
```

---

## SEO/GEO Requirements

### Per-page mandatory fields (Payload `seo` + `geo` blocks)

| Field | Storage | Render |
|---|---|---|
| H1 | page body | visible |
| `metaTitle` | seo block | `<title>` |
| `metaDescription` | seo block | `<meta>` |
| `canonical` | seo block | `<link rel=canonical>` |
| `robots` | seo block | `<meta name=robots>` |
| `schemaType` | seo block | JSON-LD |
| `geoAnswerSummary` (200 char) | geo block | JSON-LD `description` + above-fold blurb |
| `faqEntries[]` | geo block | rendered FAQ + `FAQPage` JSON-LD |
| `internalLinks[]` | shared | inline + footer rail |
| `lastReviewedAt` | shared | byline / footer |
| `author` (relation → editors) | shared | byline |

### GEO answer pattern per archetype

| Archetype | 200-char answer pattern |
|---|---|
| Homepage | "VIAIVE is an editor-led luxury travel advisory for high-AOV travelers planning hotels, multi-gen trips, safari, and Asia journeys. Used when curation matters more than booking." |
| Service Desk | "VIAIVE's {desk} desk handles {trip type} planning with audited properties, preferred-partner rates, and named-relationship perks. Used when {scenario}." |
| Destination | "Luxury travelers stay at {3 properties} in {place}, visit between {months}, and plan {duration} ahead. VIAIVE handles placement and perks." |
| Best-Of | "The {N} best {category} for {profile} in {place}: {top 3}. Each audited against the Viaive Standard." |
| Compare | "Choose {option A} when {scenario}; choose {option B} when {scenario}. The cost difference is roughly {range}." |
| Trust | "VIAIVE is an independent editorial advisory with verified partner status at {programs}. Compensated by program tiers, not markup." |

### Site-wide schema

`Organization` + `TravelAgency` in `<head>` global. `BreadcrumbList` per page. `FAQPage` where FAQs present. `Article` on guides. `LocalBusiness` not used (advisory, not retail).

---

## Affiliate / Stay22 Requirements

### Storage

```
Doppler  →  STAY22_API_KEY, STAY22_PARTNER_ID
Payload  →  affiliatePartners.stay22 (visible config: enabled, default placement strategy)
Payload  →  affiliateOffers (curated picks per destination)
Payload  →  affiliatePlacements (page-level slot assignment)
Postgres →  affiliateClicks (event log)
R2       →  affiliate-asset images (logos, badges)
```

### Required Payload blocks (rendered in design)

| Block | Where it appears | Phase 1 visible? |
|---|---|---|
| `stay22EmbedBlock` | destinations, best-of, concierge/thanks | Phase 2 live |
| `affiliateModuleBlock` | sidebar / inline on guides | Phase 3 |
| `hotelAffiliateCardBlock` | best-of grids | Phase 3 |
| `travelResourceCardBlock` | guides (eSIM, lounge access, insurance) | Phase 3 |
| `affiliateDisclosureBlock` | top of any page with affiliate content | All phases |
| `inactiveAffiliatePlaceholder` | shows admin-only "configure partner" CTA | Phase 1 |

### Rules (non-negotiable)

- `rel="sponsored nofollow"` on every affiliate link
- Visible disclosure block above any page section with affiliate revenue
- No affiliate links inside rich-text body — only in named placement slots
- Pages render cleanly if no placement is configured (the slot collapses)
- `affiliateClicks` logged server-side via a `/api/aff/click` redirector with anonymized session ID

---

## Design System Requirements

### Tokens (`design-tokens.json`)

```
color.ink.900            #0b0b0c    surface dark
color.ink.700            #1a1a1a    body
color.paper.50           #ffffff
color.paper.100          #f6f3ee    warm off-white (editorial surface)
color.metal.500          #c8a96a    accent gold — used sparingly
color.metal.300          #e8c98a    accent gold hover
color.line.10            rgba(0,0,0,0.06)
color.line.dark.10       rgba(255,255,255,0.10)

type.serif               "Fraunces", serif         display + headlines + pull-quotes
type.sans                "Inter", system-ui         body + UI

scale.h1                 clamp(44px, 6.5vw, 92px)  /  line-height 0.98  /  tracking -0.02em
scale.h2                 clamp(36px, 4.4vw, 60px)  /  line-height 1.02
scale.h3                 32px
scale.eyebrow            11px / tracking 0.32em / uppercase
scale.body               17px / line-height 1.55
scale.small              13px

space.gutter             24 / 48 / 96 (mobile · tablet · desktop)
space.section.y          112px desktop · 64px mobile

motion.ease.editorial    cubic-bezier(0.22, 1, 0.36, 1)
motion.duration.image    1200ms
motion.duration.ui       300ms
```

### Principles

- **Editorial spacing** — 96px section padding desktop, never less than 56px mobile
- **No gradient walls** — gradients only as image overlays for text legibility
- **One accent** — `metal.500` gold; never used on body text, never used for large fills
- **Type does the work** — Fraunces italics for emotional emphasis, never bold for it
- **Imagery is the brand** — every hero/atlas image must be cinematic; if it could appear on a budget travel blog, replace it

---

## Component Library Requirements

| Component | Phase 1 | Payload-bound |
|---|---|---|
| `Nav` (sticky, scroll-aware) | ✓ | `globals.navigation` |
| `Hero` (image + headline + dek + 2 CTAs + intent chips) | ✓ | `homepage.hero` |
| `IntentRouter` (4 cards routing to filtered intake) | ✓ | `homepage.intentRouter` |
| `TrustBar` (partner program logos/text) | ✓ | `globals.affiliateSettings.partnerPrograms` |
| `DeskCard` | ✓ | `serviceDesks` |
| `DeskGrid` | ✓ | `homepage.featuredDesks` |
| `ProcessSteps` (Brief → Audit → Place) | ✓ | `homepage.processSteps` |
| `AtlasMosaic` | ✓ | `homepage.featuredDestinations` |
| `StandardPillars` (4-pillar grid) | ✓ | `pages.standard.pillars` |
| `EditorialCardGrid` | ✓ | `homepage.featuredGuides` |
| `Stat` + `StatGrid` | ✓ | `homepage.stats` |
| `QuoteCard` | ✓ | `homepage.testimonials` |
| `BriefWizard` (multi-step form) | ✓ | `forms.concierge` |
| `Stay22EmbedBlock` | Phase 2 | `affiliatePlacements` |
| `EmailCapture` (inline + footer) | ✓ | `forms.newsletter` |
| `FAQ` (Schema.org-marked) | ✓ | `pages.*.geo.faqEntries` |
| `AffiliateDisclosure` | ✓ | `globals.affiliateSettings.disclosure` |
| `Footer` (full IA + legal) | ✓ | `globals.navigation.footer` |
| `BreadcrumbBar` | Phase 2 | derived |

Each component ships with: default · hover · focus · active · disabled · empty · error · loading state and a documented prop interface.

---

## Homepage Requirements

```
Collection:  homepage   (singleton)
Route:       /
Priority:    Phase 1
```

### Section order (top → bottom)

1. **Hero** — image, headline, dek, primary CTA ("Start Planning"), secondary CTA ("Read the Standard"), intent chips
2. **TrustBar** — preferred-partner programs
3. **IntentRouter** — 4 large intent cards (Family · Hotel · Safari · Asia)
4. **DeskGrid** — five desks
5. **ProcessSteps** — 3-step Brief → Audit → Place
6. **AtlasMosaic** — featured destinations (Phase 2: links resolve to real pages)
7. **StandardPillars** — Viaive Standard preview, link to `/standard`
8. **EditorialCardGrid** — featured field guides
9. **StayModule** — Stay22 placeholder slot, Phase 2 live
10. **Proof** — stat grid + testimonials
11. **BriefWizard** — embedded mini intake (3 steps)
12. **EmailCapture** — inline
13. **FAQ** — Schema.org FAQ
14. **Footer**

### Payload-editable fields

`heroHeadline · heroDek · heroImage · primaryCTA · secondaryCTA · intentCards[] · featuredDesks[] · featuredDestinations[] · featuredGuides[] · stayModulePlacement · trustPartners[] · testimonials[] · stats[] · faqEntries[] · seoBlock · geoBlock · affiliateDisclosureTeaser · reviewStatus`

### Conversion goals (instrumented)

`startPlanningClicks · conciergeClicks · hotelDeskClicks · destinationClicks · emailSignups · stay22Clicks · intentChipClicks`

---

## Launch Phases

| Phase | Scope | Duration | Exit Criteria |
|---|---|---|---|
| **1** | 6 pages, Payload up, Stay22 placeholder, Concierge live, Playwright pass | Weeks 1–3 | First concierge submission received and acted on |
| **2** | 8 SEO + legal pages, Stay22 active, email capture live | Weeks 4–6 | First Stay22 click + first email subscriber |
| **3** | 11 money pages (best-of, compare, guides) | Weeks 7–12 | First affiliate revenue from a `/best/*` page |
| **4** | Regional hubs, remaining destinations, editorial archive | Months 4–6 | 10k organic monthly sessions; 25 indexed pages |
| **5+** | Account, paywall, Polar Protocol, Intelligence Reports | Month 6+ | Phase 3 revenue exceeds $5k MRR for 2 consecutive months |

---

## 14-Day Revenue Test Plan

| Day | Action | Owner | Success Signal |
|---|---|---|---|
| 1 | Deploy Phase 1 homepage + 5 desks to staging | Codex | All 6 routes return 200, Lighthouse ≥ 90 |
| 2 | Wire Payload `homepage` singleton, seed content | Bruce + Codex | Bruce edits hero headline in admin and sees preview |
| 3 | Playwright captures desktop + mobile snapshots | CI | Snapshots stored in `qaSnapshots` |
| 4 | Concierge form → Supabase `leads` | Codex | Test submission lands in admin |
| 5 | Email capture → `leads` with type=email | Codex | Test signup lands |
| 6 | Stay22 placeholder ships with disclosure | Codex | Renders cleanly, disclosure visible |
| 7 | Soft launch — paid traffic test: $200 Meta to `/concierge` | Bruce | ≥ 2 concierge submissions OR pivot copy |
| 8 | Soft launch — $100 Google to `/desks/hotel` | Bruce | ≥ 1 hotel-desk inquiry |
| 9 | Activate Stay22 on a single Phase 2 destination page (`/destinations/tokyo`) | Codex | First Stay22 click logged |
| 10 | Email capture push — LinkedIn post to founder network | Bruce | ≥ 10 email signups |
| 11 | Playwright re-run; review `qaSnapshots` diff | CI | No visual regressions |
| 12 | First QA/analytics review — measure conversion rates by route | Bruce | Identify lowest-converting Phase 1 page |
| 13 | Iterate the worst page (copy / CTA / image) | Bruce | Re-deploy via `readyForReview` |
| 14 | Decision gate: ship Phase 2 or fix Phase 1 | Bruce | Documented call in `adr-generator` log |

**Kill criteria:** if Day 14 shows zero concierge submissions AND zero Stay22 clicks, do not ship Phase 2 — revisit positioning before adding inventory.

---

## Metrics Dashboard

### Revenue indicators (separate channel)

```
startPlanningClicks                   /, /desks/*
conciergeFormStarts                   /concierge, /start-planning
conciergeFormCompletions              /concierge
stay22Clicks                          destinations, best-of, thanks
affiliateCTR_byPage                   any page with placement
emailSignups_byRoute                  footer, post-FAQ, thanks
destinationPage_CTAClickRate          /destinations/*
bestOfPage_AffiliateClickRate         /best/*
compareGuide_BriefStartRate           /compare/*
returningClientRate_24mo              CRM-linked
```

### Vanity (kept separate, never headlined)

```
pageviews, sessionDuration, socialEngagement, totalIndexedPages,
editorialWordCount, AImentionsWithoutReferral
```

### Instrumentation contract

Every CTA has `data-analytics-id="<route>:<slot>:<intent>"`. Server-side affiliate redirector logs to `affiliateClicks` before 302. Form submissions write to `leads` with `route`, `referrer`, `intent`, `utm_*`.

---

## Codex Implementation Handoff

### Repository

New clean GitHub repo. Recommended structure:

```
apps/
  web/                   Next.js (App Router) — public site
  cms/                   Payload CMS — admin + REST/GraphQL
packages/
  ui/                    shared components (matches Figma Make output)
  tokens/                design-tokens.json + Tailwind preset
  schema/                Payload collection definitions (typed)
infra/
  doppler/               doppler.yaml
  r2/                    bucket bootstrap script
  playwright/            specs + snapshots
.github/workflows/       ci.yml (lint, type, test, e2e, snapshot diff)
```

### Bootstrap order (1 week)

1. New Supabase project — `viaive-prod`. Region: `us-east-1` (or nearest to Bruce).
2. New Cloudflare R2 bucket — `viaive-media`. Public read via signed URLs only.
3. New Doppler project — `viaive`. Configs: `dev`, `staging`, `prod`. Seed: `DATABASE_URL`, `PAYLOAD_SECRET`, `R2_ACCESS_KEY_ID`, `R2_SECRET`, `STAY22_API_KEY`, `STAY22_PARTNER_ID`, `RESEND_API_KEY`.
4. Payload — install with `payload-postgres-adapter`, point at Supabase. Define 16 collections + 5 globals per Section 10.
5. Web — Next 15 / App Router. Render each route from Payload by `slug`. Preview mode wired via Payload draft API.
6. Playwright — one spec per Phase 1 route: visit, screenshot desktop + mobile, save to `qaSnapshots`.
7. CI — on every PR: type-check, lint, Playwright snapshot diff, Payload schema migration check.

### Workflow contract

```
1. Bruce or Codex edits content in Payload admin
2. Marks reviewStatus = readyForReview
3. CI runs Playwright against staging URL with that draft
4. qaSnapshots uploaded; visual diff posted to PR/Linear
5. Bruce reviews in Payload UI (preview tab) + visual diff
6. Bruce sets reviewStatus = approved
7. Webhook → deploy → production
8. Webhook → set reviewStatus = live
```

### Residual risk (verified vs. assumed)

| Item | Status |
|---|---|
| Stay22 contract signed, partner ID issued | **Unverified — confirm before Phase 2** |
| Doppler / R2 / Supabase accounts exist on Bruce's billing | **Unverified — confirm before bootstrap** |
| Payload + Postgres production scale (≤ 10k pageviews/day Phase 1) | Acceptable on Supabase free/pro tier |
| Affiliate disclosure language reviewed by counsel | **Unverified — required before Phase 2 launch** |
| Brand asset rights (preferred-partner logos in TrustBar) | **Unverified — text-only fallback is current implementation; logos require permission** |

---

**End of second-pass plan.** Next action: Bruce confirms the five "Unverified" items above, then Codex begins Phase 1 bootstrap.
