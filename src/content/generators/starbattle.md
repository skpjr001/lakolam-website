---
title: "Star Battle"
blurb: "Star Battle — one, two or three stars in every row, column and region, none touching"
category: puzzle
version: "1.3.0"
---
Place a star in every row, every column and every region — no two stars
touching, not even diagonally.

## What it is

A square grid divided into as many regions as it has rows. The regions are
the entire clue: there are no numbers anywhere. Exactly one star goes in each
row, each column and each region, and stars never touch, even at a corner.

The two-star form — sold in newspapers as *Two Not Touch* and the standard
at championships — uses bigger boards (8×8 to 10×10) and puts exactly two
stars in every row, column and region.

## How to play

Start with the counting arguments: a region squeezed into one row means that
row's star is spoken for, so everything else in the row is empty. When a star
lands, its eight neighbours are empty too — which often collapses a
neighbouring region to a single candidate. Harder boards need placement
reasoning: enumerate where a region's star *could* go and keep only what
every possibility agrees on.

On a two-star board every row, column and region holds exactly two stars,
still never touching. Count in blocks of lines: if two regions fit entirely
inside two neighbouring rows, those regions supply all four of the rows'
stars, so every other cell in those rows is empty. And if only two regions
reach into two neighbouring rows at all, both regions must put both their
stars there.

Three-star boards (12×12 to 14×14) work the same way with three stars in
every row, column and region. Two tools carry most of the big boards:

- **Groups of groups.** Any number of regions whose open cells fit inside
  the same number of rows (or columns) own all of those rows' stars, so
  everything else in those rows is empty — and the same with rows inside
  regions, or rows inside columns.
- **2×2 blocks.** Any two cells of a 2×2 square touch, so a square holds at
  most one star. If a row, a region or a pair of neighbouring rows can be
  covered by exactly as many 2×2 squares as it still needs stars, every
  square holds exactly one: a square with one open cell left is a star, and
  any cell touching all of a square's open cells is empty.

On the hardest boards, try a cell: suppose it holds a star, follow the
counting, and if some row, column or region breaks, the cell is empty.

**Shapeless** boards have no regions: one (or two, three) stars in every
row and column, none touching, and the black cells are the clue — no star
goes in a black cell. The same counting, blocks and trial moves apply, with
rows and columns as the only groups.

## Purpose

The most-requested modern logic genre the catalogue was missing — a staple of
Puzzle Baron, GMPuzzles and championship sets. It also exercises a
constraint shape the engine did not have: pure placement with an adjacency
veto and no numeric clue at all, where the *shape of the regions* carries all
the information.

## History

Invented as *Sternenschlacht* by Hans Eendebak for the 2003 World Puzzle
Championship, and popularised online as Star Battle. Published boards range
from gentle 1★ 6×6s to the tournament-standard 2★ 10×10.

## This implementation

- **Spec knobs:** `size` (5–9 with one star; 8–10 with two; 12–14 with
  three), `stars` (1, 2 or 3 per row, column and region; other values are
  clamped), `shapeless` (no regions; black cells instead), `difficulty`,
  `cell`, `line`.
- **Generation:** place a valid star arrangement first (depth-first, no two
  touching), grow one region around each star by seeded random flood, then
  accept only boards the shared solver proves unique.
- **Solving:** four propagators — line/region counting, exact placement
  enumeration (the no-touch rule folded in), star-neighbour elimination, and
  the genre's signature confinement move (a region pinned to one line empties
  the rest of that line, and vice versa), rated at sudoku's pointing-pair
  rung.
- **Guarantees:** deterministic per seed; exactly one solution, proven by
  exhaustive count; solvable by the technique ladder without guessing, and
  rated by the hardest technique actually used with board size as the
  tie-break (`rating_basis` names this).
- **Version 1.1 — every size generates:** at 8 and 9 (and 7 for a few
  seeds) randomly grown regions are almost never unique, and all 400
  original attempts failed. Only that failure path changed: when they
  produce nothing, up to 24 more grow a layout from fresh seeds and repair it
  by local search — a non-star cell moves to a neighbouring region (both stay
  connected, regions stay within 14 cells) whenever the ladder then settles
  no fewer cells — until the ladder finishes the board; uniqueness is then
  proven by the exhaustive count as before. The band is measured as before;
  one that is out of reach is served as the nearest and labelled
  (`requested_difficulty`). Every board that generated before is
  byte-identical.
- **Version 1.2 — two stars:** `stars: 2` places two stars per row and
  column (row-by-row search over non-touching column pairs), grows one small
  region around every star, pairs neighbouring regions into the board's `n`
  regions by a random perfect matching (regions of at most 20 cells), then
  repairs the layout by the same local search until the ladder finishes it.
  The propagators were already written for any count; one is added — the
  *squeeze*, confinement over a band of two or more neighbouring rows or
  columns (`m` regions inside `m` lines own all their stars; `m` lines
  reached by only `m` regions take all of those regions' stars), rated as an
  X-wing for two lines and a swordfish for more. Uniqueness is proven by the
  solver's exhaustive count, and the tests re-prove it with a separate
  row-by-row placement count that uses only the rules. The bands reached are
  **Hard** (placement enumeration) and **Expert** (confinement or the
  squeeze): counting alone never finished a two-star board in measurement, so
  Kids, Easy and Medium requests are served as Hard and the request is
  recorded (`requested_difficulty`). A 10×10 takes up to a few seconds.
  One-star boards are byte-identical to 1.1.
- **Reachable bands (documented, output unchanged):** the band is the
  hardest rung the solve needed with board size as the tie-break, and on
  one-star boards only two rungs decide it in practice — counting alone, or
  a confinement. Placement enumeration is almost never the hardest step
  needed: in a measurement, 171 of 171 layouts repaired to be solvable
  without confinement came out solvable by counting alone. So the bands
  reached are, by size: **5–6** Easy (counting) and Hard (confinement);
  **7** Medium and Hard; **8–9** Medium and Expert. Kids is never reached
  (counting is the first rung any board needs), nor Expert below 8, nor
  Medium at 5–6 except by rare chance; such requests are served as the
  nearest band and `requested_difficulty` records the request.
- **Version 1.3 — three stars, shapeless, and the k-star ladder:** a new
  pipeline (`kstar.rs`) places `k` stars per row and column (row-by-row
  search over non-touching column sets), grows one small region per star,
  groups neighbouring small regions into the board's `n` connected regions
  of `k` stars (regions of at most 20 cells, 26 with three stars), and
  repairs the layout by local search until its own ladder finishes it. The
  ladder names the genre's moves, cheapest first: **counting** (neighbours,
  full groups, last open cells); **confinement** (one group's open cells in
  one group of another family); **unions** (the same for unions of 2–4
  groups, any family against any other — multi-region pressure);
  **2×2 blocks** (a row, column, region or two-line band covered by exactly
  as many disjoint 2×2 squares as it needs stars: each square holds one);
  **enumeration** (a group's placements listed, including cells outside it
  that every placement touches); **what-if** (suppose a cell, follow
  counting and confinement, a broken rule fixes it). Every rung is sound
  and the solve settles every cell, so the board is unique; the tests
  re-prove it with the rules-only placement count. Pages from this path are
  rated `hardest_rung` — counting Easy (Kids on 1★ shapeless 5–6),
  confinement/unions/blocks Medium, enumeration Hard, what-if Expert — and
  their meta carries `rung_uses`, `shapeless` and `blocked_cells`.
  - **Three stars** (`stars: 3`) on 12×12 to 14×14 (an 11×11 grid has no
    arrangement of three non-touching stars per row and column — the
    placement search exhausts it).
    Bands reached: **Medium**, **Hard**, **Expert**; Kids and Easy are served
    as Medium (counting alone never finished a multi-star region board).
    About 0.5–8 s at 14×14.
  - **Two stars below Hard** now come from this path: Kids, Easy and Medium
    requests on 8–10 get a real **Medium** board (the 2×2-block rung is what
    makes it reachable), occasionally Hard or Expert when a layout settles
    there. This is the one change to existing output, and the reason for
    the version bump: those requests used to be served as a Hard board
    (`requested_difficulty` recorded). Two-star Hard and Expert, and every
    one-star board, are byte-identical to 1.2.
  - **Shapeless** (`shapeless: true`, any star count, same sizes): stars are
    placed, every other cell starts black, and blacks are lifted in seeded
    order while the ladder at the band's ceiling still finishes the board —
    a minimal-clue climb, so harder bands keep fewer blacks. All five bands
    are reached (Kids at 1★ 5–6, Easy elsewhere at the bottom); under half a
    second at 14×14 three-star.
