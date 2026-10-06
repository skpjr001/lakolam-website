---
title: "Count the Shapes"
blurb: "Count the Shapes — how many triangles, rectangles or squares hide in the figure?"
category: maths
version: "1.0.0"
---
How many triangles are in this figure? More than you think.

## What it is

The classic counting puzzle. A figure - a triangle crossed by lines, a
square grid with diagonals, a rectangle cut into pieces - hides many more
shapes than it first seems to, because small pieces join up into bigger
shapes. Count every triangle (or every rectangle, or every square), small
and large, and write the total in the box.

## How to play

- Count every shape of the kind asked for, of every size.
- A shape counts when each of its sides lies along lines drawn in the
  figure. Its corners are where lines meet or end.
- Big shapes made of several small pieces count too, and shapes may
  overlap.
- A square is a rectangle too, so a rectangle count includes the squares.
  Tilted squares count as squares.
- Write the total in the box.

Count one size at a time: first the smallest pieces, then shapes made of
two pieces, then three, and so on up to the biggest. Number or tick each
shape as you find it, so you count nothing twice. In a triangle with lines
from the top corner, try counting the triangles that sit on each
horizontal line separately.

## Purpose

Careful, systematic counting: breaking a big search into cases, spotting
shapes inside shapes, and checking work. It builds visual attention and
early combinatorics, and suits brain-training books, classroom starters
and anyone who has argued over a viral "how many triangles?" picture.

## History

"How many triangles?" and "how many squares?" figures are old staples of
puzzle columns and recreational-mathematics books, and they spread widely
online as shareable challenges whose answers start arguments. The grid
versions connect to classic counting results: an n by n grid of squares
holds 1 + 4 + 9 + ... + n x n squares.

## This implementation

**Spec knobs:** `difficulty`; `target` (`triangles`, `rectangles`,
`squares`, or `mixed`, which takes the three in turn); `count` (1-4
figures; one column for one or two, two columns for more); page
`width`/`height`; `line`.

**Generation:** figures are built from segments with exact lattice
coordinates. Triangle figures: a triangle with lines from its top corner
and lines parallel to its base; a triangle with lines from two corners; a
triangle divided into rows of small triangles with some lines left out; a
grid of squares with one or both diagonals in each. Rectangle figures: a
grid with some inner edges left out, or a rectangle cut again and again
straight across one of its pieces. Square figures: grids with a few inner
edges left out. Figures in which a segment lies wholly on others, or in
which two corners come closer than 4% of the figure's size, are rejected so
every piece is big enough to see. Figures are redrawn until one lands in
the requested band, up to a budget, keeping the nearest.

**Solving:** the corners are every segment end and every crossing of two
segments, computed with exact fractions. Collinear segments are merged into
runs, and two corners are joined when one run holds both. A triangle is
three corners, not on one line, pairwise joined; a rectangle is four
corners joined in a cycle with right angles; a square also has equal
sides. Every triple and cycle is checked, so the count is exact. Difficulty
is the number of shapes: up to 6 Kids, 7-12 Easy, 13-24 Medium, 25-44 Hard,
45-80 Expert (`rating_basis`: `shape_count`); no figure holds more than 80,
so the key can show each one.

**Answer key:** the total, then every shape drawn on its own small copy of
the figure, coloured by size class: one class per distinct area when there
are at most six, otherwise five classes by the shape's share of the largest
shape's area. A legend gives the count in each class, smallest first.

**Guarantees:** deterministic per seed; every count is exact and is
recounted in tests by an independent method (each side checked stretch by
stretch for a drawn segment under its midpoint) and against known formulas -
fans, triangular grids (1, 5, 13, 27), full grids' rectangles and squares;
every listed shape is distinct (`answers_checked` in meta).
