# Apply the Phase 2 package from iPad or iPhone

The package is designed to preserve the currently deployed root `index.html`.

## Files supplied separately

1. `phase2-astro-foundation-payload.zip`
2. `apply-phase2.yml`

## Step 1 — Upload the payload

1. Open `DonFisto/DonFisto.github.io` in Safari.
2. Select **Add file → Upload files**.
3. Upload `phase2-astro-foundation-payload.zip` to the repository root.
4. Commit it directly to `main` with a message such as:
   `Stage Phase 2 Astro foundation payload`

## Step 2 — Create the one-time workflow

1. Select **Add file → Create new file**.
2. Enter this exact path as the filename:
   `.github/workflows/apply-phase2.yml`
3. Open the downloaded `apply-phase2.yml`, copy all its contents, and paste them into the editor.
4. Commit the workflow to `main`.

## Step 3 — Run it

1. Open the repository’s **Actions** tab.
2. Select **Apply Phase 2 Astro foundation**.
3. Tap **Run workflow** and select `main`.
4. Wait for the run to finish successfully.

The workflow will:

- verify that the ZIP does not overwrite `index.html`;
- extract the Astro source into the repository;
- remove the ZIP payload;
- run `npm ci` and `npm run validate`;
- commit and push the generated source files and lockfile.

## Step 4 — Confirm safety

After the workflow finishes:

- the current branch-root website should still be unchanged because `index.html` remains;
- the repository should now contain `src/`, `public/`, `scripts/`, `package.json`, and `package-lock.json`;
- do not change GitHub Pages from branch deployment to Actions yet.

The actual deployment switch belongs to Phase 5.
