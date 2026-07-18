# Phase 5 Deployment Runbook

## Part 1 — Apply and validate Phase 5

1. Upload `phase5-release-payload.zip` to the repository root.
2. Create `.github/workflows/apply-phase5.yml`.
3. Paste the supplied workflow contents.
4. Commit both files to `main`.
5. Run **Apply Phase 5 release system** from the Actions tab.
6. Confirm that the run succeeds and commits:
   - the PDF;
   - Playwright scripts;
   - release checks;
   - the Pages deployment workflow;
   - the updated lockfile.

The existing public site remains on the old branch-root deployment after this part.

## Part 2 — Switch GitHub Pages to Actions

1. Open the repository.
2. Open **Settings**.
3. Open **Pages** under **Code and automation**.
4. Under **Build and deployment**, change **Source** to **GitHub Actions**.

## Part 3 — Deploy

1. Open **Actions**.
2. Select **Deploy Astro portfolio to GitHub Pages**.
3. Select **Run workflow**.
4. Use branch `main`.
5. Wait for both `build` and `deploy` jobs to finish.

## Part 4 — Validate the live release

Open:

- `https://donfisto.github.io/`
- `https://donfisto.github.io/projects/autonomous-driving/`
- `https://donfisto.github.io/portfolio-print/`
- `https://donfisto.github.io/downloads/Daniel-Martinez-Cabeza-de-Vaca-Robotics-Portfolio.pdf`

Check the homepage and project page on iPad and iPhone, then open the PDF in Files or the browser and confirm that it contains four landscape pages.

## Rollback

To return temporarily to the legacy branch-root site:

1. Open **Settings → Pages**.
2. Change the source from **GitHub Actions** back to **Deploy from a branch**.
3. Select `main` and `/ (root)`.

The original `index.html` remains available for this purpose.
