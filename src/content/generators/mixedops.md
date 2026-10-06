---
title: "Mixed Operations"
blurb: "Mixed operations — add, subtract, multiply and divide facts on one page"
category: maths
version: "1.1.0"
---
Addition, subtraction, multiplication and division facts on one page, so
the reader has to look at every sign.

## What it is

A worksheet of one-line facts ("7 x 8 = ____", "56 / 8 = ____") with the
four operations shuffled together. The subtitle lists the operations on
the page, a thin rule separates the rows, and an optional TIME and SCORE
box turns it into a timed practice. The answer key writes every answer in
red on its line. How much of each operation appears, and how big the
numbers get, can be set operation by operation.

## How to play

Read each problem carefully and look at its sign before you start: + means
add, - means take away, x means multiply and the division sign means
divide. Work out the answer and write it on the line. Every subtraction
has an answer of zero or more, and every division comes out exactly, with
nothing left over. If the page has a TIME box, write how long you took;
then check your answers and write your SCORE.

## Purpose

Children who can do a page of one operation often stumble when the signs
change from one problem to the next, because they stop reading the sign.
Mixing the operations builds that habit and shows how well each fact is
really known. Keeping subtraction and division tied to their addition and
multiplication partners also reinforces fact families.

## History

Mixed-fact drills have been a staple of arithmetic practice since the
printed drill cards and "mental arithmetic" tests of the 19th century, and
remain common in worksheets and in timed "mixed review" sections of
textbooks.

## This implementation

- **Spec knobs:** `difficulty`; `add`, `sub`, `mul`, `div`, each `{weight,
  min, max}` (the share of the page and the range of the numbers; weight 0
  leaves the operation out); `problems` (4-60, 4-24 in `large_print`; a count outside the range is
  clamped to it, so switching on large print keeps the page);
  `timed` (TIME / SCORE box); `large_print`; `locale` (`us`, `uk`, `in`:
  "MATH" or "MATHS", digit grouping); page `width`, `height`, `line`.
- **Difficulty (grade):** Kids = + and - with numbers 0-5 (K-1); Easy = +
  and - with numbers to 10, and x and / to 5 at half the share (grade 2-3);
  Medium = all four with numbers to 10 (grade 3); Hard = 2-digit + and -,
  x and / to 12 (grade 4); Expert = 3-digit + and -, x and / to 15 (grade
  5).
- **Generation:** each operation's share is its weight's proportion of the
  page, rounded by largest remainder (every operation with a weight gets at
  least one problem). Addition and multiplication use two numbers from the
  range. Subtraction is built backwards from its addition fact: the number
  taken away and the answer are in the range, so the answer is never
  negative. Division is built backwards from its multiplication fact: the
  divisor (at least 1) and the quotient are in the range, so every division
  is exact. Facts are drawn without repeats (a + b and b + a count as the
  same) from the full list when the range is small, otherwise by sampling,
  then shuffled together. A page that asks for more facts of an operation
  than exist, or more than fit at a readable size, is refused with a
  message.
- **Solving:** answers are exact whole numbers; divisions are checked by
  multiplying back.
- **Guarantees:** deterministic per seed. Each operation appears exactly its
  apportioned number of times, every number is in its operation's range,
  every answer is a whole number of zero or more, every division is exact,
  and no problem repeats. Proven in the tests for every difficulty. Meta
  records `answers_checked`, `no_duplicates`, the per-operation counts, the
  grade and `rating_basis: operations_and_number_ranges`. A page takes a
  few milliseconds.
- **Too many problems for the page (1.1.0+):** when the problems asked for
  do not fit the page legibly (a half-size page, say, or a long list in
  large print), the page places as many as fit, at least one, removing one
  at a time, and records the count asked for as `requested_problems` in
  meta, instead of refusing. Pages that fitted before are unchanged.
