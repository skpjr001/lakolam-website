---
title: "Missing-Digit Arithmetic"
blurb: "Missing-digit arithmetic — skeleton additions, subtractions, multiplications and long divisions: fill the boxes so the working is right"
category: maths
version: "1.0.0"
---
Some digits have fallen out of the sums. Put them back so that every line
of the working is right.

## What it is

A page of written calculations — column additions and subtractions,
multiplications, long multiplications with their partial products, and
long divisions with all their working — where some digits are replaced by
empty boxes. Each box hides one digit, and there is exactly one way to
fill all the boxes so that every line of the working is correct.

## How to play

- Write one digit, 0 to 9, in each box. A number never starts with 0.
- Start with a column where only one digit is missing: the other digits
  in that column, and the carry from the column on its right, tell you
  what it must be.
- Work from the right-hand column (the ones) to the left, just as you
  would do the sum. Remember the carries in an addition and the
  exchanges (borrowing) in a subtraction.
- Sometimes a box cannot be found from its own column. Then look at the
  next column to the left: it tells you whether a ten was carried, and
  that decides the box.
- In a multiplication, each digit of the answer comes from the
  multiplication in its column plus what was carried. In a long
  multiplication, the lines in the middle are the top number times each
  digit of the bottom number; they add up to the answer.
- In a long division, each step is: how many times does the divisor go in,
  write that digit on top, multiply, take away, and bring down the next
  digit. The last line is 0.
- Check your finished sum by doing it again the ordinary way.

## Purpose

Missing-digit puzzles turn routine column arithmetic inside out: instead
of following the steps, the solver must understand why each step works —
what a carry is, how borrowing changes a column, which times-table fact
can end in a given digit. They are a classic reasoning exercise for upper
primary pupils and a good check of written methods.

Grade notes: **Kids** suits grade 2 (age 7-8): 2-digit additions with
every box found in its own column. **Easy** suits grades 2-3 (age 7-9):
2- and 3-digit additions and subtractions. **Medium** suits grades 3-4
(age 8-10): a carry or borrow must be worked out from the next column;
multiplication by one digit. **Hard** suits grades 4-5 (age 9-11): two
columns of look-ahead, 4-digit sums, long multiplication and long division
by one digit. **Expert** suits grades 5-6 and up (age 10+): long
multiplication and long division (also by 11-25) whose boxes need a look
ahead.

## History

Skeleton arithmetic — sums with digits replaced by stars or boxes — is an
old recreational-maths genre: "skeleton divisions", where nearly every
digit is missing, were popular puzzles in the early twentieth century,
and missing-digit sums are a standard of primary reasoning worksheets.

## This implementation

- **Spec knobs:** `difficulty`, `operation` (`mixed`, `addition`,
  `subtraction`, `multiplication`, `division`), `count` (4-12 puzzles,
  clamped with `requested_count`), `width`, `height`, `line`. An operation
  that has no puzzles at the requested level (addition at Expert, division
  at Kids) is served at its nearest level with `requested_difficulty`.
- **Generation:** numbers for the operation at the level are drawn (sums
  of two or three 2-4 digit numbers, a 2-3 digit number times one digit,
  2-3 digit times 2 digit with partial products, 2-3 digit quotients times
  a divisor 2-9 or 11-25 for exact long divisions); their whole working is
  laid out line by line; random digits of it are boxed (1-6 by level). A
  skeleton is kept only if it has exactly one filling and rates at the
  level; up to 4000 tries per puzzle, else the nearest level found.
- **Solving:** an exhaustive search over the boxes in the starting
  numbers, column by column from the ones (a sum's, difference's or
  product's low digits depend only on its numbers' low digits), checking
  every printed digit of every line as soon as its column is fixed; long
  division is searched divisor first, then dividend digit by digit from the
  left, re-running the division. A final check compares the whole
  working: lengths, leading digits, the zero remainder. More than 400,000
  nodes counts as ambiguous, never unique.
- **Rating:** the look-ahead — how many columns (division: digits) a wrong
  digit survives before a printed digit rules it out. *Direct* (0): every
  box from its own column; *carry* (1): a carry or borrow decided by the
  next column; *deep* (2+). Levels by operation and rung
  (`rating_basis: operation_and_carry_lookahead`): Kids 2-digit addition,
  at most 2 boxes, direct; Easy addition/subtraction direct; Medium
  addition/subtraction carry, or multiplication by one digit direct; Hard
  addition/subtraction deep, multiplication by one digit carry, long
  multiplication or long division direct; Expert the rest. The page is
  rated by its hardest puzzle; meta lists each puzzle's operation,
  numbers, boxes, rung and level.
- **Guarantees:** deterministic per seed; `unique: true` — each puzzle has
  exactly one filling. Tests count the fillings again with a plain
  odometer over every box in every line and an arithmetic judge written
  afresh (sums, partial products, each division step), check that
  changing any boxed digit breaks the working, and that every band is
  served.
