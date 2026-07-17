import type {
  ArchitectureEdge,
  ArchitectureGroup,
  ArchitectureNode,
  Contribution,
  Limitation,
  PlaceholderMedia,
  ProjectMedia,
  PublishableClaim,
  RoadmapItem,
  RosTopic,
  TechnicalDetail,
  Technology,
  TimelinePhase,
} from "./types";

export const project = {
  slug: "autonomous-driving",
  title: "Autonomous-Driving Perception & Local Mapping",
  shortTitle: "Perception & Local Mapping",
  summary:
    "A modular ROS2 perception and local-mapping stack that transforms CARLA camera data into semantic understanding, tracked objects, relative-depth fusion, navigation cues, local occupancy layers and short-term accumulated maps.",
  ownership: "Individual engineering project · ROS2 / CARLA research prototype",
  repository: "https://github.com/DonFisto/vision-segmentation-autonomous-driving",
  caseStudyPath: "/projects/autonomous-driving/",
} as const;

export const technologies: Technology[] = [
  { name: "ROS2 Humble", category: "primary", projectVerified: true },
  { name: "CARLA", category: "primary", projectVerified: true },
  { name: "Python", category: "primary", projectVerified: true },
  { name: "PyTorch", category: "primary", projectVerified: true },
  { name: "MMSegmentation", category: "primary", projectVerified: true },
  { name: "SegFormer-B0", category: "primary", projectVerified: true },
  { name: "Depth Anything V2", category: "primary", projectVerified: true },
  { name: "OpenCV", category: "primary", projectVerified: true },
  { name: "Linux", category: "primary", projectVerified: true },
];

export const claims: PublishableClaim[] = [
  {
    id: "semantic-segmentation",
    text: "SegFormer-B0 semantic segmentation in the Cityscapes-19 label space.",
    status: "verified-multiple",
    references: [
      { repository: "robotics", path: "configs/cityscapes/segformer_b0_cityscapes.py" },
      { repository: "robotics", path: "ros/ros2_ws/src/semantic_seg_node/" },
    ],
    publishable: true,
    requiresDanielConfirmation: false,
  },
  {
    id: "tracking",
    text: "Semantic object extraction followed by class-consistent IoU tracking with persistent IDs.",
    status: "verified-source",
    references: [
      { repository: "robotics", path: "ros/ros2_ws/src/object_detection_node/" },
      { repository: "robotics", path: "ros/ros2_ws/src/tracking_node/" },
    ],
    publishable: true,
    requiresDanielConfirmation: false,
  },
  {
    id: "relative-depth",
    text: "Depth Anything V2 provides relative monocular depth rather than calibrated metric distance.",
    status: "verified-multiple",
    references: [
      { repository: "robotics", path: "ros/ros2_ws/src/depth_node/" },
      { repository: "robotics", path: "docs/milestones/depth_fusion_stack.md" },
    ],
    publishable: true,
    requiresDanielConfirmation: false,
  },
  {
    id: "mapping",
    text: "Combined, static and dynamic occupancy evidence is accumulated using simulator-provided hero odometry.",
    status: "verified-multiple",
    references: [
      { repository: "robotics", path: "ros/ros2_ws/src/local_mapping_node/" },
      { repository: "robotics", path: "docs/milestones/accumulated_local_mapping.md" },
    ],
    caveat: "This is a short-term mapping prototype, not a complete SLAM system.",
    publishable: true,
    requiresDanielConfirmation: false,
  },
];

export const contributions: Contribution[] = [
  {
    title: "Model development",
    badge: "SegFormer-B0",
    accent: "model",
    bullets: [
      "SegFormer-B0 training and fine-tuning",
      "Cityscapes evaluation and CARLA adaptation",
      "Reproducible CUDA, Torch and MMCV environment",
    ],
  },
  {
    title: "Dataset engineering",
    badge: "Cityscapes-19",
    accent: "data",
    bullets: [
      "CARLA collection and conversion tooling",
      "Cityscapes-19 label pipeline",
      "Filtering and targeted rare-class sampling",
    ],
  },
  {
    title: "ROS2 system design",
    badge: "12 principal nodes",
    accent: "systems",
    bullets: [
      "Independent perception, fusion and control nodes",
      "Structured topics and compressed outputs",
      "Foxglove visualization and rosbag workflows",
    ],
  },
  {
    title: "Navigation and mapping",
    badge: "3 occupancy layers",
    accent: "mapping",
    bullets: [
      "Semantic-depth free-space estimation",
      "Combined, static and dynamic occupancy layers",
      "Odometry-based accumulated local mapping",
    ],
  },
];

export const timeline: TimelinePhase[] = [
  {
    index: 0,
    title: "MMSegmentation Fundamentals",
    summary: "Established the training, evaluation and inference workflow around MMSegmentation.",
    outcome: "Reproducible model-development baseline",
  },
  {
    index: 1,
    title: "Cityscapes Expansion",
    summary: "Moved to the Cityscapes-19 label space and expanded evaluation and qualitative overlays.",
    outcome: "Urban-scene semantic understanding",
  },
  {
    index: 2,
    title: "ROS2 + CARLA Integration",
    summary: "Connected simulator RGB frames to live segmentation outputs through modular ROS2 nodes.",
    outcome: "Live perception pipeline",
  },
  {
    index: 3,
    title: "CARLA Simulation Control",
    summary: "Added control and simulator interaction paths around the perception stack.",
    outcome: "Perception-to-behavior experimentation",
  },
  {
    index: 4,
    title: "ROS Bags & Foxglove Visualization",
    summary: "Introduced recording and multi-topic inspection for repeatable debugging.",
    outcome: "Observable and replayable system behavior",
  },
  {
    index: 5,
    title: "ASCII Debug Visualization",
    summary: "Created lightweight remote inspection workflows when full graphical tooling was impractical.",
    outcome: "Remote debugging resilience",
  },
  {
    index: 6,
    title: "Repository Structuring",
    summary: "Refactored documentation, packages, setup guidance and operational runbooks.",
    outcome: "Maintainable engineering repository",
  },
  {
    index: 7,
    title: "Depth-Aware Navigation & Local Mapping",
    summary: "Integrated relative depth, fusion, free space, occupancy layers and short-term map accumulation.",
    outcome: "Current end-to-end prototype scope",
  },
];

export const architectureGroups: ArchitectureGroup[] = [
  { label: "Perception", x: 260, y: 38, accent: "data" },
  { label: "Fusion", x: 1000, y: 138, accent: "model" },
  { label: "Spatial reasoning", x: 740, y: 318, accent: "mapping" },
  { label: "Behavior", x: 1000, y: 318, accent: "navigation" },
];

export const architectureNodes: ArchitectureNode[] = [
  {
    id: "carla-rgb",
    labelLines: ["CARLA", "RGB"],
    implementationLabel: "sensor_msgs/Image",
    group: "input",
    x: 30,
    y: 270,
    width: 150,
    height: 82,
  },
  {
    id: "semantic-segmentation",
    labelLines: ["Semantic", "segmentation"],
    implementationLabel: "semantic_seg_node",
    group: "perception",
    x: 260,
    y: 78,
    width: 180,
    height: 84,
  },
  {
    id: "relative-depth",
    labelLines: ["Relative monocular", "depth"],
    implementationLabel: "depth_node",
    group: "perception",
    x: 260,
    y: 218,
    width: 180,
    height: 84,
  },
  {
    id: "object-extraction",
    labelLines: ["Semantic object", "extraction"],
    implementationLabel: "object_detection_node",
    group: "perception",
    x: 500,
    y: 78,
    width: 180,
    height: 84,
  },
  {
    id: "tracking",
    labelLines: ["Temporal", "tracking"],
    implementationLabel: "tracking_node",
    group: "perception",
    x: 740,
    y: 78,
    width: 180,
    height: 84,
  },
  {
    id: "fusion",
    labelLines: ["Object-depth", "fusion"],
    implementationLabel: "fusion_node",
    group: "fusion",
    x: 1000,
    y: 178,
    width: 210,
    height: 84,
  },
  {
    id: "free-space",
    labelLines: ["Free-space", "estimation"],
    implementationLabel: "free_space_node",
    group: "spatial",
    x: 740,
    y: 338,
    width: 180,
    height: 84,
  },
  {
    id: "reactive-navigation",
    labelLines: ["Reactive navigation", "prototypes"],
    implementationLabel: "navigation nodes",
    group: "behavior",
    x: 1000,
    y: 338,
    width: 210,
    height: 84,
  },
  {
    id: "local-occupancy",
    labelLines: ["Local occupancy", "layers"],
    implementationLabel: "local_occupancy_node",
    group: "spatial",
    x: 740,
    y: 458,
    width: 180,
    height: 84,
  },
  {
    id: "hero-odometry",
    labelLines: ["CARLA hero", "odometry"],
    implementationLabel: "/carla/hero_odom",
    group: "input",
    x: 260,
    y: 548,
    width: 180,
    height: 78,
  },
  {
    id: "accumulated-map",
    labelLines: ["Short-term", "accumulated map"],
    implementationLabel: "local_mapping_node",
    group: "mapping",
    x: 1000,
    y: 458,
    width: 210,
    height: 84,
  },
];

export const architectureEdges: ArchitectureEdge[] = [
  { id: "rgb-seg", from: "carla-rgb", to: "semantic-segmentation", path: "M180 311 C220 311 214 120 260 120", style: "primary" },
  { id: "rgb-depth", from: "carla-rgb", to: "relative-depth", path: "M180 311 C220 311 218 260 260 260", style: "primary" },
  { id: "seg-extraction", from: "semantic-segmentation", to: "object-extraction", path: "M440 120 L500 120", style: "primary" },
  { id: "extraction-tracking", from: "object-extraction", to: "tracking", path: "M680 120 L740 120", style: "primary" },
  { id: "tracking-fusion", from: "tracking", to: "fusion", path: "M920 120 C965 120 962 220 1000 220", style: "primary" },
  { id: "depth-fusion", from: "relative-depth", to: "fusion", path: "M440 260 C700 260 760 220 1000 220", style: "primary" },
  { id: "seg-free", from: "semantic-segmentation", to: "free-space", path: "M440 120 C585 120 580 380 740 380", style: "primary" },
  { id: "depth-free", from: "relative-depth", to: "free-space", path: "M440 260 C600 260 615 380 740 380", style: "primary" },
  { id: "free-navigation", from: "free-space", to: "reactive-navigation", path: "M920 380 L1000 380", style: "primary" },
  { id: "seg-occupancy", from: "semantic-segmentation", to: "local-occupancy", path: "M440 120 C540 120 560 500 740 500", style: "primary" },
  { id: "depth-occupancy", from: "relative-depth", to: "local-occupancy", path: "M440 260 C620 260 620 500 740 500", style: "primary" },
  { id: "occupancy-map", from: "local-occupancy", to: "accumulated-map", path: "M920 500 L1000 500", style: "primary" },
  { id: "odom-map", from: "hero-odometry", to: "accumulated-map", path: "M440 587 C720 587 790 500 1000 500", style: "auxiliary", label: "simulator-provided ego motion" },
];

export const featuredTopics: RosTopic[] = [
  {
    name: "/perception/tracks",
    messageType: "vision_msgs/msg/Detection2DArray",
    role: "Confirmed objects with persistent track IDs.",
    stage: "tracking",
  },
  {
    name: "/perception/fused_objects",
    messageType: "std_msgs/msg/String",
    role: "JSON object records with relative-depth statistics.",
    stage: "fusion",
  },
  {
    name: "/perception/free_space_status",
    messageType: "std_msgs/msg/String",
    role: "Left, center and right free-space ratios plus a recommended direction.",
    stage: "free-space",
  },
  {
    name: "/perception/local_occupancy_grid",
    messageType: "nav_msgs/msg/OccupancyGrid",
    role: "Combined vehicle-relative local occupancy representation.",
    stage: "occupancy",
  },
  {
    name: "/perception/accumulated_local_map",
    messageType: "nav_msgs/msg/OccupancyGrid",
    role: "Short-term world-coordinate accumulation of occupancy evidence.",
    stage: "mapping",
  },
];

export const technicalDetails: TechnicalDetail[] = [
  {
    id: "segmentation",
    title: "Semantic segmentation",
    input: "CARLA RGB frames",
    method: "SegFormer-B0 through MMSegmentation in the Cityscapes-19 label space.",
    output: "Class-ID masks and compressed semantic overlays.",
    engineeringNote: "Training, evaluation, qualitative overlays and CARLA-oriented refinement are part of the repository workflow.",
    accent: "model",
  },
  {
    id: "object-extraction",
    title: "Semantic object extraction",
    input: "Cityscapes-19 class-ID masks",
    method: "Morphological cleanup, connected components and class-specific area thresholds.",
    output: "2D detections for selected traffic participants and infrastructure.",
    engineeringNote: "This is semantic-mask-derived extraction, not a separate learned object detector.",
    accent: "data",
  },
  {
    id: "tracking",
    title: "Temporal tracking",
    input: "Class-labelled 2D detections",
    method: "Class-consistent greedy IoU association, hit/miss gating and EMA box smoothing.",
    output: "Confirmed tracks with persistent IDs.",
    engineeringNote: "The current code contains association logic in both extraction and tracking stages; consolidation is a future code-quality improvement.",
    accent: "systems",
  },
  {
    id: "depth-fusion",
    title: "Relative depth and fusion",
    input: "CARLA RGB frames plus tracked bounding boxes",
    method: "Depth Anything V2 Small and per-box relative-depth statistics.",
    output: "Object records with median, mean, minimum and percentile-style depth summaries.",
    engineeringNote: "Depth is relative rather than metric, and bounding-box crops may contain background pixels.",
    accent: "model",
  },
  {
    id: "free-space-occupancy",
    title: "Free space and local occupancy",
    input: "Semantic masks and relative-depth maps",
    method: "Heuristic semantic-depth masking and approximate image-to-ground projection.",
    output: "Navigation status plus combined, static and dynamic local occupancy layers.",
    engineeringNote: "The representation is navigation-oriented but is not calibrated metric 3D reconstruction.",
    accent: "mapping",
  },
  {
    id: "accumulated-mapping",
    title: "Accumulated local mapping",
    input: "Local occupancy layers and CARLA hero odometry",
    method: "Transform recent occupancy evidence into a fixed-origin world-coordinate grid.",
    output: "Combined, static and dynamic short-term accumulated maps.",
    engineeringNote: "The implementation uses simulator-provided odometry and is not a complete SLAM system.",
    accent: "mapping",
  },
];

export const heroMedia: ProjectMedia = {
  id: "project-demo",
  title: "Live perception stack",
  subsystem: "CARLA perception-to-mapping overview",
  kind: "animation",
  src: "/media/autonomous-driving/project-demo.gif",
  poster: "/media/autonomous-driving/project-demo-poster.png",
  printSrc: "/media/autonomous-driving/project-demo-poster.png",
  metadataKey: "projectDemo",
  alt: "CARLA urban-driving scene with live outputs from Daniel's modular ROS2 perception stack.",
  caption: "Live CARLA demonstration of the modular perception pipeline.",
  caveat: "The animation demonstrates the prototype workflow; it is not a performance benchmark.",
  sourceRepositoryPath: "assets/AD_Project_Demo.gif",
};

export const authenticMedia: ProjectMedia[] = [
  {
    id: "semantic-segmentation",
    title: "Semantic segmentation",
    subsystem: "SegFormer-B0 · Cityscapes-19",
    kind: "image",
    src: "/media/autonomous-driving/segmentation-overlay.png",
    webpSrc: "/media/autonomous-driving/segmentation-overlay.webp",
    printSrc: "/media/autonomous-driving/segmentation-overlay.png",
    metadataKey: "segmentationOverlay",
    alt: "CARLA urban scene with a Cityscapes-19 semantic segmentation overlay.",
    caption: "Cityscapes-19 scene parsing using SegFormer-B0, trained and refined for CARLA urban scenes.",
    caveat: "No numerical accuracy claim is inferred from this qualitative output.",
    sourceRepositoryPath: "assets/demo_overlay.png",
  },
  {
    id: "object-extraction-tracking",
    title: "Object extraction and tracking",
    subsystem: "Semantic components · IoU association",
    kind: "image",
    src: "/media/autonomous-driving/tracking-overlay.png",
    webpSrc: "/media/autonomous-driving/tracking-overlay.webp",
    printSrc: "/media/autonomous-driving/tracking-overlay.png",
    metadataKey: "trackingOverlay",
    alt: "CARLA scene with semantic segmentation, extracted object boxes and temporal tracking overlays.",
    caption: "Selected semantic classes are converted into object boxes and associated over time using class-consistent IoU tracking.",
    caveat: "The boxes originate from semantic-mask processing, not a separate learned object detector.",
    sourceRepositoryPath: "assets/Segmentatation+Overlay+Tracking.png",
  },
  {
    id: "mapping-demo",
    title: "Local occupancy and accumulated mapping",
    subsystem: "Occupancy layers · CARLA hero odometry",
    kind: "animation",
    src: "/media/autonomous-driving/mapping-demo.gif",
    poster: "/media/autonomous-driving/mapping-demo-poster.png",
    printSrc: "/media/autonomous-driving/mapping-demo-poster.png",
    metadataKey: "mappingDemo",
    alt: "Animated CARLA demonstration of local occupancy and short-term accumulated mapping.",
    caption: "Semantic occupancy evidence is accumulated in world coordinates using simulator-provided hero odometry.",
    caveat: "The accumulated representation is a short-term prototype, not a complete SLAM system.",
    sourceRepositoryPath: "assets/AD_Mapping_Demo.gif",
  },
];

export const printMedia = authenticMedia;

export const pendingMedia: PlaceholderMedia[] = [
  {
    id: "relative-depth-fusion",
    subsystem: "Relative depth + object fusion",
    requiredCapture: "Add a verified frame showing tracked IDs beside relative-depth statistics.",
    alt: "Placeholder for a future authentic relative-depth and object-fusion capture.",
  },
  {
    id: "free-space-occupancy",
    subsystem: "Free-space + local occupancy layers",
    requiredCapture: "Add a dedicated frame that preserves free-space, static, dynamic and unknown-layer legends.",
    alt: "Placeholder for a future authentic free-space and local-occupancy capture.",
  },
];

export const limitations: Limitation[] = [
  {
    id: "relative-depth",
    title: "Relative rather than metric depth",
    description: "Depth Anything V2 supports ordering and relative comparison, but the current values are not calibrated distances in metres.",
  },
  {
    id: "box-fusion",
    title: "Bounding-box depth contamination",
    description: "Whole-box statistics can include background or occluding pixels around an object.",
  },
  {
    id: "projection",
    title: "Heuristic ground projection",
    description: "Local occupancy is derived through an approximate image-to-ground projection rather than calibrated metric 3D reconstruction.",
  },
  {
    id: "simulator-odometry",
    title: "Simulator-provided ego motion",
    description: "Accumulated mapping currently depends on CARLA hero odometry instead of an independently estimated visual-odometry signal.",
  },
  {
    id: "not-slam",
    title: "Not a complete SLAM system",
    description: "The fixed-origin short-term map does not yet include loop closure, pose-graph optimization or long-term map management.",
  },
];

export const roadmap: RoadmapItem[] = [
  {
    index: "01",
    title: "Improve local mapping",
    description: "Introduce rolling maps, timestamp-aware integration and improved or calibrated ground projection.",
    featured: false,
    status: "planned",
  },
  {
    index: "02",
    title: "Replace simulator ego motion",
    description: "Introduce visual odometry and evaluate drift, robustness and temporal alignment against CARLA ground truth.",
    featured: true,
    status: "planned",
  },
  {
    index: "03",
    title: "Map-based navigation",
    description: "Use accumulated occupancy for planning and improve treatment of static and dynamic obstacles.",
    featured: false,
    status: "planned",
  },
];

export const architectureSummary = [
  "CARLA RGB → SegFormer semantic segmentation → semantic object extraction → temporal tracking",
  "CARLA RGB → Depth Anything V2 relative depth",
  "Tracking + relative depth → object-depth fusion",
  "Segmentation + relative depth → free-space estimation → reactive navigation prototypes",
  "Segmentation + relative depth → combined, static and dynamic local occupancy layers",
  "CARLA hero odometry + local occupancy layers → short-term accumulated local mapping",
] as const;
