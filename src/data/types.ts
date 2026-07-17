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
