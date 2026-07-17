# Apply Phase 5 from iPad or iPhone

## Upload

Upload this file to the repository root:

`phase5-release-payload.zip`

Create this workflow file:

`.github/workflows/apply-phase5.yml`

Paste the contents of the supplied `apply-phase5.yml`, then commit both files to `main`.

## Run the installation

Open:

**Actions → Apply Phase 5 release system → Run workflow**

Keep the branch set to `main`.

The workflow will install Playwright, generate and validate the four-page PDF, add the deployment workflow, archive the legacy HTML for rollback, and commit the completed release source.

## Activate the Astro site

After the installation workflow succeeds:

1. Open **Settings → Pages**.
2. Change **Source** to **GitHub Actions**.
3. Open **Actions → Deploy Astro portfolio to GitHub Pages**.
4. Run the workflow on `main`.

Do not delete the legacy root `index.html`; it remains the rollback path.
