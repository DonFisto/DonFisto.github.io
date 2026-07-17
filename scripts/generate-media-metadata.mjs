import { execFile } from "node:child_process";
import { stat, writeFile } from "node:fs/promises";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const assets = {
  projectDemo: "public/media/autonomous-driving/project-demo.gif",
  segmentationOverlay: "public/media/autonomous-driving/segmentation-overlay.png",
  trackingOverlay: "public/media/autonomous-driving/tracking-overlay.png",
  mappingDemo: "public/media/autonomous-driving/mapping-demo.gif",
};

const metadata = {};

for (const [key, path] of Object.entries(assets)) {
  const target = path.endsWith(".gif") ? `${path}[0]` : path;
  const { stdout } = await execFileAsync("identify", ["-format", "%w %h", target]);
  const [width, height] = stdout.trim().split(/\s+/).map(Number);
  const file = await stat(path);

  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    throw new Error(`Could not determine valid dimensions for ${path}`);
  }

  metadata[key] = {
    width,
    height,
    sizeBytes: file.size,
  };
}

const output = [
  'import type { GeneratedMediaMetadata } from "./types";',
  "",
  `export const mediaMetadata: Record<string, GeneratedMediaMetadata> = ${JSON.stringify(metadata, null, 2)};`,
  "",
].join("\n");

await writeFile("src/data/generatedMedia.ts", output, "utf8");
console.log("Generated media metadata:", metadata);
