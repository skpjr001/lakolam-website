---
title: "Irasuto"
blurb: "Irasuto — colour the grid so every number counts the cells of its own colour it can see"
category: puzzle
version: "1.0.0"
---
Colour every cell black or white — each number counts the cells of its own
colour it can see.

## What it is

A square grid with some numbered cells, each already black or white. The
solver colours every other cell. A number counts how many cells of its own
colour it sees looking up, down, left and right; each look stops at a cell
of the other colour, at another numbered cell, or at the edge of the grid.
Unlike most shading puzzles there is no rule about the shape of the black
or the white areas: the numbers alone decide everything.

## How to play

- Colour every empty cell black or white.
- Numbered cells keep the colour they are printed in: a number on black is
  a black cell, a number on white is a white cell.
- A number tells how many cells of its own colour it can see in the four
  straight directions together. A look stops at the first cell of the
  other colour, at the next numbered cell, or at the edge. The numbered
  cell itself does not count.
- There is exactly one way to colour the grid.

Good places to start: a 0 means every cell next to it (that is not a
number) has the other colour. A number as big as all the cells it could
possibly see means every one of them is its colour. When stuck, suppose a
cell is one colour and follow the counts until one breaks.

## Purpose

Counting along straight lines in two colours at once: every cell you fill
is seen by numbers of both colours, which makes each decision ripple
further than in a one-colour puzzle. It trains careful bookkeeping and
reasoning by contradiction.

## History

Irasuto ("illustration") was devised by the Japanese puzzle author Naoki
Inaba around 2002, one of his many logic genres. Otto Janko's online
archive carries a collection of them.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8,
  10 from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped and the requested value is
  reported in the metadata.
- **Generation:** answer first. A random colouring in small patches (each
  cell copies a neighbour two times in five, so long runs make big
  numbers) starts with every cell numbered, which pins every cell. Numbers
  are then removed in a seeded order while the band's rung of the ladder
  still settles every cell; each removal lengthens the looks of the
  numbers around it, so every number is recomputed against the cells
  still numbered.
- **Solving:** a ladder on one yes/no variable per cell ("black").
  *Sight*: each number on its own — the cells it surely sees and the cells
  it could still see bound its count, and a colour that would break the
  bounds is ruled out. *Trial*: assume a colour, propagate, keep the
  opposite on a contradiction. Kids and Easy are built at the sight rung,
  Medium and above at the trial rung.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it (`count_confirmed`), and
  re-proven in tests by an independent search whose feasibility test is
  written from the rules alone. The band is the hardest rung the solve
  needed and the board's size (meta `rating_basis`): sight alone is Kids
  at 5×5, Easy above; trial is Easy up to 6×6, Medium at 7×7, Hard at 8×8
  and Expert from 9×9. With a custom `size` the band of that size and rung
  is served, and the request is reported beside it.
