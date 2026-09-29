---
title: "Addition"
blurb: "Addition worksheets — column or one-line sums with guaranteed regrouping"
category: maths
version: "1.0.0"
---
Column and one-line addition practice, from single-digit facts to adding
three five-digit numbers, with regrouping exactly where the page says.

## What it is

A worksheet of addition problems with a NAME and DATE line, numbered
problems in a tidy grid, and an answer key. Problems are either stacked in
columns (the digits lined up, a plus sign and a rule above the answer
space) or written on one line ("24 + 17 = ____"). The subtitle says what
the page practises, such as "3-DIGIT ADDITION WITH REGROUPING". Small boxes
above the columns give room to write carried digits, and an optional faint
grid of boxes keeps every digit in its column. The answer key shows every
sum in red, and the carries too.

## How to play

Add the numbers in each problem. For a column problem, start with the ones
column on the right: add its digits and write the ones digit of that total
under the line. If the total is ten or more, carry the ten: write a 1 (or
2, with many numbers) in the small box above the next column to the left,
and add it in with that column. Work leftwards one column at a time. When
the last column's total is ten or more, write the whole total.

For a one-line problem, work it out (on scrap paper in columns if it
helps) and write the sum on the line. Check each answer by adding the
numbers again in a different order.

## Purpose

Column addition is the first written algorithm children learn, and the
step that trips them up is regrouping: knowing that twelve ones are one ten
and two ones. Pages that keep regrouping out entirely let a beginner
practise the layout; pages where every problem regroups practise the
carry itself; mixed pages check that the child can tell the difference.
Lined-up columns and digit boxes support children who find place value or
neat writing hard.

## History

Adding in columns with carrying goes back to the Hindu-Arabic place-value
system; it reached Europe through Fibonacci's Liber Abaci (1202) and became
the standard school method with the printed arithmetic books of the 1500s.
"Carrying" is the traditional word, still used in India; American schools
now say "regrouping" and English schools "exchanging", all for the same
step.

## This implementation

- **Spec knobs:** `difficulty`; `digits` (digits in each addend, 1-9, top to
  bottom; a short list repeats its last entry); `addends` (2-6);
  `regrouping` (`none`, `some`, `all`, `every`); `layout` (`vertical` or
  `horizontal`); `problems` (1-40, 1-12 in `large_print`); `large_print`;
  `grid_support`; `carry_boxes`; `show_carries` (on the key); `locale`
  (`us`, `uk`, `in`: regroup / exchange / carry, and 1,234,567 or 12,34,567
  grouping on one-line problems of five digits and more); page `width`,
  `height`, `line`.
- **Difficulty (grade):** Kids = two 1-digit addends, no regrouping (K-1);
  Easy = 2-digit + 2-digit, half the problems regroup (grade 1-2); Medium =
  3-digit + 3-digit, every problem regroups (grade 2-3); Hard = 4-digit +
  4-digit, every problem regroups (grade 3-4); Expert = three 5-digit
  addends, every problem regroups (grade 4-5). Any of digits, addends and
  regrouping can be set directly instead.
- **Generation:** problems are built one column at a time from the ones
  leftwards. Each column's digits are drawn to meet that column's rule
  (must carry, must not carry, or free) given the carry coming in; leading
  digits are never 0, so every addend has exactly its number of digits and
  none is zero. Each finished problem is re-checked by column analysis. The
  page draws its problems without repeats (24 + 17 and 17 + 24 count as the
  same problem) under an attempt budget, and refuses with a clear message
  when fewer different problems exist than were asked for (only 20
  different 1-digit sums avoid regrouping, for example), or when the
  problems would not fit the page at a readable size.
- **Solving:** answers are exact whole numbers, computed by machine and
  again by written column addition on the digit strings; the key prints
  them in red with each carry above its column.
- **Guarantees:** deterministic per seed. Regrouping, judged column by
  column in the written method: `none` = no column of any problem carries;
  `some` = exactly half the problems (rounded up) carry at least once and
  the rest never carry; `all` = every problem carries in at least one
  column; `every` = every problem carries out of every column that holds
  digits from two or more addends. No two problems on a page have the same
  addends. Every answer equals the written column sum. All of these are
  proven in the tests across difficulties and shapes (1 to 9 digits, 2 to
  6 addends). Meta records `answers_checked`, `no_duplicates`, the grade
  and `rating_basis: digits_addends_and_regrouping`. A page takes a few
  milliseconds.
