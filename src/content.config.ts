import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
// Shared slug scheme: the wikilink resolver uses the same function, so page
// URLs and resolved [[links]] agree by construction.
import { cleanSlug } from '../scripts/lib/wiki.mjs';

export const collections = {
  docs: defineCollection({
    loader: docsLoader({
      generateId: ({ entry, data }) =>
        data.slug ? String(data.slug) : cleanSlug(entry),
    }),
    schema: docsSchema({
      extend: z.object({
        aliases: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  }),
};
