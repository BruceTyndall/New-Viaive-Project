# Affiliate Visual Editor Model

Stay22 is the only approved active affiliate provider for this kickoff. All other affiliate providers remain pending/inactive placeholders.

## Collections

- `affiliatePartners`
- `affiliateOffers`
- `affiliatePlacements`
- `affiliateClicks`

## Global

- `affiliateSettings`

## Rules

- Private tokens are not stored in Payload.
- Public partner IDs are runtime env values.
- Affiliate links are not hard-coded into page copy.
- Affiliate anchors must use `rel="sponsored nofollow"`.
- Pages render cleanly when no affiliate placement is selected.
- The homepage Stay22 module stays advisory-first until `STAY22_PARTNER_ID` is configured.
