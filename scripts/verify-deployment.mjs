import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const pdfHref =
  "/downloads/Daniel-Martinez-Cabeza-de-Vaca-Robotics-Portfolio.pdf";

const requiredFiles = [
  "dist/index.html",
  "dist/projects/autonomous-driving/index.html",
  "dist/portfolio-print/index.html",
  "dist/404.html",
  `dist${pdfHref}`,
];

for (const file of requiredFiles) {
  const information = await stat(resolve(file));
  if (!information.isFile() || information.size < 200) {
    throw new Error(`Missing or unexpectedly small release file: ${file}`);
  }
}

const root = await readFile("dist/index.html", "utf8");
const project = await readFile(
  "dist/projects/autonomous-driving/index.html",
  "utf8"
);

for (const [label, html] of [
  ["homepage", root],
  ["project page", project],
]) {
  if (!html.includes(pdfHref)) {
    throw new Error(`The ${label} does not expose the downloadable PDF.`);
  }
}

const forbidden = ["tel:", "+34 665", "Formula Student"];
for (const value of forbidden) {
  if (`${root}\n${project}`.includes(value)) {
    throw new Error(`Forbidden release content found: ${value}`);
  }
}

console.log(
  "Release verification passed: core routes, downloadable PDF and privacy rules are valid."
);
