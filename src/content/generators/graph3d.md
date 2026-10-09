---
title: "3D Coordinate Paper"
blurb: "3D coordinate paper — x, y, z axes in isometric, cabinet or cavalier projection, ticked and numbered, over a grid"
category: paper
version: "1.0.0"
---
Three-dimensional axes ready to plot on: x, y and z in isometric, cabinet or
cavalier projection, ticked and numbered over an isometric grid.

## What it is

A sheet printed with the x, y and z axes of three-dimensional space, drawn
the way maths and engineering books draw them:

- **Isometric** — the three axes 120° apart, z straight up, x and y 30°
  below the horizontal, the same scale on all three.
- **Cabinet** — an oblique view: y across, z up and x receding at 30°, 45°
  or 60°, drawn at half scale so a cube still looks like a cube.
- **Cavalier** — the same oblique view with x at full scale.

Each axis is ticked and numbered at every unit (every second or fifth when
the units are small), ends in an arrowhead and its letter, and can carry on
past the origin as a dashed or solid negative half. Behind the axes there
can be an isometric dot grid or line grid whose points are exactly the
whole-number points, the three coordinate-plane grids (xy, yz and xz) over
the first octant, or nothing at all. One to four sets fit on a sheet.

## How to use it

Print the page at actual size. To plot the point (2, 3, 4), start at the
origin, go 2 units along x, then 3 units in the direction of y, then 4
units up, parallel to z, and mark the point; dotted guide lines back to the
axes make the picture easier to read. On the isometric grid every
whole-number point is a dot or a crossing, so boxes, staircases and solids
of unit cubes can be drawn straight along the grid. Use the plane grids to
sketch a plane by its traces, or a surface by its cross-sections. In the
cabinet view remember that one step along x is drawn half as long as a
step along y or z.

## Purpose

Multivariable calculus, vectors and solid geometry homework: plotting
points and vectors, sketching planes, lines and surfaces, and drawing
solids for volume problems. Technical drawing classes use the isometric and
oblique views to practise pictorial sketches of parts and blocks.

## History

Coordinates in three dimensions follow from Descartes' geometry of 1637,
and their use in solid geometry was worked out over the following century.
Isometric drawing was set out as a method by William Farish of Cambridge in
his 1822 paper "On Isometrical Perspective", written for drawing machinery;
it became a standard of engineering drawing. Oblique drawing is older
still: by the usual account the cavalier view takes its name from the
raised gun platforms of fortification drawings, and the cabinet view,
which halves the receding depth, from its use by furniture makers.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `projection` (isometric,
  cabinet, cavalier); `receding_angle` (deg30, deg45, deg60 — oblique
  projections only); `background` (dots, lines, planes, none); `sets` (1–4);
  `unit_mm` (one unit along y and z, 4–25 mm, default 10); `ticks` (units
  per half axis, 0–20, 0 = as many as fit, up to 10); `negative_axes`
  (none, dashed, solid); `grid_ink` (default light blue) and `axis_ink`
  (default charcoal); `weight` in points (0.1–2); `numbers`, `letters` and
  `arrows` (all on by default).
- **Generation:** the content box is split into one cell per set (along the
  longer side; four make a 2 × 2 block). The axes, ticks, arrowheads,
  letters and numbers are laid out about the origin with exact ink boxes,
  the most ticks that fit the cell are found (or the number asked for, when
  it fits — otherwise the request is recorded as `requested_ticks`), and
  the set is centred in its cell. A unit too large for even one tick in the
  cell is shrunk and recorded as `requested_unit_mm`. The isometric dots
  and lines are the projected whole-number points of the floor and the
  three line families through them; in the oblique projections the dot and
  line backgrounds are the true-size square grid of the upright yz plane.
  The plane grids cover 0 to the last tick on each pair of axes. A number
  that would touch another label or cross an axis is left out.
- **Solving:** nothing to solve — a page to plot on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** the axes point exactly the projection's way (isometric:
  120° apart at equal scale; oblique: y across and z up at the unit, x at
  the receding angle at half or full scale); every tick lies a whole
  number of units from the origin; every isometric dot is a projected
  whole-number point and three grid lines cross at every tick; all ink
  stays inside the set's cell and the margins, every set keeps its three
  axis letters, and no two labels touch (checked on every page size,
  orientation, projection and background). A knob outside its range is
  clamped and the request recorded as `requested_<field>` in the meta.
