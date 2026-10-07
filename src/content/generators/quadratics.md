---
title: "Quadratics"
blurb: "Quadratics worksheet — factorising, the formula, completing the square, the discriminant, turning points and graphs, with exact surd answers"
category: maths
version: "1.1.0"
---
Factorise, use the formula, complete the square and read the parabola — every answer exact.

## What it is

A worksheet of four to twelve questions on quadratic equations and their
graphs. Each question gives an equation such as x² − 5x + 6 = 0, a curve
such as y = x² − 4x + 2, or a printed graph, and ends with answer lines:
x = ____ OR x = ____, P = ____ Q = ____, TURNING POINT ( ____ , ____ ).
Answers that are not whole numbers are written exactly — fractions such
as 3/2, and surds such as (−3 + √17)/4. The answer key fills in every
line and draws the sketches.

## How to play

- **Solving by factorising:** write the quadratic as two brackets that
  multiply to zero, then set each bracket to zero. x² + 3x − 10 =
  (x + 5)(x − 2) = 0 gives x = −5 or x = 2. Take out a common factor
  first when there is no number term: x² − 6x = x(x − 6). A difference of
  two squares factorises as 25x² − 81 = (5x − 9)(5x + 9).
- **The quadratic formula:** for ax² + bx + c = 0, x = (−b ± √(b² − 4ac))
  ÷ 2a. Simplify the square root (√72 = 6√2) and cancel any common factor
  with the bottom.
- **The discriminant:** b² − 4ac. Positive: two real roots. Zero: one
  (repeated) root. Negative: no real roots.
- **Completing the square:** x² + bx + c = (x + b/2)² + c − (b/2)². For
  ax² + bx + c, take a out of the first two terms first. The turning point
  of y = a(x + p)² + q is (−p, q).
- **Solving by completing the square:** write (x + p)² = k, take the
  square root of both sides (both signs), then subtract p.
- **Graphs:** the roots are where the curve crosses the x-axis, the
  y-intercept where it crosses the y-axis, and the turning point is the
  lowest (or highest) point, halfway between the roots. To sketch, mark
  these points and draw a smooth U shape through them (upside down when
  the x² term is negative).

Give the smaller root first. Leave answers exact: fractions and square
roots, not decimals.

## Purpose

Quadratics are the centre of high-school algebra: Common Core Algebra 1
(solving by factoring, completing the square and the quadratic formula,
HSA-REI.B.4, and interpreting key features of graphs, HSF-IF.B.4), the
higher tier of GCSE mathematics in England (including surds and
completed-square form), and chapter 4 of India's NCERT class 10 book
(Quadratic Equations, with the discriminant and the nature of roots).
The questions climb from equations with small whole-number roots to
surd answers, completed squares with halves, and finding a graph's
equation, so one page can practise a single method or mix them.

## History

Babylonian scribes solved quadratic problems around 2000 BC by a method
equivalent to completing the square, cut-and-paste with areas. Indian
mathematicians wrote general rules — Brahmagupta in 628 gave a solution
in words close to the modern formula — and al-Khwarizmi's *al-jabr*
(about 820), the book that named algebra, completed the square with
geometric pictures. Negative and irrational roots were accepted only
slowly; the formula in today's symbols took shape in the 1600s with
Descartes, and the word "discriminant" was coined by J. J. Sylvester in
1851.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `factorising`,
  `formula`, `completing_square`, `graphs`); `locale` (`us` factoring,
  vertex, simplest radical form; `uk` and `in` factorising, turning point,
  surd form); `count` (4-12; graph pages hold at most 6 — meta reports
  `requested_count`); `width`, `height`, `line`.
- **Since 1.1.0:** `line` scales every rule and diagram stroke on the
  page and its key (it was accepted but changed nothing before); a
  `count` outside its range is clamped and recorded as `requested_count`.
- **Generation:** Easy asks x² + bx + c = 0 with small whole roots,
  x² + bx = 0 and x² = k, and reading roots, intercept and turning point
  off a printed graph; Medium uses any signs, the difference of two
  squares, the formula with surd answers, the discriminant (no roots, one
  repeated root and two roots equally often), completing the square with
  even b, turning points and sketching; Hard uses ax² + bx + c with
  fraction roots, the formula with a > 1, completing the square with odd b
  (halves and quarters), solving by completing the square, and graphs that
  open downward; Expert rearranges x(x + k) = n first, uses negative a,
  a(x + p)² + q, solving by completing the square with odd b, and asks
  for the equation of a printed graph. Kids is served as Easy, and the
  formula and completing-the-square topics start at Medium (meta reports
  `requested_difficulty`). No quadratic repeats on a page. Graphs are drawn
  on a grid of whole units whose window holds the roots, the y-intercept
  and the turning point, all on grid crossings.
- **Solving:** roots are built from their factors (whole and fraction
  roots) or by the formula with the square root simplified to k√m and the
  common factor of the numerator and denominator cancelled; completed
  squares and turning points come from expanding a(x + p)² + q.
- **Guarantees:** `answers_checked` — every root is substituted back into
  its equation with exact arithmetic in the numbers u + v√m (rational u
  and v) and must give zero, and the two roots must differ (so they are
  the equation's only roots); each completed square must expand back to
  the quadratic; each turning point must make the gradient 2ax + b zero
  and lie on the curve; the discriminant and root count are recomputed;
  every graph answer must be a whole grid point inside the drawn window,
  and a graph's equation must fit every grid point the drawn curve passes
  through. The tests also read each printed equation back as text, solve
  it again in floating point, and check that a changed answer is caught,
  that every printed character is in the font, and that every topic,
  level, locale and count generates.
