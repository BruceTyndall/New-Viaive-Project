# VIAIVE Design Context

This file exists so Impeccable and future agents load the real VIAIVE design package instead of treating the project as undocumented. The canonical package remains `docs/figma/source/docs/`; this is a root-level bridge, not a replacement.

## Canonical Package Files

- `docs/figma/source/docs/DESIGN_SYSTEM.md`
- `docs/figma/source/docs/COMPONENT_LIBRARY.md`
- `docs/figma/source/docs/PAGE_ARCHETYPE_SPECS.md`
- `docs/figma/source/docs/ROUTE_TO_TEMPLATE_MAP.md`
- `docs/figma/source/docs/CMS_FIELD_MAPPING.md`
- `docs/figma/source/docs/RESPONSIVE_BEHAVIOR.md`
- `docs/figma/source/docs/IMAGE_ASSET_DIRECTION.md`
- `docs/figma/source/docs/INTERACTION_MOTION_SPEC.md`
- `docs/figma/source/docs/SEO_GEO_CONTENT_BLOCK_SPEC.md`
- `docs/figma/source/docs/AFFILIATE_MODULE_DESIGN_SPEC.md`
- `docs/figma/source/docs/ACCESSIBILITY_SPEC.md`
- `docs/figma/source/docs/IMPLEMENTATION_HANDOFF.md`
- `docs/figma/source/docs/design-tokens.json`
- `docs/figma/source/docs/components.json`
- `docs/figma/source/docs/routes.json`
- `docs/figma/source/docs/cms-fields.json`
- `docs/figma/source/docs/assets-manifest.json`

## Visual System

The VIAIVE system is Digital Stone & Paper: warm paper surfaces, stone borders, solid offset shadows, square corners, restrained gold accents, editorial type, and image-led travel authority. Primary surfaces must not use pure white or pure black. Shadows are solid offsets, never blurred elevation.

## Tokens

- Paper: `#F9F7F2`
- Paper alt: `#F4F1EA`
- Stone: `#1a1a1a`
- Stone alt: `#0b0b0c`
- Stone mid: `#4A4A4A`
- Gold: `#c8a96a`
- Gold soft: `rgba(200,169,106,0.40)`
- Muted: `#9aa3b2`

## Typography

Display type uses Fraunces. Body type uses Inter. Homepage hierarchy depends on scale, line height, and italic display emphasis. Do not replace the type system without explicit approval.

## Homepage Spine

The source homepage order is: Nav, Hero, TrustBar, IntentRouter, Desks, Atlas, DestinationsRail, DestinationGuide, Standard, Editorial, StayModule, Proof, Brief, EmailCapture, FAQ, Footer, NovaExitIntent.

## Hard Gates

Every implemented route needs Figma fidelity proof, Playwright screenshots, no old-project references, no lorem ipsum, token-loaded CSS, visible CTA paths, accessible interactive states, and a documented drift log for any source-package conflicts.
