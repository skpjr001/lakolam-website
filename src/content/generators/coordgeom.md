---
title: "Coordinate Geometry"
blurb: "Coordinate geometry — gradient, midpoint, exact distance, the section formula, equations of lines, parallel and perpendicular lines"
category: maths
version: "1.0.0"
---
Slope, midpoint, exact distance, the section formula and the equations of lines — every answer exact.

## What it is

A worksheet of four to twelve questions about points and lines on the
coordinate plane, with every point given by its coordinates. Find the
gradient (slope) of the line through two points, a midpoint, or a missing
endpoint; the distance between two points as a whole number or in
simplest surd (radical) form; the point that divides a segment in a given
ratio, or the ratio itself; the equation of a line through two points or
through a point with a given gradient; and whether two lines are
parallel, perpendicular or neither, with the lines through a point that
are parallel or perpendicular to a given one, and perpendicular
bisectors. A few questions put a box in place of a coordinate to be
found. The answer key fills in every answer.

## How to play

- **Gradient (slope):** rise over run — (y2 – y1) ÷ (x2 – x1). A line
  going up to the right has a positive gradient; a horizontal line has
  gradient 0; a vertical line's gradient is undefined.
- **Midpoint:** the average of the x-coordinates and the average of the
  y-coordinates. To find an endpoint B from A and the midpoint M, go from
  A to M and the same again: B = 2M – A.
- **Distance:** AB = √((x2 – x1)^2 + (y2 – y1)^2) — Pythagoras on the
  run and the rise. Simplify the square root: √72 = √36 × √2 = 6√2.
- **Section formula:** the point dividing AB internally in the ratio
  m:n is ((n·x1 + m·x2) ÷ (m + n), (n·y1 + m·y2) ÷ (m + n)) — it lies
  m/(m + n) of the way from A to B. To find the ratio, compare how far P
  is from A with how far it is from B, along x or along y.
- **Equation of a line:** find the gradient m, then the intercept c from
  y = mx + c using one of the points. Give the answer as y = mx + c (a
  vertical line is x = a number).
- **Parallel and perpendicular:** parallel lines have the same gradient.
  Perpendicular gradients multiply to –1, so the perpendicular gradient
  is the negative reciprocal: 2/3 becomes –3/2. Rearrange an equation
  like 2x + 3y = 6 into y = … to read its gradient. The perpendicular
  bisector of AB goes through the midpoint at right angles to AB.
- **A box for a coordinate:** write what you know (the gradient, or the
  distance) with the box as the unknown and solve. A distance can give
  two answers — one on each side.

Answers are exact: whole numbers, fractions in lowest terms, or surds in
simplest form.

## Purpose

Coordinate geometry joins algebra to pictures, and every curriculum
teaches it: Common Core grade 8 (slope, 8.EE.6 and 8.F) and high-school
geometry G-GPE (slopes of parallel and perpendicular lines, partitioning
a segment in a ratio, distance), GCSE Mathematics in England (gradients,
midpoints, equations of lines, perpendicular lines at Higher tier), and
chapter 7 of India's NCERT class 10 book, "Coordinate Geometry" (the
distance formula, the section formula and the ratio a point divides a
segment in). Drawing and reading lines on a grid lives on the line-graph
worksheet; this page is the algebra of coordinates.

## History

René Descartes' *La Géométrie* (1637) and Pierre de Fermat's
contemporaneous work joined geometry to algebra by naming points with
numbers, so that lines and curves became equations. The slope-intercept
form y = mx + c became standard school notation (an early use is Matthew
O'Brien's 1844 *Treatise on Plane Co-ordinate Geometry*; the UK still
writes c for the intercept, the US b). The section formula is the
coordinate form of dividing a segment in a ratio, a construction already
in Euclid.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `gradient`, `midpoint`,
  `distance`, `section`, `lines`, `parallel`); `locale` (`us` "slope" and
  "radical form"; `uk`, `in` "gradient" and "surd form"); `count` (4-12);
  `width`, `height`, `line` (clamped to sensible page sizes).
- **Generation:** points have whole coordinates. Easy keeps to the first
  quadrant (0 to 10) with whole, positive gradients, whole midpoints and
  whole distances (from Pythagorean triples) and lines with whole gradient
  and intercept. Medium uses -9 to 9, fractional gradients and midpoints,
  whole section points, lines with fractional gradients, and "parallel,
  perpendicular or neither?". Hard asks distances only in surd form, a
  coordinate in a box from a gradient, an endpoint from a midpoint,
  fractional section points, a line through a point with a gradient, a
  parallel line through a point, and vertical or horizontal lines now and
  then; some given lines are printed as ax + by = c. Expert adds
  perpendicular lines through a point, perpendicular bisectors, the ratio
  a point divides a segment in, and a coordinate from a distance (two
  answers). The section and parallel topics start at Medium (lower
  requests are served there, and meta records `requested_difficulty`);
  Kids is served as Easy. No question repeats on a page.
- **Solving:** answers are computed exactly from the coordinates (lines
  kept as whole-number a·x + b·y = c in lowest terms and printed as
  y = mx + c); surds are simplified by taking out the largest square
  factor.
- **Guarantees:** `answers_checked` and `unique` — each answer is checked
  by a property rather than the formula that produced it: the rise is the
  run times the gradient; A + B = 2M; k^2·r equals the squared distance
  with r square-free; n·A + m·B = (m + n)·P; a line's equation is
  satisfied by its points and has the stated gradient; perpendicular
  normals have zero dot product. A boxed coordinate is proven to be the
  only whole number (or the only two) that works by trying every value
  from -60 to 60. The tests recompute every answer by the textbook
  formulas, compare surds in floating point, check each level's promises,
  that the key writes in red where the page is blank (surds drawn with a
  real radical sign), and that every printed character is in the font.
