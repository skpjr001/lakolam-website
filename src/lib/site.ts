// Site-wide facts, in one place. Numbers that describe the engine are facts
// about a specific state of the repository — update them when syncing content.

export const SITE = {
  name: 'Lakolam',
  tagline: 'Deterministic generative designs, mazes and puzzles',
  description:
    'Lakolam is a generative engine: 791 generators for mandalas, kolams, mazes, logic and word puzzles, maths worksheets and printable paper, every page reproducible from a seed, every puzzle proven uniquely solvable — rendered as SVG, PNG or print-ready PDF.',
  studio: 'https://app.lakolam.com',
  studioGpui: 'https://studio.lakolam.com',
  // How to reach the maker: shown in the contact band and footer, and
  // declared in the Organization JSON-LD (sameAs, email).
  contact: {
    email: 'sachinkumarskrose@gmail.com',
    twitter: { handle: '@skpjr001', url: 'https://x.com/skpjr001' },
    linkedin: { handle: 'skpjr001', url: 'https://www.linkedin.com/in/skpjr001/' },
  },
  // The seed behind every image on this site — determinism as a brand asset.
  artSeed: '0xa11ce',
  stats: {
    generators: 791,
    tests: 10497,
    crates: 798,
    profiles: 10,
  },
} as const;

/**
 * A studio link that opens one generator at the site's art seed, so the
 * studio shows exactly the page pictured here (the studio reads `g`, `seed`
 * and an optional `spec` from its address bar).
 */
export const studioUrl = (id: string, seed: string = SITE.artSeed) =>
  `${SITE.studio}/?${new URLSearchParams({ g: id, seed })}`;

export const CATEGORY_LABELS: Record<string, string> = {
  design: 'Design',
  maze: 'Maze',
  puzzle: 'Logic puzzle',
  word: 'Word puzzle',
  maths: 'Maths worksheet',
  paper: 'Paper template',
};

/** Each lane's own collection page, e.g. /designs/ (noindex — /generators/ is the indexed list). */
export const LANE_SLUGS: Record<string, string> = {
  design: 'designs',
  maze: 'mazes',
  puzzle: 'puzzles',
  word: 'words',
  maths: 'maths',
  paper: 'paper',
};

export const CATEGORY_BLURBS: Record<string, string> = {
  design:
    'Mandalas, kolams, tilings and flow fields — colourable line art with mathematical bones.',
  maze: 'Square, triangular, hexagonal and circular mazes carved by eleven algorithms, with answer keys.',
  puzzle:
    'Sudoku, nonograms, slitherlink and a hundred more — every one proven uniquely solvable.',
  word: 'Word searches, crosswords, cryptograms and ladders — built from curated wordlists and quotes.',
  maths:
    'Addition to algebra, abacus to angles — drills, visual models and number puzzles for US, UK and Indian classrooms, every answer checked.',
  paper:
    'Graph, dot, lined and isometric paper, music staves and tab, Cornell notes, log, polar and Smith charts, comic panels, answer sheets and more — printable at exact spacing.',
};
