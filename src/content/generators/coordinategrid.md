---
title: "Coordinate Grid"
blurb: "Coordinate grid paper — x and y axes on an exact square grid, four quadrants or quadrant I, numbered"
category: paper
version: "1.0.0"
---
Graph paper with x and y axes ready drawn — four quadrants or quadrant I,
numbered, with arrowheads, on an exact square grid.

## What it is

A square grid with two heavier lines, the x axis and the y axis, crossing at
the origin. The axes always run along grid lines, so every grid crossing is
a point with whole-number coordinates. Two layouts:

- **Four quadrants** — the axes cross in the middle of the sheet, for
  graphs with negative as well as positive values.
- **Quadrant I** — the axes meet in the bottom-left corner, for data that
  is never negative: measurements, bar charts, distance–time graphs.

The squares come in 3 mm, 5 mm, 10 mm and ¼ inch. A heavier line every 5
or 10 squares makes counting quick, and the axes can be numbered — in
whole squares from the origin, at every heavy line (or every square when
the squares are big) — with arrowheads and the letters x and y at their
ends.

## How to use it

Print at actual size ("Actual size" or "100%" in the print dialog) so the
squares stay square.

To plot a point such as (3, −2), start at the origin where the axes cross,
count 3 squares right along the x axis, then 2 squares down, and mark the
crossing. Plot several points from a table of values and join them to draw
a line or curve. If your numbers are bigger than the axes show, let each
square stand for 2, 5 or 10 units and write your own scale beside the
printed one. Use quadrant I paper when every value is positive and you
want the whole sheet for them.

## Purpose

The working paper of school algebra and coordinate geometry: plotting
points, graphing linear and quadratic functions, transformations
(reflections, rotations, translations), solving simultaneous equations by
drawing, and science graphs from experiments. Teachers print class sets so
every student starts from the same axes; in a book, coordinate sheets make
a graphing workbook or a maths notebook section.

## History

Plotting a point by two distances from a pair of axes goes back to René
Descartes's *La Géométrie* (1637) and Pierre de Fermat's work of the same
years, which joined algebra and geometry — hence "Cartesian" coordinates.
Pre-ruled squared paper for drawing such graphs became an ordinary school
and office supply in the late 19th and early 20th centuries, and printed
axes followed so that classes could skip the ruler work and get straight to
the graph.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `spacing` (mm3, mm5, mm10,
  quarter_inch); `axes` (centre for four quadrants, bottom_left for
  quadrant I); `major_every` (0–20 squares, 0 for none, default 5);
  `grid_ink` (default light blue) and `axis_ink` (default charcoal), any of
  the named paper colours; `weight` of the grid lines in points (0.1–2; the
  axes are drawn at 2.5× that, between 0.75 and 3 pt); `numbers`,
  `arrows` and `letters` switch the axis numbers, arrowheads and x/y on or
  off.
- **Generation:** the grid is pinned to the origin — lines at
  `origin + k × spacing` — so the axes always fall on grid lines. For four
  quadrants the origin is the centre of the content box and the grid is
  symmetric about it; for quadrant I the grid is whole squares, centred,
  with room left below and to the left for the numbers. Numbers count
  squares from the origin; the step is every square when a number fits
  (with clearance from its neighbours and from the first number on the
  other axis), otherwise a divisor or multiple of `major_every` (1, 2, 5,
  10 … squares without majors). Every number and letter sits on a small
  white knockout so grid lines never run through it, and a number that
  would touch an arrowhead, a letter or another number is left out.
- **Solving:** nothing to solve — a page to plot on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** the spacing is exact (every gap equals the chosen square
  side, to 1e-9 pt), the origin lies exactly on a grid line both ways, the
  grid and every stroke lie inside the margins, and no two numbers or
  letters (with their knockouts) overlap — all checked on every page size,
  orientation, spacing, axis layout and major setting. A knob outside its
  range is clamped and the request recorded as `requested_<field>` in the
  meta.
