// Site-wide facts, in one place. Numbers that describe the engine are facts
// about a specific state of the repository — update them when syncing content.

export const SITE = {
  name: 'Lakolam',
  tagline: 'Deterministic generative designs, mazes and puzzles',
  description:
    'Lakolam is a generative engine: 187 generators for mandalas, kolams, mazes and logic puzzles, every page reproducible from a seed, every puzzle proven uniquely solvable — rendered as SVG, PNG or print-ready PDF.',
  studio: 'https://app.lakolam.com',
  studioGpui: 'https://studio.lakolam.com',
  // The seed behind every image on this site — determinism as a brand asset.
  artSeed: '0xa11ce',
  stats: {
    generators: 187,
    tests: 2602,
    crates: 198,
    profiles: 10,
  },
} as const;

export const CATEGORY_LABELS: Record<string, string> = {
  design: 'Design',
  maze: 'Maze',
  puzzle: 'Logic puzzle',
  word: 'Word puzzle',
  maths: 'Maths worksheet',
};

export const CATEGORY_BLURBS: Record<string, string> = {
  design:
    'Mandalas, kolams, tilings and flow fields — colourable line art with mathematical bones.',
  maze: 'Square, triangular, hexagonal and circular mazes carved by eleven algorithms, with answer keys.',
  puzzle:
    'Sudoku, nonograms, slitherlink and sixty more — every one proven uniquely solvable.',
  word: 'Word searches, crosswords, cryptograms and ladders — built from curated wordlists and quotes.',
  maths:
    'Addition to algebra, abacus to angles — drills, visual models and number puzzles for US, UK and Indian classrooms, every answer checked.',
};
