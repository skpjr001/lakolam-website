---
title: "3D Shape Nets"
blurb: "3D shape nets — cut, fold and glue, and which nets fold into a cube"
category: maths
version: "1.0.0"
---
Nets of solids to cut out, fold and glue, printed at true size, and a quiz
on which nets fold into a cube.

## What it is

A net is a flat pattern that folds up into a solid. A net page draws one at
actual size: a cube, cuboid, triangular prism, square pyramid, tetrahedron,
cylinder or cone, with solid lines to cut, dashed lines to fold and grey tabs
to glue, next to a small picture of the finished solid. Underneath, it asks
for the solid's name, its faces, edges and vertices, and at the higher levels
its surface area. A quiz page shows a grid of shapes made of six squares and
asks which of them fold into a cube.

## How to play

**Making the solid:** cut round the outside along the solid lines, including
round the grey tabs. Crease every dashed line, folding away from the printed
side so the lines end up inside. Fold the faces up to meet, and glue each
grey tab under the edge it meets. For a cylinder or cone, roll the curved
piece round until its tab tucks under the far edge, then fold the little
teeth on each circle inwards and glue them inside the ends.

**Faces, edges and vertices:** a face is a flat side, an edge is where two
faces meet, and a vertex is a corner where edges meet. Count them on the
picture or on your model.

**Surface area:** add up the areas of all the faces on the net, since the net
is exactly the solid's surface laid flat. For a cylinder, the rectangle is as
long as the circle is round (2 x π x radius); for a cone, the curved part is
π x radius x slant height. Leave π in the answer.

**The cube quiz:** picture each square folding up. A net cannot fold into a
cube if four squares meet at one corner (a 2 by 2 block) or if two squares
would land on the same face of the cube. There are exactly eleven different
cube nets.

## Purpose

Nets connect flat shapes to solid ones, a step many children find hard to
visualise. Building a model makes faces, edges and vertices concrete, and it
shows why surface area is just the area of the net. The cube quiz trains
spatial reasoning on its own, and printing at true size means the
measurements on the page are the measurements of the model.

## History

Albrecht Dürer published the first known nets of polyhedra in his 1525
*Underweysung der Messung*, drawing the Platonic and Archimedean solids
unfolded on the page for readers to cut out. Paper models have been a
classroom staple ever since, and the question of which hexominoes fold into
a cube (eleven of the thirty-five) is a favourite puzzle of recreational
mathematics.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`net` or `quiz`); `shape` (`auto`,
  `cube`, `cuboid`, `triangular_prism`, `square_pyramid`, `tetrahedron`,
  `cylinder`, `cone`); `layout` (1-11 picks one of the eleven cube nets, 0 any);
  `tabs`; `units` (`cm` or `in`: whole-unit measurements, drawn at true size);
  `count` (quiz shapes, 4-12, 0 by level); page `width` and `height`; `line`.
- **Generation:** difficulty maps to grade. With `shape: auto`, Kids (grade 3)
  builds cubes, Easy (grade 4) cubes and cuboids, Medium (grade 5) cuboids,
  triangular prisms and square pyramids with their measurements printed,
  Hard (grade 6) prisms on a 3-4-5 right triangle, pyramids, tetrahedra and
  cuboids with a surface-area question, and Expert (grades 7-8) cylinders and
  cones with surface area in terms of π. Every level also asks the solid's
  name, and faces, edges and vertices for polyhedra. Cuboids and prisms hang
  their lids from any side of the strip; tetrahedra use either of their two
  nets; cubes use any of the eleven nets, turned and flipped. The size is the
  largest whole multiple of the chosen proportions that fits the page, so
  models are as big as the paper allows. In inches the 3-4-5 prism is too
  long for the page, so inch prisms use equilateral ends (and then have no
  surface-area question). Quiz pages have 6 shapes (Kids, Easy), 9 (Medium,
  Hard) or 12 (Expert), about half folding into a cube, all different; the
  wrong ones are obvious at Kids and Easy (a 2 by 2 block or a row of five),
  mixed at Medium and subtle at Hard and Expert.
- **Solving:** the answer key names every face of the net (top, bottom,
  front, back, left and right for boxes, from where each face lands when
  folded) and writes the name, face, edge and vertex counts and surface area
  in red. The quiz key circles YES or NO for every shape.
- **Guarantees:** deterministic per seed. Every polyhedral net is folded in 3D
  by composing a rotation about each hinge by the solid's dihedral angle; the
  folded faces must form a closed surface in which every edge meets exactly
  one other edge from the opposite side, every corner must lie behind every
  face (a convex solid, so nothing overlaps), Euler's V - E + F must be 2,
  and the enclosed volume must equal the solid's. The glue tabs are placed on
  exactly the edge pairs the fold brings together, one tab per pair, and the
  tests check no tab overlaps a face or another tab. Cylinders and cones are
  rolled up analytically: the seam edges must meet, the rolled edge must wrap
  the end circle exactly once, the cone's sector must be less than a full
  turn, and each end circle must touch the surface. The tests check the
  drawn net's edges equal their printed lengths at 72/2.54 points per
  centimetre (72 per inch), that the net fits the page, and that each surface
  area equals the net's paper area. Quiz answers come from the fold engine and
  are cross-checked by rolling a die across each shape; the tests confirm
  there are 35 hexominoes of which exactly 11 fold into a cube. Difficulty is
  the grade-level set of solids (`rating_basis: grade_level_solids`) or, for
  quizzes, the count and subtlety of the shapes
  (`rating_basis: count_and_subtlety`).
