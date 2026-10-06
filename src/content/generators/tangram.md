---
title: "Tangram"
blurb: "Tangram — fill a target silhouette with the seven cut-out tans, from piece lines shown to convex shapes"
category: puzzle
version: "1.0.0"
---
Seven flat pieces, one square, endless shapes. Can you make the boat?

## What it is

The tangram is a dissection puzzle: a square cut into seven pieces, called
tans. There are two large triangles, a medium triangle, two small triangles,
a square and a parallelogram. Each page shows a target shape to make with
all seven, and the pieces themselves, drawn as the classic square ready to
cut out. Early pages draw the target at the pieces' own size, with some or
all of the lines between the pieces, so a child can lay the pieces on top.
Later pages show only the outline, then four smaller outlines to build on
the table, and at the top the convex shapes (square, triangle, rectangle,
hexagon...), which are famous for being hard.

## How to play

Cut out the seven pieces along the lines. Use **all seven** pieces to make
the shape on the page: every piece is used once, pieces may be turned and
flipped over, and no two pieces may overlap. Pieces touch along their sides.

- **Lines drawn in:** find the piece that fits each part and lay it on top.
- **Big triangles drawn in:** place the two big triangles first, then fit
  the other five around them.
- **Outline only:** start with the big triangles - they only fit in a few
  places. Look for sharp corners: only triangles and the parallelogram make
  them.
- **Small outlines:** the shapes are smaller than your pieces. Build each
  one on the table next to the page.

There is often more than one way to make a shape. Any way that uses all
seven pieces without overlaps is right.

## Purpose

Tangrams build spatial reasoning: seeing how shapes turn, flip and fit
together, and how one shape can be made of others. They lead naturally to
talk about triangles, squares and parallelograms, about area (every figure
uses the same pieces, so every figure has the same area) and about angles
of 45 and 90 degrees. Working with the cut-out pieces makes it a hands-on
activity for ages five to eleven, and the convex shapes still challenge
adults.

## History

The tangram (in Chinese *qiqiao ban*, "seven boards of skill") is first
recorded in China in the early nineteenth century; the earliest known book
of problems appeared around 1813. Trading ships carried it to America and
Europe, where a tangram craze swept through the 1810s and 1820s - Napoleon
in exile and Edgar Allan Poe are said to have owned sets. Sam Loyd's
*The Eighth Book of Tan* (1903) added an invented ancient history that
fooled readers for decades. In 1942 Fu Traing Wang and Chuan-Chih Hsiung
proved that exactly thirteen convex shapes can be made from the seven tans.

## This implementation

- **Spec knobs:** `difficulty` (Kids: every piece line drawn, full size;
  Easy: the two large triangles drawn, full size; Medium: the outline only,
  full size; Hard: four outlines at half size; Expert: four convex shapes
  at half size), `figure` (`auto`, `classic`, `assembled`, `convex`),
  `unit` (Pt per tangram unit; the cut-out square is four units across),
  `colour`, `cutouts`, `line`, `width`, `height`.
- **Generation:** targets come from three places. A curated table of 16
  picture figures (boat, house, fish, cat, swan, fir tree, castle...) and
  9 convex shapes, stored as outlines only (coordinates). The pieces of a
  table outline are found by exact cover on a 45° lattice: each unit
  square is cut by its diagonals into four quarter cells, and in the
  square's own orientation every tan is a union of whole quarter cells (64
  in all), so overlap is set intersection and the search is exact. Half of
  the table is drawn on that lattice turned an eighth (the orientation most
  tangram books use, with the square tan upright), tiled there and turned
  back. Assembled shapes are grown by a seeded search that lays the tans
  down one by one, each sharing a stretch of side with one already down and
  turned any of the eight ways; all geometry there is exact, in numbers of
  the form a + b times the square root of two. A grown shape is kept only if
  its outline is one simple polygon (no holes, no parts meeting at a single
  point), it fits the page, and its perimeter squared over its area lies
  between 24 and 46 - below is a blob, above a straggle of arms.
- **Solving:** none needed: every target is made from a real arrangement,
  so a solution exists by construction, and the key shows it in colour.
  Targets often have other solutions; the page says any way counts
  (`unique: false`, `solvable: true`).
- **Guarantees:** every target is checked before printing and again in
  tests (`answers_checked: true`): the seven pieces are exactly one set,
  each a true tan in one of its orientations; no two overlap (separating
  axes, exact); every piece shares a stretch of side with the rest; the
  outline is one simple polygon with exactly the set's area; and it is the
  outline printed. Tests re-check targets independently by sampling points
  in floating point (no point in two pieces, the pieces fill exactly the
  outline), check every table figure can be made, and check no two table
  figures are the same shape under any turn or flip. The page is rated by
  what it shows (`rating_basis: piece_lines_scale_and_convexity`): piece
  lines (Kids, Easy), an outline at the pieces' size (Medium), smaller
  outlines (Hard), only convex shapes (Expert). Expert with `figure:
  classic` or `assembled` is served as Hard, and a page too small to print
  the target at full size is rated Hard; meta keeps `requested_difficulty`.
  The table's convex shapes are 9 of the 13 possible ones.
