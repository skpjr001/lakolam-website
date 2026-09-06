---
title: "Star Battle"
blurb: "Star Battle — a star in every row, column and region, none touching"
category: puzzle
version: "1.0.0"
---
Place a star in every row, every column and every region — no two stars
touching, not even diagonally.

## What it is

A square grid divided into as many regions as it has rows. The regions are
the entire clue: there are no numbers anywhere. Exactly one star goes in each
row, each column and each region, and stars never touch, even at a corner.

## How to play

Start with the counting arguments: a region squeezed into one row means that
row's star is spoken for, so everything else in the row is empty. When a star
lands, its eight neighbours are empty too — which often collapses a
neighbouring region to a single candidate. Harder boards need placement
reasoning: enumerate where a region's star *could* go and keep only what
every possibility agrees on.

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

- **Spec knobs:** `size` (5–9; one star per line), `difficulty`, `cell`,
  `line`.
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
