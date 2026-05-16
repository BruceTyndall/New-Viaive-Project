# Phase 7 Commander — Integrations (Stay22 · Brevo · R2)

**Paste this entire file as the first message of a new Claude Code session.**
**Model: Sonnet 4.6 (commander + workers — all three integrations run in parallel)**

---

## Your role

You are the Phase 7 commander for the Viaive project. Your job is to coordinate three parallel Sonnet workers — one per integration (Stay22, Brevo, R2) — then merge, verify, tag, and output the Phase 8 commander prompt.

Each integration is in a completely different part of the codebase — zero file overlap is possible.

---

## Pre-flight

```bash
git checkout main && git pull
git tag | grep green   # must show phase-6-content-green
pnpm drift:check       # exit 0
npx tsc --noEmit       # 0 errors
pnpm dev:doppler &     # keep running
```

---

## Existing infrastructure (read before spawning workers)

- `src/lib/stay22.ts` — EXISTS. Has `stay22DeepLink()`, `stay22MapEmbedUrl()`, `loadStay22Script()`, `STAY22_LMA_ID`, `STAY22_AID`. The script loader needs to be wired client-side.
- `src/app/newsletter/subscribe/route.ts` — EXISTS. Brevo API call is written but needs end-to-end testing and error-path hardening.
- R2 storage — NOT YET configured in Payload. Needs `@payloadcms/storage-s3` plugin (S3-compatible) or `@payloadcms/cloud-storage` adapter.
- Doppler vars available: `STAY22_LMA_ID`, `STAY22_AID`, `BREVO_API_KEY`, `BREVO_LIST_ID`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`, `NEXT_PUBLIC_R2_PUBLIC_URL`.

---

## Workers — spawn all three in parallel

---

### Worker A prompt — Stay22 integration audit + wiring (Sonnet 4.6)

```
You are completing the Stay22 affiliate integration for the Viaive project.
Working directory: this worktree. Confirm with git status — must be clean.

## Background
Stay22 is a hotel affiliate network. Two parts:
1. LMA script (letmeallez.js) — injected client-side, overlays hotel links with a booking widget
2. Deep links — `stay22DeepLink(hotelName, city)` generates `https://www.stay22.com/allez/booking?aid=viaive&q=...`

Both are in src/lib/stay22.ts which already exists.

## Your job

### 1. Audit all affiliate links in src/components/
Check StayModule.tsx and DestinationGuide.tsx — confirm every external hotel link uses `stay22DeepLink()` or `stay22MapEmbedUrl()` from src/lib/stay22.ts. No raw hotel URLs anywhere.

### 2. Wire the LMA script client-side
`loadStay22Script()` exists but may not be called anywhere. Create src/components/Stay22Provider.tsx as a client component that calls it on mount:

```tsx
'use client'
import { useEffect } from 'react'
import { loadStay22Script } from '@/lib/stay22'

export function Stay22Provider({ children }: { children: React.ReactNode }) {
  useEffect(() => { loadStay22Script() }, [])
  return <>{children}</>
}
```

Then wrap `<main id="main-content">` in the site layout with Stay22Provider. Or, if a per-page approach is cleaner, add it to pages that have StayModule.

### 3. Add rel="sponsored nofollow" enforcement
Every <a> that links to stay22.com must have `rel="sponsored nofollow"`. Check StayModule.tsx and DestinationGuide.tsx — add if missing.

### 4. Add data-analytics-id to all StayModule links
Format: `data-analytics-id="stay22:<hotel-slug>:<city>"` on every booking CTA anchor.

### 5. Test
- Run: pnpm dev:doppler
- Visit http://localhost:3000/desks/hotel and inspect network — confirm stay22 script loads
- Visit http://localhost:3000/destinations/tokyo — confirm hotel links have rel="sponsored nofollow"

## Files you may touch
- src/components/Stay22Provider.tsx (create)
- src/components/StayModule.tsx (audit only — if changes needed, make minimal fixes)
- src/components/DestinationGuide.tsx (audit only)
- src/app/(site)/layout.tsx (add Stay22Provider if using layout approach)
- src/lib/stay22.ts (read-only — do not modify the interface)

## Do NOT touch: src/styles/, src/payload/, src/collections/, src/globals/, src/migrations/

## After finishing
1. npx tsc --noEmit — 0 errors
2. pnpm drift:check — exit 0
3. git add [changed files]
4. git commit -m "Phase 7: Stay22 LMA wiring, rel audit, analytics-id"
5. git push
```

---

### Worker B prompt — Brevo email integration hardening (Sonnet 4.6)

```
You are hardening the Brevo email integration for the Viaive project.
Working directory: this worktree. Confirm with git status — must be clean.

## Background
- Provider: Brevo (formerly Sendinblue)
- Endpoint: src/app/newsletter/subscribe/route.ts (EXISTS — already written)
- Doppler vars: BREVO_API_KEY, BREVO_LIST_ID
- From address: hello@viaive.com
- EmailCapture component in src/components/EmailCapture.tsx submits to this endpoint

## Your job

### 1. Audit the existing subscribe route
Read src/app/newsletter/subscribe/route.ts — check:
- Does it call the Brevo API correctly? (POST to https://api.brevo.com/v3/contacts, body: { email, listIds: [BREVO_LIST_ID] })
- Does it handle Brevo's 204 (already subscribed) vs 201 (new contact) responses?
- Does it return helpful error messages to the client (not raw Brevo errors)?
- Is rate limiting or duplicate guard in place?

Fix any gaps found. The route is frozen if no changes are needed — do not touch it unnecessarily.

### 2. Audit EmailCapture component
Read src/components/EmailCapture.tsx — check:
- Does it POST to /newsletter/subscribe?
- Does it show a success state after submission?
- Does it show a loading state during the request?
- Does it handle errors gracefully (network error, invalid email, already subscribed)?
- Is the submit button disabled during loading?

If any of these are missing, fix them. EmailCapture is in src/components/ (frozen area) — if you need to fix it, note that this is a frozen-area touch and document it in the commit.

### 3. Write a manual test checklist
Create src/seed/brevo-test-checklist.md:
```
# Brevo Integration Test Checklist

Run these manually before tagging Phase 7:

- [ ] Submit a new email at /start-planning → confirm Brevo contact created
- [ ] Submit the same email again → confirm 200 response (not 500) with "already subscribed" message
- [ ] Submit an invalid email → confirm 400 response
- [ ] Submit with BREVO_API_KEY unset → confirm 503 response (not crash)
- [ ] Check Brevo dashboard → confirm contact is in list BREVO_LIST_ID
```

## Files you may touch
- src/app/newsletter/subscribe/route.ts (audit + fix if needed)
- src/components/EmailCapture.tsx (audit + fix if needed — note frozen-area touch)
- src/seed/brevo-test-checklist.md (create)

## Do NOT touch: src/styles/, src/payload/, src/collections/, src/globals/, src/migrations/

## After finishing
1. npx tsc --noEmit — 0 errors
2. pnpm drift:check — exit 0
3. git add [changed files]
4. git commit -m "Phase 7: Brevo subscribe hardening + test checklist"
5. git push
```

---

### Worker C prompt — Cloudflare R2 media storage (Sonnet 4.6)

```
You are wiring Cloudflare R2 media storage into the Payload CMS configuration for the Viaive project.
Working directory: this worktree. Confirm with git status — must be clean.

## Background
- Payload CMS stores media. Currently uses local filesystem (default).
- Need to switch to Cloudflare R2 (S3-compatible).
- Doppler vars: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, NEXT_PUBLIC_R2_PUBLIC_URL
- Payload version: 3.84.1 — use @payloadcms/storage-s3 plugin

## Your job

### 1. Install the storage plugin
```bash
pnpm add @payloadcms/storage-s3
```

### 2. Configure R2 in payload.config.ts
Add the S3 storage plugin. Cloudflare R2 is S3-compatible — use the R2 endpoint format:
```ts
import { s3Storage } from '@payloadcms/storage-s3'

// In plugins array:
s3Storage({
  collections: { media: true },
  bucket: process.env.R2_BUCKET!,
  config: {
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  },
})
```

### 3. Update next.config.ts image remotePatterns
Add the R2 public URL hostname to `remotePatterns` so Next.js Image allows R2-hosted media:
```ts
{
  protocol: 'https',
  hostname: new URL(process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 'https://placeholder.example.com').hostname,
}
```
Note: `NEXT_PUBLIC_R2_PUBLIC_URL` may not be available at build config time — use a safe fallback or the known R2 hostname pattern `*.r2.dev` as a wildcard.

### 4. Test upload path works
- Run pnpm dev:doppler
- Navigate to http://localhost:3000/admin/collections/media
- Attempt to upload a small test image
- Confirm it uploads to R2 (check R2 bucket via Cloudflare dashboard, or check the URL returned by Payload)

### Important constraints
- payload.config.ts is in the Phase 1 (Payload-generated) frozen area — BUT this is an approved Phase 7 integration touch. Document the frozen-area change in your commit message.
- Do NOT change any collection schema, field definitions, or access rules
- Run pnpm drift:check after — it checks frozen files via git diff vs green tags. A planned re-tag will happen post-Phase 7 merge.

## Files you may touch
- payload.config.ts (add storage plugin)
- next.config.ts (add R2 image hostname)
- package.json (pnpm add only — do not manually edit)

## After finishing
1. npx tsc --noEmit — 0 errors
2. pnpm drift:check — note: may show frozen-area change for payload.config.ts — expected, document it
3. git add payload.config.ts next.config.ts pnpm-lock.yaml package.json
4. git commit -m "Phase 7: R2 storage plugin — frozen-area planned touch (payload.config.ts)"
5. git push
```

---

## Merge protocol

Worker C touches `payload.config.ts` (frozen area) — this is an approved Phase 7 integration. After merging all three workers:

```bash
git checkout main && git pull
npx tsc --noEmit       # 0 errors
pnpm drift:check       # Worker C's payload.config.ts change will show as a frozen-area diff
```

The frozen-area flag on payload.config.ts is expected — document it in the PR and proceed. The Phase 7 green tag captures this re-baseline.

```bash
# Smoke test key integration surfaces
curl -s http://localhost:3000/desks/hotel | grep -c "stay22"  # > 0 = Stay22 links present
curl -s -X POST http://localhost:3000/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test-integration@viaive.com"}' | jq .status
# → 201 or 200
```

---

## Tagging

```bash
git tag phase-7-integrations-green main
git push origin phase-7-integrations-green
```

Note: After Phase 7 tags, the frozen-area baseline for payload.config.ts is reset. Future sessions should not flag this file as drift unless it changes again.

---

## Session close — tell Bruce

```
Phase 7 complete and tagged phase-7-integrations-green.

✓ Stay22: LMA script wired, all hotel links audited, rel="sponsored nofollow" confirmed
✓ Brevo: subscribe endpoint hardened, EmailCapture states complete, test checklist written
✓ R2: storage plugin configured, media uploads routing to Cloudflare R2
✓ TypeScript: 0 errors

Note: payload.config.ts frozen-area touch is approved and tagged — drift check
will re-baseline from phase-7-integrations-green going forward.

Next phase: Phase 8 — SEO & Performance — model: Sonnet 4.6
```

Then print the exact contents of `docs/command/PHASE_8_COMMANDER.md` prefixed with:

```
=== COPY EVERYTHING BELOW THIS LINE AND PASTE INTO A NEW CLAUDE CODE SESSION ===
```
