# Viaive — Project Governance for Claude Code Agents

Every Claude Code session in this repo reads this file first.
Do not skip it. Do not assume you remember it from a previous session.

---

## What this project is

Viaive is a luxury travel editorial advisory platform. The homepage is the
flagship proof object. It must communicate editorial authority, route
travelers into advisory desks, support Stay22 hotel affiliate monetisation,
and convert high-intent visitors into private concierge briefs.

Source of truth for all design and copy decisions:
- `docs/figma/source/docs/` — design package (DESIGN_SYSTEM, COMPONENT_LIBRARY, PAGE_ARCHETYPE_SPECS, etc.)
- `docs/figma/source/src/app/components/` — Figma prototype components to port
- `PRODUCT.md` — product purpose and anti-patterns
- `DESIGN.md` — design system bridge document

When the docs package conflicts with generic frontend convention, **the package wins**.

---

## ZERO-DRIFT POLICY

**This is the most important rule in this file. Read it twice.**

Drift = any work that does not match the master plan exactly. That includes:
- Building a route that is not in the 18-route master list
- Building a component that is not in the 17-component master list
- Modifying a frozen-phase file without an approved re-tag
- Using a banned design token (border-radius, blur, hard-coded #fff, etc.)
- Importing a font outside `src/styles/fonts.css`
- Constructing an affiliate URL outside `lib/stay22.ts`

**Every session must run `pnpm drift:check` at start AND at end. Exit code 1 = drift = stop.**

The drift check (`scripts/drift-check.mjs`) is the single source of truth for what counts as drift. If you need to change scope, update **both** `CLAUDE.md` **and** the master lists at the top of `scripts/drift-check.mjs` in the same commit, and document the change in the PR description.

---

## Phase build status — and which model to use

| Phase | **MODEL TO USE** | Branch | Tag | Status |
|---|---|---|---|---|
| 1 — Bootstrap | — | — | — | ✅ FROZEN |
| 2 — Schema (10 collections, 6 globals, Stay22) | — | `phase-2-schema` | `phase-2-schema-green` | ✅ FROZEN |
| 3 — CSS tokens (Tailwind v4, design tokens) | — | `phase-3-tokens` | `phase-3-tokens-green` | ✅ FROZEN |
| 4 — Components (7 of 17: Nav, Hero, TrustBar, IntentRouter, Desks, EmailCapture, Footer) | — | `phase-4-components` | `phase-4-components-green` | ✅ FROZEN (re-tag pending after Nav blur fix) |
| **5a — Component port + 7 unique routes** | **Sonnet 4.6** | `phase-5a-pages-arch` | `phase-5a-pages-green` | 🟡 NEXT — must include the 10 missing components as a prerequisite |
| 5b — 11 pattern routes | **Haiku 4.5** | `phase-5b-pages-patterns` | `phase-5b-pages-green` | ⬜ |
| 6 — Content & CMS seeding | **Haiku 4.5** | `phase-6-content` | `phase-6-content-green` | ⬜ |
| 7 — Integrations (Stay22, Brevo, R2) | **Sonnet 4.6** | `phase-7-integrations` | `phase-7-integrations-green` | ⬜ |
| 8 — SEO & performance | **Sonnet 4.6** | `phase-8-seo` | `phase-8-seo-green` | ⬜ |
| 9 — Launch QA | **Opus 4.7** | `phase-9-qa` | — | ⬜ |

**Before you write a single line of code:** run `git tag | grep green` and
confirm the previous phase's tag exists. If it does not, stop and tell Bruce.

---

## Master plan — 17 components, 18 routes

The drift check enforces these exact lists. To add or remove anything, edit both this section AND `scripts/drift-check.mjs`.

### 17 components (all live in `src/components/`)
**Phase 4 (built):** Nav, Hero, TrustBar, IntentRouter, Desks, EmailCapture, Footer
**Phase 5a prerequisite (to port):** Atlas, Brief, DestinationGuide, DestinationsRail, Editorial, FAQ, NovaExitIntent, Proof, Standard, StayModule

### 18 routes (all live under `src/app/(site)/<slug>/page.tsx`, no dynamic segments)
1. `/`
2. `/start-planning`
3. `/concierge`
4. `/desks/hotel`
5. `/desks/family`
6. `/desks/safari`
7. `/desks/asia`
8. `/destinations/thailand`
9. `/destinations/tokyo`
10. `/destinations/paris`
11. `/destinations/dubai`
12. `/best/tokyo-hotels`
13. `/best/paris-hotels`
14. `/compare/villa-vs-hotel`
15. `/compare/direct-vs-advisor-vs-portal`
16. `/privacy`
17. `/terms`
18. `/affiliate-disclosure`

Internal-only routes that are allowed but not in the public count: `/style-guide` (under `(internal)` route group, noindex).

---

## FROZEN phases — do not touch

These directories are locked. Any modification to them is drift and the check will fail:

```
src/payload/**          (Phase 2)
src/collections/**      (Phase 2)
src/globals/**          (Phase 2)
src/migrations/**       (Phase 2)
src/blocks/**           (Phase 2)
src/fields/**           (Phase 2)
src/access/**           (Phase 2)
src/app/(payload)/**    (Phase 1/Payload-generated)
src/styles/**           (Phase 3)
src/components/**       (Phase 4 — the 7 built. Phase 5a will ADD 10 more; once added they are frozen too)
```

If you need to fix something in a frozen area:
1. Stop and tell Bruce.
2. If approved, make the change on a one-shot branch named `phase-N-<short-fix-name>`.
3. After merge to main, re-tag the affected phase: `git tag -f phase-N-name-green main && git push --force origin phase-N-name-green`.
4. Document the re-tag in the PR description.

---

## Stack (do not change versions without explicit approval)

| Layer | Tool | Version |
|---|---|---|
| Frontend | Next.js App Router | 15.4.11 |
| UI library | React | 19.2.6 |
| Styling | Tailwind v4 | 4.3.0 |
| CMS | Payload | 3.84.1 |
| Database | Supabase Postgres | — |
| Media | Cloudflare R2 | — |
| Secrets | Doppler (`new-viaive-project`, config: `stg`) | — |
| Icons | lucide-react | 1.16.0 |
| Run command | `pnpm dev:doppler` | — |

---

## Architecture — critical decisions

### Route groups
```
src/app/
├── layout.tsx          ← bare HTML shell ONLY — no CSS import
│                         (wraps everything including Payload admin)
├── (site)/
│   ├── layout.tsx      ← imports globals.css + site metadata
│   │                     ALL public pages go here
│   ├── page.tsx        ← homepage
│   └── (internal)/     ← noindex dev tools (style-guide etc.)
└── (payload)/          ← DO NOT TOUCH — auto-generated by Payload
```

All new public pages go under `src/app/(site)/<route>/page.tsx`. Never in the root `src/app/`. **No dynamic segments** — every route in the master plan is a discrete folder.

### API routes
Payload auto-generates `(payload)/api/[...slug]/route.ts` which intercepts
ALL requests to `/api/*`. Any route handler you add must go outside that
namespace. Use `/newsletter/*`, `/actions/*`, or route-specific paths.

The newsletter subscribe endpoint lives at `/newsletter/subscribe/route.ts`.

### CSS tokens
Two-layer pattern:
- `src/styles/tokens.css` — raw `:root` vars (`--paper`, `--stone`, `--gold`)
- `src/styles/theme.css` — Tailwind `@theme inline` registrations

Available Tailwind utilities: `bg-paper`, `bg-stone`, `bg-gold`, `text-stone`,
`text-gold`, `text-stone-mid`, `text-muted`, `shadow-paper-lift`,
`shadow-paper-lift-gold`, `shadow-paper-lift-lg`, `shadow-paper-lift-xl`,
`shadow-press`, `font-display`, `font-body`, `ease-stone`, `ease-paper`,
`z-nav` (40), `z-modal` (80), `z-exit-intent` (90).

### Payload data fetching
Use the local API — not REST. Faster, no network round-trip.

```ts
import { getPayload } from 'payload'
import config from '@payload-config'
const payload = await getPayload({ config })
const { docs } = await payload.find({ collection: 'destinations', where: { slug: { equals: slug } }, limit: 1 })
const nav = await payload.findGlobal({ slug: 'navigation' })
```

Pass fetched data as props into components. Components must not fetch their own data.

---

## Design system — non-negotiable rules

These are auto-fail gates enforced by `drift-check`. Violating any of them means the PR must not be merged.

| Rule | Detail |
|---|---|
| No `border-radius` on primary surfaces | Square corners always |
| No `blur` in shadows or `backdrop-filter` | Solid offsets only — `6px 6px 0 0 #1a1a1a` |
| No `#fff` / `#FFFFFF` backgrounds | Use `var(--paper)` or `var(--paper-alt)` |
| No gold on body copy | `--gold` is for accents, hover states, affiliate markers only |
| No sans-serif headlines above 24px | Use `font-display` (Fraunces) |
| No font imports outside `src/styles/fonts.css` | One import, one place |
| No hardcoded hex values in styles | Use CSS vars (`var(--stone)`) or Tailwind token utilities |
| Every affiliate anchor | `rel="sponsored nofollow"` + analytics id + generated via `lib/stay22.ts` |
| Every interactive element | `data-analytics-id="<route>:<slot>:<intent>"` |

---

## EmailCapture / Brevo
- Provider: **Brevo** (formerly Sendinblue)
- From address: **hello@viaive.com**
- Endpoint: `/newsletter/subscribe`
- Doppler vars: `BREVO_API_KEY`, `BREVO_LIST_ID`

---

## Session protocol (mandatory for every agent session)

### At session start — always run this

```bash
# 1. Confirm you are on the latest main
git checkout main && git pull

# 2. Confirm all expected green tags exist
git tag | grep green   # must show every tagged phase

# 3. ZERO-DRIFT GATE — must pass before writing any code
pnpm drift:check       # exit 0 required

# 4. Create your branch
git checkout -b phase-N-name

# 5. Boot the dev server
pnpm dev:doppler
```

Then call `AskUserQuestion` to confirm scope before writing any code.
This puts the session into **Needs input** state so Bruce sees it in the
mobile app and can approve from his phone.

### During work

- `npx tsc --noEmit` after every significant change — fix before continuing
- `curl localhost:3000/route` after every new page — must return 200
- `pnpm drift:check` before every commit — exit 0 required

### At session end — always do this

1. Run `pnpm drift:check` — **must exit 0**. If it doesn't, do not commit, do not open a PR.
2. Run `npx tsc --noEmit` — must be 0 errors.
3. Commit and push your branch.
4. Open a PR targeting `main`.
5. Call `AskUserQuestion` with this exact format:

```
PR #N is open: [GitHub PR URL]

Model used: <model name from the phase table>

Summary of what was built:
• [bullet 1]
• [bullet 2]
• [bullet 3]

Verification passed:
• drift-check: 0 violations
• TypeScript: 0 errors
• Routes: all 200

Next phase: <name> — use model: <model name from the phase table>

Reply 'approved and merged' when you've merged the PR.
Then I'll tag the release and hand off to the next phase.
```

### After Bruce replies 'approved and merged'

```bash
git checkout main && git pull
git tag phase-N-name-green main
git push origin phase-N-name-green
pnpm drift:check       # final post-tag verification — must exit 0
```

Then write the next-phase handover at `docs/HANDOVER_NEXT_AGENT.md`, naming the model from the phase table above.

---

## Stop conditions — halt immediately and tell Bruce

- `pnpm drift:check` fails at session start or session end
- Phase tag from previous phase does not exist
- `pnpm build:doppler` fails
- Any file in a frozen directory was modified without a planned re-tag
- A PR was opened without Bruce's confirmation
- An affiliate URL was generated without using `lib/stay22.ts`
- A font was imported anywhere except `src/styles/fonts.css`

---

## Doppler environment variables

| Key | Used by |
|---|---|
| `DATABASE_URL` | Payload → Supabase Postgres |
| `PAYLOAD_SECRET` | Payload CMS |
| `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET` | Cloudflare R2 media |
| `NEXT_PUBLIC_R2_PUBLIC_URL` | Public media URLs |
| `STAY22_LMA_ID`, `STAY22_AID` | Stay22 affiliate |
| `BREVO_API_KEY`, `BREVO_LIST_ID` | Email capture |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (https://viaive.com) |

All secrets live in Doppler only. Never commit secrets to git.
