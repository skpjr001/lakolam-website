---
title: "Laws of Indices"
blurb: "Laws of indices — multiply, divide and raise algebraic powers; zero, negative and fractional indices; find the unknown index"
category: maths
version: "1.0.0"
---
Multiply, divide and raise algebraic powers — zero, negative and fractional indices, and the unknown index — with every answer in simplest form.

## What it is

A worksheet of four to twenty-four questions on the laws of indices
(exponents), written the way a textbook writes them: letters in italic,
indices as small raised numbers, fractions stacked. Simplify products such
as 3x^2y × 4xy^5, quotients such as 12a^7 ÷ 4a^3 written as a fraction,
and powers of powers such as (2x^3)^4. Further on come zero and negative
indices, numbers to fractional powers such as 8 to the power 2/3, letters
with fractional indices, and equations where the index itself is unknown:
x^5 × x^n = x^12, or 4^n = 8. The answer key writes every answer in red,
in simplest form with positive indices.

## How to play

- **Multiplying powers of the same letter:** add the indices.
  x^3 × x^4 = x^7. Multiply the numbers in front as usual:
  3x^2 × 4x^5 = 12x^7. Treat each letter separately.
- **Dividing:** subtract the indices. x^9 ÷ x^4 = x^5. Divide the numbers
  in front, and cancel a fraction to its lowest terms.
- **A power of a power:** multiply the indices. (x^2)^5 = x^10. Every
  part inside the bracket is raised: (2x^3)^4 = 16x^12.
- **Zero index:** anything (except 0) to the power 0 is 1. In 6 × x^0
  only the x is raised to 0, so it is 6.
- **Negative index:** a negative index means "one over". x^-3 = 1/x^3,
  2^-3 = 1/8, and (2/3)^-2 = (3/2)^2 = 9/4. Write answers with positive
  indices: a letter with a negative index moves under the fraction bar.
- **Fractional index:** the bottom of the fraction is a root, the top a
  power. 8^(1/3) is the cube root of 8, which is 2, and 8^(2/3) = 2^2 = 4.
  A negative fractional index is a root, a power and "one over":
  27^(-2/3) = 1/9.
- **Finding the index:** use the laws backwards. In x^5 × x^n = x^12 the
  indices add, so n = 7. For 4^n = 8, write both as powers of 2:
  2^(2n) = 2^3, so n = 3/2.

## Purpose

The laws of indices are the grammar of algebra: they are needed to
simplify expressions, to work with standard form, to understand roots as
powers, and later for exponential growth and logarithms. They appear in
Common Core grade 8 (8.EE.1) and high-school N-RN (rational exponents),
in GCSE Mathematics in England (the laws of indices at Foundation,
fractional and negative indices at Higher), and in NCERT class 8
"Exponents and Powers" in India. The numeric side — squares, cubes,
roots, powers of ten and standard form — is on the powers worksheet; this
page is algebraic.

## History

Nicolas Chuquet wrote small raised numbers for powers of an unknown in
1484, and René Descartes' *La Géométrie* (1637) fixed the notation x^3
that is still used. John Wallis (1656) and Isaac Newton (1676) extended
indices to negative and fractional values, so that x^-1 = 1/x and
x^(1/2) is the square root — which makes the same three laws hold for
every rational index.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `multiply`, `divide`,
  `brackets`, `negative`, `fractional`, `find_index`); `locale` (`us`
  "exponents", `uk` "indices", `in` "exponents and powers"); `count`
  (4-24); `width` (300-2000 Pt) and `height` (300-3000 Pt). Out-of-range
  values are clamped and reported in meta as `requested_*`.
- **Generation:** each question is drawn from the forms its level allows,
  as an expression tree of monomials (coefficient and letter → index
  map). Easy: one letter, whole positive indices, no coefficients. Medium:
  coefficients, two letters, quotients written as fractions, zero and
  negative powers of numbers, whole unknown indices. Hard: negative
  indices in questions and answers, negative bases, fractional powers of
  numbers. Expert: fractional indices on letters, negative fractional
  powers of fractions, fractional unknown indices. No question repeats on
  a page.
- **Solving:** the answer is the expression's exact normal form — the
  coefficient a fraction in lowest terms, each letter once with its index
  summed — printed with positive indices. Fractional powers are taken only
  when the root is exact.
- **Guarantees:** every answer is checked twice before the page is drawn:
  exactly (an evaluation as answer^d = base^p for the index p/d, an
  unknown index substituted back) and, for simplifications, by
  substituting numbers for the letters into the question as printed and
  into the answer. Negative and fractional topics start at Medium and
  Hard; a lower request is served at that level and the meta records
  `requested_difficulty`. Meta: `answers_checked`, `unique` (the key is the
  one canonical form), `difficulty`, `rating_basis`
  (`question_forms_by_level`).
