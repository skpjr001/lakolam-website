// JSON-LD builders. Each returns a plain object; Base.astro serialises them.
// Ids are anchored on the canonical site URL so entities interlink.

import { SITE } from './site';

const site = 'https://lakolam-www.sachinkumarskrose.workers.dev';

export const organization = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site}/#organization`,
  name: SITE.name,
  url: `${site}/`,
  logo: `${site}/brand/lakolam-mark.svg`,
  sameAs: [SITE.github],
});

export const webSite = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site}/#website`,
  name: SITE.name,
  url: `${site}/`,
  description: SITE.description,
  publisher: { '@id': `${site}/#organization` },
});

export const softwareApplication = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Lakolam Studio',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web browser',
  url: SITE.studio,
  description:
    'A browser studio for the Lakolam engine: 55 deterministic generators for designs, mazes and puzzles, running entirely client-side as WebAssembly.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@id': `${site}/#organization` },
});

export const sourceCode = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareSourceCode',
  name: 'Lakolam',
  codeRepository: SITE.github,
  programmingLanguage: 'Rust',
  license: 'https://spdx.org/licenses/MIT.html',
  description: SITE.description,
});

export const breadcrumbs = (
  items: { name: string; path: string }[]
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
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
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  '@id': `${site}/generators/${g.id}/#work`,
  name: `${g.title} generator`,
  description: g.blurb,
  image: `${site}/og/generators/${g.id}.png`,
  genre: g.category,
  creator: { '@id': `${site}/#organization` },
  isPartOf: { '@id': `${site}/#website` },
  license: 'https://spdx.org/licenses/MIT.html',
});

export const itemList = (
  name: string,
  items: { name: string; path: string }[]
) => ({
  '@context': 'https://schema.org',
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
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
});
