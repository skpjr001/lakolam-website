---
title: "Subtraction"
blurb: "Subtraction worksheets — column or one-line, with guaranteed regrouping and borrowing across zeros"
category: maths
version: "1.0.0"
---
Column and one-line subtraction practice, from facts within ten to
five-digit problems that borrow across zeros, with regrouping exactly where
the page says.

## What it is

A worksheet of subtraction problems with a NAME and DATE line, numbered
problems in a grid, and an answer key. Problems are stacked in columns (the
larger number on top, a minus sign and a rule above the answer space) or
written on one line ("52 - 17 = ____"). The subtitle names the skill, such
as "3-DIGIT SUBTRACTION WITH REGROUPING" or "... ACROSS ZEROS". Small boxes
above the top number give room to write regrouped digits, and an optional
faint grid keeps every digit in its column. The answer key shows every
difference in red and, above the problem, the crossed-out digits with their
new values.

## How to play

Subtract the bottom number from the top number. For a column problem,
start with the ones column on the right. If the top digit is big enough,
take the bottom digit away and write the result under the line. If it is
too small, regroup: take one ten from the next column to the left (cross
out that digit and write it one smaller in the box above it), add ten to
the digit you are working on, then subtract. When the next column is a 0,
it has no ten to give, so first regroup that column from the one beyond it
(the 0 becomes 10, then gives one away and becomes 9). Work leftwards one
column at a time.

For a one-line problem, work it out and write the difference on the line.
Check each answer by adding it to the bottom number: you should get the
top number.

## Purpose

Subtraction with regrouping is the written algorithm children find hardest,
and borrowing across a zero ("403 - 158") is the classic stumbling block.
Pages that never regroup let beginners practise the layout, pages where
every problem regroups drill the move itself, and zero pages isolate the
hardest case. Every answer is positive, so no child meets a problem they
cannot do yet.

## History

Written subtraction by "decomposition" (borrowing a ten from the next
column) arrived with the Hindu-Arabic numerals and became the standard
school method in the 20th century, replacing the older "equal additions"
method in most of the English-speaking world. American schools call the
step "regrouping", English schools "exchanging" and Indian schools
"borrowing".

## This implementation

- **Spec knobs:** `difficulty`; `digits` (`[top, bottom]` digits, 1-9, the
  bottom no longer than the top; one entry = both the same); `regrouping`
  (`none`, `some`, `all`, `every`); `across_zero` (`avoid`, `allow`,
  `require`); `layout` (`vertical` or `horizontal`); `problems` (1-40, 1-12
  in `large_print`); `large_print`; `grid_support`; `carry_boxes`;
  `show_carries` (on the key); `locale` (`us`, `uk`, `in`: regroup /
  exchange / borrow, and digit grouping on long one-line problems); page
  `width`, `height`, `line`.
- **Difficulty (grade):** Kids = 1-digit, no regrouping (K-1); Easy =
  2-digit, half the problems regroup (grade 1-2); Medium = 3-digit, every
  problem regroups, no borrowing across zeros (grade 2-3); Hard = 4-digit
  minus 3-digit, every problem regroups, zeros allowed (grade 3-4); Expert
  = 5-digit, every problem regroups across a zero (grade 4-5).
- **Generation:** problems are built one column at a time from the ones
  leftwards. Each column's two digits are drawn to meet that column's rule
  (must borrow, must not borrow, or free) given whether it has just lent a
  ten; a required zero is placed in a column whose right-hand neighbour
  borrows. The leading column never borrows, so the answer is never
  negative, and a problem whose two numbers are equal is rejected. Each
  finished problem is re-checked by column analysis. Problems are drawn
  without repeats under an attempt budget. Impossible requests are refused
  with a message: 1-digit minus 1-digit can never regroup, borrowing
  across a zero needs a top number of three or more digits, and a page
  that will not fit at a readable size asks for fewer problems.
- **Solving:** answers are exact whole numbers, computed by machine and
  again by written column subtraction on the digit strings; the key prints
  the answer in red, strikes through every changed top digit and writes its
  new value above it.
- **Guarantees:** deterministic per seed. Every answer is a whole number
  greater than 0. Regrouping, judged column by column in the written
  method: `none` = no column borrows; `some` = exactly half the problems
  (rounded up) borrow at least once and the rest never do; `all` = every
  problem borrows at least once; `every` = every problem borrows in every
  column where the bottom number has a digit, except the top number's
  leading column (which can never borrow). Across zero: `avoid` = no
  problem borrows across a zero; `require` = every problem that regroups
  borrows across a zero at least once (a 0 in the top number lends to the
  column on its right and so must itself borrow). No problem repeats on a
  page. All proven in the tests across difficulties and shapes. Meta
  records `answers_checked`, `no_duplicates`, the grade and `rating_basis:
  digits_regrouping_and_zeros`. A page takes a few milliseconds.
