import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const requiredRoutes = [
  "dist/index.html",
  "dist/projects/autonomous-driving/index.html",
  "dist/portfolio-print/index.html",
  "dist/404.html",
];

for (const file of requiredRoutes) {
  const info = await stat(resolve(file));
  if (!info.isFile() || info.size < 200) {
    throw new Error(`Missing or unexpectedly small build output: ${file}`);
  }
}

const requiredMedia = [
  "public/media/autonomous-driving/project-demo.gif",
  "public/media/autonomous-driving/project-demo-poster.png",
  "public/media/autonomous-driving/segmentation-overlay.png",
  "public/media/autonomous-driving/segmentation-overlay.webp",
  "public/media/autonomous-driving/tracking-overlay.png",
  "public/media/autonomous-driving/tracking-overlay.webp",
  "public/media/autonomous-driving/mapping-demo.gif",
  "public/media/autonomous-driving/mapping-demo-poster.png",
];

for (const file of requiredMedia) {
  const info = await stat(resolve(file));
  if (!info.isFile() || info.size < 1_000) {
    throw new Error(`Missing or unexpectedly small authentic media asset: ${file}`);
  }
}

const root = await readFile("dist/index.html", "utf8");
const project = await readFile("dist/projects/autonomous-driving/index.html", "utf8");
const print = await readFile("dist/portfolio-print/index.html", "utf8");
const combined = `${root}\n${project}\n${print}`;

const forbidden = [
  "tel:",
  "Formula Student",
  "+34 665",
  ">C++<",
];

for (const value of forbidden) {
  if (combined.includes(value)) {
    throw new Error(`Forbidden public content found in build: ${value}`);
  }
}

const pageCount = (print.match(/class="pdf-page"/g) ?? []).length;
if (pageCount !== 4) {
  throw new Error(`Expected four print pages, found ${pageCount}`);
}

const requiredPhrases = [
  "Individual engineering project",
  "relative-depth",
  "simulator-provided",
  "not a complete SLAM",
  "semantic object extraction",
  "12 principal nodes",
  "Cityscapes-19",
  "3 occupancy layers",
  "Repository outputs, shown with their engineering caveats",
  "Additional captures planned",
];

for (const phrase of requiredPhrases) {
  if (!combined.includes(phrase)) {
    throw new Error(`Required integrity phrase is absent: ${phrase}`);
  }
}

const architectureNodeCount = (project.match(/data-architecture-node=/g) ?? []).length;
const architectureEdgeCount = (project.match(/data-architecture-edge=/g) ?? []).length;
const timelinePhaseCount = (project.match(/data-timeline-phase=/g) ?? []).length;
const topicCount = (project.match(/data-topic=/g) ?? []).length;
const technicalDetailCount = (project.match(/data-technical-detail=/g) ?? []).length;
const projectMediaCount = (project.match(/data-evidence-media=/g) ?? []).length;
const printMediaCount = (print.match(/data-evidence-media=/g) ?? []).length;
const pendingPlaceholderCount = (project.match(/PROJECT OUTPUT NEEDED/g) ?? []).length;

if (architectureNodeCount !== 11) {
  throw new Error(`Expected 11 architecture nodes, found ${architectureNodeCount}`);
}

if (architectureEdgeCount !== 13) {
  throw new Error(`Expected 13 architecture edges, found ${architectureEdgeCount}`);
}

if (timelinePhaseCount !== 8) {
  throw new Error(`Expected 8 development phases, found ${timelinePhaseCount}`);
}

if (topicCount !== 5) {
  throw new Error(`Expected 5 featured ROS2 topics, found ${topicCount}`);
}

if (technicalDetailCount !== 6) {
  throw new Error(`Expected 6 technical detail cards, found ${technicalDetailCount}`);
}

if (projectMediaCount !== 4) {
  throw new Error(`Expected one hero plus three authentic project media figures, found ${projectMediaCount}`);
}

if (printMediaCount !== 4) {
  throw new Error(`Expected one hero plus three authentic print media figures, found ${printMediaCount}`);
}

if (pendingPlaceholderCount !== 2) {
  throw new Error(`Expected two explicitly labelled pending captures on the web page, found ${pendingPlaceholderCount}`);
}

if (print.includes(".gif") || print.includes("PROJECT OUTPUT NEEDED")) {
  throw new Error("Print route must use static authentic frames and contain no media placeholders.");
}

if (!project.includes('aria-labelledby="architecture-title architecture-description"')) {
  throw new Error("Accessible architecture title and description are missing.");
}

if (!print.includes("architecture-title-print") || !print.includes("architecture-description-print")) {
  throw new Error("Print route does not contain the vector architecture diagram.");
}

const metadata = await readFile("src/data/generatedMedia.ts", "utf8");
for (const key of ["projectDemo", "segmentationOverlay", "trackingOverlay", "mappingDemo"]) {
  if (!metadata.includes(`${key}`)) {
    throw new Error(`Generated media metadata is missing key: ${key}`);
  }
}

console.log("Phase 4 authentic-media verification passed.");
console.log(
  `Verified ${requiredRoutes.length} routes, ${pageCount} print pages, ${projectMediaCount} authentic web figures, ` +
    `${printMediaCount} static print figures, ${architectureNodeCount} architecture nodes and ${timelinePhaseCount} phases.`,
);
