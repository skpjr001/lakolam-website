---
title: "Heteromino"
blurb: "Heteromino — divide the white cells into trominoes; touching pieces never match in shape and orientation"
category: puzzle
version: "1.0.0"
---
Cut the grid into pieces of three — and never let two identical pieces
touch.

## What it is

A square grid with a few black cells. Divide all the white cells into
trominoes: pieces of three cells, either straight or bent into an L. Two
pieces that share an edge must look different — a different shape, or the
same shape turned a different way. The black cells are the only clues.

## How to play

Draw lines along the grid to divide every white cell into pieces of
exactly three cells, so that:

- each piece is three cells in a straight line or bent into an L;
- black cells belong to no piece;
- two pieces that share an edge are never the same shape in the same
  orientation (two straight pieces may touch only if one runs across and
  the other down; two L pieces may touch only if they are turned
  differently).

A white cell tucked in a corner or beside black cells has few ways to
belong to a piece — start there. Count as you go: a pocket of white cells
walled off by black cells and finished pieces must hold a multiple of three
cells.

## Purpose

A tiling puzzle where the pieces are tiny but the rule about neighbours is
strict, so every placement pushes its neighbours into a different shape.

## History

Heteromino was invented by Naoki Inaba, the prolific Japanese puzzle
designer, and is published among his genres and on puzz.link. Its name
mixes "hetero" (different) and "tromino" (a three-cell polyomino).

## This implementation

- **Spec knobs:** `size` (4–8; 0 picks from the difficulty — 5, 6, 6, 7, 8
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** a random board is laid out cell by cell in row-major
  order — each uncovered cell either turns black (a small seeded chance, or
  when no piece fits) or starts a random fixed tromino that touches no
  alike piece — so the board always has a division. Then black cells are
  moved one at a time to white cells by local search, keeping moves that
  leave the board no farther from finished: fewer divisions while there
  are several (counted with a cap), then fewer pieces the ladder leaves
  unsettled once there is one.
- **Solving:** one yes/no variable per placement of each of the six fixed
  trominoes, on a ladder of rungs — *cover and clash* (every white cell in
  exactly one chosen placement; two touching placements of the same fixed
  shape never both chosen), *pockets* (each group of uncovered white cells
  holds a multiple of three; it only detects contradictions, so it never
  rates a board) and *trial* (assume a placement, propagate the lower
  rungs, keep the opposite on a contradiction).
- **Guarantees:** deterministic per seed; exactly one division, proven
  because the sound ladder settles every placement, confirmed by the
  engine's capped exhaustive count, and re-proven in tests by an
  independent backtracking tiler that knows only the rules. The answer key
  outlines every piece and shades it by its fixed shape — touching pieces
  never share a shade. Rated by the hardest rung needed: cover and clash
  alone are Kids up to 5×5 and Easy above; trial is Medium up to 6×6, Hard
  at 7×7 and Expert above. Every band is reached at its default size; a
  band a chosen size cannot reach is served as the nearest band that size
  reaches, and labelled as such. From 7×7 up, cover and clash alone
  practically never settle a division, so only trial is searched there:
  every 7×7 board is Hard and every 8×8 board Expert.
