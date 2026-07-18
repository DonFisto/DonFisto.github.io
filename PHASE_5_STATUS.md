# Phase 5 Status

## Implemented by this package

- Playwright-based PDF export from `/portfolio-print/`
- exact four-page validation
- A4 landscape dimension validation
- public and built PDF validation
- downloadable PDF in the global navigation
- release-integrity verification
- pull-request/manual release checks
- manual GitHub Pages deployment workflow
- legacy `index.html` rollback copy under `legacy/index.html`

## Deployment model

The Astro site is deployed from the generated `dist/` artifact.

The original root `index.html` is retained in the repository for rollback, but it is not part of the deployed Astro artifact after GitHub Pages is switched to **GitHub Actions**.

## Remaining optional improvements

- Replace the two clearly labelled web placeholders when dedicated depth/fusion and free-space captures become available.
- Add a custom domain later if desired.
- Change the deployment workflow to run automatically on pushes to `main` after the first successful manual deployment.
