---
title: "Truchet Tiles"
blurb: "Truchet tiles — random arc tiles that join into flowing curves"
category: design
version: "1.0.0"
---
One tile, two rotations, dropped across a grid at random — and the arcs join
into endless flowing curves.

## What it is

Every cell holds the same tile: two quarter-circle arcs joining the midpoints
of adjacent edges. Each tile is placed in one of two rotations, chosen at
random. Because the arcs always touch the edges at the same four points, they
join seamlessly across cell borders into long, unbroken curves — loops,
knots and maze-like ribbons that read as one design.

## What to do with it

There is nothing to solve. It is a design: a print in its own right, and a
colouring page — the arcs partition the plane into crisp regions that take
colour beautifully. The `tinted` mode fills the corner quadrants softly to
suggest a two-tone reading.

## Purpose

The generative-art world's most beloved starting point, and a distinct addition
to the design lane: not a periodic tiling like the Islamic patterns, not a
single unicursal path like the labyrinth, but an *aperiodic-feeling* field
assembled from one tile placed at random.

## History

Named for Père Sébastien Truchet, whose 1704 *Mémoire sur les combinaisons*
studied patterns made by a single split-square tile in its four rotations.
Cyril Stanley Smith revived and popularised the smooth quarter-arc form in a
1987 essay, and it has been a pen-plotter and creative-coding staple ever
since.

## This implementation

- **Spec knobs:** `size` (4–24 tiles per side), `cell`, `line` (arc width),
  `tinted` (soft two-tone fill vs. pure line art).
- **Generation:** each tile's rotation is a single seeded coin flip; the arcs
  are exact quarter-circle Béziers meeting the edge midpoints, so they always
  connect across borders.
- **Guarantees:** deterministic per seed; the arcs join continuously by
  construction; every region is closed and colourable. A pure design generator
  — no puzzle, no answer key.
