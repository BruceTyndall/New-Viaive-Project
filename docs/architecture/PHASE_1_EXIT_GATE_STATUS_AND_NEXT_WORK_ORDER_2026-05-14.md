# Phase 1 Exit Gate Status And Next Work Order

## Purpose

This is the current-state handover for the `New Viaive Project` Phase 1 bootstrap gate. It captures:

1. Codex status at handoff time
2. The confirmation the parallel agents must provide
3. The exact next active work order once their confirmations land

Use this file instead of relying on chat continuity.

---

## Repo Scope

- Repo: `/Users/brucetyndall/Projects/GitHub/New Viaive Project`
- Doppler project: `new-viaive-project`
- Doppler config: `stg`
- Supabase project ref: `pjsketbxfuuxdoqojals`
- Staging database target: `payload_staging`
- R2 bucket: `viaive-media`

---

## Codex Status Snapshot

### Green

- Phase 1 env gate contract is corrected in `scripts/check-contract-env.mjs`.
  - Required for Phase 1:
    - `DATABASE_URL`
    - `PAYLOAD_SECRET`
    - `R2_ACCOUNT_ID`
    - `R2_ACCESS_KEY_ID`
    - `R2_SECRET_ACCESS_KEY`
    - `R2_BUCKET`
    - `NEXT_PUBLIC_R2_PUBLIC_URL`
    - `STAY22_LMA_ID`
    - `STAY22_AID`
    - `NEXT_PUBLIC_SITE_URL`
  - Deferred to Phase 5, warn only:
    - `POSTHOG_KEY`
    - `SENTRY_DSN`
- `pnpm build` passes.
- Contract grep checks passed:
  - no `stay22.com` outside `src/lib/stay22.ts`
  - empty-schema `cms-fields.json` drift baseline passes
  - no hardcoded route content under `src/app/**` fetching from non-Payload sources
- `pnpm payload migrate:create init` succeeded and generated `src/migrations/20260515_031408_init.ts`.
- The `users` footprint has been investigated and explained.
- Live Doppler inventory for `new-viaive-project / stg` now contains all required Phase 1 key names.

### Red

- `doppler run --config stg -- node scripts/check-contract-env.mjs` still fails because `DATABASE_URL` is present but invalid.
  - The key exists in `stg`.
  - The value starts with a Postgres scheme.
  - Both the gate script and Payload / `pg-connection-string` reject it as `Invalid URL`.
- Because the env gate is still red, these checks are not yet green:
  - `pnpm payload migrate` against `payload_staging`
  - direct Supabase confirmation of applied `payload_*` tables
  - `pnpm dev` plus `GET /admin` returns `200`
  - R2 upload plus public read

---

## What Codex Changed

### 1. Phase 1 env gate was tightened

- `scripts/check-contract-env.mjs` now blocks only on real Phase 1 bootstrap requirements.
- `POSTHOG_KEY` and `SENTRY_DSN` no longer block Phase 1.

### 2. Internal auth collection was made explicit and hidden

- `src/payload.config.ts` now declares an explicit internal `users` auth collection with:
  - `slug: 'users'`
  - `auth: { tokenExpiration: 7200 }`
  - `fields: []`
  - `admin.hidden: true`

This preserves Payload admin auth while preventing a visible public-facing `Users` collection from appearing in the admin nav once the app boots cleanly.

### 3. Implementation handoff updated

- `docs/figma/source/docs/IMPLEMENTATION_HANDOFF.md` now marks `POSTHOG_KEY` and `SENTRY_DSN` as Phase 5 optional and notes that Phase 1 may use the `pub-*.r2.dev` URL instead of `media.viaive.com`.

---

## Users Footprint Finding

The `users` table and `users` type are not blank-template drift.

They are coming from Payload core:

- `payload/dist/config/sanitize.js` auto-injects `defaultUserCollection` when no auth collection exists.
- `payload/dist/auth/defaultUser.js` defines that collection as `slug: 'users'` with auth enabled.

Conclusion:

- The `users` footprint is expected internal admin-auth infrastructure.
- It should not be treated as a public Phase 1 schema collection.
- The correct move was not to remove auth, but to make the auth collection explicit and hidden.

---

## Exact Current Blocker

As of the latest Codex rerun, the Phase 1 key names are present in `new-viaive-project / stg`, but `DATABASE_URL` is malformed enough that both of these fail:

- `node scripts/check-contract-env.mjs`
- `pnpm payload migrate`

The migration failure is:

- `Error: cannot connect to Postgres. Details: Invalid URL`

This is no longer a "missing key" problem. It is now a "bad DATABASE_URL value" problem.

---

## Full Key Audit

| Key | Phase status | Live in `new-viaive-project / stg` | Wired in current repo code | Audit finding |
|---|---|---|---|---|
| `DATABASE_URL` | Required | Yes | Yes | Consumed by `src/payload.config.ts` and bootstrap scripts, but current `stg` value fails URL parsing and blocks Payload migrations |
| `PAYLOAD_SECRET` | Required | Yes | Yes | Correctly wired in `src/payload.config.ts` |
| `R2_ACCOUNT_ID` | Required | Yes | Partial | Used only by the gate to derive `R2_ENDPOINT`; storage adapter is not yet wired in `src/payload.config.ts` |
| `R2_ACCESS_KEY_ID` | Required | Yes | No runtime wiring yet | Present in `stg`, but currently only checked by the gate |
| `R2_SECRET_ACCESS_KEY` | Required | Yes | No runtime wiring yet | Present in `stg`, but currently only checked by the gate |
| `R2_BUCKET` | Required | Yes | No runtime wiring yet | Present in `stg`, but currently only checked by the gate |
| `NEXT_PUBLIC_R2_PUBLIC_URL` | Required | Yes | No runtime wiring yet | Present in `stg`; parses as a valid `https://pub-*.r2.dev` URL |
| `STAY22_LMA_ID` | Required by gate | Yes | Not actually env-wired | `src/lib/stay22.ts` still hardcodes placeholder constants instead of reading env |
| `STAY22_AID` | Required by gate | Yes | Not actually env-wired | `src/lib/stay22.ts` still hardcodes placeholder constants instead of reading env |
| `NEXT_PUBLIC_SITE_URL` | Required by gate | Yes | Gate/docs only | Present, but no active frontend usage in current repo code |
| `POSTHOG_KEY` | Phase 5 optional | No | No | Deferred correctly; not a blocker |
| `SENTRY_DSN` | Phase 5 optional | No | No | Deferred correctly; not a blocker |
| `DATABASE_URI` | Compatibility alias only | No | Alias support only | Still accepted by helper scripts, but now a stale doc reference for this repo |
| `R2_ENDPOINT` | Compatibility / derived | No | Derived only | Not required if `R2_ACCOUNT_ID` is present |
| `R2_PUBLIC_URL` | Compatibility alias only | No | Alias support only | Stale legacy name; `NEXT_PUBLIC_R2_PUBLIC_URL` is the canonical key |

### High-signal conclusions

- Only `DATABASE_URL` and `PAYLOAD_SECRET` are truly runtime-critical in the current app code.
- The R2 key family is required by the Phase 1 contract, but actual R2 storage wiring is not implemented yet in `src/payload.config.ts` even though `@payloadcms/storage-r2` is installed.
- The Stay22 keys are contract-checked, but the helper still uses placeholder constants rather than env-backed values.
- Presence of a key is not enough. `DATABASE_URL` currently exists but is unusable.

### Stale or legacy references still in repo docs

- `docs/architecture/PAYLOAD_CMS_ARCHITECTURE.md`
  - still says `DATABASE_URI`
- `docs/architecture/DEPLOYMENT_AND_STORAGE_PLAN.md`
  - still says `DATABASE_URI`
  - still says `R2_PUBLIC_URL`
- `docs/architecture/AFFILIATE_VISUAL_EDITOR_MODEL.md`
  - still says `STAY22_PARTNER_ID`
- `docs/figma/source/VIAIVE_OPTIMIZATION_V2.md`
  - still points to old Doppler project `viaive`
  - still uses config names `staging` / `prod`
  - still references `R2_SECRET`, `STAY22_API_KEY`, and `STAY22_PARTNER_ID`

These are audit findings, not yet cleaned up in this pass.

### Live Doppler inventory snapshot

- `new-viaive-project / stg`
  - contains the active Phase 1 key set for this repo
  - currently includes `DATABASE_URL`, `PAYLOAD_SECRET`, the R2 key family, the Stay22 pair, and `NEXT_PUBLIC_SITE_URL`
- `new-viaive-project / dev`
  - currently only has Doppler metadata keys
- `new-viaive-project / prd`
  - currently only has Doppler metadata keys
- `viaive / dev`, `viaive / stg`, `viaive / prd`
  - legacy Sanity-era keyspace
  - not the active secret source of truth for this repo
  - includes keys like `PUBLIC_SANITY_*`, `SUPABASE_SERVICE_ROLE_KEY`, `PUBLIC_TENANT_ID`, and related older stack values

---

## Parallel Agent Confirmation Required

Each parallel agent should confirm status against this exact checklist.

### Required confirmation

1. Confirm the Doppler target was exactly:
   - project: `new-viaive-project`
   - config: `stg`
2. Confirm whether these exact secret names now exist:
   - `DATABASE_URL`
   - `R2_ACCESS_KEY_ID`
   - `R2_SECRET_ACCESS_KEY`
   - `NEXT_PUBLIC_R2_PUBLIC_URL`
3. Confirm `DATABASE_URL` is not just present, but usable by Payload / `pg`.
   - no wrapping quotes
   - valid Postgres URI
   - points to project `pjsketbxfuuxdoqojals`
   - points to database `payload_staging`
4. Confirm they were not entered under alias names like:
   - `DATABASE_URI`
   - `R2_PUBLIC_URL`
5. If the keys were pushed somewhere else, state the exact location:
   - project
   - config
   - secret names used
6. Do not paste secret values.

### Reply template for the other agents

```text
Handover confirmation:

1. Doppler target used:
- project:
- config:

2. Exact required keys present in that target:
- DATABASE_URL: yes/no
- R2_ACCESS_KEY_ID: yes/no
- R2_SECRET_ACCESS_KEY: yes/no
- NEXT_PUBLIC_R2_PUBLIC_URL: yes/no

3. DATABASE_URL usability:
- parseable Postgres URI: yes/no
- target project ref is pjsketbxfuuxdoqojals: yes/no
- target database is payload_staging: yes/no

4. Any alias-name mistake:
- none
or
- used these names instead: ...

5. If pushed to the wrong place:
- actual project:
- actual config:

6. Blockers or unresolved uncertainty:
- ...
```

---

## Next Active Work Order

This is the next active work order once the parallel agents confirm the Phase 1 keys are present and `DATABASE_URL` has been corrected.

### Stop rule

If step 1 below fails, stop immediately and do not claim progress on later steps.

### Execution sequence

1. Fix or replace the malformed `DATABASE_URL` value in `new-viaive-project / stg`
   - must parse as a valid Postgres URI
   - must target project `pjsketbxfuuxdoqojals`
   - must target database `payload_staging`
2. `doppler run --config stg -- node scripts/check-contract-env.mjs`
   - Must pass
3. `doppler run --config stg -- pnpm payload migrate`
   - Must succeed against `payload_staging`
4. Confirm migration landed in Supabase directly
   - Query project `pjsketbxfuuxdoqojals`
   - List resulting `payload_*` tables in `public`
   - Confirm this is not a local fallback
5. `doppler run --config stg -- pnpm dev`
   - `GET /admin` must return `200`
   - visible admin schema must show collections: `[]`
6. R2 smoke
   - upload 1-byte object via `@aws-sdk/client-s3`
   - confirm public read via `NEXT_PUBLIC_R2_PUBLIC_URL`
7. Reconfirm contract grep checks if needed
8. If and only if every item above is green, declare Phase 1 Exit Gate green
9. Dispatch Agent 2 only after the gate is green

### Non-goals during this work order

- Do not dispatch Agents 3-8
- Do not claim R2 is green without both upload and public read
- Do not claim Supabase is green without direct table truth on `pjsketbxfuuxdoqojals`

---

## Agent 2 Dispatch Packet

Only send this after the full Phase 1 gate is green.

```text
You are the SCHEMA AGENT. Your input is docs/figma/source/docs/cms-fields.json.
Build collections, globals, and blocks exactly per that file — zero invention.
Run migrations against payload_staging.
Seed Maldives, Tokyo, and Bangkok from docs/figma/source/code/src/app/data/destinations.ts.
Report when:
1. Payload Admin renders every collection and global
2. Seed counts match (3 destinations, N hotels, N watchlist entries)
3. The cms-fields.json drift grep check still passes
```

---

## Evidence Pointers

- Phase 1 env gate: `scripts/check-contract-env.mjs`
- Payload config: `src/payload.config.ts`
- Generated init migration: `src/migrations/20260515_031408_init.ts`
- Existing implementation handoff: `docs/figma/source/docs/IMPLEMENTATION_HANDOFF.md`

---

## Handoff Summary

Codex is no longer blocked on missing key names. Codex is now blocked on key quality and wiring truth.

The next useful move is:

1. collect the parallel agents' confirmations against the checklist above
2. fix the malformed `DATABASE_URL` value in `new-viaive-project / stg`
3. rerun the full Phase 1 gate in one uninterrupted pass
