---
title: "Chocona"
blurb: "Chocona — shade rectangles that never share a side so each outlined region holds its number of shaded cells"
category: puzzle
version: "1.0.0"
---
Break the chocolate bar into neat rectangles — every outlined region says
how many of its squares are dark.

## What it is

A square grid divided by thick lines into regions, some with a number in
the corner. Shade cells so that every patch of shaded cells is a solid
rectangle; each number tells how many shaded cells its region holds.

## How to play

Shade some cells so that:

- every group of shaded cells (cells joined through shared sides) forms a
  solid rectangle — so two rectangles never share a side, though they may
  touch at a corner;
- each region with a number holds exactly that many shaded cells (they need
  not be next to each other, and a rectangle may cross region borders).

Regions without a number may hold any amount. A 0 clears its whole region,
and a number equal to its region's size shades all of it. Any 2×2 square
of the grid holds 0, 1, 2, or 4 shaded cells — never 3, because three
would bend a rectangle into an L. When single regions settle nothing, try
every way to place a region's count and keep what all of them agree on.

## Purpose

A friendly shading puzzle: counting inside regions meets one simple
geometric rule, and every rectangle found pushes its neighbours into
place.

## History

Chocona (チョコナ) is a Nikoli genre; its name comes from "chocolate", whose
bars break into rectangles. It appears in Nikoli's Puzzle Communication and
on puzz.link, and shares its rectangle rule with Choco Banana and Shikaku.

## This implementation

- **Spec knobs:** `size` (4–10; 0 picks from the difficulty — 5, 6, 7, 8,
  10 from Kids to Expert), `difficulty`, `max_region` (largest region in
  cells, 3–7, default 6), `cell`, `line`.
- **Generation:** random rectangles (1–3 cells each way) are dropped where
  they share no side with another; regions grow from cells in seeded order
  to seeded sizes, usually into cells of their own colour. A local search
  then reshades around a cell the counts leave open — a shaded cell loses
  its rectangle, an empty one gains a small one — keeping each change that
  leaves no more cells open (and at least a quarter of the grid shaded);
  when that stalls, the open cell's region is split. Once every count
  together settles the board, counts are erased one at a time in seeded
  order, first while the rung below the ceiling still settles every cell,
  then while the ceiling does.
- **Solving:** shaded/white cells on a ladder of three rungs — *counts and
  blocks* (each count full or empty; no 2×2 block with three shaded cells),
  *region placements* (every way to place a region's count over its open
  cells, checked against the 2×2 blocks around it; a cell with one value in
  all of them settles) and *trial* (assume a cell, propagate the lower
  rungs, keep the opposite on a contradiction).
- **Guarantees:** deterministic per seed; every region connected; exactly
  one shading, proven because the sound ladder settles every cell,
  confirmed by the engine's capped count when it fits its budget, and
  re-proven in tests by an independent search whose final check is the
  rulebook itself (every shaded group fills its bounding box). Rated by the
  hardest rung needed: counts and blocks are Kids up to 5×5 and Easy above;
  region placements are Medium; trial is Hard up to 8×8 and Expert above.
  Every band is reached at its default size; a band a chosen size cannot
  reach in 30 attempts is served at the nearest band found and labelled as
  such.
