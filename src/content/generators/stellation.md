---
title: "Stellation Diagrams"
blurb: "Stellation diagrams of the icosahedron, dodecahedron, octahedron and cuboctahedron, coloured by layer, with the chosen stellation drawn as a solid"
category: design
version: "1.0.0"
---
The face of a polyhedron, criss-crossed by the lines where all its other
faces meet it — the map from which every star polyhedron is built.

## What it is

Extend every face of a polyhedron until the planes meet each other, and
new, star-shaped solids appear: the stellations. Take one face plane and
draw on it the lines where the other planes cross it, and you get the
stellation diagram: a pattern of small regions around the original face.
Each ring of regions, working outward, is the face of the next
stellation. The page colours the rings from the centre out, picks out one
stellation's regions in a bright colour, and shows that stellation as a
solid in the corner.

Four solids are offered: the icosahedron, whose eight main stellations run
from the icosahedron itself through the compound of five octahedra and
the great icosahedron to the spiky complete stellation; the dodecahedron,
whose stellations are three of the Kepler–Poinsot star polyhedra; the
octahedron, whose one stellation is the stella octangula; and the
cuboctahedron, whose first stellation is the compound of a cube and an
octahedron.

## How to use it

Compare the bright regions with the solid in the corner: every bright
region is part of one face of that solid, and the same pattern sits on
every face. Count the rings outward to see how far the faces have been
extended. The line-art page is a colouring sheet and a construction plan:
colour each ring its own colour, or colour the outlined regions, cut them
out of card several times over and build the star.

## Purpose

A classic of geometry drawn exactly from the solid's planes: the diagram,
its rings and the solid are all computed, not traced from a picture.

## History

Johannes Kepler found the small and great stellated dodecahedra (1619);
Louis Poinsot the great dodecahedron and great icosahedron (1809). In
*The Fifty-Nine Icosahedra* (1938) H. S. M. Coxeter, P. Du Val, H. T.
Flather and J. F. Petrie enumerated every stellation of the icosahedron
from its diagram, naming the main-line stellations A to H. Magnus J.
Wenninger's *Polyhedron Models* (1971) and *Dual Models* (1983) made the
diagrams the standard way to build star polyhedra from card. See also
Peter Cromwell, *Polyhedra* (1997, ch. 7).

## This implementation

- **Spec knobs:** `width`, `height` (points); `solid` (`auto`,
  `icosahedron`, `dodecahedron`, `octahedron`, `cuboctahedron`);
  `stellation` (1 = the solid, 2 = the first stellation …; 0 lets the
  seed choose; held to the solid's last finite one); `colouring`
  (`layers`, `highlight`, `lines`); `palette` (`auto`, `lapis`, `vellum`,
  `lagoon`, `plum`, `ink`); `show_solid` (the 3D inset); `caption`;
  `stroke` (line width).
- **Generation:** the face planes are taken at inradius 1; each other
  plane meets the chosen face plane in a line (coincident lines merged,
  parallel planes skipped). The cells are found by cutting a square beyond
  every crossing with each line in turn — a line arrangement's cells are
  convex — with corners within 10⁻⁹ of a line counted as on it, so triple
  points stay single. A cell's depth is the number of other face planes
  between it and the centre; the cells of depth k are the face of the k-th
  main-line stellation (the union of the space layers 0…k), and a depth
  whose cells are all bounded is a finite stellation. The page frames the
  chosen layer and everything inside it. The solid is the chosen depth's
  cells of every face plane's own diagram lifted into space, painted far to
  near with back faces culled, with only the boundaries of each plane's
  chosen region stroked. Only main-line stellations are offered; the other
  51 of the 59 icosahedra mix layers and are not reproduced.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; the icosahedron diagram has 18
  lines (one parallel plane) and exactly 8 finite stellations, A to H, with
  1, 3, 6, 9, 15, 15, 9 and 9 cells (tested); the dodecahedron 10 lines
  and 4 stellations, the octahedron 6 and 2, the cuboctahedron 12 and 4
  (tested); every diagram keeps its face's rotational symmetry, cell for
  cell and depth for depth (tested); crossing a line changes the depth by
  the number of planes on it (tested); every stellation's surface is closed
  (zero vector area) and each encloses more volume than the one before,
  the first exactly the icosahedron's (tested).
  `verification: layer_equals_planes_crossed`. Clamped knobs are reported
  as `requested_<field>`; the line-art style reports its colourability
  check.
