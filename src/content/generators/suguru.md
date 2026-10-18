---
title: "Suguru"
blurb: "Suguru — each region counts itself, touching cells never match"
category: puzzle
version: "1.2.0"
---
Each region holds the digits 1 up to its own size — and no two touching
cells anywhere, diagonals included, may match.

## What it is

A grid carved into irregular regions of up to five cells. A region of size k
contains each digit 1..k exactly once, and identical digits never touch, not
even at a corner. A handful of givens starts the chain.

Boards come square or rectangular (up to 15×10 and beyond), with regions of
up to five or six cells. A picture edition draws shapes instead of digits —
circle, triangle, square, cross, star, diamond — and often uses regions of
exactly five cells, each holding all five pictures once.

## How to play

Singletons and pairs place themselves. From there the touch rule does the
work: a placed digit sweeps its eight neighbours clean, which often collapses
a nearby region to one arrangement. Feel for the 2×2 blocks — four mutually
touching cells always need four different digits, and that observation cracks
most middle-game positions.

On a picture board the shapes stand for 1, 2, 3 … in the order shown under
the board: a region of three cells holds the first three pictures, a region
of five holds the first five. The same two rules apply — every region holds
its pictures once each, and two identical pictures never touch, not even at
a corner.

## Purpose

A fast-growing newspaper genre (also sold as Tectonic) that slots straight
onto the shared solver: the region rule is `AllDifferent` unchanged, and the
touch rule is one elimination propagator. It also taught the workspace a
geometry lesson worth recording: a 2×2 block is a 4-clique under the touch
rule, so regions and digits cannot be generated separately — the carve has to
respect what the blocks can still drink from.

## History

Invented by Naoki Inaba as *Nanba burokku* (number blocks); published across
Europe as Suguru or Tectonic, where it has become a daily-paper staple.

## This implementation

- **Spec knobs:** `size` (5–9), `width` and `height` (5–15 each, for a
  rectangle such as 12×10 or 15×10; 0 uses `size`), `max_region` (5, the
  default, or 6), `region_size` (0 for mixed sizes; 4, 5 or 6 for every
  region exactly that size — without a `height` the board takes the nearest
  height from 5 to 15 whose area the size divides, e.g. 7×5 for fives on the
  default 7; with an explicit height an indivisible area is refused), `symbols` (pictures for the digits, with the order shown
  under the board), `difficulty`, `cell`, `line`.
- **Beyond the classic squares** (any rectangle, square sides above 9,
  six-cell regions, exact region sizes): a random carve is then almost never
  fillable, so regions and digits are carved together — the first open cell
  in reading order starts a region grown at random, its digits are placed at
  once with no twin touching, and a cut that strands an open pocket under
  three cells (or, for exact sizes, not a multiple of the size) is undone,
  backtracking within a budget. The board so built is a valid answer by
  construction; digging, the ladder, the rating and the uniqueness count are
  the classic ones. Classic boards (5–9 squares, mixed regions up to five)
  keep the original path and are byte-identical.
- **Generation:** regions of three to five cells by seeded growth with
  boxed-in leftovers absorbed into neighbours; a Hall's-condition check on
  every 2×2 block rejects uncolourable partitions before any search; the
  shared solver's own search fills the survivors; digits are then dug out one
  at a time while the ladder still finishes the board at the requested
  ceiling. On 8×8 and 9×9 most random partitions cannot be filled, and a
  seed can miss in all 200 attempts; only then up to 3,000 more attempts run
  from fresh seeds with a smaller fill budget (a dead partition is dropped
  fast), and the first board found is served at the band it earns, labelled
  with the band requested (v1.1.0).
- **Guarantees:** deterministic per seed; exactly one solution, proven by
  exhaustive count; solvable by inference alone; rated by the hardest
  technique the solve actually used.
- **Version 1.2 — the pointing rung:** with only the two rules on the
  ladder, every request from Easy up came back Easy. The genre's signature
  move is now a rung, at sudoku's pointing-pair level: when every cell of a
  region still open to a digit touches one outside cell, that cell cannot
  hold the digit. It runs only at the Hard and Expert ceilings (the fill and
  the uniqueness count search exactly as before), so Kids, Easy and Medium
  boards are byte-identical to 1.1, and Hard and Expert requests now get
  boards that need it. **Reachable bands:** Kids, Easy and Hard. Medium is
  out of reach — measured, the region pair rungs are never what a dug board
  needs, since the touch rule does that work — and Expert has no rung here,
  so both are served as the nearest band with `requested_difficulty`
  recorded.
