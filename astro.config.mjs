// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { writeMarkdownTwins } from './scripts/markdown-twins.mjs';

// After the build: a markdown twin of every page, /llms.txt, /llms-full.txt
// and /sitemap.md, for AI agents (see scripts/markdown-twins.mjs, worker.ts).
/** @type {import('astro').AstroIntegration} */
const markdownTwins = {
  name: 'lakolam:markdown-twins',
  hooks: {
    'astro:build:done': ({ dir, logger }) => {
      const n = writeMarkdownTwins(fileURLToPath(dir));
      logger.info(`${n} markdown twins, llms.txt, llms-full.txt, sitemap.md`);
    },
  },
};

export default defineConfig({
  // `site` powers canonical URLs, the sitemap, OG URLs and JSON-LD ids —
  // change it here and everything follows. The name matches the Workers
  // static-assets deploy in wrangler.jsonc.
  site: 'https://www.lakolam.com',
  output: 'static',
  trailingSlash: 'always',
  // Inline the CSS into every page: a refresh then never paints unstyled
  // HTML (a full-size logo, shifting layout) while a stylesheet loads.
  build: { inlineStylesheets: 'always' },
  // The lane pages (/designs/, /mazes/ …) are noindex collection pages, so
  // they stay out of the sitemap too.
  integrations: [
    sitemap({
      filter: (page) =>
        !/^\/(designs|mazes|puzzles|words|maths|paper)\/$/.test(new URL(page).pathname),
      // Image sitemap entries: each generator page's engine-rendered preview,
      // so the pages can surface in image search ("printable sudoku").
      serialize(item) {
        const id = new URL(item.url).pathname.match(/^\/generators\/([^/]+)\/$/)?.[1];
        // `img` is passed through to the sitemap writer (not in SitemapItem's type).
        return id
          ? Object.assign(item, { img: [{ url: `https://www.lakolam.com/og/generators/${id}.png` }] })
          : item;
      },
    }),
    markdownTwins,
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Never inline assets as base64 — keeps HTML lean and lets the CDN
      // cache images independently.
      assetsInlineLimit: 0,
    },
  },
});
