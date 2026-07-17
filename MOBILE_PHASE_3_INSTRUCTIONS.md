# Apply Phase 3 from iPad or iPhone

Phase 3 adds the verified technical architecture and engineering narrative while preserving the currently deployed root `index.html`.

## Files you need

1. `phase3-technical-content-payload.zip`
2. `apply-phase3.yml`

## Step 1 — Upload the payload

1. Open `DonFisto/DonFisto.github.io` in Safari.
2. Make sure the selected branch is `main`.
3. Select **Add file → Upload files**.
4. Upload `phase3-technical-content-payload.zip` to the repository root.
5. Commit directly to `main`, for example with:
   `Stage Phase 3 technical content payload`

The ZIP must appear at the same level as `index.html`, `package.json`, and `PORTFOLIO_SPEC.md`.

## Step 2 — Create the one-time workflow

1. Select **Add file → Create new file**.
2. Enter this exact path:
   `.github/workflows/apply-phase3.yml`
3. Open `apply-phase3.yml`, copy all its contents, and paste them into GitHub.
4. Commit the workflow directly to `main`.

## Step 3 — Run it

1. Open the repository’s **Actions** tab.
2. Select **Apply Phase 3 technical portfolio content**.
3. Tap **Run workflow**.
4. Select `main` and confirm.
5. Wait for the run to finish successfully.

The workflow will:

- verify that Phase 2 is present;
- refuse to overwrite the legacy root `index.html`;
- extract the Phase 3 files;
- remove the uploaded payload ZIP;
- install the locked Node dependencies;
- run Astro checks, the production build, and Phase 3 integrity verification;
- commit and push the validated files.

## Step 4 — Expected result

The repository should contain these new components:

- `src/components/ArchitectureDiagram.astro`
- `src/components/RosTopicList.astro`
- `src/components/DevelopmentTimeline.astro`
- `src/components/TechnicalDetailGrid.astro`
- `PHASE_3_STATUS.md`

The Astro project and print route will contain the technical architecture, but the public website should still show the old branch-root site. Do not delete `index.html` and do not switch GitHub Pages to Actions yet.
