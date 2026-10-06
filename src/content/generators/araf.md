---
title: "Araf"
blurb: "Araf — divide the grid into regions, each holding two numbers with its size strictly between them"
category: puzzle
version: "1.1.0"
---
Pair up the numbers — every region's size lies between its two.

## What it is

A grid with numbers scattered over it. The whole grid divides into regions,
each holding exactly two of the numbers, and each region's number of cells
is strictly greater than the smaller of its two numbers and strictly less
than the larger. There is exactly one way to divide the grid.

## How to play

Draw lines along the grid to divide every cell into regions. The rules:

- every region contains exactly two numbers;
- the number of cells in a region is more than the smaller number and less
  than the larger one (a region with a 2 and a 5 has three or four cells);
- every cell belongs to a region, and regions are joined along edges.

Start with numbers that differ by exactly two: a 3 and a 5 make a region of
exactly four cells. Two numbers that differ by one, or are equal, can never
share a region. A number with few partners in reach - a 1 next to a 3 in a
corner, say - is a good first step, and once a region is closed its cells
are taken, which cuts the choices for its neighbours.

## Purpose

A region-dividing puzzle where the clues work in pairs: every number needs
a partner, and the gap between the two sets the size. It trains counting
and spatial planning, and it rewards spotting which pairings are
impossible as much as which are possible.

## History

The genre appeared in Japan around 2007 as "Aidaheya" ("room in between")
and was carried to the international puzzle scene by the Turkish author
Serkan Yürekli under the name Araf. It appeared at the World Puzzle
Championship in 2010 and is a regular in puzzle contests since.

## This implementation

- **Spec knobs:** `rows`, `cols` (4–11; 0 picks from the difficulty — 5×5,
  6×6, 7×7, 8×8, 8×8 from Kids to Expert), `max_region` (3–7; 0 picks 4 for
  Kids and 6 otherwise), `difficulty`, `cell`, `line`.
- **Generation:** a random partition into connected regions of two to
  `max_region` cells, grown from the first open cell (placements that would
  strand a single cell are skipped). Each region gets two numbers in random
  cells, bracketing its size as tightly as possible (one less and one
  more). A local search moves single numbers within their regions, keeping
  each move that leaves no more cells open for the deduction ladder at the
  requested rung, until that rung settles the whole grid. Then each bracket
  is widened one step at a time (the smaller number down, the larger up to
  at most `max_region` + 1) while the requested rung still settles the grid —
  for Expert, while an exhaustive count with a 20,000-node budget still
  finds exactly one division.
- **Solving:** the candidate regions are every connected set holding exactly
  two numbers with its size strictly between them, sizes up to the largest
  number less one, so nothing the rules allow is left out. The ladder works
  over them. *Forced* (Easy): a cell only one candidate can still cover
  takes it, striking every overlapping candidate. *Look one step* (Medium):
  a candidate is struck if placing it would leave some open cell with no
  candidate at all - this is where "this number cannot pair with that one"
  is found. *Pairs* (Hard): where a cell has two candidates left, each is
  tried and struck if the lower rungs then reach a contradiction. Grids the
  ladder cannot finish are proven by search alone (Expert).
- **Guarantees:** deterministic per seed; exactly one division, proven by an
  exact-cover search (branching on the cell with the fewest candidates) that
  counts to a cap of 2 and treats an exhausted node budget as ambiguous.
  Tests re-check every rule region by region and recount with an
  independent search that grows regions through every connected set.
  Rated by the hardest rung needed (forced: Kids for grids of 30 cells or
  fewer, else Easy; look-one-step Medium; pairs Hard; search-only Expert).
  If a band is not reached in ten attempts the nearest band found is
  returned and labelled (`requested_difficulty` in meta); on the default
  sizes every band is reached.
- **Since 1.1.0:** when none of the ten attempts produces any grid (large
  boards, `max_region` 7, or Easy's forced-only rung on boards it cannot
  settle), up to four more attempts with a longer search run from fresh
  seeds at the requested rung and then each rung above (twelve at the top
  rung), serving the nearest band reached and labelling it. Grids that
  generated before are unchanged. Expert on boards near 11×11 is still slow
  (its bracket widening runs an exhaustive count per step).
