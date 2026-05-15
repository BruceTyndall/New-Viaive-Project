# Homepage CMS Architecture

The homepage is the first proof object for the new VIAIVE platform.

## Collection

`homepage` is a dedicated Payload collection with `route` defaulting to `/`. It is not stored inside generic pages.

## Editable Groups

- Review workflow: `reviewStatus`, `reviewNotes`, `lastReviewedAt`
- Hero: eyebrow, headline, dek, media, CTAs, visual variant
- Intent router: traveler intent, target URL, related desk, visual cue, priority
- Featured modules: service desks, destinations, articles, hotels
- Hotel advisory module: Stay22 eligibility and affiliate placement
- Planning process
- Affiliate disclosure teaser
- Final CTA
- SEO fields
- GEO/AI answer fields

## Rendering

`src/app/(frontend)/page.tsx` calls `getHomepage()`. When Payload is connected it reads the `homepage` document through the Local API. Without secrets, it falls back to `src/data/seed/homepage.ts`.

## Proof Gate

The homepage is ready for scale only when Bruce can edit the homepage in Payload Admin, preview `/`, and Playwright captures the four required screenshots.
