# Portfolio redesign handoff — 17 September 2026

## State and scope

- Branch: `master`, HEAD `d7ab80b` (`Add Phase 5 PDF export and Pages deployment`).
- At the **start of the original redesign**, the worktree was clean, with no staged or unstaged changes. This is also recorded in the evidence inventory.
- At the start of this continuation, the substantial redesign was already present as expected unstaged changes/new files. It was preserved. This continuation added the bounded theme refinement, finished print/browser validation, fixed two QA findings and removed five unused spacing tokens.
- Final worktree: intentional redesign changes remain unstaged; new media/components/provenance/handoff remain untracked. Nothing was staged. Exact Git output appears below.
- `git remote -v` is empty. `git branch -vv` shows `master` without an upstream. No normal `origin` or tracking branch is configured; remotes were not changed.
- The robotics repository remains clean on `feature/route-lane-association` at `42a250e34197b5c51ecca227a69f6c566df1de2c`. It was read only. CARLA/ROS runtime was not rerun for this portfolio.
- No commit performed. No push performed. No deployment triggered. No GitHub Actions triggered. No credentials/account settings/unrelated repositories changed.

## Design rationale and themes

The site combines Style A's restrained professional technical presentation and substantial authentic media with Style C's editorial hierarchy, report-like diagrams, tables and explicit evidence boundaries. Typography, alignment, thin rules and whitespace carry the design. No decorative dashboard, generated screenshots, glow, glass, stock imagery or framework was introduced.

Light: warm off-white `#f4f3ef`, graphite text, quiet neutral surfaces, restrained blue/violet streams, teal implemented state and amber next state. Dark: graphite `#101419`, charcoal `#171c22`, warm near-white text, cool neutral secondary text and restrained semantic accents. Both share all geometry, typography, spacing, diagram structure and media treatment. Dark Foxglove captures retain an uncropped thin frame in light mode.

System is the default, implemented with `prefers-color-scheme`. Explicit Light/Dark selections set `html[data-theme]` and persist under `portfolio-theme`. System removes both the override and stored choice, restoring live OS following. A small early script applies saved explicit preferences before stylesheet paint. Native controls receive matching `color-scheme`. The labeled native selector appears in desktop navigation and the mobile disclosure, supports keyboard operation and stays the same size when changed. With JavaScript unavailable, content/navigation remain usable and CSS follows the device theme; the inactive theme selector stays hidden.

Print does not run the web theme initializer or read saved preferences. It retains an independent light layout and exact sheet sizing.

The responsive layout retains a 1312px maximum width, generous desktop gutters and section spacing, system/local font stacks, rectangular diagram outputs and 20px mobile gutters. The header remains compact and sticky; print preview is a footer utility. The case-study section navigation scrolls horizontally on narrow screens. Mobile diagrams reflow into readable streams.

## Information architecture and current content

**Homepage:** project identity and planning hero → development status rail → two-stream architecture → lane tracking evidence → engineering themes → earlier foundations → case-study invitation → concise academic profile/contact. Project content remains dominant. The initial viewport establishes owner, project, implementation stage and source/case-study access.

**Case study:** overview/planning image → sticky local navigation → architecture → lane perception/tracking → rolling LaneMap → global routing/RoutePlan → planned association → ROS2 interfaces and frame contracts → contextual runtime evidence → engineering decisions → development evolution → current limitations/roadmap/source checkpoint.

The current typed content replaces the July semantic/depth/occupancy endpoint with lane perception, BEV geometry, filtering/fitting, temporal tracking, odometry propagation, rolling LaneMap, custom OpenDRIVE topology/routing graph, legal transitions, Dijkstra reference, A* production search, ego/goal graph association and RoutePlan publication. Frame correction, display isolation and startup work are included. Earlier semantic/depth/free-space/occupancy work remains explicitly historical/parallel.

The semantic HTML architecture is vector-rendered and remains selectable in PDF. Labels, solid/dashed rules and separate stream headings convey meaning without color:

- LaneMap: local perception-derived rolling geometry and confidence; local IDs/revision semantics; insufficient evidence can legitimately produce an empty map.
- RoutePlan: global OpenDRIVE-derived nominal route, not a dynamically feasible trajectory. OpenDRIVE is privileged simulator/map information, never perception evidence.
- The two ID namespaces and revision meanings remain independent. Future association is geometric, not equality matching.
- RoutePlan ↔ LaneMap association is explicitly **NEXT / not implemented**. Behavior/maneuver planning, local trajectory planning and trajectory tracking/control are **FUTURE**.
- Production `carla_world` / `hero` remain separate from display-only `carla_world_viz` / `hero_viz`; no physical reflection TF is claimed. Visualization is not evidence of closed-loop autonomy.

Five production interfaces were checked against message definitions and publishers. Runtime numbers retain Town10HD/CARLA/context qualifications and source links. Development evolution preserves phases 0–7 and emphasizes documented August/September phases 8–11 and planned phase 12. Source links are pinned to the audited commit.

## Authentic media and exact provenance

Repository: `DonFisto/vision-segmentation-autonomous-driving`
Branch at capture: `feature/route-lane-association`
Source commit: `42a250e34197b5c51ecca227a69f6c566df1de2c`
Capture/review: 2026-09-17

Source bytes were read with `git show <commit>:<path>`. All seven originals were rechecked directly against that commit during final QA. The public and built copies also pass SHA-256 verification. Portfolio paths below include the filesystem `public` prefix.

| Source path | Portfolio path | SHA-256 |
| --- | --- | --- |
| `assets/AD_Planning_Photo.png` | `public/media/autonomous-driving/planning.png` | `10378591e1fe7e601b4644050d4da50b8c4753837d84f76a4ee0fd5de468e929` |
| `assets/AD_Lane_Detection_Photo.png` | `public/media/autonomous-driving/lane-detection.png` | `ccd6d89b49a03404847cbb60a29c92c2463640f0689fa7378300b356aa20a574` |
| `assets/AD_Lane_Detection_Demo.gif` | `public/media/autonomous-driving/lane-detection-demo.gif` | `ed7ec45fa3d6f91925d9162da57e8683ca8c77b5d1d416950bfae9791f0e5852` |
| `assets/AD_Project_Demo.gif` | `public/media/autonomous-driving/project-demo.gif` | `c680669c891ebd53276f33a5d731576a58b4364acb1b612b8294a3bc1e2f3d82` |
| `assets/Segmentatation+Overlay+Tracking.png` | `public/media/autonomous-driving/tracking-overlay.png` | `d3031fc2c9c652d0bfb7672a09254aee3ed918aeaa62c354aa7725bcd49c9671` |
| `assets/demo_overlay.png` | `public/media/autonomous-driving/segmentation-overlay.png` | `675cdbd82052211ac12c3513da7400bb2782e68b2dba38f37f420a05c41078ff` |
| `assets/AD_Mapping_Demo.gif` | `public/media/autonomous-driving/mapping-demo.gif` | `0d0716c6fdd51824f1664bccd3ac6c6ffd796a95e372754877f8dad0cf467bed` |

Current additions: planning PNG/WebP, lane diagnostic PNG/WebP and the 14,507,315-byte lane GIF. Historical originals remain available and subordinate. Historical WebP/poster derivatives were regenerated reproducibly. `scripts/generate-media-derivatives.mjs` documents uncropped ImageMagick conversions (quality 88 WebP, first-frame GIF posters). Provenance is recorded in the public media README, JSON, media inventory and generated metadata. No technical imagery was fabricated.

## Components, styles and maintenance

Created: `SystemArchitecture`, `ProjectMedia`, `StatusRail`, `ProfileSection`, `InterfaceTable`, `EvidencePanel`, `SectionNav`, `ThemeSelector`.

Removed/retired: `ArchitectureDiagram`, `BadgeList`, `ContributionCard`, `EvidenceMedia`, `MediaPlaceholder`, `RosTopicList`, `TechnicalDetailGrid`. Their old card/occupancy-oriented styling was replaced rather than layered underneath the redesign.

Refactored: `SiteHeader`, `SiteFooter`, `DevelopmentTimeline`; homepage, case study, print page; `BaseLayout`, `PrintLayout`; typed project content and media metadata. `SectionHeader` and `PdfPage` remain useful shared components. The 404 retains its content and gains the shared theme plus a focusable skip-link target.

Styles: rebuilt `tokens.css`, `global.css`, `components.css`, `print.css`. Theme values remain in semantic tokens; print has its dedicated token scope. Focus and control-border roles have their own contrast-appropriate values. No external fonts, theme library, UI framework or new package dependency. No temporary QA files were placed in the repository. Legacy rollback files and PHASE_* records are preserved; workflows/package files are unchanged.

Governance updated: `PORTFOLIO_SPEC.md`, `PORTFOLIO_APPROVED_DECISIONS.md`, `PORTFOLIO_EVIDENCE_INVENTORY.md`, `PORTFOLIO_MEDIA_INVENTORY.md`, `PORTFOLIO_REVIEW_CHECKLIST.md`, README and public media README. Current theme behavior is recorded in approved decisions/spec/checklist. Privacy decisions remain unchanged. The original July evidence inventory is retained under an explicitly superseded historical heading. The review checklist remains a reusable checklist; this handoff records the actual completed checks.

Verification changes:

- `verify-foundation.mjs`: current routes/content, two streams/NEXT/FUTURE, critical interfaces, metadata, static print, on-demand animation, local links/assets, seven media hashes, privacy allowlist and labeled System/Light/Dark options; rejects print dependence on web theme storage.
- `generate-media-metadata.mjs`: dimensions/bytes and exact provenance hash validation.
- `export-pdf.mjs`: checks content descendants against sheet bounds as well as overall overflow. No clipping test was weakened.
- `verify-pdf.mjs`: exactly four pages, A4 landscape within 1.5pt rounding tolerance, valid minimum file size and public/built byte equality.
- `verify-deployment.mjs`: unchanged; checks local release artifacts only. It does not deploy.

## Validation results

| Command/check | Actual result |
| --- | --- |
| Initial `npm ci --cache /tmp/donfisto-npm-cache --no-audit --no-fund` | Passed; 293 packages installed after retry with authorized network access |
| Initial `npm run check` / `npm run build` | Passed before original redesign |
| Final `npm run check` | Exit 0; 33 files, 0 errors, 0 warnings, 0 hints |
| Final `npm run build` | Exit 0; four static routes generated |
| Final `npm run verify` | Exit 0; architecture/content/privacy/assets/provenance invariants passed |
| `PLAYWRIGHT_BROWSERS_PATH=/tmp/donfisto-playwright npm run export:pdf` | Exit 0; export and clipping checks passed |
| `npm run verify:pdf` (executed by the full pipeline) | Exit 0; public/built PDFs each four A4 landscape pages, byte-identical |
| `npm run verify:deployment` (executed by the full pipeline) | Exit 0; local routes/PDF/privacy verified; no deployment |
| `PLAYWRIGHT_BROWSERS_PATH=/tmp/donfisto-playwright npm run build:portfolio` | Exit 0; complete pipeline passed, including after final cleanup |
| Final sequence `check` → `build` → `verify` → `build:portfolio` | All exit 0 |
| `git diff --check` | Exit 0; no whitespace errors |

The temporary Chromium 1228 installation was restored under `/tmp/donfisto-playwright`; the initial sandbox download failed DNS, then the authorized retry succeeded. No dependency/toolchain changes were needed. Pipeline output is at `/tmp/donfisto-final-pipeline.log`.

## Visual, functional and accessibility QA

Screenshots are in `/tmp/donfisto-portfolio-after/`. Homepage and project have Light/Dark viewport/full-page captures at 1440×900, 1024×1366, 390×844 and 360×800; print has one deterministic set at those sizes. Additional 320px checks passed. Twenty-five route/theme/viewport combinations passed overflow/route checks. Detail captures cover architecture, lane evidence, status, interfaces, association, evidence, evolution, boundaries, profile and footer. Review included desktop/tablet/mobile hierarchy, wrapping, uncropped media, stream/status clarity, spacing, menu/selector, tables and sticky navigation. The tablet CTA spacing issue was fixed and recaptured. No unresolved visual defect was found in the reviewed Chromium views.

- Both themes share layout and maintain readable text. Rendered text contrast checks passed 4.5:1 for normal text and 3:1 for large text on both web pages in both themes. Focus and control borders use dedicated semantic colors.
- System follows live OS changes. Explicit Light/Dark remain fixed against the opposite OS preference and survive reload/navigation. System removes storage and the HTML override. Sampled first painted frames honor saved explicit choices.
- Skip link keyboard activation now transfers focus to `main-content`. Semantic landmarks/headings, meaningful alt text, duplicate IDs, local asset/link resolution and table headings were checked.
- Native theme selection works with keyboard keys. Mobile menu opens with Enter; Escape dismisses it and restores summary focus. Controls remain usable at 320px.
- Project anchors clear both sticky bars. Mobile table and local-nav keyboard scrolling passed. Tables retain captions, scoped headers and a named focusable scrolling region.
- No page overflow, broken eager images or browser page errors in the responsive checks. No color-only architecture/status meaning. No-JS content/native navigation remain usable.
- Before activation, no GIF requests occurred during initial homepage/project load, below-fold scroll or theme switching. Explicit Play requested the authentic lane GIF. Stop restored the static image. Initial reduced motion prevented loading; switching to reduced motion removed active animation.
- Print screenshots were pixel-identical across OS theme changes with a saved explicit web preference. Print contains no animation and does not read web preference storage.
- SEO metadata was checked in rendered pages: current titles/descriptions, canonical URLs, OG title/description/planning image and Twitter `summary_large_image`.
- Current source/generated pages and extracted PDF text contain no stale primary title or immediate visual-odometry/map-navigation roadmap. Historical accumulated mapping wording is explicitly historical. No phone/current physical location/unaudited Formula Student or LiDAR claim was published; the typed contact allowlist remains email/GitHub only.

Browser QA used Chromium, not a cross-browser or assistive-technology certification. Temporary scripts/results are `/tmp/portfolio-qa.mjs`, `/tmp/portfolio-functional-qa.mjs`, `/tmp/portfolio-detail-qa.mjs`, `/tmp/portfolio-final-details.mjs`, and JSON records in the AFTER directory. The original before-captures were made before redesign, but those earlier temporary files did not survive into this continuation.

## PDF

`public/downloads/Daniel-Martinez-Cabeza-de-Vaca-Robotics-Portfolio.pdf`: **4 pages**, **1,993,362 bytes**. Each page is **841.91998 × 594.95996 pt**, Chromium's A4 landscape output within the checked tolerance (approximately 297 × 210mm). Public and built copies are byte-identical. No fifth/blank page; sheet/descendant bounds passed; all four rasterized pages were visually reviewed for clipping and reading order. Selectable text includes current LaneMap/RoutePlan/OpenDRIVE/NEXT/FUTURE content; media is static and the architecture remains vector-rendered.

1. Identity, planning hero, status, source/contact.
2. Two-stream architecture, lane chain and LaneMap.
3. Routing, RoutePlan, contextual evidence and critical interfaces.
4. Evolution, decisions, boundaries, NEXT/FUTURE and profile/contact.

## Remaining evidence questions

These are limitations of the robotics evidence, not failed portfolio checks:

- Raw runtime bags/probes and exact map/export identities are not checked into the September records; their observations were not reproduced here.
- No general lane-accuracy, throughput, calibrated-confidence, route-following or safety claim is established.
- Downstream signed LaneMap curvature convention still needs validation.
- Association schema and freshness/reset/sign policies remain planned.
- The remote ROS environment lacks a separately checked-in dependency export/lock; startup tooling alone does not establish fully reproducible dependencies.

Suggested commit **after review**, not performed: `feat: redesign autonomous-driving engineering portfolio`.

## Final Git output

`git diff --stat` below covers tracked changes only; the subsequent status includes new files. Nothing is staged.

### git diff --stat

```text
 PORTFOLIO_APPROVED_DECISIONS.md                    |    3 +-
 PORTFOLIO_EVIDENCE_INVENTORY.md                    |   59 +
 PORTFOLIO_MEDIA_INVENTORY.md                       |  358 +----
 PORTFOLIO_REVIEW_CHECKLIST.md                      |  402 ++---
 PORTFOLIO_SPEC.md                                  |  695 ++-------
 README.md                                          |   97 +-
 ...-Martinez-Cabeza-de-Vaca-Robotics-Portfolio.pdf |  Bin 5335610 -> 1993362 bytes
 public/media/autonomous-driving/README.md          |   49 +-
 .../autonomous-driving/mapping-demo-poster.png     |  Bin 113187 -> 113844 bytes
 .../autonomous-driving/project-demo-poster.png     |  Bin 86671 -> 86881 bytes
 .../autonomous-driving/segmentation-overlay.webp   |  Bin 117980 -> 66868 bytes
 .../media/autonomous-driving/tracking-overlay.webp |  Bin 386916 -> 223192 bytes
 scripts/export-pdf.mjs                             |   17 +
 scripts/generate-media-metadata.mjs                |   55 +-
 scripts/verify-foundation.mjs                      |  192 +--
 scripts/verify-pdf.mjs                             |    7 +-
 src/components/ArchitectureDiagram.astro           |  115 --
 src/components/BadgeList.astro                     |   12 -
 src/components/ContributionCard.astro              |   19 -
 src/components/DevelopmentTimeline.astro           |   24 +-
 src/components/EvidenceMedia.astro                 |   95 --
 src/components/MediaPlaceholder.astro              |   18 -
 src/components/RosTopicList.astro                  |   19 -
 src/components/SiteFooter.astro                    |   15 +-
 src/components/SiteHeader.astro                    |   45 +-
 src/components/TechnicalDetailGrid.astro           |   17 -
 src/data/autonomousDriving.ts                      |  640 ++------
 src/data/generatedMedia.ts                         |   44 +-
 src/data/personal.ts                               |    4 +-
 src/data/types.ts                                  |  154 +-
 src/layouts/BaseLayout.astro                       |   17 +-
 src/layouts/PrintLayout.astro                      |    2 +-
 src/pages/404.astro                                |    2 +-
 src/pages/index.astro                              |  145 +-
 src/pages/portfolio-print.astro                    |  120 +-
 src/pages/projects/autonomous-driving/index.astro  |  256 +--
 src/styles/components.css                          | 1624 +++++---------------
 src/styles/global.css                              |  163 +-
 src/styles/print.css                               |  581 ++-----
 src/styles/tokens.css                              |  114 +-
 40 files changed, 1423 insertions(+), 4756 deletions(-)
```

### git status --short

```text
 M PORTFOLIO_APPROVED_DECISIONS.md
 M PORTFOLIO_EVIDENCE_INVENTORY.md
 M PORTFOLIO_MEDIA_INVENTORY.md
 M PORTFOLIO_REVIEW_CHECKLIST.md
 M PORTFOLIO_SPEC.md
 M README.md
 M public/downloads/Daniel-Martinez-Cabeza-de-Vaca-Robotics-Portfolio.pdf
 M public/media/autonomous-driving/README.md
 M public/media/autonomous-driving/mapping-demo-poster.png
 M public/media/autonomous-driving/project-demo-poster.png
 M public/media/autonomous-driving/segmentation-overlay.webp
 M public/media/autonomous-driving/tracking-overlay.webp
 M scripts/export-pdf.mjs
 M scripts/generate-media-metadata.mjs
 M scripts/verify-foundation.mjs
 M scripts/verify-pdf.mjs
 D src/components/ArchitectureDiagram.astro
 D src/components/BadgeList.astro
 D src/components/ContributionCard.astro
 M src/components/DevelopmentTimeline.astro
 D src/components/EvidenceMedia.astro
 D src/components/MediaPlaceholder.astro
 D src/components/RosTopicList.astro
 M src/components/SiteFooter.astro
 M src/components/SiteHeader.astro
 D src/components/TechnicalDetailGrid.astro
 M src/data/autonomousDriving.ts
 M src/data/generatedMedia.ts
 M src/data/personal.ts
 M src/data/types.ts
 M src/layouts/BaseLayout.astro
 M src/layouts/PrintLayout.astro
 M src/pages/404.astro
 M src/pages/index.astro
 M src/pages/portfolio-print.astro
 M src/pages/projects/autonomous-driving/index.astro
 M src/styles/components.css
 M src/styles/global.css
 M src/styles/print.css
 M src/styles/tokens.css
?? PORTFOLIO_REDESIGN_HANDOFF.md
?? public/media/autonomous-driving/lane-detection-demo.gif
?? public/media/autonomous-driving/lane-detection.png
?? public/media/autonomous-driving/lane-detection.webp
?? public/media/autonomous-driving/planning.png
?? public/media/autonomous-driving/planning.webp
?? public/media/autonomous-driving/provenance.json
?? scripts/generate-media-derivatives.mjs
?? src/components/EvidencePanel.astro
?? src/components/InterfaceTable.astro
?? src/components/ProfileSection.astro
?? src/components/ProjectMedia.astro
?? src/components/SectionNav.astro
?? src/components/StatusRail.astro
?? src/components/SystemArchitecture.astro
?? src/components/ThemeSelector.astro
```

### Remotes / upstream

`git remote -v`: no output.

```text
* master d7ab80b Add Phase 5 PDF export and Pages deployment
```
