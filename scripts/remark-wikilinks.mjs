// Resolves Obsidian-style [[wiki links]] against filename stems and
// frontmatter aliases, producing site-absolute links. Forms handled:
//   [[Page]]  [[Page|label]]  [[Page#Heading]]  [[Page#Heading|label]]
// Unresolved links are left as literal text and reported; set STRICT_LINKS=1
// to fail the build instead.
import path from 'node:path';
import { slug as headingSlug } from 'github-slugger';
import { buildIndex, resolveTarget } from './lib/wiki.mjs';

const WIKILINK = /\[\[([^\]|#\n]+?)(?:#([^\]|\n]+?))?(?:\|([^\]\n]+?))?\]\]/g;

let cached = null;
function index(docsDir) {
  if (!cached) {
    cached = buildIndex(docsDir);
    for (const c of cached.collisions) {
      console.warn(`[wikilinks] name collision: ${c}`);
    }
  }
  return cached;
}

export default function remarkWikilinks(options = {}) {
  const docsDir = options.docsDir ?? path.resolve('src/content/docs');
  const strict = options.strict ?? false;
  const unresolved = [];

  function transformText(node) {
    const parts = [];
    let last = 0;
    let m;
    WIKILINK.lastIndex = 0;
    while ((m = WIKILINK.exec(node.value)) !== null) {
      const [raw, target, heading, label] = m;
      const slug = resolveTarget(index(docsDir), target);
      if (m.index > last) parts.push({ type: 'text', value: node.value.slice(last, m.index) });
      if (slug === null) {
        unresolved.push(target);
        console.warn(`[wikilinks] unresolved: [[${target}]]`);
        parts.push({ type: 'text', value: (label ?? target) });
      } else {
        const anchor = heading ? `#${headingSlug(heading)}` : '';
        parts.push({
          type: 'link',
          url: `/${slug}${slug ? '/' : ''}${anchor}`,
          children: [{ type: 'text', value: label ?? target }],
        });
      }
      last = m.index + raw.length;
    }
    if (parts.length === 0) return null;
    if (last < node.value.length) parts.push({ type: 'text', value: node.value.slice(last) });
    return parts;
  }

  function walk(parent) {
    if (!parent.children) return;
    for (let i = 0; i < parent.children.length; i++) {
      const child = parent.children[i];
      if (child.type === 'code' || child.type === 'inlineCode') continue;
      if (child.type === 'text') {
        const parts = transformText(child);
        if (parts) {
          parent.children.splice(i, 1, ...parts);
          i += parts.length - 1;
        }
      } else {
        walk(child);
      }
    }
  }

  return (tree) => {
    walk(tree);
    if (strict && unresolved.length > 0) {
      throw new Error(`[wikilinks] ${unresolved.length} unresolved wiki links`);
    }
  };
}
