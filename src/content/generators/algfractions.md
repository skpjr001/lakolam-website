---
title: "Algebraic Fractions"
blurb: "Algebraic fractions — simplify, multiply, divide, add and subtract rational expressions, solve equations with fractions (rejecting impossible values) and split into partial fractions, every answer checked by exact evaluation"
category: maths
version: "1.0.0"
---
Simplify, combine and solve with fractions in x — every answer factorised, in lowest terms and checked by exact evaluation.

## What it is

A worksheet of four to twelve questions on algebraic fractions (rational
expressions). Factorise the top and the bottom of a fraction and cancel;
multiply and divide fractions whose parts are quadratics; add and
subtract fractions over number, linear and quadratic denominators; solve
equations with fractions, including one where a value must be rejected
because it would make a denominator zero; and split a fraction into
partial fractions. The answer key writes every answer in red, fully
factorised.

## How to play

- **Simplify:** factorise the numerator and the denominator completely,
  then cancel any bracket that appears in both. Only whole factors cancel,
  never single terms. Watch for (a – x) = –(x – a).
- **Multiply:** factorise everything first, cancel across the fractions,
  then multiply tops together and bottoms together.
- **Divide:** turn the second fraction upside down and multiply.
- **Add and subtract:** find the lowest common denominator, rewrite each
  fraction over it, then add or subtract the numerators. Put brackets
  round a numerator you subtract. Simplify the result if you can.
- **Solve:** multiply every term by the lowest common denominator to clear
  the fractions, then solve what is left. Check each answer: any value
  that makes a denominator zero must be rejected.
- **Partial fractions:** write the fraction as A over the first factor
  plus B over the second (and C over the square of a repeated factor).
  Multiply through by the whole denominator, then put in values of x
  that make brackets zero to find each constant.

Leave answers factorised, with whole numbers and no common factor left
between the top and the bottom.

## Purpose

Algebraic fractions are GCSE Higher content in England, rational
expressions are a unit of Algebra 2 in the US (Common Core A-APR.D.6 and
A-REI.A.2, extraneous solutions), and partial fractions are A-level Pure
Mathematics and a step towards integration in NCERT class 12. They
practise factorising in context and the habit of checking a solution
against the original equation.

## History

Fractions of polynomials are as old as symbolic algebra: Viète and
Descartes in the late sixteenth and seventeenth centuries manipulated
them freely. The method of partial fractions was developed by Johann
Bernoulli and Leibniz around 1702 to integrate rational functions, and
became a standard technique through Euler's textbooks.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `simplify`,
  `multiply_divide`, `add_subtract`, `solve`, `partial`); `locale` (`us`
  heads the page "Rational expressions" and says "factor"; `uk` and `in`
  say "Algebraic fractions" and "factorise" and print the same page);
  `count` (4-12); `width` (300-2000 Pt) and `height` (300-3000 Pt).
  Out-of-range values are clamped and reported in meta as `requested_*`.
- **Generation:** every expression is built from chosen linear factors.
  Easy: a common bracket or x and a number to cancel, number
  denominators, linear equations with whole-number answers. Medium:
  monic quadratics, linear denominators, a fraction equal to a fraction.
  Hard: non-monic quadratics and a sign change (a – x over x – a), more
  division, quadratic denominators, equations giving a quadratic with two
  whole-number roots, partial fractions over two linear factors. Expert:
  cubics, three-term sums, an equation whose cleared quadratic has one
  root that zeroes a denominator, and partial fractions with a repeated
  or a third factor. A fraction shown in a question never already
  cancels on its own; in a product something always cancels across.
  Partial fractions start at Hard: a lower request is served at Hard and
  recorded as `requested_difficulty`.
- **Solving:** exact polynomial arithmetic over fractions; the answer is
  put in canonical form — no common factor (polynomial gcd), whole
  coefficients with no common factor overall, the denominator's leading
  coefficient positive — and printed factorised.
- **Guarantees:** each answer is checked without the generator's algebra:
  the question and the answer are evaluated exactly at up to 18 rational
  points and must agree at more points than their total degree (so they
  are the same function); the answer is in canonical lowest terms and no
  root of its denominator is a root of its numerator; an equation is
  cleared afresh by its lowest common denominator, every rational root of
  the result found, split into solutions and rejected values (roots of a
  denominator), and each solution substituted back into the equation as
  printed; partial fractions are compared with the original at many
  points. No two questions on a page are the same. Meta:
  `answers_checked`, `unique`, `difficulty`, `rating_basis`
  (`question_forms_by_level`), `checked_by`, `answer_form`.
