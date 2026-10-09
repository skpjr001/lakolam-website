// Search copy for generator pages: titles, meta descriptions and keywords,
// written per lane so each page targets what people actually search for
// ("sudoku generator", "printable sudoku with answers", "fractions
// worksheet"). Everything here must stay true of every generator in the
// lane — the catalogue tests guarantee an answer key on every maze, puzzle,
// word and maths page, and nothing more is claimed.

import { SITE } from './site';

type Lane = 'design' | 'maze' | 'puzzle' | 'word' | 'maths' | 'paper';

interface LaneCopy {
  /** What the H1 and title call the generator: "Sudoku generator". */
  noun: (title: string) => string;
  /** Title tail after the dash, longest first; the first that fits is used. */
  tails: string[];
  /** Description sentences after the blurb, longest first. */
  pitches: string[];
  /** Search phrases; {t} is the lower-cased title. */
  keywords: string[];
  /** The visible "at a glance" facts beside the preview. */
  facts: { label: string; value: string }[];
}

const formats = { label: 'Formats', value: 'PDF, PNG and SVG' };
const sizes = {
  label: 'Print sizes',
  value: 'US Letter and 8.5 in square, KDP-ready with bleed; social and web canvases',
};
const free = { label: 'Price', value: 'Free — no account, runs in your browser' };
const seed = {
  label: 'Reproducible',
  value: `Same seed, same page, byte for byte (this preview: seed ${SITE.artSeed})`,
};

/**
 * What a paper page is called in search: "Graph Paper" stays as it is,
 * "Dot Grid" gains "paper" ("Brick Grid paper"), and
 * templates that are not paper by name keep their name ("Unit Circle").
 * The all-in-one "Paper" is specialty paper.
 */
const paperNoun = (t: string) =>
  t === 'Paper' ? 'Specialty paper' : /paper$/i.test(t) || !/grid$/i.test(t) ? t : `${t} paper`;

/** The H1: a template whose name is not paper reads "Printable Unit Circle". */
const paperHeading = (t: string) => {
  const n = paperNoun(t);
  return /paper$/i.test(n) ? n : `Printable ${n}`;
};

const LANES: Record<Lane, LaneCopy> = {
  design: {
    noun: (t) => `${t} generator`,
    tails: ['Free Printable Designs', 'Free & Printable'],
    pitches: [
      ' Free in the browser: print it as PDF, PNG or SVG, every page reproducible from a seed.',
      ' Free, printable as PDF, PNG or SVG.',
      ' Free and printable.',
    ],
    keywords: [
      '{t} generator',
      'printable {t}',
      'free {t}',
      '{t} colouring page',
      '{t} coloring page',
      '{t} pattern',
      '{t} SVG',
      'generative art',
    ],
    facts: [formats, sizes, free, seed],
  },
  maze: {
    noun: (t) => `${t} generator`,
    tails: ['Free Printable Mazes with Answers', 'Free Printable Mazes', 'Free & Printable'],
    pitches: [
      ' Free in the browser: print unlimited mazes as PDF, PNG or SVG, answer key included.',
      ' Free, printable, answer key included.',
      ' Free and printable.',
    ],
    keywords: [
      '{t} generator',
      'printable {t}',
      '{t} with answer key',
      'free printable mazes',
      'maze generator',
      'mazes for kids',
      'maze PDF',
    ],
    facts: [
      { label: 'Answer key', value: 'Included — the solution path drawn in' },
      formats,
      sizes,
      free,
      seed,
    ],
  },
  puzzle: {
    noun: (t) => `${t} generator`,
    tails: ['Free Printable Puzzles with Answers', 'Free Printable Puzzles', 'Free & Printable'],
    pitches: [
      ' Free in the browser: print unlimited puzzles as PDF, PNG or SVG with answer keys, each one checked.',
      ' Free, printable, with answer keys — each one checked.',
      ' Free and printable, with answer keys.',
    ],
    keywords: [
      '{t} generator',
      'printable {t}',
      '{t} puzzles with answers',
      'free {t} puzzles',
      '{t} PDF',
      '{t} puzzle book',
      'logic puzzles',
    ],
    facts: [
      { label: 'Answer key', value: 'Included, and every page is checked by the generator itself' },
      formats,
      sizes,
      free,
      seed,
    ],
  },
  word: {
    noun: (t) => `${t} generator`,
    tails: ['Free Printable Word Puzzles', 'Free & Printable'],
    pitches: [
      ' Free in the browser: print unlimited puzzles as PDF, PNG or SVG, answer key included.',
      ' Free, printable, answer key included.',
      ' Free and printable.',
    ],
    keywords: [
      '{t} generator',
      '{t} maker',
      'printable {t}',
      'free {t} puzzles',
      '{t} with answers',
      'word puzzles',
    ],
    facts: [
      { label: 'Answer key', value: 'Included' },
      formats,
      sizes,
      free,
      seed,
    ],
  },
  maths: {
    noun: (t) => `${t} worksheet generator`,
    tails: ['Free Printable Maths', 'Free & Printable'],
    pitches: [
      ' Free in the browser: print unlimited worksheets as PDF, PNG or SVG, every answer checked and an answer key included.',
      ' Free, printable worksheets with checked answer keys.',
      ' Free and printable, with answers.',
    ],
    keywords: [
      '{t} worksheet',
      '{t} worksheets',
      'printable {t} worksheets',
      '{t} worksheets with answers',
      '{t} math worksheet',
      'maths worksheet generator',
      'free math worksheets',
    ],
    facts: [
      { label: 'Answer key', value: 'Included, every answer checked' },
      formats,
      sizes,
      free,
      seed,
    ],
  },
  paper: {
    noun: paperNoun,
    tails: ['Free Printable PDF, A4 & Letter', 'Free Printable PDF', 'Free & Printable'],
    pitches: [
      ' Free in the browser: print it at exact spacing as PDF, PNG or SVG on Letter, A4, A5, Legal, Tabloid or A3.',
      ' Free, printable at exact spacing on Letter, A4 and more.',
      ' Free and printable.',
    ],
    keywords: [
      '{p}',
      'printable {p}',
      '{p} PDF',
      'free {p}',
      '{t} template',
      '{p} A4',
      '{p} letter size',
    ],
    facts: [
      { label: 'Spacing', value: 'Exact — print at 100% and it measures true' },
      { label: 'Sheets', value: 'Letter, A4, A5, Legal, Tabloid and A3, portrait or landscape' },
      formats,
      free,
      { label: 'Reproducible', value: 'The same settings always give the same sheet' },
    ],
  },
};

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 160;

/** "Sudoku Generator — Free Printable Puzzles with Answers", fitted to 60 chars. */
export function generatorTitle(lane: Lane, title: string): string {
  const head =
    lane === 'maths'
      ? `${title} Worksheet Generator`
      : lane === 'paper'
        ? paperNoun(title).replace(/ paper$/, ' Paper')
        : `${title} Generator`;
  for (const tail of LANES[lane].tails) {
    for (const brand of [` | ${SITE.name}`, '']) {
      const t = `${head} — ${tail}${brand}`;
      if (t.length <= TITLE_MAX) return t;
    }
  }
  const branded = `${head} | ${SITE.name}`;
  return branded.length <= TITLE_MAX ? branded : head;
}

/** The visible H1: "Sudoku generator", "Fractions worksheet generator". */
export const generatorHeading = (lane: Lane, title: string) =>
  lane === 'paper' ? paperHeading(title) : LANES[lane].noun(title);

/** Blurb plus the longest pitch that fits in 160 characters. */
export function generatorDescription(lane: Lane, blurb: string): string {
  const base = `${blurb.replace(/[.\s]+$/, '')}.`;
  for (const pitch of LANES[lane].pitches) {
    if (base.length + pitch.length <= DESCRIPTION_MAX) return base + pitch;
  }
  if (base.length <= DESCRIPTION_MAX) return base;
  const cut = base.slice(0, DESCRIPTION_MAX - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:—–-]$/, '')}…`;
}

/** Search phrases for the page, most specific first, de-duplicated. */
export function generatorKeywords(lane: Lane, title: string): string[] {
  const t = title.toLowerCase();
  const p = paperNoun(t);
  return [
    ...new Set(LANES[lane].keywords.map((k) => k.replaceAll('{p}', p).replaceAll('{t}', t))),
  ];
}

export const generatorFacts = (lane: Lane) => LANES[lane].facts;

/** Site-wide phrases for pages that are not about one generator. */
export const SITE_KEYWORDS = [
  'printable puzzle generator',
  'free printable puzzles',
  'puzzle generator with answer key',
  'maze generator',
  'sudoku generator',
  'mandala generator',
  'kolam',
  'printable worksheets',
  'maths worksheet generator',
  'word search maker',
  'KDP puzzle book',
  'generative art',
];
