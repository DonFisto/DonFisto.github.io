# PORTFOLIO_EVIDENCE_INVENTORY.md

## Audit baseline

This inventory records the evidence available for the portfolio at the following repository states:

- **Robotics project:** `DonFisto/vision-segmentation-autonomous-driving`
  - audited default-branch head: `b7ac0530c3fa7bafdd5dfdc64f1bcd1f7f204358`
  - latest audited commit message: `refresh setup and ROS2 pipeline runbook`
- **Portfolio website:** `DonFisto/DonFisto.github.io`
  - audited default-branch head: `035d88014eb0c9d1ec82d6d5c468c491e561d631`
  - latest audited commit message: `Add base guidelines for agent`

Commit dates are audit metadata only. They must not automatically be presented as project dates.

## Evidence-status vocabulary

Every claim below uses one status:

- **Verified by source code**
- **Verified by documentation**
- **Verified by media**
- **Verified by multiple sources**
- **Partially verified**
- **Unverified**
- **Contradicted**
- **Outdated or superseded**

A claim is publishable only when explicitly marked **Safe to publish: yes**.

---

## Executive evidence summary

The repository supports a strong and coherent public claim:

> A modular Python/ROS2 prototype in CARLA that progresses from SegFormer-B0 semantic segmentation through semantic object extraction, IoU-based temporal tracking, relative monocular depth, object-depth fusion, semantic-depth free-space estimation, reactive control prototypes, local occupancy layers, and CARLA-odometry-supported short-term map accumulation.

The system is not full SLAM, does not produce calibrated metric depth, and still uses heuristic image-to-ground projection and simulator-provided odometry.

---

## Core project claims

### Project title and scope

- **Proposed wording:** “Autonomous-Driving Perception & Local Mapping”
- **Status:** Verified by documentation
- **Evidence:**
  - `README.md`, title and project overview
  - `docs/README.md`, documentation scope
  - `docs/timeline.md`, current system state
- **Caveat:** “Autonomous driving” describes the application domain and prototype, not a production-complete autonomy stack.
- **Safe to publish:** yes
- **Daniel confirmation required:** no

### Project summary

- **Proposed wording:** “A modular ROS2 perception and local-mapping stack that transforms CARLA camera data into semantic understanding, tracked objects, relative-depth fusion, navigation cues, local occupancy layers, and short-term accumulated maps.”
- **Status:** Verified by multiple sources
- **Evidence:**
  - `README.md`, “Current Stack,” “Highlights,” and “Project Status”
  - `docs/ros/runbook.md`, pipeline and topic reference
  - source nodes under `ros/ros2_ws/src/`
- **Caveat:** Use “relative depth,” not metric distance. Use “short-term accumulated map,” not SLAM map.
- **Safe to publish:** yes
- **Daniel confirmation required:** no

### Individual ownership

- **Proposed wording:** “Individual engineering project · ROS2 / CARLA research prototype”
- **Status:** Partially verified
- **Evidence:**
  - repository owner and commit history are attributable to `DonFisto`
  - no repository evidence shows a project team
- **Caveat:** Git history alone cannot prove exclusive individual ownership of every idea or artifact.
- **Safe to publish:** yes, because Daniel explicitly supplied this positioning for the portfolio
- **Daniel confirmation required:** retain as a user-confirmed fact

---

## Languages, frameworks, and environment

### Primary implementation language

- **Proposed wording:** “Python is the primary implementation language.”
- **Status:** Verified by source code
- **Evidence:**
  - ROS2 nodes are Python modules using `rclpy`
  - training, evaluation, inference, data collection, filtering, and export utilities are Python scripts
- **Safe to publish:** yes

### C++

- **Proposed wording:** Do not list C++ as a core technology of this specific project.
- **Status:** Contradicted as a project-specific claim
- **Evidence:**
  - audited project source is overwhelmingly Python
  - no material C++ implementation was verified
  - compiler packages in `environment.yml` do not prove project code is written in C++
- **Caveat:** C++ can remain in Daniel’s general skills section when supported separately.
- **Safe to publish:** no, not as a project badge

### ROS2 distribution

- **Proposed wording:** “ROS2 Humble”
- **Status:** Verified by multiple sources
- **Evidence:**
  - `environment.yml`, `robostack-humble` channel
  - `docs/setup.md`, reference environment description
- **Safe to publish:** yes

### CARLA version

- **Proposed wording:** “CARLA 0.9.16”
- **Status:** Verified by documentation
- **Evidence:** `docs/setup.md`, environment assumptions
- **Caveat:** Simulator and Python API versions must match.
- **Safe to publish:** yes

### Python version

- **Proposed wording:** “Python 3.11 reference environment”
- **Status:** Verified by documentation and environment files
- **Evidence:**
  - `docs/setup.md`
  - `environment.yml`
- **Safe to publish:** yes

### Main verified libraries

- **Proposed wording:** “PyTorch, MMSegmentation, MMEngine, MMCV, OpenCV, NumPy, Hugging Face Transformers, `cv_bridge`, and `vision_msgs`.”
- **Status:** Verified by multiple sources
- **Evidence:**
  - `README.md`, technical stack
  - `docs/setup.md`
  - imports in source nodes
  - `environment.yml`
- **Safe to publish:** yes
- **Caveat:** Do not overload the hero section with every dependency.

### Reproducible environment

- **Proposed wording:** “A pinned Conda/RoboStack environment captures the ROS2, CUDA/PyTorch, MMSegmentation, CARLA API, and message dependencies.”
- **Status:** Verified by multiple sources
- **Evidence:**
  - `environment.yml`
  - `requirements.lock.txt`
  - `docs/setup.md`
- **Caveat:** `requirements.lock.txt` contains platform-specific references; public setup recommends `environment.yml`.
- **Safe to publish:** yes

---

## Model development

### Segmentation model family and variant

- **Proposed wording:** “SegFormer-B0”
- **Status:** Verified by source code and documentation
- **Evidence:**
  - `configs/cityscapes/segformer_b0_cityscapes.py`
  - refinement configs under `configs/cityscapes/`
  - `docs/timeline.md`
- **Safe to publish:** yes

### Cityscapes-19 support

- **Proposed wording:** “Cityscapes-19 semantic label space”
- **Status:** Verified by multiple sources
- **Evidence:**
  - `configs/cityscapes/segformer_b0_cityscapes.py`, `num_classes = 19`
  - refinement config `metainfo`
  - `object_detection_node/detector.py`, class map `0..18`
  - milestone documentation
- **Meaning:** The segmentation output uses the 19 Cityscapes train IDs: road through bicycle.
- **Safe to publish:** yes

### Training and fine-tuning

- **Proposed wording:** “SegFormer-B0 training, evaluation, and CARLA-oriented refinement.”
- **Status:** Verified by multiple sources
- **Evidence:**
  - `scripts/train_from_cfg.py`
  - `scripts/eval_mmseg.py`
  - `scripts/infer_trained.py`
  - `scripts/export_val_overlays.py`
  - Cityscapes and CARLA refinement configurations
  - `docs/timeline.md`
- **Caveat:** Do not publish mIoU or other numerical results until a specific checkpoint and evaluation record are selected and verified.
- **Safe to publish:** yes without numerical performance

### Model artifacts

- **Proposed wording:** “Model checkpoints are intentionally stored outside Git.”
- **Status:** Verified by documentation
- **Evidence:** `docs/setup.md`
- **Caveat:** Several configs contain absolute local paths and therefore require normalization before being presented as portable examples.
- **Safe to publish:** yes, only in technical documentation

---

## Dataset engineering

### CARLA collection tooling

- **Proposed wording:** “CARLA data collection tooling for general, pedestrian-heavy, sign-heavy, and vulnerable-road-user-heavy scenes.”
- **Status:** Verified by source code
- **Evidence:**
  - `carla_tools/collect_carla_cityscapes.py`
  - `carla_tools/collect_pedestrian_heavy_carla.py`
  - `carla_tools/collect_sign_heavy_carla.py`
  - `carla_tools/collect_vru_heavy_carla.py`
  - `carla_tools/batch_collect.py`
- **Safe to publish:** yes

### Cityscapes-format conversion

- **Proposed wording:** “CARLA semantic labels are prepared in a Cityscapes-19-compatible format.”
- **Status:** Verified by source code and documentation
- **Evidence:**
  - dataset tools under `carla_tools/`
  - `README.md`, highlights
  - Cityscapes class mappings in configs and nodes
- **Safe to publish:** yes

### Filtering and targeted sampling

- **Proposed wording:** “Dataset filtering and targeted sampling prioritize informative and rare traffic classes while preserving the validation set.”
- **Status:** Verified by source code
- **Evidence:**
  - `carla_tools/filter_cityscapes19_dataset.py`
  - `carla_tools/make_cityscapes_subset.py`
  - specialized collection scripts
- **Caveat:** “Rare-class sampling” should describe the tooling, not claim a measured performance gain.
- **Safe to publish:** yes

---

## ROS2 architecture and node count

### Four architectural layers

- **Proposed wording:** “The repository is organized around model development, dataset engineering, ROS2 perception, and navigation/mapping.”
- **Status:** Verified by documentation
- **Evidence:** `README.md`, architecture table
- **Safe to publish:** yes

### Twelve principal nodes

- **Proposed wording:** “12 principal ROS2 runtime nodes”
- **Status:** Verified by documentation
- **Evidence:** `README.md`, principal-node list:
  - `carla_bridge_node`
  - `semantic_seg_node`
  - `object_detection_node`
  - `tracking_node`
  - `depth_node`
  - `fusion_node`
  - `free_space_node`
  - `reactive_navigation_node`
  - `free_space_navigation_node`
  - `local_occupancy_node`
  - `local_mapping_node`
  - `carla_control_node`
- **Caveat:** This is not the total package or executable count. Supporting packages and historical/debug nodes also exist.
- **Safe to publish:** yes, only with the qualifier “principal”

### Total package/executable count

- **Proposed wording:** Do not publish a total count.
- **Status:** Partially verified
- **Evidence:** repository search identifies additional packages such as `detections_overlay_node` and historical/debug components.
- **Caveat:** The connector audit did not produce a canonical full tree count, and total package count is not useful to recruiters.
- **Safe to publish:** no

### Launch workflow

- **Proposed wording:** “The public runbook starts principal nodes in dependency order.”
- **Status:** Verified by documentation
- **Evidence:** `docs/ros/runbook.md`
- **Caveat:** No single consolidated launch file was verified during the audit.
- **Safe to publish:** yes in technical details; omit from hero copy

---

## Perception chain

### CARLA bridge

- **Proposed wording:** “A custom CARLA bridge publishes RGB images and simulator-provided hero odometry.”
- **Status:** Verified by multiple sources
- **Evidence:**
  - `carla_bridge_node/carla_bridge_node.py`
  - `docs/ros/runbook.md`
  - accumulated mapping documentation
- **Safe to publish:** yes

### Semantic segmentation node

- **Proposed wording:** “The segmentation node runs MMSegmentation inference on CARLA RGB frames and publishes a class-ID mask and compressed overlay.”
- **Status:** Verified by source code and documentation
- **Evidence:**
  - `semantic_seg_node/semantic_seg_node/seg_node.py`
  - `docs/ros/runbook.md`
- **Safe to publish:** yes

### Object extraction method

- **Proposed wording:** “Object boxes are extracted from selected Cityscapes semantic classes using morphology, connected components, and class-specific area thresholds.”
- **Status:** Verified by source code
- **Evidence:** `object_detection_node/object_detection_node/detector.py`
- **Caveat:** This is not a separate learned object detector.
- **Safe to publish:** yes

### Tracking method

- **Proposed wording:** “Class-consistent greedy IoU association with exponential moving-average box smoothing maintains persistent track IDs.”
- **Status:** Verified by source code
- **Evidence:** `tracking_node/tracking_node/tracking_node.py`
- **Details:** configurable IoU threshold, hit confirmation, miss tolerance, and EMA smoothing.
- **Safe to publish:** yes

### Duplicated tracking logic

- **Proposed wording:** Do not present the internal implementation as a perfectly clean single tracker without qualification.
- **Status:** Verified by source code
- **Evidence:**
  - `object_detection_node/detector.py` contains internal IoU association and smoothing
  - `tracking_node/tracking_node.py` performs a second tracking stage
- **Caveat:** The portfolio architecture can still show “object extraction → tracking,” but the implementation plan should flag consolidation as a code-quality improvement.
- **Safe to publish:** no as a positive claim; safe as an internal audit note

---

## Monocular depth and fusion

### Depth model

- **Proposed wording:** “Depth Anything V2 Small”
- **Status:** Verified by multiple sources
- **Evidence:**
  - `docs/setup.md`
  - `docs/milestones/depth_fusion_stack.md`
  - `depth_node/depth_node/depth_node.py`
- **Model identifier:** `depth-anything/Depth-Anything-V2-Small-hf`
- **Safe to publish:** yes

### Relative depth

- **Proposed wording:** “Monocular relative depth, not calibrated metric distance.”
- **Status:** Verified by multiple sources
- **Evidence:**
  - runbook
  - depth/fusion milestone
  - free-space and occupancy milestones
- **Safe to publish:** yes

### Object-depth fusion

- **Proposed wording:** “Tracked bounding boxes are associated with relative-depth statistics such as median, mean, minimum, and lower-percentile depth.”
- **Status:** Verified by documentation and source code
- **Evidence:**
  - `fusion_node/fusion_node/fusion_node.py`
  - `docs/milestones/depth_fusion_stack.md`
- **Output:** JSON in `std_msgs/msg/String` on `/perception/fused_objects`
- **Safe to publish:** yes

### Fusion limitation

- **Proposed wording:** “Full bounding-box crops can include background and occluding pixels.”
- **Status:** Verified by documentation
- **Evidence:** `docs/milestones/depth_fusion_stack.md`, limitations
- **Safe to publish:** yes

---

## Free space and navigation

### Free-space estimation

- **Proposed wording:** “Semantic segmentation and relative depth are combined into image-space free-space, obstacle masks, and navigation-oriented status.”
- **Status:** Verified by multiple sources
- **Evidence:**
  - `free_space_node/free_space_node/free_space_node.py`
  - `docs/milestones/free_space_estimation.md`
  - runbook
- **Safe to publish:** yes

### Free-space status

- **Proposed wording:** “The status summarizes left/center/right free and obstacle ratios and a recommended direction.”
- **Status:** Verified by source code and documentation
- **Evidence:** free-space node and milestone
- **Caveat:** This is a heuristic navigation abstraction, not a global planner.
- **Safe to publish:** yes

### Reactive navigation prototypes

- **Proposed wording:** “Two reactive control prototypes were implemented: a fused-object/depth baseline and a refined free-space-status controller.”
- **Status:** Verified by source code and documentation
- **Evidence:**
  - `reactive_navigation_node/.../reactive_navigation_node.py`
  - `free_space_navigation_node/.../free_space_navigation_node.py`
  - `README.md`
- **Caveat:** Only one controller should publish commands at a time.
- **Safe to publish:** yes

---

## Local occupancy and accumulated mapping

### Local occupancy representation

- **Proposed wording:** “Semantic/depth evidence is projected into a coarse vehicle-relative `nav_msgs/OccupancyGrid`.”
- **Status:** Verified by multiple sources
- **Evidence:**
  - `local_occupancy_node/local_occupancy_node/local_occupancy_node.py`
  - `docs/milestones/local_occupancy_mapping.md`
- **Caveat:** Projection is heuristic and is not calibrated metric 3D reconstruction.
- **Safe to publish:** yes

### Three local occupancy layers

- **Proposed wording:** “Three local occupancy layers: combined, static, and dynamic.”
- **Status:** Verified by multiple sources
- **Evidence:**
  - current local occupancy source
  - runbook topic table
  - accumulated mapping milestone
- **Safe to publish:** yes

### Three accumulated map layers

- **Proposed wording:** “Three accumulated layers: combined, static, and dynamic.”
- **Status:** Verified by multiple sources
- **Evidence:**
  - `local_mapping_node/local_mapping_node/local_mapping_node.py`
  - runbook topic table
  - accumulated mapping milestone
- **Safe to publish:** yes

### “3 map layers” badge

- **Proposed wording:** “3 occupancy/map layers”
- **Status:** Verified but ambiguous
- **Caveat:** The current badge must clarify that the layers are combined, static, and dynamic. Both local and accumulated representations publish this three-layer structure.
- **Safe to publish:** yes after clarification

### Simulator-provided odometry

- **Proposed wording:** “Accumulated mapping currently uses CARLA ground-truth hero odometry.”
- **Status:** Verified by multiple sources
- **Evidence:**
  - bridge source
  - runbook
  - accumulated mapping source and milestone
- **Safe to publish:** yes

### Current map representation

- **Proposed wording:** “A short-term, fixed-origin accumulated local map in world coordinates.”
- **Status:** Verified by documentation and source code
- **Evidence:** accumulated mapping milestone and node
- **Caveat:** It is not full SLAM, does not perform loop closure or pose-graph optimization, and uses approximate latest-message alignment.
- **Safe to publish:** yes

### Important mapping limitations

- **Proposed wording:**
  - “Not full SLAM.”
  - “Uses simulator-provided odometry.”
  - “Local projection is heuristic.”
  - “Map origin is fixed rather than rolling.”
  - “Timestamp synchronization is approximate.”
  - “Perception errors propagate into occupancy and mapping.”
- **Status:** Verified by documentation
- **Evidence:** accumulated mapping milestone, limitations
- **Safe to publish:** yes; select the most important four or five for the main page

---

## ROS2 topics safe to highlight

All are verified by the runbook and node sources.

| Topic | Type | Purpose | Publish? |
|---|---|---|---|
| `/perception/tracks` | `vision_msgs/msg/Detection2DArray` | Confirmed tracked 2D objects | yes |
| `/perception/fused_objects` | `std_msgs/msg/String` | JSON object-depth fusion output | yes |
| `/perception/free_space_status` | `std_msgs/msg/String` | Navigation-oriented free-space status | yes |
| `/perception/local_occupancy_grid` | `nav_msgs/msg/OccupancyGrid` | Combined local occupancy | yes |
| `/perception/accumulated_local_map` | `nav_msgs/msg/OccupancyGrid` | Combined accumulated map | yes |
| `/carla/hero_odom` | `nav_msgs/msg/Odometry` | Simulator-provided ego motion | use as a diagram annotation |

The specification’s five selected `/perception/...` topics are appropriate.

---

## Development trajectory

The eight-phase trajectory is verified by `docs/timeline.md`.

| Phase | Verified title | Status |
|---|---|---|
| 0 | MMSegmentation Fundamentals | verified |
| 1 | Cityscapes Expansion | verified |
| 2 | ROS2 + CARLA Integration | verified |
| 3 | CARLA Simulation Control | verified |
| 4 | ROS Bags & Visualization | verified |
| 5 | ASCII Debug Visualization | verified |
| 6 | Repository Structuring | verified |
| 7 | Depth-Aware Navigation and Local Mapping | verified |

The current specification uses acceptable shortened wording, but the review document proposes closer alignment with the timeline.

---

## Roadmap

The following roadmap is verified by `docs/timeline.md` and the accumulated mapping milestone:

1. Improve local mapping:
   - rolling map
   - timestamp-aware odometry integration
   - better image-to-ground projection
2. Add visual odometry:
   - estimate hero motion
   - compare against CARLA ground truth
   - evaluate drift and temporal alignment
3. Connect mapping to navigation:
   - consume accumulated occupancy
   - improve static/dynamic obstacle handling

**Safe to publish:** yes, clearly marked future work

---

## Media evidence

The following repository assets are verified to exist:

- `assets/AD_Project_Demo.gif`
- `assets/AD_Mapping_Demo.gif`
- `assets/demo_overlay.png`
- `assets/Segmentatation+Overlay+Tracking.png`

See `PORTFOLIO_MEDIA_INVENTORY.md` for suitability and caveats.

---

## Existing portfolio website claims

### General identity and education

- **Current claims:** Mathematics and Computer Science student; expected graduation 2028; English C1; German B1; Murcia, Spain; open to internships.
- **Status:** User-dependent / partially verified
- **Evidence:** `DonFisto.github.io/index.html`
- **Safe to publish:** only after Daniel confirms current wording
- **Reason:** These facts are not established by the robotics repository and may change.

### Autonomous-driving project card

- **Current claims:** modular CARLA pipeline; segmentation and depth; IoU evaluation; downstream navigation concepts.
- **Status:** Mostly verified, but outdated and too generic
- **Evidence:** current project repository now supports a substantially stronger and more precise description.
- **Safe to publish:** replace with evidence-based copy from this inventory

### Formula Student Driverless / LiDAR card

- **Current claims:** built LiDAR pipeline, validated in Gazebo, adapted for robotic deployment.
- **Status:** Unverified in this audit
- **Reason:** Only the autonomous-driving repository and portfolio repository were audited; no separate LiDAR repository was inspected.
- **Safe to publish:** no until separately evidenced

### Contact information

- **Current content:** email and phone number displayed publicly.
- **Status:** User-dependent
- **Safe to publish:** only after explicit privacy confirmation

### Referenced project images

- **Current references:** `images/project1.jpg`, `images/project2.jpg`
- **Status:** Broken or missing in the audited repository
- **Evidence:** direct file fetch returned not found
- **Safe to publish:** no; replace with authentic assets

---

## Claims that must not be published

- Full SLAM
- Metric monocular depth
- Calibrated 3D reconstruction
- Production-ready autonomous driving
- Safety-certified behavior
- Real-world vehicle deployment
- Numerical mIoU, latency, FPS, or benchmark claims without a selected reproducible result
- C++ as a core technology of this repository
- A total ROS2 package count
- “Learned object detector” for `object_detection_node`
- Project dates inferred only from commit timestamps
- Formula Student LiDAR claims without a separate evidence audit

---

## Items requiring Daniel’s confirmation

1. Exact public name:
   - `Daniel Martínez-Cabeza de Vaca`
   - or `Daniel Martínez-Cabeza de Vaca Guillén`
2. Whether the ownership statement should explicitly say “designed and implemented independently.”
3. Whether the portfolio should publicly show:
   - email
   - phone number
   - current location
4. Current academic wording:
   - university
   - degree title
   - expected graduation year
   - Erasmus status
5. Current language levels and whether they belong on the homepage.
6. Whether “open to internships” is still accurate.
7. Whether the Formula Student / LiDAR project should remain visible before a separate evidence audit.
8. Whether the general homepage should remain broad or make the autonomous-driving project the dominant first screen.
9. Whether a custom domain will be used.
10. Whether Daniel can provide new static captures for:
    - depth
    - fusion
    - free-space
    - local occupancy
    - accumulated mapping
