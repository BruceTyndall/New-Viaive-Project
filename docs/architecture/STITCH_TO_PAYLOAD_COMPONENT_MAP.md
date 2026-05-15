# Stitch To Payload Component Map

| Frontend Component | Figma Source | Payload Fields | Routes Used | Fidelity Risk | Status |
|---|---|---|---|---|---|
| `FigmaHomepage` | `docs/figma/source/src/app/App.tsx` | `pages:home.blocks[]` or future `homepage` singleton composition | `/` | Medium: active visual stack is source-package driven, not fully Payload-prop mapped yet | Active on `/` |
| `Nav` | `components/Nav.tsx`, `COMPONENT_LIBRARY.md` | `navigation.brand`, `navigation.primaryLinks[]`, `navigation.ctaLabel`, `navigation.ctaHref` | `/`, future public routes | Low: canonical route hrefs patched from package conflicts | Active on homepage |
| `Hero` | `components/Hero.tsx` | `HeroBlock.eyebrow`, `headline`, `italicHeadline`, `lede`, `primaryCta`, `secondaryCta`, `image` | `/` | Low: visual source preserved | Active |
| `TrustBar` | `components/TrustBar.tsx` | `TrustBarBlock.items[]` | `/`, `/concierge` | Low | Active |
| `IntentRouter` | `components/IntentRouter.tsx` | `IntentRouterBlock.cards[]` | `/`, `/start-planning` | Low | Active |
| `Desks` | `components/Desks.tsx`, `COMPONENT_LIBRARY.md` | `desks.slug`, `name`, `eyebrow`, `lede`, `specialties[]`, `leadTime`, `priceFloor`, `ctaHref` | `/`, `/desks/*` | Medium: source rendered four cards, docs require five; active resolves to five | Active, conflict logged |
| `Atlas` | `components/Atlas.tsx`, `components.json` | `regions.slug`, `name`, `lead`, `destinations[]` | `/`, future `/atlas` | Medium: source rendered city mosaic, docs require regional hubs; active resolves to seven regions | Active, conflict logged |
| `DestinationsRail` | `components/DestinationsRail.tsx` | featured `destinations[]` | `/` | Low | Active |
| `DestinationGuide` | `components/DestinationGuide.tsx`, `data/destinations.ts` | `destinations` collection fields, `hotels[]`, `watch2026[]`, `sections[]`, `geoAnswer`, CTA fields | `/`, future `/destinations/*` | Medium: source content is local data until Payload mapping | Active |
| `Standard` | `components/Standard.tsx`, `cms-fields.json` | `viaiveStandard.intro`, `criteria[7]` | `/`, future `/about/standard` | Medium: source rendered four criteria, CMS requires seven; active resolves to seven | Active, conflict logged |
| `Editorial` | `components/Editorial.tsx` | `posts.slug`, `title`, `dek`, `author`, `publishedAt`, `cover`, `readMinutes` | `/`, future `/journal` | Medium: local prototype posts until Payload mapping | Active |
| `StayModule` | `components/StayModule.tsx`, `AFFILIATE_MODULE_DESIGN_SPEC.md` | `StayModuleBlock.title`, `lede`, `defaultDestination`, `disclosureText` | `/`, future `/destinations/*`, `/best/*` | Medium: demo-only until Stay22 runtime config exists | Active, env-gated |
| `Proof` | `components/Proof.tsx` | `proof.metrics[]`, `proof.quotes[]` | `/`, `/concierge` | Low | Active |
| `Brief` | `components/Brief.tsx` | `BriefBlock.title`, `lede`, `fields[]`, `submitLabel`; future `briefs` submit target | `/`, `/concierge`, `/start-planning` | Medium: local form state, no Payload submit wiring yet | Active visual form |
| `EmailCapture` | `components/EmailCapture.tsx` | `newsletter.title`, `lede`, `placeholder`, `consentText`, `successText` | `/`, future `/journal`, `/destinations/*` | Medium: local success state, no email provider submit wiring yet | Active visual form |
| `FAQ` | `components/FAQ.tsx` | `FAQBlock.title`, `items[]` | `/`, `/concierge`, future destination routes | Low: client accordion active; server JSON-LD still pending | Active |
| `Footer` | `components/Footer.tsx` | `footer.columns[]`, `legalLinks[]`, `disclosure`, `socialLinks[]` | all public routes | Low: canonical links patched | Active on homepage |
| `NovaExitIntent` | `components/NovaExitIntent.tsx` | `novaExitIntent.headline`, `italicHeadline`, `body`, `ctaLabel`, `ctaHref`, `dismissLabel`, `minDwellSec` | `/`, future `/destinations/*`, `/best/*` | Medium: visual modal active; Stay22 activation gated | Active, env-gated |
