# Lakolam brand guidelines

Lakolam is a deterministic generative engine. The brand's one job is to make
its promise legible at a glance: **infinite pages, zero surprises**. Everything
below serves that — the mark is a solvable maze, the imagery is real engine
output with its seed on record, and the voice states guarantees rather than
adjectives.

## 1. Name

- **Lakolam** — the project and the engine. Capital L, one word, never
  "LakoLam" or "Lako Lam".
- **Lakolam Studio** — the browser application.
- **`lako`** — the CLI. Always lowercase, always monospaced.
- The name recalls *kolam*, the South-Indian ritual line drawing that seeded
  the design lane. Mention this when introducing the project; don't retell it
  in every paragraph.

## 2. The mark

A two-ring labyrinth: one entrance at the top, one doorway inside, the goal at
the centre. It is the product's promise drawn small — every page has exactly
one way in, and it can always be found again (determinism). It also echoes the
dot-and-loop structure of a kolam.

Files (in `public/brand/`, served from `/brand/` on the site):

| File | Use |
|---|---|
| `lakolam-mark.svg` | Light surfaces — accent green `#17795a` |
| `lakolam-mark-dark.svg` | Dark surfaces — accent green `#7dd3a0` |
| `lakolam-mark-mono.svg` | Single-colour contexts (`currentColor`) |
| `lakolam-lockup.svg` / `-dark.svg` | Mark + wordmark, horizontal |

Construction: a 32×32 grid; outer ring r 12.5 with a 40° gap centred at the
top, inner ring r 7.5 with a 55° gap centred at the bottom, centre dot r 2.3;
stroke 2.4, round caps. At 16 px, the favicon build keeps the same geometry.

Rules:

- Clear space: at least the width of the centre dot ×3 on all sides.
- Don't rotate the mark, close the gaps, add a third ring, or fill the rings.
- The wordmark is Inter SemiBold, −0.02 em tracking, set beside the mark at
  the cap height of the rings. The lockup SVGs use `<text>` with Inter plus
  system fallbacks; for pixel-exact contexts, typeset the wordmark yourself
  and pair it with the mark SVG.
- On photography or artwork, use the mono mark in ink or surface colour.

## 3. Colour

Semantic tokens, one palette defined twice (light/dark) — the same system both
studios use. Machine-readable copies: `public/brand/tokens.css`,
`public/brand/tokens.json`.

| Token | Light | Dark | Use |
|---|---|---|---|
| accent | `#17795a` | `#7dd3a0` | Actions, links, the mark |
| accent-strong | `#0e5a42` | `#a5e6c1` | Hover states |
| accent-dim | `#8fd4b8` | `#3f6b55` | Subtle emphasis, selection |
| ink | `#171a17` | `#e7eae6` | Text |
| ink-muted | `#5a6259` | `#8b948b` | Secondary text |
| surface | `#fdfdfc` | `#0e100f` | Page background |
| surface-raised | `#f6f7f5` | `#161816` | Cards, panels |
| surface-sunken | `#eef0ec` | `#1c1f1c` | Inputs, code blocks |
| line | `#dbdfd8` | `#272b27` | Borders, dividers |

Rules: accent is for action and identity, never for long text. Generated
artwork is black line art on white — always present it on a white or `surface`
field, never tinted.

## 4. Typography

- **Inter** (with the system sans fallback stack) for interface and marketing.
  Headlines tight: −0.02 em. Weights: 400 body, 600 emphasis/wordmark, 700
  headlines.
- **JetBrains Mono** (with the system mono fallback) for seeds, specs, CLI
  output, version numbers — anything the engine would print. A seed is always
  monospaced: `0xa11ce`, never *0xa11ce* in prose type.

## 5. Imagery

**The rule: brand imagery is real engine output.** Never stock, never
illustration, never a designer's approximation of what the engine makes.

- Render with `lako preview`, record generator + seed, and keep the caption
  reproducible: `lako preview -g mandala --seed 0xa11ce`.
- The website and this kit use seed `0xa11ce` throughout ("alice") — one seed,
  everywhere, as a proof of determinism.
- Curated masters live in `brand/art/` (SVG); social/OG renders come from the
  engine's own profiles (`og_image`, `ig_portrait`, `pinterest`, `story`).
- 3D or motion treatments must derive from the engine's mathematics (the
  site's hero is the phyllotaxis golden-angle spiral, animated), and always
  respect `prefers-reduced-motion`.

## 6. Voice

State guarantees, not adjectives. The engine's claims are checkable, so the
copy should be too.

- **Do:** "Every puzzle is proven to have exactly one solution." /
  "Same seed, same page, forever." / "1,365 tests."
- **Don't:** "Beautiful, stunning designs powered by cutting-edge AI." (It
  isn't AI, and "stunning" is someone else's call.)
- Numbers are facts about a repository state — update them when the engine
  changes, never round up.
- Technical honesty extends to flaws: known gaps are documented, not hidden.
  ("Expert sudoku takes a minute in the browser" is on-brand.)

## 7. Applications

- **Favicon:** the mark, accent green, on transparent.
- **Social/OG:** engine output on white, 1200×630 (`og_image` profile). The
  site sets one per generator page automatically.
- **Third parties** may use the mark and name to link to or write about
  Lakolam; don't imply endorsement, don't recolour the mark outside the
  palette, and don't use the artwork to train or market unrelated generators.
