---
title: "Compare"
blurb: "Comparing worksheets — <, > or = for numbers, decimals, fractions and expressions, plus ordering"
category: maths
version: "1.0.0"
---
Greater than, less than or equal: pairs of numbers, decimals, fractions
and short sums to compare, with rows of numbers to put in order.

## What it is

A worksheet with a NAME and DATE line, numbered comparison problems and an
answer key. Each problem shows two quantities with an empty circle between
them: whole numbers (from numbers to 20 up to millions), decimals,
fractions and mixed numbers, or short calculations such as 6 × 7 against
40. Below the comparisons come ordering rows: four to six numbers to write
from least to greatest or greatest to least on lines joined by < or >
signs. The answer key writes each sign in red in its circle and each
ordering row in red on its lines.

## How to play

Write <, > or = in each circle so the sentence is true. The open side of
< and > faces the bigger quantity, like a mouth: 7 < 9 and 9 > 7. Write =
when both sides are worth the same.

Whole numbers: the number with more digits is bigger; with the same number
of digits, compare from the left and the first digit that differs decides.
Decimals: line up the decimal points and compare place by place (write
zeros on the end if it helps; 0.5 is the same as 0.50, and bigger than
0.45). Fractions: with the same bottom number, the bigger top number
wins; otherwise rewrite them with a common bottom number, or compare
cross products. Calculations: work out each side first.

For an ordering row, write the numbers on the lines in the order asked,
so each < or > between the lines is true.

## Purpose

Comparing and ordering are the checks behind every other number skill:
place value (why 4,613,627 is less than 4,613,677), decimal sense (why 0.5
beats 0.45 even though 45 beats 5), fraction size and the meaning of the
equals sign as "the same value as" rather than "the answer is". Tight
pairs that differ in a single digit make the child look at every place;
equal pairs such as 0.5 and 0.50, 1 3/4 and 7/4, or 3 + 5 and 10 - 2
stop them guessing that = never comes up.

## History

The signs < and > were introduced by the English mathematician Thomas
Harriot in a book published in 1631, ten years after his death; Robert
Recorde had introduced = in 1557, choosing two parallel lines because "no
two things can be more equal". Comparison with the "alligator mouth" is a
twentieth-century classroom device.

## This implementation

- **Spec knobs:** `difficulty`; `kinds` (any of `whole`, `decimal`,
  `fraction`, `expression`); `tight`; `equals` (the percentage of "="
  answers, 0-100); `problems` (0-30); `order_rows` (0-4);
  `order_length` (3-6 numbers per row); `locale` (`us`, `uk`, `in`:
  1,234,567 or 12,34,567 grouping, and "least to greatest", "smallest to
  largest" or "ascending order"); page `width`, `height`, `line`.
- **Difficulty (grade):** Kids = 15 pairs of numbers from 0 to 20 (K-1);
  Easy = 18 pairs of two- and three-digit numbers and sums or
  differences within 20 (grade 1-2); Medium = 20 pairs of four- and
  five-digit numbers and decimals to hundredths (grade 3-4); Hard = 16
  tight pairs of six- and seven-digit numbers, decimals to thousandths
  and proper fractions (grade 4-5); Expert = 18 tight pairs of decimals,
  improper fractions and mixed numbers, and expressions with all four
  operations (grade 5-6). Every level adds two ordering rows (four
  numbers at Kids, five above) and asks for 20% "=" answers by default.
- **Generation:** kinds are dealt out evenly and the "=" answers are dealt
  round the kinds. Equal pairs are the same whole number, the same decimal
  with a trailing zero (0.5 and 0.50), equivalent fractions with different
  denominators or a mixed number against its improper fraction, or two
  different calculations with the same value. Tight unequal pairs are
  whole numbers or decimals with the same digit layout that differ in
  exactly one digit, fractions with different numerators and denominators
  within a tenth of each other, and calculations one apart. Loose decimal
  pairs often share a whole part and differ in length, the classic trap.
  Sides are swapped at random. No pair appears twice, in either order.
  Ordering rows hold distinct values and alternate between increasing and
  decreasing.
- **Solving:** every side is an exact rational number; comparisons never
  use floating point.
- **Guarantees:** deterministic per seed. Every answer is checked against
  an independent comparison of the printed forms (cross multiplication of
  the unreduced numerators and denominators, and for two decimals the
  written place-by-place comparison, which must agree). The number of "="
  answers is exactly the requested share of the problems, rounded half up.
  In tight mode every unequal pair is tight as defined above. Ordering
  answers are in strict order by the independent comparison. All of this
  is re-checked on every page and proven in the tests across levels,
  kinds, shares and seeds. Meta records `answers_checked`,
  `no_duplicates`, the `equals` count, `tight`, the grade and
  `rating_basis: number_kinds_and_size`. A page takes about a
  millisecond.
