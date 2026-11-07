import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('[build] dist/index.html is missing — run vite build first.');
  process.exit(1);
}

// Vite only emits client/ into dist. The site references images/ and favicon/
// from the project root, so copy them in for static hosts such as Vercel.
for (const dir of ['images', 'favicon']) {
  const from = path.join(root, dir);
  if (!fs.existsSync(from)) {
    console.log(`[build] ${dir}/ not found, skipping`);
    continue;
  }
  fs.cpSync(from, path.join(dist, dir), { recursive: true });
  console.log(`[build] copied ${dir}/ → dist/${dir}/`);
}
