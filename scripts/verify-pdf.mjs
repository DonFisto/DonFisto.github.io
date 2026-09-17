import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { PDFDocument } from "pdf-lib";

const publicPdf = resolve(
  "public/downloads/Daniel-Martinez-Cabeza-de-Vaca-Robotics-Portfolio.pdf"
);
const builtPdf = resolve(
  "dist/downloads/Daniel-Martinez-Cabeza-de-Vaca-Robotics-Portfolio.pdf"
);

const EXPECTED_WIDTH = 841.89;
const EXPECTED_HEIGHT = 595.28;
const TOLERANCE = 1.5;

async function verifyFile(path, label) {
  const file = await stat(path);
  if (!file.isFile() || file.size < 20_000) {
    throw new Error(`${label} PDF is missing or unexpectedly small: ${file.size} bytes.`);
  }

  const bytes = await readFile(path);
  const document = await PDFDocument.load(bytes);
  const pages = document.getPages();

  if (pages.length !== 4) {
    throw new Error(`${label} PDF must contain exactly four pages; found ${pages.length}.`);
  }

  pages.forEach((page, index) => {
    const { width, height } = page.getSize();
    const valid =
      Math.abs(width - EXPECTED_WIDTH) <= TOLERANCE &&
      Math.abs(height - EXPECTED_HEIGHT) <= TOLERANCE;

    if (!valid) {
      throw new Error(
        `${label} page ${index + 1} is not A4 landscape: ` +
        `${width.toFixed(2)} × ${height.toFixed(2)} pt.`
      );
    }
  });

  console.log(
    `${label} PDF verified: ${pages.length} A4-landscape pages, ${file.size} bytes.`
  );
}

await verifyFile(publicPdf, "Public");
await verifyFile(builtPdf, "Built");

const publicBytes = await readFile(publicPdf);
const builtBytes = await readFile(builtPdf);
if (!publicBytes.equals(builtBytes)) throw new Error("Built PDF differs from the freshly exported public PDF.");
console.log("Public and built PDFs are byte-identical.");
