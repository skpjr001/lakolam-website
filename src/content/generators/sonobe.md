---
title: "Sonobe assembly maps"
blurb: "Sonobe modular origami — assembly maps for 3- to 90-unit models with a proven colour plan and the unit's folding steps"
category: design
version: "1.0.0"
---
Colour plans for Sonobe modular origami balls, from the 3-unit jewel to the
90-unit ball, with no two touching units the same colour.

## What it is

A Sonobe unit is a square of paper folded into a parallelogram with two
pockets and two pointed tabs. Three units lock together into a small
pyramid, and pyramids lock together into a ball. Five models are offered:

- **Toshie's jewel**: 3 units, two pyramids back to back.
- **The cube**: 6 units.
- **The triakis octahedron**: 12 units, 8 pyramids.
- **The Sonobe ball** (triakis icosahedron): 30 units, 20 pyramids.
- **The 90-unit ball**: 60 pyramids, in rings of five and six.

The page shows the finished model from the front and from the back, with
every unit drawn where it sits, numbered in a building order and coloured
by plan. A key gives how many squares of each colour to fold, and a strip
along the bottom shows how to fold one unit. The plan uses three to six
colours. Every pyramid has three different colours, and the colours are
used equally, or as nearly equally as the count allows.

## How to use it

1. Count out the squares: the key says how many of each colour (A, B, C
   and so on). Ordinary origami paper works well; all the squares must be
   the same size.
2. Fold each square into a unit, following the strip at the bottom:
   - Crease the square in half and unfold it.
   - Fold the two edges to the middle crease.
   - Fold the top right and bottom left corners in as small triangles,
     without crossing the middle.
   - Fold the top left corner down to the right edge and the bottom right
     corner up to the left edge. Unfold these two folds and tuck each corner
     under the flap beside it, which makes a parallelogram.
   - Turn the unit over and fold the two points in to make a square in the
     middle. Unfold: the points are the tabs, and the flaps over the middle
     square are the pockets.

   Fold every unit the same way, or they will not lock together.
3. Build in number order. Units 1, 2 and 3 make the first pyramid: slide
   each tab into the pocket of the next unit round the point. Each later
   unit joins one that is already in place.
4. Check the colours against the map as you go. The three units of every
   pyramid should be three different colours. The last few units are the
   hardest to fit: ease the tabs in gently.

## Purpose

Sonobe balls are a favourite of maths clubs and craft tables because the
same simple unit builds a whole family of shapes. Choosing the colours is
the tricky part. With three colours, the rule that each pyramid has all
three is a real puzzle, the same one as colouring the edges of a map so
that no two meeting edges match. A wrong guess usually shows up only near
the end, when two units of the same colour have to meet. This page solves
the plan in advance and checks it, so the folder can just follow the map.

## History

The unit is credited to the Japanese folder Mitsunobu Sonobe. Toshie
Takahama, Kunihiko Kasahara and others popularised the three-unit "jewel"
and the larger assemblies in their books. Modular origami
spread through books and school maths enrichment from the 1980s, and
colouring Sonobe models is a classic introduction to graph colouring: a
three-colouring in which every pyramid has all three colours corresponds to
an edge colouring of the dual map.

## This implementation

- **Spec knobs:** `model` (`jewel`, `cube`, `octahedral`, `icosahedral`,
  `dodecahedral`); `colours` (3–6, never more than the units; out of range
  is clamped and recorded as `requested_colours`); `look` (`colour` fills
  the units, `outline` prints colour letters to colour in); `numbers`
  (building-order numbers); `fold_diagram` (the folding strip); `page`,
  `landscape`; `margin` (inches, 0.1–1).
- **Generation:** each model is a polyhedron with triangular faces, its
  corners on a sphere: a triangle seen from both sides, the tetrahedron,
  octahedron, icosahedron, and a dodecahedron whose faces are rings of five
  triangles (the pentakis dodecahedron). A unit is an edge, a pyramid a
  face, and each unit is drawn as the four-sided patch between its edge's
  ends and its two pyramids' apexes, which tiles the sphere (a cube for 6
  units, the rhombic dodecahedron for 12, the rhombic triacontahedron for
  30). The seed turns the ball. The front and back views are orthographic
  projections of each hemisphere, every patch cut at the rim. The building
  order is breadth first over the pyramids from the one nearest the
  reader. The colouring is a seeded backtracking search in that order: no
  colour repeats within a pyramid, and at most `units mod colours` colours
  may go one above `units / colours`. The seed also picks the palette.
- **Solving:** nothing to solve.
- **Guarantees:** `colouring_checked`, re-checked from the finished model.
  The structure is the polyhedron's (units are its edges, each bordering
  two pyramids, three units per pyramid, V − E + F = 2, the expected corner
  degrees). The three units of every pyramid have three different colours.
  Every colour is used, and the counts differ by at most one (exactly equal
  when the colours divide the units; with three colours they are always
  equal). Every unit after the first pyramid touches one placed before it.
  The tests re-check the colouring independently, rebuilding the pyramids
  as the triangles of the edge graph.
