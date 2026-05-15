# Implementation Handoff (Codex Bootstrap)

This is the capstone document. It tells Codex (or any future implementer) exactly how to take the Figma Make prototype + this `docs/` package and stand up a production Viaive instance on Payload CMS + Supabase Postgres + Cloudflare R2.

---

## 1. Stack

| Layer | Tool | Why |
|---|---|---|
| Frontend | Next.js 15 (App Router) + React 19 + Tailwind v4 | Server components for SEO/GEO, edge rendering, file-based routing |
| CMS | Payload 3.x | Type-safe blocks, native Next integration, Drizzle-on-Postgres |
| Database | Supabase Postgres (`pjsketbxfuuxdoqojals.supabase.co`) | Hosted Postgres, branch DBs for staging |
| Media | Cloudflare R2 | S3-compatible, zero egress |
| Secrets | Doppler | Stay22 keys, Supabase service role, etc. |
| CI / Screens | Playwright | Visual regression + screen capture |
| Hosting | Vercel | Auto-deploys per branch; Preview URLs feed Playwright captures |
| Affiliate | Stay22 (Spark, Nova, LinkSwap, LMA) | Active in production |

---

## 2. Bootstrap Order

Codex should execute in this order. Each step must succeed before the next.

1. **Provision Supabase project**
   - Use existing project `pjsketbxfuuxdoqojals`.
   - Create `payload_prod` and `payload_staging` databases.
   - Generate service role + anon keys → Doppler.
2. **Provision R2 bucket**
   - Bucket: `viaive-media`.
   - Public read on `/media/*`.
   - CNAME `media.viaive.com` → bucket.
3. **Scaffold Next.js + Payload**
   - `pnpm create payload-app viaive --template website` (or the Payload 3 latest scaffolder).
   - Configure adapters: `@payloadcms/db-postgres`, `@payloadcms/storage-r2`.
   - Import `docs/cms-fields.json` collection by collection — globals first, then collections, then page blocks.
4. **Port React components**
   - Lift `src/app/components/*` from this repo into `apps/web/components/*`.
   - Convert from data-prop driven to Payload-block driven: each component reads its props from the matching block schema.
   - Keep `lib/stay22.ts` exactly as-is.
5. **Wire routes**
   - File-based: `app/page.tsx` (`/`), `app/destinations/[slug]/page.tsx`, `app/desks/[slug]/page.tsx`, `app/best/[slug]/page.tsx`, `app/compare/[slug]/page.tsx`, `app/(legal)/privacy/page.tsx`, etc.
   - All routes fetch from Payload via `payload.find` (server-only).
6. **Seed content**
   - Migrate the `src/app/data/destinations.ts` entries into the `destinations` collection.
   - Populate globals: `navigation`, `footer`, `viaiveStandard`, `proof`, `newsletter`, `novaExitIntent`.
7. **Stand up Playwright**
   - Install `@playwright/test`.
   - Add the screen capture script `playwright/capture-screens.ts` (separate file, runs against Preview URLs).
   - Add axe-core a11y check on every route in CI.
8. **Configure analytics**
   - Drop in PostHog or Plausible — must read `data-analytics-id` attributes.
   - Forward Stay22 click events as conversion events.
9. **DNS + cutover**
   - Vercel project → `viaive.com`.
   - `media.viaive.com` → R2.
   - 301 redirects from any legacy URLs.

---

## 3. Workflow Contract

```
Editor in Payload Admin
        ↓
  reviewStatus: draft → readyForReview → approved → live
        ↓
  ISR revalidate triggered by Payload hook
        ↓
  Vercel Preview / Production rebuilds affected routes
        ↓
  Playwright runs on Preview → axe a11y + screen capture
        ↓
  PR auto-comment: "✓ A11y passed · Screens captured · Ready for review"
        ↓
  Human approver merges to main → production live
```

ISR revalidation is keyed off `slug`. Touching a destination revalidates only `/destinations/{slug}`, `/`, and any best-of that references its city.

---

## 4. Environment Variables (Doppler)

```
DATABASE_URL                    # Supabase Postgres
PAYLOAD_SECRET                  # 32-byte hex
R2_ACCOUNT_ID
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
R2_BUCKET=viaive-media
NEXT_PUBLIC_R2_PUBLIC_URL=https://media.viaive.com   # Phase 1 may use pub-*.r2.dev until DNS cutover
STAY22_LMA_ID=
STAY22_AID=
NEXT_PUBLIC_SITE_URL=https://viaive.com
POSTHOG_KEY                     # Phase 5 optional; not required for the Phase 1 exit gate
SENTRY_DSN                      # Phase 5 optional; not required for the Phase 1 exit gate
```

For Supabase Session Pooler DSNs used by Node `pg` v8 in this repo, `DATABASE_URL` must include `uselibpqcompat=true` alongside `sslmode=require`.

Service role keys live **server-side only**; never expose to the client.

---

## 5. Residual Risks

| # | Risk | Severity | Mitigation |
|---|---|---|---|
| 1 | Stay22 rate-limiting on map iframe load | Medium | Lazy-load iframes; single load per page; cache the rendered iframe URL |
| 2 | Payload + Drizzle migration drift on Supabase | Medium | Branch DBs per Vercel preview; migrations run via Payload, never raw SQL |
| 3 | R2 cold-cache LCP impact | Low | Edge caching + AVIF + Vercel image optimization |
| 4 | AI Overview citation of stale `lastReviewed` | Medium | Soft warning in CMS at >90 days; "Last audited" rendered on every destination page |
| 5 | FTC compliance audit on affiliate disclosure | Low | Footer disclosure on every page; `rel="sponsored nofollow"` enforced at render |
| 6 | Editor pastes a non-Viaive affiliate URL | Low | `{{Hotel Name}}` marker is the only sanctioned affiliate-link mechanism; raw URLs are visually flagged in Admin preview |
| 7 | Nova exit-intent fires on mobile false positive | Medium | Mobile uses a 30s dwell timer + scroll-up detection instead of mouseleave |
| 8 | Schema.org markup errors block AI Overviews | High | Validate with Google Rich Results Test in CI on every PR |
| 9 | Image rights drift on hotel covers | Medium | `media.license` field required; nightly audit script flags `editorial` license on non-editorial routes |
| 10 | Concierge brief inbox PII leak | High | `briefs` collection has zero public read access; Payload access control enforced; encrypt-at-rest via Supabase |
| 11 | Observability remains deferred during Phase 1 bootstrap | Low | `POSTHOG_KEY` and `SENTRY_DSN` are Phase 5 optional and are not part of the Phase 1 exit gate |
| 12 | Supabase Session Pooler TLS semantics differ under Node `pg` v8 | Low | Keep `uselibpqcompat=true&sslmode=require` on the Session Pooler `DATABASE_URL` so Payload can connect cleanly during Phase 1 |

---

## 6. 14-Day Revenue Test Plan

Once Phase 2 (destinations + Stay22) ships:

| Day | Action | Metric | Target |
|---|---|---|---|
| 1 | Ship `/destinations/tokyo`, `/destinations/thailand`, `/destinations/maldives` (already live in prototype) | Indexation | All 3 indexed in Google in ≤72hr |
| 3 | Submit to Bing + IndexNow | Indexation | Bing indexes in ≤24hr |
| 5 | Publish 2 editorial pieces linking into the 3 destinations | Internal link equity | ≥6 internal links into each destination |
| 7 | Launch Stay22 NovaExitIntent on destinations | Capture rate | ≥3% of exits engaged |
| 8 | Run a $500 paid test (Google Search) to `/destinations/tokyo` for "where to stay tokyo luxury" | CPC, CTR, Stay22 clicks | CTR ≥4%, Stay22 click ≥6% of LPVs |
| 10 | Cohort Stay22 click → booking conversion via Stay22 reporting | Booking conversion | Establish baseline |
| 12 | Ship `/best/tokyo-hotels` + `/best/paris-hotels` | Indexation | Both indexed in ≤48hr |
| 14 | Compare paid-vs-organic Stay22 booking rate | Channel margin | Organic Stay22 EPM ≥ $0.40 |

All readouts live in a single dashboard wired off `data-analytics-id` events.

---

## 7. Screen Capture (PNG Deliverable)

PNG screens for every route × viewport are produced by Playwright, not generated in this environment.

**Run:**
```bash
PLAYWRIGHT_BASE_URL=https://staging.viaive.com pnpm tsx playwright/capture-screens.ts
```

**Outputs:**
```
docs/screens/home-desktop.png
docs/screens/home-mobile.png
docs/screens/destinations-tokyo-desktop.png
... (× 18 routes × 2 viewports = 36 PNGs)
```

See `playwright/capture-screens.ts` (alongside this file) for the script.

---

## 8. Raw HTML/CSS Export

For each route, after Next.js builds, the static HTML + the Tailwind-compiled CSS are dumped:

```bash
pnpm next build
pnpm next export    # or use `output: 'export'` in next.config
```

This produces `out/<route>/index.html` and `out/_next/static/css/*.css`. Concatenate the route HTML + its referenced CSS into per-route files:

```bash
pnpm tsx scripts/export-route-html.ts
```

Outputs to `docs/html/<route>.html` and `docs/html/<route>.css`. Both files are self-contained and CMS-paste-ready.

---

## 9. Acceptance Criteria Before Production Cutover

- [ ] All 18 routes return 200 with full content
- [ ] Lighthouse a11y ≥95 on every route
- [ ] Lighthouse SEO ≥95 on every route
- [ ] Lighthouse performance ≥85 mobile, ≥95 desktop
- [ ] Schema.org validates clean on every route
- [ ] Sitemap.xml auto-generated and submitted
- [ ] robots.txt deployed
- [ ] Affiliate disclosure visible on every Stay22 surface
- [ ] `rel="sponsored nofollow"` audited on every affiliate anchor
- [ ] NovaExitIntent fires once per session, dismissible
- [ ] Concierge brief writes to `briefs` collection, receives email confirmation
- [ ] All `lastReviewed` fields ≤30 days old
- [ ] Playwright screen capture passing for all 36 PNG outputs
