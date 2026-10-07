---
title: "2D Shapes"
blurb: "2D shapes — name them, count sides and vertices, right angles and parallel sides, classify triangles and quadrilaterals, regular or irregular"
category: maths
version: "1.0.0"
---
Name the shape, count its sides and corners, and sort out squares, rhombuses, kites and trapezoids.

## What it is

A page of four to twelve flat shapes, each in its own box with one or two
questions underneath: NAME, SIDES and VERTICES (CORNERS for younger
children), RIGHT ANGLES and PARALLEL PAIRS, a triangle BY SIDES and BY
ANGLES, or a polygon's name and whether it is REGULAR. The hardest pages
show a quadrilateral with six names beside it — square, rectangle,
rhombus, parallelogram, trapezoid (trapezium) and kite — to mark every one
that fits. Shapes are drawn turned and flipped, long and thin as well as
neat, so they have to be recognised by their properties rather than by
how they usually sit in a book. The answer key fills in every line and
ticks every name that fits.

## How to play

Look carefully at each shape before you answer.

- **Sides and vertices:** a side is a straight edge; a vertex (corner) is
  where two sides meet. Put a dot on each corner as you count so you do not
  count one twice. Circles and ovals have no straight sides and no corners.
- **Names by sides:** 3 sides triangle, 4 quadrilateral, 5 pentagon, 6
  hexagon, 7 heptagon, 8 octagon, 9 nonagon, 10 decagon. A shape with a
  dent in it still has its name by its sides.
- **Right angles:** a square corner, like the corner of a page. Check with
  the corner of a piece of paper.
- **Parallel sides:** two sides that point the same way and would never
  meet, however far they went. Count the pairs.
- **Quadrilaterals:** a square has four equal sides and four right angles; a
  rectangle has four right angles; a rhombus has four equal sides; a
  parallelogram has two pairs of parallel sides; a trapezoid (trapezium) has
  exactly one pair; a kite has two pairs of equal sides next to each other.
  Give the most exact name — a square is a square, even when it stands on
  a corner like a diamond. When asked for every name that fits, remember
  that a square is also a rectangle, a rhombus, a parallelogram and a kite.
- **Triangles by sides:** equilateral (all three sides equal), isosceles
  (two equal), scalene (none equal). **By angles:** right (right-angled)
  has a right angle, obtuse has an angle bigger than a right angle, acute
  has all three angles smaller than a right angle.
- **Regular:** a regular polygon has all its sides equal *and* all its
  angles equal. A rhombus has equal sides but is not regular; a rectangle
  has equal angles but is not regular.

## Purpose

Shape properties run through every primary curriculum: the US Common Core
asks kindergartners to name shapes "regardless of their orientations or
overall size", grade 2 to recognise shapes by their angles and faces,
grade 3 to see that rhombuses, rectangles and squares are all
quadrilaterals, grade 4 to classify by parallel lines and right angles,
and grade 5 to place shapes in a hierarchy. England's curriculum moves from
recognising and naming common 2D shapes (Year 1) to comparing and
classifying triangles and quadrilaterals (Year 4) and regular and
irregular polygons (Year 5); CBSE/NCERT covers the same ground through
classes 1 to 8. Drawing shapes at any angle and proportion is the point:
children who have only seen a triangle sitting on its base often fail to
recognise one standing on a corner.

## History

Euclid's *Elements* (about 300 BC) defined the triangles and
quadrilaterals by their sides and angles — his rhombus and "trapezia" are
the source of today's words — and ranked them in the first systematic
classification of figures. "Polygon" is Greek for "many angles", and the
names pentagon to decagon simply count them. The kindergarten movement of
Friedrich Froebel in the 1830s made sorting wooden shapes a basic
childhood activity, and the van Hiele model of the 1950s explained why
pupils must first recognise shapes, then describe their properties, and
only later see that one class sits inside another. The trapezoid has two
competing definitions to this day: exactly one pair of parallel sides, or
at least one.

## This implementation

- **Spec knobs:** `difficulty`; `task` (`mixed`, `name`, `sides_vertices`,
  `properties`, `quadrilaterals`, `triangles`, `regular`); `locale` (`us`
  trapezoid and "right"; `uk` and `in` trapezium and "right-angled");
  `trapezoid` (`exclusive`: exactly one pair of parallel sides, or
  `inclusive`: at least one, so every parallelogram is also a trapezoid);
  `count` (4-12); `color` (soft fills); `width`, `height`, `line`.
- **Generation:** each shape is built from its class with exact
  constructions — regular polygons from equal turns, a rhombus from a side
  and an angle, a kite from two perpendicular diagonals, a parallelogram
  from two sides and an angle, triangles from three angles by the law of
  sines, equal-sided hexagons and octagons with alternating angles (and
  equal-angled ones with alternating sides) as traps for "regular", and
  dented (concave) polygons drawn around a centre — then turned to any
  angle and possibly flipped (Kids keeps shapes within 12° of upright).
  Kids uses circles, ovals, triangles, squares, rectangles and hexagons;
  Easy adds pentagons, octagons, rhombuses and irregular shapes; Medium
  adds every quadrilateral, right angles and parallel sides, and triangles
  by sides; Hard adds triangles by angles, regular or irregular, concave
  shapes and nonagons and decagons; Expert asks for every name a
  quadrilateral has. Right angles and parallel sides are only asked about
  convex shapes, where parallel sides always come in separate pairs.
  Questions asked below a task's first level are served at that level
  (properties, quadrilaterals and triangles from Medium, regular from Hard)
  and meta records `requested_difficulty`.
- **Solving:** the generator classifies every shape from its drawn
  coordinates alone: side lengths, interior angles (reflex at a dent),
  convexity, right angles, every pair of parallel sides, and from those the
  quadrilateral's most exact class and every class it belongs to, the
  triangle's type by sides and by angles, and regularity.
- **Guarantees:** `answers_checked` — a shape is kept only when its
  re-classification agrees with the class it was built from, and when it is
  visibly what it is: two sides of a triangle or quadrilateral are equal or
  differ by at least 12% (a larger polygon is equal-sided or clearly
  uneven), an angle is a right angle or at least 8° from one, two sides are
  parallel or at least 10° from it, and no corner is nearly straight. The
  tests check every answer against an independent classifier that uses only
  distances and slopes — Pythagoras for right angles, diagonals that bisect
  each other (parallelogram), are equal (rectangle) or perpendicular
  (rhombus) — and the "every name that fits" lists under both trapezoid
  definitions.
