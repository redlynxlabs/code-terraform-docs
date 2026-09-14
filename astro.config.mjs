// terraform.wiki: Astro + Starlight over the Obsidian vault in src/content/docs.
// Astro 7 note: the default Markdown processor does not run remark plugins, so
// the unified() processor from @astrojs/markdown-remark is configured explicitly.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import remarkCallouts from './scripts/remark-callouts.mjs';
import remarkWikilinks from './scripts/remark-wikilinks.mjs';

export default defineConfig({
  site: 'https://terraform.wiki',
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkCallouts,
        [remarkWikilinks, { strict: !!process.env.STRICT_LINKS }],
      ],
    }),
  },
  integrations: [
    starlight({
      title: 'terraform.wiki',
      description:
        'Unofficial field documentation for Code: Terraform. Every machine API, every type, every recipe, readable outside the game.',
      logo: { src: './src/assets/logo.svg', alt: '' },
      favicon: '/favicon.svg',
      lastUpdated: true,
      editLink: {
        baseUrl: 'https://github.com/redlynxlabs/code-terraform-docs/edit/main/',
      },
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://terraform.wiki/og.png' } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://terraform.wiki/og.png' } },
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/redlynxlabs/code-terraform-docs',
        },
      ],
      customCss: [
        '@fontsource/space-grotesk/500.css',
        '@fontsource/space-grotesk/700.css',
        '@fontsource/jetbrains-mono/400.css',
        '@fontsource/jetbrains-mono/700.css',
        './src/styles/custom.css',
      ],
      sidebar: [
        { slug: 'home' },
        { label: 'Start Here', items: [{ autogenerate: { directory: 'Start Here' } }] },
        { label: 'Tutorials', items: [{ autogenerate: { directory: 'Tutorials' } }] },
        { label: 'Programming', items: [{ autogenerate: { directory: 'Programming' } }] },
        { label: 'Language', items: [{ autogenerate: { directory: 'Language' } }] },
        { label: 'Built-in Modules', items: [{ autogenerate: { directory: 'Built-in Modules' } }] },
        { label: 'Editor & Tools', items: [{ autogenerate: { directory: 'Editor & Tools' } }] },
        { label: 'Automation Systems', items: [{ autogenerate: { directory: 'Automation Systems' } }] },
        { label: 'Production & Logistics', items: [{ autogenerate: { directory: 'Production & Logistics' } }] },
        { label: 'World & Infrastructure', items: [{ autogenerate: { directory: 'World & Infrastructure' } }] },
        { label: 'Commands', items: [{ autogenerate: { directory: 'Commands' } }] },
        { label: 'Reference', items: [{ autogenerate: { directory: 'Reference' } }] },
        { label: 'Components', collapsed: true, items: [{ autogenerate: { directory: 'Components' } }] },
        { label: 'Types', collapsed: true, items: [{ autogenerate: { directory: 'Types' } }] },
        { label: 'Database', collapsed: true, items: [{ autogenerate: { directory: 'Database' } }] },
      ],
    }),
  ],
});
