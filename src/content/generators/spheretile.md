---
title: "Spherical Kaleidoscope"
blurb: "A spherical kaleidoscope: mirror triangles of the tetrahedron, cube and icosahedron tiling a ball into uniform and Goldberg polyhedra"
category: design
version: "1.0.0"
---
A ball tiled by mirrors: footballs, cuboctahedra and virus-shell spheres,
each face still showing the reflections that made it.

## What it is

Stand three mirrors together at the centre of a ball, at angles of 90°,
60° and 36°, and the one small triangle between them is reflected into 120
copies covering the whole sphere — the symmetry of the icosahedron. With
45° instead of 36° there are 48 copies (the cube's symmetry), with 60°
there are 24 (the tetrahedron's). Put a single dot inside the first
triangle and reflect it with everything else: the copies of the dot become
the corners of a polyhedron with perfectly regular faces. A dot in a
corner gives the icosahedron or dodecahedron; on an edge, the football
(truncated icosahedron) or the rhombicosidodecahedron; in the very centre,
the great truncated icosidodecahedron with its squares, hexagons and
decagons. The Goldberg spheres are the other family on offer: twelve
pentagons spread among many hexagons, like a golf ball or the shell of a
virus.

## How to use it

A print for a classroom, study or nursery wall. On the kaleidoscope
colouring, every face is split into light and dark wedges: those are the
mirror images, and you can follow a mirror line as a great circle right
round the ball. Count the faces you see of each shape and work out the
whole ball from them — the football has 12 pentagons and 20 hexagons. The
four-sphere plate shows several polyhedra from the same mirrors, named
underneath. The black-and-white version is a colouring page: colour the
wedges in two shades to bring out the mirrors, or give neighbouring faces
different colours.

## Purpose

A design-lane page from symmetry and geometry: exact uniform polyhedra
and Goldberg polyhedra, drawn as spherical tilings with true great-circle
edges, so it is both a decorative globe and a correct picture of a group
of reflections.

## History

Hermann Schwarz listed the spherical triangles that tile the sphere by
reflection in 1873. Willem Wythoff described the construction of uniform
polyhedra from a point in such a triangle in 1918, and H. S. M. Coxeter
made it the backbone of *Regular Polytopes* (1948) and of the complete
list of uniform polyhedra (Coxeter, Longuet-Higgins and Miller, 1954).
Michael Goldberg described his polyhedra in 1937; Caspar and Klug found
the same pattern in virus shells in 1962. Kepler had already drawn most of
these solids in *Harmonices Mundi* (1619), and the truncated icosahedron
became the football's panel pattern in the 1960s.

## This implementation

- **Spec knobs:** `group` (auto, tetrahedral, octahedral, icosahedral),
  `pattern` (auto, regular, dual, rectified, truncated, truncated_dual,
  expanded, omnitruncated, seeded, goldberg), `goldberg_m` and
  `goldberg_n` (0–8, used by goldberg; the group is not), `colouring`
  (auto, parity, face_type, proper), `layout` (single, grid), `mirrors`
  (draw every mirror line), `shading` (light and rim shading), `palette`
  (auto, jewel, porcelain, candy, night, ink), `caption`, `line`,
  `width`, `height`, `margin`.
- **Generation:** the Schwarz triangle (π/2, π/3, π/r) is taken from the
  regular solid's vertex, face centre and edge midpoint and reflected in
  its sides breadth-first until 24, 48 or 120 copies exist, each with its
  parity. The generating point is a corner, a point on a side equidistant
  (by bisection) from the two mirrors not through it, the incentre (solved
  exactly), or seeded barycentric weights; it is carried to every copy by
  the same linear map. Round every corner of the tiling the copies of the
  point, in angular order with repeats merged, are one face; the face is
  split into one kite per triangle (corner, foot on one mirror, point,
  foot on the other). Goldberg faces come from the Caspar–Klug lattice,
  split along their own symmetry lines. Faces are coloured by kind, by a
  DSatur proper colouring, or (parity) by kind with alternating light and
  dark mirror halves; a seeded uniformly random rotation turns the ball,
  edges are great-circle arcs, and faces crossing the limb are closed
  along it. The grid shows the chosen pattern and three other shapes from
  the same mirrors (or four Goldberg polyhedra).
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; the kaleidoscope has exactly
  24/48/120 triangles, half of each parity, and triangles sharing a side
  always differ in parity; the truncated icosahedron has 12 pentagons and
  20 hexagons, and every other uniform pattern has its textbook face
  census (tested for 14 cases); the uniform patterns have all edges equal
  to 1e-6; every edge is shared by exactly two faces; the proper colouring
  never gives neighbours the same colour; Goldberg GP(m, n) has 12
  pentagons and 10(T−1) hexagons; all ink inside the page; clamped
  `goldberg_m`, `goldberg_n` and `line` record `requested_<field>`.
