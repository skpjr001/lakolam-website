---
title: "Matrices"
blurb: "Matrices — order, add, scale, transpose and multiply, determinants, inverses and solving systems, every answer exact and checked"
category: maths
version: "1.0.0"
---
Matrix arithmetic, determinants, inverses and solving equations with matrices — every answer exact and checked.

## What it is

A worksheet of four to twelve questions on matrices. Write down the
order of a matrix; work out sums, differences and multiples such as
2A – 3B; write down a transpose; multiply two matrices, or decide
whether a product can be formed at all; find 2×2 and 3×3 determinants,
and the value of k that gives a determinant; find inverse matrices; and
solve a pair or a set of three simultaneous equations by writing them as
a matrix equation. Answer boxes are drawn in the shape of the answer
matrix. The answer key fills every box in red.

## How to play

- **Order:** a matrix with r rows and c columns has order r × c (rows
  first).
- **Adding, subtracting, multiples:** work entry by entry. 2A means
  "double every entry of A". Only matrices of the same order can be added.
- **Transpose:** the rows become the columns: the first row of A is the
  first column of A transposed.
- **Multiplying:** AB is defined only when A has as many columns as B has
  rows. The entry in row i, column j of AB is row i of A times column j of
  B: multiply the pairs of entries and add. An m × n matrix times an n × p
  matrix gives an m × p matrix.
- **Determinant of a 2×2:** for rows (a, b) and (c, d), the determinant is
  ad – bc. For a 3×3, expand along the top row: each entry times the 2×2
  determinant left when its row and column are crossed out, with signs
  +, –, +.
- **Inverse of a 2×2:** swap a and d, change the signs of b and c, and
  divide every entry by the determinant. If the determinant is 0 there is
  no inverse. Check: A times its inverse is the identity matrix.
- **Solving equations:** write the equations as AX = B, where A holds the
  coefficients. Then X = (inverse of A) × B.

Give exact answers: whole numbers or fractions in lowest terms.

## Purpose

Matrices are the language of linear algebra, computer graphics and
systems of equations. This page covers the school curricula: NCERT class
12 chapters 3 and 4, "Matrices" and "Determinants" (India); Further
Mathematics at GCSE and A level (England); and the matrix standards of US
Precalculus (N-VM.6 to N-VM.12, A-REI.8 and A-REI.9).

## History

Systems of equations were solved by arranging their coefficients in a
grid in the Chinese "Nine Chapters on the Mathematical Art" (around the
first century), by the method now called Gaussian elimination. Seki
Takakazu in Japan (1683) and Leibniz in Europe (1693) introduced
determinants. James Joseph Sylvester coined the word "matrix" in 1850,
and Arthur Cayley defined matrix multiplication and the inverse in his
1858 "Memoir on the Theory of Matrices".

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `arithmetic`,
  `determinant`, `inverse`, `solve`); `locale` (`uk` writes round
  brackets, "order" and det A; `us` square brackets, "dimensions" and
  det(A); `in` square brackets, "order" and |A|, titled "matrices and
  determinants"); `count` (4-12, default 8); `width` (300-2000 Pt) and
  `height` (300-3000 Pt). Out-of-range values are clamped and reported in
  meta as `requested_*`. Pages narrower than 460 Pt use one column.
- **Generation:** Easy: orders, sums and multiples, transposes, a 2×2
  times a column, 2×2 determinants of whole numbers 0-9. Medium:
  negative entries, 2A – 3B, 2×2 products, "is the product defined?",
  2×2 inverses with determinant ±1, 2×2 systems with determinant ±1.
  Hard: 2×3 by 3×2 and 3×2 by 2×2 products, 3×3 determinants, 2×2
  inverses with determinant 2 to 5 (fraction entries) or 0 (no inverse),
  any 2×2 system. Expert: squares of matrices and 3×3 products, finding k
  from a determinant, 3×3 inverses with determinant ±1, 3×3 systems.
  Systems choose their whole-number solution first.
- **Solving:** exact fractions throughout; the inverse is the adjugate
  over the determinant.
- **Guarantees:** sums and products are recomputed entry by entry; each
  determinant is computed twice, by cofactor expansion and by row
  reduction, and the two must agree; an inverse must give the identity
  matrix on both sides; a "no inverse" answer needs a zero determinant; a
  system's solution satisfies every equation and its determinant is not
  zero, so the solution is the only one; for "find k" the determinant is
  linear in k with a non-zero coefficient, so k is unique. Inverses and
  systems start at Medium; a lower request is served at Medium and the
  meta records `requested_difficulty`. Meta: `answers_checked`, `unique`,
  `difficulty`, `rating_basis` (`question_forms_by_level`).
