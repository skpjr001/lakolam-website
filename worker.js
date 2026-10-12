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
//
// Sponsor slots are filled here too: sponsors.json in the R2 bucket bound as
// SPONSORS (see src/lib/sponsor-slots.js for its format) is read at most once
// a minute per isolate and written into each HTML page as it streams out, and
// the bucket's logos/ folder is served at /sponsors/logos/. If the file is
// missing or invalid, pages keep the build's open slots.
import { createAEOWorker } from '@dualmark/cloudflare';
import {
  firstOpen,
  parseSponsors,
  priceSummary,
  slotOption,
  tileHtml,
} from './src/lib/sponsor-slots.js';

const aeo = createAEOWorker({
  upstream: { fetch: (request, env) => env.ASSETS.fetch(request) },
  // Cloudflare's html_handling already redirects to the trailing slash.
  trailingSlash: 'preserve',
  enableLinkHeader: true,
  headers: { cacheControl: 'public, max-age=3600' },
});

const LLMS_FILES = new Set(['/llms.txt', '/llms-full.txt']);

const SPONSORS_TTL_MS = 60_000;
let sponsorsCache = { at: -Infinity, data: null };

/** sponsors.json from R2, cleaned, or null (then pages keep their build). */
async function loadSponsors(env) {
  const now = Date.now();
  if (now - sponsorsCache.at < SPONSORS_TTL_MS) return sponsorsCache.data;
  let data = null;
  try {
    const object = await env.SPONSORS?.get('sponsors.json');
    if (object) data = parseSponsors(await object.json());
  } catch (error) {
    console.error(`sponsors.json ignored: ${error.message}`);
  }
  sponsorsCache = { at: now, data };
  return data;
}

/** Write the live sponsors into a page as it streams through. */
function fillSponsors(response, { slots }) {
  const open = firstOpen(slots);
  let variant = 'wide';
  const rewriter = new HTMLRewriter()
    .on('[data-sponsor-grid]', {
      element(el) {
        variant = el.getAttribute('data-sponsor-grid') || 'wide';
      },
    })
    .on('li[data-sponsor-slot]', {
      element(el) {
        const n = Number(el.getAttribute('data-sponsor-slot'));
        const sponsor = slots[n - 1]?.sponsor;
        if (sponsor) el.setInnerContent(tileHtml(sponsor, n, variant), { html: true });
      },
    })
    .on('a[data-sponsor-advertise]', {
      element(el) {
        el.setAttribute('href', open ? `/sponsor/?slot=${open}` : '/sponsor/');
      },
    })
    .on('[data-sponsor-prices]', {
      element(el) {
        el.setInnerContent(priceSummary(slots));
      },
    })
    .on('option[data-sponsor-option]', {
      element(el) {
        const n = Number(el.getAttribute('data-sponsor-option'));
        const slot = slots[n - 1];
        if (!slot || slot.sponsor) {
          el.remove();
          return;
        }
        el.setAttribute('data-price', String(slot.price));
        el.setInnerContent(slotOption(slots, n));
      },
    });
  if (!open) {
    rewriter
      .on('[data-sponsor-full]', { element: (el) => el.removeAttribute('hidden') })
      .on('#sponsor-form', { element: (el) => el.remove() });
  }
  const out = rewriter.transform(response);
  const headers = new Headers(out.headers);
  // The page now depends on sponsors.json as well as the build.
  headers.delete('ETag');
  headers.delete('Last-Modified');
  headers.set('Cache-Control', 'public, max-age=300');
  return new Response(out.body, { status: out.status, statusText: out.statusText, headers });
}

/** A logo from the bucket's logos/ folder. */
async function serveLogo(env, pathname) {
  const name = pathname.slice('/sponsors/logos/'.length);
  if (!/^[\w.-]+$/.test(name)) return new Response('Not found', { status: 404 });
  const object = await env.SPONSORS?.get(`logos/${name}`);
  if (!object) return new Response('Not found', { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  if (!headers.has('Content-Type')) {
    const ext = name.split('.').pop().toLowerCase();
    const types = { png: 'image/png', svg: 'image/svg+xml', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif' };
    headers.set('Content-Type', types[ext] ?? 'application/octet-stream');
  }
  headers.set('Cache-Control', 'public, max-age=3600');
  headers.set('ETag', object.httpEtag);
  headers.set('X-Content-Type-Options', 'nosniff');
  return new Response(object.body, { headers });
}

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    if (pathname.startsWith('/sponsors/logos/') && (request.method === 'GET' || request.method === 'HEAD')) {
      return serveLogo(env, pathname);
    }
    const sponsors = await loadSponsors(env);
    // A page's sponsors can change without a deploy, so the build's ETag
    // must not let a browser keep a stale copy with a 304.
    if (sponsors) {
      const headers = new Headers(request.headers);
      headers.delete('If-None-Match');
      headers.delete('If-Modified-Since');
      request = new Request(request, { headers });
    }
    let response = await aeo.fetch(request, env, ctx);
    if (sponsors && response.status === 200 && (response.headers.get('Content-Type') ?? '').startsWith('text/html')) {
      response = fillSponsors(response, sponsors);
    }

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
