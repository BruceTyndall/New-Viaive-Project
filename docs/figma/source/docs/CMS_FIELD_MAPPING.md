# Payload CMS Field Mapping

**Companion file:** `docs/cms-fields.json`
**Stack:** Payload CMS 3.x + Supabase Postgres + Cloudflare R2 (media)

Every component in the design system corresponds to a Payload **block**, **collection**, or **global**. Editors never touch HTML or code; they edit fields in Payload Admin and changes round-trip to the React app via the public REST/GraphQL endpoints.

---

## Collections

| Collection | Purpose | Routes consumed by |
|---|---|---|
| `pages` | Composable pages built from blocks | `/`, `/start-planning`, `/concierge` |
| `destinations` | Long-form destination guides | `/destinations/*`, embedded on `/` |
| `desks` | Service desk pages | `/desks/*` |
| `regions` | Regional hubs (Asia, Europe, etc.) | `/atlas`, internal nav |
| `bestOf` | Ranked comparison lists | `/best/*` |
| `compares` | Side-by-side decision pages | `/compare/*` |
| `posts` | Editorial / Field Notes | `/journal/*` |
| `legal` | Privacy, Terms, Affiliate Disclosure | `/privacy`, `/terms`, `/affiliate-disclosure` |
| `briefs` | Inbox for concierge intake (auth-protected) | submit target only |
| `media` | All images + assets stored in R2 | all |

## Globals

| Global | Purpose |
|---|---|
| `navigation` | Header brand + links + CTA |
| `footer` | 4-col sitemap + legal + disclosure + social |
| `viaiveStandard` | The 7-criterion audit (used on `/`, `/about/standard`) |
| `proof` | Lifetime metrics + 2 testimonials |
| `newsletter` | "The Quiet Letter" copy |
| `novaExitIntent` | Stay22 Nova exit-intent copy + dwell threshold |

## Shared Blocks

`HeroBlock`, `TrustBarBlock`, `IntentRouterBlock`, `DestinationsRailBlock`, `DestinationGuideBlock`, `StayModuleBlock`, `BriefBlock`, `EmailCaptureBlock`, `FAQBlock`, `StandardBlock`, `EditorialBlock`, `ProofBlock`.

Pages compose blocks via Payload's `blocks` field type, giving editors a visual page builder without coding.

---

## Key Editor Conventions

### `geoAnswer` (destinations, ≤55 words)
The first paragraph an AI Overview will quote. Must be a **direct, declarative answer** to "where to stay in [city] luxury?" — no marketing language, no questions, no lists. See `SEO_GEO_CONTENT_BLOCK_SPEC.md` for the answer pattern.

### `{{Hotel Name}}` markers (richText body)
Anywhere inside a destination's `sections[].body`, an editor can type `{{Aman Tokyo}}` and the renderer converts it to a Stay22 affiliate anchor with the correct `rel`, `data-analytics-id`, and deep-link URL. **Editors never paste affiliate URLs.**

### `reviewStatus` workflow
Every editorial collection (`pages`, `destinations`, `desks`, `bestOf`, `compares`, `posts`) carries:

```
draft → staging → readyForReview → approved → live → archived
```

Only `approved` and `live` records render in production. Payload access control hides anything below `staging` from public API.

### `seo` group
Available on every public collection. Falls back to sensible defaults derived from `title`, `geoAnswer`, and `cover` when fields are blank.

### `lastReviewed` (destinations)
Surfaced in the UI ("Last audited: 2026-05-14") and feeds AI Overviews. Editors must update this whenever they touch hotel data, even for typo fixes — freshness is a GEO ranking signal.

---

## Access Control

| Role | Pages | Destinations | Desks | BestOf | Compares | Posts | Legal | Briefs | Media | Globals |
|---|---|---|---|---|---|---|---|---|---|---|
| Admin | CRUD | CRUD | CRUD | CRUD | CRUD | CRUD | CRUD | CRU | CRUD | CRUD |
| Editor | CRU | CRU | CRU | CRU | CRU | CRU | R | R | CRU | R |
| Author | R | R | R | R | R | CRU(own) | R | — | CRU | R |
| Public (unauth) | R(live) | R(live) | R(live) | R(live) | R(live) | R(live) | R | C only | R(live) | R |

---

## Stay22 Storage Contract

Stay22 affiliate config is **not** stored in CMS fields editors touch. It lives in:

- `process.env.STAY22_LMA_ID` (Doppler-managed)
- `process.env.STAY22_AID` (Doppler-managed)
- `src/app/lib/stay22.ts` exposes `stay22DeepLink(hotel, city)` and `stay22MapEmbedUrl(...)`

Editors only manage hotel names + cities. Every affiliate URL is derived at render time. This guarantees no editor can paste a broken or non-affiliated link.

---

## Media Pipeline

1. Editor uploads image in Payload Admin.
2. Payload writes binary to Cloudflare R2 via the configured adapter.
3. Payload stores metadata + R2 URL in Supabase Postgres.
4. React app references via `MediaRef` → R2 public URL.
5. `ImageWithFallback` handles 404s with the brand fallback asset.

All images require non-empty `alt` text — Payload validation rejects empty values.
