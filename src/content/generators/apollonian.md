---
title: "Apollonian Gasket"
blurb: "Apollonian gasket — tangent circles packed to infinity"
category: design
version: "1.0.0"
---
Circles inside circles, tangent all the way down. Start with three touching
circles and fill every gap with the circle that fits it, forever.

## What it is

Three mutually tangent circles leave a curved-triangle gap between them.
Exactly one circle fits snugly in that gap, tangent to all three — and it
creates three new, smaller gaps, each of which gets its own circle. Repeated,
this packs the plane with infinitely many tangent circles: the Apollonian
gasket.

## What to do with it

There is nothing to solve. It is a design — a striking math-art print, and a
colouring page whose nested circles take colour by depth beautifully. The
`tinted` mode shades the circles by generation.

## Purpose

A deterministic tangency fractal, distinct from the design lane's other work:
`lako-packing` relaxes random discs into place, but the gasket is exact — every
circle computed from a theorem — with its unmistakable circle-in-a-curved-
triangle cascade.

## History

Named for Apollonius of Perga (c. 200 BC), who studied tangent circles; the
recursive packing and its curvatures are governed by Descartes' Circle
Theorem (1643), whose complex form also fixes each circle's centre. The
gasket's fractal dimension (~1.3057) has been a subject of modern research.

## This implementation

- **Spec knobs:** `diameter`, `min_fraction` (smallest circle drawn, as a
  fraction of the radius — smaller packs more), `line`, `tinted`.
- **Generation:** two mutually tangent circles whose radii sum to the outer
  radius are placed on a random diameter (so every seed differs), then the gaps
  are filled breadth-first using the complex Descartes formula; each circle is
  kept only if it is new, large enough, and strictly inside the boundary.
- **Guarantees:** deterministic per seed; every circle is exactly tangent by
  construction and contained within the outer circle; all regions closed and
  colourable. A pure design generator — no puzzle, no answer key.
