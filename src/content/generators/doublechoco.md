---
title: "Double Choco"
blurb: "Double Choco — divide a grey-and-white grid into blocks of one white and one grey half of the same shape"
category: puzzle
version: "1.1.0"
---
Break the bar into pieces — every piece is two matching halves.

## What it is

A grid painted in grey and white, like a bar of two-tone chocolate, with a
few numbers on it. The whole grid divides into blocks, and each block is
one white area and one grey area of exactly the same shape (one may be a
turned or flipped copy of the other). There is exactly one way to divide
the grid.

## How to play

Draw lines along the grid to divide every cell into blocks. The rules:

- every block contains exactly one white area and one grey area, each
  joined along edges, and the two areas have the same shape - turning and
  flipping are allowed;
- a number tells how many cells of its own colour its block has (so the
  block has twice that many cells in all);
- blocks without numbers can be any size.

Small one-colour patches are a good start: a single white cell walled in by
grey must be half of a two-cell block. A number fixes the size of both
halves, so count the cells of the other colour within reach - a 4 needs a
matching four-cell grey shape right beside its white four.

## Purpose

A region-dividing puzzle about shape matching: every piece must be found
twice, once in each colour. It trains seeing shapes under rotation and
reflection, and counting both colours at once.

## History

Double Choco is a Nikoli genre, published in the Japanese puzzle magazine
Puzzle Communication Nikoli; its name compares the grid to a bar of
two-coloured chocolate broken into pieces.

## This implementation

- **Spec knobs:** `rows`, `cols` (4–11; 0 picks from the difficulty — 5×6,
  6×6, 7×8, 8×8, 8×10 from Kids to Expert; the area is kept even),
  `max_half` (largest half in the answer, 2–6, default 4; 2–3 for Kids),
  `difficulty`, `cell`, `line`.
- **Generation:** the answer and the painting are built together. At the
  first open cell a random half is grown, a congruent copy (turned or
  flipped) is placed against it, and one of the two is painted grey;
  placements that leave an odd pocket, or that grow a one-colour patch of
  the painting past twelve cells, are refused, and dead ends backtrack.
  Every cell then starts with its number, and numbers are removed in a
  seeded order while the deduction ladder, capped at the requested rung,
  still divides the whole grid (for Expert, while an exhaustive count with
  a 20,000-node budget still finds one division).
- **Solving:** the candidates are every block the painting allows of any
  size: each connected white set (drawn from the white patches, listed once
  from its first cell) with every turned or flipped copy of it that lies
  wholly on grey cells beside it, keeping those whose numbers all equal the
  half size. Because every patch has at most twelve cells, this list is
  complete - no size limit is assumed for blocks without numbers. *Forced*
  (Easy): a cell only one candidate can still cover takes it. *Look one
  step* (Medium): a candidate is struck if placing it would leave some
  open cell with no candidate. *Pairs* (Hard): where a cell has two
  candidates left, each is tried and struck if the lower rungs then reach a
  contradiction. Grids the ladder cannot finish are proven by search alone
  (Expert).
- **Guarantees:** deterministic per seed; exactly one division, proven by
  an exact-cover search (branching on the cell with the fewest candidates)
  that counts to a cap of 2 and treats an exhausted node budget as
  ambiguous. Every block is re-checked from the definition (two connected
  halves, equal canonical shape, numbers equal to the half size), and tests
  recount with an independent search that grows both halves through
  connected sets and compares their shapes. Rated by the hardest rung
  needed (forced: Kids for grids of 30 cells or fewer, else Easy;
  look-one-step Medium; pairs Hard; search-only Expert). If a band is not
  reached in thirty attempts the nearest band found is returned and
  labelled (`requested_difficulty` in meta); at the default sizes Expert is
  reached for about two seeds in three, Hard otherwise.
- **Half-size fallback (v1.1):** halves of at most two cells (dominoes and
  four-cell blocks) rarely pin a single division. Only when all thirty
  attempts find nothing does the generator allow larger halves one step at a
  time (up to 6, or 3 for Kids), from fresh seeds, and serve the nearest band
  found at the smallest size that works; such a grid says so in meta
  (`requested_max_half` beside `largest_half`). Every grid that generated
  before is unchanged.
