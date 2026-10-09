---
title: "Isometric Grid Paper"
blurb: "Isometric grid paper — vertical and 30° lines forming exact equilateral triangles, 5 mm to ½ inch"
category: paper
version: "1.0.0"
---
Isometric drawing paper at exact size — vertical lines and lines at 30°
forming equilateral triangles, 5 mm to ½ inch on a side.

## What it is

A sheet ruled with three families of lines: vertical lines, and lines
rising at 30° to the left and to the right. They cross to tile the page
with equilateral triangles, and they are exactly the three axes of an
isometric drawing — height straight up, width and depth each at 30° from
the horizontal, all three at the same scale. Triangle sides come in 5, 7
and 10 mm, ¼ inch and ½ inch, in light blue, grey, dark grey, light green
or another ink.

(Triangular grid paper is the same pattern turned a quarter turn, with
horizontal lines; isometric paper keeps the verticals, because verticals
stay vertical in an isometric drawing.)

## How to use it

Print the page at actual size: in the print dialog choose "Actual size" or
"100%", never "Fit to page", so each triangle side measures what it says.

To draw a box, pick a point and draw its front vertical edge along a
vertical line. From the top and bottom of that edge, follow the 30° lines
to the left for the depth and to the right for the width, counting
triangle sides as units. Close the shape with more verticals and 30°
lines, then ink the visible edges. Circles become ellipses on this paper,
and lines that run along none of the three directions are not to scale —
measure only along the grid.

## Purpose

The standard sketching sheet of technical drawing and design and
technology classes, used for isometric views of parts and assemblies,
3D sketches of furniture and products, cube-stacking exercises in maths,
pixel-art and game-level mockups, and isometric lettering. In a book,
isometric sections make a 3D-drawing practice book.

## History

Drawings in parallel projection are old — Chinese scroll painting used
them for centuries — but the rules of isometric drawing were first set
out by William Farish, a Cambridge professor, in his paper "On
Isometrical Perspective" (Transactions of the Cambridge Philosophical
Society, 1822). He used it to show how the models in his lectures went
together. Its three axes 120° apart — one vertical, two at 30° to the
horizontal — made it a working tool for engineers from the mid-19th
century, and printed isometric grids followed for sketching it quickly.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `spacing` — the triangle
  side (mm5, mm7, mm10, quarter_inch, half_inch; default mm10); `ink`
  (one of the named paper colours; default light_blue); `weight` in points
  (0.1–2, default 0.3; the reference site offers 0.3, 0.5 and 1).
- **Generation:** vertical lines sit one triangle height (side × √3/2)
  apart and the lattice points every half side down them, alternate
  columns offset by half a side — as many whole columns and half-rows as
  fit, never stretched, centred in the content box. That fixes the grid
  region, a rectangle whose sides are lattice columns and half-rows; the
  30° and 150° diagonals through the lattice points are clipped exactly to
  it, and a line that would only touch a corner is left out. All lines are
  one path.
- **Solving:** nothing to solve — a page to draw on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** the lattice is exact — every triangle is equilateral
  with the chosen side, and the three families meet at every lattice point
  (checked on every page size, orientation, spacing, weight and margin);
  every diagonal is at exactly ±30° and ends on the region's edge; the
  region is centred; and all ink, stroke widths included, stays inside the
  margins. A knob outside its range is clamped and the request recorded as
  `requested_<field>` in the meta.
