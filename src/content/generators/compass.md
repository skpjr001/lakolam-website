---
title: "Compass"
blurb: "Compass — divide the grid into regions, one compass each; its numbers count the region's cells to the north, east, south and west"
category: puzzle
version: "1.0.0"
---
Split the grid into regions, one compass each — and the compass tells you
how far its region reaches north, east, south and west.

## What it is

A square grid with a few compass cells, each crossed corner to corner and
showing up to four numbers: one at the top, one at the right, one at the
bottom and one at the left. Divide the grid into regions, every region
holding exactly one compass. A compass's top number is how many cells of
its region lie above the compass's row; the right number, how many lie to
the right of its column; and so on round.

## How to play

1. Draw lines along the grid to divide it into regions. Every cell belongs
   to exactly one region, and the cells of a region join up side by side.
2. Each region contains exactly one compass.
3. The number at the top of a compass counts the cells of its region in all
   the rows above it (in any column). The bottom number counts the rows
   below, the left number the columns to the left, the right number the
   columns to the right.
4. A missing number can be anything. A compass may be a region all by
   itself.

Start with the zeros: a 0 at the top means its region has nothing above
it. A region reaching three rows up needs at least three cells up there,
so a small number keeps its region close by. A cell next to only one
compass that can still reach it must belong to that compass.

## Purpose

A region-division puzzle with an unusual clue: not the size of a region but
how it spreads out. It trains thinking in whole half-planes rather than
single lines, and balancing several compasses that compete for the same
cells.

## History

Compass was invented by the German puzzle author Silke Berendes and first
appeared at the German Logic Masters championship in 2013. It has since
been used in several World Puzzle Championships (2014, 2016, 2017 as
Simple Compass, and 2019) and is playable on the puzz.link collection.

## This implementation

- **Spec knobs:** `size` (5–8; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `difficulty`, `region` (average region size 3–9; 0
  picks 5 — larger means fewer, bigger regions), `cell` (24–90 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped and the value asked for is
  reported in meta (`requested_size`, `requested_region`, …).
- **Generation:** random seed cells grow into a random division (smaller
  regions grow first, loosely, to keep sizes even); each region gets a
  compass on a random cell showing all four numbers, and a division is kept
  only when the deduction ladder settles it. Numbers are then hidden in
  random order while the ladder still settles the board at the
  connectivity rung; for the Hard and Expert bands a few more are then
  tried at the trial rung.
- **Solving:** a ladder on yes/no variables "cell belongs to this compass's
  region". *Local*: every cell in exactly one region; each shown number an
  exact count over the cells beyond the compass; a cell `d` rows (or
  columns) beyond a compass whose number there is less than `d` is out of
  its region. *Connectivity*: each region is one connected group (cells it
  can no longer reach leave it; a cell whose loss would cut it joins it).
  *Trial*: assume, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one division, proven
  because the sound ladder settles every variable (`uniqueness_proof`),
  confirmed by a capped count when cheap (`count_confirmed`), and re-proven
  in tests by an independent count over the rules alone. Rated by the
  hardest rung needed with size as the tie-break (local: Kids at 5×5, else
  Easy; connectivity: Easy up to 6×6, else Medium; trial: Hard up to 7×7,
  else Expert). Every band is reached at its default size. With a custom
  `size` the label states the band actually reached (`requested_difficulty`
  records the request); on 8×8 the gentle bands are sometimes out of reach
  — the connectivity rung does not settle every division there — and a
  harder board is served and labelled as such.
