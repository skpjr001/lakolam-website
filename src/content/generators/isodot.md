---
title: "Isometric Dot Paper"
blurb: "Isometric dot paper — dots on an exact triangular lattice, 5 mm to ½ inch, for 3D sketching"
category: paper
version: "1.0.0"
---
Dots on an exact triangular lattice — every dot with six neighbours the
same distance away — for isometric sketches without printed lines.

## What it is

A sheet of dots arranged so that each dot sits at the corner of
equilateral triangles: every dot has six nearest neighbours, all exactly
one spacing away, in directions 60° apart. Joining dots gives the
vertical and 30° lines of an isometric drawing, and only the lines you
draw appear on the page. Spacings are 5, 7 and 10 mm, ¼ inch and ½ inch,
with small, medium or large dots in any ink.

The dots can run in vertical columns (the usual layout for isometric
drawing, where verticals stay vertical) or be turned a quarter turn into
horizontal rows, for triangle and hexagon work.

## How to use it

Print the page at actual size: in the print dialog choose "Actual size" or
"100%", never "Fit to page", so dots are exactly the chosen spacing apart.

For a cube, join a dot to the dot straight below it for the front edge,
then join each end to the next dot up-left and up-right along the 30°
directions; complete the faces the same way. Count dot-to-dot steps as
units so every edge is to scale. Stack cubes to draw building-block
models from a plan, or join dots in horizontal rows to draw triangles,
hexagons and tessellations.

## Purpose

A favourite of maths classrooms for drawing cube structures, nets and
3D shapes, and of artists and designers who want an isometric guide that
vanishes from the finished drawing: product sketches, room layouts,
isometric pixel art and game maps. In a book, isometric dot sections make a
3D-drawing practice book that photocopies cleanly.

## History

The lattice is the corner points of the equilateral-triangle tiling, one
of the three regular tilings of the plane. Its use for drawing follows
isometric projection, whose rules William Farish set out at Cambridge in
"On Isometrical Perspective" (1822): three axes 120° apart, one vertical
and two at 30° to the horizontal. Dotted versions of isometric paper
became a staple of school mathematics for drawing solids made of cubes.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `spacing` — the distance
  between neighbouring dots (mm5, mm7, mm10, quarter_inch, half_inch;
  default mm10); `dot_size` (small 0.3 mm, medium 0.5 mm, large 0.8 mm);
  `ink` (one of the named paper colours; default light_gray);
  `orientation` (vertical columns, default, or horizontal rows).
- **Generation:** lines of dots sit one triangle height (spacing × √3/2)
  apart and the dots along them a whole spacing apart, alternate lines
  offset by half a spacing — as many as fit, never stretched, centred in
  the content box less one dot radius. Every dot is a filled disc of the
  exact diameter, all in one path.
- **Solving:** nothing to solve — a page to draw on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** the lattice is exact — no two dots closer than the
  spacing, and every interior dot has exactly six neighbours at the
  spacing in directions 60° apart (30°, 90°, 150° … for vertical, 0°, 60°,
  120° … for horizontal), checked on every page size, orientation and
  spacing; the lattice is centred; and every dot, its whole disc, lies
  inside the margins. A margin outside its range is clamped and the
  request recorded as `requested_margin_mm` in the meta.
