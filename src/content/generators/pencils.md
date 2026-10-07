---
title: "Pencils"
blurb: "Pencils — divide the grid into pencils and the lines they draw, each line as long as its pencil"
category: puzzle
version: "1.0.0"
---
Fill the grid with pencils and the lines they draw — every line exactly as
long as the pencil that drew it.

## What it is

A square grid with a few numbers (and, on gentler puzzles, a few pencil
tips already drawn). Divide the whole grid into pencils and lines. A pencil
is a straight row of cells one cell wide — its shaft — with a sharpened tip
in the next cell at one end. From the tip, the pencil has drawn a line
through the centres of neighbouring cells, exactly as many cells long as
the shaft.

## How to play

1. Draw pencils along the grid lines. A shaft is a straight strip one cell
   wide, one or more cells long. Its tip takes one more cell, straight on at
   one end of the shaft.
2. From each tip, draw a line through the centres of neighbouring cells (up,
   down, left or right). The line covers as many cells as the shaft is long,
   not counting the tip.
3. Lines never cross, branch, join another line or run through a pencil.
4. A number always sits in a shaft and tells its length. A shaft may hold
   several numbers (all the same) or none.
5. A tip drawn in the grid is the tip of a pencil, pointing away from its
   shaft.
6. Every cell is used: by a shaft, a tip or a line.

Start from the numbers: a 1 is a shaft of one cell, so its tip is a
neighbour and its line just one more cell. Corners and edges leave few ways
for a pencil to fit. A pencil with its line always takes an odd number of
cells, at least three, so an area walled off from the rest must hold
pencils and lines that fill it exactly.

## Purpose

A tiling puzzle with a story — every piece is a pencil that has just drawn
its own line. It mixes the shape logic of region-division puzzles with the
path logic of line puzzles, and rewards checking how many cells a corner or
narrow corridor can hold.

## History

Pencils was introduced by the Japanese publisher Nikoli in Puzzle
Communication Nikoli volume 158 (2017) and has since appeared in Nikoli's
magazines and on online puzzle collections such as puzz.link and Otto
Janko's site, where it is called Bleistifte.

## This implementation

- **Spec knobs:** `size` (5–8; 0 picks from the difficulty — 5, 6, 6, 7, 8
  from Kids to Expert), `difficulty`, `cell` (24–90 pt), `line` (0.2–4 pt).
  Out-of-range numbers are clamped and the value asked for is reported in
  meta (`requested_size`, `requested_cell`, `requested_line`).
- **Generation:** every possible pencil-with-line on the board is listed (a
  straight shaft and tip, then every self-avoiding line of the same length
  from the tip), and a random exact cover of the board by them is planted,
  with shafts of up to three cells (two on numbers-only 8×8 boards: longer
  lines can be rerouted through the same cells, which no clue can rule
  out). Each pencil gets one number (plus every tip on bands that show
  tips); while a second solution exists, a clue the planted answer has and
  the other lacks is added; clues are then dropped in random order (tips
  first) while the answer stays the only one.
- **Solving:** an exhaustive exact-cover search over the listed pencils
  (always branching on the cell with the fewest pencils left), capped at 2
  with a node budget; a spent budget is ambiguous, never unique.
- **Guarantees:** deterministic per seed; exactly one answer (`unique`),
  re-proven in tests by an independent search that grows pencils and lines
  cell by cell without the list, and checked against the rules
  (`follows_rules`). Rated by board size and whether tips are shown
  (`rating_basis: grid_size_and_given_tips`): a given tip fixes a pencil's
  direction outright, so numbers alone are one band harder — tips: 5×5
  Kids, 6×6 Easy, 7×7 Medium, 8×8 Hard; numbers only: 5×5 Easy, 6×6 Medium,
  7×7 Hard, 8×8 Expert. Kids and Easy show tips, the other bands numbers
  only. With a custom `size` the label states the band actually reached
  (`requested_difficulty` records the request); when a numbers-only board
  cannot be made, tips are allowed and the band drops accordingly.
