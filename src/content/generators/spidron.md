---
title: "Spidrons"
blurb: "Spidrons: Erdély's spiralling chains of equilateral and 30-30-120 triangles, as tilings and shaded relief"
category: design
version: "1.0.0"
---
Dániel Erdély's spiralling chains of triangles, shrinking by 1/√3 a step
towards the centre: single spidrons, tilings and shaded relief.

## What it is

A spidron is a chain of triangles that winds inward like a snail shell:
an equilateral triangle, then a flat 30-30-120 triangle whose short sides
are 1/√3 as long, then a smaller equilateral triangle on one of those
sides, and so on for ever. Six such arms fill a regular hexagon exactly,
ring inside ring, each ring turned by 30° and 1/√3 the size of the one
before. Because the hexagons tile, spidrons tile too: hexagons edge to
edge, or hexagons touching corner to corner with plain triangles between
them. The same construction works in other regular polygons — squares,
pentagons, heptagons, octagons — with the flat triangles changing shape so
that the others stay equilateral. Folded along its edges, a spidron
"nest" springs into a twisted relief; the relief style shades the faces
light and dark to suggest it.

## How to use it

Print the colour pages as they are: each arm of each spidron has its own
colour, so the spirals stand out, and the relief style shades every face as
if light were falling on a folded paper model. Choose colouring by ring for
a target-like look, or by triangle kind for a two-tone pattern. The line
page is for colouring in: follow one arm from the rim to the centre in one
colour, or colour every other triangle to see the hidden hexagons. To fold
one, print a single hexagonal spidron large, score every edge, and fold the
equilateral triangles one way and the flat triangles the other — the
hexagon twists and rises.

## Purpose

A design that is exact all the way down: one ratio, 1/√3, and two
triangles generate the whole spiral, and the page shows how a simple rule
fills a polygon, tiles the plane and suggests a third dimension.

## History

The spidron was devised by the Hungarian designer Dániel Erdély in 1979 as
a homework study for Ernő Rubik's course on the theory of form at the
Budapest University of Applied Arts (now the Moholy-Nagy University of Art
and Design). Erdély developed it over the following decades into a family
of shapes — spidrons in other polygons, spidron tilings and folded
three-dimensional "spidron nests" and domes — shown at exhibitions and
described in his papers for the Bridges and ISAMA conferences on mathematics
and art from the mid-2000s. The name joins "spider" and the "-on" of
polyhedron and pentagon.

## This implementation

- **Spec knobs:** `width`, `height` (points); `layout` (`single`,
  `tiling`, `mixed`; default `tiling`); `polygon` (`square`, `pentagon`,
  `hexagon`, `heptagon`, `octagon`; default `hexagon` — tilings use
  hexagons, squares, or octagons with square spidrons in the gaps, so a
  pentagon or heptagon tiling is drawn with hexagons and reported as
  `requested_polygon`; `mixed` is always hexagons); `depth` (rings, 1-12,
  default 7; rings too small to see are left out); `tiles` (spidrons
  across, 1-8, default 3); `handedness` (`auto` per spidron, `left`,
  `right`, `alternate`); `style` (`flat`, `relief`, `lines`; default
  `relief`); `colour_by` (`arm`, `step`, `kind`); `palette` (`auto`,
  `ocean`, `ember`, `meadow`, `dusk`, `mono`); `stroke`.
- **Generation:** a regular n-gon of circumradius R holds the n-gon turned
  by π/n of circumradius qR with q = 1 / (2 sin(π/6 + π/n)), the one ratio
  that makes the triangles between an outer vertex and its two inner
  neighbours equilateral (q = 1/√3 for the hexagon, where the other
  triangles are exactly 30-30-120). The ring is n isosceles and n
  equilateral triangles; the rings repeat inward and the last polygon left
  is drawn as a dark eye. Arms join each isosceles triangle to the
  equilateral triangle on one side and on into the isosceles triangle of
  the next ring; the hand picks the side. Tilings: hexagons on the
  hexagonal lattice, squares on the square lattice, octagons with squares
  (4.8.8), and for `mixed` hexagons vertex to vertex with each triangle cut
  into three 30-30-120 triangles at its centre (3.6.3.6), clipped to the
  frame. Relief is a lighting model, not a computed fold: each face is lit
  as a plane leaning about its outer edge (isosceles faces inward,
  equilateral faces a quarter turn the way the arm runs) under a light from
  the upper left, whose angle the seed varies a little.
- **Guarantees:** deterministic per seed; every equilateral face is
  equilateral and every isosceles face has the ring's outer side as base
  and the next ring's side as legs (in the hexagon: angles 30-30-120 and
  shrink ratio 1/√3) — tested to 1e-9; each spidron's faces and centre add
  up to the polygon's area exactly and random points of the polygon lie in
  exactly one face (no gaps, no overlaps); every arm is a chain of faces
  each sharing an edge with the next; tilings cover the frame with every
  point in exactly one tile. The line page leaves out rings whose faces
  would be smaller than 40 mm², so every region is big enough to colour.
  `verification:
  exact_ring_ratio_and_angles_area_and_cover`. The line page reports
  `colorable` from the adult colourability check. Clamped knobs are
  reported as `requested_<field>`.
