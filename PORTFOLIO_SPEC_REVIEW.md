# PORTFOLIO_SPEC_REVIEW.md

## Purpose

This document reviews `PORTFOLIO_SPEC.md` against the audited repositories. It proposes changes but does not modify the specification.

Audit baseline:

- robotics project: `b7ac0530c3fa7bafdd5dfdc64f1bcd1f7f204358`
- portfolio website: `035d88014eb0c9d1ec82d6d5c468c491e561d631`

Confidence values:

- **High:** directly supported by current code and/or current documentation
- **Medium:** supported but wording or scope is ambiguous
- **Low:** requires Daniel’s confirmation or a separate audit

---

## 1. Project title

### Current wording

> AUTONOMOUS-DRIVING PERCEPTION & LOCAL MAPPING

### Recommendation

Keep unchanged.

### Reason

It matches the repository title and accurately describes the current scope without claiming full autonomy or SLAM.

### Evidence

- `vision-segmentation-autonomous-driving/README.md`
- current mapping and timeline documentation

### Confidence

High

### Published-content impact

None

### Daniel confirmation required

No

---

## 2. Project summary

### Current wording

> A modular ROS2 perception and local-mapping stack that transforms CARLA camera data into semantic understanding, tracked objects, depth-aware fusion, navigation cues and accumulated occupancy maps.

### Proposed clarification

> A modular ROS2 perception and local-mapping stack that transforms CARLA camera data into semantic understanding, tracked objects, relative-depth fusion, navigation cues, local occupancy layers and short-term accumulated maps.

### Reason

“Relative-depth” is more precise than “depth-aware,” and “short-term accumulated maps” reflects the documented system while avoiding an implication of persistent SLAM mapping.

### Evidence

- `README.md`
- `docs/ros/runbook.md`
- depth/fusion and accumulated mapping milestones

### Confidence

High

### Published-content impact

Improves technical precision

### Daniel confirmation required

No

---

## 3. Ownership statement

### Current wording

> Individual engineering project · ROS2 / CARLA research prototype

### Recommendation

Keep unchanged.

Optional extended copy elsewhere:

> Designed and implemented as an individual engineering project.

### Reason

The current wording is concise and honest. The extended form should be treated as a user-confirmed statement rather than inferred solely from Git history.

### Evidence

Repository ownership and Daniel’s explicit portfolio instruction

### Confidence

Medium-high

### Published-content impact

Clarifies ownership

### Daniel confirmation required

Confirm preferred exact wording

---

## 4. Core technology list

### Current list

- ROS2
- CARLA
- PyTorch
- SegFormer
- Depth Anything V2
- OpenCV
- Linux
- Python
- C++

### Proposed list

Primary hero badges:

- ROS2 Humble
- CARLA
- Python
- PyTorch
- MMSegmentation
- SegFormer-B0
- Depth Anything V2
- OpenCV
- Linux

Secondary technical details:

- MMEngine
- MMCV
- NumPy
- Hugging Face Transformers
- `cv_bridge`
- `vision_msgs`

Remove **C++** from the project-specific core list.

### Reason

The audited project implementation is Python-based. C++ compiler dependencies do not constitute project implementation evidence. MMSegmentation is directly central and should be more visible than C++.

### Evidence

- source files under `scripts/`, `carla_tools/`, and `ros/ros2_ws/src/`
- `README.md`, technical stack
- `docs/setup.md`
- `environment.yml`

### Confidence

High

### Published-content impact

Important credibility correction

### Daniel confirmation required

No for project badges; C++ may remain in general personal skills after separate confirmation

---

## 5. System-scope claims

### Current scope

The listed capabilities are broadly correct.

### Proposed additions

Add:

- heuristic image-to-ground occupancy projection
- combined/static/dynamic occupancy and accumulated layers
- two reactive navigation prototypes
- compressed debug outputs for remote inspection

### Proposed qualification

Replace generic “tracking-by-detection” in detailed copy with:

> Class-consistent greedy IoU association with EMA box smoothing and persistent IDs.

Keep the simpler phrase in concise overview text.

### Reason

These additions capture verified engineering work while maintaining honest limitations.

### Evidence

- tracking source
- free-space and navigation nodes
- occupancy and mapping nodes
- runbook and milestone documentation

### Confidence

High

### Published-content impact

Adds specific engineering depth

### Daniel confirmation required

No

---

## 6. Architecture flow

### Current architecture

The current flow is substantially correct.

### Proposed final architecture wording

```text
CARLA RGB
  ├── SegFormer semantic segmentation
  │     └── Semantic object extraction
  │           └── Temporal tracking
  ├── Depth Anything V2 relative depth
  │
  ├── Tracking + relative depth
  │     └── Object-depth fusion
  │
  ├── Segmentation + relative depth
  │     ├── Free-space estimation
  │     │     └── Reactive navigation prototypes
  │     └── Local occupancy
  │
CARLA hero odometry + local occupancy layers
  └── Short-term accumulated local mapping
```

### Required implementation note

Internally, `object_detection_node` already performs IoU association and smoothing before the separate `tracking_node`. The public diagram should remain conceptually clean, but the codebase should later consider consolidating duplicated tracking responsibility.

### Reason

The diagram must distinguish semantic extraction from learned detection and must label depth as relative.

### Evidence

- README pipeline
- runbook
- `object_detection_node/detector.py`
- `tracking_node/tracking_node.py`

### Confidence

High

### Published-content impact

Improves accuracy

### Daniel confirmation required

No

---

## 7. Selected node labels

### Current labels

The eight labels in the specification are appropriate for the main architecture.

### Proposed clarification

Use these primary labels:

- `semantic_seg_node`
- `object_detection_node` with visible subtitle “semantic object extraction”
- `tracking_node`
- `depth_node`
- `fusion_node`
- `free_space_node`
- `local_occupancy_node`
- `local_mapping_node`

Show navigation controllers only in a secondary branch or callout:

- `reactive_navigation_node`
- `free_space_navigation_node`

### Reason

The main diagram should remain readable while preserving the distinction between two controller prototypes.

### Confidence

High

---

## 8. Selected ROS2 topics

### Current topics

- `/perception/tracks`
- `/perception/fused_objects`
- `/perception/free_space_status`
- `/perception/local_occupancy_grid`
- `/perception/accumulated_local_map`

### Recommendation

Keep unchanged.

Add `/carla/hero_odom` only as a dashed auxiliary-edge label, not as a sixth topic pill.

### Evidence

Runbook topic table and source nodes

### Confidence

High

---

## 9. Required limitations

### Current limitations

- relative depth
- bounding-box background contamination
- simulator-provided odometry
- not complete SLAM

### Recommendation

Keep all four and add one fifth prominent limitation:

> Local occupancy uses a heuristic image-to-ground projection rather than calibrated camera geometry and metric depth.

Optional technical-detail limitations:

- fixed map origin
- approximate timestamp alignment
- perception errors propagate downstream

### Reason

The heuristic projection is central to understanding map accuracy and is repeatedly documented.

### Evidence

Local occupancy and accumulated mapping milestones

### Confidence

High

### Published-content impact

Improves honesty and engineering context

---

## 10. Roadmap

### Current roadmap

1. Improve local mapping
2. Replace simulator ego motion
3. Map-based navigation

### Recommendation

Keep unchanged.

Clarify Stage 1 as:

> Rolling maps, timestamp-aware odometry integration, and calibrated or improved ground projection.

### Reason

Matches current documentation closely.

### Confidence

High

---

## 11. Contribution categories

### Current categories

- Model development
- Dataset engineering
- ROS2 system design
- Navigation and mapping

### Recommendation

Keep unchanged.

### Evidence

Repository structure and implemented tooling

### Confidence

High

---

## 12. “SegFormer-B0” badge

### Recommendation

Keep.

### Evidence

Base and refinement configs, timeline

### Confidence

High

---

## 13. “19 classes” badge

### Recommendation

Replace display text with:

> Cityscapes-19

or:

> 19 semantic classes

### Reason

“19 classes” alone lacks context.

### Evidence

Segmentation configs, class maps, milestone documentation

### Confidence

High

---

## 14. “12 nodes” badge

### Recommendation

Replace display text with:

> 12 principal nodes

### Reason

The README explicitly identifies 12 principal nodes, but the workspace contains additional support and historical packages. The unqualified number may be mistaken for a total package count.

### Evidence

README principal-node list

### Confidence

High

---

## 15. “3 map layers” badge

### Recommendation

Replace display text with:

> 3 occupancy layers

Add tooltip or subtitle:

> combined · static · dynamic

### Reason

The phrase “map layers” is ambiguous because both local and accumulated representations publish the same three-way structure.

### Evidence

Runbook and mapping source/documentation

### Confidence

High

---

## 16. Development trajectory

### Current wording

0. MMSegmentation fundamentals  
1. Cityscapes expansion  
2. ROS2 + CARLA integration  
3. Vehicle control pipeline  
4. Live recording and Foxglove  
5. Remote debugging visualization  
6. Repository refactor  
7. Depth, navigation and local mapping

### Proposed wording

0. MMSegmentation Fundamentals  
1. Cityscapes Expansion  
2. ROS2 + CARLA Integration  
3. CARLA Simulation Control  
4. ROS Bags & Foxglove Visualization  
5. ASCII Debug Visualization  
6. Repository Structuring  
7. Depth-Aware Navigation & Local Mapping

### Reason

The proposed wording aligns directly with `docs/timeline.md` and is easier to trace to evidence.

### Confidence

High

---

## 17. Website information architecture

### Current specification

The specification reads like a single-project website.

### Proposed replacement

Use two layers:

#### Root homepage

- concise identity and technical focus
- featured autonomous-driving project
- education and selected skills
- secondary verified projects
- contact links
- no deep architecture detail

#### Detailed route

`/projects/autonomous-driving/`

- project hero and ownership
- architecture
- engineering contributions
- development trajectory
- authentic outputs
- limitations
- roadmap
- repository/live demos
- optional technical appendix

### Reason

The existing repository is already a general personal portfolio. Replacing the root with a single-project microsite would discard unrelated content and reduce long-term usefulness.

### Evidence

`DonFisto.github.io/index.html`

### Confidence

High

### Daniel confirmation required

Confirm whether autonomous driving should dominate the root hero or remain the featured project below a general personal introduction

---

## 18. Astro requirements

### Recommendation

Keep unchanged:

- Astro
- TypeScript
- vanilla CSS
- static output
- minimal JavaScript
- accessible inline SVG
- Playwright export

### Reason

The current site is a single static HTML file with no package manager, so Astro offers maintainability without unnecessary client-side framework cost.

### Confidence

High

---

## 19. Four-page PDF

### Recommendation

Keep the exact four-page structure unchanged.

Add:

- the print route must share typed content with the web route
- GIFs must use static posters
- primary placeholders should block final release unless Daniel explicitly accepts them

### Confidence

High

---

## 20. Deployment assumptions

### Current situation

- user-site repository name: `DonFisto.github.io`
- no `package.json` verified
- no lockfile verified
- no GitHub Actions workflow verified
- no `CNAME` verified
- current site is a root-level `index.html`

### Proposed specification addition

> Configure Astro as a root user-site deployment with `site: "https://donfisto.github.io"` and root base path. Use GitHub Actions Pages deployment after Daniel confirms the repository Pages source setting.

### Reason

The repository naming convention implies a root user site, but the connector cannot inspect the GitHub Pages Settings screen.

### Confidence

Medium-high

### Daniel confirmation required

Confirm current Pages deployment source and whether a custom domain is planned

---

## 21. Existing personal content

### Proposed specification addition

> Preserve independently useful personal content during migration, but require separate evidence or Daniel confirmation for education dates, language levels, location, availability, contact details, and non-audited projects.

### Reason

The current site contains valuable general portfolio content but also user-dependent claims and broken project images.

### Confidence

High

---

## Items requiring Daniel’s confirmation

1. Preferred public name:
   - Daniel Martínez-Cabeza de Vaca
   - Daniel Martínez-Cabeza de Vaca Guillén
2. Exact ownership wording.
3. Whether the root homepage remains a broad personal portfolio or becomes project-led.
4. Whether to show the phone number publicly.
5. Whether to show the email address directly or use a safer contact link.
6. Current location wording, especially in view of Erasmus.
7. Expected graduation year and exact degree title.
8. Current language levels.
9. Current internship availability wording.
10. Whether the Formula Student / LiDAR card remains before a separate audit.
11. Current GitHub Pages source setting:
    - branch/root
    - GitHub Actions
12. Whether a custom domain is planned.
13. Whether Daniel can provide missing depth, fusion, free-space, local occupancy, and accumulated-map captures.
14. Whether the four-page PDF may ship with any placeholders if authentic media is still unavailable.
