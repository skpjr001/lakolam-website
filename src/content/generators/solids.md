---
title: "3D Shapes"
blurb: "3D shapes — name the solid, count faces, edges and vertices, Euler's rule, and which solid a net folds into, every count read from the solid's hull"
category: maths
version: "1.0.0"
---
Name the solid, count its faces, edges and vertices, check Euler's rule, and find the solid a net folds into.

## What it is

A page of two to twelve solids drawn in 3D — cubes, cuboids (rectangular
prisms), prisms, pyramids, cylinders, cones, spheres and hemispheres, and
on the hardest pages octahedra, dodecahedra, icosahedra and bipyramids —
each with questions underneath: its NAME; its FACES, EDGES and VERTICES
(for curved solids: FLAT FACES, CURVED SURFACES, EDGES and VERTICES); or,
with two of those numbers printed, the third by Euler's rule. Net
questions show a solid unfolded flat and ask which SOLID it folds into.
Solids are drawn from above and to one side, lightly shaded, with the
edges at the back dashed (or hidden). The answer key fills in every line.

## How to play

- **Faces** are the flat surfaces; **edges** are the lines where two faces
  meet; **vertices** are the corners where edges meet. Dashed lines are
  edges at the back that you could not see on a real solid — count them
  too.
- Count carefully: mark each face, edge or corner as you count it. For a
  prism, count the faces around the side, then add the two ends; for a
  pyramid, count the triangles, then add the base.
- **Curved solids:** a cylinder has 2 flat faces, 1 curved surface and 2
  curved edges; a cone has 1 flat face, 1 curved surface, 1 edge and 1
  vertex (its point); a sphere has 1 curved surface and nothing else; a
  hemisphere has 1 flat face, 1 curved surface and 1 edge.
- **Names:** a prism has the same shape all the way through, named after
  its end (triangular prism, hexagonal prism); a pyramid rises from its
  base to a point (square pyramid, pentagonal pyramid).
- **Euler's rule:** for any solid with flat faces and no holes, faces +
  vertices - edges = 2. If you know two of the numbers you can work out the
  third: E = F + V - 2, F = E - V + 2, V = E - F + 2.
- **Nets:** count the pieces and look at their shapes. Two matching end
  shapes joined by rectangles fold into a prism; one shape with a triangle
  on every side folds into a pyramid; a rectangle with two circles is a
  cylinder; a fan with one circle is a cone.

## Purpose

Describing solids is on every primary syllabus: the US Common Core
names cubes, cones, cylinders and spheres in kindergarten and asks about
faces in grade 2; England's curriculum moves from recognising and naming
3D shapes (Year 1) through counting faces, edges and vertices (Year 2) to
recognising 3D shapes from nets (Year 6); India's NCERT books do the same,
and class 8 introduces Euler's formula F + V - E = 2. Drawings in proper
perspective with hidden edges shown dashed teach children to read a 3D
picture — to count the faces they cannot see — and nets connect the solid
to the flat pieces it is made from.

## History

The Greeks studied solids closely: Plato linked the five regular solids
to the elements, and Euclid's *Elements* ends by constructing them and
proving there are only five. Albrecht Dürer published the first nets of
polyhedra in 1525, drawn so readers could cut them out and fold them. In
1750 Leonhard Euler noticed, in a letter to Christian Goldbach, that for
every solid he tried, faces plus vertices was always two more than edges;
the rule F + V - E = 2 became one of the founding results of topology.
Friedrich Froebel's kindergarten "gifts" of the 1830s — a sphere, cube and
cylinder — made handling and naming solids part of early childhood.

## This implementation

- **Spec knobs:** `difficulty`; `task` (`mixed`, `name`, `count`, `nets`,
  `euler`); `locale` (`us` "rectangular prism" and "square pyramid"; `uk`
  "cuboid" and "square-based pyramid"; `in` "cuboid" and "square
  pyramid"); `count` (2-12); `color` (soft shading); `hidden_edges` (dashed
  back edges); `width`, `height`, `line`.
- **Generation:** Kids names cubes, cuboids, square pyramids, triangular
  prisms, cylinders, cones and spheres; Easy counts their faces, edges and
  vertices; Medium adds pentagonal and hexagonal prisms and pyramids,
  triangular pyramids, hemispheres and nets; Hard adds octagonal prisms
  and pyramids, octahedra and Euler's rule; Expert adds dodecahedra,
  icosahedra, heptagonal prisms and triangular and pentagonal bipyramids.
  Proportions are random (a cuboid is never nearly a cube). Each solid is
  drawn in an orthographic view turned 15-75° (or a quarter turn more) and
  tilted 18-32° down, chosen so that no face is seen edge-on and no two
  corners overlap; the faces towards the viewer are filled and shaded by
  direction, edges between two back faces are dashed. Curved solids are
  drawn with exact ellipses and the cone's sides as true tangents from its
  point to its base. Nets are unfolded from the solid itself: prisms as a
  strip of rectangles with the ends attached, pyramids as a star around
  the base, other solids along random spanning trees of their faces, kept
  only when no two pieces overlap; cylinder and cone nets are a rectangle
  2πr wide and a sector of angle 360° × r ÷ slant height with their
  circles. Tasks asked below their first level (count at Easy, nets at
  Medium, Euler at Hard) are served there, with `requested_difficulty` in
  meta.
- **Solving:** a polyhedron is built only as its corner points; its faces
  are found as the convex hull of those points (every plane through three
  corners with all corners on one side, coplanar corners merged into one
  face), its edges as the faces' sides and its vertices as the corners the
  faces use. Curved solids carry an explicit model — their surfaces (flat
  or curved), which pairs of surfaces meet along a circle, and their apex
  points — and are counted from it.
- **Guarantees:** `answers_checked` — every count is recomputed from the
  hull or model, every polyhedron satisfies F + V - E = 2, and every net
  has exactly one piece per face with matching side counts and no
  overlaps. The tests check the counts against the formulas for each
  family (a prism on an n-gon has n + 2 faces, 3n edges and 2n vertices),
  count edges a second way without the hull (pairs of corners lying on two
  different supporting planes), name every net's solid from its pieces
  alone, check every net piece is congruent to a face of the solid and
  joined to another piece along a whole side, read Euler questions' given
  numbers back from the page, and check that no face is drawn edge-on.
