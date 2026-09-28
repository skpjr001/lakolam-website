---
title: "Doppelblock"
blurb: "Doppelblock — two shaded cells per line; edge numbers sum the digits between them"
category: puzzle
version: "1.0.0"
---
Shade two squares in every row and column and fill the rest with digits —
the numbers outside the grid add up what lies between the shaded pair.

## What it is

A square grid, 5×5 to 8×8. Every row and every column holds exactly two
shaded squares; its other squares hold the digits 1 up to two less than the
grid size (1 to 3 in a 5×5, 1 to 6 in an 8×8), each exactly once. A number
beside a row or above a column is the sum of the digits sitting between that
line's two shaded squares. A few digits may be printed inside the grid to
start you off.

## How to play

Read the sums at the extremes first. A 0 means the two shaded squares touch.
The largest possible sum (every digit added up) means the shaded squares sit
at the two ends of the line. A small sum like 1 or 2 allows only one or two
digits between the pair, so the shaded squares must be close together. For
each line, list the ways its sum can be made and see which squares every way
agrees on — a square that is shaded in every option is shaded, and a digit
that cannot fit anywhere between the pair must go outside it. Where rows and
columns cross, their options must agree; keep going until the grid is full.
Remember that every line also needs each digit once, so a digit already used
in a row is ruled out everywhere else in that row.

## Purpose

A number-placement puzzle with a twist in shape: it mixes shading (where are
the two blocks?) with Latin-square digits, and its clues speak of a sum
between two markers rather than a whole row or a cage. It rewards thinking
about a whole line at once and gives a page a striking black-and-white look
once solved.

## History

Invented by Naoki Inaba, and a regular of puzzle championships and magazines
under several names: Doppelblock in German, Tren or Blocks elsewhere, and
"Between Sum" in some English collections.

## This implementation

- **Spec knobs:** `size` (5–8; 0 picks it from the difficulty: 5×5 Kids, 6×6
  Easy, 7×7 Medium, 8×8 Hard and Expert), `difficulty`, `cell`, `line`.
- **Generation:** an answer is filled square by square at random with
  backtracking, keeping each line to two shaded squares and each digit once.
  Every edge sum starts printed; digits are printed inside the grid only while
  the sums alone cannot settle it. The solver thins the printed digits first
  (the sums are the puzzle), then the sums — once with line reasoning and, for
  Expert, once more with trial allowed.
- **Solving:** *line* reasoning — every filling of a row or column that fits
  its sum and current candidates, intersected square by square (kept as
  pattern bitsets) — with *trial* above it: assume one candidate of a square
  holding two or three, run the line logic, strike it on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, since the line
  reasoning is sound and settles every square — confirmed in the tests by an
  independent branching count that lists each line's completions afresh (no
  pattern table) and treats running out of its node budget as ambiguous.
  Rated by grid size and the hardest technique needed; Expert is an 8×8 that
  needs a what-if (a few fresh answers are tried to find one before settling
  for an honest Hard). Sums alone rarely settle a 7×7 or 8×8 with line logic,
  so those boards usually print a handful of digits.
