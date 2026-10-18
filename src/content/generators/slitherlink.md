---
title: "Slitherlink"
blurb: "Draw one closed loop, clued by how many edges each cell touches"
category: puzzle
version: "1.3.0"
---
Draw a single closed loop along the grid lines so each clue counts the edges
drawn around its cell.

## What it is

A lattice of dots. Some cells between the dots carry a number 0–3: exactly
that many of the cell's four edges are part of the loop. The loop is one
simple closed curve — it never branches, never crosses itself, and there is
only one of it.

Variety boards use other cells. On a **hexagon** board the dots outline
hexagons and a clue runs from 0 to 6; on a **triangle** board they outline
small triangles inside one big triangle and a clue runs from 0 to 3.

Tiling boards go further. **Cairo** boards are paved with pentagons that
pair up like the streets of Cairo; **snub square** boards mix tilted squares
and triangles; **floret** boards are pentagons gathered six at a time into
flowers; and **Penrose** boards are cut from the famous never-repeating
tiling of thick and thin diamonds.

## How to play

Zeros are gifts: no edge touches them, and a 3 beside a 0 is nearly forced.
Corners and edges constrain hard — a 3 in a corner takes both outer edges.
Track dot degrees: every dot on the loop has exactly two drawn edges, so a dot
with two edges decided excludes the rest. The single-loop rule closes the
game: never complete a small cycle while cells remain unsatisfied.

Big boards climb a ladder of techniques, and harder boards need higher rungs:

- **Basics:** 0s, a cell that already has its count (cross the rest) or needs
  every open side, a 3 or 1 in a corner, and dot rules (no dot has one or
  three lines).
- **Patterns:** two 3s side by side take the three parallel edges; two 3s on
  a diagonal (even with 2s between) take their outer corners; a line running
  into a 3's corner fills the far two sides, into a 1's corner crosses them.
- **No small loops:** never join the two ends of a path unless that finishes
  the whole puzzle.
- **Inside and outside:** shade cells in or out (the area round the board is
  out). A line separates in from out, a cross joins two cells of the same
  kind — so two cells known to match across a chain of marks settle the edge
  between them, and a 3 beside two matching cells has lines on both sides.
- **What if:** imagine an edge drawn (or crossed), follow the easy rules, and
  if something breaks, it must be the other way.
- **Both ways and deep what-if (Expert):** try an edge both ways and keep what
  both agree on, or follow a what-if much further, using what-ifs inside it.

On hexagons and triangles the rules are the same — the number in a cell says
how many of its sides the loop uses. Dots on a hexagon board meet only three
edges, so a dot with one drawn edge and one excluded edge forces the third. A
hexagon's 5 leaves just one side free. On triangles the 1s and 2s do the
work: a 3 would close the loop around a single triangle, so it never appears
on a real board.

On the tiling boards — pentagons, squares with triangles, flowers of
pentagons, Penrose diamonds — it is still the same rule: the number in a
shape counts how many of its sides the loop uses, so a pentagon's clue runs
up to 5 and a diamond's or a square's up to 4. The faint outlines show the
shapes; the loop runs along them from dot to dot. Some dots meet three
edges, some meet many (a Penrose star point meets five, a flower's centre
six), and the dot rule is unchanged: a dot on the loop has exactly two
lines. Look first for zeros and for shapes that can take only one more
line, then work outward along the dots.

## Purpose

The archetypal loop puzzle and one of Nikoli's "big four". In the workspace it
is the hardest solver honestly bounded: slitherlink is NP-complete, the search
carries four proof-based prunes, a worklist propagator, and a union-find over
dots — and its development history (including a rollback bug that could have
called ambiguous boards unique) is recorded in the module docs as a warning.

## History

Nikoli, 1989, credited as a collaboration refined by founder Maki Kaji.
Published in English as Slitherlink, Fences, Loop the Loop and Dotty Dilemma.
It remains one of the most-analysed pencil puzzles in computer science.

## This implementation

- **Spec knobs:** `rows`, `cols` (square boards: 3–8 on the exhaustive path;
  a side above 8 takes the ladder path, rows 3–25 × columns 3–30), `fill` (share of the
  board the loop encloses), `difficulty`, `cell`, `line`, and `grid` —
  `square` (the default), `hex` (a hexagonal board of hexagons; `rows` sets
  its radius as `rows ÷ 2`, 2–4, i.e. 19, 37 or 61 cells) or `triangular`
  (one big triangle of small ones; `rows` is its rows, 4–8, i.e. 16–64
  cells). `cols` is ignored on hex and triangle boards; the tilings (`cairo`,
  `snub_square`, `floret`, `penrose`) are described below.
- **Generation:** answer first — a closed loop is grown on the dual grid as a
  random simple polygon (the `lattice` module, shared through `lako-grid`),
  every cell's edge count is read off it, then clues are removed while the
  loop stays unique.
- **Guarantees:** exactly one loop satisfies the printed clues; the search is
  cross-checked against brute force over **every clue subset** of a small
  board — the test that once caught a union-find rollback bug no ordinary
  fixture would have found.
- **Difficulty:** rated by the share of cells still clued (`rate`): the
  sparser the board, the more of the loop is inferred.
- **Version 1.1 — hex and triangular grids:** the board is read off
  `lako-grid`'s cell outlines (corners become dots, sides become edges) and
  solved by a general branch-and-propagate edge search — clue and dot-degree
  rules force edges, a union-find spots a closing cycle, which must then hold
  every drawn edge — with a node budget whose exhaustion counts as ambiguous,
  never unique. Generation is the square plan: grow a connected, hole-free
  set of cells, take its outline as the loop (checked to be one loop, since
  triangles can pinch at a corner), clue every cell, then blank clues while
  the count stays exactly one. Blanking stops at the requested band's floor of
  clue share, so every band down to Hard is met exactly; Expert (at most 32%
  clued) is reached on most boards and otherwise served as Hard and recorded
  (`requested_difficulty`). The tests check the general search against the
  square solver on square boards and against an independent count over every
  set of enclosed cells on small hex and triangle boards. The variety pages
  draw faint cell outlines under the dots, since hexagons and triangles are
  hard to read from dots alone. Square boards are byte-identical to 1.0.
- **Version 1.2 — `line` works on every grid:** the answer key's loop is
  drawn `line` times its standard width. Square boards draw no cell outlines,
  so before this `line` changed nothing there. Pages and keys at the default
  `line` of 1 are unchanged.
- **Version 1.3 — large boards on a technique ladder:** a square board with a
  side above 8 (to 25 rows × 30 columns; 20×20 and 25×30 are the big site
  sizes) is generated by `lako-loop`. The loop is grown as before (from its
  own derived seed), every cell is clued, and clues are removed only while the
  sound `lako-loop` ladder still settles every edge from the clues alone —
  the proof of uniqueness at these sizes (every rung is a pure consequence of
  the rules, none assumes uniqueness). The band is the **hardest rung** the
  solve needed (`rating_basis: "hardest_rung"`, `hardest_rung` and
  `rung_uses` in meta): basics → Kids, patterns → Easy, no small loops and
  inside/outside → Medium, one-edge what-if → Hard, both ways / deep what-if
  → Expert. The requested band caps the rungs the thinning may use (a cheap
  pass up to inside/outside, then a pass under the full cap). All five bands
  are reached at 10×10, 15×15, 20×20 and 25×30 at the default seed; a board
  that misses its band is served at the nearest one with
  `requested_difficulty`. Generation takes well under 2 s at 20×20 Expert
  and about 2 s at 25×30. The tests re-prove 9×9 ladder boards with the
  exhaustive count, and `lako-loop` checks every rung against brute force on
  small boards. Boards up to 8×8, and hex and triangle boards, are
  byte-identical to 1.2 (clue-share rating, exhaustive count).
- **Tilings — Cairo, snub square, floret, Penrose:** `grid: "cairo"`,
  `"snub_square"`, `"floret"` or `"penrose"`. Each board is a patch of the
  tiling built from exact coordinates (square roots only, no trigonometry,
  so every platform lays it out identically) and read into the general
  dot/edge/face graph. Cairo: equilateral pentagons from a `rows × cols`
  block of squares (3–10 each; 6×6 = 60 pentagons, 10×10 = 180). Snub
  square (3.3.4.3.4): unit squares and triangles in a window `rows × cols`
  tile edges (3–10; 6×6 ≈ 67 tiles, 10×10 ≈ 171). Floret: the dual of the
  snub hexagonal tiling — pentagons with sides 1 and 2, six round each
  flower centre — in a window `rows × cols` (3–10; 6×6 ≈ 55, 10×10 ≈ 156).
  Penrose (P3): a sun of Robinson triangles deflated six times and paired
  into thick and thin rhombi; a round patch of radius `rows × ⅔` edges
  (rows 3–10; 6 ≈ 61 rhombi, 10 ≈ 169) cut around a spot the seed picks
  within three edges of the centre, so each seed gets its own patch; `cols`
  is unused. Every patch is one piece with no holes (checked: Euler
  characteristic 1 for every size). Generation is the large square board's
  plan on the general graph: grow a connected hole-free set of tiles, take
  its outline as the loop, clue every tile, and blank clues only while a
  sound **general-graph ladder** still settles every edge: basics (dot
  degree 0 or 2, face counts), patterns (one face with its corner dots, every
  way at once), no small loops, inside/outside (face parity through chains,
  and a clue counted class by class), what-if, both ways and deep what-if —
  the same rungs and names as `lako-loop`. The band is the hardest rung the
  solve needed (`rating_basis: "hardest_rung"`, `hardest_rung`, `rung_uses`,
  `proof` in meta). An Expert request the ladder thins only to an easier band
  gets one more pass where a clue may go when the exhaustive count (cap 2,
  20,000-node budget) completes with exactly one loop — running out keeps
  the clue — and such a board is rated Expert with `hardest_rung: "search"`
  and `proof: "exhaustive_count"`. All five bands are reached at 6 and 10
  on every tiling at the default seed; generation takes under 1 s at the
  largest size (Expert), and milliseconds at the default size. The tests
  re-prove the boards with the general edge search and, on small boards,
  by enumerating every set of enclosed tiles; they also check every ladder
  rung against brute force on random clue subsets (no mark ever disagrees
  with any answer). Tiles are drawn with faint outlines under the dots;
  clues are one size per board, from the smallest tile's inner circle. Square,
  hex and triangle boards are byte-identical to before.
