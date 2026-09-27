---
title: "Str8ts"
blurb: "Str8ts — no repeats in any row or column, and every white run a straight"
category: puzzle
version: "1.0.0"
---
No digit twice in a row or column — and every white run must be a straight.

## What it is

A 9×9 grid (6×6 for beginners) of white and black cells. Fill the white cells
with 1–9 so that no digit repeats in any row or column; digits printed in black
cells count too. Every *compartment* — a run of white cells between black cells
or the edge, across or down — must hold a **straight**: a set of consecutive
digits, in any order (4-6-5 is fine, 4-6-7 is not).

## How to play

Start with the compartments: a run of four cells beside a printed 1 and 2 in
its row can only hold digits from a narrow band, and a digit common to every
straight a compartment could still be must appear somewhere in it. Cross digits
off by row and column as in sudoku; where a compartment's range and its row's
missing digits meet, singles fall out. Harder boards need pairs and triples of
candidates within a row or column.

## Purpose

A syndicated newspaper puzzle (Süddeutsche Zeitung and others) that looks like
sudoku but reasons differently: there are no boxes, so the logic is about
ranges and straights rather than regions. It shares the workspace constraint
engine with `sudoku` and `kakuro`, adding one new constraint — the straight.

## History

Invented by Jeff Widderich and published from 2008 by Syndicated Puzzles; the
name is a play on "straights" in poker.

## This implementation

- **Spec knobs:** `size` (6 or 9; 0 picks from the difficulty), `difficulty`,
  `cell`, `line`.
- **Generation:** a point-symmetric black pattern covering about a fifth of
  the grid; an answer is found by the constraint engine's own search, with a
  handful of seeded digits pinned (each kept only if an answer survives it)
  for variety; about a third of the black cells then print a digit missing
  from their row and column. Givens are dug out of the white cells while the
  ladder still finishes the board.
- **Solving:** rows and columns are all-different groups; each compartment is
  a *straight* constraint — enumerate the straights still possible, strike
  candidates none of them contains (the `relation` rung), and place a digit
  every surviving straight needs when only one cell can take it (a hidden
  single). Then naked pairs and triples, and hidden pairs.
- **Guarantees:** deterministic per seed; exactly one answer, proven by the
  inference ladder and checked by an independent solution count. Str8ts'
  own bands: straight ranges and singles are Easy (Kids on a 6×6), naked
  pairs Medium, triples and hidden pairs Hard. No rung reaches Expert, so an
  Expert request returns an honest Hard, with the request noted in the
  metadata.
