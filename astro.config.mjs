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
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Never inline assets as base64 — keeps HTML lean and lets the CDN
      // cache images independently.
      assetsInlineLimit: 0,
    },
  },
});
