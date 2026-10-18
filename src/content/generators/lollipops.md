---
title: "Lollipops"
blurb: "Lollipops — complete head-and-stick lollipops that never touch and alternate along lines"
category: puzzle
version: "1.0.0"
---
Complete the lollipops: each is a round head with a one-cell stick, they never touch, and along every line no two parts of one kind sit next to each other.

## What it is

A square grid with a few lollipop parts printed in it: round heads,
horizontal sticks and vertical sticks. A lollipop is a head plus a straight
stick in the cell beside it. Finish the printed parts and add any new
lollipops the rules demand. Exactly one finished grid fits.

## How to play

A lollipop takes two cells side by side: one holds the round head, the
other the stick, pointing straight away from the head (a horizontal stick
beside the head to its left or right, a vertical stick above or below it).
There are three kinds of part: heads, horizontal sticks and vertical sticks.

The rules:

1. Every printed head and stick belongs to a lollipop. Complete each one
   by drawing its missing half.
2. Lollipops never touch along a side: the only part beside a head or a
   stick is its own partner. (Touching at a corner is allowed.)
3. Read any row or column, skipping the empty cells. Two parts of the same
   kind must never come one straight after the other: between two heads,
   or two horizontal sticks, or two vertical sticks, there must be a part of
   a different kind. A horizontal and a vertical stick count as different
   kinds.

Rule 3 is what makes new lollipops appear: two printed heads in a row
with only empty cells between them break it, so a part of another kind — a
stick — has to be drawn somewhere between them, and with it a new
lollipop.
Mark cells you know are empty with a dot. Every cell is either empty or part
of exactly one lollipop.

## Purpose

A fresh placement puzzle that combines a tiling rule (pairs that may not
touch) with a "no two alike in a line" rule like that of binary puzzles.
It rewards looking along a whole row at once.

## History

Lollipops is a recent web genre, published with daily boards on a family
of logic-puzzle sites in the 2020s. Its alternation rule is a cousin of
binary puzzles (Takuzu), where no three equal symbols may stand in a row.

## This implementation

- **Spec knobs:** `difficulty`; `size` 5–12 (null = by band; a clamped
  value is reported as `requested_size`); `cell`, `line`. Band boards:
  Kids 5×5, Easy 6×6, Medium 8×8 (all without trial), Hard 8×8 and
  Expert 10×10 (each needing a trial).
- **Generation:** lollipops are placed at seeded spots, each kept when the
  grid stays legal, until no more fit. All their parts printed must force
  the grid; then parts are taken away in seed order while the ladder
  (capped at the band's rung) still settles every cell. Up to 40 seeded
  boards are tried for the requested band.
- **Solving:** every cell is empty, a head, a horizontal stick or a
  vertical stick. A sound ladder — **pairing** (each cell's
  exactly-one-partner rule, by arc consistency), **alternation** (each
  line's rule, by a forward/backward pass over the last part seen),
  **trial** (suppose a value; if pairing and alternation then clash, strike
  it) — must settle every cell, and a propagating count stops at two.
- **Bands** (`rating_basis: "size_and_hardest_rung"`): without a trial
  5×5 is Kids, 6×6 Easy, 7×7 and larger Medium; needing a trial, up to 8×8
  is Hard and 9×9 and larger Expert. An explicit size that cannot reach the
  requested band is served honestly with `requested_difficulty`.
- **Guarantees:** `unique: true`; the tests re-count boards up to 8×8 with
  an independent plain search. The answer key draws every lollipop, printed
  parts in black and the rest in red.
