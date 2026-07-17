# PORTFOLIO_SPEC.md

## 1. Purpose

This document is the permanent source of truth for the engineering portfolio built around:

**Autonomous-Driving Perception & Local Mapping**

Every implementation or revision agent must read this document before changing the website.

The portfolio has two equally important outputs:

1. A responsive web portfolio suitable for recruiters, engineers, internship applications, and technical interviews.
2. A self-contained four-page A4 landscape PDF suitable for attaching to applications.

The portfolio must communicate engineering ownership, technical scope, implemented architecture, authentic evidence, limitations, and future work quickly and honestly.

---

## 2. Project owner

**Name:** Daniel Martínez-Cabeza de Vaca Guillén

**Academic profile:** Dual degree in Mathematics and Computer Science

**University:** University of Murcia

**Expected graduation:** June 2028

**International study:** Erasmus exchange at Universität Stuttgart during the 2026/2027 academic year

**Languages:**
- Spanish — Native
- English — C1
- German — B1
- French — Basic

**Project ownership statement:**

> Individual engineering project · ROS2 / CARLA research prototype

The site must make clear that Daniel designed and implemented the project. It must not imply that he merely contributed to a larger team.

### Approved publishing decisions

- The autonomous-driving project should dominate the homepage.
- Personal and academic information should remain visible but secondary.
- A public email address may be shown.
- A phone number must not be shown.
- Current location must not be shown.
- Availability wording may combine:
  - open to working-student roles;
  - open to robotics and autonomous-driving opportunities.
- Formula Student / LiDAR content must remain hidden until it receives a separate evidence audit.
- The public domain is currently `https://donfisto.github.io`.
- A custom domain may be introduced later.
- Clearly labelled media placeholders are allowed during implementation.
- Clearly labelled placeholders may temporarily appear in the PDF until authentic replacement media is available.

Do not invent project dates. Add dates only after they are verified from repository history or explicitly supplied by Daniel.

---

## 3. Verified project positioning

### Primary title

> AUTONOMOUS-DRIVING PERCEPTION & LOCAL MAPPING

### Primary summary

> A modular ROS2 perception and local-mapping stack that transforms CARLA camera data into semantic understanding, tracked objects, relative-depth fusion, navigation cues, local occupancy layers and short-term accumulated maps.

### Repository

> https://github.com/DonFisto/vision-segmentation-autonomous-driving

### Core technologies

- ROS2 Humble
- CARLA
- Python
- PyTorch
- MMSegmentation
- SegFormer-B0
- Depth Anything V2
- OpenCV
- Linux

C++ may appear in Daniel's general skills, but it must not be presented as a core implementation technology of this specific repository.

Do not add technologies merely because they are common in robotics. Only list technologies demonstrably used by the project.

---

## 4. Verified system scope

The portfolio may describe the system in terms of the following implemented or documented capabilities:

- semantic segmentation;
- object extraction;
- tracking-by-detection;
- monocular relative-depth estimation;
- object-depth fusion;
- free-space estimation;
- reactive navigation cues;
- local occupancy generation;
- combined, static and dynamic occupancy layers;
- odometry-supported accumulated local mapping;
- ROS2 node-based modular integration;
- visualization and debugging workflows;
- CARLA data collection and dataset conversion;
- Cityscapes-19 label handling.

The portfolio must not describe the current system as full autonomous driving, production-ready navigation, metric 3D reconstruction, complete SLAM, or safety-certified robotics software.

---

## 5. Architecture source of truth

The main logical flow is:

```text
CARLA RGB
  ├── Semantic segmentation
  │     └── Object extraction
  │           └── Tracking
  ├── Monocular depth
  │
  ├── Tracking + depth
  │     └── Object-depth fusion
  │
  ├── Segmentation + depth
  │     ├── Free-space estimation
  │     │     └── Reactive navigation
  │     └── Local occupancy
  │
Hero odometry + local occupancy
  └── Accumulated local mapping
```

### Diagram rules

- Primary data flow must be unambiguously left-to-right.
- Solid connectors represent primary data flow.
- Dashed connectors are reserved for auxiliary information such as simulator-provided hero odometry.
- No backward-facing arrow may appear unless the software genuinely implements a feedback loop and the diagram explains it.
- Nodes, layers, and connectors must remain editable.
- Web implementation should use accessible inline SVG or structured HTML/CSS, not a flattened screenshot.
- The print version must preserve vector rendering.
- Small implementation labels may include:
  - `semantic_seg_node`
  - `object_detection_node`
  - `tracking_node`
  - `depth_node`
  - `fusion_node`
  - `free_space_node`
  - `local_occupancy_node`
  - `local_mapping_node`

### Selected topics

Only a small number of important ROS2 topics should be highlighted:

- `/perception/tracks`
- `/perception/fused_objects`
- `/perception/free_space_status`
- `/perception/local_occupancy_grid`
- `/perception/accumulated_local_map`

Avoid filling the page with every topic in the repository.

---

## 6. Required limitations

The following limitations must be visible and written plainly:

- Depth is relative, not metric.
- Bounding-box fusion can include background pixels.
- Accumulated mapping uses simulator-provided odometry.
- The current accumulated representation is not a complete SLAM system.
- Local occupancy uses a heuristic image-to-ground projection rather than calibrated camera geometry and metric depth.

Additional limitations may be added only if verified by repository documentation or supplied by Daniel.

Limitations are not a weakness of the portfolio. They demonstrate engineering judgment and should receive meaningful visual emphasis.

---

## 7. Required roadmap

### 01 — Improve local mapping

> Rolling maps, timestamp-aware integration and improved ground projection.

### 02 — Replace simulator ego motion

> Introduce visual odometry and evaluate drift and temporal alignment.

This stage should receive slight visual emphasis because it marks the transition from simulator-supported mapping to independently estimated ego motion.

### 03 — Map-based navigation

> Plan with accumulated occupancy and improve static/dynamic obstacle handling.

Do not present roadmap items as already implemented.

---

## 8. Engineering contributions

### Model development

Badge: `SegFormer-B0`

- SegFormer-B0 training and fine-tuning
- Cityscapes evaluation and CARLA adaptation
- Reproducible CUDA / Torch / MMCV environment

### Dataset engineering

Badge: `Cityscapes-19`

- CARLA collection and conversion tooling
- Cityscapes-19 label pipeline
- Filtering and rare-class sampling

### ROS2 system design

Badge: `12 principal nodes`

- Independent perception, fusion and control nodes
- Structured topics and compressed outputs
- Foxglove visualization and rosbag workflows

### Navigation and mapping

Badge: `3 occupancy layers`

- Semantic-depth free-space estimation
- Combined, static and dynamic occupancy layers
- Odometry-based accumulated local mapping

The badges are supporting metadata, not the visual focus.

### Relevant strengths line

> Relevant strengths: modular robotics software · system integration · sensor processing · debugging · reproducible environments · prototype validation

---

## 9. Development trajectory

The website may present the following eight verified phases:

0. MMSegmentation Fundamentals
1. Cityscapes Expansion
2. ROS2 + CARLA Integration
3. CARLA Simulation Control
4. ROS Bags & Foxglove Visualization
5. ASCII Debug Visualization
6. Repository Structuring
7. Depth-Aware Navigation & Local Mapping

Before publication, verify that later repository changes have not superseded this sequence.

The timeline must show engineering progression rather than simply listing features.

---

## 10. Website information architecture

The website must use a two-layer structure.

### Root homepage

The autonomous-driving project should dominate the first screen and visual hierarchy.

The homepage should include:

1. Daniel's name and concise technical positioning
2. Featured autonomous-driving project
3. Individual ownership statement
4. Repository and case-study links
5. Secondary academic information
6. Selected verified skills
7. Languages
8. Availability for working-student, robotics and autonomous-driving opportunities
9. Public email contact
10. Optional personal interests

The homepage must not show:

- phone number;
- current location;
- unaudited Formula Student / LiDAR claims.

### Detailed project route

Preferred route:

`/projects/autonomous-driving/`

It should contain:

1. Project hero / overview
2. System architecture
3. Engineering contributions
4. Development trajectory
5. Authentic system outputs
6. Limitations
7. Roadmap
8. Repository and live demos
9. Optional expandable technical details

The first screen must answer, within approximately ten seconds:

- What is the project?
- What did Daniel build?
- Which robotics problems does it address?
- Where is the repository?

The detailed project page should answer, within approximately one minute:

- How does the architecture work?
- Which parts did Daniel implement?
- What outputs exist?
- What are the current limitations?
- What comes next?

---

## 11. Four-page PDF structure

The generated PDF must contain exactly four A4 landscape pages:

1. Project overview
2. System architecture
3. Engineering contributions and development trajectory
4. System outputs, limitations and roadmap

### Print constraints

- Page size: 297 mm × 210 mm
- No default browser headers or footers
- No accidental blank pages
- No split cards
- No clipped SVG
- No animated media
- No navigation controls
- Background colors preserved
- URLs remain visible and clickable
- Typography remains legible when the page is viewed as a thumbnail
- Print-specific static frames replace GIFs or videos
- The architecture remains vector-based

---

## 12. Visual language

The visual identity should feel like a serious robotics research and engineering portfolio.

### Direction

- technical;
- minimal;
- precise;
- evidence-led;
- modern without appearing decorative;
- visually coherent with advanced engineering, robotics, research, and technical documentation.

### Avoid

- neon cyberpunk styling;
- gaming aesthetics;
- excessive gradients;
- glassmorphism;
- heavy shadows;
- animated particles;
- decorative circuit traces without meaning;
- oversized metrics with little context;
- generic stock photography;
- fake dashboards;
- unverified graphs.

### Color roles

Use CSS variables rather than scattered hardcoded values.

Suggested roles:

- primary background: dark navy;
- elevated background: slightly lighter navy;
- content surface: light grey or muted blue-grey;
- primary accent: turquoise;
- secondary accents:
  - purple for model development;
  - blue for data and perception;
  - orange for navigation or warnings;
  - green for mapping or validated outputs;
- primary text: near-white on dark surfaces;
- secondary text: sufficiently high-contrast cool grey;
- print text: dark neutral on light print surfaces where appropriate.

Exact colors should be selected and tested for contrast during implementation.

### Typography

- IBM Plex Sans for headings and body copy
- IBM Plex Mono for ROS topics, node names, labels, and metadata
- system fallbacks must be present
- body text must remain comfortable to read
- smallest print text must not be used to fit excessive content
- uppercase headings may be used selectively
- long passages should use sentence case

### Layout

- generous whitespace;
- consistent page margins;
- stable vertical rhythm;
- restrained corner radii;
- thin borders;
- aligned baselines;
- consistent card padding;
- no awkward line wrapping;
- no tiny topic pills;
- no clipped repository URLs.

---

## 13. Media policy

Authentic repository media is the strongest evidence in the portfolio.

Preferred assets:

- CARLA composite overview;
- semantic segmentation output;
- tracking output;
- monocular depth output;
- tracking-depth fusion output;
- local occupancy output;
- accumulated mapping output;
- short live-demo GIFs or videos.

### Rules

- Never fabricate screenshots.
- Never label a conceptual illustration as a real result.
- Placeholder visuals must be visibly and semantically marked as placeholders.
- Placeholders are allowed during implementation and may temporarily appear in the PDF.
- Every temporary PDF placeholder must state which authentic project capture should replace it.
- Captions must explain what is shown without overstating performance.
- GIFs and video should have static fallback frames.
- Print mode must always use static frames.
- Preserve important overlays, labels, and map legends.
- Optimize assets without making technical details unreadable.
- Add accurate alt text.

---

## 14. Content integrity rules

Never fabricate:

- numerical performance;
- accuracy;
- latency;
- frame rate;
- dates;
- team size;
- deployment status;
- hardware benchmarks;
- validation results;
- production readiness;
- safety claims;
- research affiliations;
- company involvement.

When information is uncertain:

1. inspect the repository;
2. mark it as unverified;
3. ask Daniel for confirmation;
4. keep it out of published copy until confirmed.

Use qualified wording such as:

- prototype;
- research-oriented;
- current implementation;
- relative depth;
- simulator-provided odometry;
- planned;
- future work;
- documented limitation.

---

## 15. Technical implementation requirements

### Preferred stack

- Astro
- TypeScript
- vanilla CSS
- static output
- accessible inline SVG
- Playwright for reproducible PDF export
- GitHub Actions
- GitHub Pages

Avoid adding React, Vue, Tailwind, or large UI libraries unless a later requirement clearly justifies them.

### Architecture principles

- content stored in structured data;
- reusable components;
- minimal client-side JavaScript;
- no unnecessary runtime dependencies;
- responsive by default;
- semantic HTML;
- build must fail on serious type or export errors;
- asset paths must work in production;
- print layout must be testable automatically.

### Suggested repository structure

```text
src/
  components/
  data/
  layouts/
  pages/
  styles/
  assets/
public/
  media/
  downloads/
scripts/
tests/
```

The implementation agent may adjust this structure when justified, but must document the reason.

---


## 16A. Contact and privacy requirements

The public site may display Daniel's email address.

The public site must not display:

- phone number;
- current location.

Contact details must be controlled through a typed allowlist so private fields cannot appear accidentally.

Availability may be expressed as:

> Open to working-student roles and robotics or autonomous-driving opportunities.

---

## 16. Accessibility requirements

The site must include:

- semantic landmarks;
- correct heading hierarchy;
- keyboard-accessible navigation;
- visible focus states;
- sufficient color contrast;
- meaningful alt text;
- accessible SVG titles and descriptions;
- reduced-motion support;
- touch-friendly controls;
- responsive text;
- no uncontrolled horizontal overflow;
- no color-only distinctions in architecture or status.

---

## 17. Performance requirements

The site should:

- be static by default;
- avoid unnecessary hydration;
- optimize images;
- reserve image dimensions to avoid layout shift;
- lazy-load below-the-fold media;
- preload only essential fonts or assets;
- use modern image formats where suitable;
- provide fallbacks;
- remain usable on mobile networks;
- avoid autoplaying heavy media.

---

## 18. Repository and deployment rules

Target repositories:

- project source: `DonFisto/vision-segmentation-autonomous-driving`
- portfolio deployment: `DonFisto/DonFisto.github.io`

Before making changes, inspect the current contents of both repositories.

Deployment should:

- use GitHub Actions;
- build on pushes to the main branch;
- run type and build checks;
- generate the PDF;
- verify the PDF exists;
- deploy the static artifact;
- use pinned or clearly specified runtime versions;
- preserve unrelated existing content.

---

## 19. Definition of done

The portfolio is ready when:

- Daniel’s individual ownership is immediately clear;
- the project scope is understandable in under one minute;
- the architecture is technically accurate;
- authentic outputs are clearly distinguished from diagrams;
- claims are supported by repository evidence;
- limitations are visible and honest;
- the repository is easy to access;
- the website works well on desktop and mobile;
- the autonomous-driving project clearly dominates the homepage;
- email is the only directly published contact field;
- phone number and current location are absent;
- unaudited Formula Student / LiDAR content is hidden;
- the four-page PDF works as a standalone attachment;
- no critical text is too small;
- no section is repetitive;
- the site feels like a real engineering project rather than a visual template;
- all builds and export scripts complete successfully;
- deployment is reproducible.

---

## 20. Change-control rule

Any major change to:

- project positioning;
- architecture;
- visual language;
- information structure;
- limitations;
- roadmap;
- framework;
- deployment strategy;

must update this specification in the same pull request.

Future agents must treat this document as authoritative unless Daniel explicitly overrides it.
