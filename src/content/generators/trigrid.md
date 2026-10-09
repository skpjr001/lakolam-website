---
title: "Triangular Grid Paper"
blurb: "Triangular grid paper — rows of exact equilateral triangles, 5 mm to 20 mm, ¼ or ½ inch"
category: paper
version: "1.0.0"
---
Rows of equilateral triangles at exact size — horizontal lines crossed by
60° lines, 5 mm to 20 mm or ¼ and ½ inch on a side.

## What it is

A sheet ruled with horizontal lines one triangle height apart, crossed by
two families of lines at 60° and 120°. Together they tile the page with
equilateral triangles in horizontal rows, alternately pointing up and
down. Six triangles meet at every crossing and make a hexagon, so the
same sheet holds triangles, rhombuses, trapezoids and hexagons. Sides
come in 5, 7, 10, 15 and 20 mm, ¼ inch and ½ inch, in grey, light blue,
dark grey, light green or another ink.

(Isometric paper is the same pattern turned a quarter turn, with vertical
lines, for 3D drawing; triangular paper keeps the horizontals, for flat
geometry and patterns.)

## How to use it

Print the page at actual size: in the print dialog choose "Actual size" or
"100%", never "Fit to page", so each triangle side measures what it says.

Shade triangles to design tessellations, quilt blocks and mosaics; outline
groups of triangles to find shapes with the same area; draw angles of 60°
and 120° without a protractor. Join six triangles round a crossing for a
hexagon, two for a rhombus, three for a trapezoid. Large sizes suit young
children colouring patterns; small sizes suit detailed designs.

## Purpose

A classroom sheet for geometry, symmetry, fractions of shapes and
tessellation, and a design sheet for quilters (60° triangle and diamond
patchwork), tilers, knitters and pattern artists. In a book, triangular
sections make a pattern-design or geometry-activity book.

## History

The tiling of the plane by equilateral triangles is one of the three
regular tilings — with squares and hexagons — and has decorated floors,
textiles and screens since antiquity. Johannes Kepler set out the regular
and semiregular tilings systematically in Harmonices Mundi (1619). As
printed paper, triangular grids sit alongside square and hexagonal grids
in mathematics teaching, where they carry tessellation, area and angle
exercises.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `spacing` — the triangle
  side (mm5, mm7, mm10, mm15, mm20, quarter_inch, half_inch; default
  mm10); `ink` (one of the named paper colours; default gray); `weight` in
  points (0.1–2, default 0.3; the reference site offers 0.3, 0.5 and 1).
- **Generation:** horizontal lines sit one triangle height (side × √3/2)
  apart and the lattice points every half side along them, alternate rows
  offset by half a side — as many whole rows and half-columns as fit,
  never stretched, centred in the content box. That fixes the grid region,
  a rectangle whose sides are lattice rows and half-columns; the 60° and
  120° lines through the lattice points are clipped exactly to it, and a
  line that would only touch a corner is left out. All lines are one path.
- **Solving:** nothing to solve — a page to draw on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** the lattice is exact — every triangle is equilateral
  with the chosen side, and the three families meet at every lattice point
  (checked on every page size, orientation, spacing, weight and margin);
  every slanted line is at exactly 60° or 120° and ends on the region's
  edge; the region is centred; and all ink, stroke widths included, stays
  inside the margins. A knob outside its range is clamped and the request
  recorded as `requested_<field>` in the meta.
