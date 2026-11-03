import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'));
const initial = new Set();
function visit(key) {
  if (initial.has(key)) return;
  initial.add(key);
  for (const dependency of manifest[key].imports ?? []) visit(dependency);
}
visit('index.html');
let initialBytes = 0;
for (const key of initial) {
  const file = manifest[key].file;
  assert(!file.includes('three-'), `3D library loaded eagerly: ${file}`);
  initialBytes += (await stat(`dist/${file}`)).size;
}
assert(initialBytes < 600_000, `Initial JS exceeds 600 KB: ${initialBytes}`);
for (const entry of Object.values(manifest)) {
  if (!entry.file.endsWith('.js')) continue;
  const { size } = await stat(`dist/${entry.file}`);
  assert(size < 500_000, `Chunk exceeds 500 KB: ${entry.file} (${size})`);
}
console.log(`Bundle checks passed. Initial JS: ${(initialBytes / 1000).toFixed(1)} KB. No eager 3D libraries or chunks over 500 KB.`);
