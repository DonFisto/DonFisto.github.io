# Portfolio review checklist

Current scope: 2026-09-17, Autonomous Driving Laboratory. Historical phase checklists are not current architecture requirements. Complete these checks for every significant change/release; a planned release check does not authorize deployment.

## Evidence and privacy

- [ ] Current source branch/commit recorded; source outranks old portfolio documentation.
- [ ] Implemented / NEXT / FUTURE / historical capabilities are distinguishable in words.
- [ ] No invented accuracy, latency, FPS, safety, reliability or route-following claims.
- [ ] Runtime numbers retain Town10HD/probe/scenario context and recorded-evidence limitations.
- [ ] Raw probe absence and unreproduced runtime observations are explicit.
- [ ] Ownership says “Individual engineering project · ROS2 / CARLA research prototype”.
- [ ] Name, approved degree/university, June 2028 graduation, Stuttgart 2026/2027 and languages match approved decisions.
- [ ] Only email/GitHub public contact; no phone/current location or unaudited Formula Student/LiDAR claims.
- [ ] PublicProfile remains a typed allowlist.

## Architecture and scope

- [ ] Two parallel streams dominate: perception-derived LaneMap and privileged OpenDRIVE-derived RoutePlan.
- [ ] CameraInfo → road markings → metric BEV → filters → quadratic fits → temporal tracking + odometry → rolling LaneMap.
- [ ] OpenDRIVE → topology → sampled graph → legal follow/lateral edges → ego/goal graph association → A* (Dijkstra baseline) → RoutePlan.
- [ ] RoutePlan ↔ LaneMap association visibly NEXT and not implemented.
- [ ] Behavior, local trajectory planning and trajectory tracking/control visibly FUTURE and absent for this pipeline.
- [ ] RoutePlan is nominal global geometry, never a dynamically feasible trajectory.
- [ ] LaneMap is local, zero/one segment, confidence-aware and may legitimately be empty.
- [ ] Global/local ID and map-revision semantics are independent; planned association is geometric, never equality-based.
- [ ] Direct production positions/headings and display-only reflected copies are distinct.
- [ ] No physical TF between reflected world bases; `_viz` is not a planner input.
- [ ] Local hero forward-left convention and unresolved downstream curvature sign are qualified.
- [ ] Interfaces match current source, including tracking_status quality separate from Path.
- [ ] Simulator odometry, static graph, ignored goal orientation, heuristic confidence, absent dynamic costs remain disclosed.
- [ ] Earlier semantic/depth/fusion/free-space/occupancy work remains historical/parallel, with relative-depth and no-SLAM caveats.
- [ ] Timeline uses documented phases/dates through September; no invented early dates.

## Editorial and visual review

- [ ] Home answers owner, project, technical area, stage and source access within the first viewport.
- [ ] Planning image is substantial, uncropped, authentic and qualified.
- [ ] Home emphasizes project over personal profile.
- [ ] Clear hierarchy, generous consistent spacing, thin rules; no repeated generic cards.
- [ ] Semantic colors use tokens: blue local, violet global, amber next, teal implemented, neutral future.
- [ ] No decorative fake telemetry, metric claims, generated screenshots or stock imagery.
- [ ] No remote font dependency.
- [ ] Primary navigation is restrained; print preview remains a utility/footer link.

- [ ] Both Light and Dark reviewed at desktop/tablet/mobile; same geometry and hierarchy.
- [ ] System follows live OS preference; explicit Light/Dark persist across reload/navigation.
- [ ] Selecting System removes stored preference; early render honors explicit choice.
- [ ] Theme selector is labeled, keyboard accessible and usable at 320px.
- [ ] Print appearance and sheet sizes are independent of system/saved web theme.

## Media and performance

- [ ] Seven original asset checksums match pinned provenance; inventory paths/commit/branch current.
- [ ] Reproducible derivatives are documented and preserve aspect ratio, labels and overlays.
- [ ] Large lane GIF is absent from initial network requests, including below-fold scroll.
- [ ] Explicit play loads animation; stop restores static view; loading/error feedback works.
- [ ] Reduced-motion users receive static view without GIF load; changing preference stops playback.
- [ ] Dimensions reserved and below-fold static assets lazy; static content usable with JS disabled.
- [ ] Full-resolution originals accessible for diagnostic detail; captions do not overclaim visible fields.

## Browser QA and accessibility

Capture homepage, case study and print preview at 1440×900, 1024×1366, 390×844 under `/tmp/donfisto-portfolio-after/`. Additionally test 360×800 and 320px.

- [ ] No horizontal page overflow (named table regions may scroll).
- [ ] Architecture reflows into readable streams on mobile.
- [ ] Hero copy precedes media; comfortable body size and touch targets.
- [ ] Sticky header/local nav never cover anchor headings.
- [ ] Menu opens with keyboard, Escape restores focus, links dismiss it.
- [ ] Skip link, semantic landmarks, one H1 and logical heading levels.
- [ ] Visible focus, correct links, active local nav and accessible table headers.
- [ ] No duplicate IDs, broken images, missing local assets or console errors.
- [ ] Text/background contrast reviewed for all semantic colors; status not color-only.
- [ ] No important clipping/wrapping/cropping; review full pages and section screenshots, not just build status.
- [ ] Print screen preview reflows on mobile independently of fixed print sheets.
- [ ] Metadata title/description/canonical/OG/Twitter use current positioning and planning preview.

## PDF and build

- [ ] `npm ci`, `npm run check`, `npm run build`, `npm run verify` pass.
- [ ] `npm run build:portfolio` passes the complete existing pipeline.
- [ ] PDF exactly four pages, each 297×210mm A4 landscape within rounding tolerance.
- [ ] Sheet and descendant bounds show no clipping; no fifth/blank page or browser headers/footers.
- [ ] Page 1: project/planning image/status/source/contact.
- [ ] Page 2: two-stream vector architecture/lane chain/LaneMap.
- [ ] Page 3: routing/RoutePlan/contextual evidence/interfaces.
- [ ] Page 4: evolution/decisions/boundaries/NEXT/FUTURE/profile.
- [ ] All media static; architecture remains selectable/vector; source/contact links clickable.
- [ ] Public/built PDFs byte-identical; file size suitable for applications.
- [ ] Rasterize and visually inspect all four PDF pages after final export.
- [ ] Workflows remain GitHub Actions; manual deploy preserved, no workflow run/push/deploy triggered during review.
- [ ] Legacy root files and historical records preserved; no robotics-repository modifications.
- [ ] Final diff/status reviewed; handoff reports actual results and unresolved evidence gaps.
