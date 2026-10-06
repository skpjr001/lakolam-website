---
title: "Five Cells"
blurb: "Five Cells — divide the grid into regions of five, each number counting the borders around its cell"
category: puzzle
version: "1.0.0"
---
Cut the grid into fives — the numbers count the walls.

## What it is

A grid with some numbers in it. The whole grid divides into regions of
exactly five cells each (any shape, as long as the cells are joined along
edges), and a number tells how many of its cell's four sides are region
borders. There is exactly one way to divide the grid. Smaller versions use
regions of three or four cells instead.

## How to play

Draw lines along the grid to divide every cell into regions of five cells
(or the size printed with the puzzle). The rules:

- every region has exactly five cells, joined along edges;
- a number tells how many of the four sides of its cell are borders - lines
  between two regions, or the outer edge of the grid;
- cells without numbers can have any number of borders.

A 3 has only one side open, so its cell is the end of a region. A 0 can't
happen (a cell would be a region on its own), and a corner cell always has
at least two borders already. Look for numbers near the edge first, and
keep counting the cells left in each pocket - a pocket must hold a whole
number of regions.

## Purpose

A region-dividing puzzle that works from the walls inward: every clue is
about the lines around one cell, and the size rule turns those few lines
into whole regions. It trains spatial reasoning and steady counting.

## History

Five Cells was published by the Japanese puzzle publisher Nikoli in the
puzzle magazine Puzzle Communication Nikoli. The same rules, with regions
of any chosen size, appear as Palisade in Simon Tatham's Portable Puzzle
Collection.

## This implementation

- **Spec knobs:** `size` (cells per region, 3–5; default 5), `rows`, `cols`
  (3–11; 0 picks from the difficulty — for size 5: 5×5, 5×8, 7×10, 8×10,
  10×10 from Kids to Expert; the area is kept a multiple of the region
  size by moving to the nearest column count, then row count),
  `difficulty`, `cell`, `line`.
- **Generation:** a random tiling by connected regions of `size` cells — a
  backtracking cover at the first open cell, placements shuffled, pockets
  whose size is not a multiple of `size` cut off at once. Every cell starts
  with its number. Even all of them can leave a choice (two stretches cut
  differently with the same border counts), so a local search re-cuts the
  regions around a cell the deduction ladder leaves open, keeping each new
  cut that leaves no more cells open, until the full set of numbers
  settles the grid. Numbers are then removed in a seeded order while the
  ladder, capped at the requested rung, still divides the whole grid (for
  Expert, while an exhaustive count with a 20,000-node budget still finds
  one division).
- **Solving:** the candidates are every connected set of `size` cells whose
  numbers all count their borders correctly. *Forced* (Easy): a cell only
  one candidate can still cover takes it, striking every overlapping
  candidate. *Look one step* (Medium): a candidate is struck if placing it
  would leave some open cell with no candidate at all. *Pairs* (Hard):
  where a cell has two candidates left, each is tried and struck if the
  lower rungs then reach a contradiction. Grids the ladder cannot finish
  are proven by search alone (Expert).
- **Guarantees:** deterministic per seed; exactly one division, proven by an
  exact-cover search (branching on the cell with the fewest candidates)
  that counts to a cap of 2 and treats an exhausted node budget as
  ambiguous. Tests re-check every rule region by region and recount on
  smaller boards with an independent search that grows regions through
  every connected set and counts borders from coordinates. Rated by the
  hardest rung needed (forced: Kids for grids of 30 cells or fewer, else
  Easy; look-one-step Medium; pairs Hard; search-only Expert). If a band is
  not reached in eight attempts the nearest band found is returned and
  labelled (`requested_difficulty` in meta); at the default sizes every
  band is reached for every region size.
