# Portfolio specification

Updated 2026-09-17 for **Autonomous Driving Laboratory**. This supersedes the July technical endpoint, architecture, roadmap and visual composition. Historical PHASE_* files and the historical evidence annex remain records, not current publishing requirements.

## Authority and source integrity

Technical source of truth, in order:

1. Current autonomous-driving implementation.
2. Current autonomous-driving documentation.
3. Git history and recorded runtime evidence.
4. Portfolio evidence/spec documents.
5. Page copy.

Audited source: `DonFisto/vision-segmentation-autonomous-driving`, branch `feature/route-lane-association`, commit `42a250e34197b5c51ecca227a69f6c566df1de2c`. Documentation records implementation checkpoint `7b54639`; the following commits synchronize documentation. A branch name and a message schema do not establish implementation.

This specification governs privacy, ownership, accessibility, evidence integrity, deployment and presentation. Verify source again before advancing technical status. Do not roll content back to the July architecture to satisfy historical documents or scripts.

## Purpose and ownership

Two outputs: a responsive engineering portfolio and a standalone PDF of exactly four A4 landscape pages. Recruiters should understand the owner, scope, current stage and source access in ten seconds; an engineer should understand the two-stream architecture in one minute.

Owner: **Daniel Martínez-Cabeza de Vaca Guillén**.

Exact ownership statement: **Individual engineering project · ROS2 / CARLA research prototype**.

Approved academic/personal information:

- Dual degree in Mathematics and Computer Science, University of Murcia.
- Expected graduation June 2028.
- Erasmus exchange at Universität Stuttgart, academic year 2026/2027.
- Spanish — Native; English — C1; German — B1; French — Basic.
- Open to working-student roles and robotics or autonomous-driving opportunities.
- Public email `dmcvg@icloud.com` and GitHub `https://github.com/DonFisto`.

No phone number or current physical location. No Formula Student / LiDAR material without a separate evidence audit. `PublicProfile` and its public-contact allowlist control personal content. Do not publish arbitrary profile properties.

## Current positioning

**Autonomous Driving Laboratory** — lane perception, temporal mapping and global routing in CARLA + ROS2.

A modular individual prototype implementing perception-derived lane geometry, temporal lane tracking, rolling LaneMap and custom OpenDRIVE global routing. Do not call it a completed autonomous-driving system or imply closed-loop route following.

Current selected technologies: ROS2, CARLA, Python, OpenDRIVE, A*, SegFormer/PyTorch and Foxglove. Earlier semantic/depth/occupancy tooling is history and parallel capability, not the primary system narrative. Do not claim C++ as a core project technology.

## Architecture

Two parallel implemented streams:

```text
LOCAL PERCEPTION                         GLOBAL PRIVILEGED MAP
CARLA RGB + CameraInfo                   CARLA / OpenDRIVE
binary road-marking segmentation         directed road/lane topology
metric BEV lane geometry                 sampled directed routing graph
component / geometric / context filters  legal follow / lane-change edges
quadratic curve fitting                  ego + goal graph association
temporal tracking + hero odometry        A* production / Dijkstra reference
rolling perception-derived LaneMap       global RoutePlan
                   \                    /
                RoutePlan ↔ LaneMap association [NEXT; absent]
                behavior / maneuver planning [FUTURE; absent]
                local trajectory planning [FUTURE; absent]
                trajectory tracking / control [FUTURE; absent]
```

Diagram uses semantic HTML/CSS, with vector lines and selectable text in PDF. Desktop shows parallel streams; mobile stacks readable streams without shrinking a desktop diagram. Status and provenance must be expressed in words, not color alone. Solid flow is implemented; dashed integration is planned. Development status rail is an overview, not a claim of serial architecture.

### LaneMap

Local perception memory, not OpenDRIVE. Schema 2 currently emits zero or one rolling segment with boundaries, centerline samples, widths, curvature and confidence. Positions/headings publish in direct `carla_world`. IDs are local; revision is an observation integration/pruning counter; `globally_consistent=false`. Topology, turn and speed limit remain unknown. Held/inferred paths are not new map observations. With fresh odometry but insufficient support, empty segments are valid; stale odometry suppresses publication. Do not infer collision freedom or intersection recognition from current constant flags.

### RoutePlan

Global nominal map geometry, not a dynamically feasible trajectory. The explicit graph supports map-legal lane-follow and lateral transitions. Dijkstra is a reference/oracle; live search uses A*. Ego/goal-to-graph association exists; RoutePlan-to-LaneMap association does not.

Global IDs encode topology-edge provenance. Global revision fingerprints map name/OpenDRIVE, not local mapping state or graph parameters. Never associate global/local IDs or revisions by equality. The next layer needs geometric/timing/confidence semantics.

VALID and no-path INVALID publication exist. PARTIAL/BLOCKED constants do not establish behavior. Publication is reliable/transient-local/depth 1 while publisher lives; no goal survives restart. Rejected goals keep the previous accepted goal; failed ego association does not clear an old route. No route-age timeout.

### Frames

Production world geometry: direct `carla_world`; ego label `hero`. Local lane paths use forward-left geometry under `hero`; the name alone does not certify numeric compatibility with direct production TF.

Display only: `carla_world_viz → hero_viz`. Foxglove reflects copied global positions/orientations; local forward-left points are reattached without another mirror. No physical TF connects the reflected world bases. `_viz` topics are never planner inputs. Downstream signed-curvature interpretation remains unvalidated.

### Critical interfaces

| Topic | Type | Frame |
| --- | --- | --- |
| `/carla/hero_odom` | `nav_msgs/msg/Odometry` | `carla_world → hero` |
| `/perception/lane/tracked_centerline` | `nav_msgs/msg/Path` | `hero` |
| `/perception/lane/local_map/vector` | `autonomy_interfaces/msg/LaneMap` | `carla_world` |
| `/planning/goal` | `geometry_msgs/msg/PoseStamped` | `carla_world` |
| `/planning/route_plan` | `autonomy_interfaces/msg/RoutePlan` | `carla_world` |

Quality of tracked paths is carried separately in tracking_status JSON.

## Limits, observations and roadmap

Always disclose the absent association, behavior, trajectory and tracking/control layers for this pipeline. Earlier reactive controllers do not complete the route-to-actuation loop. CARLA odometry and OpenDRIVE are privileged inputs. Global graph stays static after startup; no dynamic-obstacle/prediction costs; goal orientation ignored. Confidence is heuristic, not calibrated probability. Lane projection assumes locally flat ground and configured camera orientation. Uncertain perception can produce empty LaneMap.

Runtime observations must identify scenario, provenance and limits. September observations were supplied to the robotics documentation refresh; raw bags/probes are not checked in. They were not reproduced for this portfolio. Graph counts, alignment errors and startup restoration are not performance guarantees. Never invent accuracy, FPS, latency, safety, collision rates or validation coverage. A screenshot is qualitative evidence, not correctness proof.

NEXT: define, implement and runtime-validate RoutePlan ↔ LaneMap geometric association, including local route window, projection, progress s, signed offset d, heading discrepancy, overlap/coverage, confidence, freshness/reset policy and explicit no-valid-association. All these concepts are planned, not a finalized interface.

THEN: simple local reference/trajectory planner with behavior responsibility → understandable baseline tracking/control → repeatable closed-loop evaluation. Do not imply MPC is implemented or the immediate next dependency. Independent localization/SLAM is deferred.

Historical semantic/depth/fusion/free-space/occupancy/accumulated mapping remains publishable as history with its limitations: relative depth, whole-box background contamination, heuristic occupancy projection, simulator odometry, no complete SLAM. Preserve phases 0–7; emphasize phases 8–11 and next phase 12. Exact dates come from current milestone/timeline records, not inference.

## Information architecture

Homepage: project hero with planning capture → development status → two-stream architecture → lane evidence → engineering themes → earlier foundations → case-study invitation → concise profile/contact. Project gets most visual weight.

Case study: overview and planning image → compact sticky section navigation → architecture → lane stack → LaneMap → global routing → next association boundary → interfaces/frames → runtime evidence → engineering decisions → evolution → limitations/roadmap/source checkpoint.

Header: Daniel Martínez / Project / Architecture / Profile / GitHub / Download PDF. Sticky 60–64px, mobile native disclosure, visible focus, Escape dismissal. A4 preview is a footer utility, not primary navigation. Anchor destinations clear both sticky bars.

## Visual and responsive system

One shared professional technical / academic research identity: warm off-white canvas and graphite text in Light; graphite canvas, warm near-white text and charcoal surfaces in Dark. Thin rules, restrained teal links/implemented status, blue local perception, violet global routing, amber next, neutral future. System is the default and follows live OS changes; explicit Light/Dark overrides persist locally. Selecting System removes the saved override. An early initialization prevents an explicit preference from flashing the wrong theme. A labeled native selector supports keyboard and mobile use. Print is always light and independent of web preference. Every semantic role uses CSS variables. System/locally available IBM Plex font stacks only; no remote fonts.

Approximate desktop H1 64–80px, H2 36–48px, body 17–19px, mono 12–14px. Max width 1312px, 32–40px desktop gutters, 96–112px major section spacing. Mobile uses 20px gutters, single reading flow, touch targets and reflowed architecture. No uncontrolled overflow; interface tables may scroll in a named keyboard-focusable region. Avoid card grids as default structure, decorative metrics/graphs, neon, glass, heavy shadows and gradients.

Preserve skip link, landmarks, headings, clear focus, contrast, meaningful alt/captions, reduced motion, no color-only status, proper tables and usable no-JS content. Do not claim full accessibility certification from screenshots.

## Media and performance

Planning PNG is the hero and social preview. Current lane photo is the static preview; lane GIF loads only through explicit play/load and provides a stop/static control. Reduced-motion preference retains static media and prevents GIF requests. Reserve dimensions, use lazy images below fold, preserve uncropped source context, offer full-resolution access.

All source assets are pinned to exact repository/branch/commit/path and SHA-256 in `public/media/autonomous-driving/provenance.json`. Record copy/derivative paths in media inventories. Generated WebP copies use reproducible ImageMagick conversion without cropping; originals remain available. Future hero animation/video can be specified through the shared media data model. No fabricated software output or generated technical screenshots.

## Print / PDF

Exactly four A4 landscape pages (297 × 210mm):

1. Identity, planning hero, current status, architecture summary, source/contact.
2. Vector two-stream architecture, lane perception/tracking and LaneMap.
3. Global routing, RoutePlan, contextual runtime observations, critical interfaces/frames.
4. Evolution, decisions, boundaries, NEXT/FUTURE and academic/contact profile.

Print has its own light editorial layout, independent of web constraints. Static authentic media only; vector architecture; readable links; no clipping or fifth page, headers/footers from browser, or blank pages. Screen preview reflows on smaller viewports; actual print retains exact sheets. Export checks sheet and descendant content bounds; PDF verification checks count, dimensions and equality with built copy.

## Implementation and deployment

Keep Astro, TypeScript, vanilla CSS, static output, GitHub Pages and Playwright PDF generation. No React/Vue/Svelte/Tailwind/component libraries. Typed content and reusable semantic components; minimal progressive-enhancement JavaScript.

Current deployment uses GitHub Actions; `deploy-pages.yml` remains manual workflow_dispatch. This redesign does not authorize running Actions or publishing. Preserve legacy root index.html and rollback/PHASE_* files; Astro dist is the deployment artifact. No commit, push or deployment during this review.

Run `npm ci`, `npm run check`, `npm run build`, `npm run verify`, and `npm run build:portfolio`. Capture/review three principal routes at 1440×900, 1024×1366 and 390×844; additionally test 360×800 and 320px navigation. Keep screenshots and probes in /tmp. Test keyboard, reduced motion, no preinteraction GIF download, anchors, local links/assets and print clipping. Record actual outcomes and evidence gaps before handoff.
