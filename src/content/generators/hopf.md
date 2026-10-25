---
title: "Hopf Fibration"
blurb: "The Hopf fibration: circles of the 3-sphere over curves on the 2-sphere, projected into space as linked rings and nested tori"
category: design
version: "1.0.0"
---
Hundreds of interlocking rings, every one perfectly round and every pair
linked exactly once: the 3-sphere unwound into circles.

## What it is

Heinz Hopf discovered in 1931 that the 3-sphere — the round sphere one
dimension up — is made entirely of circles. Above every point of the
ordinary sphere there is one whole circle; no two circles touch, and any
two of them are linked like the rings of a chain. Projected into ordinary
space, the circles above a line of latitude weave a torus (a doughnut made
of tilted "Villarceau" circles), the circles above several latitudes nest
one torus inside the next, the circles above a small circle form a tube,
and the circles above a spiral sweep a twisted funnel.

## How to use it

A print for a study wall or a maths classroom. Follow a single ribbon all
the way round: it is a circle, however much the perspective squashes it.
Then pick any two ribbons and follow them through their crossings — one
always passes through the other exactly once. Where a ribbon is broken, it
passes behind. The small globe in the corner shows the points the circles
come from, in the same colours: rings of points become nested tori, small
loops of points become linked tubes.

## Purpose

A design-lane page from topology: an exact picture of a famous object
that is usually only shown in animation, drawn as a woven, coloured
ribbon diagram that reads in print.

## History

Hopf introduced the map in "Über die Abbildungen der dreidimensionalen
Sphäre auf die Kugelfläche" (Mathematische Annalen 104, 1931), the first
map from a sphere to a lower-dimensional sphere that cannot be undone
continuously. Yvon Villarceau had described the tilted circles on a torus
in 1848. The fibration is now the standard example of a fibre bundle and
appears in physics as the magnetic monopole and the Bloch sphere of a
qubit. The well-known coloured pictures are by Niles Johnson ("Hopf
Fibration — Fibers and Base", 2011) and the film *Dimensions* by Jos Leys,
Étienne Ghys and Aurélien Alvarez (2008). See also David W. Lyons, "An
Elementary Introduction to the Hopf Fibration", Mathematics Magazine 76
(2003).

## This implementation

- **Spec knobs:** `base` (auto, tori, spiral, circles, scatter — scatter
  draws half as many rings and is never an automatic pick), `fibres`
  (6–240 circles), `ribbon` (width in points), `gaps` (break the far
  ribbon at crossings), `inset` (the globe of base points), `palette`
  (auto, spectrum, night, pastel, ink), `caption`, `width`, `height`,
  `margin`.
- **Generation:** base points are laid out along the chosen curve in a
  frame on the 2-sphere; the fibre over `(a, b, c)` is
  `q(t) = (√((1+c)/2)·e^{it}, (a+ib)/√(2(1+c))·e^{it})`, sampled at 144
  points. A seeded rotation `x ↦ l·x·r̄` of the 3-sphere (two unit
  quaternions) is applied, then stereographic projection from
  `(0,0,0,1)`. The base frame is tilted a seeded 3–18° from the one base
  point whose circle runs through the projection pole, so no circle is
  huge; any circle still passing near the pole is dropped and counted.
  The circles are seen through a seeded three-quarter perspective camera,
  every crossing on the page is found, the farther ribbon is cut either
  side of it, and the ribbons are drawn far first, edged, with a gentle
  fade by depth. Tori and tubes each get their own hue; spirals and
  scatters run through the rainbow by longitude.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; every drawn circle is round and
  planar to 1e-9 of its radius (it is the exact image of a great circle);
  the Gauss linking integral of any two drawn circles is ±1 (tested to
  0.02 on 400-point loops); every fibre point maps back to its base point
  under the Hopf map; all ink inside the page; clamped `fibres` and
  `ribbon` record `requested_<field>`.
