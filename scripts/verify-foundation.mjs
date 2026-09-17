import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
const routes = ['dist/index.html','dist/projects/autonomous-driving/index.html','dist/portfolio-print/index.html','dist/404.html'];
const pages = await Promise.all(routes.map(async path => {
  if ((await stat(path)).size < 200) throw new Error(`Missing/empty route: ${path}`);
  return readFile(path,'utf8');
}));
const [home, project, print] = pages;
const requireText = (html, value, label) => { if (!html.includes(value)) throw new Error(`${label}: missing ${value}`); };
for (const [label, html] of [['home',home],['case study',project],['print',print]]) {
  for (const value of ['Autonomous Driving','LaneMap','RoutePlan','OpenDRIVE','Individual engineering project','data-status="next"','not implemented']) requireText(html,value,label);
  for (const value of ['tel:', '+34', 'Formula Student', 'LiDAR', 'Murcia, Spain', 'Current location', 'currentLocation', 'Autonomous-Driving Perception &amp; Local Mapping', 'Autonomous-Driving Perception & Local Mapping']) {
    if (html.includes(value)) throw new Error(`${label}: forbidden/stale published content ${value}`);
  }
  if (!/trajectory[\s\S]*control/i.test(html)) throw new Error(`${label}: future trajectory/control boundary absent`);
}
for (const value of ['data-stream="local"','data-stream="global"','Future','not ID equality','privileged map information']) requireText(project,value,'architecture');
for (const topic of ['/carla/hero_odom','/perception/lane/tracked_centerline','/perception/lane/local_map/vector','/planning/goal','/planning/route_plan']) requireText(project,topic,'interfaces');
for (const html of [home,project]) {
  for (const mode of ['system','light','dark']) requireText(html,`<option value="${mode}"`, 'theme selection');
  requireText(html, 'aria-label="Color theme"', 'accessible theme selection');
  for (const meta of ['rel="canonical"','property="og:image"','name="twitter:card"']) requireText(html,meta,'metadata');
  if (/<(?:img|source|video)\b[^>]*(?:src|srcset)="[^"]*\.gif/i.test(html)) throw new Error('GIF loaded without user interaction');
}
if ((print.match(/class="pdf-page"/g) ?? []).length !== 4) throw new Error('Print must have exactly four sheets');
if (print.includes('portfolio-theme') || print.includes('class="theme-selector"')) throw new Error('Print must be independent of web theme persistence');
if (print.includes('.gif') || print.includes('data-motion-media=')) throw new Error('Print must use only static media');
// Every local resource and link target resolves against the generated artifact.
for (let i=0;i<pages.length;i++) {
  const html = pages[i];
  const pathname = routes[i].replace(/^dist/,'').replace(/index\.html$/,'');
  for (const match of html.matchAll(/\b(?:href|src|srcset|data-src)="([^"]+)"/g)) {
    const value = match[1].replaceAll('&amp;','&');
    if (!value.startsWith('/') && !value.startsWith('#')) continue;
    const url = new URL(value, `https://donfisto.github.io${pathname}`);
    const path = resolve('dist', `.${decodeURIComponent(url.pathname)}`, url.pathname.endsWith('/') ? 'index.html' : '');
    if (!(await stat(path).catch(()=>null))?.isFile()) throw new Error(`${routes[i]} broken local target: ${value}`);
    if (url.hash) {
      const destination = await readFile(path,'utf8');
      if (!destination.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) throw new Error(`Broken anchor: ${value}`);
    }
  }
}
const provenance = JSON.parse(await readFile('public/media/autonomous-driving/provenance.json','utf8'));
if (!/^[a-f0-9]{40}$/.test(provenance.commit) || !provenance.branch) throw new Error('Missing exact source provenance');
for (const key of ['planning','lanePhoto','laneDemo','projectDemo','trackingOverlay','mappingDemo','segmentationOverlay']) {
  const asset=provenance.assets[key];
  if (!asset) throw new Error(`Missing media ${key}`);
  for (const base of ['public','dist']) {
    const bytes=await readFile(`${base}${asset.portfolioPath}`);
    if (createHash('sha256').update(bytes).digest('hex')!==asset.sourceSha256) throw new Error(`Media checksum failed: ${key} in ${base}`);
  }
}
// PublicProfile is a typed allowlist; never add private fields to the source object.
const profile = await readFile('src/data/personal.ts','utf8');
requireText(profile,'satisfies PublicProfile','typed privacy allowlist');
requireText(profile,'publicContactFields: ["email", "github"]','contact allowlist');
if (/\b(?:phone|address|location|currentLocation)\s*:/.test(profile)) throw new Error('Private profile field introduced');
console.log('Portfolio invariants passed: 4 routes; two-stream architecture; current scope and boundaries; 5 interfaces; static print; on-demand motion; privacy; local links/assets; 7 media checksums.');
