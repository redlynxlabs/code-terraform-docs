// Shared slug + wikilink resolution for terraform.wiki.
// The SAME cleanSlug feeds Astro's content loader (generateId) and the
// remark wikilink plugin, so page URLs and resolved links agree by construction.
import fs from 'node:fs';
import path from 'node:path';

// One path segment -> one URL segment: lowercase, any run of
// non-letter/non-digit becomes a single hyphen, trimmed.
export function slugSegment(name) {
  return name
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

// "Editor & Tools/Code Editor.md" -> "editor-tools/code-editor"
// A root "index.mdx" keeps the id "index" (Starlight serves it at "/").
export function cleanSlug(relPath) {
  const noExt = relPath.replace(/\.(md|mdx)$/i, '');
  const slug = noExt.split(/[\\/]/).map(slugSegment).filter(Boolean).join('/');
  return slug.replace(/\/index$/, '');
}

function parseFrontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!m) return { aliases: [], slug: null };
  const fm = m[1];
  const aliases = [];
  const am = /(^|\n)aliases:\s*\n((?:[ \t]+-[^\n]*\n?)+)/.exec(fm + '\n');
  if (am) {
    for (const line of am[2].split('\n')) {
      const alias = line.replace(/^[ \t]+-[ \t]*/, '').trim().replace(/^["']|["']$/g, '');
      if (alias) aliases.push(alias);
    }
  }
  const sm = /(^|\n)slug:[ \t]*(["']?)([^\n"']+)\2[ \t]*(\n|$)/.exec(fm);
  return { aliases, slug: sm ? sm[3].trim() : null };
}

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === '.obsidian') continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else if (/\.(md|mdx)$/i.test(name)) out.push(full);
  }
  return out;
}

// Map of lowercased filename stems + frontmatter aliases -> site slug.
export function buildIndex(docsDir) {
  const map = new Map();
  const collisions = [];
  const claim = (key, slug, source) => {
    const k = key.toLowerCase();
    if (map.has(k) && map.get(k) !== slug) {
      collisions.push(`"${key}" -> ${map.get(k)} vs ${slug} (${source})`);
      return;
    }
    map.set(k, slug);
  };
  for (const file of walk(docsDir)) {
    const rel = path.relative(docsDir, file);
    const { aliases, slug: fmSlug } = parseFrontmatter(fs.readFileSync(file, 'utf8'));
    const slug = fmSlug !== null ? fmSlug : cleanSlug(rel);
    const stem = path.basename(file).replace(/\.(md|mdx)$/i, '');
    if (stem.toLowerCase() !== 'index') claim(stem, slug, rel);
    for (const alias of aliases) claim(alias, slug, rel);
  }
  return { map, collisions };
}

export function resolveTarget(index, target) {
  return index.map.get(target.trim().toLowerCase()) ?? null;
}
