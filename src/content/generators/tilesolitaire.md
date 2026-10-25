---
title: "Tile Solitaire"
blurb: "Tile Solitaire — remove free matching pairs from a stacked layout until it is clear"
category: puzzle
version: "1.0.1"
---
Take matching pairs of free tiles off a stacked layout until nothing is left.

## What it is

Tiles stacked in layers into a shape: a small block, a pyramid, a bridge, a
fortress or the classic turtle of 144 tiles. A tile is free when no tile
lies on top of it and it can slide out to the left or to the right. Two free
tiles with the same picture come off together. Every layout dealt here can
be cleared completely, and the answer key shows one way, layer by layer.

## How to play

Look for two free tiles with the same picture and remove them. A tile is
free when nothing covers it, even partly, and its left side or its right
side is open (no tile touching it there). Any flower pairs with any other
flower, and any season with any other season; every other tile needs its
exact twin. Keep removing pairs until the layout is empty.

Think before you take: when three or four tiles of a picture are free,
choose the pair that unblocks the most — the ends of long rows and the
tiles that cover others. A pair taken carelessly can bury the last two
tiles of a picture under each other.

## Purpose

A relaxing solitaire that trains visual search and planning ahead. The
small layouts teach the "free tile" rule; the turtle is the full classic
challenge.

## History

The patience game of removing pairs from a stacked layout of tiles became a
computer classic in 1981 and spread widely through home computers in the
late 1980s. The turtle (or "dragon") layout of 144 tiles is the
traditional set-up; countless layouts followed.

## This implementation

- **Spec knobs:** `difficulty`; `layout` (`kids` 28 tiles, `pyramid` 56,
  `bridge` 74, `fortress` 94, `turtle` 144; null = the band's); `style`
  (`colour` or `ink`); `tile` (width in points). The tiles are our own
  vector designs: dots, sticks, numbers, winds, gems, flowers and seasons —
  no characters outside the Latin alphabet and digits.
- **Generation:** reverse placement. Positions are filled two at a time,
  each pair on positions that are free on the layout as built so far:
  a tile goes down only on tiles already placed, and the placed tiles of
  each row stay one unbroken run (a gap between two runs could never be
  filled with a free tile). Removing the pairs in the reverse order
  therefore clears the layout. Faces are then dealt to the pairs — the full
  144-tile set for the turtle, an even spread of pictures otherwise.
- **Solving:** since four equal tiles (or any flowers, any seasons) can pair
  up differently from the placement, every deal is proved clearable again by
  a forward depth-first search with memo over the remaining tiles (the
  shared state-search crate, 40,000 expansions, higher tiles first); a deal
  it cannot settle is redrawn. Sixteen seeded random playouts measure how
  often careless play gets stuck (`dead_end_rate`; usually above one half for the
  bridge, fortress and turtle).
- **Rating:** by tile count, which the layout fixes (≤ 30 Kids, ≤ 60 Easy,
  ≤ 80 Medium, ≤ 100 Hard, more Expert; `rating_basis: "tiles"`). A chosen
  layout sets the band; a different requested band is reported as
  `requested_difficulty`.
- **Guarantees:** deterministic per seed. `clearable: true`, proved by the
  forward search, and the answer key's order is replayed by the rules before
  the page is returned (`answers_checked`). The page draws the layers
  stacked, each raised by one tile edge with a shadow; covered tiles are
  hidden, as on a real table. The key lays every layer out on its own with
  each tile's removal step.
