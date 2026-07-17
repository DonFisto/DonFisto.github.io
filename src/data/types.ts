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
}

export interface PlaceholderMedia {
  id: string;
  subsystem: string;
  requiredCapture: string;
  alt: string;
}
