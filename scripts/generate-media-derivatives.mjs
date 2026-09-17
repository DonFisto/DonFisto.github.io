// Optional authoring tool; ImageMagick is not required by build/CI.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const exec = promisify(execFile);
const root = 'public/media/autonomous-driving';
for (const name of ['planning', 'lane-detection', 'tracking-overlay', 'segmentation-overlay']) {
  await exec('convert', [`${root}/${name}.png`, '-quality', '88', `${root}/${name}.webp`]);
}
for (const name of ['project-demo','mapping-demo']) {
  await exec('convert', [`${root}/${name}.gif[0]`, `${root}/${name}-poster.png`]);
}
console.log('Generated uncropped WebP copies and historical first-frame posters.');
