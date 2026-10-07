---
title: "Dosun-Fuwari"
blurb: "Dosun-Fuwari — one balloon and one iron ball in every region: balloons float up, iron balls sink"
category: puzzle
version: "1.0.0"
---
Balloons float up, iron balls sink down — fit one of each into every
region.

## What it is

A square grid divided by thick lines into regions, with a few black cells
that belong to no region. Each region must hold exactly one balloon and
exactly one iron ball. Balloons are light and rise until something stops
them; iron balls are heavy and drop until something holds them up. The
region shapes are the only clues.

## How to play

Draw a balloon (a white circle) in one cell of every region and an iron
ball (a black circle) in another cell of the same region. All other cells
stay empty.

- A balloon must sit in the top row, directly under a black cell, or
  directly under another balloon.
- An iron ball must sit in the bottom row, directly on top of a black cell,
  or directly on top of another iron ball.
- A cell holds at most one thing, and every region holds exactly one
  balloon and one iron ball.

Good places to start: list where each region's balloon could rest — its
cells in the top row or just under a black cell — and where its ball could
rest. A region with only one resting place for its balloon is solved at
once. A balloon lower down needs a whole column of balloons above it, one
per region, right up to the ceiling or a black cell; if two of those cells
are in the same region, the balloon cannot be there.

## Purpose

A gentle logic puzzle with a picture built in: it trains reading shapes,
thinking about columns and a little cause and effect — what a balloon
needs above it, what a ball needs below it. The balloons and weights make
it a friendly first puzzle for children as well.

## History

Dosun-Fuwari is a Nikoli puzzle, first published in the 2010s. Its name
imitates sounds in Japanese: *dosun* is the thud of something heavy
landing and *fuwari* the soft drift of something light floating up.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8,
  10 from Kids to Expert), `difficulty`, `cell` (14–100 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped.
- **Generation:** a solvable start is planted. About one cell in eight is
  black; every vertical run of white cells gets a balloon in its top cell
  and a ball in its bottom cell (a one-cell run takes one or the other,
  half each way). One region grows from each balloon — randomly, smallest
  first, each taking at most one ball; a region still without a ball then
  reaches the nearest free one along a path of free cells, and one that
  cannot is dissolved together with a spare ball. A local search then
  changes the layout — moving a cell to a neighbouring region, blackening
  a white cell (up to a sixth of the grid) or whitening a black one, every
  region staying connected — and keeps a change unless the ladder
  contradicts or leaves more cells open (with an occasional worse step to
  escape a plateau), until the ladder settles every cell; the answer is
  whatever it settles to. It then wanders among settled layouts that keep
  the regions at least as wide and the black cells few, so the regions
  lose the planted shape.
- **Solving:** two yes/no variables per cell (balloon here, ball here).
  The ladder: *Regions and chains* — one balloon and one ball per region,
  never both in a cell, a balloon needs balloons all the way up to the
  ceiling or a black cell, each in a different region (a ball likewise
  downwards); *Trial* — assume a cell's content, propagate, keep the
  opposite on a contradiction. Rated by the hardest rung needed, size as
  tie-break: the local rules alone are Kids at 5×5, Easy at 6×6, Medium at
  7×7 and Hard from 8×8; trial is Hard up to 7×7 and Expert above.
  **Expert is not reached:** the reshaping search almost never finds a
  layout that needs trial, so every band is generated at the local rung
  and an Expert request is served as a 10×10 board, honestly rated Hard.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every cell and confirmed by a capped
  exhaustive count (cap 2; a spent budget discards the board); re-proven in
  tests by an independent search that knows only the rules. Every region
  is connected and holds one balloon and one ball, each resting legally.
  Meta records `unique`, `difficulty`, `requested_difficulty`,
  `rating_basis`, `hardest_technique`, the grid, regions and black cells.
