# Homepage Figma Source Reference

| Field | Value |
|---|---|
| Figma package | `docs/figma/source` |
| Screen/source files | `src/app/App.tsx`, `src/app/components/Nav.tsx`, `src/app/components/Hero.tsx`, `src/app/components/TrustBar.tsx`, `src/app/components/IntentRouter.tsx`, `src/app/components/Desks.tsx`, `src/app/components/Atlas.tsx`, `src/app/components/DestinationsRail.tsx`, `src/app/components/DestinationGuide.tsx`, `src/app/components/Standard.tsx`, `src/app/components/Editorial.tsx`, `src/app/components/StayModule.tsx`, `src/app/components/Proof.tsx`, `src/app/components/Brief.tsx`, `src/app/components/EmailCapture.tsx`, `src/app/components/FAQ.tsx`, `src/app/components/Footer.tsx`, `src/app/components/NovaExitIntent.tsx` |
| Token source | `docs/figma/source/docs/design-tokens.json` |
| Implemented route | `/` |
| Active implementation | `src/components/figma-home/FigmaHomepage.tsx` wired from `/src/app/(frontend)/page.tsx` |
| Payload source | Metadata still reads `homepage` seed/Payload fallback; visual component stack is currently source-package driven and not yet fully prop-mapped to Payload fields |

The raw source package is preserved unchanged for future visual comparison. Production route `/` now renders the copied Figma homepage stack, with canonical route, accessibility, token, affiliate-safety, and package-conflict adjustments logged in `docs/qa/FIGMA_DRIFT_APPROVAL_REQUEST.md`.
