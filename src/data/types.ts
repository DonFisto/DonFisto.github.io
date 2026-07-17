export type EvidenceStatus =
  | "verified-source"
  | "verified-docs"
  | "verified-media"
  | "verified-multiple"
  | "user-confirmed"
  | "partial"
  | "unverified"
  | "contradicted"
  | "superseded";

export interface EvidenceReference {
  repository: "robotics" | "portfolio" | "user-confirmed";
  path?: string;
  symbolOrSection?: string;
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

export interface Technology {
  name: string;
  category: "primary" | "secondary" | "general-skill";
  projectVerified: boolean;
}

export interface Contribution {
  title: string;
  badge: string;
  bullets: string[];
  accent: "model" | "data" | "systems" | "mapping";
}

export interface TimelinePhase {
  index: number;
  title: string;
  summary: string;
  outcome: string;
}

export interface PlaceholderMedia {
  id: string;
  subsystem: string;
  requiredCapture: string;
  alt: string;
}

export type MediaKind = "image" | "animation";

export interface ProjectMedia {
  id: string;
  title: string;
  subsystem: string;
  kind: MediaKind;
  src: string;
  webpSrc?: string;
  poster?: string;
  printSrc: string;
  metadataKey: string;
  alt: string;
  caption: string;
  caveat?: string;
  sourceRepositoryPath: string;
}

export interface GeneratedMediaMetadata {
  width: number;
  height: number;
  sizeBytes: number;
}

export interface Limitation {
  id: string;
  title: string;
  description: string;
}

export interface RoadmapItem {
  index: string;
  title: string;
  description: string;
  featured: boolean;
  status: "planned";
}

export interface ArchitectureNode {
  id: string;
  labelLines: string[];
  implementationLabel?: string;
  group: "input" | "perception" | "fusion" | "spatial" | "behavior" | "mapping";
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ArchitectureEdge {
  id: string;
  from: string;
  to: string;
  path: string;
  style: "primary" | "auxiliary";
  label?: string;
}

export interface ArchitectureGroup {
  label: string;
  x: number;
  y: number;
  accent: "data" | "model" | "navigation" | "mapping";
}

export interface RosTopic {
  name: string;
  messageType: string;
  role: string;
  stage: "tracking" | "fusion" | "free-space" | "occupancy" | "mapping";
}

export interface TechnicalDetail {
  id: string;
  title: string;
  input: string;
  method: string;
  output: string;
  engineeringNote: string;
  accent: "model" | "data" | "systems" | "mapping";
}
