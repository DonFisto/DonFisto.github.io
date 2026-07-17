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

const forbidden = ["tel:", "Formula Student", "+34 665"];
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
];

for (const phrase of requiredPhrases) {
  if (!combined.includes(phrase)) {
    throw new Error(`Required integrity phrase is absent: ${phrase}`);
  }
}

console.log("Phase 2 foundation verification passed.");
console.log(`Verified ${required.length} routes and ${pageCount} print pages.`);
