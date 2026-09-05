---
title: "Heyawake"
blurb: "Paint each room its number of cells, keeping white connected and never running through three rooms"
category: puzzle
version: "1.0.0"
---
Paint cells by the room numbers — no two painted cells touching, white in one
piece, and no white corridor running through three rooms.

## What it is

A grid divided into rectangular rooms. Some rooms carry a number: exactly
that many cells of the room must be painted. Painted cells never share an
edge; the unpainted (white) cells stay connected; and — the rule the puzzle
is named for — no straight run of white cells may pass through three rooms.

## How to play

Numbered rooms are arithmetic: a 2×2 room clued "2" paints a diagonal. The
corridor rule is the real game — every straight line of white must be broken
before it crosses its second room border, which forces paint in rooms with no
number at all. Alternate the two: paint from numbers, then scan rows and
columns for corridors about to run too far.

## Purpose

The workspace's demonstration that **rooms can be the clue**: a typical board
ships with fewer than half its rooms numbered, and the geometry carries the
rest. It also produced a foundation-level win — profiling its search exposed
a shared `dilate` helper costing 110 µs per call, whose four-shift rewrite
sped up every shading puzzle in the workspace.

## History

Nikoli, 1992, by Hiroyuki Fukushima. *Heya wake* means "divided rooms". Its
corridor rule makes it one of the most theory-rich Nikoli puzzles — published
boards lean on parity arguments researchers still write papers about.

## This implementation

- **Spec knobs:** `rows`, `cols`, `max_room`, `difficulty`.
- **Generation:** rooms by guillotine cuts (rectangles by construction), an
  answer found by the same backtracking search that checks boards, then
  **densified** — cells painted until no more fit — because sparse answers
  are not pinned by their counts (a fully numbered sparse board still had
  five answers). Numbers are read off the answer and thinned while unique.
- **Guarantees:** exactly one painting satisfies the numbers, and it is the
  painting they were counted from. The room-by-room search is cross-checked
  against brute force over all 65,536 paintings of a 4×4.
- **Measured, not guessed:** the room cap decides feasibility — at 8×8, cap 4
  left 12/24 boards uniquely determined, cap 6 left 2, cap 9 left 1. Small
  rooms constrain more. Difficulty is the share of rooms still numbered
  (`rating_basis: numbered_room_share`), thresholds set from measured
  quintiles.
