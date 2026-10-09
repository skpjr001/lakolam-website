// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

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
        !/\/(designs|mazes|puzzles|words|maths)\/$/.test(new URL(page).pathname),
    }),
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
