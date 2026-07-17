# PORTFOLIO_MEDIA_INVENTORY.md

## Audit baseline

Repository: `DonFisto/vision-segmentation-autonomous-driving`  
Audited head: `b7ac0530c3fa7bafdd5dfdc64f1bcd1f7f204358`

Binary dimensions and file sizes could not be reliably extracted through the text-oriented GitHub connector. They must be measured after the assets are downloaded during Phase 2. This limitation is recorded rather than guessed.

## Media policy

- Real project output must be labelled as evidence.
- Conceptual diagrams must be labelled as diagrams.
- GIFs require static representative frames for PDF and reduced-motion users.
- Captions must describe only what is visibly and technically supported.
- Do not crop out legends, overlays, track IDs, occupancy colors, or ego-position indicators.

---

## Priority ranking

### Highest priority

1. `assets/AD_Project_Demo.gif` — web hero or live-demo overview
2. `assets/AD_Mapping_Demo.gif` — mapping section and roadmap transition
3. `assets/demo_overlay.png` — print-ready semantic segmentation evidence
4. `assets/Segmentatation+Overlay+Tracking.png` — print-ready extraction/tracking evidence

### Missing high-priority captures

1. Depth Anything V2 colormap
2. Tracking + relative-depth fusion view
3. Free-space and obstacle masks
4. Local combined/static/dynamic occupancy layers
5. Clean accumulated combined/static/dynamic map frame
6. Optional Foxglove multi-panel debugging view

---

## CARLA input and general project overview

### `assets/AD_Project_Demo.gif`

- **Type:** GIF
- **Dimensions:** to be measured in Phase 2
- **File size:** to be measured in Phase 2
- **Animated:** yes
- **Evidence type:** real project demonstration
- **Verified existence:** README and commit history
- **Demonstrates:** a CARLA perception-stack demonstration; exact panels must be visually reviewed after download
- **Best use:** project-page hero or live-demo section
- **Homepage suitability:** high, provided the first frame is meaningful and loading is controlled
- **Project-page suitability:** high
- **PDF suitability:** not directly; requires a static representative frame
- **Responsive web:** use a `<video>` conversion when practical or retain optimized GIF with explicit dimensions and static poster
- **Reduced motion:** show poster/static frame
- **Cropping:** avoid until the full frame is inspected
- **Alt text draft:** “CARLA scene with live outputs from Daniel’s ROS2 autonomous-driving perception stack.”
- **Caption draft:** “Live CARLA demonstration of the modular perception pipeline.”
- **Caption caveat:** Do not enumerate depth, fusion, or mapping panels unless they are visibly present in the selected frame.
- **Replacement priority:** retain; optimize and create static fallback
- **Higher-quality source needed:** optional, if the GIF is low-resolution or too large

---

## Semantic segmentation

### `assets/demo_overlay.png`

- **Type:** PNG
- **Dimensions:** to be measured in Phase 2
- **File size:** to be measured in Phase 2
- **Animated:** no
- **Evidence type:** real project output
- **Verified existence:** README and repository blob
- **Demonstrates:** semantic segmentation overlay
- **Subsystem:** SegFormer-B0 / Cityscapes-19 scene parsing
- **Homepage suitability:** medium
- **Project-page suitability:** high
- **PDF suitability:** high
- **Responsive web:** high; create WebP/AVIF derivatives while preserving the PNG source
- **Cropping:** acceptable only if semantic classes and scene context remain clear
- **Required visible details:** segmentation colors and underlying CARLA scene
- **Alt text draft:** “CARLA urban scene with a Cityscapes-19 semantic segmentation overlay.”
- **Caption draft:** “Cityscapes-19 scene parsing using SegFormer-B0, trained and refined for CARLA urban scenes.”
- **Caption caveat:** Do not claim numerical segmentation accuracy.
- **Replacement priority:** use directly
- **Higher-quality source needed:** only if current resolution is insufficient for A4 print

---

## Object extraction and tracking

### `assets/Segmentatation+Overlay+Tracking.png`

- **Type:** PNG
- **Dimensions:** to be measured in Phase 2
- **File size:** to be measured in Phase 2
- **Animated:** no
- **Evidence type:** real project output
- **Verified existence:** README and commit history
- **Demonstrates:** semantic output with object extraction/tracking overlays
- **Subsystem:** semantic connected-component extraction and temporal tracking
- **Homepage suitability:** medium
- **Project-page suitability:** high
- **PDF suitability:** high
- **Responsive web:** high
- **Cropping:** avoid cropping track labels or bounding boxes
- **Required visible details:** object boxes, class labels, and any persistent IDs
- **Alt text draft:** “CARLA scene with semantic segmentation, extracted object boxes, and tracking overlays.”
- **Caption draft:** “Selected Cityscapes object classes are extracted from the semantic mask and associated over time using class-consistent IoU tracking.”
- **Caption caveat:** Do not call this a learned object detector.
- **Filename note:** source filename contains the typo `Segmentatation`; copy to a clean website asset name rather than renaming the source repository asset during migration.
- **Replacement priority:** use directly
- **Higher-quality source needed:** optional if labels are too small in print

---

## Monocular depth

### Current status

- **Dedicated asset found:** no
- **Code/documentation evidence:** yes
- **Expected live topic:** `/perception/depth/colormap/compressed`
- **Model:** Depth Anything V2 Small
- **Recommended new capture:** a representative CARLA frame beside its relative-depth colormap
- **Web suitability target:** high
- **PDF suitability target:** high
- **Required caption caveat:** larger/smaller values must be described according to the implementation convention, and depth must be labelled relative rather than metric
- **Alt text draft:** “CARLA RGB frame beside the Depth Anything V2 relative-depth colormap.”
- **Replacement priority:** high
- **Daniel action:** provide a static screenshot or permit extraction from a suitable demo frame

---

## Object-depth fusion

### Current status

- **Dedicated asset found:** no
- **Code/documentation evidence:** yes
- **Expected data:** tracked boxes associated with relative-depth statistics
- **Expected topic:** `/perception/fused_objects`
- **Recommended new capture:** tracking overlay paired with a compact rendered table or Foxglove JSON panel showing track ID and relative-depth statistics
- **Web suitability target:** high
- **PDF suitability target:** high
- **Required visible details:** persistent track IDs and clearly labelled relative depth
- **Alt text draft:** “Tracked CARLA objects with persistent IDs and associated relative-depth statistics.”
- **Caption draft:** “Persistent track IDs are associated with relative monocular-depth statistics for object-level scene understanding.”
- **Caption caveat:** bounding-box depth can contain background pixels; do not convert values to metres
- **Replacement priority:** high

---

## Free-space estimation

### Current status

- **Dedicated asset found:** no
- **Code/documentation evidence:** yes
- **Expected topics:**
  - `/perception/free_space_mask/compressed`
  - `/perception/obstacle_mask/compressed`
  - `/perception/free_space_status`
- **Recommended new capture:** RGB/semantic context plus free-space and obstacle masks
- **Web suitability target:** high
- **PDF suitability target:** medium to high
- **Required visible details:** green free-space mask, red obstacle mask, and the ROI/status interpretation
- **Alt text draft:** “CARLA scene with semantic-depth free-space and obstacle masks.”
- **Caption caveat:** this is an image-space heuristic representation, not a metric bird’s-eye map
- **Replacement priority:** medium-high

---

## Navigation

### Current status

- **Dedicated asset found:** not identified
- **Code/documentation evidence:** two controller prototypes
- **Recommended media:** short web-only demonstration showing the vehicle responding to free-space status
- **PDF suitability:** low unless a frame clearly demonstrates the decision context
- **Caption caveat:** describe as reactive prototypes, not planning or production autonomy
- **Replacement priority:** medium

---

## Local occupancy

### Current status

- **Dedicated static asset found:** no
- **May appear in:** `assets/AD_Mapping_Demo.gif`
- **Code/documentation evidence:** yes
- **Expected topics:**
  - `/perception/local_occupancy_grid`
  - `/perception/local_static_obstacle_grid`
  - `/perception/local_dynamic_obstacle_grid`
  - `/perception/local_occupancy_debug/compressed`
- **Recommended new capture:** a clean local occupancy frame with legend:
  - green free
  - red static
  - orange dynamic
  - grey unknown
- **Web suitability target:** high
- **PDF suitability target:** high
- **Caption caveat:** projection is approximate and heuristic, not calibrated metric reconstruction
- **Replacement priority:** high

---

## Accumulated mapping

### `assets/AD_Mapping_Demo.gif`

- **Type:** GIF
- **Dimensions:** to be measured in Phase 2
- **File size:** to be measured in Phase 2
- **Animated:** yes
- **Evidence type:** real project demonstration
- **Verified existence:** README and commit history
- **Demonstrates:** CARLA navigation and mapping-stack behavior; exact frame contents require visual inspection after download
- **Subsystem:** local occupancy and CARLA-odometry-supported map accumulation
- **Homepage suitability:** medium
- **Project-page suitability:** high
- **PDF suitability:** not directly; extract one or more representative static frames
- **Responsive web:** use an optimized video derivative or controlled GIF
- **Reduced motion:** static poster
- **Cropping:** avoid if it removes the hero indicator, heading, map orientation, or color legend
- **Alt text draft:** “Animated CARLA demonstration of local occupancy and short-term accumulated mapping.”
- **Caption draft:** “Semantic occupancy evidence is accumulated in world coordinates using simulator-provided hero odometry.”
- **Caption caveat:** explicitly state that the map is not full SLAM
- **Replacement priority:** retain; create clean poster and print frame
- **Higher-quality source needed:** desirable if the GIF contains compression artifacts or small labels

### Recommended dedicated static mapping capture

- **Current status:** missing as a separately verified asset
- **Desired contents:**
  - accumulated combined map
  - static layer
  - dynamic layer
  - hero position and heading
  - legend
- **PDF use:** primary Page 4 mapping evidence
- **Replacement priority:** high

---

## Debugging and visualization

### Foxglove / rosbag

- **Dedicated media found:** no separately verified screenshot
- **Code/documentation evidence:** yes
- **Recommended new capture:** optional Foxglove workspace showing RGB, semantic overlay, depth, free space, occupancy, and status topics
- **Best use:** expandable technical gallery, not primary hero
- **PDF suitability:** low unless the layout is simplified
- **Caption caveat:** avoid tiny UI labels
- **Replacement priority:** low-medium

### ASCII visualization

- **Dedicated media found:** no
- **Documentation evidence:** `docs/timeline.md`
- **Best use:** optional development-story detail
- **Replacement priority:** low

---

## Architecture diagrams

### Current status

- **Dedicated repository diagram found:** no
- **Text architecture found:** README and runbook
- **Required asset:** new accessible inline SVG generated from typed node/edge data
- **Evidence type:** conceptual system diagram, not a result
- **Web suitability:** high
- **PDF suitability:** high
- **Requirements:**
  - left-to-right flow
  - solid primary data edges
  - dashed odometry edge
  - accessible title and description
  - no backwards arrows
  - readable mobile fallback
- **Replacement priority:** required in Phase 3

---

## Existing portfolio imagery

### `images/martial-arts.jpg`

- **Repository:** `DonFisto/DonFisto.github.io`
- **Type:** JPEG
- **Dimensions/file size:** to be measured in Phase 2
- **Evidence type:** personal-interest image
- **Use:** preserve only if Daniel wants a broader personal homepage
- **PDF use:** none
- **Privacy:** confirm continued public use
- **Replacement priority:** preserve pending confirmation

### `images/project1.jpg`

- **Referenced by:** current `index.html`
- **Status:** missing / broken reference in audit
- **Use:** none
- **Replacement:** authentic autonomous-driving media
- **Priority:** remove broken reference during migration

### `images/project2.jpg`

- **Referenced by:** current `index.html`
- **Status:** missing / broken reference in audit
- **Use:** none
- **Replacement:** verified LiDAR media only after a separate evidence audit
- **Priority:** remove or replace during migration

---

## Phase 2 media actions

1. Download all four verified robotics assets.
2. Record exact width, height, frame count, duration, and file size.
3. Visually inspect what each GIF actually shows.
4. Generate:
   - optimized web derivative
   - static poster
   - high-resolution print frame
5. Copy assets into clean names under `public/media/autonomous-driving/`.
6. Preserve the original filenames in provenance metadata.
7. Ask Daniel for missing depth, fusion, occupancy, and mapping captures.
8. Do not block the Astro foundation on missing media; use honest placeholders.
9. Block final PDF release if primary result panels still use misleading conceptual graphics.
