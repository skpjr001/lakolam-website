---
title: "Apollonian Gasket"
blurb: "Apollonian gasket — tangent circles packed to infinity"
category: design
version: "1.0.1"
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
  radius are placed on a random diameter (so every seed differs). The two
  circles touching all three come from the complex Descartes formula, each
  candidate centre checked for tangency (the sign of the complex square root
  does not always pair with the sign of the curvature root). After that every
  curvilinear triangle is filled exactly by reflection — the circle across
  from the one already tangent to the triangle's three sides has curvature
  `2(a + b + c) - d`, and curvature × centre likewise — so there is no sign
  to choose and nothing to deduplicate. Triangles are filled largest circle
  first; one whose circle is smaller than `min_fraction` of the radius is
  left, since everything inside it is smaller still.
- **Guarantees:** deterministic per seed; every circle is exactly tangent by
  construction and contained within the outer circle; every gap is filled
  down to `min_fraction` — no empty disc anywhere inside is as large as the
  smallest circle drawn (tested on a grid across seeds and fractions); all
  regions closed and colourable. A pure design generator — no puzzle, no answer key.
- **Versions:** 1.0.1 fixes gaps left unfilled in 1.0.0 (seed `0xa901`: the
  crescent between the outer circle and the two circles on its left stayed
  empty). The old recursion paired the `±` of the curvature root with the `±`
  of the complex centre root, which is wrong for some triangles, so it placed
  circles that did not touch their neighbours and dropped the rest of that
  gap. Default pages change: circles now fill every gap and are drawn
  largest first.
- **Clamps:** `diameter` (200–1200 pt), `line` (0.3–8 pt) and
  `min_fraction` (0.004–0.06) outside their ranges are held to the nearest
  end, and the asked-for value is recorded as `requested_<field>` in meta.
