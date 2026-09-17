# Daniel Martínez — Engineering portfolio

Astro / TypeScript / vanilla CSS portfolio for **Autonomous Driving Laboratory**: lane perception, temporal LaneMap and OpenDRIVE global routing in CARLA + ROS2. Static output for GitHub Pages, with an independently designed four-page A4 landscape PDF.

## Governance

Read `PORTFOLIO_SPEC.md`, `PORTFOLIO_APPROVED_DECISIONS.md`, `PORTFOLIO_EVIDENCE_INVENTORY.md`, `PORTFOLIO_MEDIA_INVENTORY.md` and `PORTFOLIO_REVIEW_CHECKLIST.md` before changing claims. Current robotics source supersedes old portfolio technical scope. Historical PHASE_* files and the July evidence annex remain historical records.

Technical source was reviewed at `42a250e34197b5c51ecca227a69f6c566df1de2c` on `feature/route-lane-association`. Association is NEXT; behavior, trajectory planning and trajectory tracking/control are not implemented for this pipeline.

## Develop and verify

Node.js 22.12+:

```sh
npm ci
npx playwright install chromium
npm run dev
```

```sh
npm run check
npm run build
npm run verify
npm run build:portfolio
```

`build:portfolio` checks/types/builds the web, verifies current scope/privacy/local links/media provenance, exports the PDF with clipping checks, rebuilds to include that PDF, and checks exactly four A4 landscape pages and the release artifact. `verify:deployment` is a local artifact check; it does not contact GitHub or deploy.

If Chromium is installed in a non-default directory, set `PLAYWRIGHT_BROWSERS_PATH` for export/build commands. No browser path is hardcoded in source.

## Routes and content

- `/`: project-led portfolio, architecture, evidence, engineering themes, profile/contact.
- `/projects/autonomous-driving/`: full engineering case study.
- `/portfolio-print/`: responsive utility preview; print media uses exactly four fixed A4 landscape sheets.
- `/404.html`: static not-found page.
- `/downloads/Daniel-Martinez-Cabeza-de-Vaca-Robotics-Portfolio.pdf`: generated attachment.

Typed current project content lives in `src/data/autonomousDriving.ts`; approved personal fields use the `PublicProfile` allowlist. The architecture is semantic HTML/CSS, with vector lines/text in print. Minimal vanilla JS handles navigation and optional motion. No client framework or remote fonts.

## Authentic media

`public/media/autonomous-driving/provenance.json` pins seven original assets by repository, branch, commit, source/destination path and SHA-256. The planning image is the hero. The 14.5 MB lane GIF loads only on request; reduced-motion users keep the static diagnostic photo. Static-only print media is independent of motion playback.

Optional authoring tools (ImageMagick required locally, not in the release pipeline):

```sh
node scripts/generate-media-derivatives.mjs
npm run media:metadata
```

The provenance README and media inventory document uncropped derivatives and historical evidence. Do not use historical accumulated occupancy as a current vector LaneMap screenshot.

## Deployment and preserved history

GitHub Actions builds/deploys `dist`; `deploy-pages.yml` is manual (`workflow_dispatch`). No automatic deployment change is part of this redesign. The root `index.html`, legacy assets, PHASE_* documentation and historical application scripts/workflows are preserved for rollback and are not the current Astro artifact. Do not run historical apply-phase workflows against the redesigned source.

No commit, push or deployment is authorized as part of redesign review. Temporary browser captures/probes belong in `/tmp`.
