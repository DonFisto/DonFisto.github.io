# Daniel Martínez-Cabeza de Vaca Guillén — Portfolio

This repository is being migrated from a single static `index.html` to a maintainable Astro portfolio.

## Governance and evidence

Before changing public content, read:

- `PORTFOLIO_SPEC.md`
- `PORTFOLIO_APPROVED_DECISIONS.md`
- `PORTFOLIO_EVIDENCE_INVENTORY.md`
- `PORTFOLIO_MEDIA_INVENTORY.md`
- `PORTFOLIO_IMPLEMENTATION_PLAN.md`
- `PORTFOLIO_REVIEW_CHECKLIST.md`

Public technical claims must remain traceable to repository evidence or explicit user confirmation.

## Phase 2 status

The Astro foundation includes:

- a project-dominant general homepage;
- a detailed autonomous-driving project route;
- typed evidence-aware content data;
- a reusable dark engineering design system;
- accessible responsive navigation;
- honest media placeholders;
- a four-page A4 landscape print shell;
- a static 404 page;
- a foundation verification script.

The existing root `index.html` is intentionally preserved. If GitHub Pages currently publishes from the branch root, the old site remains live until deployment is deliberately switched to GitHub Actions in a later phase.

## Local development

Requires Node.js 22.12 or newer.

```bash
npm ci
npm run dev
```

## Validation

```bash
npm run validate
```

This runs Astro type checking, creates the production build, and verifies critical Phase 2 invariants.

## Routes

- `/`
- `/projects/autonomous-driving/`
- `/portfolio-print/`
- `/404.html`

## Media

Authentic project media will be integrated in Phase 4. Until then, placeholders are explicitly labelled and cannot be confused with real results.
