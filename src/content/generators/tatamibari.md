---
title: "Tatamibari"
blurb: "Tatamibari: divide the grid into squares, wide and tall rectangles, one symbol each, never four corners at a point"
category: puzzle
version: "1.0.0"
---
Divide the grid into rectangles, each holding one symbol that says its shape,
so that no four rectangles ever meet at a point.

## What it is

A grid with symbols scattered across it. Every rectangle of the answer
contains exactly one symbol: `+` means the rectangle is a square, `-` that it
is wider than it is tall, and `|` that it is taller than it is wide. The
rectangles cover the whole grid without overlapping, and no point of the grid
may be a corner of four different rectangles at once — like the rule for
laying tatami mats.

## How to play

Draw lines along the grid to cut it into rectangles. Each rectangle must hold
exactly one symbol and have the shape that symbol names. A `+` in a corner
with other symbols close by often has only one square that fits; a `-` or `|`
squeezed between two other symbols can only stretch one way. Cells that only
one symbol can reach belong to it. Whenever three rectangles already meet at
a point, the fourth cell there must join one of them, which settles many
borders. When nothing else works, try a rectangle and see whether some other
symbol is left with nowhere to go.

## Purpose

A partition puzzle like `shikaku`, but the clues say shape instead of size,
and the no-four-corners rule adds a second kind of reasoning about the points
where borders cross. It sits well between the gentle rectangle-cutting of
shikaku and harder region puzzles.

## History

Created by Nikoli, where it first appeared in Puzzle Communication Nikoli; the
name comes from tatami mats, which are traditionally laid so that no four
corners meet.

## This implementation

- **Spec knobs:** `width` and `height` (4–12; 0 picks a size from the
  difficulty — 5x5 for Kids, 6x6 for Easy, 8x8 for Medium, 10x10 for Hard and
  Expert), `difficulty`, `cell`, `line`.
- **Generation:** a random partition laid rectangle by rectangle in reading
  order (sides up to 4, area up to 8, single cells and long strips made
  rarer), backtracking whenever a piece would make four corners meet. One
  symbol goes into each rectangle at a random cell. While the solver cannot
  settle the board, the symbol of a cell's true owner is moved onto a cell the
  solver could not place — always within its own rectangle, so the intended
  answer stays valid — and the move is kept unless it leaves more cells
  unplaced, with a little annealing to escape dead ends. A partition that
  will not settle is replaced by a fresh one.
- **Solving:** every symbol starts with all the rectangles that contain it,
  have its shape and hold no other symbol. A technique ladder strikes them:
  *basic* (cells a symbol surely covers are closed to the others; a cell only
  one symbol can reach belongs to it), *corners* (a rectangle whose corner
  would meet three cells known to belong to three other symbols), and *trial*
  (assume a rectangle, run the cheaper techniques, strike it on a
  contradiction).
- **Guarantees:** deterministic per seed; exactly one solution, since every
  deduction is sound and the ladder settles every symbol — confirmed by an
  independent tiling search (a search that runs out of budget is treated as
  not unique). Rated by the hardest technique needed and the board size:
  Kids and Easy need basic reasoning only, Medium (8x8) and Hard (10x10) need
  the corner rule, and Expert is a 10x10 that needs trial.
