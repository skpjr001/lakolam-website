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

- **Spec knobs:** `entities`, `attributes`, `theme`, `difficulty`.
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
