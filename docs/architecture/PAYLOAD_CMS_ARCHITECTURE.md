# Payload CMS Architecture

Payload is the CMS/Admin, auth layer, backend API, and content model framework for the clean VIAIVE build.

## Runtime

- Next.js runs the public frontend and Payload Admin in the same app.
- Payload Admin is mounted through `src/app/(payload)`.
- Public routes live under `src/app/(frontend)`.
- Payload uses `@payloadcms/db-postgres` with `DATABASE_URI` for Supabase Postgres.
- Media uploads use `@payloadcms/storage-s3` against Cloudflare R2 when all R2 env vars are present.

## Collections

Homepage is first-class and separate from generic `pages`. Supporting collections include service desks, destinations, articles, hotels, affiliates, media, forms, leads, redirects, taxonomy, QA snapshots, and users.

## Auth

Payload built-in auth powers `/admin`. Supabase Auth is not used for Payload Admin.

## Local Fallback

The public homepage uses `getHomepage()`. If `DATABASE_URI` or `PAYLOAD_SECRET` is missing, it renders the seed document so frontend and Playwright work before database mutation.
