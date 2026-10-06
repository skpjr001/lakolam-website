---
title: "Girih"
blurb: "Girih — Islamic geometric star patterns by Hankin's polygons-in-contact method"
category: design
version: "1.1.0"
---
Islamic geometric star patterns — rosettes of six, eight and twelve points,
interlaced across the whole page.

## What it is

A page of continuous line work in the tradition of Islamic geometric art:
stars and rosettes linked by straight bands, repeating without a gap. The
lines divide the page into closed shapes — kites, stars, polygons — which
makes it a colouring page as well as a piece of line art.

The **rosette** method draws the most celebrated motif of the tradition:
in each octagon or dodecagon a central star ringed by hexagonal petals, the
petals sharing their sides, with kite-shaped points running out between
them to meet the pattern around.

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
computer graphics. The rosette — a star wreathed in petals — was analysed
by A. J. Lee, whose construction of the "ideal" rosette Kaplan adopted in
his Taprats software.

## This implementation

- **Spec knobs:** `tiling` (auto, square, hexagon, triangle, octagon (4.8.8),
  dodecagon (4.6.12), rhombitrihexagonal (3.4.6.4)), `angle` (the contact
  angle in degrees; 0 picks one), `scale`, `line`, `width`, `height`, `frame`,
  `method` (`hankin`, the default, or `rosette`).
- **Rosettes (`method: rosette`):** every tile of seven or more sides gets a
  rosette in the manner of Lee's; the other tiles get Hankin stars at the
  same angle, so lines run straight on through each edge midpoint. `auto`
  picks octagon (4.8.8) or dodecagon (4.6.12); tilings without a large
  polygon fall back to plain Hankin stars. Construction in an n-gon: the
  Hankin rays cross on the corner bisectors; carried on, each meets its
  mirror image on the next edge's bisector — a notch of the n-gon's (n/2)
  star. Each crossing is a petal's outer tip and each notch a *shoulder*
  shared by two petals; from the shoulder the petals' common side runs
  down the bisector, as long as the petal's outer edge, to a waist, and the
  petal closes at an inner tip on its corner bisector, slanting like its
  outer tip mirrored end to end. The spaces inside the petals form the
  central n-pointed star. Only the polygon's own mirror lines are used, so
  the rosette has full D_n symmetry. Default angle: 58° (octagons) or 60°
  (dodecagons), nudged ±3° per seed under `auto`; a polygon with no room
  for petals at the chosen angle keeps its Hankin star. Meta adds `method`
  and `rosettes` (the count drawn). Hasba (Moroccan zellige rosettes of
  order 16, 24, … unfolded by a wallpaper group) is not implemented.
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
  Rosettes are tested for D_n symmetry (the segment set is unchanged by a
  turn of 360°/n and by a mirror) for 8-, 10- and 12-gons at several
  angles, and rosette pages for loose ends: every line end meets another
  line or the page edge.
