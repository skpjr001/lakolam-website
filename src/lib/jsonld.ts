// JSON-LD graph nodes. Base.astro assembles one `@graph` per page from the
// always-present entities (Organization, WebSite, WebPage) plus whatever
// nodes the page passes; everything cross-references by `@id`, so search
// engines see one connected entity graph rather than islands.

import { SITE } from './site';

const site = 'https://www.lakolam.com';
export const ids = {
  org: `${site}/#organization`,
  website: `${site}/#website`,
  app: `${SITE.studio}/#software`,
  gpuiApp: `${SITE.studioGpui}/#software`,
  code: `${site}/#code`,
  generators: `${site}/generators/#list`,
} as const;

/** A generator's own node, linked from its page, the index list and siblings. */
export const generatorId = (id: string) => `${site}/generators/${id}/#work`;
export const generatorUrl = (id: string) => `${site}/generators/${id}/`;

export const organization = () => ({
  '@type': 'Organization',
  '@id': ids.org,
  name: SITE.name,
  url: `${site}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${site}/brand/lakolam-mark.svg`,
  },
  email: SITE.contact.email,
  sameAs: [SITE.contact.twitter.url, SITE.contact.linkedin.url],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: SITE.contact.email,
    availableLanguage: 'en',
  },
  knowsAbout: [
    'Generative art',
    'Procedural generation',
    'Logic puzzles',
    'Maze generation',
    'Mandala design',
    'Constraint solving',
    'Print-on-demand publishing',
    'WebAssembly',
  ],
});

export const webSite = () => ({
  '@type': 'WebSite',
  '@id': ids.website,
  name: SITE.name,
  url: `${site}/`,
  description: SITE.description,
  inLanguage: 'en',
  publisher: { '@id': ids.org },
});

/** The page's own node; Base.astro builds this for every page. */
export const webPage = (options: {
  type: 'WebPage' | 'CollectionPage' | 'AboutPage';
  url: string;
  title: string;
  description: string;
  image: string;
  hasBreadcrumb: boolean;
  /** @id of what the page is chiefly about (its generator, the studio…). */
  mainEntity?: string;
  /** @id of the subject the page describes, when not the main entity. */
  about?: string;
  /** Other pages on this site the page links to as related. */
  relatedLinks?: string[];
}) => ({
  '@type': options.type,
  '@id': options.url,
  url: options.url,
  name: options.title,
  description: options.description,
  inLanguage: 'en',
  isPartOf: { '@id': ids.website },
  primaryImageOfPage: { '@type': 'ImageObject', url: options.image },
  ...(options.hasBreadcrumb ? { breadcrumb: { '@id': `${options.url}#breadcrumb` } } : {}),
  ...(options.mainEntity ? { mainEntity: { '@id': options.mainEntity } } : {}),
  ...(options.about ? { about: { '@id': options.about } } : {}),
  ...(options.relatedLinks?.length ? { relatedLink: options.relatedLinks } : {}),
});

export const softwareApplication = () => ({
  '@type': 'SoftwareApplication',
  '@id': ids.app,
  name: 'Lakolam Studio',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web browser',
  url: SITE.studio,
  description:
    `A browser studio for the Lakolam engine: ${SITE.stats.generators} deterministic generators for designs, mazes and puzzles, running entirely client-side as WebAssembly.`,
  featureList: [
    `${SITE.stats.generators} generators: mandalas, kolams, tilings, mazes, sudoku, nonograms, crosswords and more`,
    'Deterministic output — same seed, same page, byte-identical',
    'Solver-proven unique solutions with technique-ladder difficulty',
    'Schema-driven controls generated from each generator’s own spec',
    'Export as SVG master, PNG up to 600 dpi, or fixed social canvases',
    'Fully client-side: no upload, no account, no server',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@id': ids.org },
  isBasedOn: { '@id': ids.code },
  // The GPUI studio is the same engine behind a second interface — declare
  // the family so the two deployments read as one product, not duplicates.
  hasPart: { '@id': ids.gpuiApp },
});

export const gpuiStudio = () => ({
  '@type': 'SoftwareApplication',
  '@id': ids.gpuiApp,
  name: 'Lakolam GPUI Studio',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web browser',
  url: SITE.studioGpui,
  description:
    'An experimental fully-Rust interface for the Lakolam engine, GPU-rendered with GPUI and compiled to a single WebAssembly module.',
  publisher: { '@id': ids.org },
  isBasedOn: { '@id': ids.code },
  isPartOf: { '@id': ids.app },
});

export const sourceCode = () => ({
  '@type': 'SoftwareSourceCode',
  '@id': ids.code,
  name: 'Lakolam',
  programmingLanguage: 'Rust',
  runtimePlatform: 'WebAssembly',
  description: SITE.description,
  author: { '@id': ids.org },
});

export const breadcrumbs = (pageUrl: string, items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  '@id': `${pageUrl}#breadcrumb`,
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${site}${item.path}`,
  })),
});

export const generatorWork = (g: {
  id: string;
  title: string;
  /** "Sudoku generator" — the page's H1. */
  heading: string;
  blurb: string;
  category: string;
  /** The lane's label: "Logic puzzle". */
  lane: string;
  version: string;
  studioLink: string;
  keywords: string[];
}) => ({
  '@type': 'CreativeWork',
  '@id': generatorId(g.id),
  name: g.heading.charAt(0).toUpperCase() + g.heading.slice(1),
  alternateName: g.title,
  url: generatorUrl(g.id),
  mainEntityOfPage: { '@id': generatorUrl(g.id) },
  description: g.blurb,
  abstract: g.blurb,
  image: {
    '@type': 'ImageObject',
    url: `${site}/og/generators/${g.id}.png`,
    width: 1200,
    height: 630,
    caption: `${g.title}: a page generated by Lakolam at seed ${SITE.artSeed}`,
  },
  thumbnailUrl: `${site}/og/generators/${g.id}.png`,
  genre: g.lane,
  keywords: g.keywords.join(', '),
  // What the page is about, as a thing in its own right (Sudoku, the maze…).
  about: { '@type': 'Thing', name: g.title },
  ...(g.category === 'maths'
    ? {
        learningResourceType: 'Worksheet',
        educationalUse: 'Practice',
        audience: { '@type': 'EducationalAudience', educationalRole: 'teacher' },
      }
    : {}),
  // Every page is produced in these formats (the studio's exports).
  encodingFormat: ['application/pdf', 'image/png', 'image/svg+xml'],
  version: g.version,
  inLanguage: 'en',
  isAccessibleForFree: true,
  creator: { '@id': ids.org },
  publisher: { '@id': ids.org },
  isBasedOn: { '@id': ids.code },
  isPartOf: [{ '@id': ids.website }, { '@id': ids.generators }],
  // The page's call to action: this generator, open in the studio.
  potentialAction: {
    '@type': 'CreateAction',
    name: `Generate a ${g.title} page in the studio`,
    target: g.studioLink,
    instrument: { '@id': ids.app },
  },
});

/** Every generator, each item pointing at that generator's own node. */
export const generatorList = (items: { id: string; title: string }[]) => ({
  '@type': 'ItemList',
  '@id': ids.generators,
  name: 'Lakolam generators',
  numberOfItems: items.length,
  itemListElement: items.map((g, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: g.title,
    url: generatorUrl(g.id),
    item: { '@id': generatorId(g.id) },
  })),
});

export const faqPage = (faqs: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
});
