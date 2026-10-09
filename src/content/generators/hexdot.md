---
title: "Hexagonal Dot Paper"
blurb: "Hexagonal dot paper — dots at the corners of an exact honeycomb, 5-15 mm or ¼-½ inch sides, flat or pointy top"
category: paper
version: "1.0.0"
---
Dots at the corners of a honeycomb — join them to draw hexagons, hex maps
and chemical rings without a printed grid in the way.

## What it is

A sheet of dots placed exactly where the corners of a tiling of regular
hexagons would be. Each dot has three neighbours one side away, at 120° to
each other, so joining neighbours draws the honeycomb. The hexagons can
stand with a flat edge on top or a corner on top, with sides from 5 to 15
mm or ¼ and ½ inch. Turn on centre dots and each hexagon's centre is marked
too, with a smaller, lighter dot: joining centres to corners then draws the
triangles, diamonds and six-pointed stars that fit the same grid.

## How to use it

Print the page at actual size ("Actual size" or "100%" in the print dialog)
so the sides keep their true length.

Join any dot to its three nearest neighbours to draw hexagon edges. Draw
only the hexagons you need: a game map, a molecule, a beehive, a quilt
block. With centre dots on, join a centre to two neighbouring corners for a
triangle, to opposite corners for a diamond, or connect alternate corners of
a hexagon for a star. Because only dots are printed, your drawing stays
clean, and unused dots fade into the background.

## Purpose

For board-game and role-playing maps, organic chemistry rings, honeycomb and
tile designs, English paper piecing and quilt planning, and geometry
lessons on hexagons, symmetry and tessellation. In a book, hexagonal dot
sections make a sketchbook for game designers, chemistry students and
pattern makers.

## History

The regular hexagon is one of only three regular polygons that tile the
plane, which is why it appears in honeycombs, floor tiles and patchwork.
Kekulé's ring structure for benzene, proposed in 1865, made the hexagon the
everyday shape of organic chemistry, and hexagon grids have been the usual
map for board wargames since the 1960s. Printed dot papers — square,
isometric and hexagonal — are the lighter cousins of graph paper, sold for
sketching because the dots guide the pen without dominating the page.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `side` (mm5, mm6, mm7, mm8,
  mm10, mm12, mm15, quarter_inch, half_inch); `orientation` (flat_top,
  pointy_top); `dot_size` (small 0.3 mm, medium 0.5 mm, large 0.8 mm);
  `ink`; `centre_dots`.
- **Generation:** every point is a node of the triangular lattice whose
  spacing is the hexagon's side; of each three nodes, one is a hexagon
  centre and two are corners (node `(i, k)` is a centre when `i − k` is a
  multiple of 3). A hexagon centre sits at the middle of the content box
  and every lattice node inside the box (less the dot's radius) is drawn:
  corners as full dots, centres (if asked) at 60% size in a lighter tint.
- **Solving:** nothing to solve — a page to draw on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** the geometry is exact — every corner's nearest dot is
  exactly one side away, inner corners have exactly three corner and three
  centre neighbours at that distance, and each inner centre has exactly six
  corners around it (all checked in the tests) — and every dot, disc
  included, lies inside the margins on every page size and orientation. A
  margin outside its range is clamped and recorded as `requested_margin_mm`.
