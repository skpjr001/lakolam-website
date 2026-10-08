---
title: "Gyokuseki"
blurb: "Gyokuseki — one black circle per row and column; edge numbers count the circles seen up to it"
category: puzzle
version: "1.0.0"
---
Hide one black stone in every row and column among white ones — the numbers
round the edge count what you see on the way in.

## What it is

An empty square grid with numbers around its edges. Fill some cells with
white or black circles. Each row and each column holds exactly one black
circle, and any number of white ones. A number outside the grid tells how
many circles you meet looking into the grid from that side, counting up to
and including the black one.

## How to play

- Draw a circle in some of the cells: either white (an outline) or black
  (filled in). Cells may also stay empty.
- Every row and every column contains exactly one black circle. White
  circles may go anywhere, as many as you like.
- A number at the edge of a row or column counts the circles you pass
  looking in from that side — white and black alike — up to and including
  the first black circle. Circles beyond the black one are not counted.
- Empty cells are not counted.
- There is exactly one way to fill the grid.

Good places to start: a 1 means the black circle comes before any white
one, so every cell between the edge and that black circle is empty. A
number as large as the line is long fills the line with circles up to its
black circle at the far end. When a row has numbers on both sides, the
black circle has to suit both counts at once.

## Purpose

A short, tidy deduction about counting and placement. It mixes the "one per
row and column" logic of queens-style puzzles with skyscraper-like edge
counts, and rewards keeping two simple counts in mind at once.

## History

Gyokuseki ("jewel stones") is one of the many genres invented by the
Japanese puzzle author Naoki Inaba, and appears in Otto Janko's online
collection of logic puzzles, where it has a large following.

## This implementation

- **Spec knobs:** `size` (4–9; 0 picks from the difficulty — 5, 6, 6, 6, 7
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4 pt).
  Out-of-range numbers are clamped and the requested value is reported in
  the metadata.
- **Generation:** answer first. A random permutation places the black
  circles and white circles are scattered at a random density (30–50%).
  With every edge number printed, a local search toggles a white circle or
  swaps two rows' black circles, keeping each change that leaves no more
  cells open under the ladder (run without trial at this stage, for speed),
  until the ladder settles the whole board. Edge numbers are then removed
  one at a time in random order, keeping a removal only while the band's
  rung still settles everything. When the requested rung yields no board,
  fresh attempts run at the rungs above and the band actually reached is
  printed.
- **Solving:** a ladder on two yes/no variables per cell, "holds a circle"
  and "holds the black circle". *Single clue*: one black per row and column,
  a black cell holds a circle, and each edge number on its own — some cell
  that could be the black one has, before it, between the sure and the
  possible circles the number asks for (narrowed by probing every variable
  of the line). *Clue pair*: a line's two edge numbers together must agree
  on where its black circle stands. *Trial*: assume a value, propagate, keep
  the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every variable (meta
  `uniqueness_proof`), with a capped exhaustive count confirming it when
  cheap (`count_confirmed`), and re-proven in tests by an independent
  search whose feasibility test is written from the rules alone. Rated by
  the hardest rung needed with size as the tie-break (single clue: Kids up
  to 5×5, else Easy; clue pair: Easy up to 5×5, else Medium; trial: Hard up
  to 6×6, else Expert). Every band is reached at its default size; with a
  custom `size` the label states the band actually reached (Kids from 6×6
  up is Easy; Easy at 4×4 and 5×5 is Kids; Medium up to 5×5 is Easy (now
  and then Kids), and
  from 8×8 up some boards settle at Easy; Expert up to 6×6 is Hard and Hard
  from 7×7 up is Expert; at 5×5 a few Hard boards settle at Easy).
