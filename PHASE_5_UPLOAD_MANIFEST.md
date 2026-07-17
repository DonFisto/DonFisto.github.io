# Phase 5 Upload Manifest

Upload to repository root:

- `phase5-release-payload.zip`

Create manually:

- `.github/workflows/apply-phase5.yml`

The payload installs:

- `package.json`
- `scripts/apply-phase5-source.mjs`
- `scripts/export-pdf.mjs`
- `scripts/verify-pdf.mjs`
- `scripts/verify-deployment.mjs`
- `.github/workflows/check.yml`
- `.github/workflows/deploy-pages.yml`
- `PHASE_5_STATUS.md`
- `PHASE_5_DEPLOYMENT_RUNBOOK.md`

The application workflow also creates:

- `legacy/index.html`
- `public/downloads/Daniel-Martinez-Cabeza-de-Vaca-Robotics-Portfolio.pdf`
- an updated `package-lock.json`
