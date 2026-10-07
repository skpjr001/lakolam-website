---
title: "Paintarea"
blurb: "Paintarea — shade whole regions; numbers count shaded neighbours, the shading connects, no 2x2 of one colour"
category: puzzle
version: "1.0.0"
---
Paint whole rooms: every region is all shaded or all white, the paint flows
in one piece, and no 2×2 patch is all one colour.

## What it is

A square grid divided by thick lines into small regions, with numbers in
some cells. Shade some of the regions — always a whole region at a time —
so that every number counts the shaded cells directly next to it, the
shaded cells form one connected area, and no 2×2 block of cells is entirely
shaded or entirely white.

## How to play

Decide for every region whether to shade it or leave it white. A region is
always shaded or left white as a whole.

- A number tells you how many of the cells directly above, below, left and
  right of it are shaded. The numbered cell itself may be shaded or white.
- All shaded cells must join into one area, cell to cell through shared
  sides (corners do not count).
- No 2×2 block of cells may be all shaded, and none may be all white.

Good places to start: a 0 leaves every region touching it white, and a 4
shades every region touching it. A region whose shading would complete an
all-shaded 2×2 block must stay white; one whose whiteness would leave an
all-white block must be shaded. Then keep the shaded area connected: a
white region can cut the shading in two.

## Purpose

A shading puzzle that blends three familiar ideas — counting neighbours,
painting whole tiles and keeping one connected area — into a calm, quick
solve. It trains careful local counting and the habit of checking a rule
everywhere at once, and the finished grid looks like a little abstract
painting.

## History

Paintarea comes from Japan, where it appeared in the pencil-puzzle
magazines (its Japanese name is *Peintoeria*, a sound-spelling of "paint
area"); it is thought to have been first published in Nikoli's Puzzle
Communication. It is popular on online puzzle sites and large collections
of handmade examples, and borrows its no-2×2 rule from Nurikabe-style
shading puzzles.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8, 9
  from Kids to Expert), `difficulty`, `max_region` (largest region, 2–6
  cells), `cell` (14–100 pt), `line` (0.2–4 pt). Out-of-range numbers are
  clamped.
- **Generation:** a shading is planted first: a connected shaded group grows
  from a random cell, each step shading a neighbouring cell that completes
  no all-shaded 2×2 block and breaks as many all-white blocks as it can,
  until none is left. Each colour is then cut into small connected regions
  (mostly 2 to `max_region` cells). Numbers are added — each the best of a
  sample of 12 at leaving the fewest cells unsettled — until the deduction
  ladder settles every cell at the band's rung, then removed in random
  order while it still does. When the requested rung yields no board,
  fresh attempts run at the rungs above and the band reached is printed.
- **Solving:** a ladder on one yes/no variable per cell. *Local*: a region
  takes one value, each number counts its neighbours, and no 2×2 block is
  one colour. *Connectivity*: cells the shaded area can no longer reach
  stay white, and a cell whose loss would split it is shaded. *Trial*:
  assume a value, propagate, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one shading, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it when cheap
  (`count_confirmed`), and re-proven in tests by an independent search over
  one variable per region that knows only the rules. Rated by the hardest
  rung needed with size as the tie-break (local: Kids at 5×5, else Easy;
  connectivity: Easy at 5×5, else Medium; trial: Hard up to 8×8, else
  Expert). Every band is reached at its default size; with a custom `size`
  the label states the band actually reached (Kids above 5×5 is Easy;
  Medium at 5×5 is Easy; Expert below 9×9 is Hard and Hard from 9×9 up is
  Expert).
