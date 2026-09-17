export type ImplementationStatus = 'implemented' | 'next' | 'future' | 'historical';
export interface StatusItem { title: string; status: ImplementationStatus }
export interface ArchitectureStream {
  id: 'local' | 'global'; title: string; origin: string;
  steps: readonly string[]; output: string; meaning: string;
}
export interface PipelineStep { title: string; node?: string; description: string }
export interface SemanticNote { title: string; description: string }
export interface RosInterface { topic: string; type: string; frame: string; role: string }
export interface RuntimeEvidence { observation: string; result: string; context: string; source: string }
export interface EvolutionItem { period: string; title: string; description: string; status: ImplementationStatus }
export interface ProjectMedia {
  id: string; title: string; src: string; webpSrc?: string; metadataKey: string;
  alt: string; caption: string; caveat: string;
  motion?: { kind: 'gif' | 'video'; src: string; metadataKey: string; label: string };
}
export interface GeneratedMediaMetadata {
  width: number; height: number; sizeBytes: number; sha256: string;
}
export interface PublicProfile {
  name: string; shortName: string; email: string; githubProfile: string;
  academicProfile: string; university: string; expectedGraduation: string;
  exchange: string; positioning: string; availability: string;
  languages: readonly { language: string; level: string }[];
  publicContactFields: readonly ['email', 'github'];
}
