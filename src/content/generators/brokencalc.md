---
title: "Broken Calculator"
blurb: "Broken calculator — make the target with only the working keys, in the fewest presses"
category: maths
version: "1.0.0"
---
Some keys are broken. Can you still make the number, in as few presses as
possible?

## What it is

Each puzzle shows a calculator with some keys crossed out and a target
number. The target always uses a broken digit, so it cannot simply be
typed: you have to build it from the keys that still work. Every puzzle
can be done, and the answer page gives the fewest key presses it can take.

The calculator is a simple one. It works each step as you go, so
2 + 3 × 4 = shows 20 (2 + 3 is 5, then 5 × 4 is 20). It only shows whole
numbers from 0 to 9999: no numbers below zero and no remainders.

## How to play

Look at the target and at the keys that work. Find a way to make the target
with only those keys, then press = to finish. Count every key you press,
the = too. Write your keys on the line and your number of presses below.

Then try to do it in fewer presses. The answer page shows one way with the
fewest presses; if yours uses the same number of presses, you found a best
answer too, even if your keys are different.

Some ideas: if the 4 is broken, 24 can be 23 + 1 = (five presses) or
3 × 8 = (four presses). Multiplying gets to big numbers quickly. Subtracting
from a number you can type (like 50 - 1 = for 49) is often short.

## Purpose

Number sense and mental arithmetic with a puzzle twist: making numbers in
different ways, place value (why a missing digit matters), and the order
of operations on a real calculator. Grade notes: Kids (one broken digit,
+ and -, targets 10-30) suits grades 1-2 (year 2-3, ages 6-8); Easy (two
broken digits, targets to 60) grade 2-3; Medium (three broken digits, × as
well, targets to 100) grades 3-4; Hard (four broken digits, × ÷ and one of
+ -, targets to 200) grades 4-5; Expert (five broken digits, one or two
broken operations, targets to 500) grades 5-6 and puzzle fans.

## History

"Broken calculator" problems have been a favourite of maths teachers since
pocket calculators reached classrooms in the 1970s and 1980s, as a way to
turn a calculating machine into a thinking tool. They appear in many
primary curriculum resources and number-sense activities, and as
programming puzzles where the shortest key sequence is found by search.

## This implementation

- **Spec knobs:** `difficulty`; `problems` (1-6; 0 = 4; more are clamped,
  `requested_problems`); `width`, `height` (Pt, default US letter), `line`.
- **Generation:** each band fixes the broken digits, which operations work,
  the target range and the range of fewest presses: Kids 1 digit, + -,
  10-30, 4-5 presses; Easy 2 digits, + -, 20-60, 4-6; Medium 3 digits,
  + - ×, 20-100, 5-7; Hard 4 digits, × ÷ and one of + -, 50-200, 6-9;
  Expert 5 digits, × and one or two of + - ÷, 100-500, 7-11. The broken
  digits and the target are drawn at random; a target that can be typed
  with working digits, or repeats on the page, is skipped, and a puzzle is
  kept only when its fewest presses fall in the band's range.
- **Solving:** breadth-first search over calculator states (the pending
  total, the pending operation, the number being typed), one key press per
  level, in a fixed key order. Digits start a new number after `=`; an
  operation key works out the pending step first; `=` needs a number, an
  operation and a second number. A press that would go below 0, above 9999,
  leave a remainder or divide by zero is not allowed (as the page states).
  The first `=` that shows the target is at the smallest depth, so its key
  sequence is the fewest presses. The search has a node budget; a search
  that runs out proves nothing and the target is skipped.
- **Guarantees:** deterministic per seed. In the tests every answer is
  replayed on a second calculator written separately (it keeps the typed
  number as text) and must use only working keys and show the target at
  its final `=`; an independent iterative-deepening search over that
  calculator then proves no sequence one press shorter reaches the target
  (`optimal`, `solvable`, `answers_checked`). The answer page shows one
  fewest-presses sequence; others of the same length may exist and are
  equally right. Rating basis: broken keys, target range and fewest
  presses; every band is served as asked.
