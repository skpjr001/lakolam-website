---
title: "Juosan"
blurb: "Juosan — a bar in every cell; region numbers count one kind, and bars never stack three across"
category: puzzle
version: "1.0.0"
---
Put a bar in every cell, upright or lying down — the numbers count one kind,
and no bar may pile up three deep across its length.

## What it is

A square grid divided into regions by thick lines, some regions holding a
number. Every cell gets either a vertical bar (|) or a horizontal bar (—).
A region's number says how many bars of one kind it holds — either kind.
Horizontal bars may line up side by side as far as they like but never
stack more than two high; vertical bars may line up one above another but
never stand more than two side by side.

## How to play

- Draw a vertical (|) or a horizontal (—) bar in every cell.
- A number in a region tells how many of the region's bars are of one kind:
  either that many are vertical, or that many are horizontal. It does not
  say which.
- Horizontal bars may run along a row for any length, but no column may
  hold three horizontal bars one above another.
- Vertical bars may run down a column for any length, but no row may hold
  three vertical bars side by side.
- Regions without a number can hold any mix.
- There is exactly one way to fill the grid.

Good places to start: a number equal to the region's size means all its
bars are the same kind — and in a strip three cells tall that kind must be
vertical, in a strip three cells wide it must be horizontal. Two horizontal
bars stacked force a vertical bar above and below them; two vertical bars
side by side force horizontal bars at both ends. When stuck, suppose a bar
one way and follow it until something breaks.

## Purpose

A puzzle of pure pattern logic with almost no counting. The "either kind"
numbers make every clue a little two-way choice, so it rewards keeping two
possibilities in mind and testing one against the stacking rule — a gentle
introduction to reasoning by contradiction.

## History

Juosan (縦横さん, "Mr Vertical-Horizontal") is a pencil-puzzle genre from the
Japanese publisher Nikoli, which lists it among its current puzzles. Otto
Janko's online archive carries a collection of them.

## This implementation

- **Spec knobs:** `size` (4–10; 0 picks from the difficulty — 4, 5, 6, 7, 9
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4 pt).
  Out-of-range numbers are clamped and the requested value is reported in
  the metadata.
- **Generation:** answer first. The grid is divided into rectangles of at
  most six cells — mostly straight strips of two to four cells and 2×2
  blocks, the shapes that make the stacking rule bite. Bars are filled in
  by a depth-first fill that keeps the stacking rule, leaning each region
  to one kind and completing open pairs, so that numbers come out
  informative. With every region numbered, a local search flips bars,
  switches which kind a region counts, and splits or merges rectangles
  (two cells that could swap their bars inside one region cannot once a
  wall parts them), keeping each change that leaves no more cells open,
  until the ladder settles the grid. Numbers are then removed in random
  order while the ladder still settles everything.
- **Solving:** a ladder on one yes/no variable per cell ("vertical").
  *Local*: no three vertical bars side by side, no three horizontal bars
  stacked, and each number on its own — either count fits, narrowed by
  trying every filling of its region. *Trial*: assume a bar, propagate,
  keep the opposite on a contradiction. Each number allows two counts, so
  the local rung alone almost never settles a grid; every board is built
  at the trial rung (as published Juosan puzzles need, too).
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it when cheap
  (`count_confirmed`), and re-proven in tests by an independent search
  whose feasibility test is written from the rules alone. Because every
  board needs the trial rung, the band follows the board's size (meta
  `rating_basis`: Kids at 4×4, Easy at 5×5, Medium at 6×6, Hard at 7×7 and
  8×8, Expert from 9×9; a board the local rung settles alone would be Kids
  up to 6×6, else Easy). With a custom `size` the band of that size is
  served whatever is asked, and the request is reported beside it.
