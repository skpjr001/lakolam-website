---
title: "Circles and Conics"
blurb: "Circles and conics — centre and radius, completing the square, the equation of a circle, tangents and where lines meet, and the parabola, ellipse and hyperbola, every answer checked against the curve's definition"
category: maths
version: "1.0.0"
---
Centres, radii, tangents and the parabola, ellipse and hyperbola — exact answers, each checked against the curve itself.

## What it is

A worksheet of four to ten questions on the equation of a circle and the
conic sections. Read the centre and radius from (x – a)² + (y – b)² = r²,
or from the general form x² + y² + Dx + Ey + F = 0 by completing the
square; write the equation of a circle from its centre and radius, its
centre and a point, or the ends of a diameter; decide whether a point is
inside, on or outside a circle; find the tangent at a point; say how many
times a line meets a circle and where. The conic questions give a
parabola, an ellipse or a hyperbola in standard form, with a sketch, and
ask for its focus and directrix or vertices and foci, its eccentricity
and the length of its latus rectum. The answer key writes every answer in
red and marks the foci (and a parabola's directrix) on the sketch.

## How to play

- **Centre and radius:** (x – a)^2 + (y – b)^2 = r^2 has centre (a, b) and
  radius r. Watch the signs: (x + 3) means a = –3. Simplify a square root
  such as the square root of 20 to 2 times the square root of 5.
- **Completing the square:** group the x terms and the y terms. Halve the
  coefficient of x to get the bracket (x + 2), and subtract 2 squared; do
  the same for y. Move the numbers to the right. If every term has a
  common factor, such as 2x^2 + 2y^2 + ..., divide by it first.
- **Writing the equation:** the radius squared is the squared distance
  from the centre to a point on the circle. For a diameter, the centre is
  the midpoint of its ends.
- **Inside, on or outside:** compare the squared distance from the
  centre with r squared.
- **Tangent:** the tangent is at right angles to the radius. Find the
  gradient of the radius to the point, take the negative reciprocal, and
  use y = mx + c through the point.
- **A line and a circle:** substitute the line into the circle to get a
  quadratic in x. Its discriminant b^2 – 4ac is positive for two points,
  zero for one (a tangent) and negative for none. Solve it to find where
  they meet.
- **Parabola y^2 = 4ax:** the focus is (a, 0), the directrix is x = –a,
  and the latus rectum is 4a long. For x^2 = 4ay, swap x and y.
- **Ellipse x^2/a^2 + y^2/b^2 = 1 (a > b):** vertices (+/-a, 0); c^2 = a^2 – b^2;
  foci (+/-c, 0); eccentricity e = c/a; latus rectum 2b^2/a. If the larger
  number is under y^2, the long axis is the y-axis.
- **Hyperbola x^2/a^2 – y^2/b^2 = 1:** vertices (+/-a, 0); c^2 = a^2 + b^2; foci
  (+/-c, 0); e = c/a; latus rectum 2b^2/a.

## Purpose

The equation of a circle is A-level Mathematics pure content (coordinate
geometry), GCSE Higher (a circle centred at the origin and its tangent),
and Common Core HSG-GPE.A.1. The conic sections are NCERT class 11
chapter 11. Working from an equation to a picture and back builds the
link between algebra and geometry.

## History

Menaechmus discovered the conic sections around 350 BCE while trying to
double the cube, and Apollonius of Perga named the parabola, ellipse and
hyperbola in his *Conics* (about 200 BCE). The focus–directrix property
is due to Pappus of Alexandria. Descartes and Fermat gave the curves
their equations in the seventeenth century, and Kepler showed in 1609
that the planets move in ellipses with the Sun at a focus.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `centre_radius`,
  `equation`, `lines`, `conics`); `count` (4-10); `width` (300-2000 Pt)
  and `height` (300-3000 Pt). Out-of-range values are clamped and
  reported in meta as `requested_*`.
- **Generation:** Easy: whole-number centres and radii, the equation from
  a centre and radius, a point inside, on or outside. Medium: radii as
  surds, the equation through a point, the tangent at a whole-number
  point of the circle, the parabola. Hard: the general form by completing
  the square, the ends of a diameter, how many times a line meets a
  circle, ellipses and hyperbolas built on Pythagorean triples so that c
  is whole. Expert: general forms with a common factor 2 or 3 or a
  half-whole centre, the equation in general form (a diameter's ends may
  give a half-whole centre), where a line through two lattice points of
  the circle meets it, and an ellipse from its vertices and foci. Points
  on circles come from sums of two squares, so every tangent point and
  meeting point is whole. Conics start at Medium: a lower request is
  served at Medium and recorded as `requested_difficulty`.
- **Solving:** exact fractions; a radius is put in simplest surd form
  c√m with m square-free; a line's meetings come from the discriminant of
  the substituted quadratic.
- **Guarantees:** each answer is checked without the generator's route:
  a centre and radius by expanding the answer and matching every printed
  coefficient; an equation by the given point (or both diameter ends)
  lying on it and the centre being their midpoint; a point's position by
  its distance from the centre in floating point; a tangent by passing
  through the point and lying exactly one radius from the centre; a
  line's meeting count by the perpendicular distance from the centre
  (not the discriminant), and each meeting point by lying on both; a
  parabola's focus and directrix by the focus–directrix property at 16
  points of the curve, ellipse and hyperbola foci by the sum or
  difference of focal distances at 16 points. No two questions on a page
  are the same. Meta: `answers_checked`, `unique`, `difficulty`,
  `rating_basis` (`question_forms_by_level`), `checked_by`.
