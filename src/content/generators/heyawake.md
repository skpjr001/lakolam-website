---
title: "Heyawake"
blurb: "Paint each room its number of cells, keeping white connected and never running through three rooms"
category: puzzle
version: "1.2.0"
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
  five answers). From 100 cells up the answer comes from local repair
  instead (see v1.2). Numbers are read off the answer, proved to admit one
  answer, and thinned while unique.
- **Guarantees:** exactly one painting satisfies the numbers, and it is the
  painting they were counted from. The room-by-room search is cross-checked
  against brute force over all 65,536 paintings of a 4×4.
- **Measured, not guessed:** the room cap decides feasibility — at 8×8, cap 4
  left 12/24 boards uniquely determined, cap 6 left 2, cap 9 left 1. Small
  rooms constrain more. Difficulty is the share of rooms still numbered
  (`rating_basis: numbered_room_share`), thresholds set from measured
  quintiles.
- **Knobs that find nothing (v1.1):** `max_room` of 0–2 found no board, and 3
  failed for some seeds. Now, only when the requested cap finds nothing, a
  second pass from fresh seeds retries it and raises it a step at a time
  toward 4; a cap above 4 that finds nothing drops straight to 4, since big
  caps are slow to fail. The metadata reports `max_room_used`. Every board
  that generated before is unchanged. Caps of 9–12 are slow (tens of
  seconds), as the measurements above predict.
- **Version 1.1.1 — the request note is spelled `requested_difficulty`.**
  Earlier versions wrote `difficulty_requested`, which nothing else in the
  catalogue reads. Pages and keys are unchanged.
- **Version 1.2 — 11×11 generates, and every board is checked whole.**
  11×11, the largest documented size, failed on most seeds ("no 11x11 board
  survived thinning") after 20–30 s, and 10×10 took up to 20 s. The cause was
  the answer, not the thinning: the search that checks boards also supplied
  the unnumbered answer to start from, and on a 10×10 or larger carve it ran
  out of its node budget on 36–40 carves in 40, because the run rule only
  bites once three rooms in a line are settled. Answers for boards of 100
  cells or more now come from **local repair** — start all white, and while
  some white run crosses three rooms, paint a cell of the shortest stretch
  that breaks it, clearing touching paint and lifting nearby paint whenever
  the white would split — which settles about two carves in three. Those
  boards also stop looking for the requested band two attempts after the
  first board is found (thinning one takes about two seconds and the bands
  are narrow: 10×10 and 11×11 measure Kids and Easy, Medium rarely), so an
  11×11 board now takes 2–7 s. Smaller boards try repair only after the
  search's first pass has found nothing, before the `max_room` ladder.
  Also fixed: the fully numbered board is now proved to have one answer
  before thinning. Thinning only checked a board after removing a number, so
  a fully numbered board with two answers kept every number and could ship
  (seen on a 4×4); such boards are now rejected. Boards under 100 cells that
  the first pass built and that were unique are unchanged; 10×10 and larger
  boards, boards the first pass did not build, and the rare ambiguous board
  change.
