---
title: "Nawabari"
blurb: "Nawabari — divide the grid into rectangles, each with one number counting its cell's borders"
category: puzzle
version: "1.0.0"
---
Split the grid into rectangles, one number in each — and the number counts
how many of its own cell's sides are walls.

## What it is

A square grid with numbers in some cells. Divide the whole grid along its
lines into rectangles (squares count too). Every rectangle holds exactly
one number, and that number tells how many of the four sides of its cell
are rectangle borders. The outer edge of the grid counts as a border.

## How to play

- Draw lines along the grid to split it into rectangles. Every cell belongs
  to exactly one rectangle.
- Each rectangle contains exactly one number.
- A number counts how many of the four sides of its own cell lie on the
  border of its rectangle — the outer edge of the grid included. A 4 is a
  rectangle of a single cell; a 0 sits in the middle of a rectangle at least
  three cells wide and three tall.
- There is exactly one way to split the grid.

Good places to start: a 4 is a one-cell rectangle, so draw its four sides at
once. A 3 is the end of a strip one cell wide. A number on the outer edge
already has that side as a border. Between two numbers in one row or column
there must be a border somewhere, since no rectangle holds two.

## Purpose

A spatial-reasoning puzzle about rectangles, edges and corners. Reading each
number as "how much of this cell is wall" trains a different way of seeing
shapes from the usual "how big is it" of area puzzles, with no arithmetic
beyond counting to four.

## History

Nawabari ("territory") is a Japanese pencil puzzle published by Nikoli, the
publisher behind Sudoku's popularity, and collected in Otto Janko's online
archive of logic puzzles. It is a cousin of Shikaku, which also divides a
grid into rectangles but clues their areas instead.

## This implementation

- **Spec knobs:** `size` (4–10; 0 picks from the difficulty — 5, 6, 7, 8, 9
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4 pt).
  Out-of-range numbers are clamped and the requested value is reported in
  the metadata.
- **Generation:** answer first. A random division into rectangles (at most
  4 cells on a side and 8 cells in all, single cells rare), grown from the
  first uncovered cell, which is always a new rectangle's top-left corner.
  Each rectangle gets one numbered cell at random; a local search then moves
  numbers within their rectangles, keeping each move that leaves no more
  cells open under the ladder at the band's rung (trial is only run once
  few cells are left open), until the ladder settles the whole grid. Aiming
  at the trial rung, a settled board is kept but the search goes on looking
  for one the blocking rung cannot settle alone. When the requested rung
  yields no grid, the rungs above and then below are tried, and the band
  actually reached is printed.
- **Solving:** a ladder on one yes/no variable per rectangle the numbers
  allow (exactly one number inside, counting its cell's sides on the
  rectangle's border). *Cover*: every cell lies in exactly one rectangle.
  *Blocking*: a rectangle that overlaps every rectangle still able to cover
  some other cell would leave that cell uncovered, so it goes. *Trial*:
  assume a value, propagate, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one division, proven
  because the sound ladder settles every variable (meta
  `uniqueness_proof`), with a capped exhaustive count confirming it when
  cheap (`count_confirmed`), and re-proven in tests by an independent search
  that builds rectangles from the rules alone (fewest-options cell first).
  Rated by the hardest rung needed with size as the tie-break (cover: Kids
  up to 5×5, else Easy; blocking: Easy up to 5×5, Medium up to 7×7, Hard at
  8×8, Expert from 9×9; trial: Hard up to 6×6, else Expert). Trial is rarely
  needed in this genre — the blocking rung settles nearly every board — so
  Hard and Expert are mainly larger boards. Every band is reached at its
  default size; with a custom `size` the label states the band actually
  reached (small boards serve Kids or Easy whatever is asked; Kids and Easy
  from 8×8 up usually need the blocking rung and serve Hard or Expert;
  Medium and Hard at 6×6 and 7×7 are Medium).
