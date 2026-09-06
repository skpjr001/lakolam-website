---
title: "Binairo"
blurb: "Binairo — balance two symbols with no three alike and no twin lines"
category: puzzle
version: "1.0.0"
---
Fill the grid with two symbols: no three alike in a line, equal counts in
every line, and no two identical lines.

## What it is

A square grid, even-sided, partly seeded with white and black circles. Three
rules finish it: no three consecutive cells in a row or column may match,
every row and column holds exactly half of each symbol, and no two rows — or
two columns — may be identical.

## How to play

The opening moves are local: a pair (`●●`) caps itself at both ends, and a
gap between twins (`●_●`) must break them. When those run dry, count — a line
that has spent its quota of one symbol fills the rest with the other. The
expert move is the twin rule: a finished line forbids its duplicate, which
can pin the last open cells of a nearly-matching one.

## Purpose

The most widely published binary-logic genre — newspapers run it as "Binary
Puzzle" or "Takuzu" — and a natural fit for the shared solver's two-value
domain machinery, which nonogram, kakurasu and slitherlink already exercise.
It also adds a constraint form the engine lacked: pairwise distinctness of
whole lines.

## History

Published as *Binairo* by Belgian setters Peter De Schepper and Frank Coussement
in 2009, and independently as *Takuzu* and *Unruly*. The genre's ancestry runs
through Games Magazine's *Tohu wa Vohu*.

## This implementation

- **Spec knobs:** `size` (even, 6–12), `difficulty`, `cell`, `line`.
- **Generation:** randomised depth-first fill of a full valid grid, then
  symbols are dug out one at a time while the technique ladder still finishes
  the board at the requested difficulty's ceiling.
- **Solving:** four propagators, one per human rung — the pair/gap moves
  (naked single), line counting (hidden single), whole-line enumeration under
  both in-line rules (the combination rung), and the finished-twin rule
  (hidden pair).
- **Guarantees:** deterministic per seed; exactly one solution, proven by
  exhaustive count; the printed board solves by inference alone, and the
  rating is the hardest technique the solve actually used.
