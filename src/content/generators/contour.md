---
title: "Contour"
blurb: "Contour lines — a seeded heightfield's level sets, terrain-map style"
category: design
version: "1.0.0"
---
Topographic level lines: a seeded heightfield cut at evenly spaced levels,
the terrain-map look as pure line art.

## What it is

Where flowfield draws a noise field's *gradient* as streamlines, this draws
its *level sets*: fractal value noise sampled on a grid, marching squares at
each iso-level, segments chained into contour lines — nested closed loops
around the peaks and hollows, open lines running off the page edge.

## The implementation's guarantees

- **Interior contours close, always**: an open contour that dangles mid-page
  is a chaining bug, and the test says so directly. Chaining is by exact
  endpoint equality (marching squares interpolates shared edges to identical
  points), not tolerance fudging.
- **Tiny summit rings are culled, and the cull is reported**: a 4 mm² peak
  ring fails the colourability area floor and survives every level-thinning
  attempt — the same peak just gets re-cut — so closed loops under the floor
  are dropped at compose time and counted in `culled_below_area_floor`.
- The escalation lever is level count (fewer isolines, more white space);
  the noise is self-contained value noise, seeded and octaved, because
  generator crates never share code.
- Rating basis: none — a design. Honesty fields: contour counts (closed vs
  open-at-edge), levels, cull count, attempt.
