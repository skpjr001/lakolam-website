---
title: "Tile Paint"
blurb: "Tile Paint — shade whole tiles so every row and column holds its printed number of shaded cells"
category: puzzle
version: "1.0.0"
---
Paint whole tiles, never half of one, until every row and column adds up.

## What it is

A square grid cut by thick lines into small tiles of one to a few cells.
Numbers above the columns and to the left of the rows say how many cells of
that line are shaded. Each tile is either completely shaded or completely
white.

## How to play

Shade some of the tiles so that:

- every tile is shaded entirely or left entirely white;
- each number to the left of a row gives how many shaded cells that row
  holds, and each number above a column how many that column holds.

Lines without a number may hold any amount. Count a tile by the cells it
has *in that line*: a three-cell tile lying along a row adds three to the
row but only one to each column it crosses. A 0 clears every tile it
touches; a number as large as its line shades it all. A tile with more
cells in a line than that line still needs must stay white, and a tile the
line cannot do without must be shaded. When single tiles settle nothing,
weigh the ways the open tiles of a line can add up to what it still needs.

## Purpose

Arithmetic and logic together: each line is a small sum to make from
tiles of different sizes, and every tile painted changes the sums of all
the lines it crosses.

## History

Tile Paint (タイルペイント) was published by Nikoli in 1995 and is still in
its puzzle books. Conceptis sells the same rules as Cross-a-Pix, where the
finished shading draws a picture, in magazines and apps around the world.

## This implementation

- **Spec knobs:** `size` (4–12; 0 picks from the difficulty — 5, 6, 8, 10,
  12 from Kids to Expert), `difficulty`, `max_tile` (largest tile in cells,
  2–6, default 4), `cell`, `line`.
- **Generation:** a random tiling grows tiles from cells in seeded order to
  seeded sizes up to `max_tile`; tiles are shaded at random (40–60 %). With
  every total printed, any tile the ladder still leaves open is merged into
  a same-coloured neighbour (within `max_tile`) or has its colour flipped,
  until the totals settle every tile. Totals are then erased one at a time,
  in seeded order, while the ladder still settles every tile at the
  requested rung.
- **Solving:** one yes/no variable per tile; each total is a weighted count
  (a tile weighs its cells in that line). Three rungs — *line bounds* (one
  tile at a time: too big for what is left → white, needed to reach the
  total → shaded), *line sums* (every subset of the open tiles that makes
  up the rest is weighed with a subset-sum table; a tile in all of them or
  none settles) and *trial* (assume a tile, propagate the lower rungs, keep
  the opposite on a contradiction).
- **Guarantees:** deterministic per seed; every tile shaded whole; exactly
  one shading, proven because the sound ladder settles every tile,
  confirmed by the engine's capped count when it fits its budget, and
  re-proven in tests by an independent search that counts the totals cell
  by cell. Rated by the hardest rung needed (Kids/Easy: line bounds, Kids
  up to 5×5; Medium: line sums; Hard: trial; Expert: trial on 11×11 and
  larger). Every band is reached at its default size; a band a chosen size
  cannot reach (Kids on 12×12, say) is served at the nearest rung found and
  labelled as such.
