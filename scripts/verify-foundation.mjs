import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const required = [
  "dist/index.html",
  "dist/projects/autonomous-driving/index.html",
  "dist/portfolio-print/index.html",
  "dist/404.html",
];

for (const file of required) {
  const info = await stat(resolve(file));
  if (!info.isFile() || info.size < 200) {
    throw new Error(`Missing or unexpectedly small build output: ${file}`);
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

if (!project.includes('aria-labelledby="architecture-title architecture-description"')) {
  throw new Error("Accessible architecture title and description are missing.");
}

if (!print.includes("architecture-title-print") || !print.includes("architecture-description-print")) {
  throw new Error("Print route does not contain the vector architecture diagram.");
}

console.log("Phase 3 technical-content verification passed.");
console.log(
  `Verified ${required.length} routes, ${pageCount} print pages, ${architectureNodeCount} architecture nodes, ` +
    `${architectureEdgeCount} edges, ${topicCount} topics, ${technicalDetailCount} technical cards and ${timelinePhaseCount} phases.`,
);
