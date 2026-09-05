// Site-wide facts, in one place. Numbers that describe the engine are facts
// about a specific state of the repository — update them when syncing content.

export const SITE = {
  name: 'Lakolam',
  tagline: 'Deterministic generative designs, mazes and puzzles',
  description:
    'Lakolam is an open-source generative engine: 55 generators for mandalas, kolams, mazes and logic puzzles, every page reproducible from a seed, every puzzle proven uniquely solvable — rendered as SVG, PNG or print-ready PDF.',
  github: 'https://github.com/skpjr001/lakolam',
  studio: 'https://lakolam.sachinkumarskrose.workers.dev',
  studioGpui: 'https://lakolam-studio.sachinkumarskrose.workers.dev',
  // The seed behind every image on this site — determinism as a brand asset.
  artSeed: '0xa11ce',
  stats: {
    generators: 55,
    tests: 1365,
    crates: 66,
    profiles: 10,
  },
} as const;

export const CATEGORY_LABELS: Record<string, string> = {
  design: 'Design',
  maze: 'Maze',
  puzzle: 'Logic puzzle',
  word: 'Word puzzle',
};

export const CATEGORY_BLURBS: Record<string, string> = {
  design:
    'Mandalas, kolams, tilings and flow fields — colourable line art with mathematical bones.',
  maze: 'Square, triangular, hexagonal and circular mazes carved by eleven algorithms, with answer keys.',
  puzzle:
    'Sudoku, nonograms, slitherlink and twenty more — every one proven uniquely solvable.',
  word: 'Word searches, crosswords, cryptograms and ladders — built from curated wordlists and quotes.',
};
