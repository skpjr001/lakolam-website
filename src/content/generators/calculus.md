---
title: "Calculus"
blurb: "Calculus — differentiate and integrate powers of x, gradients, tangents and normals, stationary points, definite integrals and areas, every integral checked by differentiating it back"
category: maths
version: "1.0.0"
---
Differentiate and integrate powers of x — gradients, tangents, stationary points and areas, every answer exact and checked.

## What it is

A worksheet of four to twelve calculus questions. Differentiate a
polynomial such as y = 2x³ – 5x + 1; find the gradient of a curve at a
point; write the equation of the tangent or the normal there; find the
stationary points of a curve and say whether each is a maximum or a
minimum; integrate (remembering + C); evaluate a definite integral; find
the area between a curve and the x-axis; and find the equation of a curve
from its gradient and one point on it. Higher levels bring negative and
fractional powers written as 3/x² and 4√x, and brackets or fractions to
simplify first. The answer key writes every answer in red.

## How to play

- **Differentiate (the power rule):** for a term ax^n the derivative is
  nax^(n – 1): multiply by the power, then take one off the power. A
  number on its own differentiates to 0. Do each term separately.
- **Rewrite first:** write 3/x² as 3x^-2 and √x as x^(1/2) before you
  differentiate or integrate. Multiply out brackets and split fractions
  such as (x³ + 4)/x² into x + 4x^-2.
- **Gradient at a point:** differentiate, then put the x value in.
- **Tangent and normal:** the tangent has the gradient m you just found
  and passes through the point on the curve; find c from y = mx + c. The
  normal is at right angles to it, so its gradient is –1/m.
- **Stationary points:** set the derivative equal to 0 and solve. Find
  each y by putting x into the curve. Differentiate again: if the second
  derivative is negative the point is a maximum, if positive a minimum.
- **Integrate:** for ax^n the integral is ax^(n + 1)/(n + 1): add one to
  the power, then divide by the new power. Always add + C.
- **Definite integrals and area:** integrate (no + C needed), put in the
  top limit, put in the bottom limit, and subtract.
- **A curve from its gradient:** integrate, then put the given point in
  to find C.

Give exact answers: whole numbers or fractions in lowest terms.

## Purpose

Differentiation and integration from first principles of the power rule
are the opening of calculus everywhere it is taught: A-level Mathematics
Year 1 pure content in England, AP Calculus AB units 2–6 in the US, and
NCERT classes 11 and 12 in India (Limits and Derivatives, Application of
Derivatives, Integrals, Application of Integrals). Repeated practice of
these routine forms frees attention for the ideas behind them.

## History

Isaac Newton (his "fluxions", from 1665) and Gottfried Wilhelm Leibniz
(published 1684) invented calculus independently. The notation dy/dx and
the long S of the integral sign ∫, from "summa", are Leibniz's; the
prime notation f′(x) is Joseph-Louis Lagrange's, from 1797. The
fundamental theorem — that integrating undoes differentiating — is what
lets a definite integral be found from an antiderivative.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `differentiate`,
  `gradient`, `stationary`, `integrate`, `definite`); `locale` (`uk` and
  `in` write y = … and dy/dx, `us` writes f(x) = … and f′(x) and says
  "derivative", "critical points" and "max/min"); `count` (4-12);
  `width` (300-2000 Pt) and `height` (300-3000 Pt). Out-of-range values
  are clamped and reported in meta as `requested_*`.
- **Generation:** every expression is a sum of terms c·x^e with exact
  rational c and e. Easy: polynomials up to x³, gradients at whole
  numbers, integrals whose coefficients come out whole, definite
  integrals with whole-number values. Medium: polynomials up to x⁵,
  fractional integral coefficients, tangents, a quadratic's turning
  point. Hard: negative and half powers written as fractions and roots,
  products to expand, normals, cubics' two stationary points, areas under
  a curve k(x – p)(q – x) between its roots or inside them. Expert:
  quotients to split, quartics with three stationary points, the x values
  where a cubic's gradient takes a value, and a curve from its gradient
  and a point. Stationary points are built from chosen whole-number roots
  of the derivative, so they are exact; points where a curve is evaluated
  are perfect squares when it has half powers.
- **Solving:** the power rule is applied term by term on exact
  fractions; definite integrals evaluate the antiderivative at the limits
  exactly (x^(p/q) only at perfect powers).
- **Guarantees:** each derivative is recomputed and compared with a
  central finite difference at four points; each integral is
  differentiated back to the integrand (and has no constant term besides
  + C); a definite integral or area is recomputed from the antiderivative
  and by Simpson's rule; an area's curve is proven never to dip below the
  axis (no root strictly inside the interval); stationary points are
  every rational root of the derivative (found by the rational root
  theorem, which must account for all of its roots), with the nature read
  from the curve either side; a tangent passes through the point with the
  derivative's gradient, a normal with –1/m. Stationary points start at
  Medium: a lower request is served at Medium and the meta records
  `requested_difficulty`. Meta: `answers_checked`, `unique`,
  `difficulty`, `rating_basis` (`question_forms_by_level`),
  `integrals_checked_by`.
