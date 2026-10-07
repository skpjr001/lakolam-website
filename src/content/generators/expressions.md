---
title: "Algebraic Expressions"
blurb: "Algebraic expressions worksheet — simplify, expand, factorise, substitute and write from words"
category: maths
version: "1.1.0"
---
Simplify, expand, factorise and substitute — the everyday grammar of algebra.

## What it is

A worksheet of six to sixteen algebra questions in two columns. Each one
names its task — simplify, expand, factorise, find the value, or write an
expression from words — shows the expression, and leaves a line for the
answer. Pages can mix every kind or practise one. The answer key writes
each answer on its line.

## How to play

- **Simplify:** collect like terms — terms with the same letters to the
  same powers. 5x + 3y - 2x + y is 3x + 4y. Multiplying terms, multiply the
  numbers and then the letters: 3x times 4xy is 12x^2y.
- **Expand:** multiply everything inside the bracket by what is outside it:
  3(2x - 5) = 6x - 15. For two brackets, multiply each term of the first by
  each term of the second, then collect like terms:
  (x + 3)(x - 5) = x^2 - 5x + 3x - 15 = x^2 - 2x - 15.
  A square such as (x + 4)^2 means (x + 4)(x + 4).
- **Factorise (factor):** the reverse of expanding. Take out the highest
  common factor of every term, including any power of x:
  6x^2 + 9x = 3x(2x + 3). A quadratic x^2 + bx + c becomes (x + p)(x + q)
  when p and q multiply to c and add to b. A difference of two squares
  such as 4x^2 - 9 is (2x - 3)(2x + 3). "Fully" means nothing more can be
  taken out of any bracket.
- **Find the value:** replace each letter by its number and work it out,
  keeping the order of operations; take care with negative numbers and
  squares (when x = -3, x^2 is 9).
- **Write an expression:** turn the words into algebra. "3 less than x" is
  x - 3; "add 2 to x, then multiply by 5" is 5(x + 2).

Write each answer in its simplest form. Expand back to check a
factorisation, and put a number in for x to check an expansion.

## Purpose

Fluency with expressions is the foundation of everything later in algebra:
solving equations, rearranging formulae, quadratics and graphs. The page
covers the core of grades 6–9 (Common Core 6.EE, 7.EE, HSA-SSE) and the
KS3–GCSE algebra strand: like terms, the distributive law in both
directions, substitution and modelling with letters. Mixed pages make the
student read the instruction rather than repeat one procedure.

## History

Writing unknowns with letters is younger than algebra itself. Diophantus
(3rd century) abbreviated an unknown, and al-Khwarizmi's *Al-jabr*
(about 820) — the book that named algebra — solved quadratics entirely in
words. François Viète (1591) used letters for both unknowns and known
quantities, and René Descartes' *La Géométrie* (1637) fixed the convention
still used today: x, y, z for unknowns, a, b, c for constants, and raised
exponents such as x².

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`mixed`, `simplify`, `expand`,
  `factorise`, `substitute`, `words`); `locale` (`us` says "factor",
  `uk` and `in` "factorise"); `count` (6–16); `width`, `height`, `line`.
- **Since 1.1.0:** `line` scales every rule and diagram stroke on the
  page and its key (it was accepted but changed nothing before); a
  `count` outside its range is clamped and recorded as `requested_count`.
- **Generation:** each level has its own forms. Kids: collect x-terms and
  numbers (no negatives), substitute into ax + b, simple phrases. Easy:
  two letters with subtraction, a(bx + c), common number factors. Medium:
  x² terms, multiplying terms, x(ax + b), (x + a)(x + b), factors with x,
  negative values. Hard: sums of brackets, squares and (x + a)(x + b) with
  negatives, quadratics x² + bx + c, substitution into quadratics,
  multi-step phrases. Expert: (ax + b)(cx + d), (ax + b)², quadratics with
  a > 1 and the difference of two squares (some with a number factor too),
  two-letter quadratic substitution. Expanding and factorising start at
  Easy: a Kids request in those modes is served at Easy and labelled
  `requested_difficulty`. Questions are drawn at random under per-level
  bounds and rejected until they meet the level's form (for example, a
  Hard factorisation always has two brackets or a factor of x); no
  question repeats on a page.
- **Solving:** all arithmetic is exact polynomial arithmetic with integer
  coefficients. Factorising takes out the highest common factor and the
  lowest power of x, then finds a quadratic's rational roots from a
  perfect-square discriminant and turns each into a primitive bracket.
- **Guarantees:** a factorisation is printed in one normal form —
  positive highest common factor and power of x outside, brackets
  primitive with a positive x term, sorted — so the answer is unique up to
  the order of the brackets and the signs inside them (unique factorisation
  of integer polynomials, by Gauss's lemma). Every answer is checked when
  the page is built: simplified and expanded answers agree with the
  question at a 4 × 4 grid of points (which pins down any polynomial of
  degree at most 3 in each letter) and have every like term collected;
  factorisations multiply back and are in normal form with at least one
  factor taken out; values are evaluated exactly; phrases agree with their
  words' meaning. The tests re-check every answer from the *printed* text
  with an independent expression parser, re-find each quadratic's roots by
  brute-force search, and confirm no Kids page shows a negative number.
  Meta reports `answers_checked` and each question's instruction,
  expression and answer in plain text.
