# Apply Phase 4 from iPad or iPhone

Phase 4 integrates authentic project media while preserving the currently deployed legacy `index.html`.

## Files

1. `phase4-authentic-media-payload.zip`
2. `apply-phase4.yml`

## Step 1 — Upload the payload

1. Open `DonFisto/DonFisto.github.io` in Safari.
2. Confirm the selected branch is `main`.
3. Choose **Add file → Upload files**.
4. Upload `phase4-authentic-media-payload.zip` to the repository root.
5. Commit directly to `main`.

The ZIP must appear beside `index.html`, `package.json`, and `PORTFOLIO_SPEC.md`.

## Step 2 — Create the workflow

Create:

`.github/workflows/apply-phase4.yml`

Paste the complete content of `apply-phase4.yml` and commit it to `main`.

## Step 3 — Run the workflow

1. Open **Actions**.
2. Select **Apply Phase 4 authentic media integration**.
3. Choose **Run workflow**.
4. Keep branch `main`.
5. Run it.

The workflow will:

- verify the completed Phase 3 foundation;
- preserve the legacy root `index.html`;
- extract the Phase 4 source;
- download four verified assets from the pinned robotics-repository commit;
- generate static GIF posters and WebP derivatives;
- generate typed media dimensions;
- run Astro checks, the production build and Phase 4 integrity tests;
- remove the payload ZIP;
- commit the source and media.

## Expected result

The latest commit should be:

`Add Phase 4 authentic portfolio media`

The currently published branch-root website remains unchanged. Do not switch GitHub Pages to Actions yet; that belongs to Phase 5.
