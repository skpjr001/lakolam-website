---
title: "Tasquare"
blurb: "Tasquare — shade squares that never touch; each boxed number totals the squares beside it"
category: puzzle
version: "1.0.0"
---
Shade solid squares around the boxed numbers — each box tells you how much
square area touches it.

## What it is

A square grid with some boxed cells. Shade cells so that every group of
shaded cells is a solid square (1×1, 2×2, 3×3…). Squares may meet at a
corner but never share a side. A number in a box is the total area of the
squares touching that box along a side; a box with a question mark touches
at least one square. All the white cells must link up into one area.

## How to play

- Shade some cells. Every group of shaded cells joined side by side must
  be a solid square: one cell, a 2×2 block, a 3×3 block, and so on.
- Two squares may touch at a corner, but never along a side.
- Boxed cells are never shaded.
- A number in a box is the total number of shaded cells in the squares
  that touch the box along a side. A 5, for example, can be a 2×2 square
  and a single cell on another side.
- A box with a ? touches at least one square, of any size.
- All the unshaded cells (boxes included) must connect to each other
  through sides — no white area may be cut off.

Good places to start: a 1 is touched by a single shaded cell; a box beside
the edge or between other boxes has few sides to use. Around a placed
square, every cell touching its sides stays white. If shading a cell would
wall off part of the white area, it stays white.

## Purpose

A shading puzzle about area and space: it practises recognising square
numbers and splitting a total into squares, while keeping the white cells
connected trains looking at the whole board.

## History

Tasquare (*Tasukuea*, from "tasu", to add, and "square") is a Japanese
pencil puzzle. It is on the puzz.link puzzle site and Otto Janko's online
collection holds a few hundred of them.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8, 9
  from Kids to Expert), `difficulty`, `unknowns` (0–60: the share of boxes
  printed as ?, as many as the board can take while staying solvable at its
  band), `cell` (18–90 pt), `line` (0.2–4 pt). Out-of-range numbers are
  clamped and the requested value is reported in the metadata.
- **Generation:** random squares (mostly 1×1 and 2×2, some 3×3 on larger
  boards) are planted so that none touch along a side and the white cells
  stay connected, until about a quarter of the board is shaded. Boxes are
  then added on white cells beside the squares — each the best of a sample
  of ten at leaving the fewest variables unsettled — until the deduction
  ladder settles everything at the band's rung, removed in random order
  while it still does, and finally some numbers are turned into ? while it
  still does. When the requested rung yields no board, fresh attempts run
  at the rungs above and the band actually reached is printed.
- **Solving:** a ladder on yes/no variables — one per cell (shaded) and one
  per possible square on the board (placed). *Local*: a placed square
  shades its cells and clears the cells along its sides; a shaded cell
  lies in exactly one placed square; boxes stay white; each number is a
  subset sum over the areas of the squares that could touch it; a ? keeps
  one shaded neighbour. *Connect*: the white cells hang together (cells cut
  off are shaded, a cell whose shading would split the white area stays
  white). *Trial*: assume a value, propagate, keep the opposite on a
  contradiction.
- **Guarantees:** deterministic per seed; exactly one shading, proven
  because the sound ladder settles every variable (meta
  `uniqueness_proof`), with a capped exhaustive count confirming it when
  cheap (`count_confirmed`), and re-proven in tests by an independent
  search over the cells alone that knows only the rules. Rated by the
  hardest rung needed with size as the tie-break (local: Kids at 5×5, else
  Easy; connect: Easy up to 6×6, else Medium; trial: Hard up to 8×8, else
  Expert). Every band is reached at its default size; with a custom `size`
  the label states the band actually reached.
