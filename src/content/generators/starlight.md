---
title: "Light and Block"
blurb: "Light and Block — one star and one block per row and column; numbers count the stars lighting a cell"
category: puzzle
version: "1.0.0"
---
One star and one block in every row and column — and the numbers say how
much starlight falls where.

## What it is

A square grid with a few numbers. Place exactly one star and exactly one
block in every row and every column. Each star shines along its row and its
column in both directions until a block or the edge of the grid stops it,
and each number tells you how many stars light its cell.

## How to play

Put one star and one block in every row and in every column. A cell holds a
star, a block or nothing, and numbered cells hold nothing.

- A star lights the cells of its row and its column, in both directions,
  up to the nearest block or the edge of the grid. Numbers do not stop the
  light.
- A number tells you how many stars light its cell: 0, 1 or 2 (one from
  its row and one from its column).

Good places to start: a 2 means both the star of its row and the star of
its column shine on it, with no block in between; a 0 means each of those
stars is either hidden behind a block or is missing from the stretch it
could shine from. Keep track of which columns already have their star and
block — like a sudoku, each row and column needs exactly one of each.

## Purpose

A small, quick placement puzzle that mixes the bookkeeping of a Latin
square (one of each per row and column) with line-of-sight reasoning. It
trains careful scanning along rows and columns and holding two conditions
in mind at once — where the light comes from and what stops it.

## History

The puzzle was invented by the Japanese puzzle author Naoki Inaba, who
published it on his website in 2006 under the name *Raitonanba* (a
Japanese spelling of "light number"). Inaba also made a sister puzzle in
which planets show which of their sides the starlight reaches; both have
large collections of handmade examples online.

## This implementation

- **Spec knobs:** `size` (4–9; 0 picks from the difficulty — 4, 5, 6, 6, 8
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped.
- **Generation:** two random permutations are planted — the star's and the
  block's column in every row, never the same cell. A layout is kept only
  if numbering every empty cell would settle it. Numbers are added — each
  the best of a sample of 12 at leaving the fewest variables unsettled —
  until the deduction ladder settles everything at the band's rung, then
  removed in random order while it still does. When the requested rung
  yields no board, fresh attempts run at the rung above and the band
  reached is printed.
- **Solving:** a ladder on yes/no variables — a star flag and a block flag
  per cell. *Local*: exactly one star and one block per row and column,
  never both in one cell, nothing on a number, and each number's light
  count weighed over every place its row's and column's star and block can
  still go (a placement no combination making the count uses is ruled out;
  one all of them use is fixed). *Trial*: assume a value, propagate, keep
  the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one layout, proven because
  the sound ladder settles every variable (meta `uniqueness_proof`), with a
  capped exhaustive count confirming it when cheap (`count_confirmed`), and
  re-proven in tests by an independent search that places each row's star
  and block in turn and knows only the rules.
  Rated by the hardest rung needed with size as the tie-break (local: Kids
  at 4×4, Easy at 5×5, else Medium; trial: Hard up to 6×6, else Expert).
  There are only two rungs, so the size carries the easier bands. Every
  band is reached at its default size; with a custom `size` the label
  states the band actually reached (for example Kids at 6×6 is Medium,
  Expert below 7×7 is Hard, and at 4×4 and 5×5 an attempt at Hard may only
  find boards the local rung settles, which are labelled Kids or Easy).
