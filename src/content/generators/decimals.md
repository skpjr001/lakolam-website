---
title: "Decimals"
blurb: "Decimal worksheets — add, subtract, multiply, divide, round, compare and convert, exactly"
category: maths
version: "1.0.0"
---
Decimal practice from tenths and hundredths to thousandths: add and subtract
with the points lined up, multiply, long-divide, round, compare, order and
convert to fractions and percents.

## What it is

A worksheet of decimal problems with a NAME and DATE line, numbered problems
in titled sections ("A. ADD", "B. SUBTRACT", ...) and an answer key. Adding
and subtracting are set out in columns with the decimal points one under the
other; multiplying is set out the written way, with rows for the partial
products when the second number has two digits; dividing by a whole number
uses the long-division bracket. Other sections ask you to multiply or divide
by 10, 100 and 1000, round to the place shown, write <, > or = between two
decimals, put decimals in order, or write a number as a decimal, a fraction
and a percent. The answer key shows every answer in red (and, for long
multiplication, the partial products). Pages can use a decimal comma
(3,75) instead of a point.

## How to play

- **Add and subtract.** The decimal points are lined up for you: work from
  the right-hand column leftwards exactly as with whole numbers, and put the
  point in the answer straight under the others. Where one number has fewer
  decimal places, imagine (or write) zeros in the empty places, so 8.3 -
  7.36 is worked as 8.30 - 7.36.
- **Multiply.** Multiply as if there were no points. Then count the decimal
  places in both numbers together; the answer has that many places. For a
  two-digit second number, write the two partial products on the lines and
  add them.
- **Multiply or divide by 10, 100 or 1000.** Each zero moves every digit one
  place: to the left when you multiply (the number gets bigger), to the
  right when you divide.
- **Divide by a whole number.** Divide as usual under the bracket and put the
  point in the answer straight above the point in the number you are
  dividing. If there is something left over, write a zero after the last
  digit and keep going; every answer on the page comes out exactly.
- **Divide by a decimal.** Multiply both numbers by 10 (or 100) until the
  number you divide by is whole, then divide.
- **Round.** Look at the digit just after the place shown: 5 or more rounds
  up, 4 or less leaves the place as it is. Keep the zeros that show the
  place (3.96 to the nearest tenth is 4.0).
- **Compare and order.** Line the numbers up by their points (write zeros so
  they have the same number of places), then compare from the left. 0.5 is
  bigger than 0.45, and 0.50 is the same as 0.5.
- **Decimal, fraction, percent.** A decimal with two places is that many
  hundredths, and hundredths are percent: 0.37 = 37/100 = 37%. Write every
  fraction in its simplest form.

## Purpose

Decimals carry place value past the ones column, and most mistakes come from
losing track of the point: adding 3.7 and 12.458 as if their last digits
lined up, or putting the point in the wrong place after multiplying. Pages
that line the points up for adding, and set out multiplication and division
the written way, practise exactly those habits; comparing, rounding and
converting build the number sense to judge whether an answer is sensible.

## History

Decimal fractions were described by the Persian mathematician al-Kashi in
the 1400s and popularised in Europe by Simon Stevin's pamphlet De Thiende
(The Tenth) in 1585. John Napier helped make the decimal point standard in
the early 1600s; much of continental Europe writes a decimal comma instead,
a convention this worksheet can follow.

## This implementation

- **Spec knobs:** `difficulty`; `operations` (any of `add`, `subtract`,
  `multiply_whole`, `multiply_decimal`, `powers_of_ten`, `divide_whole`,
  `divide_decimal`, `round`, `compare`, `order`, `convert`; one section
  each); `places` (1 tenths, 2 hundredths, 3 thousandths); `whole_digits`
  (1-4 before the point); `layout` (`vertical`: columns and long division,
  or `horizontal`: one line each); `decimal_mark` (`point` or `comma`);
  `point_guides` (print the point in each answer space); `grid_support`
  (digit boxes); `problems` (1-40, 1-16 in `large_print`; 0 = 20, or 16 at
  Hard and Expert); `large_print`; page `width`, `height`, `line`.
- **Difficulty (grade):** Kids = grade 4 (add, subtract and compare tenths
  and hundredths, one whole digit);
  Easy = grade 5 (add, subtract, times and divided by 10/100/1000,
  rounding; hundredths, two whole digits; Kids and Easy print the point
  in each column answer space); Medium = grade 5 (add, subtract,
  multiply by a one-digit whole number, long division by a one-digit
  number; hundredths); Hard = grade 6 (add and subtract to thousandths,
  multiply decimals by decimals, divide by decimals); Expert = grade 7
  (multiply and divide by decimals, rounding, decimal-fraction-percent
  conversion; to thousandths, three whole digits). Every knob can be set
  directly instead.
- **Generation:** numbers are scaled integers. Operands are written with
  exactly their number of places (the last decimal digit is never 0), and
  answers of adding, subtracting and multiplying never end in a 0 after the
  point, so a column answer and a one-line answer read the same. Divisions
  are built backwards: a quotient with at most `places` places is chosen,
  then multiplied by the divisor to make the dividend, which must fit the
  page's places and digits. Comparisons are made deliberately tricky (a zero
  slipped in: 0.45 vs 0.405; fewer places but bigger: 0.5 vs 0.45; digits
  swapped; a trailing zero, which is equal). Conversions use fractions whose
  denominators give terminating decimals (2, 4, 5, 8, 10, 20, 25, 40, 50,
  100, 125, 200, 250, limited by `places`). Problems are drawn without
  repeats (3.4 + 1.25 and 1.25 + 3.4 count as one) and the page refuses,
  with a clear message, requests for more different problems than exist or
  than fit at a readable size.
- **Solving:** answers are computed with scaled-integer arithmetic and
  checked again with exact fractions: sums, differences and products by
  rational arithmetic, quotients by rational division and by multiplying
  back (quotient x divisor = dividend), rounding by floor(v x 10^n + 1/2),
  comparisons and orders by comparing digit strings padded to the same
  places, conversions by comparing the fraction, the decimal and
  percent/100 as fractions.
- **Guarantees:** deterministic per seed. Exact arithmetic only (no floats
  anywhere in an answer). In column layout the decimal points of both
  numbers and of the answer lie in one column, and every digit sits in its
  place-value column (tested on the layout and on the drawn page); in long
  division the quotient's point is straight above the dividend's. Every
  division terminates within `places` decimal places and never divides by
  zero. Fractions are in lowest terms. No two problems on a page are the
  same. All of this is checked by `obeys()` on every page built and in the
  tests across all difficulties, every operation, 1-3 places and 1-4 whole
  digits. Meta records `answers_checked`, `exact_arithmetic`,
  `no_duplicates`, the grade and `rating_basis:
  grade_operations_and_places`. A page takes a few milliseconds.
