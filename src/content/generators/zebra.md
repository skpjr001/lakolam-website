---
title: "Zebra Puzzle"
blurb: "Zebra puzzle — houses in a row, position clues and one proven answer to \"who owns the zebra?\""
category: puzzle
version: "1.0.0"
---
A row of houses, a handful of clues, and one question: who owns the zebra?

## What it is

Three to six houses stand in a row, numbered from the left. In each house
lives one person, and every house has exactly one value in each category —
a colour, a pet, a drink, a job, a favourite snack, a sport. No value is
used twice. A list of clues describes the street, and only one arrangement
of everything fits them all. The page ends with a question, such as "Who owns
the zebra?", that you can answer only once the street is worked out.

## How to play

Fill in the table: one row per category, one column per house. Write each
value in the house where it belongs, and cross out values in a house when a
clue rules them out — a small note in the corner of the cell works well.

- **Facts first.** "Ivy owns the cat" and "the tea drinker lives in the
  middle house" can be written straight in. "Max is not the baker" crosses
  one value out of a whole column.
- **One left.** When every house but one is crossed out for a value, it goes
  in the last one; when a house has only one value left in a row, it is that.
- **Link the clues.** If Ivy owns the cat and the cat lives in the green
  house, Ivy lives in the green house. Two things that can never share a
  house in one row cannot share a house at all.
- **Positions.** "Directly to the left of" fixes the distance; "somewhere to
  the left of" only the order, so the left one cannot be in the last house.
  "Next to" means one house apart; "at least two houses apart" means neither
  next door nor the same house; "between" keeps the middle one strictly
  inside; "one of the end houses" means the first or the last.
- **Either-or and if-then.** "The cat owner is either Ivy or Max": cross out
  everyone else. "If Ivy owns the cat, then Max drinks milk": once you know
  Max does not drink milk, Ivy cannot own the cat. "Of Ivy and the baker,
  one owns the cat and the other drinks tea" names two different people.
- **What if?** On the hardest puzzles, pencil in a guess and follow the clues:
  if they clash, the guess was wrong, so cross it out and carry on.

When the table is full, read the answer to the question off it.

## Purpose

The most famous logic puzzle there is, and the gentlest way into reasoning
from clues: no maths, no spelling, just careful reading. Small streets with
plain clues suit young solvers; six-house streets with if-then clues and
long chains of deduction are a real test for adults.

## History

The puzzle appeared in *Life International* on 17 December 1962 as a list of
fifteen clues about five houses, ending with "Who drinks water? Who owns the
zebra?". It is often called **Einstein's Riddle**, with the legend that
Einstein wrote it as a boy and that only 2 % of people can solve it — there
is no evidence for either, and Lewis Carroll is credited just as baselessly.
Magazines turned it into a whole genre, and the tick-and-cross "logic grid"
grew from the same idea.

## This implementation

- **Spec knobs:** `difficulty` (Kids 3 houses × 3 categories, Easy 4 × 3,
  Medium 5 × 4, Hard 5 × 5, Expert 6 × 5), `houses` (3–6) and `categories`
  (3–6, names included) to override the size, `cell` and `line`. Out-of-range
  sizes are clamped and reported as `requested_houses` /
  `requested_categories`.
- **Generation:** a random street (every category a random order), then true
  clues drawn from the band's families — facts, "not", position (directly or
  two houses left/right, somewhere left/right, next to, at least two apart,
  between, an end house), and from Medium neither-nor, either-or, if-then and
  "of A and B, one is …" — added until the deduction ladder settles every
  cell. Clues are then dropped in a seeded order while it still does: first
  while the ladder needs no what-if, then (Hard, Expert) with what-ifs
  allowed — Hard keeps to at most two. The pets always include the zebra; the
  question asks about the value the clues mention least (the zebra wins a
  tie), and its answer is a name. Category words are our own,
  family-friendly lists.
- **Solving:** the full solving grid — every pair of values, ticked, crossed
  or open, with house numbers as one more category — and a ladder of sound
  rungs, easiest first, restarting from the bottom after each change:
  **direct** (a fact clue, a tick crossing its row and column, the last open
  cell), **transitivity** (ticks and crosses carried along a tick; no shared
  partner, no pairing), **either-or**, **ordering** (position clues trimming
  houses), **conditional** (if-then, pairs), then **contradiction** (suppose a
  value is in a house; the lower rungs reach a clash, so it is not). Each clue
  rung keeps only the houses some placement making that clue true allows.
- **Rating** (`rating_basis: "hardest_rung"`, with `hardest_rung` and
  `contradictions` in meta): three or more what-ifs, or any on six houses,
  is Expert; one or two is Hard; otherwise Kids on 3 houses, Easy on 4,
  Medium on 5–6 once position, either-or or if-then reasoning was needed. Ten
  attempts (24 for Hard, the narrowest band) aim at the requested band; the nearest honest band is served
  otherwise, and the request reported as `requested_difficulty`.
- **Guarantees:** exactly one street fits the clues — the ladder's settled
  grid is a proof, re-checked by an exhaustive count (cap 2; running out of
  budget rejects the board), and the tests check it a third way by brute
  force over every arrangement. Every clue is true and every clue is needed
  at the band's ceiling. The answer key fills the table and highlights the
  answer.
- **App API** (`lako_zebra::play`): `Board` (houses, categories with their
  values, each clue as text plus its structure and rung, the question and
  answer, the solution table), `Marks` (placed values and crosses),
  `check`, and `next_deduction`, which returns the next visible step from
  the player's marks with the rung that found it, or names a mistake.
