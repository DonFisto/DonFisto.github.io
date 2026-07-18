import { readFile, writeFile } from "node:fs/promises";

const headerPath = "src/components/SiteHeader.astro";
const pdfPath = "/downloads/Daniel-Martinez-Cabeza-de-Vaca-Robotics-Portfolio.pdf";
const header = await readFile(headerPath, "utf8");

if (header.includes(pdfPath)) {
  console.log("PDF navigation link already present.");
} else {
  const target = '<a href="/portfolio-print/">A4 preview</a>';
  const occurrences = header.split(target).length - 1;

  if (occurrences < 1) {
    throw new Error(
      `Could not find the A4 preview navigation link in ${headerPath}. ` +
      "Refusing to apply an unverified source patch."
    );
  }

  const replacement =
    `${target}\n` +
    `      <a href="${pdfPath}" download>Download PDF</a>`;

  const updated = header.split(target).join(replacement);
  await writeFile(headerPath, updated, "utf8");
  console.log(`Added PDF download link after ${occurrences} A4 preview link(s).`);
}
