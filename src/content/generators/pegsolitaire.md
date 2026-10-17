---
title: "Peg Solitaire"
blurb: "Peg solitaire — jump pegs until one is left, from a proven start position"
category: puzzle
version: "1.0.0"
---
Jump pegs over each other until only one is left — on the ringed hole.

## What it is

A board of holes, some holding pegs. A peg may jump over a neighbouring peg,
in a straight line, into the empty hole just beyond it; the peg it jumped
over comes off the board. Each puzzle is a start position that can be
cleared down to a single peg, and the answer key shows every jump on a
little board of its own. There is also a full playing board with the rules,
for a game with real pegs, marbles or counters.

## How to play

Look for a peg with a neighbour and an empty hole straight beyond it, and
jump. Every jump removes exactly one peg, so a board with 12 pegs takes 11
jumps. Write each jump as the hole it starts from and the hole it lands in
("D6-D4"), or the hole numbers on the triangle. The trap is stranding a peg
far from the others with nothing left to jump it: clear the outlying pegs
first and keep the group together. When the ring marks a hole, the very
last jump must land there.

On the square boards pegs jump along rows and columns, never diagonally; on
the triangle they jump along all three lines, in six directions.

## Purpose

A classic one-player strategy game that rewards planning ahead, sized from a
four-peg warm-up on a little diamond to a 23-peg position on the full cross.
It gives the catalogue a "clear the board" puzzle with a proven answer, and
a printable board for the real game.

## History

Peg solitaire was popular at the court of Louis XIV — a 1697 engraving shows
a princess playing on a 37-hole board — and the 33-hole cross became the
standard board in Britain. The 15-hole triangle is the familiar wooden
restaurant-table version. Mathematicians from Leibniz to Conway have
studied it; Conway's "resource count" arguments show which start positions
can and cannot be cleared.

## This implementation

- **Spec knobs:** `mode` (`puzzle` or `board`), `board` (`english` 33
  holes, `european` 37, `triangle` 15, `square` 5×5, `diamond` 13),
  `finish` (`on_mark` — the centre, or a seeded hole on the triangle — or
  `anywhere`), `difficulty`, `answer_lines` (numbered blanks for the jumps).
- **Generation:** start from a single peg on the goal hole and play
  *reverse* jumps (a peg jumps back over an empty hole, which fills): each
  reverse jump adds one peg, so a position built from k of them is solved by
  replaying them forwards. Up to 40 seeded reverse walks are tried; the page
  keeps one in the requested band with the fewest winning lines, and stops
  early at one with a single winning line.
- **Solving:** the winning jump sequences are counted exhaustively (up to
  1000) by the shared state-search crate's memoised depth-first count: each
  position's count is computed once however many move orders reach it.
- **Guarantees:** deterministic per seed. Every puzzle is solvable by
  construction and its answer key is replayed jump by jump before the page
  is returned (`solvable`, `answers_checked`). `winning_lines` gives the
  proven number of winning sequences (capped at 1000) and `unique` is true
  exactly when it is 1 — common on the easier bands, rare on long ones,
  where independent jumps can be taken in either order. Every solution has
  the same length, pegs − 1 jumps, recorded as `optimal_moves`. Rated by
  those jumps: kids ≤ 4, easy 5–7, medium 8–11, hard 12–15, expert 16+.
  The 13-hole diamond reaches at most easy and the triangle at most hard;
  larger requests there are served as the nearest band and recorded as
  `requested_difficulty`. The tests re-count the solutions with their own
  search and require the same number. `mode: board` is a playing board with
  nothing to solve and ships no answer key.
