import type {
  Contribution,
  PlaceholderMedia,
  PublishableClaim,
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
    caveat: "This is a short-term mapping prototype, not full SLAM.",
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
  { index: 0, title: "MMSegmentation Fundamentals" },
  { index: 1, title: "Cityscapes Expansion" },
  { index: 2, title: "ROS2 + CARLA Integration" },
  { index: 3, title: "CARLA Simulation Control" },
  { index: 4, title: "ROS Bags & Foxglove Visualization" },
  { index: 5, title: "ASCII Debug Visualization" },
  { index: 6, title: "Repository Structuring" },
  { index: 7, title: "Depth-Aware Navigation & Local Mapping" },
];

export const limitations = [
  "Depth is relative, not metric.",
  "Bounding-box fusion can include background pixels.",
  "Accumulated mapping uses simulator-provided odometry.",
  "The accumulated representation is not a complete SLAM system.",
  "Image-to-ground occupancy projection remains heuristic.",
] as const;

export const roadmap = [
  {
    index: "01",
    title: "Improve local mapping",
    description: "Rolling maps, timestamp-aware integration and improved ground projection.",
    featured: false,
  },
  {
    index: "02",
    title: "Replace simulator ego motion",
    description: "Introduce visual odometry and evaluate drift and temporal alignment.",
    featured: true,
  },
  {
    index: "03",
    title: "Map-based navigation",
    description: "Plan with accumulated occupancy and improve static/dynamic obstacle handling.",
    featured: false,
  },
] as const;

export const outputPlaceholders: PlaceholderMedia[] = [
  {
    id: "segmentation",
    subsystem: "Semantic segmentation",
    requiredCapture: "Replace with the verified CARLA segmentation overlay during Phase 4.",
    alt: "Placeholder for authentic semantic segmentation output.",
  },
  {
    id: "tracking-depth",
    subsystem: "Tracking + depth fusion",
    requiredCapture: "Replace with an authentic tracking and relative-depth fusion capture.",
    alt: "Placeholder for authentic tracking and relative-depth fusion output.",
  },
  {
    id: "mapping",
    subsystem: "Local occupancy & mapping",
    requiredCapture: "Replace with a static frame from the verified mapping demonstration.",
    alt: "Placeholder for authentic local occupancy and accumulated mapping output.",
  },
];

export const architectureSummary = [
  "CARLA RGB → SegFormer semantic segmentation → semantic object extraction → temporal tracking",
  "CARLA RGB → Depth Anything V2 relative depth",
  "Tracking + relative depth → object-depth fusion",
  "Segmentation + relative depth → free-space estimation → reactive navigation",
  "Segmentation + relative depth → local occupancy layers",
  "CARLA hero odometry + local occupancy layers → short-term accumulated local mapping",
] as const;
