// Draws the front page: renders src/page.html (HTML + inline SVG, built by its own script) to
// entry.png at 1024x1024 with headless Microsoft Edge, then checks the file against the contest
// gate: a whole PNG, at most 1 MiB and at most 1024x1024 pixels.
//   node tools/render.mjs
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync, mkdtempSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const page = pathToFileURL(join(root, 'src', 'page.html')).href;
const out = join(root, 'entry.png');
const browser = process.env.EDGE ?? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const profile = mkdtempSync(join(tmpdir(), 'news-render-'));

try {
  execFileSync(browser, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--virtual-time-budget=3000', `--user-data-dir=${profile}`, '--window-size=1024,1024',
    `--screenshot=${out}`, page,
  ], { stdio: 'inherit', timeout: 60_000 });
} finally {
  rmSync(profile, { recursive: true, force: true });
}

const png = readFileSync(out);
const magic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const ok = png.subarray(0, 8).equals(magic) && png.subarray(-8, -4).toString('latin1') === 'IEND';
const width = png.readUInt32BE(16), height = png.readUInt32BE(20), bytes = statSync(out).size;
console.log(`entry.png: whole png=${ok} ${width}x${height} ${bytes} bytes`);
if (!ok || width > 1024 || height > 1024 || bytes > 1048576) {
  console.error('entry.png fails the gate');
  process.exit(1);
}
