---
title: "Star Battle"
blurb: "Star Battle — one or two stars in every row, column and region, none touching"
category: puzzle
version: "1.2.0"
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

- **Spec knobs:** `size` (5–9 with one star; 8–10 with two), `stars` (1 or
  2 per row, column and region; other values are clamped), `difficulty`,
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
