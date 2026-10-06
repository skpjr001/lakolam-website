---
title: "Truchet Tiles"
blurb: "Truchet tiles — random arc tiles that join into flowing curves"
category: design
version: "1.1.0"
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

The **multi-scale** style is a print rather than a colouring page: tiles of
several sizes, big ones beside clusters of small ones, filled in two
colours. The bands flow from large tiles into small ones without a break,
and the colours swap at each change of size, so the whole page reads as one
black-and-white (or grey-and-white) field of loops, rings and ribbons.

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
since. Christopher Carlson's multi-scale Truchet patterns (Bridges 2018)
added "winged" tiles that mix sizes in one pattern.

## This implementation

- **Spec knobs:** `size` (4–24 tiles per side), `cell`, `line` (arc width),
  `tinted` (soft two-tone fill vs. pure line art; in the multi-scale style,
  grey ink instead of black), `style` (`classic`, the default, or
  `multiscale`), and for `multiscale` only: `levels` (1–4 tile sizes, each
  half the last; default 3) and `split_prob` (0–1, the chance a tile splits
  into four; default 0.4). `levels` and `split_prob` do not affect the
  classic page.
- **Generation:** each tile's rotation is a single seeded coin flip; the arcs
  are exact quarter-circle Béziers meeting the edge midpoints, so they always
  connect across borders.
- **Multi-scale generation** (after Carlson's winged tiles): each of the
  `size × size` top tiles splits into four with chance `split_prob`,
  recursively down to `levels`; the quadtree is then refined until edge
  neighbours differ by at most one level. The tile is the thick-band Smith
  tile — ink quarter-annuli of radii s/3 to 2s/3 about two opposite corners
  (rotation a seeded coin flip per leaf), so every edge reads ground, ink,
  ground in thirds — plus a *wing*: a ground disc of radius s/3 on each
  corner, overhanging the neighbours. Odd levels swap ink and ground. Where
  one tile meets two half-size tiles, the small tiles' wings (inverted, so
  ink, radius s/6) land exactly on the two stretches of the big edge whose
  colour would not match. Leaves are painted coarse to fine, one ground path
  and one ink path per level, clipped to the grid. Meta: `style`, `levels`,
  `tiles_per_level`, `split_prob`, `two_coloured`.
- **Guarantees:** deterministic per seed; the arcs join continuously by
  construction; every region is closed and colourable. A pure design generator
  — no puzzle, no answer key. Multi-scale pages use exactly two paints, and
  the tests rasterise pages at 144 dpi and sample every interior seam
  between leaves: wherever the colour is steady along a seam it is the same
  on both sides, at every scale change (and the same check finds hundreds of
  breaks when the wings are left out). The quadtree tests confirm the leaves
  tile the grid exactly and edge neighbours differ by at most one level.
