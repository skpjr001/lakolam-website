---
title: "Number Line Paper"
blurb: "Number line paper — blank or numbered lines from 0-10 to -20-20 and 0-100, with arrowheads"
category: paper
version: "1.0.0"
---
Pages of practice number lines — 0 to 10, 0 to 20, 0 to 100, −10 to 10,
−20 to 20, or blank ticks for the class to number.

## What it is

A page of evenly spaced horizontal number lines, each with an arrowhead at
both ends (the numbers go on for ever) and a tick at every whole number,
equally spaced. The fives stand out as longer ticks — the benchmarks
children count on from — and the numbers are written beneath:

- **0 to 10** and **0 to 20** — every number labelled, for counting,
  adding and taking away;
- **0 to 100** — the tens labelled, medium ticks at the fives and small
  ticks at every number, for counting on in tens and ones;
- **−10 to 10** — every number labelled, for meeting negative numbers;
- **−20 to 20** — the fives labelled;
- **blank** — twenty steps of ticks with no numbers, to number from any
  starting point.

The small ticks can be turned off, leaving only the fives (the tens and
fives on 0 to 100) ticked and numbered — a line for counting in fives or
estimating where a number belongs.

## How to use it

Print the page and give each child a line per question. To add, put your
pencil on the first number and draw a jump to the right for each one you
add — or one big jump of ten — and write the size of each jump above it;
to take away, jump to the left. To find a difference, jump from the
smaller number to the larger and add up the jumps. On the 0 to 100 lines,
jump to the next ten first, then on in tens. On the −10 to 10 line, numbers
to the left of zero are below zero: count the jumps across zero to find,
for example, how much warmer 3 degrees is than −4.

On a blank line, write your own numbers under the ticks — start at any
number and count by ones, twos, fives or tens.

## Purpose

The number line is how primary maths makes numbers into distances: it
supports counting on and back, addition and subtraction, skip-counting,
rounding to the nearest ten, comparing and ordering numbers, and the first
steps with negative numbers. Teachers print class sets for lessons and
homework; in a book, number line pages make a maths practice workbook.

## History

Picturing numbers as points along a line goes back at least to John
Wallis, whose *Treatise of Algebra* (1685) explained negative quantities
by moving backwards along a line from a starting point. In the 20th
century the number line became a staple of school arithmetic, and in the
1990s Dutch mathematics educators of the realistic-mathematics movement
popularised the *empty number line*, on which children mark only the jumps
they make. School standards today ask young children to represent sums and
differences as lengths on a number line diagram with equally spaced points.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `lines` per page (2–12,
  default 6); `range` (zero_to_ten, zero_to_twenty, zero_to_hundred,
  minus_ten_to_ten, minus_twenty_to_twenty, blank); `minor_ticks` (the
  small ticks between the fives, or the units on 0–100); `arrows`
  (arrowheads at both ends); `ink` (default charcoal); `weight` in points
  (0.25–3, default 1).
- **Generation:** the height inside the margins is split into equal bands,
  and each line, with its ticks and numbers, is centred in its band. Along
  the line, room is kept at each end for the arrowhead and half the widest
  number; the unit — the distance from one whole number to the next — is
  the most that fits, rounded down to a whole tenth of a millimetre, and
  the ticks are centred on the line. Long ticks mark the fives (tens on
  0–100), medium ticks the fives on 0–100, short ticks the rest. The
  numbers are sized to fill at most 80% of the space between neighbouring
  numbers, no taller than 3.2 mm; negative numbers are written with an en
  dash, the font's minus sign.
- **Solving:** nothing to solve — a page to work on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every tick sits exactly at a whole number of units from
  the first (recorded as `unit_mm`), the first and last ticks are the
  range's ends, every line on the page is identical, the lines are evenly
  spaced, and all ink — lines, arrowheads, ticks and numbers — stays inside
  the margins, checked on every page size, orientation, range, line count
  and tick setting. A knob outside its range is clamped and recorded as
  `requested_<field>`.
