import { execFile } from 'node:child_process';
import { readFile, stat, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { promisify } from 'node:util';
const exec = promisify(execFile);
const root = 'public/media/autonomous-driving';
const provenance = JSON.parse(await readFile(`${root}/provenance.json`, 'utf8'));
const metadata = {};
for (const [key, asset] of Object.entries(provenance.assets)) {
  const path = `public${asset.portfolioPath}`;
  const bytes = await readFile(path);
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  if (sha256 !== asset.sourceSha256) throw new Error(`Source checksum mismatch: ${path}`);
  const {stdout} = await exec('identify', ['-format', '%w %h', path.endsWith('.gif') ? `${path}[0]` : path]);
  const [width, height] = stdout.trim().split(/\s+/).map(Number);
  if (!(width > 0 && height > 0)) throw new Error(`Invalid dimensions: ${path}`);
  metadata[key] = {width, height, sizeBytes:(await stat(path)).size, sha256};
}
await writeFile('src/data/generatedMedia.ts', `import type { GeneratedMediaMetadata } from './types';\n\nexport const mediaMetadata = ${JSON.stringify(metadata,null,2)} satisfies Record<string, GeneratedMediaMetadata>;\n`);
console.log('Verified provenance and generated metadata for', Object.keys(metadata).length, 'authentic assets.');
