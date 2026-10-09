---
title: "Hanare"
blurb: "Hanare — one number per region, its size; numbers that meet along a line are as many empty cells apart as they differ"
category: puzzle
version: "1.0.0"
---
One number in every region, telling its size — and numbers that meet along
a line keep exactly their difference apart.

## What it is

A square grid divided into outlined regions, with a few numbers already
written in. Each region gets exactly one number, and that number is the
count of its cells. The numbers have to keep their distance: looking along
a row or a column, two numbers with no other number between them have as
many empty cells between them as their difference.

## How to play

- Write one number in exactly one cell of every region. The number is the
  size of the region (a region of 4 cells gets a 4).
- Look along each row and each column. When two numbers follow each other
  with no number between them, the number of empty cells between them must
  equal the difference of the two numbers.
- So a 3 and a 5 that follow each other have exactly 2 empty cells between
  them, and two equal numbers that follow each other must touch.
- There is exactly one solution.

Good places to start: a region of one cell holds a 1 in its only cell.
Next to a printed number, check each cell of a neighbouring region: if the
gap to the printed number is wrong and nothing could stand between them,
that cell is not the one. Two big regions side by side with very different
sizes need their numbers far apart.

## Purpose

A spatial logic puzzle with almost no arithmetic: only counting cells and
taking one small difference. It trains careful scanning along lines and
"what if" reasoning, and the finished grid looks satisfyingly spread out —
hanare is Japanese for "apart".

## History

Hanare is a Nikoli genre from Japan, published in *Puzzle Communication
Nikoli*. Otto Janko's online collection has over a hundred of them, from
6×6 up to 16×16.

## This implementation

- **Spec knobs:** `size` (5–12; 0 picks from the difficulty — 5, 6, 8, 8,
  10 from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4
  pt). Out-of-range numbers are clamped and the requested value is
  reported in the metadata.
- **Generation:** answer first, regions and numbers together. A
  backtracking carver takes the first open cell in reading order, grows a
  random region from it towards a size goal of one to nine (mostly two to
  five), and puts the number in one of its cells, provided every number it
  meets along a row or column across finished cells sits the right
  distance away; dead ends back up within a node budget. Every number then
  starts printed and is removed in random order while the ladder still
  settles the grid at the band's rung; a grid that keeps more than about
  half its numbers printed is carved again.
- **Solving:** a ladder on one yes/no variable per cell ("this cell holds
  its region's number"). *Pairs*: exactly one number per region, and two
  cells of a line whose gap differs from the difference of their regions'
  sizes cannot both hold numbers with only empty cells between them (and
  if one cell between is still open, it must hold a number). *Whole line*:
  every way to place numbers along a row or column with each neighbouring
  pair the right distance apart. *Trial*: assume a value, follow the
  consequences, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it when cheap
  (`count_confirmed`), and re-proven in tests by an independent search that
  settles regions most-constrained first and shares no code with the
  ladder. Rated by the hardest rung needed with size as the tie-break
  (pairs: Kids at 5×5, Easy up to 7×7, Medium up to 10×10, else Hard; whole
  line: Easy at 5×5, Medium up to 7×7, Hard up to 10×10, else Expert;
  trial: Hard at 5×5, else Expert). Every band is served at its default
  size; with a custom `size` the label states the band reached.
