---
title: "Area and Perimeter"
blurb: "Area and perimeter — grids, rectangles, composite shapes, triangles and trapezia"
category: maths
version: "1.0.0"
---
A page of shapes to measure: count squares on a grid, then work with
labelled rectangles, L, T and U shapes, triangles, parallelograms and
trapezia.

## What it is

An area and perimeter worksheet of four to nine shapes. The youngest pages
draw shapes on squared paper to count. Later pages label the sides of
rectangles and composite shapes made of rectangles (L, T and U shapes), with
some sides left unlabelled for the reader to work out. The highest levels add
triangles, parallelograms and trapezia, with a dashed line showing the
height. Each shape asks for its area, its perimeter, or the length of a side
marked with a question mark, sometimes from a given area or perimeter.

## How to play

**Area** is the space inside a shape, measured in squares. On a grid, count
the squares. For a rectangle, multiply length by width. For an L, T or U
shape, split it into rectangles, find each area, and add them. A triangle is
half of base times height; a parallelogram is base times height; a trapezium
is half the sum of the two parallel sides, times the height. The height is
always measured at right angles to the base (the dashed line), not along a
slanted side.

**Perimeter** is the distance all the way round the outside. Add up every
side. When a side has no label, work it out first: in a shape made of
rectangles, the sides facing one way add up to the sides facing the other
way (the right-hand sides together are as tall as the left-hand sides
together, and the top as long as the bottom). Opposite sides of a rectangle
or parallelogram are equal.

**Missing sides:** work backwards. If a rectangle's area is 40 and one side
is 4, the other is 40 divided by 4. If its perimeter is 30, half of it (15) is
one length plus one width.

Give each answer with its unit: centimetres (CM) or inches (IN) for lengths,
square units such as CM² for areas.

## Purpose

Area and perimeter are among the most confused ideas in primary maths,
because both are "how big is this shape". Practising both on the same shapes,
and moving from counting squares to formulas, builds the difference into
understanding. Composite shapes with unlabelled sides add the reasoning step
that tests and real problems (flooring a room, fencing a garden) demand.

## History

Measuring land by area is as old as farming: Egyptian surveyors re-marked
fields after each Nile flood, and the Rhind papyrus (about 1550 BC) works
areas of rectangles, triangles and trapezia. The formulas taught today are
those of Euclid and Heron of Alexandria, whose *Metrica* also finds the area
of a triangle from its three sides.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`mixed`, `area`, `perimeter` or
  `missing_side`); `locale` (`us` uses inches and feet, `uk` and `in`
  centimetres and metres); `count` (4-9 shapes); page `width` and `height`;
  `line`.
- **Generation:** difficulty maps to grade. Kids (grade 3) draws one or two
  joined rectangles on squared paper to count, for area and perimeter
  (missing sides at this level use small labelled rectangles). Easy (grade 4)
  uses labelled rectangles up to 12 units, including a missing side from a
  given area or perimeter. Medium (grade 5) adds L, T and U shapes with one
  side along each direction left unlabelled. Hard (grade 6) adds triangles
  and parallelograms with dashed heights, and missing heights or bases from
  a given area. Expert (grades 7-8) adds trapezia and prints a slant side
  next to the height as a distractor. Every corner is a whole-number point;
  slanted sides that are printed come from Pythagorean triples, so they are
  whole too. Composite outlines are kept chunky (no side under a fifth of the
  longest, no shape thinner than 3:5), and a labelling is only accepted if no
  label touches another label or a line at a range of print sizes. No two
  questions of the same kind share an answer on a page.
- **Solving:** each answer is the exact area (a shoelace sum over the whole
  corners, halves allowed), the perimeter, or the marked side; the answer key
  writes every answer in red on its line and replaces each "?" with its
  length.
- **Guarantees:** deterministic per seed. Every answer is worked out a second
  way, from the printed numbers only: rectilinear outlines are closed one
  direction at a time (the sides going one way must equal the sides coming
  back), which finds each unlabelled side, and the area is recomputed from the
  rebuilt outline; slanted shapes use their area formulas; missing sides come
  from the given area or perimeter. The tests check this agrees with the true
  answer for every shape at every level, that at most one side along each
  direction is unlabelled (so each is deducible), that hiding one more label
  makes the area undecidable, and that rectilinear areas equal a count of the
  unit squares inside. Difficulty is the grade-level shape set
  (`rating_basis: grade_level_shapes`).
