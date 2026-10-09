// The www.lakolam.com Worker: static assets (dist/) behind Dualmark's AEO
// edge adapter (https://dualmark.dev, AEO Spec v1.0).
//
// - `Accept: text/markdown`, and known AI crawlers (GPTBot, ClaudeBot,
//   PerplexityBot …; never Googlebot or Bingbot), get a page's markdown twin
//   at the page's own URL; /about.md serves it directly.
// - Every HTML page advertises its twin: `Link: </about.md>; rel="alternate";
//   type="text/markdown"` and `Vary: Accept`.
// The twins, /llms.txt, /llms-full.txt and /sitemap.md are written at build
// time by scripts/markdown-twins.mjs.
import { createAEOWorker } from '@dualmark/cloudflare';

const aeo = createAEOWorker({
  upstream: { fetch: (request, env) => env.ASSETS.fetch(request) },
  // Cloudflare's html_handling already redirects to the trailing slash.
  trailingSlash: 'preserve',
  enableLinkHeader: true,
  headers: { cacheControl: 'public, max-age=3600' },
});

const LLMS_FILES = new Set(['/llms.txt', '/llms-full.txt']);

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    const response = await aeo.fetch(request, env, ctx);

    if (LLMS_FILES.has(pathname) && response.ok) {
      const headers = new Headers(response.headers);
      headers.set('Content-Type', 'text/plain; charset=utf-8');
      headers.set('X-Robots-Tag', 'noindex');
      headers.set('Cache-Control', 'public, max-age=3600');
      return new Response(response.body, { status: response.status, headers });
    }
    // Only real pages have twins: no Link header on the 404 page.
    if (response.status !== 200 && response.headers.has('Link')) {
      const headers = new Headers(response.headers);
      headers.delete('Link');
      return new Response(response.body, { status: response.status, headers });
    }
    return response;
  },
};
