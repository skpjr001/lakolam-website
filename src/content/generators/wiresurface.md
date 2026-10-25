---
title: "Wireframe Surfaces"
blurb: "Mathematical surfaces as wireframe plates with hidden lines removed: torus, Dini, Enneper, Scherk, supershape, vase, Möbius band, Klein bottle"
category: design
version: "1.0.0"
---
Mathematical surfaces drawn as nets of lines, every line hidden exactly
where the surface passes in front of it.

## What it is

A surface can be drawn by two families of curves crossing it, like the
lines of latitude and longitude on a globe. Draw them all and the picture
is a tangle; hide every piece that lies behind the surface and it becomes
solid. These plates show eight classics that way: the torus; Dini's
surface, a spiralling trumpet of constant negative curvature; Enneper's
and Scherk's minimal surfaces, the shapes a soap film takes; a
supershape, made from the superformula botanists use for flowers and
shells; a vase turned on a lathe; the one-sided Möbius band; and the Klein
bottle in its figure-8 form, which passes through itself.

## How to use it

A print for a study wall, a classroom or a maths department, in the style
of old plaster-model plates. Follow one line around the surface and watch
it disappear behind a fold and come back. On the Möbius band, follow the
lines across the band and see that there is only one side. The heavy line
is the outline the surface makes against the paper; where a surface turns
away from the light, extra lines darken it the way an engraver shades.

## Purpose

A design-lane page from differential geometry and computer graphics:
exact parametric surfaces drawn with exact hidden-line removal, as
coloured plates or as pure line art.

## History

Hidden-line removal was one of the first problems of computer graphics:
L. G. Roberts (1963) and Arthur Appel (1967) solved it for solids, and
Edwin Catmull's z-buffer (1974) made it general. The surfaces are older:
Ulisse Dini described his spiral in 1866, Alfred Enneper his minimal
surface in 1864, Heinrich Scherk his in 1834; Felix Klein described the
bottle in 1882 and August Möbius the band in 1858. Johan Gielis published
the superformula in 2003. Plaster and string models of such surfaces,
sold by Brill and Schilling from the 1870s, are the plates this page
imitates.

## This implementation

- **Spec knobs:** `surface` (auto, torus, dini, enneper, scherk,
  supershape, vase, mobius, klein), `lines` (8–80 lines in the main
  family; the other family follows the surface's proportions),
  `density_shading`, `silhouettes`, `palette` (auto, porcelain, sunset,
  blueprint, celadon, ink), `line`, `caption`, `width`, `height`, `margin`.
- **Generation:** each surface is its classical parametrisation over the
  unit square with seeded shape parameters (tube radius, Dini's pitch and
  turns, Enneper's disc radius, Scherk's reach towards the asymptotes,
  the supershape's two superformulas, the vase's profile, the band's
  width and half-twists, the bottle's radius). It is meshed four times
  finer than the lines, so every drawn line runs along mesh edges. A
  seeded orbit camera with mild perspective is fitted to the page; the
  mesh is rasterised into a z-buffer at about two pixels per point, and
  every line, the chained silhouette edges (boundary edges and edges
  between front- and back-facing faces, minus the cut seam of the
  one-sided surfaces) and, with density shading, the half-way lines
  through cells facing away from the light are cut into their visible
  runs. In colour, each cell between lines is filled (far first) with a
  gradient along the surface, a different colour on the back of
  two-sided surfaces, and two-sided Lambert shading.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; every visible run lies on its
  projected input line (to 1e-6 pt); a torus seen from directly above
  shows nothing of the circle under its tube; some line is always hidden
  (the plates are not see-through); every surface point is finite; all
  ink inside the page; a clamped `lines` or `line` records
  `requested_<field>`.
