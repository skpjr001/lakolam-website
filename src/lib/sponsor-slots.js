// Sponsor slots — the one source for their data rules and their markup.
//
// The live list is sponsors.json in the R2 bucket `lakolam-sponsors`, read
// by the Worker (worker.js) on every page view and cached for a minute: edit
// that file (and upload logos beside it) and the site changes, no rebuild.
// The build renders every slot open with DEFAULT_SPONSORS, so the site still
// works if R2 is unreachable. The same functions draw a tile at build time
// (SponsorSlots.astro) and at the edge (worker.js), so the two always match;
// Tailwind sees the class names here because this file is under src/.
//
// sponsors.json:
//   {
//     "slots": [ { "name": "Acme", "url": "https://acme.com/", "logo": "acme.png" },
//                null, … ],                 // 8 entries; null = open
//     "tiers": [ { "first": 1, "last": 4, "price": 49, "label": "First row" },
//                { "first": 5, "last": 8, "price": 29, "label": "Second row" } ]
//   }
// `logo` is any of: a file in the bucket's logos/ folder (served at
// /sponsors/logos/<file>), a full https:// URL, a data URL
// (data:image/png;base64,…) or bare base64 of a PNG, JPEG, WebP, GIF or SVG
// (the type is read from its first bytes), up to MAX_LOGO_BASE64 characters.
// Leave it out for a letter tile. `tiers` is optional (defaults below).

export const SLOT_COUNT = 8;

/** @typedef {{ name: string, url: string, logo?: string }} Sponsor */
/** @typedef {{ first: number, last: number, price: number, label: string }} Tier */

/** @type {{ slots: (Sponsor | null)[], tiers: Tier[] }} */
export const DEFAULT_SPONSORS = {
  slots: Array(SLOT_COUNT).fill(null),
  tiers: [
    { first: 1, last: 4, price: 49, label: 'First row' },
    { first: 5, last: 8, price: 29, label: 'Second row' },
  ],
};

/** Longest base64 logo accepted (~150 KB of image), so pages stay light. */
export const MAX_LOGO_BASE64 = 200_000;

const DATA_URL = /^data:image\/(png|jpeg|webp|gif|svg\+xml);base64,[A-Za-z0-9+/]+={0,2}$/;
const BASE64 = /^[A-Za-z0-9+/\s]+={0,2}$/;
// Bare base64 → its image type, from the encoded magic bytes.
const SNIFF = [
  ['iVBORw0KGgo', 'png'],
  ['/9j/', 'jpeg'],
  ['UklGR', 'webp'],
  ['R0lGOD', 'gif'],
  ['PHN2Zy', 'svg+xml'], // <svg
  ['PD94bW', 'svg+xml'], // <?xml
];

/** A logo field as an image src, or throw. */
function logoSrc(logo, at) {
  if (isHttp(logo)) return logo;
  if (logo.length > MAX_LOGO_BASE64) {
    throw new Error(`${at}: base64 "logo" is over ${MAX_LOGO_BASE64} characters; upload it to logos/ instead`);
  }
  if (logo.startsWith('data:')) {
    if (DATA_URL.test(logo)) return logo;
    throw new Error(`${at}: "logo" data URL must be data:image/(png|jpeg|webp|gif|svg+xml);base64,…`);
  }
  if (/^[\w.-]+$/.test(logo) && /\.(png|jpe?g|webp|gif|svg)$/i.test(logo)) return `/sponsors/logos/${logo}`;
  if (BASE64.test(logo)) {
    const b64 = logo.replace(/\s+/g, '');
    const type = SNIFF.find(([magic]) => b64.startsWith(magic))?.[1];
    if (type) return `data:image/${type};base64,${b64}`;
    throw new Error(`${at}: base64 "logo" is not a PNG, JPEG, WebP, GIF or SVG`);
  }
  throw new Error(`${at}: "logo" must be a logos/ file name, an https:// URL, a data URL or base64`);
}

const isHttp = (s) => typeof s === 'string' && /^https?:\/\/[^\s]+$/i.test(s);

/**
 * Check a parsed sponsors.json. Returns the cleaned data, or throws with a
 * message saying what is wrong (the Worker then keeps the build's open slots).
 */
export function parseSponsors(raw) {
  if (!raw || typeof raw !== 'object') throw new Error('not an object');
  const slots = raw.slots;
  if (!Array.isArray(slots) || slots.length !== SLOT_COUNT) {
    throw new Error(`"slots" must be an array of ${SLOT_COUNT} entries`);
  }
  const clean = slots.map((s, i) => {
    if (s === null) return null;
    const at = `slot ${i + 1}`;
    if (typeof s !== 'object') throw new Error(`${at}: must be null or an object`);
    const name = typeof s.name === 'string' ? s.name.trim() : '';
    if (!name || name.length > 40) throw new Error(`${at}: "name" must be 1-40 characters`);
    if (!isHttp(s.url)) throw new Error(`${at}: "url" must start http:// or https://`);
    let logo;
    if (s.logo !== undefined && s.logo !== null && s.logo !== '') {
      if (typeof s.logo !== 'string') throw new Error(`${at}: "logo" must be a string`);
      logo = logoSrc(s.logo.trim(), at);
    }
    return { name, url: s.url, ...(logo ? { logo } : {}) };
  });
  let tiers = DEFAULT_SPONSORS.tiers;
  if (raw.tiers !== undefined) {
    if (!Array.isArray(raw.tiers) || raw.tiers.length === 0) throw new Error('"tiers" must be a non-empty array');
    tiers = raw.tiers.map((t, i) => {
      const ok =
        t && Number.isInteger(t.first) && Number.isInteger(t.last) && t.first >= 1 &&
        t.last <= SLOT_COUNT && t.first <= t.last && typeof t.price === 'number' &&
        t.price >= 0 && typeof t.label === 'string' && t.label.trim();
      if (!ok) throw new Error(`tier ${i + 1}: needs first, last (1-${SLOT_COUNT}), price and label`);
      return { first: t.first, last: t.last, price: t.price, label: t.label.trim() };
    });
  }
  return { slots: clean, tiers };
}

export const tierOf = (tiers, slot) =>
  tiers.find((t) => slot >= t.first && slot <= t.last) ?? tiers[0];

/** First open slot (1-based), or 0 when every slot is taken. */
export const firstOpen = (slots) => slots.findIndex((s) => s === null) + 1;

/** "Slot 6 — second row, $29/month" */
export const slotOption = (tiers, slot) => {
  const t = tierOf(tiers, slot);
  return `Slot ${slot} — ${t.label.toLowerCase()}, $${t.price}/month`;
};

/** The sponsor's link, tagged with where the visit came from. */
export function sponsorHref(url) {
  try {
    const u = new URL(url);
    if (!u.searchParams.has('ref')) u.searchParams.set('ref', 'lakolam');
    return u.toString();
  } catch {
    return url;
  }
}

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const SIZES = {
  wide: {
    tile: 'h-[84px] gap-1.5 rounded-xl px-2 sm:h-[92px]',
    mark: 'size-8 rounded-lg sm:size-9',
    text: 'text-xs',
  },
  compact: {
    tile: 'h-[68px] gap-1 rounded-lg px-1',
    mark: 'size-7 rounded-md',
    text: 'text-[11px]',
  },
};

/** The inside of one slot's <li>: a sponsor's tile or an open slot. */
export function tileHtml(sponsor, slot, variant = 'wide') {
  const z = SIZES[variant] ?? SIZES.wide;
  if (!sponsor) {
    const label = variant === 'compact' ? 'Your logo' : 'Your logo<span class="hidden sm:inline"> here</span>';
    return (
      `<a href="/sponsor/?slot=${slot}" rel="nofollow" aria-label="Sponsor slot ${slot} is open — put your logo here" ` +
      `class="border-line text-ink-muted hover:border-accent hover:text-accent flex flex-col items-center justify-center border border-dashed text-center no-underline transition-colors ${z.tile}">` +
      `<span class="flex items-center justify-center border border-dashed border-current ${z.mark}" aria-hidden="true">+</span>` +
      `<span class="max-w-full truncate ${z.text}">${label}</span></a>`
    );
  }
  const mark = sponsor.logo
    ? `<img src="${esc(sponsor.logo)}" alt="" loading="lazy" width="36" height="36" class="object-contain ${z.mark}">`
    : `<span class="bg-ink text-surface flex items-center justify-center font-semibold ${z.mark}">${esc(sponsor.name.slice(0, 1))}</span>`;
  return (
    `<a href="${esc(sponsorHref(sponsor.url))}" target="_blank" rel="sponsored noopener" title="${esc(sponsor.name)}" ` +
    `class="border-line bg-surface-raised hover:border-accent-dim flex flex-col items-center justify-center border text-center no-underline transition-colors ${z.tile}">` +
    `${mark}<span class="text-ink max-w-full truncate font-medium ${z.text}">${esc(sponsor.name)}</span></a>`
  );
}
