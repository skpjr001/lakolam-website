---
title: "Rounding"
blurb: "Rounding and estimation worksheets — nearest 10 to 100,000 and decimal places, half up"
category: maths
version: "1.1.0"
---
Rounding practice from two-digit numbers on number lines to seven-digit
numbers and decimals, with estimation problems that round first and
calculate second.

## What it is

A worksheet of numbered rounding problems with a NAME and DATE line and an
answer key. Each problem shows a number, the place to round to written
small above it ("NEAREST 100", "NEAREST TENTH", or "1 DECIMAL PLACE" on
UK pages), an arrow and a line for the answer. At the easy levels every
problem has its own number line running from the multiple below the number
to the multiple above, with ten small steps, a longer tick at the halfway
point and a pointer at the number. Estimation problems give a sum,
difference or product and three lines underneath: round each number, then
work out the answer with the rounded numbers. The page prints the rounding
rule, and the answer key shows every answer in red and rings the nearer end
of each number line.

## How to play

Find the place you are rounding to and look at the digit just to its
right. If that digit is 5 or more, round up: add one to the rounding digit
and change every digit after it to zero. If it is 4 or less, round down:
keep the rounding digit and change every digit after it to zero. A number
exactly halfway, such as 350 to the nearest hundred, rounds up (to 400).
For decimals, drop the digits after the rounding place instead of writing
zeros; 3.96 to the nearest tenth is 4.0.

With a number line, see which end the pointer is nearer to. If it sits
exactly on the halfway tick, choose the end above.

For an estimate, round each number as the problem says, write the rounded
numbers on the first two lines, then add, subtract or multiply them and
write the estimate on the last line.

## Purpose

Rounding is the start of number sense for large numbers: knowing that
4,738 is "about 5,000" is what lets a child check whether a calculator
answer is reasonable. It depends on place value (which digit is the
hundreds?) and on seeing numbers on a line (which multiple is nearer?), so
the easy levels put the number line in front of the child and the harder
levels take it away. Estimation turns rounding into a checking tool for
real calculations.

## History

Rounding is as old as measurement, but the schoolroom rule "five or more,
round up" was standardised with decimal arithmetic in the 18th and 19th
centuries. Scientists and banks sometimes round exact halves to the
nearest even digit instead, to avoid bias over many sums; school
curricula in the US, UK and India teach rounding halves up, and so does
this page. Estimating by rounding became a named skill in school
curricula in the late 20th century, when calculators made checking
answers more important than working them by hand.

## This implementation

- **Spec knobs:** `difficulty`; `places` (any of `ten`, `hundred`,
  `thousand`, `ten_thousand`, `hundred_thousand` for whole numbers, and
  `one`, `tenth`, `hundredth` for decimals); `digits` (2-9, the length of
  whole numbers to round); `problems` (0-30, 0-16 with number lines);
  `estimates` (0-12); `number_line`; `tight`; `locale` (`us`, `uk`, `in`:
  1,234,567 or 12,34,567 grouping and "nearest tenth" or "1 decimal
  place" wording); page `width`, `height`, `line`.
- **Difficulty (grade):** Kids = 12 two-digit numbers to the nearest 10 on
  number lines (grade 2-3); Easy = 12 three-digit numbers to the nearest
  10 and 100 on number lines (grade 3); Medium = 15 four-digit numbers to
  the nearest 10, 100 and 1,000, plus 6 estimates of sums and differences
  (grade 3-4); Hard = 14 problems mixing five- and six-digit numbers to
  the nearest 100 to 10,000 with decimals to a whole number and a tenth,
  plus 6 estimates with four-digit numbers (grade 4-5); Expert = 14
  problems with six- and seven-digit numbers to the nearest 1,000 to
  100,000 and decimals to a hundredth, plus 6 estimates including
  products (grade 5-6).
- **Generation:** every place asked for is dealt out evenly across the
  problems. Whole numbers are drawn with exactly the requested number of
  digits; decimals have one to three digits before the point and one or
  two more decimal places than the rounding needs, ending in a non-zero
  digit. A number that is already rounded (4,700 to the nearest hundred)
  is never asked. In tight mode the deciding digit (the one right of the
  rounding place) is always 4 or 5, so every problem sits at the halfway
  point and both sides of it appear. Estimation subtractions keep both
  the true and the rounded difference positive. No problem repeats.
- **Solving:** rounding is done on scaled integers (the number times a
  power of ten), never on floating point: the remainder below the rounding
  place is compared with half the place, and exact halves go up.
- **Guarantees:** deterministic per seed. Every answer is checked three
  independent ways: the scaled-integer rounding, the written rule applied
  to the digit string (with carries such as 9.96 to 10.0 and 995 to
  1,000), and the definition (the answer is a multiple of the place, no
  more than half a place away, halves going up). The tests prove the three
  agree for every whole number from 1 to 200,000 at every whole place and
  every decimal from 0.001 to 99.999 at every decimal place. The half-up
  rule is printed on every page. Tight mode is verified on every problem.
  Numbers are grouped in the chosen locale's style (Indian lakh grouping,
  and "NEAREST 1,00,000", on `in` pages). Meta records `answers_checked`,
  `no_duplicates`, `rule: half_up`, `tight`, the grade and `rating_basis:
  digits_and_places`. A page takes a few milliseconds.
- **Out-of-range knobs (1.1.0+):** a knob outside its range is held to it
  instead of refused, and meta names it in `adjusted`: `digits` to 2–9 and
  lengthened to what the chosen places need (rounding to the thousands needs
  four-digit numbers), `problems` to 30 (16 with number lines), `estimates`
  to 12, and a page asking for nothing gets one problem. A request with too
  few different numbers is still refused.
- **Too many problems for the page (1.1.0+):** when the problems asked for
  do not fit the page legibly (a half-size page, say, or a long list in
  large print), the page places as many as fit, at least one, removing one
  problem or estimate at a time (from whichever there are more of), and
  records the count asked for as `requested_problems` in meta, instead of
  refusing. Pages that fitted before are unchanged.
