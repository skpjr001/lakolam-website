---
title: "Number Sequences"
blurb: "Number sequences worksheet — continue, missing terms, rules, nth terms; linear, quadratic, geometric, Fibonacci-like"
category: maths
version: "1.0.0"
---
Spot the pattern, continue it, and find the rule that makes any term.

## What it is

A worksheet of six to fourteen number sequences in two columns. Some ask
for the next two terms, some have gaps to fill, some ask for the rule and
the next term, some for the nth term — a formula that gives any term from
its position — and some for a far-off term such as the 50th. The
instructions at the top say what kinds of sequence are on the page, and the
answer key fills every blank and writes every rule and formula.

## How to play

Read the instructions first: they tell you which kinds of sequence the page
uses, and with that, the terms shown always lead to exactly one answer.

- **Same difference (linear):** find what is added each time. In
  3, 7, 11, 15 it is 4, so the next terms are 19 and 23.
- **Multiplying (geometric):** each term is the one before times the same
  number. In 2, 6, 18, 54 that number is 3. Halving is multiplying by 1/2.
- **Quadratic:** the differences themselves go up (or down) by the same
  amount. In 2, 5, 10, 17 the differences are 3, 5, 7 — they go up by 2 —
  so the next difference is 9 and the next term 26.
- **Fibonacci-like:** each term is the two before it added together:
  2, 3, 5, 8, 13.
- **Missing terms:** use the terms on both sides of a gap.
- **The nth term:** for a linear sequence, the number added each time goes
  in front of n; then adjust to get the first term right. For 3, 7, 11, 15:
  4n gives 4, 8, 12, 16, one too many each time, so the nth term is 4n - 1.
  For a quadratic, half the second difference goes in front of n^2;
  subtract that n^2 part and what is left is linear.
- **A far term:** put the position into the nth term. The 50th term of
  4n - 1 is 4 x 50 - 1 = 199.

## Purpose

Sequences connect arithmetic to algebra: the term-to-term rule is
arithmetic, the position-to-term rule is a formula. The page follows the
progression in the English National Curriculum (KS2 counting patterns to
GCSE quadratic nth terms) and Common Core (4.OA.5 patterns, F-BF.2 and
F-LE.2 arithmetic and geometric sequences), and the mixed families teach
students to test a pattern rather than guess it.

## History

Sequences are among the oldest mathematics. The Rhind papyrus (about
1550 BC) contains an arithmetic progression of loaves shared out and a
geometric progression of houses, cats and mice; Euclid's *Elements*
(Book IX) sums a geometric series. Leonardo of Pisa — Fibonacci — posed
the rabbit problem in *Liber Abaci* (1202), whose answer is the sequence
1, 1, 2, 3, 5, 8, long known before him to Indian prosodists such as
Pingala and Virahanka. Isaac Newton's forward differences (1687) are the
method still taught for quadratic nth terms.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`mixed`, `continue`, `missing`,
  `rule`, `nth_term`, `term`); `locale`; `count` (6–14); `width`,
  `height`, `line`.
- **Generation:** each level states its families. Kids: adding 2, 3, 4, 5
  or 10, small positive numbers. Easy: adding or subtracting, negative
  numbers, linear nth terms. Medium: linear and geometric (whole ratios)
  — nth-term and far-term pages are linear only. Hard: linear, quadratic,
  geometric (including ratio -2 and halving) and Fibonacci-like, with
  linear and quadratic nth terms. Expert: quadratic nth terms with halves
  (such as 1/2 n^2 + 9/2 n), ratios -3, 1/3 and 3/2, three missing terms.
  nth terms and far terms start at Easy: a Kids request in those modes is
  served at Easy and labelled `requested_difficulty`. The families cycle
  down the page so each stated family appears. Every number is at most
  9999 (fractions only from halving or thirds at Hard and Expert).
- **Solving:** each family is fitted exactly over the rationals —
  linear, quadratic and Fibonacci-like by Gaussian elimination (the
  Fibonacci-like terms are F(n-2) u1 + F(n-1) u2), geometric by taking
  exact rational roots of the ratio between two shown terms (both signs
  when the gap is even).
- **Guarantees:** for every question, the terms shown fit *exactly one*
  sequence among the families the page states (reported in meta as
  `families` and `unique_within_family`). Members of different families
  never coincide: a polynomial obeying the Fibonacci recurrence must be
  zero, a geometric sequence with a rational ratio other than 0 and 1 is
  neither a polynomial nor Fibonacci-like, and quadratics have a non-zero
  n^2 term. When the minimum number of terms leaves two candidates (2, 3,
  5, 8 is also quadratic; 2, _, 18 is geometric with ratio 3 or -3) the
  generator shows more terms or draws again. The tests re-count the
  fitting members with independent methods (Lagrange interpolation, a
  brute-force search of ratios p/q up to 40, Cramer's rule), recompute
  every blank from the shown terms alone by differences, ratios or sums,
  and evaluate every printed nth-term formula against the sequence.
