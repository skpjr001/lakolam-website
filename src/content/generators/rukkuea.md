---
title: "Rukkuea"
blurb: "Rukkuea — shade squares that never touch side by side, equal squares never in sight; numbers count their cross"
category: puzzle
version: "1.0.0"
---
Shade squares that never touch along a side — and equal squares must
never see each other.

## What it is

A square grid with numbers in some cells. Some cells are to be shaded so
that the shading forms solid squares of different sizes, scattered apart.
Each number counts the shaded cells in the little cross it sits at the
centre of.

## How to play

- Shade some cells so that every group of shaded cells is a solid square:
  1×1, 2×2, 3×3 and so on.
- Two squares may not touch along a side, though they may touch at a
  corner.
- Two squares of the same size may not see each other: looking along a row
  or a column from one square, the next square you meet must be of a
  different size.
- A number tells how many cells of its cross are shaded — the cross is the
  numbered cell itself and the cells directly above, below, left and right
  of it. A numbered cell may be shaded too.
- There is exactly one solution.

Good places to start: a 0 leaves its whole cross white, and a 5 shades the
whole cross — which must then be part of one big square. A 4 or 5 next to
the edge is just as strong. Shaded cells that touch belong to the same
square, so the square must grow to cover them.

## Purpose

A shading puzzle that mixes counting with shapes and lines of sight. It
trains careful local counting and global "this square must be bigger"
reasoning.

## History

Rukkuea is a genre from Japan; Otto Janko's online collection has about a
hundred of them, from 6×6 up to 14×14.

## This implementation

- **Spec knobs:** `size` (5–12; 0 picks from the difficulty — 6, 7, 8, 8,
  10 from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4
  pt). Out-of-range numbers are clamped and the requested value is
  reported in the metadata.
- **Generation:** answer first. Squares (mostly 1×1, some 2×2 and 3×3, a
  few 4×4 on larger grids) are dropped at random positions, each kept when
  it touches no other square along a side and no two equal squares then
  see each other. Every cell starts numbered with its cross count; numbers
  are removed in random order while the ladder still settles every cell at
  the band's rung.
- **Solving:** a ladder on one yes/no variable per cell ("shaded").
  *Numbers*: each number counts the shaded cells of its cross. *Squares*:
  every group of shaded cells must grow into a solid square with no shading
  beside it — cells inside every square it could still become are shaded,
  cells beside every one of them stay white — and two finished squares of
  one size may not face each other across white cells. *Trial*: assume a
  shade, follow the consequences, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one shading, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it when cheap
  (`count_confirmed`), and re-proven in tests by an independent search that
  places squares corner by corner and shares no code with the ladder.
  Rated by the hardest rung needed with size as the tie-break (numbers
  alone: Kids up to 6×6, Easy at 7×7, Medium up to 10×10, else Hard;
  squares: Easy, Medium, Hard, Expert at the same sizes; trial: Hard up to
  6×6, else Expert). Every band is served at its default size; with a
  custom `size` the label states the band reached.
