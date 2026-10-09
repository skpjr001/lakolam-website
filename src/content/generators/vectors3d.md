---
title: "Vectors in 3D"
blurb: "3D vectors and lines — magnitudes, unit vectors, direction cosines, scalar and vector products, angles, areas, equations of lines, skew lines and shortest distances, every answer exact and re-checked"
category: maths
version: "1.0.0"
---
Magnitudes, unit vectors, scalar and vector products, equations of lines, and skew lines in three dimensions — every answer exact.

## What it is

A worksheet of four to ten questions on vectors and lines in space.
Vectors are given as ai + bj + ck (or as columns) with whole-number
parts. Find a magnitude, the vector between two points and its length, a
unit vector or the direction cosines; the scalar (dot) product, the
cosine of the angle between two vectors, and the value that makes two
vectors perpendicular; the vector (cross) product and the area of a
triangle or parallelogram; the vector and Cartesian equations of a line;
the angle between two lines; whether two lines are parallel, intersecting
or skew and where they meet; and the shortest distance between two lines.
Answers are whole numbers, fractions or surds in simplest form, and the
answer key writes each one in red.

## How to play

- **Magnitude:** the length of ai + bj + ck is the square root of
  (a × a + b × b + c × c). Simplify the root: root 24 is 2 root 6.
- **Vector AB:** take the coordinates of A away from those of B.
- **Unit vector and direction cosines:** divide each part by the
  magnitude. The three numbers you get are the direction cosines.
- **Scalar product:** multiply the matching parts and add:
  a.b = a1 b1 + a2 b2 + a3 b3. Two vectors are perpendicular exactly
  when this is 0. The cosine of the angle between them is
  (a.b) ÷ (|a| × |b|).
- **Vector product:** a × b = (a2 b3 – a3 b2) i + (a3 b1 – a1 b3) j +
  (a1 b2 – a2 b1) k. Its length is the area of the parallelogram with
  sides a and b; half of it is the area of the triangle.
- **Lines:** the line through the point A in the direction b is
  r = a + t b. In Cartesian form, (x – x1)/l = (y – y1)/m = (z – z1)/n,
  where (x1, y1, z1) is the point and l, m, n the direction. A line has
  many correct equations: any point on it and any multiple of its
  direction will do.
- **Angle between lines:** use the two directions in the cosine formula and
  take the acute angle (ignore a minus sign).
- **Parallel, intersecting or skew:** lines are parallel when their
  directions are multiples of each other. Otherwise set the two
  equations equal and solve for the two parameters using two of the
  three parts; if the third part agrees, the lines meet at that point,
  and if not they are skew.
- **Shortest distance:** for skew lines, it is |(a2 – a1).(b1 × b2)|
  ÷ |b1 × b2|; for parallel lines, |(a2 – a1) × b| ÷ |b|.

## Purpose

Vectors and three-dimensional geometry are 14 of the 80 marks in the
CBSE Class 12 mathematics paper (chapters 10 and 11), and the same skills
are in A-level Further Mathematics and in US multivariable calculus and
physics. The page gives graded practice with answers that can be checked
exactly.

## History

William Rowan Hamilton invented quaternions in 1843 and with them the
words "scalar" and "vector"; the i, j, k of his quaternions are the unit
vectors still used today. Josiah Willard Gibbs and Oliver Heaviside cut
quaternions down to the dot and cross products of modern vector analysis
in the 1880s. The equations of lines and planes in coordinates go back to
Descartes and Fermat, and direction cosines to Euler and Lagrange.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `vectors`, `products`,
  `lines`, `intersection`); `locale` (`uk` columns and r = a + tb, `in`
  ai + bj + ck with Cartesian equations of lines, `us` ai + bj + ck with
  "dot product" and "cross product"); `count` (4-10); `width` (300-2000
  Pt) and `height` (300-3000 Pt). Out-of-range values are clamped and
  reported in meta as `requested_*`.
- **Generation:** Easy: whole-number magnitudes, the vector AB with a
  whole length, unit vectors, scalar products. Medium: magnitudes as
  surds, direction cosines, the cosine of the angle between two vectors
  (with the angle in degrees when it is a standard one), the value making
  two vectors perpendicular, the line through a point with a given
  direction. Hard: vector products, areas, the line through two points,
  the angle between two lines, parallel / intersecting / skew. Expert:
  larger numbers and the shortest distance between skew or parallel
  lines. The `vectors` topic is set at Easy and Medium, `lines` at Medium
  and Hard, `intersection` at Hard and Expert; other requests are served
  at the nearest level and meta records `requested_difficulty`. Pairs of
  lines are built from their answer: a chosen meeting point for
  intersecting lines, a shift out of the plane of both directions for
  skew lines, a multiple of the direction for parallel lines.
- **Solving:** exact integer and rational arithmetic; surds are reduced
  to k root r with r square-free.
- **Guarantees:** every answer is re-derived by a second route:
  magnitudes, angles and distances in floating point (distances by
  minimising the gap between the lines through their normal equations,
  not the triple-product formula), triangle areas by Heron's formula, a
  vector product by perpendicularity to both vectors, Lagrange's identity
  for its length and the sign of Sarrus' determinant, unit vectors by
  exact unit length, a meeting point by substituting it into both lines,
  and line equations by checking the given points lie on them. Surds must
  be in simplest form. Meta: `answers_checked`, `unique`, `difficulty`,
  `rating_basis` (`question_forms_by_level`).
