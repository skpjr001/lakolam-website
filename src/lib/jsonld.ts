// JSON-LD graph nodes. Base.astro assembles one `@graph` per page from the
// always-present entities (Organization, WebSite, WebPage) plus whatever
// nodes the page passes; everything cross-references by `@id`, so search
// engines see one connected entity graph rather than islands.

import { SITE } from './site';

const site = 'https://lakolam-www.sachinkumarskrose.workers.dev';
export const ids = {
  org: `${site}/#organization`,
  website: `${site}/#website`,
  app: `${SITE.studio}/#software`,
  gpuiApp: `${SITE.studioGpui}/#software`,
  code: `${site}/#code`,
} as const;

export const organization = () => ({
  '@type': 'Organization',
  '@id': ids.org,
  name: SITE.name,
  url: `${site}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${site}/brand/lakolam-mark.svg`,
  },
  sameAs: [SITE.github],
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
});

export const softwareApplication = () => ({
  '@type': 'SoftwareApplication',
  '@id': ids.app,
  name: 'Lakolam Studio',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web browser',
  url: SITE.studio,
  description:
    'A browser studio for the Lakolam engine: 55 deterministic generators for designs, mazes and puzzles, running entirely client-side as WebAssembly.',
  featureList: [
    '55 generators: mandalas, kolams, tilings, mazes, sudoku, nonograms, crosswords and more',
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
  codeRepository: SITE.github,
  programmingLanguage: 'Rust',
  runtimePlatform: 'WebAssembly',
  license: ['https://spdx.org/licenses/MIT.html', 'https://spdx.org/licenses/Apache-2.0.html'],
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
  blurb: string;
  category: string;
}) => ({
  '@type': 'CreativeWork',
  '@id': `${site}/generators/${g.id}/#work`,
  name: `${g.title} generator`,
  description: g.blurb,
  image: `${site}/og/generators/${g.id}.png`,
  genre: g.category,
  creator: { '@id': ids.org },
  isPartOf: { '@id': ids.website },
  license: ['https://spdx.org/licenses/MIT.html', 'https://spdx.org/licenses/Apache-2.0.html'],
});

export const itemList = (name: string, items: { name: string; path: string }[]) => ({
  '@type': 'ItemList',
  name,
  numberOfItems: items.length,
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    url: `${site}${item.path}`,
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
