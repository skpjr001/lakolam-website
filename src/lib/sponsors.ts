// Sponsor slots: eight logo tiles in two rows, shown on the home page and
// beside every generator page, booked through /sponsor/.
//
// To put a sponsor live: drop their logo in public/sponsors/ (square PNG or
// SVG, ~128 px), fill the slot below, rebuild and deploy. `null` is an open
// slot ("Your logo here"). Slots are numbered 1–8 in reading order.

import { SITE } from './site';

export interface Sponsor {
  name: string;
  /** Their site; `?ref=lakolam` is added so they can see the traffic. */
  url: string;
  /** Path under public/, e.g. '/sponsors/acme.png'. Omit for a letter tile. */
  logo?: string;
}

export const SPONSOR_SLOTS: (Sponsor | null)[] = [
  null, null, null, null, // first row
  null, null, null, null, // second row
];

/** Monthly price per row. The first row sits higher on the page. */
export const SPONSOR_TIERS = [
  { first: 1, last: 4, price: 49, label: 'First row' },
  { first: 5, last: 8, price: 29, label: 'Second row' },
] as const;

export const SPONSOR_EMAIL = SITE.contact.email;

export const tierOf = (slot: number) =>
  SPONSOR_TIERS.find((t) => slot >= t.first && slot <= t.last) ?? SPONSOR_TIERS[0];

/** The sponsor's link, tagged with where the visit came from. */
export function sponsorHref(url: string): string {
  try {
    const u = new URL(url);
    if (!u.searchParams.has('ref')) u.searchParams.set('ref', 'lakolam');
    return u.toString();
  } catch {
    return url;
  }
}
