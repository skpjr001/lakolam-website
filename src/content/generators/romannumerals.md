---
title: "Roman Numerals"
blurb: "Roman numeral worksheets — conversions both ways, Roman clock faces and Roman arithmetic"
category: maths
version: "1.0.0"
---
Numbers to write in Roman numerals and Roman numerals to read, from I to
XX up to MMMCMXCIX, with Roman clock faces and Roman arithmetic.

## What it is

A worksheet with a NAME and DATE line, a strip showing the value of each
Roman letter used on the page (I = 1, V = 5, X = 10 …), numbered
conversion problems and an answer key. Half the problems give a number to
write in Roman numerals and half give a Roman numeral to write as a number
(or all one way). The easy levels add clock faces numbered I to XII whose
time is to be read; the top levels add sums, differences and products
written in Roman numerals with the answer to be written in Roman numerals
too. The answer key shows every answer in red.

## How to play

The letters are worth I = 1, V = 5, X = 10, L = 50, C = 100, D = 500 and
M = 1000. Letters are written from the biggest value to the smallest and
added up: XVII = 10 + 5 + 1 + 1 = 17. The same letter is never written
more than three times in a row; instead, a smaller letter written before a
bigger one is taken away: IV = 4, IX = 9, XL = 40, XC = 90, CD = 400 and
CM = 900. Only these six pairs are used.

To write a number in Roman numerals, split it into thousands, hundreds,
tens and ones and write each part: 1994 = 1000 + 900 + 90 + 4 = M CM XC IV
= MCMXCIV. To read a Roman numeral, add the letters, taking away any
letter that stands before a bigger one.

For a clock, read the hour hand (the short one) and the minute hand (the
long one) as on any clock; the numerals I to XII stand for 1 to 12.
Write the time in numbers, such as 9:35.

For Roman arithmetic, change the numerals to numbers, work out the answer,
and write it back in Roman numerals.

## Purpose

Roman numerals still appear on clocks, book chapters, monarchs' names,
film credits and building dates, and they are part of the primary
curriculum in England (Years 3 to 5) and India, and taught in many US
classrooms in grades 3 and 4. Converting between the two systems makes
children think about place value from outside: a system without zero or
place value shows by contrast why ours works so well.

## History

The Romans developed their numerals from tally marks and Etruscan
symbols; subtractive forms such as IV appear in Roman times but were not
used consistently until the Middle Ages, and many clocks still show IIII
for four. Roman numerals were the standard way of writing numbers in
Europe until the Hindu-Arabic digits spread after Fibonacci's Liber Abaci
(1202). Roman arithmetic was done on a counting board or abacus, not on
the numerals themselves.

## This implementation

- **Spec knobs:** `difficulty`; `max` (largest number, 5-3999);
  `direction` (`both`, `to_roman`, `from_roman`); `conversions` (0-30);
  `clocks` (0-12); `arithmetic` (0-12); `reference` (the letter-value
  strip); page `width`, `height`, `line`.
- **Difficulty (grade):** Kids = 12 conversions within 1-20 and 6 clocks at
  the hour and half hour (grade 2-3, UK Year 3); Easy = 15 conversions
  within 1-50 and 6 clocks to five minutes (grade 3, Year 4); Medium = 24
  conversions within 1-100 (grade 4); Hard = 16 conversions within
  1-1000 and 6 Roman additions and subtractions (grade 5, Year 5); Expert
  = 14 conversions within 1-3999 and 8 Roman additions, subtractions and
  multiplications (grade 6).
- **Generation:** conversion numbers are all different; at least half of
  them (rounded up) need a subtractive pair, or every such number in range
  when there are fewer (only IV, IX, XIV and XIX up to 20). With
  `direction: both` exactly half (rounded up) are written into Roman
  numerals. Sums keep operands and answers within the range, subtractions
  positive, and every numeral short enough for one line; no sum repeats
  (either order for + and ×). Clock times are all different.
- **Solving:** numerals are made by a greedy table of the thirteen values
  M, CM, D, CD, C, XC, L, XL, X, IX, V, IV, I; the arithmetic is exact
  integer arithmetic.
- **Guarantees:** deterministic per seed. Every numeral is in standard
  subtractive form (IV, never IIII; XCIX, never IC). An independent
  parser, which reads a numeral place by place and accepts only standard
  forms, reads every printed numeral back to its number. The tests run the
  round trip for all of 1-3999, check a third reading by the symbol rule,
  check all 3999 numerals are distinct, and try every string of up to five
  Roman letters to show the parser accepts exactly the standard ones. Clock
  faces use IV (the standard form), although many real clocks show IIII.
  Meta records `answers_checked`, `no_duplicates`, `canonical:
  subtractive`, `round_trip_checked`, the grade and `rating_basis:
  number_range_and_tasks`. A page takes about a millisecond.
