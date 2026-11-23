// news-image-20261122 entry: the world's news of Sunday 22 November 2026 on one page.
// entry.png beside this file is drawn by tools/render.mjs from src/page.html; this program (Node 22, standard
// library only, no network) checks it is a whole PNG within the gate's limits and copies it to /output/entry.png.
// Locally: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const image = readFileSync(new URL('./entry.png', import.meta.url));
const isPng = image.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
const width = image.readUInt32BE(16);
const height = image.readUInt32BE(20);
if (!isPng || width > 1024 || height > 1024 || image.length > 1048576) {
  throw new Error(`entry.png is outside the gate: png=${isPng} ${width}x${height} ${image.length} bytes`);
}
writeFileSync(join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'), image);
