# PORTFOLIO_IMPLEMENTATION_PLAN.md

## 1. Objective

Migrate `DonFisto/DonFisto.github.io` from a single-file static portfolio to a maintainable Astro site while:

- preserving useful personal content;
- making the autonomous-driving project the strongest technical case study;
- publishing only evidence-supported claims;
- generating a reproducible four-page A4 landscape PDF;
- deploying through GitHub Pages;
- remaining fully static, responsive, accessible, and editable.

Audit baseline:

- robotics project: `b7ac0530c3fa7bafdd5dfdc64f1bcd1f7f204358`
- portfolio website: `035d88014eb0c9d1ec82d6d5c468c491e561d631`

---

## 2. Final information architecture

### Root homepage

Purpose: establish Daniel’s identity and direct recruiters to the strongest evidence within ten seconds.

Recommended content:

1. concise personal hero
   - name
   - Mathematics + Computer Science
   - robotics / autonomous systems focus
   - GitHub and project call-to-action
2. featured autonomous-driving project
   - one authentic visual
   - concise verified summary
   - “View engineering case study”
3. selected skills
   - project-relevant and separately verified
4. education
   - user-confirmed facts only
5. additional projects
   - only after project-specific evidence audits
6. personal interests
   - optional; retain martial-arts content if Daniel confirms
7. contact
   - privacy-conscious links

The root should not duplicate the full architecture, timeline, or limitations.

### Detailed autonomous-driving project page

Route: `/projects/autonomous-driving/`

Sections:

1. project hero and individual ownership
2. system architecture
3. engineering contributions
4. development trajectory
5. authentic system outputs
6. limitations
7. roadmap
8. repository and live-demo call-to-action
9. optional expandable technical notes

### Print presentation

Route: `/portfolio-print/`

Exactly four A4 landscape pages:

1. project overview
2. system architecture
3. engineering contributions and trajectory
4. authentic outputs, limitations, and roadmap

### Optional technical appendix

Do not create a separate route initially. Use accessible `<details>` components on the project page. Add a route later only if the page becomes overloaded.

---

## 3. Final route structure

```text
/                                      General portfolio homepage
/projects/autonomous-driving/          Detailed engineering case study
/portfolio-print/                      Print-only four-page composition
/downloads/Daniel-Martinez-Cabeza-de-Vaca-Robotics-Portfolio.pdf
/404.html                              Static not-found page
```

Optional future routes:

```text
/projects/                             Project index
/projects/lidar-perception/            After a separate evidence audit
```

### Canonical URLs

- root: `https://donfisto.github.io/`
- project: `https://donfisto.github.io/projects/autonomous-driving/`
- print route should use `noindex`
- PDF should be linked from root and project pages

### GitHub Pages configuration

Because this is a user-site repository:

```js
site: "https://donfisto.github.io"
base: "/"
output: "static"
```

Confirm the Pages source setting before deployment.

---

## 4. Proposed Astro repository tree

```text
.
├── astro.config.mjs
├── package.json
├── package-lock.json
├── tsconfig.json
├── README.md
├── PORTFOLIO_SPEC.md
├── PORTFOLIO_REVIEW_CHECKLIST.md
├── PORTFOLIO_EVIDENCE_INVENTORY.md
├── PORTFOLIO_MEDIA_INVENTORY.md
├── PORTFOLIO_SPEC_REVIEW.md
├── PORTFOLIO_IMPLEMENTATION_PLAN.md
├── public/
│   ├── favicon.svg
│   ├── media/
│   │   ├── personal/
│   │   │   └── martial-arts.jpg
│   │   └── autonomous-driving/
│   │       ├── project-demo.gif
│   │       ├── project-demo-poster.webp
│   │       ├── segmentation-overlay.png
│   │       ├── segmentation-overlay.webp
│   │       ├── tracking-overlay.png
│   │       ├── tracking-overlay.webp
│   │       ├── mapping-demo.gif
│   │       └── mapping-demo-poster.webp
│   └── downloads/
│       └── Daniel-Martinez-Cabeza-de-Vaca-Robotics-Portfolio.pdf
├── scripts/
│   ├── export-pdf.mjs
│   ├── verify-pdf.mjs
│   └── inspect-media.mjs
├── src/
│   ├── assets/
│   │   └── social-preview.svg
│   ├── components/
│   │   ├── global/
│   │   │   ├── SiteHeader.astro
│   │   │   ├── MobileNavigation.astro
│   │   │   ├── SiteFooter.astro
│   │   │   └── RepositoryLink.astro
│   │   ├── portfolio/
│   │   │   ├── PersonalHero.astro
│   │   │   ├── FeaturedProject.astro
│   │   │   ├── EducationSummary.astro
│   │   │   ├── SkillsSummary.astro
│   │   │   └── ContactPanel.astro
│   │   ├── project/
│   │   │   ├── ProjectHero.astro
│   │   │   ├── OwnershipMetadata.astro
│   │   │   ├── TechnologyList.astro
│   │   │   ├── ArchitectureDiagram.astro
│   │   │   ├── TopicPill.astro
│   │   │   ├── ContributionCard.astro
│   │   │   ├── DevelopmentTimeline.astro
│   │   │   ├── EvidenceMediaCard.astro
│   │   │   ├── MediaGallery.astro
│   │   │   ├── LimitationsPanel.astro
│   │   │   ├── Roadmap.astro
│   │   │   └── ProjectRepositoryCTA.astro
│   │   └── print/
│   │       ├── PdfPage.astro
│   │       └── PrintFooter.astro
│   ├── data/
│   │   ├── personal.ts
│   │   ├── projects.ts
│   │   ├── autonomousDriving.ts
│   │   └── evidence.ts
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── ProjectLayout.astro
│   │   └── PrintLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   ├── projects/
│   │   │   └── autonomous-driving.astro
│   │   └── portfolio-print.astro
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   ├── components.css
│   │   ├── project.css
│   │   └── print.css
│   └── utils/
│       ├── evidence.ts
│       ├── media.ts
│       └── urls.ts
├── tests/
│   ├── content-integrity.test.ts
│   ├── architecture.test.ts
│   ├── routes.spec.ts
│   ├── accessibility.spec.ts
│   ├── responsive.spec.ts
│   └── print.spec.ts
└── .github/
    └── workflows/
        ├── check.yml
        └── deploy-pages.yml
```

Do not create every optional file before it is needed. This tree defines responsibilities, not mandatory file proliferation.

---

## 5. Component responsibilities

### `SiteHeader`

- semantic site navigation
- root/project-aware links
- persistent repository access
- mobile menu trigger
- no unnecessary hydration except the small menu interaction

### `MobileNavigation`

- keyboard-operable disclosure
- focus-safe
- closes on navigation and Escape
- no framework dependency

### `PersonalHero`

- user-confirmed identity, education, and focus
- featured-project link
- avoids technical duplication

### `ProjectHero`

Inputs:

```ts
title
summary
ownership
technologies
repositoryUrl
heroMedia
```

Responsibilities:

- explain the project in ten seconds
- show authentic media or an explicit placeholder
- foreground repository and ownership

### `ArchitectureDiagram`

Inputs:

```ts
nodes
edges
groups
topics
notes
```

Responsibilities:

- render an accessible inline SVG
- preserve vector print output
- expose a readable mobile fallback
- use solid primary edges and dashed odometry edges

### `EvidenceMediaCard`

Inputs:

```ts
media
title
caption
evidenceStatus
limitations
```

Responsibilities:

- responsive image/video
- static fallback
- provenance metadata in source code
- accurate alt text
- optional caveat

### `DevelopmentTimeline`

- visual eight-phase progression
- DOM order remains linear
- no invented dates

### `LimitationsPanel`

- prominent, precise limitations
- visually different from roadmap
- no defensive marketing language

### `Roadmap`

- explicitly future work
- Stage 2 receives slight emphasis
- never reuses “implemented” styling

### `PdfPage`

- exact A4 landscape wrapper
- fixed page-break behavior
- screen preview and print output

---

## 6. Typed content-data structure

Use evidence-aware types so unverified copy is difficult to publish accidentally.

```ts
export type EvidenceStatus =
  | "verified-source"
  | "verified-docs"
  | "verified-media"
  | "verified-multiple"
  | "partial"
  | "unverified"
  | "contradicted"
  | "superseded";

export interface EvidenceReference {
  repository: "robotics" | "portfolio" | "user-confirmed";
  path?: string;
  symbolOrSection?: string;
  commit?: string;
  note?: string;
}

export interface PublishableClaim {
  id: string;
  text: string;
  status: EvidenceStatus;
  references: EvidenceReference[];
  caveat?: string;
  publishable: boolean;
  requiresDanielConfirmation: boolean;
}
```

Only claims with:

```ts
publishable === true
```

may be rendered by public components.

Additional interfaces:

```ts
export interface Technology {
  name: string;
  category: "primary" | "secondary" | "general-skill";
  projectVerified: boolean;
  claimId: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  implementationLabel?: string;
  group: "input" | "perception" | "fusion" | "spatial" | "behavior" | "mapping";
  kind: "process" | "input" | "output";
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
  style: "primary" | "auxiliary";
}

export interface RosTopic {
  name: string;
  messageType: string;
  stage: string;
  featured: boolean;
  claimId: string;
}

export interface Contribution {
  title: string;
  badge?: string;
  bullets: PublishableClaim[];
  accentRole: "model" | "data" | "systems" | "mapping";
}

export interface TimelinePhase {
  index: number;
  title: string;
  summary: string;
  references: EvidenceReference[];
}

export interface MediaAsset {
  id: string;
  sourceRepositoryPath: string;
  webPath: string;
  printPath?: string;
  kind: "image" | "animation" | "video" | "placeholder";
  width?: number;
  height?: number;
  alt: string;
  caption: string;
  caveat?: string;
  verified: boolean;
}

export interface Limitation {
  title: string;
  description: string;
  consequence?: string;
  references: EvidenceReference[];
}

export interface RoadmapItem {
  index: number;
  title: string;
  description: string;
  status: "planned";
  references: EvidenceReference[];
}

export interface ContactDetails {
  email?: string;
  phone?: string;
  github: string;
  location?: string;
  publicFields: Array<"email" | "phone" | "github" | "location">;
}
```

Add a test that fails when a rendered project claim is unverified or marked non-publishable.

---

## 7. CSS architecture

### Files

- `tokens.css`: colors, typography, spacing, radii, sizes, motion
- `global.css`: reset, base typography, landmarks, focus, utilities
- `components.css`: reusable cards, badges, buttons, media frames
- `project.css`: architecture, timeline, contribution layouts
- `print.css`: A4 pages only

### Token roles

```css
--color-bg-primary
--color-bg-elevated
--color-surface
--color-text-primary
--color-text-secondary
--color-accent
--color-accent-model
--color-accent-data
--color-accent-navigation
--color-accent-mapping
--color-border
--space-1 ... --space-8
--radius-sm
--radius-md
--radius-lg
--content-max
--print-width: 297mm
--print-height: 210mm
```

### Responsive breakpoints

Use content-driven media queries near:

- 390 px baseline
- 640 px
- 768 px
- 1024 px
- 1280 px

Do not design only at those exact widths.

### Motion

- motion is optional enhancement
- no autoplay-heavy animation
- honor `prefers-reduced-motion`
- GIFs switch to static posters for reduced-motion users when implementation allows

### Naming

Use component-scoped classes or a simple prefix convention. Avoid utility-class sprawl and avoid duplicate raw color values.

---

## 8. Accessible SVG architecture strategy

### Data source

Store nodes and edges in `autonomousDriving.ts`. Render them through `ArchitectureDiagram.astro`.

### SVG requirements

- `<title id="architecture-title">`
- `<desc id="architecture-description">`
- `role="img"`
- `aria-labelledby="architecture-title architecture-description"`
- semantic `<g>` groups by architecture layer
- visible group headings
- shapes plus labels, not color alone
- consistent arrow markers
- `stroke-dasharray` only for auxiliary/odometry edges
- no backwards arrows
- large enough text for web and print
- viewBox independent of pixel dimensions

### Mobile behavior

Primary strategy:

- preserve a minimum internal SVG width
- place it in an accessible horizontal scroll container
- include visible “Scroll architecture horizontally” hint on narrow screens
- make the container keyboard focusable
- provide a linear text summary immediately after the SVG

A separate stacked SVG may be added later only if necessary.

### Print behavior

- fixed viewBox and aspect ratio
- no scroll container clipping
- vector remains inline
- topic pills reduced to the five selected topics
- odometry note remains visible

### Tests

- expected node IDs exist
- expected edges exist
- auxiliary edge is dashed
- no node is orphaned
- title and description exist
- linear text summary matches the architecture data

---

## 9. Real-media strategy

### Current assets to use

| Source | Web role | Print role |
|---|---|---|
| `AD_Project_Demo.gif` | hero/live demo | static poster |
| `demo_overlay.png` | segmentation result | segmentation panel |
| `Segmentatation+Overlay+Tracking.png` | tracking result | tracking panel |
| `AD_Mapping_Demo.gif` | mapping demo | static mapping frame |

### Phase 2 processing

For each asset:

1. copy original into `public/media/autonomous-driving/source/` or retain provenance outside public output;
2. inspect dimensions, file size, animation duration, and content;
3. generate web derivatives;
4. generate a high-resolution print frame;
5. record dimensions in `autonomousDriving.ts`;
6. add accurate alt text and caption;
7. test crop and small-screen readability.

### Missing captures

Create honest placeholders for:

- depth
- fusion
- free space
- local occupancy
- clean accumulated map

Placeholders must say exactly what capture is needed.

### Formats

- photographs/output frames: WebP plus PNG fallback where technical overlays need lossless detail
- animations: optimized GIF or MP4/WebM with poster
- print: high-resolution PNG/WebP static frame
- architecture: inline SVG

---

## 10. Placeholder strategy

Create a reusable `MediaPlaceholder.astro`.

Required content:

- label: `PROJECT OUTPUT NEEDED`
- target subsystem
- required contents
- recommended capture resolution/aspect
- not rendered as fake road imagery
- neutral technical frame, not a conceptual “result”

Track unresolved placeholders in the media inventory.

Release rules:

- web beta may contain clearly labelled placeholders
- final PDF should not contain primary result placeholders unless Daniel explicitly approves
- no placeholder may be labelled “output,” “result,” or “demo” without the word “placeholder”

---

## 11. Four-page PDF strategy

### Route

`/portfolio-print/`

### Page 1 — Project overview

- title
- concise verified summary
- ownership
- Mathematics + Computer Science
- primary technologies
- authentic project poster
- repository URL and QR code
- no oversized 12-node or 4-layer statistics

### Page 2 — System architecture

- full vector architecture
- selected implementation labels
- five selected ROS topics
- dashed CARLA odometry input
- explicit relative-depth label
- note that visual odometry is future work

### Page 3 — Engineering contributions

- four contribution groups
- contextual badges:
  - SegFormer-B0
  - Cityscapes-19
  - 12 principal nodes
  - 3 occupancy layers
- eight-phase trajectory
- relevant-strengths line

### Page 4 — Evidence, limitations, roadmap

- semantic segmentation panel
- tracking/fusion or tracking panel
- mapping panel
- prominent limitations
- three-stage roadmap
- repository footer

### CSS

```css
@page {
  size: A4 landscape;
  margin: 0;
}

.pdf-page {
  width: 297mm;
  height: 210mm;
  break-after: page;
  overflow: hidden;
}
```

Use exact internal padding rather than browser margins.

### Output

`public/downloads/Daniel-Martinez-Cabeza-de-Vaca-Robotics-Portfolio.pdf`

Final public path:

`/downloads/Daniel-Martinez-Cabeza-de-Vaca-Robotics-Portfolio.pdf`

---

## 12. Playwright export strategy

### Script

`scripts/export-pdf.mjs`

### Lifecycle

1. verify production build exists or run build through the combined script;
2. start `astro preview` on a fixed local port;
3. poll `/portfolio-print/` until HTTP 200;
4. launch Chromium;
5. open the print route;
6. wait for:
   - `document.fonts.ready`
   - all image `complete` states
   - explicit `data-print-ready="true"`
7. export PDF with:
   - `printBackground: true`
   - `preferCSSPageSize: true`
   - `displayHeaderFooter: false`
   - zero margins
8. close browser;
9. stop preview process in `finally`;
10. verify output file exists and is non-empty;
11. run `verify-pdf.mjs`;
12. exit nonzero on failure.

### Validation

`verify-pdf.mjs` should check:

- exactly four pages
- A4 landscape page dimensions within tolerance
- file size above a minimum threshold
- no blank page heuristic where practical

Use `pdf-lib` or another small maintained PDF parser.

### Scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "check": "astro check",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "export:pdf": "node scripts/export-pdf.mjs",
    "build:portfolio": "npm run build && npm run export:pdf"
  }
}
```

Avoid recursively calling `build` from `export:pdf`.

---

## 13. Test strategy

### Unit/content tests

Framework: Vitest

- only publishable claims are rendered
- all public claims have references
- architecture node and edge data is complete
- featured topics match the approved list
- roadmap statuses are `planned`
- media assets have alt text and dimensions after processing

### Astro checks

- `astro check`
- production build
- no route collisions
- no broken imports

### Browser integration tests

Framework: Playwright

- root and project routes return successfully
- navigation links work
- repository link is correct
- PDF download exists after export
- no uncontrolled horizontal overflow
- mobile menu works by keyboard
- architecture scroll container is accessible

### Accessibility tests

Use `@axe-core/playwright` plus manual review:

- landmarks
- heading order
- accessible names
- focus states
- color contrast
- reduced-motion behavior
- SVG title and description

### Responsive visual tests

Capture at:

- 1440 × 1000
- 1024 × 768
- 768 × 1024
- 390 × 844

Review:

- hero order
- badge wrapping
- card widths
- timeline
- architecture
- captions
- contact privacy

### Print tests

- route contains exactly four `.pdf-page` elements
- CSS page size is A4 landscape
- no navigation
- no GIF visible
- static poster exists
- no `break-inside` violations
- PDF verifier reports four pages

### Manual acceptance

- ten-second recruiter test
- sixty-second technical-manager test
- mobile Safari review on iPad/iPhone
- PDF review in Files/Preview
- repository and QR links tested

---

## 14. Deployment strategy

### Workflows

#### `.github/workflows/check.yml`

Triggers:

- pull requests
- optional manual dispatch

Steps:

1. checkout
2. setup Node 22 LTS
3. `npm ci`
4. install Playwright Chromium when PDF/browser tests are included
5. `npm run check`
6. `npm run test`
7. `npm run build`
8. targeted Playwright checks

#### `.github/workflows/deploy-pages.yml`

Triggers:

- push to `main`
- manual dispatch

Permissions:

```yaml
contents: read
pages: write
id-token: write
```

Concurrency:

- group: pages
- cancel-in-progress: true

Steps:

1. checkout
2. setup Node 22 LTS with npm cache
3. `npm ci`
4. install Playwright Chromium
5. `npm run build:portfolio`
6. verify PDF exists
7. upload `dist/` through `actions/upload-pages-artifact`
8. deploy with `actions/deploy-pages`

### Manual GitHub setting

In repository settings:

- Pages → Build and deployment → Source: **GitHub Actions**

This must be confirmed before the workflow replaces branch-root deployment.

### Failure behavior

Deployment must stop when:

- type check fails
- site build fails
- PDF export fails
- PDF is not four pages
- required public asset is missing

---

## 15. Migration and preservation strategy

### Preserve before migration

Create a migration branch and retain:

- current `index.html`
- `images/martial-arts.jpg`
- prompt/specification documents
- all current copy in an archive file or Git history
- current deployed behavior until the Astro build is ready

### Content disposition

| Current content | Action |
|---|---|
| name and personal introduction | migrate after exact-name confirmation |
| Mathematics + Computer Science | migrate after wording confirmation |
| expected graduation | confirm, then migrate |
| language levels | confirm, then migrate |
| internship availability | confirm, then migrate |
| autonomous-driving card | replace with verified case-study teaser |
| Formula Student/LiDAR card | preserve as draft; do not publish unsupported claims |
| skills | separate general skills from project-verified technologies |
| martial arts | preserve if Daniel wants broader personal identity |
| email | preserve only after privacy confirmation |
| phone | remove by default unless explicitly approved |
| `project1.jpg` / `project2.jpg` | remove broken references and replace with verified media |

### Branch and commit sequence

1. create `portfolio-astro-migration`
2. commit Phase 1 documents
3. archive current site as `legacy/index.html` only if useful; Git history is otherwise sufficient
4. initialize Astro without deleting media
5. migrate root content
6. build project route
7. add media
8. add print/PDF
9. add tests and workflows
10. open pull request
11. validate preview/build artifacts
12. merge only after Daniel reviews desktop, mobile, and PDF

### Rollback

The pre-migration commit remains deployable. Reverting the migration PR restores the current static site.

---

## 16. Exact implementation order

### Step 1 — Preserve and inventory current site

- **Files:** current `index.html`, `images/`, Phase 1 documents
- **Output:** migration checklist and clean branch
- **Validation:** no current file lost
- **Blocking:** none

### Step 2 — Resolve blocking user confirmations

- **Files:** `personal.ts` draft, spec review
- **Output:** exact public name, privacy choices, homepage strategy
- **Validation:** Daniel approves wording
- **Blocking:** public identity/contact copy

### Step 3 — Initialize Astro

- **Files:** `package.json`, lockfile, Astro config, TypeScript config
- **Output:** static root page builds
- **Validation:** clean `npm ci`, `astro check`, `astro build`
- **Blocking:** none

### Step 4 — Configure user-site output

- **Files:** `astro.config.mjs`
- **Output:** root-base URLs
- **Validation:** built links resolve under `https://donfisto.github.io/`
- **Blocking:** custom-domain decision is non-blocking

### Step 5 — Create typed verified data

- **Files:** `evidence.ts`, `autonomousDriving.ts`, `personal.ts`
- **Output:** publishable claims separated from unverified drafts
- **Validation:** integrity tests
- **Blocking:** personal facts only

### Step 6 — Migrate global portfolio content

- **Files:** root layout/components/page
- **Output:** responsive general homepage
- **Validation:** compare all preserved content against migration table
- **Blocking:** privacy confirmations

### Step 7 — Build autonomous-driving project route

- **Files:** project layout and components
- **Output:** complete semantic content structure
- **Validation:** recruiter and technical review
- **Blocking:** none; placeholders allowed

### Step 8 — Build accessible architecture diagram

- **Files:** architecture data and SVG component
- **Output:** responsive vector diagram
- **Validation:** node/edge tests, mobile scroll, print check
- **Blocking:** none

### Step 9 — Inspect and integrate authentic media

- **Files:** `public/media/`, media data
- **Output:** optimized images, animation posters, provenance
- **Validation:** dimensions, alt text, reduced motion, print
- **Blocking:** missing dedicated captures are non-blocking for web beta

### Step 10 — Implement limitations and roadmap

- **Files:** project data/components
- **Output:** clear present/future distinction
- **Validation:** all items traced to evidence
- **Blocking:** none

### Step 11 — Implement four-page print route

- **Files:** print layout/page/styles
- **Output:** exact four-page HTML composition
- **Validation:** print preview and route tests
- **Blocking:** final Page 4 media quality

### Step 12 — Implement PDF export

- **Files:** export and verification scripts
- **Output:** reproducible PDF
- **Validation:** four pages, A4 landscape, no clipping
- **Blocking:** none after print route

### Step 13 — Add tests

- **Files:** Vitest and Playwright suites
- **Output:** repeatable quality checks
- **Validation:** clean test run
- **Blocking:** none

### Step 14 — Add CI and Pages deployment

- **Files:** GitHub Actions workflows
- **Output:** PR checks and production deployment
- **Validation:** successful workflow artifact
- **Blocking:** Pages source setting

### Step 15 — Final review

- **Files:** checklist and README
- **Output:** application-ready site and PDF
- **Validation:** every applicable checklist item
- **Blocking:** unresolved primary placeholders unless explicitly accepted

---

## 17. Risks and mitigations

### Incorrect technical claims

- **Risk:** marketing copy outruns implementation
- **Mitigation:** typed evidence status, publishability tests, evidence inventory

### Outdated milestone documentation

- **Risk:** earlier limitations are presented as current
- **Mitigation:** prefer current README/runbook/source; treat milestones chronologically

### Node-count ambiguity

- **Risk:** “12 nodes” is interpreted as a total package count
- **Mitigation:** always say “12 principal nodes”

### Duplicated tracking logic

- **Risk:** public architecture hides implementation duplication
- **Mitigation:** keep clean conceptual diagram; document refactor internally; avoid claiming an advanced tracker

### C++ ambiguity

- **Risk:** project badge appears inflated
- **Mitigation:** remove C++ from project technologies; keep it only as a separately evidenced general skill

### Missing or unsuitable media

- **Risk:** portfolio looks conceptual
- **Mitigation:** use verified current assets, honest placeholders, and request dedicated captures

### GIF-only evidence

- **Risk:** poor print and accessibility
- **Mitigation:** generate static posters and print frames; provide reduced-motion fallback

### Binary metadata unavailable through connector

- **Risk:** unknown dimensions and file sizes
- **Mitigation:** inspect assets locally in Phase 2 with a script; never guess

### Absolute local paths

- **Risk:** configs appear non-portable
- **Mitigation:** do not feature raw configs as turnkey; document setup; optionally parameterize later in project repo

### Large repository assets

- **Risk:** slow site and CI
- **Mitigation:** optimize derivatives, lazy-load, preserve source provenance without shipping unnecessary originals

### GitHub Pages path issues

- **Risk:** broken assets after Astro migration
- **Mitigation:** root user-site config, URL helper, production link tests

### Replacing the existing root site

- **Risk:** unrelated personal content disappears
- **Mitigation:** two-layer information architecture and migration table

### Astro migration risk

- **Risk:** current simple site becomes over-engineered
- **Mitigation:** static output, vanilla CSS, minimal hydration, restrained component count

### PDF pagination instability

- **Risk:** blank pages or clipping
- **Mitigation:** dedicated print route, fixed page wrappers, Playwright export, page-count verification

### Font-loading risk

- **Risk:** layout shift or PDF fallback fonts
- **Mitigation:** self-host or reliably load IBM Plex, await `document.fonts.ready`, use metric-compatible fallbacks

### Mobile architecture readability

- **Risk:** tiny SVG labels
- **Mitigation:** accessible horizontal scroll plus linear text summary

### Contact privacy

- **Risk:** phone and personal details are unnecessarily public
- **Mitigation:** explicit allowlist in `ContactDetails`; phone hidden by default

### Workflow misconfiguration

- **Risk:** Pages deployment fails or replaces current site prematurely
- **Mitigation:** PR checks, manual dispatch, confirm Pages source before merge

### Uncertain project dates

- **Risk:** commit dates become misleading project dates
- **Mitigation:** omit dates until Daniel confirms a meaningful range

### Unsupported performance claims

- **Risk:** credibility loss
- **Mitigation:** publish no FPS, latency, mIoU, or accuracy until tied to a reproducible evaluation artifact

---

## 18. Phase 2 readiness

### Is Phase 2 safe to begin?

**Yes, with limited blocking confirmations.**

The Astro foundation, typed evidence model, design system, route skeleton, and placeholder architecture can begin immediately.

### Blocking before public release

- preferred public name
- privacy choices for email/phone/location
- exact academic wording
- current internship-availability wording
- GitHub Pages source setting
- whether unsupported LiDAR content remains public

### Non-blocking for Phase 2 implementation

- custom domain
- missing depth/fusion/occupancy captures
- exact animation dimensions
- final social preview
- final PDF media selection

### Daniel should review before Phase 2

1. `PORTFOLIO_SPEC_REVIEW.md`
2. the “Items requiring Daniel’s confirmation” section
3. the proposed two-layer homepage/project architecture
4. removal of C++ from project-specific badges
5. clarification of:
   - 12 principal nodes
   - Cityscapes-19
   - three combined/static/dynamic occupancy layers
