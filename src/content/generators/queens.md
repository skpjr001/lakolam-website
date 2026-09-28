---
title: "Queens"
blurb: "Queens - one queen in every row, column and coloured region, none touching"
category: puzzle
version: "1.0.0"
---
Place one queen in every row, every column and every coloured region, with
no two queens touching.

## What it is

A square board divided into coloured regions, as many regions as there are
rows. Place queens so that:

- every row holds exactly one queen;
- every column holds exactly one queen;
- every coloured region holds exactly one queen;
- no two queens touch, not even diagonally.

There are no numbers: the shapes of the regions are the whole puzzle.

## How to play

When you place a queen, cross out the rest of her row, her column, her
region and the eight cells around her. A region, row or column with only one
cell left must take the queen there. Look for a region that fits entirely
inside one row (or column): its queen will use that row, so cross out the
rest of the row. The reverse also works: a row whose open cells all lie in
one region claims that region's queen. Watch for cells that would starve a
neighbour: if a queen on a cell would cross out every open cell of some
other region, that cell cannot hold a queen. On bigger boards, count groups:
if two regions together only reach two rows, those two rows belong to them,
and every other cell in those rows is empty.

## Purpose

A colourful, number-free logic puzzle that anyone can start at once, with a
clean look on the page. Its moves grow naturally from simple crossing-out to
counting arguments across several regions, so one set of rules serves
children on a 5×5 board and experienced solvers on 10×10.

## History

Queens was introduced by LinkedIn in 2024 as one of its daily games. It is
the one-star form of Star Battle, the genre created by Hans Eendebak for the
2003 World Puzzle Championship, and it echoes the classic eight queens
problem, with regions and the no-touching rule in place of diagonal attacks.

## This implementation

- **Spec knobs:** `size` (5-10; 0 picks from the difficulty: Kids 5, Easy 6,
  Medium 7, Hard 8, Expert 9 or 10 by seed), `difficulty`, `cell`, `line`.
- **Generation:** a random valid queen arrangement is placed first, then a
  region is grown around each queen by a flood that favours the smaller
  regions. The regions are then walked: one non-queen border cell moves to a
  neighbouring region, both staying connected (no region below two cells or
  above 2n+2), and a move is kept unless it leaves more cells unsettled by
  the ladder (plus a penalty for one-cell regions), with an occasional uphill
  step to leave plateaus. Zero is the ladder proving the arrangement unique.
  Up to 24 attempts; the board rated closest to the request is kept.
- **Solving:** a technique ladder — *basic* (a queen clears her row, column,
  region and neighbours; a group with one open cell takes the queen),
  *pointing* (a group confined inside another claims it; a cell whose queen
  would empty another group is ruled out), *sets* (k regions confined to k
  rows or columns, and k rows or columns confined to k regions). No trial
  rung is needed: the walk settles every requested size with sets or less.
- **Guarantees:** deterministic per seed; exactly one solution, since every
  deduction is sound and the ladder settles every cell, and confirmed in the
  tests by an independent row-by-row backtracking count; every region is
  connected. Rated by the hardest technique and size: pointing on 5×5 is
  Kids, 6×6 Easy, 7×7 Medium, 8×8 Hard; sets on 9×9 and 10×10 is Expert.
  Generation takes under 150 ms up to Hard and roughly 0.03-0.9 s for
  Expert. Regions are printed in distinct pastel fills, chosen so that
  neighbouring regions also differ in grey level, with bold borders so the
  board reads in black and white.
