---
title: "Four Winds"
blurb: "Four Winds — straight lines out of the numbers cover every empty cell once; each number totals its lines"
category: puzzle
version: "1.0.0"
---
Blow lines out of the numbers, north, south, east and west, until every
empty cell is covered exactly once.

## What it is

A square grid with some black cells, each holding a number. From every
black cell, straight lines run out along its row and column — up to four of
them, one per direction. Every white cell must be covered by exactly one
line, and each number is the total count of white cells its lines cover.

## How to play

Draw straight lines out of the black cells, horizontally and vertically,
through the centres of white cells.

- Every white cell is covered by exactly one line.
- A line starts at the side of a black cell and runs straight; it never
  passes through or into another black cell, and lines never cross or
  overlap.
- The number in a black cell is the total number of white cells covered by
  all the lines that start there. A black cell may use any of its four
  directions, or none of them.

Good places to start: a white cell that only one number can see must
belong to that number. A number whose lines can reach only exactly as many
cells as it needs takes them all. And when a number's other directions
cannot reach far, the remaining direction has to stretch a long way.

## Purpose

A clean, quick covering puzzle: every cell has a home and every number
adds up. It trains adding and subtracting small numbers, and the habit of
asking "who can reach this cell?" that underlies many grid puzzles.

## History

Four Winds is an old championship puzzle, sometimes called Eminent Domain
or Line Game. Its earliest known appearance is at the World Puzzle
Championship of 1995 in Brașov, Romania, and it has appeared at the
championship many times since, including on hexagonal grids. Large
collections of handmade examples are published online.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8, 9
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped.
- **Generation:** black cells are scattered at a random density of 8–16 %.
  The uncovered white cell that the fewest lines can still reach is then
  covered by one of them, chosen at random and stretched all the way to it,
  until every white cell is covered; a cell no line can reach turns black,
  and a black cell left with nothing takes over the end of a neighbouring
  line. Every number is printed. While the deduction ladder leaves cells
  open at the band's rung, one open cell turns black, taking over the far
  end of the line it sat in — which only adds information — until the
  ladder settles everything. When the requested rung yields no board,
  fresh attempts run at the rung above and the band reached is printed.
- **Solving:** a ladder on yes/no variables — one per white cell and
  direction ("covered from the black cell that way"). *Local*: every white
  cell covered once, lines unbroken, and each number counts its cells (all
  of them when exactly enough remain, none more once it is full). *Arm
  lengths*: each arm is at least the number minus what the other arms can
  reach at most, and at most the number minus what they already hold.
  *Trial*: assume a value, propagate, keep the opposite on a
  contradiction.
- **Guarantees:** deterministic per seed; every white cell covered once and
  every number at least 1; exactly one covering, proven because the sound
  ladder settles every variable (meta `uniqueness_proof`), with a capped
  exhaustive count confirming it when cheap (`count_confirmed`), and
  re-proven in tests by an independent search that gives each number in
  turn four arm lengths adding up to it. Rated by the hardest rung needed
  with size as the tie-break (local: Kids at 5×5, else Easy; arm lengths:
  Easy at 5×5, Medium at 6×6 and 7×7, Hard at 8×8, Expert above; trial:
  Hard up to 7×7, else Expert). The arm-length rung settles almost every
  board, so trial is rare and the Hard and Expert bands are carried mostly
  by size. Every band is reached at its default size; with a custom `size`
  the label states the band actually reached (for example Kids above 5×5 is
  Easy, Medium at 9×9 and 10×10 is served Easy, and Hard below 8×8 is often
  Medium).
