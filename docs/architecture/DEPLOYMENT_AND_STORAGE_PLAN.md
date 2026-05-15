# Deployment And Storage Plan

## Application Host

Use a Node-compatible host for Payload and Next.js. Do not force Payload onto Cloudflare Workers.

## Database

Use the Supabase Postgres project at `https://pjsketbxfuuxdoqojals.supabase.co`. Do not mutate the database until the `DATABASE_URI`, migration workflow, and Doppler env setup are approved.

## Media

Use Cloudflare R2 through the S3-compatible Payload adapter:

- `R2_BUCKET`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_ENDPOINT`
- `R2_PUBLIC_URL`

## Secrets

All real values live in Doppler or runtime env. `.env.example` contains placeholders only.
