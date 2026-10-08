---
title: "Complex Numbers"
blurb: "Complex numbers — powers of i, arithmetic, conjugates and division, modulus and argument, Argand diagrams, complex roots of quadratics and square roots, all exact"
category: maths
version: "1.0.0"
---
Powers of i, complex arithmetic, modulus and argument, Argand diagrams and complex roots — every answer exact and checked.

## What it is

A worksheet of four to twelve questions on complex numbers. Simplify
powers of i; add, subtract, multiply and divide numbers such as 3 + 2i;
write down a conjugate; find the modulus as an exact surd and the
argument as an exact angle; plot points on an Argand diagram, or read the
numbers at points already plotted; solve quadratic equations whose roots
are complex; and find both square roots of a number such as 5 + 12i.
The answer key writes every answer in red and plots the points on the
diagrams.

## How to play

- **Powers of i:** i × i = –1, so the powers of i repeat every four:
  i, –1, –i, 1. Divide the power by 4 and use the remainder.
- **Adding and subtracting:** add the real parts and the imaginary parts
  separately.
- **Multiplying:** expand the brackets, then replace i × i by –1.
- **Conjugate:** the conjugate of a + bi (written z*) is a – bi.
- **Dividing:** multiply the top and the bottom by the conjugate of the
  bottom; the bottom becomes a whole number. Write the answer as a + bi.
- **Modulus:** the distance from 0: for a + bi it is the square root of
  a × a + b × b. Simplify the square root.
- **Argument:** the angle from the positive real axis to the point,
  anticlockwise positive, between –180° and 180° (between –π and π in
  radians). Draw a sketch to find the quadrant.
- **Argand diagram:** a + bi is the point a across (real axis) and b up
  (imaginary axis).
- **Quadratics:** use the quadratic formula; when the number under the
  root is negative, the roots are a pair of conjugates.
- **Square roots:** write (x + yi) × (x + yi) = a + bi, match the real
  and imaginary parts, and solve for whole numbers x and y. The other
  root is –(x + yi).

## Purpose

Complex numbers complete the number system so that every quadratic has
roots. The page covers Algebra 2 and Precalculus in the US (N-CN.1 to
N-CN.7), NCERT class 11 chapter 5 "Complex Numbers and Quadratic
Equations" (India), and A-level Further Mathematics (England), which adds
the modulus, argument and Argand diagram.

## History

Gerolamo Cardano met square roots of negative numbers in 1545 while
solving cubics, and Rafael Bombelli gave rules for computing with them in
1572. Euler wrote i for the square root of –1 in 1777. Caspar Wessel
(1799) and Jean-Robert Argand (1806) pictured complex numbers as points
in a plane, and Gauss's use of that picture made it standard; the name
"complex number" is his.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `arithmetic`, `polar`,
  `argand`, `equations`); `locale` (`uk` and `in` give arguments in
  radians as fractions of π, `us` in degrees; `in` says "principal argument"); `count` (4-12, default 8); `width`
  (300-2000 Pt) and `height` (300-3000 Pt). Out-of-range values are
  clamped and reported in meta as `requested_*`. Pages narrower than
  460 Pt use one column.
- **Generation:** Easy: powers of i up to 12, sums and differences,
  conjugates, plotting three points in the first quadrant, reading
  points. Medium: products, powers of i up to 99, the modulus as a
  simplified surd, four points in every quadrant and on the axes. Hard:
  squares and products, quotients with whole-number answers (chosen
  first), modulus and argument of multiples of 45°, plotting z, z* and
  –z, quadratics z² + bz + c. Expert: quotients with fraction answers,
  modulus and argument of numbers like 2 + 2√3 i (30° and 60°), plotting
  iz as well, square roots of a + bi, quadratics with a leading
  coefficient 2-4 and rational complex roots.
- **Solving:** exact Gaussian rationals (fractions for both parts); the
  argument is decided exactly from the squares of the parts.
- **Guarantees:** every answer is re-derived exactly — powers of i by the
  cycle and by repeated multiplication, a quotient by multiplying back,
  quadratic roots by substituting into the equation (a pair of distinct
  conjugates, so both roots), square roots by squaring (a quadratic has
  only two roots) — and the modulus and argument agree with
  floating-point hypot and atan2. Points lie on the drawn grid. The polar
  topic starts at Medium and equations at Hard; a lower request is served
  at that level and the meta records `requested_difficulty`. Meta:
  `answers_checked`, `unique`, `difficulty`, `rating_basis`
  (`question_forms_by_level`).
