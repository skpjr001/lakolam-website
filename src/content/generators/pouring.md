---
title: "Pouring Puzzles"
blurb: "Pouring puzzles — measure or share water with unmarked jugs in the fewest steps, every answer proven by search"
category: puzzle
version: "1.0.0"
---
Unmarked jugs, a tap and a sink: measure exactly the right amount in the fewest steps.

## What it is

The water-jug puzzle. You have two or three jugs with no markings - only
their sizes are known - and you must end up with an exact amount of water,
using nothing but filling, emptying and pouring. In a sharing puzzle there
is no tap and no sink at all: one jug starts full, and its water must be
shared into two equal halves by pouring between the jugs.

## How to play

- Each jug shows how much it holds. The jugs have no marks, so you only
  know how much is in a jug when it is full, empty, or you have worked it
  out.
- One step is one of these:
  - fill a jug to the top from the tap;
  - empty a jug down the sink;
  - pour one jug into another until the first is empty or the second is
    full, whichever comes first.
- In a sharing puzzle there is no tap and no sink: only pouring.
- Find the fewest steps that leave the asked-for amount in a jug (or, when
  sharing, the two equal halves in two jugs).
- Write the fewest number of steps in the box. Use the table to keep track:
  after every step, write how much is in each jug.

Pouring the smaller jug into the bigger one again and again, and emptying
the bigger one whenever it fills, walks through every amount the jugs can
make - then look for a shortcut the other way round.

## Purpose

Planning ahead, keeping track of several quantities at once, and
discovering that the amounts you can measure are the multiples of what the
jug sizes have in common. A classic for maths clubs, puzzle books and
problem-solving lessons; the tables make the reasoning visible.

## History

Measuring problems appear in Alcuin's and Fibonacci's collections; the
three-jug sharing puzzle (8, 5 and 3 pints shared into two 4s) is
associated with Niccolò Tartaglia in the sixteenth century, and Claude
Gaspar Bachet de Méziriac set out the two-jug measuring puzzle in 1612.
Siméon Denis Poisson is said to have been drawn to mathematics by one. A
film scene with a 5- and a 3-gallon jug made it famous again in the 1990s.

## This implementation

**Spec knobs:** `kind` (`mixed`, `measure`, `share`); `difficulty`; `jugs`
(2 or 3 for measuring puzzles, 0 lets the band choose; sharing always uses
three); `questions` (1-6); `units` (litres, pints, cups, gallons);
`unique_plan`; `table`; `name_line`; page `width`, `height`, `margin`.
Clamped values are reported as `requested_<field>`.

**Generation:** candidate jug sizes and targets are drawn with sizes that
grow with the band (up to 7 for Kids, 17 for Expert; sharing puzzles split
an even jug of 6-24). Each candidate is solved and kept when its fewest
steps fall in the band and, with `unique_plan` (the default), when it has
exactly one shortest plan. A page never repeats a puzzle.

**Solving:** breadth-first search over every reachable set of jug contents
(a few thousand states at most) gives the fewest steps exactly; the number of
shortest plans is counted layer by layer. Steps that change nothing are not
steps. Difficulty is the fewest steps (`rating_basis`: `fewest_steps`):
Kids 2-3, Easy 4-5, Medium 6-7, Hard 8-10, Expert 11-16. Sharing puzzles
rarely reach Kids; the nearest band is served and the request reported as
`requested_difficulty`. When no puzzle with a single shortest plan exists
for a kind and band, any shortest plan is allowed and `requested_unique_plan`
is reported.

**Guarantees:** deterministic per seed; the fewest steps is proved by
exhaustive search and rechecked by an independent relaxation over the
whole state box (and, in tests, by iterative deepening and the gcd rule
for which amounts are possible); the key's plan is replayed step by step
and ends at the goal in exactly that many steps; the key says whether it
is the only shortest plan. Meta: `unique`, `answers_checked`, `difficulty`,
`rating_basis`, `plans_unique`, and every puzzle's sizes, goal, fewest
steps, plan count and plan.
