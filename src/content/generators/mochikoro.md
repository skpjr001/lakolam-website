---
title: "Mochikoro"
blurb: "Mochikoro — shade cells so the white rectangles link at their corners and match their numbers"
category: puzzle
version: "1.0.0"
---
Shade cells so the white spaces become rectangles, all linked at their
corners.

## What it is

A square grid with a few numbers. Shading cells splits the white cells into
separate areas. In the finished grid every white area is a perfect
rectangle, no two of them share an edge, and together they form one network
in which each rectangle touches another at a corner. A number tells you the
size of the white rectangle it sits in.

## How to play

Shade cells so that:

- every white area (white cells joined through shared sides) is a rectangle
  or a square;
- all the white areas are linked into one network through cells that touch
  at a corner;
- a numbered cell stays white, and its white area has exactly that many
  cells; no area holds two numbers, and areas without a number can be any
  size;
- no 2 by 2 block of cells is entirely shaded.

A 1 is a single white cell: shade its four neighbours. Look at every 2 by 2
block: three white cells and one shaded cell is never allowed, because the
white area would bend around a corner and stop being a rectangle. Two
numbered cells that would end up in one area must be split by shading.
Finally, keep the network linked — a white area cut off from all the others
at every corner is not allowed.

## Purpose

A tidy shading puzzle that mixes counting with shape: every white area must
come out as a clean rectangle, and the corner-linking rule ties the whole
grid together. It trains the habit of checking small 2 by 2 windows and
seeing rectangles grow from their numbers.

## History

Mochikoro is a Nikoli genre from the family of Nurikabe, the Japanese
"island" puzzles, published in its magazines and puzzle books. A sibling
genre,
Mochinuri, keeps the rectangles but drops the corner-link rule in favour of
a shaded wall that must be connected.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8, 10
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** the answer is drawn by the solver's own rules: cells are
  visited in seeded order and given a seeded colour (white about two times
  in three), propagating the 2×2 and corner-link rules after each, and a
  colour that contradicts takes the other; dead ends are retried. Numbers
  are added, one per white area, in the area whose surroundings the ladder
  leaves least settled, until it settles everything; then erased one at a
  time, in seeded order, while the ladder still settles every cell at the
  requested rung.
- **Solving:** a ladder of three rungs on shaded/white cells — *rectangles*
  (each number's possible rectangles, holding no other number: cells inside
  all survivors are white, cells along the sides of all survivors shaded;
  every 2×2 block is never all shaded and never three white around one
  shaded), *diagonal connectivity* (white cells link through corners: cells
  the network cannot reach are shaded, and a cell whose loss would split it
  is white — cut cells of the king-move graph, one depth-first search), and
  *trial* (assume a cell, propagate the lower rungs, keep the opposite on a
  contradiction).
- **Guarantees:** deterministic per seed; exactly one shading, proven because
  the sound ladder settles every cell, also confirmed by the engine's capped
  exhaustive count when that fits its budget (`count_confirmed` in the
  metadata), and re-proven in tests by an independent search that knows only the
  rules as a feasibility test. A test checks on every 4×4 white set that "no
  2×2 block with three white cells" is exactly "every area a rectangle".
  Rated by the hardest rung needed, with size as the tie-break (rectangles:
  Kids at 5×5, Easy above; corner connectivity: Medium; trial: Hard up to
  8×8, Expert from 9×9). Every band is reached at its default size; a band
  the chosen size cannot reach is served at the nearest band found and
  labelled as such (`requested_difficulty` in the metadata).
