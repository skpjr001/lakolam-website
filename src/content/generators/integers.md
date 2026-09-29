---
title: "Integers"
blurb: "Integer worksheets — negative numbers in all four operations, compare and order"
category: maths
version: "1.0.0"
---
Negative-number practice: add, subtract, multiply and divide with integers,
from jumps on a number line to mixed pages with every sign rule.

## What it is

A worksheet of integer problems with a NAME and DATE line, numbered problems
in titled sections (or one mixed section) and an answer key. Problems are
written on one line, such as -7 + (-3) = ____ or 4 - (-6) = ____. At the
easiest level each adding and subtracting problem has a number line from -10
to 10 under it, and the answer key draws the jump in red: a dot on the first
number and an arrow to the answer. Other sections ask you to write <, > or =
between two integers, or to put five integers in order from least to
greatest. Negative numbers can be written with parentheses after a sign
(4 - (-6)), around every negative number ((-4) - (-6)), or with none at all
(4 - -6). With the UK setting the title reads NEGATIVE NUMBERS.

## How to play

- **Add.** If the two numbers have the same sign, add their sizes and keep
  the sign: -7 + (-3) = -10. If the signs are different, take the smaller
  size from the larger and keep the sign of the number with the larger size:
  -7 + 3 = -4.
- **Subtract.** Subtracting a number is the same as adding its opposite:
  4 - (-6) = 4 + 6 = 10, and 3 - 8 = 3 + (-8) = -5.
- **On the number line.** Put your finger on the first number. Adding a
  positive number, or subtracting a negative one, moves you right; adding a
  negative number, or subtracting a positive one, moves you left. Count the
  steps and write where you land.
- **Multiply and divide.** Work with the sizes, then decide the sign: two
  numbers with the same sign give a positive answer, two with different signs
  give a negative answer. -6 x (-7) = 42 and 28 / (-7) = -4.
- **Compare and order.** On the number line, numbers get bigger to the
  right. Any positive number is bigger than any negative number, and between
  two negative numbers the one nearer zero is bigger: -3 > -7. The open
  mouth of < or > faces the bigger number.

## Purpose

Negative numbers are the first time children meet numbers "below nothing",
and the rules for their signs are easy to muddle. Number lines make adding
and subtracting something you can see; sections that spread every sign
combination evenly (negative plus positive, positive plus negative, two
negatives, and a small number minus a bigger one) make sure no rule is
skipped; mixed pages check that the right rule is chosen for each operation.

## History

Negative numbers appear in the Chinese Nine Chapters on the Mathematical Art
(around 200 BC), which used red and black counting rods for gains and debts,
and in the work of the Indian mathematician Brahmagupta (628 AD), who stated
the rules for multiplying them. European mathematicians accepted them slowly;
the number line that makes them easy to picture became a classroom standard
only in the twentieth century.

## This implementation

- **Spec knobs:** `difficulty`; `operations` (any of `add`, `subtract`,
  `multiply`, `divide`, `compare`, `order`); `range` (5-999: numbers and
  answers of adding, subtracting, comparing and ordering lie from -range to
  range); `factor_max` (2-99: largest factor, divisor and quotient size);
  `parentheses` (`none`, `some` after a sign, `all`); `number_lines` (under
  adding and subtracting, only when range is at most 20); `mixed` (the four
  operations shuffled into one section); `problems` (1-40, 1-16 in
  `large_print`; 0 = 20, or 12 with number lines; 8 and 4 in large print);
  `locale` (`us`, `in`: INTEGERS; `uk`: NEGATIVE NUMBERS, no grade shown);
  `large_print`; page `width`, `height`, `line`.
- **Difficulty (grade):** Kids = add and subtract from -10 to 10 with number
  lines (grade 6); Easy = add, subtract, compare and order from -20 to 20
  (grade 6); Medium = all four operations, -20 to 20, factors 2 to 10,
  parentheses after a sign (grade 7); Hard = the four operations mixed, -50
  to 50, factors to 12, every negative in parentheses (grade 7); Expert = the
  four operations mixed, -200 to 200, factors to 20, no parentheses (grade
  7-8). Every knob can be set directly instead.
- **Generation:** each section first deals out sign patterns evenly
  (negative-positive, positive-negative, negative-negative, and for
  subtraction positive minus a bigger positive; for comparing, a negative
  against a positive or its opposite, two close negatives, and a negative
  against zero), then draws each problem to its pattern. Division is built
  from a quotient and a divisor (both 2 to `factor_max` in size), so it is
  always exact and never divides by zero. Adding and subtracting keep the
  answer within the range (and so on the number line). Problems are drawn
  without repeats (-3 x 4 and 4 x (-3) count as one), and the page refuses
  with a clear message when fewer different problems exist than were asked
  for, or when they would not fit at a readable size.
- **Solving:** answers are exact integer arithmetic, and are checked again
  by the sign rules taught in school, worked on sizes and signs separately
  (same signs add, different signs subtract and keep the larger's sign;
  subtracting adds the opposite; same signs multiply or divide to a positive,
  different signs to a negative). Comparisons are checked by the rule "a
  positive beats a negative; of two negatives the one nearer zero is
  greater".
- **Guarantees:** deterministic per seed. Every arithmetic problem has at
  least one negative number (or, for a small minus a bigger positive, a
  negative answer); every division is exact with a non-zero divisor; the sign
  patterns in each section differ in count by at most one; every answer
  equals the sign-rule answer; numbers stay within the range and factors
  within `factor_max`; no two problems repeat; a mixed section holds exactly
  the four operations' problems. All of this is checked by `obeys()` on
  every page built and in the tests across all difficulties, every operation
  and parentheses style, and ranges 5 to 999 (the sign rules themselves are
  checked against exact arithmetic for every pair from -30 to 30). Meta
  records `answers_checked`, `sign_rules_checked`, `no_duplicates`, the grade
  and `rating_basis: grade_operations_and_range`. A page takes a few
  milliseconds.
