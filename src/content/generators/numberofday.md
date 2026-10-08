---
title: "Number of the Day"
blurb: "Number of the day — one number, every box about it: words, tally marks, ten frames, tens and ones, expanded form, odd or even, more and less, number line, two ways to make it, coins, rounding and more"
category: maths
version: "1.0.0"
---
One number at the top of the page, and a box for everything you can say
about it.

## What it is

The classic morning-work page. A number sits in the box at the top, and a
grid of boxes underneath asks about it: write it in words, show it with
tally marks or in a ten frame, split it into tens and ones, write it in
expanded form, say whether it is odd or even, find one more and one less
(or ten, a hundred, a thousand more and less), mark it on a number line,
find two ways to make it, show it with coins, round it, add its digits,
double it and test whether it is a multiple of 2, 3, 5 or 10.

Kids pages use numbers to 20, with ten frames, tally marks and coins.
Easy pages use two-digit numbers, with tens and ones and coins. Medium
pages use three-digit numbers, Hard pages four digits, and Expert pages
numbers up to 999,999 (or 9,99,999, written the Indian way with lakhs).

## How to play

- Read the number at the top. Every box on the page is about that number.
- **Write it in words** on the lines.
- **Tally marks:** draw four lines and cross them with a fifth for every
  five, then single lines for the rest.
- **Ten frame:** draw one counter in each square, filling the top row
  first, until you have the number.
- **Tens and ones:** write how many hundreds, tens and ones the number
  has, and draw them: a square for a hundred, a stick for a ten, a small
  cube for a one.
- **Expanded form:** write the number as the sum of the values of its
  digits: 347 = 300 + 40 + 7.
- **What is the digit worth?** The underlined digit is worth the digit
  times its place: the 4 in 4,058 is worth 4,000.
- **Odd or even:** circle the right word. Even numbers end in 0, 2, 4, 6
  or 8.
- **More and less:** add or take away the amount named.
- **Number line:** draw an arrow to where the number belongs.
- **Two ways to make it:** fill in two different sums (and, on harder
  pages, a subtraction) that give the number. Any pair that works is right.
- **Coins:** draw coins that add up to the amount. The answers show the
  fewest coins, but any coins that add up are right.
- **Round it:** halfway numbers round up, so 45 rounds to 50.
- **Add the digits**, **double it**, and circle YES or NO for each
  multiple.

## Purpose

Number of the day is a daily routine in kindergarten to grade 5
classrooms: a few minutes with one number, seen many ways, builds number
sense — place value, counting, odd and even, addition facts, money and
estimation all meet on one page. Changing the number each day keeps the
routine fresh while the boxes stay familiar. It covers kindergarten to
grade 2 number-and-operations goals (counting and cardinality, place value
to 1,000, adding and subtracting 10 and 100) and the place-value and
rounding work of grades 3 to 4.

## History

"Number of the day" grew out of the calendar-time and morning-meeting
routines of American primary classrooms in the 1990s, where the day's date
became a number to count, tally and add with. Teachers turned it into a
printable page of boxes, and it is now one of the most common pieces of
morning work in kindergarten to grade 2, with versions for every number up
to 120 and beyond, in the United States, the United Kingdom, Australia and
India.

## This implementation

- **Spec knobs:** `difficulty` (the size of the number: Kids 1-20, Easy
  21-99, Medium 100-999, Hard 1,000-9,999, Expert 10,000-999,999);
  `number` (null lets the seed choose one in the band; a given number is
  clamped to 1-999,999 and sets the band itself, a different request being
  reported as `requested_difficulty`); `locale` (`us`, `uk`, `in`: number
  words with "and" in British English and lakhs in Indian English, digit
  grouping 12,34,567 in India, and the coins — cents, pence or rupees);
  `boxes` (4-12, at most 9 at Kids; 0 is 8 at Kids and 9 otherwise);
  `colour`; `name_line`; `width`, `height` (Pt, default US letter).
- **Generation:** each band has a pool of boxes in a fixed page order.
  The words box is always first and the coin box is always used where the
  band has one (Kids and Easy); the seed picks the rest of the boxes, the
  underlined digit, and the example pairs for "two ways to make it".
  Kids: words, ten frame, tally marks, odd or even, one more and less,
  number line 0-20, two sums, coins, double. Easy adds tens and ones,
  expanded form, ten more and less, rounding to 10 and the digit sum.
  Medium to Expert add hundreds, digit value, more and less by 100, 1,000
  or 10,000, rounding to two or three places, a sum and a subtraction, and
  multiples of 2, 3, 5 and 10. Number lines span one unit of the leading
  place (40-50 for 47, 4,000-5,000 for 4,058), never with the number at an
  end. Coins are drawn as plain tinted discs with their value: 1¢ 5¢ 10¢
  25¢; 1p to 50p; ₹1 to ₹20.
- **Solving:** nothing to search — every box is a function of the number.
  The answer key fills every blank, circles every right choice, draws the
  tally marks, counters, blocks, coins and the arrow on the number line.
- **Guarantees:** `answers_checked`. The model re-derives every box from
  the number before the page is drawn. The tests recompute each box
  independently — the words are read back to the number by a separate
  parser, the coins are re-added and proved fewest by dynamic programming
  (each coin set is canonical, so the fewest are also found greedily),
  rounding is checked against both neighbours, multiples by the digit
  rules — for every number to 1,200, a stride of numbers to 999,999 and
  every band, in all three locales. "Two ways to make it" and "coins"
  accept any working answer; the key shows one and says so.
