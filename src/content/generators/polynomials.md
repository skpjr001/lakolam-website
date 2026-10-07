---
title: "Polynomials"
blurb: "Polynomials — add, subtract, multiply, long and synthetic division, the remainder and factor theorems, zeros and coefficients"
category: maths
version: "1.0.0"
---
Add, multiply and divide polynomials — long division, synthetic division and the remainder theorem.

## What it is

A worksheet of four to ten questions on polynomials in x. Some ask you to
simplify a sum or difference of polynomials, or to expand a product of
three or more factors' worth of terms. Long-division questions are printed
inside a division bracket, ready to work; synthetic-division questions
print the tableau with the divisor's number and the coefficients in place.
Others use the remainder and factor theorems — find a remainder without
dividing, decide whether a bracket is a factor, or find the missing number
in a box — and the last kind finds the zeros of a quadratic and checks
their sum and product against its coefficients. The answer key fills in
every answer, writes the quotient over the division bracket, and
completes every synthetic-division tableau.

## How to play

- **Adding and subtracting:** remove the brackets — a minus sign in front
  of a bracket changes the sign of every term inside — then collect like
  terms (terms with the same power of x). Write the answer with the
  highest power first.
- **Multiplying:** multiply every term of the first bracket by every term
  of the second, then collect like terms. With three brackets, multiply two
  of them first.
- **Long division:** divide the first term of what is left by the first
  term of the divisor; write the result above, multiply the whole divisor
  by it, and subtract. Bring down the next term and repeat until what is
  left has a lower power than the divisor. That is the remainder. A
  missing power is written as 0 (0x^2) to keep the columns straight.
- **Synthetic division (by x – a):** write a on the left and the
  coefficients along the top. Bring the first coefficient down. Multiply it
  by a, write the result under the next coefficient, and add. Repeat to the
  end. The last number (in the box) is the remainder; the others are the
  quotient's coefficients, one power lower than the dividend's.
- **The remainder theorem:** the remainder when P(x) is divided by (x – a)
  is P(a). For (2x – 1), put in x = 1/2.
- **The factor theorem:** (x – a) is a factor of P(x) exactly when
  P(a) = 0.
- **The missing number:** write the remainder (or 0 for a factor) using the
  theorem, with the box as the unknown, and solve.
- **Zeros and coefficients:** for ax^2 + bx + c, the zeros add up to –b/a
  and multiply to c/a. To build a quadratic from the sum s and product p
  of its zeros, write x^2 – sx + p, then multiply through to clear any
  fractions. Any nonzero multiple of the key's answer is also correct.

## Purpose

Polynomial arithmetic is the bridge from algebraic expressions to
functions and equations of higher degree. It is Common Core high-school
standard A-APR ("perform arithmetic operations on polynomials", "know and
apply the Remainder Theorem"), part of A-level and the IB, and two NCERT
chapters in India: class 9 "Polynomials" (the remainder and factor
theorems) and class 10 "Polynomials" (the relationship between zeros and
coefficients, and the division algorithm). Simplifying single brackets and
multiplying two binomials live on the expressions worksheet; this page
starts at degree three.

## History

Dividing one polynomial by another is as old as algebra written with
coefficients: Chinese mathematicians of the Song dynasty, culminating in
Qin Jiushao's 1247 *Mathematical Treatise in Nine Sections*, evaluated and
divided polynomials by the scheme now called Horner's method, which
William George Horner rediscovered in 1819 and which classrooms now teach
as synthetic division. The remainder theorem follows from the division
algorithm; Descartes stated the factor theorem in his *La Géométrie*
(1637), and Viète gave the relations between the roots and the
coefficients of an equation in the 1590s.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `add_subtract`,
  `multiply`, `long_division`, `synthetic`, `theorems`, `zeros`); `locale`
  (`in` spells "zeroes", as NCERT does); `count` (4-10); `width`,
  `height`, `line` (clamped to sensible page sizes).
- **Generation:** Easy adds a quadratic to a cubic, multiplies (x + a) by a
  quadratic, and divides cubics exactly by (x – a) both ways. Medium adds
  subtraction of cubics with missing terms, any leading coefficients,
  remainders, the remainder theorem, and zeros of x^2 + bx + c. Hard adds
  three-part sums, a quadratic times a quadratic, long division by ax + b
  (often with a missing term, printed as 0x^n in the bracket), synthetic
  division of quartics, the factor theorem, the missing coefficient, and
  fractional zeros. Expert adds multiples such as 2P – 3Q, products of
  three binomials, division by a quadratic, synthetic division of
  quintics, remainders by ax – b (fractional), a missing coefficient that
  makes (x – a) a factor, and building a quadratic from the sum and product
  of its zeros. The theorem and zeros topics start at Medium (lower
  requests are served there, and meta records `requested_difficulty`);
  Kids is served as Easy. Every division is built as q·d + r with whole q
  and deg r < deg d; zeros are built from their factors. No question
  repeats on a page.
- **Solving:** answers come straight from the construction (the quotient
  and remainder chosen first, products multiplied out), with exact
  fractions for zeros and remainders by ax – b; synthetic tableaux are
  filled by the scheme itself.
- **Guarantees:** `answers_checked` and `unique` — every division is
  re-multiplied as q·d + r with deg r < deg d, which by the division
  algorithm makes q and r the only quotient and remainder; synthetic
  division is re-run and must match; sums and products are compared by
  value at seven points; remainders are re-evaluated directly; a missing
  coefficient is substituted back, and its power of a is nonzero, so no
  other number works; zeros are substituted back and their sum and product
  read from the coefficients. The tests repeat every division by a
  separate long division over the fractions, search all small rational
  roots of each quadratic, try every whole number in the box, and check
  that the key writes in red where the page is blank and that every
  printed character is in the font.
