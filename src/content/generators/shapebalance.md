---
title: "Shape Balances"
blurb: "Shape Balances — level balances of shapes and weights: find what each shape weighs"
category: maths
version: "1.0.0"
---
Every balance is level. How much does each shape weigh?

## What it is

A page of picture puzzles. Each puzzle has two to four kinds of shape —
circles, squares, triangles and stars — and as many level balances. On the
pans are shapes, and sometimes a dark weight with a number on it. A
balance is level, so its two sides weigh the same. Every shape of one kind
weighs the same whole number, and there is exactly one set of weights
that keeps every balance level.

## How to play

- Look for a balance with only one kind of shape against a weight:
  3 circles = 12 means one circle weighs 12 ÷ 3 = 4.
- Write each weight you find on the line next to its shape at the bottom.
- Now put the weights you know into the other balances. When only one
  kind of shape is left, you can find its weight the same way.
- Two balances that share some things can be compared: take the same
  things off both sides of both, and what is left still balances. If one
  balance has 2 circles and a square against 14, and another has 1 circle
  and a square against 9, the extra circle must weigh 14 - 9 = 5.
- On harder pages you may need a balance twice or three times over — two
  copies of "a circle and a square = 9" weigh 18 — before you compare it
  with another.
- The hardest pages need three or four balances together: use one balance
  to swap shapes for a number in another, until only one kind of shape is
  left.
- Check your answer: put every weight into every balance. Both sides must
  come out the same.

## Purpose

Shape balances are algebra before letters: each balance is an equation,
each shape an unknown, and the steps — divide, substitute, subtract
equations, scale an equation — are exactly the ones used to solve
simultaneous equations later. The pictures keep the idea of "both sides
stay equal" concrete.

Grade notes: **Kids** suits grades 1-2 (age 6-8): two shapes, weights up
to 10, read and substitute. **Easy** suits grades 2-3 (age 7-9): three
shapes, the same steps, weights up to 12. **Medium** suits grades 3-4
(age 8-10): compare two balances, shapes on both pans, weights up to 15.
**Hard** suits grades 5-6 (age 10-12): take a balance two to four times
over, three or four shapes. **Expert** suits grade 6 and up (age 11+):
four shapes needing three balances at once — simultaneous equations
without letters.

## History

Balance puzzles with pictures are an old favourite of puzzle books and
recreational maths. Hands-on balance methods for teaching equations
spread through classrooms from the 1980s, and online picture-balance
games are among the most played maths-logic pages for children. This is an
original version with shapes of our own.

## This implementation

- **Spec knobs:** `difficulty`, `shapes` (2-4 per puzzle; `null` by
  level: Kids 2, Easy and Medium 3, Hard 3 or 4, Expert 4; clamped with
  `requested_shapes`), `max_weight` (3-50; `null` by level: 10, 12, 15,
  20, 20; clamped with `requested_max_weight`), `count` (1-6 puzzles,
  clamped with `requested_count`), `colour` (coloured shapes, or greys),
  `width`, `height`, `line`.
- **Generation:** the hidden weights are drawn first (different whole
  numbers when the range allows). Each balance puts one to three kinds of
  shape on one pan (up to 3 each at Kids and Easy, 4 above) and, from
  Medium, sometimes a shape or two on the other pan; the other pan's
  number makes it level. As many balances as shapes; a puzzle is kept only
  when the balances pin every weight and the ladder rates it at the level
  (up to 6000 tries, else the nearest level found).
- **Solving:** the balances are linear equations; an exact rational
  Gauss-Jordan elimination must find full rank (every shape pinned) and
  the hidden weights as the one solution. The rating ladder takes the
  easiest step each time: *read* (one kind of shape against a number),
  *substitute* (after putting in known weights), *subtract* (two balances
  compared or put together), *scale* (one balance taken 2-4 times against
  another), *system* (exact elimination over all the balances).
- **Guarantees:** deterministic per seed; `unique: true`. Rated by the
  hardest step and the shape count
  (`rating_basis: hardest_elimination_step_and_shapes`): Kids two shapes
  with read/substitute, Easy three or more with read/substitute, Medium
  subtract, Hard scale, Expert system. A level the shape count cannot
  reach (Expert with two shapes) is served at the nearest level with
  `requested_difficulty`. Tests check every weight vector up to twice the
  range with a plain odometer (exactly one levels every balance), replay
  every ladder step by hand, and solve every app board by its hints alone.
- **App:** `play::puzzle(band, seed)` / `puzzle_with(shapes, max_weight,
  band, seed)` give a board (shape kinds, balances as counts and weights,
  the answer, the rung); `play::check` reports wrong guesses and which
  balances are level, unknown or broken; `play::hint` names a wrong guess
  first, else the next balance (or balances, with how many times each) to
  use, its rule and a sentence saying why.
