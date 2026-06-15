import { mkdir, rm, copyFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const files = ['index.html', 'styles.css', 'app.js', 'README.md'];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const file of files) {
  const source = join(root, file);
  await access(source, constants.F_OK);
  await copyFile(source, join(dist, file));
}

console.log(`Built ${files.length} files into dist/`);
