import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One entry per generator, synced from the engine repository's INFO.md files
// by scripts/sync-content.mjs. The id is the filename (= the generator id).
const generators = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/generators' }),
  schema: z.object({
    title: z.string(),
    blurb: z.string(),
    category: z.enum(['design', 'maze', 'puzzle', 'word']),
    version: z.string(),
  }),
});

export const collections = { generators };
