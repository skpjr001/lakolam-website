---
title: "Surds"
blurb: "Surds (radicals) — simplify, add, multiply, expand brackets, rationalise denominators, rational or irrational"
category: maths
version: "1.0.0"
---
Simplify, add, multiply and expand surds, rationalise denominators and spot the irrational numbers — every answer in simplest surd form.

## What it is

A worksheet of four to twenty-four questions on surds (square roots that
do not come out exactly, called radicals in the US). Simplify a single
surd such as √72, or the root of a fraction; collect like surds such as
√12 + √27; multiply and divide them; expand brackets such as
(2 + √3)(1 – √3) or (√5 – 2√3) squared; rationalise a denominator,
including by multiplying by the conjugate; and decide whether a number
is rational or irrational. Roots are drawn with a proper root sign and
fractions are stacked. The answer key writes every answer in red.

## How to play

Below, "root 72" means the square root of 72.

- **Simplify a surd:** find the largest square number that divides the
  number under the root, and take its root outside:
  root 72 = root 36 × root 2 = 6 root 2. For a fraction, take the root of
  the top and of the bottom: root (18/25) = (3 root 2)/5.
- **Add and subtract:** only like surds combine, the way like terms do.
  Simplify each surd first: root 12 + root 27 = 2 root 3 + 3 root 3
  = 5 root 3. Unlike surds such as 2 root 2 and 3 root 3 stay separate.
- **Multiply and divide:** root a × root b = root (ab), and
  root a ÷ root b = root (a/b). Multiply the numbers in front separately:
  2 root 3 × 5 root 6 = 10 root 18 = 30 root 2. A surd times itself is the
  number under it: root 5 × root 5 = 5.
- **Expand brackets:** multiply every term in one bracket by every term in
  the other, then collect. (a + root b)(a – root b) = a × a – b, with no
  surd left.
- **Rationalise the denominator:** to clear a root from the bottom of a
  fraction, multiply top and bottom by that root:
  6/root 3 = (6 root 3)/3 = 2 root 3. If the bottom is a + root b,
  multiply top and bottom by a – root b (the conjugate); the bottom
  becomes a × a – b, a whole number.
- **Rational or irrational?** Work the number out exactly. If no root is
  left it is rational (a fraction or a whole number); if a surd remains it
  is irrational.

Write answers in simplest form: as few surds as possible, the number
under each root as small as possible, no root on the bottom of a fraction,
and a fraction in lowest terms.

## Purpose

Surds keep answers exact where a calculator would round them — the
diagonal of a unit square is √2, not 1.414 — and handling them is a
standard step in Pythagoras, trigonometry, the quadratic formula and
coordinate geometry. They are taught in GCSE Mathematics at Higher tier
in England, in NCERT class 9 "Number Systems" in India (rationalising
denominators and irrational numbers), and in the US under the Common Core
standards N-RN (radicals and rational exponents) and 8.NS (rational and
irrational numbers).

## History

The Pythagoreans discovered that the diagonal of a square cannot be a
ratio of whole numbers — the first known irrational number — and Book X
of Euclid's Elements classifies such magnitudes at length. The word
"surd" comes, through Latin *surdus* ("deaf, mute"), from al-Khwarizmi's
term for numbers that cannot be "spoken" as ratios. The root sign √
first appeared in print in Christoff Rudolff's *Coss* (1525), and
Descartes added the bar over the top.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `simplify`,
  `add_subtract`, `multiply`, `expand`, `rationalise`, `classify`);
  `locale` (`us` "radicals" and "rationalize", `uk` "surds", `in` "surds
  and irrational numbers"); `count` (4-24); `width` (300-2000 Pt) and
  `height` (300-3000 Pt). Out-of-range values are clamped and reported in
  meta as `requested_*`.
- **Generation:** each question is an expression tree drawn from the forms
  its level allows. Easy: square factors up to 25, like surds, products of
  two roots. Medium: larger square factors, surds to simplify before
  collecting, one bracket, dividing by a root, rationalising k/√r. Hard:
  roots of fractions, two brackets and squares, k/(c√r) and (a + √r)/√r.
  Expert: large numbers, unlike surds left in the answer, three-factor
  products and conjugates. Classification questions reuse the other
  forms, half rational and half irrational. No question repeats on a page.
- **Solving:** exact arithmetic on sums of rational multiples of
  square-free roots, which is a unique representation of each number; a
  division multiplies by the conjugate. The answer is printed over the
  lowest common whole-number denominator, rational part first.
- **Guarantees:** every answer is recomputed exactly from the question and
  compared with a floating-point evaluation of the question as printed;
  the form is checked canonical (square-free radicands, no zero terms);
  a "rational" answer must leave no root. Expanding and rationalising
  start at Medium; a lower request is served at Medium and the meta
  records `requested_difficulty`. Meta: `answers_checked`, `unique`,
  `difficulty`, `rating_basis` (`question_forms_by_level`).
