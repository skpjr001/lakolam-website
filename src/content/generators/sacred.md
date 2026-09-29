---
title: "Sacred Geometry"
blurb: "Sacred geometry - flower of life, Metatron's cube, Sri Yantra, golden spiral, Platonic solids - constructed exactly"
category: design
version: "1.0.0"
---
The Flower of Life, Metatron's Cube, the Sri Yantra, the golden spiral and
the Platonic solids — drawn from their true constructions, as colouring
pages, gold-on-black prints or flat-colour art.

## What it is

The figures that artists, temple builders and mathematicians have returned
to for thousands of years, each built the way it is defined:

- **Seed, Flower and Fruit of Life** — equal circles, each passing through
  its neighbours' centres; the Flower shows its classic nineteen circles
  and thirty-six arcs inside a bounding circle, the Fruit thirteen circles
  that just touch.
- **Metatron's Cube** — the thirteen circles of the Fruit joined by all 78
  lines between their centres, with the hidden cube, star tetrahedron and
  hexagons picked out in bold.
- **Tree of Life** — the ten sephirot and twenty-two paths, set on the
  circles they are traditionally drawn from.
- **Vesica Piscis** — two circles through each other's centres, the lens
  they share, and lenses nested within lenses.
- **Sri Yantra** — nine interlocking triangles forming 43 small triangles
  in five rings, inside lotus petals of eight and sixteen and a square gate.
- **Merkaba** — the star tetrahedron, two interlocking tetrahedra, shown
  as a solid.
- **Torus** — circles all passing through one centre, like a flower seen
  from above.
- **Golden spiral** — a golden rectangle divided into squares, with the
  quarter circles that make the spiral.
- **Platonic solids** — the five regular solids around a pentagram.

## How to use it

For colouring, choose the line-art style: every region is closed, so each
petal, lens, triangle or face can take its own colour. Symmetry makes it
restful work: colour one petal of each kind and repeat the choice around
the figure. Richer detail levels add more rings, circles and ornament for
longer sessions; plainer ones suit bold markers. The gold-on-black and
palette styles are ready to frame as wall art or to use as meditation
cards. The label under the figure can be turned off for a clean print.

## Purpose

Sacred geometry is a staple of colouring books and wall art, and most of
what is sold is traced by hand or clip-art that is subtly wrong — circles
that miss each other's centres, a Sri Yantra whose lines never quite meet.
Built from the definitions, every figure is exact at any size, and the
same geometry serves three very different products.

## History

The Vesica Piscis and the six-around-one circle pattern appear in
Mesopotamian and Egyptian ornament; the Flower of Life is carved in the
Temple of Osiris at Abydos and drawn in Leonardo's notebooks. Plato tied
the five regular solids to the elements in the *Timaeus*, and Euclid's
*Elements* ends by constructing them. The Tree of Life comes from
Kabbalah, the golden ratio from Greek geometry by way of Pacioli's *Divina
Proportione*. The Sri Yantra, the chief diagram of Shri Vidya worship, has
been drawn for over a millennium; the problem of making its lines meet
exactly occupied twentieth-century mathematicians (Kulaichev, Huet), since
the traditional recipe is only approximate.

## This implementation

- **Spec knobs:** `figure` (auto, seed_of_life, flower_of_life,
  fruit_of_life, metatrons_cube, tree_of_life, vesica_piscis, sri_yantra,
  merkaba, torus, golden_spiral, platonic_solids), `style` (line_art, gold,
  palette), `palette` (auto, temple, ocean, forest, night, rose), `detail`
  (1 to 5, 0 = seeded 2 to 4), `stroke`, `solids` (Metatron's embedded
  solids in bold), `frame` (seeded border ornament), `label`, `size`.
- **Generation:** each figure is built in a unit disc from its
  construction. Flower-of-life arcs are clipped to the bounding circle
  analytically (the arc of a lattice circle inside it is found from the
  cosine rule), and its petals are the lenses between adjacent lattice
  points. The Sri Yantra starts from the classical 48-unit drawing (lines at
  6, 12, 17, 20, 23, 27, 30, 36, 42; each triangle's apex on another line)
  and solves its nine line heights and seven half-widths by Gauss-Newton so
  that nine pairs of sides cross exactly on base lines, three corners sit
  exactly on other triangles' sides, and — the optimal criteria — the
  innermost triangle is equilateral and centred on the circle. Its faces
  come from a planar arrangement of the 27 segments; faces covered by an
  odd number of triangles are the 43 traditional triangles, ringed by
  distance from the outside. Solids are exact coordinates (faces found as
  the vertices furthest along each vertex of the dual), shown in
  orthographic projection with hidden faces removed by an exact pairwise
  depth order and flat-shaded in three tones. The seed picks the figure,
  detail, palette, frame ornament and views.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed; every figure measures its own
  construction error from the finished coordinates and reports it
  (`construction_error`, `construction_exact`). Tested: flower circles pass
  through their six neighbours' centres (19 full circles and 36 arcs on the
  classic figure, arc ends exactly on the bounding circle); Metatron's
  lines join exactly the thirteen centres (78 lines, bold solids a subset,
  18 exact tangencies and no overlaps); every remaining golden rectangle has
  ratio φ to 1e-9, the squares tile it, and the quarter circles join; the
  Tree's sephirot are lattice points and its 22 paths distinct; the vesica's
  nested lenses touch their parents' arcs; the Sri Yantra's triple
  intersections and corner contacts coincide within 1e-9 of the radius
  (tested limit 0.1%), with exactly 43 triangles in rings of 14, 10, 10, 8
  and 1 and the central triangle centred on the circle; the Platonic solids
  are regular (equal edges, Euler's formula, outward faces) and the views
  are orthonormal. Line-art pages pass the adult colouring preflight at
  every figure and detail (squares and nested lenses too small to colour are
  left out of colouring pages). A few milliseconds per page.
