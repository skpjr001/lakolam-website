---
title: "Logic Grid"
blurb: "Logic grids with relational clues, minimised to the smallest sufficient set"
category: puzzle
version: "1.1.0"
---
Deduce who owns what from relational clues — the zebra-puzzle formula, with a
tick-and-cross grid to track it.

## What it is

A cast of entities (people, houses, pets…) each holding one value per
attribute (a colour, a drink, a position…). A list of clues — "the tall one
is older than the baker", "Ana does not live in the red house" — pins down
exactly one assignment. The classic solving aid is a grid of every
attribute-pair, ticked and crossed as facts land.

## How to play

Enter the direct clues first (`Is` / `IsNot` become ticks and crosses). Every
tick crosses out its whole row and column within that attribute block. Ordered
clues ("before", "older than") exclude the extremes: whoever is *before*
someone cannot be last. The grid multiplies information — a cross in one block
plus a tick in another yields a cross in a third. When stuck, look for the
attribute pair with only one open cell.

Some puzzles use richer clues:

- **Neither … nor** gives two crosses at once; **either … or** means one of
  the two, so everything else in that row is crossed — and once one choice is
  crossed, the other is a tick.
- **Distances** on an ordered category: "comes directly after" or "exactly 2
  places after" fixes the gap, so neither can sit where the other would fall
  off the end; "next to each other" is a gap of one, "at least two places
  apart" rules out both neighbours and the same place; "somewhere between"
  keeps the middle one off both ends; "comes first or last" leaves only the
  ends.
- **If … then:** "if Ann goes with Cat, then Ben goes with Red" — as soon as
  Ben is crossed with Red, Ann is crossed with Cat.
- **Of A and B, one … and the other …:** A and B are two different people,
  and between them they take both named values, so nobody else has either.
- **What if?** On the hardest grids, suppose a tick and follow it; if the
  clues then clash, that cell is a cross.

## Purpose

The only non-spatial puzzle in the collection — pure relational deduction, no
geometry — and the one that reads most like a story, which makes it the
anchor of themed books. The workspace's clue *minimisation* is the point: a
published clue list with a redundant clue reads as padding.

## History

The form descends from **Einstein's Riddle / the Zebra Puzzle**, first printed
in *Life International* (December 1962) — attributed to Einstein or Lewis
Carroll by legend, with no evidence for either. Dell and Penny Press built
the tick-grid presentation into a durable magazine genre from the 1960s on.

## This implementation

- **Spec knobs:** `entities` (3–7), `attributes` (2–4, names included),
  `theme`, `ordering_clues`, `rich_clues`, `difficulty`, `cell`, `line`.
- **Generation:** a random full assignment is drawn (anchor attribute fixed to
  kill relabelling symmetry — without that, "unique" is meaningless), a
  candidate clue set is emitted from relational templates, then **minimised**:
  clues are removed, in a seeded random order, while the assignment stays the
  only one consistent.
- **v1.1 — ordering clues:** in 1.0 the shuffled removal order was sorted back
  to "last clue first", so the "before" clues (listed last) were always tried
  first and always dropped — `ordering_clues` changed nothing and no page ever
  showed one. The order is now the seeded shuffle, so "before" clues survive
  where they carry weight; every page (the default included) changed. Each
  theme's ordered attribute is its fourth, so ordering clues appear only at
  `attributes: 4`.
- **Guarantees:** exactly one assignment satisfies the shipped clues, and
  every surviving clue is load-bearing — removing any one of them admits a
  second assignment.
- **Difficulty:** clue count against the theoretical minimum, plus inference
  chain depth, banded.
- **v2 clue families** (`rich_clues: true`, and always at 6–7 entities, which
  the classic search cannot settle — 720³ arrangements at 6×4): neither-nor,
  either-or, exact distance ("directly after", "exactly 2 places after"),
  before, next to, at least two apart, between, first-or-last, if-then and
  "of A and B, one is … and the other …", plus the classic is / is-not.
  Position clues use the theme's ordered attribute (age, price, place, day;
  the fourth, so `attributes: 4` with `ordering_clues` on); without it the
  names are the fixed axis and only the non-positional families appear.
  Classic pages (3–5 entities, `rich_clues` off) are unchanged, byte for
  byte.
- **v2 generation and solving:** true clues of the band's families are added
  until a sound deduction ladder settles the whole grid, then dropped in a
  seeded order while it still does. The rungs, easiest first: **direct**
  (fact clues, a tick crossing its row and column, the last open cell),
  **transitivity** (ticks and crosses carried across sub-grids; no common
  partner, no pairing), **either-or**, **ordering** (distance and order
  clues trimming the ordered attribute), **conditional** (if-then, pairs),
  **contradiction** (a what-if that clashes under the lower rungs). An
  exhaustive count (cap 2, budget-limited: an overrun rejects the board)
  re-proves uniqueness; tests check it a third way by brute force.
- **v2 rating** (`rating_basis: "hardest_rung"`, `hardest_technique` and
  `contradictions` in meta): direct only Kids; transitivity or either-or
  Easy; ordering, if-then or pairs Medium; one or two what-ifs Hard; three
  or more Expert. Bands: Kids facts only, Easy + neither-nor / either-or,
  Medium + position, if-then and pairs, Hard and Expert the same families
  with what-ifs allowed (Hard at most two). Three-attribute grids rarely need
  a what-if, so their Hard and Expert usually serve Medium, reported as
  `requested_difficulty`. The engine is vendored from `lako-zebra` (same
  file).
