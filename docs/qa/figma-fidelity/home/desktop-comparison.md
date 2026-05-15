# Homepage Desktop Comparison

| Check | Notes |
|---|---|
| Figma source file/screen name | Access Project Details / homepage prototype |
| Implemented route | `/` |
| Viewport | `1280x900`, `1920x1080` |
| Layout match notes | Figma homepage spine is active on `/`: Nav, Hero, TrustBar, IntentRouter, Desks, Atlas, DestinationsRail, DestinationGuide×3, Standard, Editorial, StayModule, Proof, Brief, EmailCapture, FAQ, Footer, NovaExitIntent |
| Typography match notes | Fraunces and Inter loaded from package font source |
| Color/token match notes | Core tokens mapped in `src/styles/tokens.css`; pure black backgrounds were normalized to `#0b0b0c`; small gold text on light surfaces uses accessible gold-ink `#7a6234` per drift log |
| Spacing match notes | Uses package container/gutter rhythm |
| Image/crop match notes | Unsplash references preserved as prototype-safe URLs |
| CTA placement match notes | Hero primary CTA, private brief CTA, destination CTAs, StayModule CTA, Brief CTA, EmailCapture CTA, and footer CTA follow package hierarchy |
| Mobile behavior match notes | See mobile comparison |
| Known differences | Source-package conflicts were resolved toward markdown/JSON authority: Desks now renders five tiles, Standard now renders seven criteria, Atlas now renders seven regional tiles. Remaining Impeccable live warnings are primarily the package's tracked-caps/meta-label style, tiny meta text, and Fraunces/Inter font identity. |
| Bruce-approved deviations | Pending approval in `docs/qa/FIGMA_DRIFT_APPROVAL_REQUEST.md` |
| Fidelity score | 94% package fidelity. Not marked 100% because conflict resolutions still need Bruce approval against the raw visual source. |
