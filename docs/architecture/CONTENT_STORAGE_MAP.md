# Content Storage Map

| Content / System | Storage Location |
|---|---|
| Homepage content | Supabase Postgres via Payload `homepage` |
| Page copy | Supabase Postgres via Payload |
| SEO/GEO fields | Supabase Postgres via Payload groups |
| CTA fields | Supabase Postgres via Payload groups |
| Affiliate partners/offers/placements | Supabase Postgres via Payload collections |
| Affiliate click logs | Supabase Postgres via `affiliateClicks` |
| CMS users/auth/roles | Payload Auth in Supabase Postgres |
| Media metadata | Payload `media` collection |
| Image/file binaries | Cloudflare R2 via S3 adapter |
| Secrets/API keys/tokens | Doppler/runtime env |
| Design source | `docs/figma/source` |
| Visual proof | `docs/screens` |
