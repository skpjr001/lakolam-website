---
title: "Norinori"
blurb: "Norinori — shade two cells in every region, all in dominoes that touch only diagonally"
category: puzzle
version: "1.1.0"
---
Shade exactly two squares in every outlined region — and every shaded square
must pair with exactly one neighbour, so the shading falls into dominoes.

## What it is

A grid divided into irregular regions. Shade squares so that each region holds
exactly two shaded squares, and each shaded square touches exactly one other
shaded square across an edge. The shading therefore forms dominoes; two
dominoes may touch at a corner but never along a side. A domino may lie inside
one region or straddle two.

## How to play

A two-square region is a domino outright. Once a square is shaded and its
partner found, every other square around the pair is blank. A shaded square
with only one open neighbour shades it; an open square with no possible
partner stays blank. Count each region: when it has its two, the rest is
blank; when only two open squares remain, both are shaded. Harder boards need
a what-if: shade a square and see whether a region runs out of room.

## Purpose

A Nikoli genre with a dedicated following (puzzle-norinori.com and many apps)
and a pure local-constraint shading puzzle: no numbers at all, only regions.
It adds the catalogue's first "shade in pairs" mechanic alongside the
connectivity shaders (`nurikabe`, `heyawake`) and the count shaders
(`fillapix`, `tapa`).

## History

Published by Nikoli; the name is Japanese for "glue" (nori), after the way the
shaded squares stick together in pairs.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty; 11 and 12 are
  built at 10 and reported as `requested_size`), `difficulty`, `cell`, `line`.
- **Generation:** dominoes are placed first, none touching along a side. Their
  squares are paired into region seeds — a whole domino, or halves of two
  neighbouring dominoes joined through a blank square, the interlock that
  makes a layout tight — and regions are grown to cover the grid. Random
  regions alone almost never pin the shading (every one of fifty 6×6 layouts
  tested had three or more answers), so the regions are then walked: one
  blank border square at a time moves to a neighbouring region, both staying
  connected, keeping moves that leave no more squares unsettled by the
  inference ladder, with occasional uphill steps to leave plateaus, until the
  ladder settles every square. If that finds nothing, a second phase pairs
  the seeds most-constrained-first and aims each move at a region that still
  holds an undecided square.
- **v1.1.0:** the region-growing sort drew fresh noise per comparison, which is
  not a total order: past 20 regions std's sort panicked (11×11, 12×12). Up to
  20 regions the same draws are kept call for call, so those boards are
  byte-identical; above, each region draws its noise once. 11 and 12 rarely
  settled even without the panic and are now built at 10×10; boards that
  previously failed at 10 now come from the second phase.
- **Solving:** *basic* (region counts; the domino rule from both sides — a
  shaded square's partner, and a square that can never find one) and *trial*
  (assume a square, strike it on a contradiction). If the requested ceiling
  cannot settle within its budget, trial is allowed and the board is rated for
  what it needs.
- **Guarantees:** deterministic per seed; exactly one shading, since every
  deduction is sound and the ladder settles every square — confirmed by an
  independent branching count in the tests. Basic logic rates Kids/Easy on a
  6×6 and Medium on a 7×7; trial boards rate Hard on an 8×8 and Expert on a
  9×9.
