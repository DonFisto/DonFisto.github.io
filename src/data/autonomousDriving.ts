import type { ArchitectureStream, EvolutionItem, PipelineStep, ProjectMedia, RosInterface, RuntimeEvidence, SemanticNote, StatusItem } from './types';

export const source = {
  repository: 'https://github.com/DonFisto/vision-segmentation-autonomous-driving',
  branch: 'feature/route-lane-association',
  commit: '42a250e34197b5c51ecca227a69f6c566df1de2c',
  reviewed: '17 September 2026',
} as const;
export const sourceUrl = (path: string) => `${source.repository}/blob/${source.commit}/${path}`;
export const project = {
  title: 'Autonomous Driving Laboratory',
  subtitle: 'Lane perception, temporal mapping and global routing in CARLA + ROS2.',
  summary: 'A modular CARLA + ROS2 prototype implementing perception-derived lane geometry, temporal lane tracking, a rolling LaneMap and custom OpenDRIVE global routing.',
  ownership: 'Individual engineering project · ROS2 / CARLA research prototype',
  repository: source.repository,
  branchUrl: `${source.repository}/tree/${source.branch}`,
  caseStudyPath: '/projects/autonomous-driving/',
  pdfPath: '/downloads/Daniel-Martinez-Cabeza-de-Vaca-Robotics-Portfolio.pdf',
} as const;
export const technologies = ['ROS2', 'CARLA', 'Python', 'OpenDRIVE', 'A*', 'SegFormer / PyTorch', 'Foxglove'] as const;
export const implementationStatus: StatusItem[] = [
  { title: 'Lane perception', status: 'implemented' },
  { title: 'Temporal LaneMap', status: 'implemented' },
  { title: 'Global routing', status: 'implemented' },
  { title: 'Route/lane association', status: 'next' },
  { title: 'Trajectory planning', status: 'future' },
  { title: 'Tracking / control', status: 'future' },
];
export const architectureStreams: ArchitectureStream[] = [
  { id: 'local', title: 'Local perception', origin: 'Sensor-derived geometry',
    steps: ['CARLA RGB + CameraInfo', 'Binary road-marking segmentation', 'Metric BEV lane geometry', 'Geometric / component / context filters', 'Quadratic curve fitting', 'Temporal tracking + hero odometry'],
    output: 'LaneMap', meaning: 'Rolling, local perception memory' },
  { id: 'global', title: 'Global map / routing', origin: 'Privileged simulator map',
    steps: ['CARLA / OpenDRIVE', 'Directed road / lane topology', 'Sampled directed routing graph', 'Legal lane-follow / lane-change edges', 'Ego + goal graph association', 'A* search · Dijkstra baseline'],
    output: 'RoutePlan', meaning: 'Global, nominal route geometry' },
];
export const lanePipeline: PipelineStep[] = [
  { title: 'Detect road markings', node: 'road_marking_node', description: 'Binary learned segmentation isolates road-marking evidence from the RGB image.' },
  { title: 'Recover metric geometry', node: 'lane_geometry_node', description: 'CameraInfo supports a ground-plane BEV projection with explicit flat-road and camera-mount assumptions.' },
  { title: 'Filter geometric components', node: 'lane_component_filter_node', description: 'Oriented morphology and connected components separate longitudinal and transverse markings.' },
  { title: 'Reject misleading context', node: 'lane_context_filter_node', description: 'Transverse markings and dense junction context suppress irrelevant candidates.' },
  { title: 'Fit lane curves', node: 'lane_curve_fit_node', description: 'RANSAC and refinement fit y(x) = ax² + bx + c; support, residuals and pair geometry inform quality.' },
  { title: 'Track through ego motion', node: 'lane_tracking_node', description: 'Temporal confirmation and geometric gates stabilize curves. Buffered CARLA odometry propagates and refits prior geometry.' },
];
export const laneMapSemantics: SemanticNote[] = [
  { title: 'Local memory, explicit confidence', description: 'Accepted direct observations accumulate into sampled left/right boundaries and a centerline. Freshness and geometric consistency affect confidence; held or inferred paths are not reinserted as new evidence.' },
  { title: 'A rolling vector representation', description: 'Schema 2 currently emits zero or one local segment, with sampled poses, widths, curvature and confidence. Positions and headings publish in direct carla_world; globally_consistent remains false.' },
  { title: 'Unknown stays unknown', description: 'Connectivity, turn direction and speed limit are unknown. Local IDs identify this representation; map_revision counts integration/pruning changes. Neither is an OpenDRIVE identity.' },
  { title: 'An empty map can be correct', description: 'With fresh odometry but insufficient lane support, an empty segments array is valid. Missing or stale odometry suppresses map publication. No simulator-map geometry fills perception gaps.' },
];
export const routingPipeline: PipelineStep[] = [
  { title: 'Extract directed topology', description: 'CARLA/OpenDRIVE supplies coarse road/lane connectivity and sampled edge geometry.' },
  { title: 'Build the explicit graph', description: 'Longitudinal samples form lane-follow edges. Permitted left/right transitions connect adjacent sampled driving lanes outside junctions.' },
  { title: 'Associate ego and goal', description: 'World positions project onto a driving lane, then a sampled graph node, with distance and longitudinal-error rejection gates.' },
  { title: 'Search with a reference', description: 'Dijkstra provides the baseline/oracle. Production A* uses Euclidean distance with nonnegative edge costs and lane-change penalties.' },
  { title: 'Publish RoutePlan', description: 'Successful search publishes VALID. A completed no-path search publishes INVALID with empty geometry. This is nominal global routing, without trajectory dynamics.' },
];
export const routePlanSemantics: SemanticNote[] = [
  { title: 'Global route ≠ local trajectory', description: 'The coarse_reference_path samples global graph geometry. It has no speed profile, collision check or dynamic-feasibility guarantee.' },
  { title: 'Independent provenance', description: 'lane_segment_ids derive from global topology edges. map_revision fingerprints the map name and OpenDRIVE content, unlike the local LaneMap observation counter.' },
  { title: 'Durable, with explicit limits', description: 'Reliable, transient-local, depth-1 publication retains the latest route for compatible late subscribers while the publisher lives. Goals do not survive a planner restart.' },
];
export const interfaces: RosInterface[] = [
  { topic: '/carla/hero_odom', type: 'nav_msgs/msg/Odometry', frame: 'carla_world → hero', role: 'Simulator-provided ego pose for tracking, mapping and routing.' },
  { topic: '/perception/lane/tracked_centerline', type: 'nav_msgs/msg/Path', frame: 'hero', role: 'Local forward-left geometry; quality is carried separately in tracking_status JSON.' },
  { topic: '/perception/lane/local_map/vector', type: 'autonomy_interfaces/msg/LaneMap', frame: 'carla_world', role: 'Perception-derived rolling lane geometry and confidence.' },
  { topic: '/planning/goal', type: 'geometry_msgs/msg/PoseStamped', frame: 'carla_world', role: 'Destination position. Goal orientation is currently ignored.' },
  { topic: '/planning/route_plan', type: 'autonomy_interfaces/msg/RoutePlan', frame: 'carla_world', role: 'Global nominal route; VALID or INVALID publication.' },
];
export const runtimeEvidence: RuntimeEvidence[] = [
  { observation: 'Graph connectivity', result: '3,066 nodes · 4,522 edges · 1 strongly connected component', context: 'Observed in Town10HD / Town10HD_Opt development validation with CARLA 0.9.16. Counts depend on map export and configuration.', source: 'docs/milestones/global_route_planning.md' },
  { observation: 'Production frame alignment', result: 'Mean lane-to-route distance: direct 2.949 m; y-flipped 51.123 m', context: 'One supplied frame probe favored direct coordinates. These are diagnostic observations, not accuracy thresholds or an implemented association result.', source: 'docs/milestones/lane_perception_tracking_mapping.md' },
  { observation: 'Route publication & display', result: 'RoutePlan status 1 (VALID); matching route / display timestamps', context: 'Supplied September visualization observation: carla_world route path, carla_world_viz display copy, hero_viz local lane alias.', source: 'docs/milestones/global_route_planning.md' },
  { observation: 'Clean startup restoration', result: 'One instance of each of 5 planning / visualization nodes', context: 'One supplied stop → full restart. A new goal is required; this is not a guarantee for every remote-process failure.', source: 'docs/milestones/global_route_planning.md' },
];
export const engineeringThemes: SemanticNote[] = [
  { title: 'Perception under uncertainty', description: 'Missing, rejected, held and inferred lane evidence remain explicit. Memory does not become a new measurement.' },
  { title: 'Modular ROS2 interfaces', description: 'Perception, mapping, routing and visualization have separate responsibilities and observable contracts.' },
  { title: 'Graph-based routing', description: 'An explicit directed graph makes legal transitions inspectable. Dijkstra gives A* a reference for comparison.' },
  { title: 'Frames and reproducibility', description: 'Production coordinates stay separate from display reflection, supported by runtime probes and reusable startup tooling.' },
];
export const decisions: SemanticNote[] = [
  { title: 'Keep perception and map privilege separate', description: 'OpenDRIVE makes global routing possible while local geometry still has to earn confidence from observations. The cost is a separate association layer; the benefit is preserving uncertainty.' },
  { title: 'Own the graph; keep the algorithms understandable', description: 'Custom topology and sampled edges expose connectivity and costs. Dijkstra remains a reference as A* becomes the production search, at the cost of maintaining sampling assumptions.' },
  { title: 'Fix frames at the boundary', description: 'The LaneMap producer converts positions/headings to direct CARLA world. Foxglove reflects copied display geometry; planner data never adopts a display-only convention.' },
  { title: 'Treat IDs and revisions as owned contracts', description: 'Global topology hashes and local segment IDs cannot be compared for identity. Their revisions mean different things; future association must use geometry, timing and confidence.' },
  { title: 'Make route lifetime visible', description: 'Durable publication supports late subscribers, but rejected goals retain the last accepted goal and failed ego association does not clear a route. A future consumer needs an explicit input-age policy.' },
  { title: 'Close milestones with bounded runtime evidence', description: 'Source inspection establishes implemented logic. Development observations support specific integration behavior; neither a plausible screenshot nor a trajectory schema completes closed-loop driving.' },
];
export const timeline: EvolutionItem[] = [
  { period: 'Earlier · phases 0–7', title: 'From model experiments to spatial perception', description: 'MMSegmentation, Cityscapes, ROS2/CARLA, simulation control, bags/Foxglove, remote debugging, repository structure, relative depth, fusion, free space and accumulated occupancy.', status: 'historical' },
  { period: '01–04 Aug 2026 · phase 8', title: 'Lane-specific perception & geometry', description: 'Binary road markings, metric BEV, component/context filtering, quadratic fitting and temporal tracking.', status: 'implemented' },
  { period: '04–18 Aug 2026 · phase 9', title: 'Odometry-aware tracking → rolling LaneMap', description: 'Ego-motion propagation, stamped tracker/mapper integration, sampled vector geometry and quality semantics.', status: 'implemented' },
  { period: '20–23 Aug 2026 · phase 10', title: 'OpenDRIVE topology → graph search → RoutePlan', description: 'Directed topology and sampled graph; Dijkstra, ego/goal association, RoutePlan provenance, then A* production search and no-path invalidation.', status: 'implemented' },
  { period: '15–16 Sep 2026 · phase 11', title: 'Frame contracts, visualization & reproducible startup', description: 'Direct-world LaneMap correction, route/graph displays, Foxglove frame adapter and reusable core/full/stop/status tooling.', status: 'implemented' },
  { period: 'Next · phase 12', title: 'RoutePlan ↔ LaneMap association', description: 'Connect global intent to local perceived geometry. Semantics and output interface are planned, not implemented.', status: 'next' },
];
export const limitations: SemanticNote[] = [
  { title: 'The route-to-actuation loop is open', description: 'RoutePlan ↔ LaneMap association is not implemented. Behavior/maneuver planning, local trajectory planning and trajectory tracking/control are not implemented for this pipeline. Earlier reactive controllers do not complete it.' },
  { title: 'Simulator privilege remains explicit', description: 'Global routing uses OpenDRIVE and ego motion uses CARLA odometry. The graph is static after startup, with no dynamic-obstacle or prediction costs; goal orientation is ignored.' },
  { title: 'Perception is conditional', description: 'Flat-ground projection, quadratic support, marking quality and odometry freshness constrain the local map. Uncertain evidence may legitimately produce an empty LaneMap.' },
  { title: 'Confidence and frames need careful consumers', description: 'RoutePlan confidence is heuristic, not a calibrated probability. Downstream signed-curvature semantics remain unvalidated; position alignment alone does not settle that contract.' },
];
export const roadmap: (SemanticNote & StatusItem)[] = [
  { title: 'RoutePlan ↔ LaneMap association', status: 'next', description: 'Define geometric and temporal semantics, implement a separate consumer, then validate accepted and rejected associations at runtime.' },
  { title: 'Simple local reference / trajectory planner', status: 'future', description: 'Use validated association, with explicit behavior responsibility, speed, timing, validity and feasibility limits.' },
  { title: 'Baseline tracking / control', status: 'future', description: 'Close the loop with an understandable lateral and longitudinal controller, then run repeatable closed-loop evaluation.' },
];
const mediaRoot = '/media/autonomous-driving/';
export const heroMedia: ProjectMedia = {
  id: 'planning', title: 'Global routing · Foxglove', src: `${mediaRoot}planning.png`, webpSrc: `${mediaRoot}planning.webp`, metadataKey: 'planning',
  alt: 'Foxglove view of the OpenDRIVE-derived routing graph, ego pose and selected RoutePlan, with camera and lane diagnostic panels alongside.',
  caption: 'OpenDRIVE-derived routing graph, ego pose and selected RoutePlan visualized live in Foxglove.',
  caveat: 'Global routing visualization — not closed-loop autonomous driving.',
};
export const laneMedia: ProjectMedia = {
  id: 'lane-tracking', title: 'Lane perception · temporal tracking', src: `${mediaRoot}lane-detection.png`, webpSrc: `${mediaRoot}lane-detection.webp`, metadataKey: 'lanePhoto',
  alt: 'CARLA camera context beside road-marking masks, geometric and context filtering, fitted lane curves and temporal tracking diagnostics.',
  caption: 'Road-marking candidates, filtered curves and temporal lane tracking alongside camera context.',
  caveat: 'This pipeline feeds the rolling LaneMap; the diagnostic view does not display every LaneMap field.',
  motion: { kind: 'gif', src: `${mediaRoot}lane-detection-demo.gif`, metadataKey: 'laneDemo', label: 'Play lane tracking demo' },
};
export const historicalMedia: ProjectMedia = {
  id: 'earlier-tracking', title: 'Earlier / parallel work · semantic perception', src: `${mediaRoot}tracking-overlay.png`, webpSrc: `${mediaRoot}tracking-overlay.webp`, metadataKey: 'trackingOverlay',
  alt: 'Earlier CARLA semantic segmentation with extracted object boxes and tracking overlays.',
  caption: 'Semantic segmentation, object extraction and tracking from the earlier perception stack.',
  caveat: 'Historical accumulated occupancy is a grid representation, distinct from the current vector LaneMap.',
};
