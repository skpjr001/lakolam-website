# lakolam-website

The marketing site for [Lakolam](https://github.com/skpjr001/lakolam) —
deterministic generative designs, mazes and puzzles. Astro 7, Tailwind 4,
static output, deployed as Cloudflare Workers static assets.

## Develop

```sh
npm install
npm run dev        # → http://localhost:4321
npm run build      # → dist/
npx wrangler deploy
```

## How content gets here

The 55 generator pages are synced from the engine repository — each page is
the generator's own `INFO.md` plus its catalogue line, and every image is real
engine output rendered at seed `0xa11ce`:

```sh
# 1. In the engine repo: render the artwork into assets-src/
#    (thumbnail + og_image profiles for every generator; see assets-src/gen.log)
# 2. Here: sync content + imagery, then commit the result.
LAKOLAM_REPO=/path/to/lakolam node scripts/sync-content.mjs
```

The synced output is committed, so this site builds standalone.

## Performance & SEO posture

- Static HTML; no client JS except the theme toggle (~10 lines) and two
  three.js scenes (the phyllotaxis hero and the self-solving maze). Both are
  lazily imported on `requestIdleCallback`, skipped entirely under
  `prefers-reduced-motion`, and pause offscreen; three.js itself is one
  shared chunk (~127 KB gz) and each scene costs ~1.7 KB gz on top. The LCP
  hero is a ~1 KB inline SVG of the same phyllotaxis spiral; the maze's
  fallback is a real engine render.
- Canonicals, Open Graph + Twitter cards, per-generator OG images (1200×630),
  sitemap (`@astrojs/sitemap`), robots.txt, JSON-LD on every page
  (Organization, WebSite, SoftwareApplication, SoftwareSourceCode,
  BreadcrumbList, ItemList, CreativeWork, FAQPage) emitted as one @graph per
  page with @id cross-references, so the entities interlink.
- Thumbnails go through `astro:assets` (webp, lazy, sized).

## Brand kit

`brand/BRAND.md` is the source of truth; downloadables (marks, lockups,
tokens) are served from `public/brand/` and presented at `/brand/`.
