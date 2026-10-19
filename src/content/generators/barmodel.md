---
title: "Bar-Model Word Problems"
blurb: "Bar-model word problems — part-whole, compare, times as many, fractions of a set and before-after stories with bar models to read, complete or draw"
category: maths
version: "1.0.0"
---
Read the story, draw the bars, and the answer shows itself.

## What it is

A worksheet of short maths stories, each with a bar model: one bar for
each person or thing in the story, cut into parts or equal units, with the
numbers the story gives written on the bars and a question mark where the
answer goes. The stories grow from "how many altogether?" to times as
many, fractions of a set, and amounts that change before and after.

## How to play

- Read the story. Find the people or things it talks about: each one gets
  a bar.
- **Part and whole:** one bar cut into parts. The whole is the brace over
  the top. Add the parts to find the whole, or take a part away from the
  whole to find the other part.
- **Comparing:** two bars, one under the other, lined up on the left. The
  extra bit at the end of the longer bar (dashed when it is the question)
  is how many more one has than the other.
- **Times as many:** a short bar is one unit. "Four times as many" is a
  bar of four of those units. When you know the total or the difference,
  first count how many units it is, then find one unit by dividing.
- **Fractions:** a bar cut into equal parts — the bottom number of the
  fraction says how many. The shaded parts are the fraction the story
  talks about.
- **Before and after:** dashed parts are amounts used or given away. Line
  up what is left, find one unit, and then build back to the start.
- On a page of bars to **complete**, write the story's numbers in the
  empty boxes first. On a page to **draw**, draw your own bars on the
  lines next to the names.
- Write the answer on the line with its word.

## Purpose

Bar models (tape diagrams) turn a story into a picture of its quantities,
so children choose the operation from the picture instead of guessing it
from key words. The same few pictures carry from first-grade addition
stories to the ratio and fraction problems of the upper primary years.

Grade notes: **Kids** suits grade 1 (age 6-7): one step, within 20.
**Easy** suits grade 2 (age 7-8): one step within 100, including "fewer
than". **Medium** suits grade 3 (age 8-9): two steps, three parts within
1000, and times as many with factors 2-6. **Hard** suits grades 4-5 (age
9-11): find one unit from a total or a difference, a fraction of a set,
the whole from a fraction. **Expert** suits grades 5-6 (age 10-12): a
fraction of the rest, and before-and-after stories.

## History

Bar models were developed for Singapore's primary mathematics curriculum
in the 1980s as the "model method", and spread worldwide as tape diagrams
and strip diagrams in other curricula. Interactive bar-model tools became
some of the most used classroom maths pages online.

## This implementation

- **Spec knobs:** `difficulty` (structure, steps and number range),
  `structure` (`mixed`, `part_whole`, `compare`, `times_as_many`,
  `fraction`, `before_after`), `mode` (`read` — the labelled model is
  drawn; `complete` — the bars are drawn with empty boxes for their
  numbers, filled in red on the key; `draw` — names and lines only, the
  key draws the model in red), `count` (4-8 questions, clamped with
  `requested_count`), `width`, `height`, `line`.
- **Generation:** nineteen story kinds, each built backwards from its unit
  value: the unit (or the parts) are drawn first, every other quantity is
  made from it, so every number in the story is whole and positive. Kids:
  part-whole total and part, compare difference and "more" (within 20).
  Easy: the same plus "fewer" (within 100). Medium: three parts (total or
  missing part), compare then total, times as many, times as many then
  total. Hard: sum and difference, units from a total, units from a
  difference, fraction of a set, whole from a fraction, the rest after a
  fraction. Expert: a fraction of the rest, equal amounts then different
  spending, give away until equal. Story kinds are dealt in shuffled
  rounds; repeats and stories that print their own answer are redrawn.
  A structure asked for at a band it does not have (before-and-after at
  Kids) is served at its nearest band with `requested_difficulty`.
- **Solving:** every story keeps its facts as linear equations over its
  quantities ("Ann has 3 times as many as Ben", "together 48"). An exact
  rational Gauss-Jordan elimination of those facts must find full rank
  (every quantity pinned), consistency, and a positive whole solution
  equal to the quantities the story was built from; the asked one is the
  printed answer. The model is checked too: every number printed on a bar,
  brace or bar end is the length it labels.
- **Guarantees:** deterministic per seed; `answers_checked: true` from the
  exact solve, `check: exact_rational_linear_solve`; tests re-solve every
  story again by Cramer's rule in whole numbers, check that removing any
  one fact leaves the story unsolvable (no spare facts), and that no
  story prints its answer. Rated by structure and steps
  (`rating_basis: structure_and_steps`, meta `max_steps` and per-question
  `steps`).
