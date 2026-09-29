---
title: "Coordinate Grids"
blurb: "Coordinate grids — plot points, read coordinates, mystery pictures and shapes"
category: maths
version: "1.0.0"
---
Plot points, read coordinates, join the dots to find a mystery picture, and
name shapes from their vertices.

## What it is

A worksheet built on one large coordinate grid. There are four kinds of page:

- **Plot the points:** a list of named points such as A (3, 5) to plot and
  label.
- **Write the coordinates:** labelled points on the grid, with blanks for
  their coordinates.
- **Mystery picture:** a numbered list of points to plot in order and join
  with a ruler; "lift pencil" starts a new line. The finished lines draw a
  picture (a house, a fish, a rocket, a crown and more), and the child writes
  what it is.
- **Shapes on a grid:** the vertices of a few shapes, one shape to each part
  of the grid, to plot, join and name: square, rectangle, triangle, and at the
  higher levels right, isosceles and scalene triangles, parallelogram,
  trapezoid (trapezium), rhombus and kite.

Younger levels use the first quadrant, where both numbers count up from 0.
Older levels use all four quadrants, with the origin in the middle and
negative numbers to the left and below.

## How to play

A point's coordinates are two numbers in brackets: the first says how far to
go across, the second how far to go up. To plot (3, 5), start at 0, go
across 3, then up 5, and mark the point where the lines cross. Remember
"along the corridor, then up the stairs": across first, always.

On a four-quadrant grid a negative first number means go left instead of
right, and a negative second number means go down instead of up. A 0 means
don't move that way at all, so (0, 4) sits on the up-and-down axis.

For a mystery picture, plot each point and join it to the one before with a
ruler. When the list says LIFT PENCIL, start the next point fresh without
joining it to the last. For shapes, join the vertices in order and back to
the first, then look at the sides: are they equal, are any parallel, are
there right angles?

## Purpose

Coordinates are the bridge between number and space, and the start of every
graph a child will later draw. Plotting and reading points builds the
across-then-up habit; mystery pictures make a long practice set rewarding and
self-checking (a wrong point spoils the picture); naming shapes from their
vertices ties coordinates to the properties of shapes.

## History

René Descartes described locating points by two numbers in *La Géométrie*
(1637), which is why they are called Cartesian coordinates. Connect-the-points
mystery pictures on squared grids have been a classroom favourite for
generations; first-quadrant work usually comes around ages 8 to 10 and all
four quadrants a couple of years later.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`plot`, `read`, `mystery`,
  `shapes`); `quadrants` (`auto`, `first`, `four`); `locale` (`us`: trapezoid,
  right triangle; `uk` and `in`: trapezium, right-angled triangle); `count`
  (points 4-12 or shapes 2-4, 0 = the level's usual); page `width` and
  `height`; `line`.
- **Generation:** difficulty maps to grade. Kids (grade 2): first quadrant 0
  to 6 with five points, or 0 to 10 for pictures and shapes; the shortest
  pictures; only square, rectangle and triangle. Easy (grade 3): 0 to 10,
  eight points. Medium (grade 4): ten points including points on the axes,
  the full picture set, and right and isosceles triangles, parallelograms and
  trapezoids. Hard (grade 5): four quadrants from -6 to 6, every quadrant
  used, tilted squares and rectangles, rhombuses, kites and scalene
  triangles. Expert (grade 6): four quadrants from -10 to 10, twelve points
  including points on both axes, and pictures at double size. Named points
  are at least two squares apart so labels stay clear; the origin is never a
  named point. The 17 mystery pictures were drawn for this generator as
  whole-number point lists on a 0-10 grid; each page mirrors a picture at
  random and slides it anywhere it fits (across the origin on four-quadrant
  grids). Shapes come from templates with random sizes, a random quarter turn
  or flip, and a random place inside their own part of the grid.
- **Solving:** the answer key plots every point, draws the picture or shapes
  in red, and writes every coordinate, the picture's name and each shape's
  name.
- **Guarantees:** deterministic per seed. Every point is a whole-number point
  inside the axes, and the renderer logs each dot it draws: the tests map
  every dot's position on the page back to the grid and require exactly its
  own coordinates. The mystery key is read back from the drawn red lines and
  must equal the listed points, line for line and in order. Each shape's name
  is worked out with exact integer geometry (parallel sides by cross product,
  right angles by dot product, equal sides by squared lengths) and a shape is
  used only when that single most specific name is the intended one: no right
  isosceles triangles, no squares posing as rectangles; the tests name every
  shape a second way (by counting distinct side lengths, right angles and
  parallel pairs). Shapes never share a part of the grid. Meta carries
  `answers_checked` and `rating_basis: grid_and_task`.
