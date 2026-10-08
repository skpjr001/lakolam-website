---
title: "Knossos"
blurb: "Knossos — divide the grid into regions, each with one number giving its perimeter"
category: puzzle
version: "1.0.0"
---
Wall the grid into rooms, one number in each — and the number is the length
of that room's walls.

## What it is

A square grid with numbers in some cells. Divide the whole grid along its
lines into regions of any shape. Every region holds exactly one number,
and that number is the region's perimeter: how many cell sides its outline
is long. A single cell has perimeter 4, two cells side by side 6, a 2×2
square 8.

## How to play

- Draw lines along the grid to split it into regions. Every cell belongs to
  exactly one region, and the cells of a region join up side by side.
- Each region contains exactly one number.
- The number is the region's perimeter, counted in cell sides all the way
  round its outline. Every perimeter is even.
- There is exactly one way to split the grid.

Good places to start: a 4 is a region of a single cell. A 6 is a domino, so
it takes exactly one neighbour. An 8 is three cells in a row, an L of three,
or a 2×2 square; a 10 has four to six cells. Cells between two numbers must
belong to one of them, and two numbers can never share a region.

## Purpose

A puzzle about shape and outline rather than area: the same number can
belong to a long thin room or a compact one. It trains counting edges,
seeing how a shape's outline grows as cells are added, and the "who else
could reach this cell?" reasoning of region-division puzzles.

## History

Knossos takes its name from the Cretan palace of the Minotaur's labyrinth.
It is one of the region-division genres collected in Otto Janko's large
online archive of logic puzzles, a cousin of Fillomino and Araf, where the
numbers give areas or bounds rather than perimeters.

## This implementation

- **Spec knobs:** `size` (4–10; 0 picks from the difficulty — 5, 5, 7, 8, 9
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4 pt).
  Out-of-range numbers are clamped and the requested value is reported in
  the metadata.
- **Generation:** answer first. A random division into connected regions of
  perimeter at most 10, grown from the first uncovered cell (two to four
  cells mostly, single cells rare). Each region gets one numbered cell at
  random. A local search then either moves a number within its region or
  hands an unnumbered cell to a neighbouring region (keeping both connected
  and within perimeter 10), keeping each change that leaves no more cells
  open under the ladder at the band's rung, until the ladder settles the
  whole grid; trial is only run once few cells are left open. Once a board
  settles, the search goes on looking for one the rung below cannot settle
  alone, keeping the settled board if it finds none. When the requested
  rung yields no grid, the rungs above and then below are tried, and the
  band actually reached is printed.
- **Solving:** a ladder on one yes/no variable per region the numbers allow
  (connected, exactly one number inside, perimeter equal to it). Numbers
  never exceed 10, and a region of perimeter at most 10 has at most six
  cells (its bounding box has width plus height at most 5), so the table of
  candidates is complete. *Cover*: every cell lies in exactly one region.
  *Blocking*: a region that overlaps every region still able to cover some
  other cell would leave that cell uncovered, so it goes. *Trial*: assume a
  value, propagate, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one division, proven
  because the sound ladder settles every variable (meta
  `uniqueness_proof`), with a capped exhaustive count confirming it when
  cheap (`count_confirmed`), and re-proven in tests by an independent search
  that grows regions from the rules alone (fewest-options cell first).
  Rated by the hardest rung needed with size as the tie-break (cover: Kids
  up to 5×5, else Easy; blocking: Easy up to 5×5, Medium up to 7×7, Hard at
  8×8, Expert from 9×9; trial: Hard up to 6×6, else Expert). Trial is rarely
  needed — the blocking rung settles nearly every board — so Hard and Expert
  are mainly larger boards. Every band is reached at its default size; with
  a custom `size` the label states the band actually reached (small boards
  serve Kids or Easy whatever is asked; Kids at 6×6 is Easy, and Kids and
  Easy from 7×7 up need the blocking rung and serve the larger board's
  band; Medium and Hard at 6×6 and 7×7 are Medium).
