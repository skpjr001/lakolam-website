---
title: "Transformation Grids"
blurb: "D'Arcy Thompson's transformations: a fish, crab, skull or leaf on a square grid and the same under a smooth map"
category: design
version: "1.0.0"
---
One creature on a square grid, and the same creature on the grid bent,
sheared or stretched — D'Arcy Thompson's way of turning one species into
another.

## What it is

A fish, a crab, a skull or a leaf is drawn over a grid of squares. Beside
it, the whole picture is drawn again on a deformed grid: the squares lean
over, swell towards one end, bend into circular arcs or curve as a
conformal map would carry them. Every point of the figure moves with the
cell it sits in, so the fish becomes a deeper-bodied fish, the crab a
broader crab, the human-like skull a longer-faced one. A page shows a pair
(original and transformed) or a series of three, where the change grows
step by step. In the activity version the last grid is left empty for you
to fill.

## How to use it

- **Compare the panels.** Pick one square in the first grid and find the
  same square in the second. What happened to it — did it grow, lean,
  turn? Follow the eye, the fins, the tail: each moves with its own square.
- **Draw the transformation.** On the activity page the last grid is
  blank. Its rows are lettered and its columns numbered, the same as the
  first grid. Copy the figure one square at a time: look where each line
  enters and leaves a square in the original, and draw it entering and
  leaving the matching curved square. When you finish, you have drawn a
  new creature you never saw. Check it against the answer page.
- **Colour it.** The colouring version has plain outlines over a grey grid.
- **Frame it.** The colour version is made to hang, like a plate from an
  old natural-history book.

## Purpose

These pages show an idea that is still at the heart of how biologists
compare shapes: related animals often differ not part by part but by one
smooth change of the whole body. Copying a figure into a curved grid also
trains careful looking and gives a feel for how maps of the plane behave
— the same mathematics that bends a world map or a photograph.

## History

D'Arcy Wentworth Thompson set out the method of transformations in the
last chapter of *On Growth and Form* (Cambridge, 1917; 2nd ed. 1942). He
drew a porcupine-fish on Cartesian coordinates and a sunfish on the same
grid bent into coaxial circles; a hatchet-fish sheared into another; crab
carapaces, the skulls of humans, chimpanzees and baboons, and leaves on
grids stretched in one direction. Albrecht Dürer had deformed grids to
vary the proportions of the human face in his *Four Books on Human
Proportion* (1528). Thompson's grids were drawn by eye; their modern
descendants are the thin-plate splines and landmark morphometrics of Fred
Bookstein (*Morphometric Tools for Landmark Data*, 1991). The figures here
are invented, drawn from a few proportions, not traced from Thompson's
plates.

## This implementation

- **Spec knobs:** `creature` (`fish` default, `crab`, `skull`, `leaf`,
  `auto`), `transform` (`auto` default, `shear`, `taper`, `logarithmic`,
  `radial`, `power`, `mobius`, `bilinear`), `strength` (0-1, how far the
  map departs from the identity), `panels` (`pair` default, `series` of
  three: none, half, full), `mode` (`display` default, `activity`: the last
  grid blank, an answer page with it drawn), `grid` (4-24 cells along the
  figure's long side), `labels` (row letters and column numbers; always on
  in activity mode), `captions`, `style` (`colour` default, `ink`,
  `colouring`), `line`, `width`, `height`, `margin`.
- **Generation:** the creature is built from seeded proportions as closed
  outlines and open strokes. The fish's body is a profile
  `ξ^p (1−ξ)^q` above and below a slightly offset axis, with fin
  membranes and ray fans for the tail (forked, lunate, rounded or
  truncate), one or two dorsal fins, anal, pelvic and pectoral fins, an
  eye, gill arc, dotted lateral line, a darker back and bars or spots
  clipped to the body. The crab has a toothed carapace with orbits,
  gastric and cardiac regions, grooves, mottling, jointed legs and claws;
  the skull interpolates control points between a flat face under a high
  vault and a long muzzle under a low one; the leaf has a toothed ovate
  blade, midrib and pinnate veins. A square grid is laid round the figure.
  The map works in coordinates where the grid's long half-side is 1:
  shear `(u + kv, v)`; taper `(u, v(1 + tu) + a(u² − ⅓))`; logarithmic
  `((e^{au} − 1)/a, v e^{bu})`; radial (horizontals become coaxial arcs of
  curvature κ, Jacobian `1 + κv`); power `z ↦ z^a` about a point 1.45 away;
  Möbius `z ↦ z/(1 + cz)` with the pole outside the grid; bilinear onto a
  quadrilateral with seeded corners. Strength scales each map's departure
  from the identity (0 is exactly the identity). Grid and figure go
  through the map with adaptive subdivision, so straight lines come back
  as smooth curves; every panel is drawn at one shared scale, side by side
  or stacked, whichever is larger.
- **Solving:** Nothing to solve.
- **Guarantees:** every map's Jacobian determinant is positive at every
  grid node and on a ring just outside the grid — maps are redrawn until
  it is (tested for every creature, map and twelve seeds), so the grid
  never folds over; `min_jacobian` is in the meta. At strength 0 the
  transformed panel is byte-identical to the original. Every closed
  outline stays one closed curve after mapping (`outlines_closed`).
  Deterministic per seed; ink inside the page. `verification:
  jacobian_positive_at_grid_nodes`. Clamped `grid` and `strength` are
  reported as `requested_*`.
