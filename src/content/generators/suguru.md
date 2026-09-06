---
title: "Suguru"
blurb: "Suguru — each region counts itself, touching cells never match"
category: puzzle
version: "1.0.0"
---
Each region holds the digits 1 up to its own size — and no two touching
cells anywhere, diagonals included, may match.

## What it is

A grid carved into irregular regions of up to five cells. A region of size k
contains each digit 1..k exactly once, and identical digits never touch, not
even at a corner. A handful of givens starts the chain.

## How to play

Singletons and pairs place themselves. From there the touch rule does the
work: a placed digit sweeps its eight neighbours clean, which often collapses
a nearby region to one arrangement. Feel for the 2×2 blocks — four mutually
touching cells always need four different digits, and that observation cracks
most middle-game positions.

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

- **Spec knobs:** `size` (5–9), `difficulty`, `cell`, `line`.
- **Generation:** regions of three to five cells by seeded growth with
  boxed-in leftovers absorbed into neighbours; a Hall's-condition check on
  every 2×2 block rejects uncolourable partitions before any search; the
  shared solver's own search fills the survivors; digits are then dug out one
  at a time while the ladder still finishes the board at the requested
  ceiling.
- **Guarantees:** deterministic per seed; exactly one solution, proven by
  exhaustive count; solvable by inference alone; rated by the hardest
  technique the solve actually used.
