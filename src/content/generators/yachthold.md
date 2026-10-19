---
title: "Yacht Hold Puzzles"
blurb: "Yacht hold puzzles — five dice and a target row: which dice to hold for the best chance, exactly"
category: maths
version: "1.0.0"
---
Five dice, a roll or two left and a row to fill: which dice do you keep to
give yourself the best chance?

## What it is

In five-dice games of the yacht family you roll five dice up to three times
on a turn. After each roll you may hold (keep) any of the dice and roll the
others again. At the end of the turn the dice are scored in one row of a
score sheet: three of a kind, a full house, a straight and so on.

Each puzzle on the page freezes one moment of a turn. You see the five dice,
how many rolls are left, and the row you are aiming for. Your job is to
decide which dice to hold. Every puzzle has one best hold, and it beats
every other choice by a clear margin.

The rows used are:

- **Three of a kind:** at least three dice the same.
- **Four of a kind:** at least four dice the same.
- **Full house:** three of one number and two of another (five of a kind
  does not count).
- **Small straight:** four numbers in a row: 1-2-3-4, 2-3-4-5 or 3-4-5-6.
- **Large straight:** five numbers in a row: 1-2-3-4-5 or 2-3-4-5-6.
- **Yacht:** all five dice the same.

## How to play

Look at the five dice and the target row. Circle the dice you would hold;
every die you do not circle is rolled again. Write the hold on the line.

With **one roll left**, the dice you roll again must land just right on that
single roll. With **two rolls left**, you roll, look at the dice again, may
change what you hold, and roll once more. A good hold leaves the most ways
to finish.

Think about how many ways the free dice can land. For a large straight,
holding 2-3-4-5 is better than holding 1-2-3-4: the last die can be a 1 or
a 6, two chances in six, instead of only a 5. For a full house, a pair and
another pair is often better than three of a kind and nothing else.

The answer page rings the best hold, gives its exact chance as a fraction
and a percentage, and names the next-best hold with its chance, so you can
see how close it was.

## Purpose

A probability workout in a game setting: counting outcomes, comparing
chances, and the difference between "the one roll" and "the best plan over
two rolls". Grade notes: one-roll counting rows (Easy) suit ages 10-11
(grades 5-6, year 6-7), where children list outcomes of a die; one-roll
full houses and straights (Medium) suit grades 7-8 (year 8-9) as they
learn simple probability as a fraction of equally likely outcomes; two-roll
puzzles (Hard, Expert) are for grade 9 and up (year 10+), and for adult
players, because the second roll needs the chance of each outcome and the
best choice after it (an expected value over a decision). It is also a
pleasure for anyone who plays dice games and wonders whether they hold the
right dice.

## History

Dice games where players keep some dice and roll the rest go back
centuries; poker dice and the many "yacht" games of the 20th century made
the five-dice, three-roll turn familiar, and commercial versions brought it
to millions of homes. The question of which dice to hold is a classic of
recreational probability: around the year 2000 the optimal strategy for the whole
solitaire game was computed exactly by dynamic programming over every
position. These puzzles take one turn at a time from that idea.

## This implementation

- **Spec knobs:** `difficulty`; `target` (`auto`, `three_of_a_kind`,
  `four_of_a_kind`, `full_house`, `small_straight`, `large_straight`,
  `yacht`); `rolls` (1-2; 0 = from the difficulty; larger values are served
  as 2 and reported as `requested_rolls`); `problems` (1-8; 0 = 6; more are
  clamped, `requested_problems`); `width`, `height` (Pt, default US letter),
  `line`.
- **Generation:** the band sets the rolls left and the rows. Easy: one roll,
  three of a kind / four of a kind / yacht. Medium: one roll, full house /
  small straight / large straight. Hard: two rolls, the counting rows.
  Expert: two rolls, the pattern rows. Kids is served as Easy. With `auto`
  the rows take turns down the page. Hands are drawn at random (shown
  smallest first); a hand that already makes its row is skipped, as is a
  hand repeated on the page. A puzzle is kept only when the best hold beats
  the second-best by at least 1/20 (Easy), 1/25 (Medium) or 1/50 (Hard,
  Expert) and has a chance above zero.
- **Solving:** exact enumeration. Holds are compared by the values kept
  (holding one 3 or the other 3 is the same hold), so up to 32 position
  choices collapse to the distinct holds. With one roll left, a hold's
  chance is the number of outcomes of the free dice (grouped by their
  sorted values with their multinomial weights, summing to 6^k) that make
  the row, over 6^k. With two rolls left, each outcome is followed by the
  best one-roll hold from the new hand; the one-roll best chance is
  precomputed for all 252 sorted hands. Every chance is a whole number over
  6^5 or 6^10 and printed as a reduced fraction.
- **Guarantees:** deterministic per seed. Each published best hold is
  re-proved in the tests by an independent brute force over all 32
  position masks and every ordered outcome, with exact rationals and a
  separate memo of the one-roll values: the published chance matches, and
  every hold keeping different values is worse by at least the margin
  (`unique`, `exact_enumeration`, `answers_checked`, `min_margin`). Rating
  basis: rolls left and the target row; a fixed `target` or `rolls` rates
  the page from them and reports `requested_difficulty` when it differs.
