---
title: "Girih"
blurb: "Girih — Islamic geometric star patterns by Hankin's polygons-in-contact method"
category: design
version: "1.0.0"
---
Islamic geometric star patterns — rosettes of six, eight and twelve points,
interlaced across the whole page.

## What it is

A page of continuous line work in the tradition of Islamic geometric art:
stars and rosettes linked by straight bands, repeating without a gap. The
lines divide the page into closed shapes — kites, stars, polygons — which
makes it a colouring page as well as a piece of line art.

## How to use it

Colour it: the shapes repeat, so choosing one colour per shape family (all the
star centres, all the kites) brings the underlying symmetry out, while
colouring across families finds new patterns in the same lines. Or print it as
it is — the pattern is also a template for tiles, stencils and cut work.

## Purpose

Islamic geometric colouring books are an established niche, and the method
gives the catalogue its most "classical" design generator: a handful of
tilings and one angle produce the whole family of historical star patterns.
It sits beside `tessellation` and `tiling`, which draw the tilings themselves;
here the tiling is scaffolding and only the stars are printed.

## History

The patterns (*girih*, Persian for "knot") decorate mosques, madrasas and
manuscripts from the 10th century on. In 1925 the engineer E. H. Hankin showed
how many of them are drawn: lay down a tiling of polygons, and from the
midpoint of every edge send two lines into each polygon at a fixed angle — the
*polygons-in-contact* method used here. Craig Kaplan's work brought it to
computer graphics.

## This implementation

- **Spec knobs:** `tiling` (auto, square, hexagon, triangle, octagon (4.8.8),
  dodecagon (4.6.12), rhombitrihexagonal (3.4.6.4)), `angle` (the contact
  angle in degrees; 0 picks one), `scale`, `line`, `width`, `height`, `frame`.
- **Construction:** each tiling is a lattice cell of regular polygons with
  unit edges; the page is covered with copies at a seeded offset. In every
  polygon, the ray from each edge midpoint aimed at a corner meets the ray
  from the next edge's midpoint; the star runs midpoint → meeting point →
  midpoint. Both tiles on an edge start from the same midpoint, so the stars
  join into one network. Lines are clipped to the page.
- **Angles:** each n-gon has one degenerate angle, 180/n degrees, where the
  two rays lie on one line; there the star flattens to the chord between the
  midpoints. The defaults sit clear of every polygon's degenerate angle, and
  an auto tiling nudges its angle by up to ±8° per seed.
- **Guarantees:** deterministic per seed; the tests check that every tile has
  unit edges and that every edge midpoint is shared by exactly two tiles — the
  tiling has no gaps or overlaps, which is what makes the lines join up.
