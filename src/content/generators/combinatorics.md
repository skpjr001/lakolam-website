---
title: "Counting"
blurb: "Counting — factorials, the product rule, permutations, word arrangements, combinations, committees and binomial coefficients, every answer checked by brute-force enumeration"
category: maths
version: "1.0.0"
---
Factorials, permutations and combinations — the product rule, arrangements, selections and binomial coefficients, every answer counted twice.

## What it is

A worksheet of four to twelve counting questions. Work out 5! or 8!/6!;
count the meals that can be made from 3 starters, 4 mains and 2
desserts; count codes with and without repeated digits; arrange books on
a shelf or the letters of a word such as BANANA; count arrangements where
two people must stand together or apart; evaluate ⁿPᵣ and ⁿCᵣ; count
committees chosen from two groups; complete a row of Pascal's triangle;
and find a coefficient in a binomial expansion such as (2 – 3x)⁶. The
answer key writes every answer in red.

## How to play

- **Factorials:** n! means n × (n – 1) × ... × 2 × 1, so 5! = 120. In
  8!/6! most of the factors cancel: 8!/6! = 8 × 7 = 56.
- **The product rule:** if one choice can be made in a ways and a second
  in b ways, both can be made in a × b ways. A 3-digit code from the
  digits 0-9 with repeats allowed has 10 × 10 × 10 codes; without repeats
  10 × 9 × 8.
- **Arrangements:** n different things can be put in a row in n! ways.
  If some letters repeat, divide by the factorial of each repeat count:
  BANANA has 6!/(3! × 2!) = 60 arrangements.
- **Together and apart:** glue the people who must be together into one
  block, arrange the blocks, then arrange the people inside the block.
  For "apart", take the arrangements with them together away from all
  the arrangements.
- **Permutations and combinations:** nPr = n!/(n – r)! counts ordered
  choices (gold, silver, bronze); nCr = n!/(r! × (n – r)!) counts
  choices where order does not matter (a team). For a committee from two
  groups, multiply the choices from each group. For "at least one",
  take the choices with none away from all the choices.
- **Pascal's triangle:** each number is the sum of the two above it. Row
  n (the 1 at the top is row 0) gives the coefficients of (a + b) to
  the power n.
- **Binomial coefficients:** in (a + bx) to the power n, the
  coefficient of x to the power k is nCk × a to the power (n – k) × b to
  the power k. Keep the sign of b.

## Purpose

Counting without listing is the base of probability and of the binomial
theorem. This page covers what the curricula ask: the product rule and
systematic listing in GCSE Mathematics (England), permutations,
combinations and the binomial expansion in A-level Mathematics, NCERT
class 11 chapters "Permutations and Combinations" and "Binomial Theorem"
(India), and the counting principle, permutations and combinations of
Common Core S-CP.9 (US).

## History

Indian mathematicians counted selections long before Europe: Pingala's
work on poetic metres (around the 3rd century BCE) contains the pattern
now called Pascal's triangle, and Bhaskara II gave the rules for
permutations and combinations in the Lilavati (1150). The triangle was
also studied by al-Karaji, Omar Khayyam and Yang Hui; Blaise Pascal's
Traité du triangle arithmétique (1654) gave it its Western name. The
notation n! is Christian Kramp's, from 1808.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `factorials`,
  `counting`, `permutations`, `combinations`, `binomial`); `locale`
  (`uk` writes a combination as a stacked binomial coefficient and
  ⁿPᵣ, `in` writes ⁿCᵣ and ⁿPᵣ and is titled "Permutations and
  combinations", `us` writes C(n, r) and P(n, r)); `count` (4-12);
  `width` (300-2000 Pt) and `height` (300-3000 Pt). Out-of-range values
  are clamped and reported in meta as `requested_*`. Pages narrower than
  460 Pt use one column.
- **Generation:** Easy: n!, n!/(n – 1)!, menus of two or three stages,
  things in a row, choosing a team, Pascal rows 4-6. Medium: n!/k!, codes
  of digits or letters with and without repeats, ⁿPᵣ and ⁿCᵣ values,
  words with all letters different, Pascal rows 6-9. Hard: n!/(k! × m!),
  people kept together, whole numbers with no repeated digit, prize
  podiums, words with one repeated letter, committees from two groups,
  coefficients in (1 + cx)ⁿ. Expert: simplifying (n + a)!/(n + b)! to a
  polynomial in n, people kept apart, odd or even numbers with no
  repeated digit, words with several repeated letters (up to
  MISSISSIPPI), "at least one" teams, coefficients in (a + bx)ⁿ with a
  negative b. Words come from a short curated list in the crate.
- **Solving:** every answer is an exact integer (128-bit) from the
  textbook formula.
- **Guarantees:** each answer is also counted by brute force: codes,
  permutations and podiums by listing every tuple, arrangements with
  restrictions by listing every permutation, word arrangements by listing
  each distinct ordering, selections and committees by checking every
  subset as a bitmask, Pascal rows by adding, coefficients by multiplying
  the bracket out, and factorial quotients in n by interpolating exact
  values. The formula and the count must agree. Question sizes are kept
  small enough to list (at most 9 objects permuted, 2¹⁶ subsets, 10⁵
  tuples). A page avoids repeating a question; only when a level's pool
  of different questions is smaller than the page may one repeat. Meta:
  `answers_checked`, `unique`, `difficulty`, `rating_basis`
  (`question_forms_by_level`).
