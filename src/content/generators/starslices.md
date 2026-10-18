---
title: "Star Slices"
blurb: "Star Slices — cut the grid edge to edge so every piece holds one star"
category: puzzle
version: "1.0.0"
---
Cut the grid with straight lines from edge to edge so that every piece holds exactly one star.

## What it is

A square grid with stars in some of its cells. You cut it along the grid
lines, right across from one side to the other, and the cuts must leave
every piece with one star — no more, no less. Only one set of cuts works.

## How to play

Draw your cuts along the lines between the rows or between the columns.
Every cut runs straight across the whole grid, from edge to edge; you never
cut through a cell or stop part way.

When you are done, the cuts split the grid into rectangular pieces. Each
piece must hold exactly one star.

Start with stars that sit side by side: the line between them must be cut,
because nothing else can separate them. Then count: if there are 6 stars,
there are 6 pieces, so the cuts across and the cuts down must make 6
(2 rows of pieces × 3 columns of pieces, or 3 × 2, or 1 × 6…). Every row of
pieces holds the same number of stars, and so does every column of pieces.
If the page says how many cuts to make, use that too.

## Purpose

A quick cutting puzzle for young solvers. It practises counting and simple
multiplication (rows of pieces times columns of pieces), and shows how one
straight line affects a whole row of cells at once.

## History

Cutting puzzles are old favourites of puzzle books: divide a cake, a field
or a board with a few straight cuts so that every part gets one cherry,
tree or coin. This grid version, with cuts only along whole rows and
columns, appeared among children's browser games in the 2010s.

## This implementation

- **Spec knobs:** `difficulty`; `cuts_shown` (print how many cuts across
  and down to make; the board is unique without it); `cell`, `line`. Band
  boards: Kids 5×5 with 1 cut across and 1 down (4 stars), Easy 6×6 with
  1 and 2 (6 stars), Medium 7×7 with 2 and 2 (9), Hard 8×8 with 2 and 3
  (12), Expert 10×10 with 3 and 3 (16). Every band is served as asked
  (`rating_basis: "size_stars_cuts"`).
- **Generation:** seeded cut positions, then one star in a random cell of
  each piece; a layout whose cuts are not the only answer is redrawn.
- **Solving:** every subset of cuts across and every subset of cuts down is
  tried — only subsets whose bands hold equal shares of the stars are
  paired — and a pair counts when every piece holds one star. The count
  stops at two.
- **Guarantees:** exactly one set of cuts leaves one star per piece
  (`unique: true`), re-checked in tests by literally cutting the grid for
  every cut subset. The answer key draws the cuts in red.
