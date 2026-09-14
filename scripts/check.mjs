// Content checker for terraform.wiki: every [[wiki link]] must resolve against
// filename stems + frontmatter aliases (same resolver the site build uses), and
// no em/en dashes anywhere. Run: npm run check. Exits 1 on any failure.
import fs from 'node:fs';
import path from 'node:path';
import { buildIndex, resolveTarget } from './lib/wiki.mjs';

const DOCS = path.resolve('src/content/docs');
const WIKILINK = /\[\[([^\]|#\n]+?)(?:#[^\]|\n]*?)?(?:\|[^\]\n]*?)?\]\]/g;

function files(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === '.obsidian') continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) files(full, out);
    else if (/\.(md|mdx)$/i.test(name)) out.push(full);
  }
  return out;
}

const stripCode = (text) =>
  text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');

const index = buildIndex(DOCS);
const dashHits = [];
const broken = [];
let totalLinks = 0;

for (const file of files(DOCS)) {
  const rel = path.relative(DOCS, file);
  const raw = fs.readFileSync(file, 'utf8');

  raw.split('\n').forEach((line, i) => {
    if (line.includes('—') || line.includes('–')) {
      dashHits.push(`${rel}:${i + 1}: ${line.trim().slice(0, 80)}`);
    }
  });

  const text = stripCode(raw);
  let m;
  WIKILINK.lastIndex = 0;
  while ((m = WIKILINK.exec(text)) !== null) {
    totalLinks++;
    if (resolveTarget(index, m[1]) === null) {
      broken.push(`${rel} -> [[${m[1].trim()}]]`);
    }
  }
}

console.log(`pages: ${files(DOCS).length}`);
console.log(`wiki links: ${totalLinks}`);
console.log(`dash violations: ${dashHits.length}`);
dashHits.slice(0, 40).forEach((h) => console.log('  DASH', h));
console.log(`broken links: ${broken.length}`);
[...new Set(broken)].slice(0, 60).forEach((b) => console.log('  LINK', b));
if (index.collisions.length) {
  console.log(`name collisions: ${index.collisions.length}`);
  index.collisions.forEach((c) => console.log('  COLLIDE', c));
}

if (dashHits.length || broken.length || index.collisions.length) process.exit(1);
console.log('OK');
