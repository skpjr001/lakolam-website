---
title: "Numerical Methods"
blurb: "Numerical methods — change of sign and when it fails, fixed-point iteration with staircase and cobweb diagrams, Newton-Raphson and the trapezium rule with over- or under-estimates, every value exact before it is rounded"
category: maths
version: "1.0.0"
---
Find roots and areas you cannot get exactly — by change of sign, iteration, Newton-Raphson and the trapezium rule.

## What it is

A worksheet on the numerical methods of A-level mathematics. Each question
gives a cubic or quadratic and asks you to carry out one method by hand:
show that a root lies in an interval (or notice when the sign test fails),
run a fixed-point iteration and draw its staircase or cobweb on a printed
graph, take Newton-Raphson steps, or estimate an area with the trapezium
rule and say whether the estimate is too big or too small. A key with every
value, the drawn staircases and cobwebs and the filled-in tables comes with
it.

## How to play

- Change of sign: work out f at both ends of the interval. If one value is
  positive and the other negative, the graph crosses the axis in between,
  so there is a root there. To show a root is, say, 1.23 to 2 decimal
  places, use the ends 1.225 and 1.235.
- The test can fail. If the curve only touches the axis (a repeated root),
  or crosses it twice between the ends, the two values have the same sign
  although roots are there. Count the roots from the factorised form.
- Iteration: start with x0, put it into the formula to get x1, put x1 in to
  get x2, and so on. On the graph, go up from x0 to the curve, across to the
  line y = x, up or down to the curve again, and repeat. If the steps march
  in one direction it is a staircase; if they spiral round the root it is a
  cobweb.
- Newton-Raphson: x1 = x0 – f(x0) / f'(x0), then the same again from x1. The
  method cannot start where f'(x0) = 0: the tangent there is flat and never
  meets the axis.
- Trapezium rule: fill in the table of y values, then area is about half the strip
  width × (first y + last y + 2 × the sum of all the others). If the curve
  bends upwards (f'' positive) the straight tops sit above it and the rule
  over-estimates; if it bends downwards it under-estimates.
- Round answers to the number of decimal places given at the top unless a
  question says otherwise. A value that comes out exactly with fewer places
  is written as it is.

## Purpose

Numerical methods are in every A-level mathematics specification (AQA 7357
section I, Edexcel 9MA0, OCR H240). The skills are routine but error-prone:
substituting decimals into cubics, keeping enough places through repeated
iterations, and explaining why a method fails. Drilling them with checked
answers frees class time for the reasoning — why a sign change proves a
root, why a cobweb converges, why a convex curve makes the trapezium rule
over-estimate.

## History

Bisection by change of sign rests on the intermediate value theorem, proved
by Bolzano in 1817 and Cauchy in 1821. Newton described his method in 1669
for x³ – 2x – 5 = 0 (one of the questions this page can set is that
cubic's family); Raphson published the simpler iterative form in 1690.
Fixed-point iteration is as old as Heron's square roots; staircase and
cobweb diagrams became the standard teaching picture in the twentieth
century. The trapezium rule goes back to Babylonian astronomers, who used it
to track Jupiter around 350–50 BC.

## This implementation

**Spec knobs.** `difficulty` (Easy to Expert; Kids is served as Easy) sets
the interval precision, the number of iterations and Newton-Raphson steps,
the degree and strip count for the trapezium rule, and which follow-up
questions are asked. `topic` is `mixed` (the default: all four methods) or
one of `change_of_sign`, `iteration`, `newton_raphson`, `trapezium`.
`count` is the number of questions (3-8), `places` the decimal places for
rounded answers (2-6); sign-test values near a root are given one place
more than the interval ends when that is more. `width`, `height` and `line`
size the page. Out-of-range values are clamped and recorded in meta
(`requested_count`, `requested_places`).

**Generation.** Functions are polynomials with small integer coefficients:
random cubics (a simple real root found numerically, only to place the
interval), cubics built from chosen factors for the failed sign tests, and
iterations x = (±x² + c)/d whose fixed point has slope between 0.2 and 0.75
in size, so the steps visibly converge (positive slope: staircase; negative:
cobweb). Every starting value, interval end and strip width is a short
decimal, so every printed value is an exact rational before it is rounded.
Easy: whole-number intervals, two iterations, one Newton-Raphson step, a
quadratic over four strips of width 1. Medium: one-decimal intervals and a
failed sign test, three iterations and the staircase/cobweb question, two
Newton-Raphson steps, strips of 0.5 and over/under-estimates. Hard: show a
root to 2 decimal places, Newton-Raphson from a one-decimal start, cubics
under 4-6 strips. Expert: a root to 3 decimal places, four iterations,
three Newton-Raphson steps and a start where f'(x0) = 0, 6-8 strips and the
exact integral.

**Solving.** Answers are computed with exact rationals (i128): f at the
interval ends, every iterate, every Newton-Raphson step, the table values,
the trapezium sum and the exact integral. A candidate whose numbers would
overflow is discarded.

**Guarantees.** A printed decimal is exact when the value terminates within
the places asked for, otherwise it is rounded half away from zero; a
question is discarded if any rounded value lies within 10⁻⁹ of a rounding
boundary or rounds to zero, so the key cannot depend on how the rounding is
done. Every answer is re-checked by a second route before the page is
drawn: values recomputed in floating point (each printed decimal must be
within half a unit in its last place of it), the number of roots in a
failed sign test counted by a Sturm sequence on the expanded polynomial
(the generator counts the factors it built), the staircase/cobweb answer
from a numerical derivative at the fixed point, and the over/under answer
by comparing the estimate with Simpson's rule, which is exact for cubics.
Sign-test intervals hold exactly one root; trapezium tables are positive
and the curve's concavity has one sign over the whole interval. Meta
records `answers_checked`, `difficulty`, `rating_basis`
(`method_steps_and_precision_by_level`) and every question with its
answers.
