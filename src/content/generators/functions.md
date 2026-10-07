---
title: "Functions"
blurb: "Functions — notation, is it a function?, domain and range, solving f(x) = k, composite and inverse functions"
category: maths
version: "1.0.0"
---
Function notation, domain and range, composite and inverse functions — every answer exact and checked by substitution.

## What it is

A worksheet of four to twelve questions on functions. Work out f(4) for
a function such as f(x) = 3x – 2; solve f(a) = 13; decide whether a set
of ordered pairs or a mapping diagram (two ovals joined by arrows) is a
function, and write down its domain and range; find a composite function
such as fg(x) and its value fg(3); and find an inverse function f⁻¹(x)
and a value of it. Higher levels use quadratics, functions with a
fraction in them, substitutions such as f(2x), and inverses of
(ax + b)/(cx + d). The answer key writes every answer in red.

## How to play

- **Function notation:** f(4) means "put 4 in place of x". For
  f(x) = 3x – 2, f(4) = 3 × 4 – 2 = 10. For f(2x), replace every x by 2x
  and simplify.
- **Solving f(a) = k:** write the formula equal to k and solve for the
  input. With f(x) = 3x – 2, 3a – 2 = 13 gives a = 5.
- **Is it a function?** A function sends each input to exactly one
  output. If any input has two arrows (or appears in two pairs with
  different outputs) it is not a function. Two inputs sharing an output
  is fine.
- **Domain and range:** the domain is the set of inputs, the range the set
  of outputs. List each value once, smallest first, in curly brackets.
- **Composite functions:** fg(x) (written f(g(x)) in the US and India)
  means "do g first, then f": put the whole of g(x) in place of x in f.
  For fg(3), work out g(3) first, then put the result into f.
- **Inverse functions:** f^-1 (the inverse) undoes f. Write y = f(x), rearrange to make x
  the subject, then swap the letters. For f(x) = 2x + 6,
  x = (y – 6)/2, so f^-1(x) = (x – 6)/2. To find f^-1(k), solve f(x) = k.

Give exact answers: whole numbers or fractions in lowest terms.
Equivalent forms of an expression are correct.

## Purpose

Functions are the central idea of school algebra: a rule that turns
inputs into outputs. This page covers what the curricula ask: Common Core
8.F.1 and high-school F-IF and F-BF (function notation, domain and range,
composition, inverses), GCSE Mathematics in England (function notation,
composite and inverse functions at Higher tier), and NCERT class 11
"Relations and Functions" in India (relations, functions, domain and
range).

## History

Leibniz used the word "function" in 1692 for quantities depending on a
curve; Johann Bernoulli and then Leonhard Euler made it mean an
expression in a variable, and Euler introduced the notation f(x) in
1734. Peter Dirichlet's 1837 definition — any rule that assigns one
output to each input — is the one taught today, and the mapping diagram
picture of it comes from twentieth-century set theory.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `evaluate`, `solve`,
  `mapping`, `composite`, `inverse`); `locale` (`uk` writes composites as
  fg(x), `us` and `in` as f(g(x)); `us` says "integers", `in` is titled
  "relations and functions"); `count` (4-12); `width` (300-2000 Pt) and
  `height` (300-3000 Pt). Out-of-range values are clamped and reported in
  meta as `requested_*`.
- **Generation:** every function is a ratio of polynomials with exact
  rational coefficients. Easy: linear functions at whole numbers and sets
  of ordered pairs. Medium: quadratics, negative inputs, fractional
  solutions, mapping diagrams with domain and range. Hard: functions with
  a divisor or a denominator, composite and inverse linear functions.
  Expert: f(2x)-style substitutions, composites with a quadratic, inverses
  of (ax + b)/(cx + d), solving fg(x) = k. Solving questions choose the
  answer first so it is a whole number or a simple fraction.
- **Solving:** composition substitutes one function into the other
  exactly; the inverse of (ax + b)/(cx + d) is (dx – b)/(–cx + a). Every
  expression is normalised to whole-number coefficients with no common
  factor, so it has one printed form.
- **Guarantees:** answers are checked by substitution: a composite or
  substituted expression agrees with stepping through the given functions
  at seven points; an inverse undoes the function at seven points; a
  solution is substituted back, and the function is one-to-one so it is
  the only one; "is it a function" is decided by counting each input's
  outputs. Composite and inverse topics start at Hard; a lower request is
  served at Hard and the meta records `requested_difficulty`. Meta:
  `answers_checked`, `unique`, `difficulty`, `rating_basis`
  (`question_forms_by_level`).
