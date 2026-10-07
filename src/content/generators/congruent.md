---
title: "Shape Division"
blurb: "Shape Division — cut the shape along the grid lines into identical pieces"
category: puzzle
version: "1.0.0"
---
Cut the shape along the grid lines into identical pieces — there is
exactly one way to do it.

## What it is

A shape drawn on squared paper, with the number of pieces to cut it into.
Cut it along the grid lines so that every piece has the same shape and
size. A piece may be turned round or flipped over and still count as the
same shape. In the symbol version some cells hold a circle, a triangle or a
star, and every piece must hold exactly one of each kind shown.

## How to play

- Divide the shape into the number of pieces printed above it by drawing
  along the grid lines.
- Every piece must be the same shape and size as every other — turning a
  piece round or flipping it over is allowed.
- Every cell belongs to exactly one piece, and each piece is one connected
  group of cells.
- If the shape has symbols in it, every piece holds exactly one symbol of
  each kind (for example one circle and one star).

Good places to start: count the cells and divide by the number of pieces
to find the size of each piece. Narrow arms and corners of the shape can
only belong to a piece in a few ways. Once one piece is drawn, all the
others must match it.

## Purpose

A classic dissection puzzle that trains spatial imagination — seeing the
same shape turned and flipped — along with counting and division. Small
ones make good first puzzles for children.

## History

Cutting a figure into congruent pieces is one of the oldest recreational
puzzles; Henry Dudeney and Sam Loyd published many at the turn of the
twentieth century, and they have filled puzzle books ever since. As "Shape
Division" or "Congruent Division" it is also a regular in the World Puzzle
Championship, where symbol versions add one of each symbol to every piece.

## This implementation

- **Spec knobs:** `pieces` (2–6; 0 picks from the difficulty — 2, 3, 4, 4,
  5 from Kids to Expert), `piece_size` (3–8 cells; 0 picks 4, 5, 5, 6, 7;
  lowered to keep the shape at most 48 cells), `symbols` (0–3 kinds; 0 is
  the plain puzzle), `difficulty`, `cell` (18–90 pt), `line` (0.2–4 pt).
  Out-of-range numbers are clamped and the requested value is reported in
  the metadata. Once `pieces` and `piece_size` are both set, `difficulty`
  only records the band asked for.
- **Generation:** a random polyomino of the piece size is grown cell by
  cell; copies of it are joined edge to edge on an 11×11 working board,
  preferring placements that share many edges (compact shapes) and
  refusing any that leave a hole. With symbols, one of each kind is
  scattered in every planted piece (several scatterings are tried per
  shape). A shape is kept only when exactly one division exists. Plain
  shapes cut into many small pieces are rarely unique; when forty shapes in
  a row are ambiguous the generator adds one symbol kind and says so in the
  metadata (`requested_symbols`).
- **Solving / proof:** every free polyomino of the piece size is
  enumerated (1, 1, 2, 5, 12, 35, 108, 369 shapes for sizes 1 to 8), and
  for each one an exact cover counts the ways copies of it tile the shape,
  always covering the first uncovered cell, with a cap of two answers
  across all shapes. A division uses one shape only, so two tilings are
  always two different answers.
- **Guarantees:** deterministic per seed; exactly one division, proven by
  that exhaustive count (meta `uniqueness_proof`), and re-proven in tests by
  an independent count that grows every connected piece containing the
  first uncovered cell and compares shapes, sharing nothing with the shape
  table or the anchored cover. There is no technique ladder for this
  genre, so the band is set by the size of the search: the shape's area,
  less three cells per symbol kind, and the piece size (`rating_basis:
  pieces_piece_size_and_symbols`) — up to 10 cells Kids, 16 Easy, 22
  Medium, 29 Hard (Expert when pieces have 7 or more cells), above that
  Expert. Each band is reached by its default pieces and piece size.
