---
title: "Wall Loop"
blurb: "Wall Loop — one loop through every cell that never crosses a printed wall"
category: puzzle
version: "1.0.0"
---
Draw one loop through every square of the grid without ever crossing a wall.

## What it is

A square grid with a few thick walls drawn between some of its cells. The
answer is a single closed loop that visits the centre of every cell exactly
once, moving only up, down, left or right to a neighbouring cell, and never
passing through a wall. The walls are the only clues, and there is exactly one
loop that fits them.

## How to play

Draw the loop through the dots in the middle of the cells. Every cell has the
loop going in and coming out again, so each dot ends up with exactly two
lines.

- **Corners and walled-in cells first.** A corner cell has only two
  neighbours, so both of its lines are certain. Any cell boxed in by walls or
  the border on two sides is the same.
- **Cross out what cannot be.** Once a cell has its two lines, its other
  sides are closed. That leaves its neighbours fewer ways out, and often only
  two — so they are forced too.
- **No small loops.** The loop is one piece. If a line would join the two ends
  of a piece you have already drawn before every cell is on it, that line is
  wrong. The smallest case: when the loop goes round three sides of a block of
  four cells, the fourth side is closed.
- **Inside and outside.** The loop splits the board into an inside and an
  outside. Two spaces on either side of a line are on opposite sides; two
  spaces joined by a closed gap are on the same side.
- **What if?** On harder boards, try a line one way and follow it; if it soon
  traps a cell or closes a small loop, the line goes the other way.

## Purpose

A clean loop puzzle with no numbers at all: a good first step into loop
logic for children, and a long, quiet chase on the big boards. It sits beside
Slitherlink and Masyu in the loop family.

## History

Loops through every cell of a grid are Hamiltonian cycles, studied since
William Rowan Hamilton's Icosian game of 1857. As a pencil puzzle with walls
for clues it appears under several names (Vermicelli among them) in Japanese
puzzle magazines and in printable collections such as Krazydad's.

## This implementation

- **Spec knobs:** `difficulty`; `size` (cells per side, 4–16, rounded down to
  even; 0 picks the band's side: Kids 6, Easy 8, Medium 10, Hard 12, Expert
  14; a changed request is reported as `requested_size`); `cell`, `line`.
- **Generation:** answer first. A loop through every cell is built from 2×2
  blocks, each its own small loop, merged along a random spanning tree of the
  blocks, then stirred by square flips that keep it one loop. Walls go only on
  edges the loop does not use, so the loop always fits them. Walls are added
  where the capped ladder stalls (a sixth of the undecided unused edges at a
  time) until it settles every edge, then removed one at a time, in seed
  order, while it still does. Six loops are tried for the requested band.
- **Solving:** the sound loop ladder of `lako-loop` with every cell a dot the
  loop must visit and every wall a cross: basics (two lines per cell), the
  2×2 pattern (three sides of a block of four cells taken → the fourth is
  closed), no small loops, inside/outside colouring, what-if, both ways, deep
  what-if. The requested band caps the rungs the wall thinning may lean on.
- **Guarantees:** deterministic per seed; the answer is one loop through every
  cell crossing no wall (checked); the ladder settles every edge from the
  walls alone, and every rung is a pure consequence of the rules, so the loop
  is the only one (`proof: sound_ladder_settles_every_edge`). Tests re-count
  the loops on 6×6 boards with an independent path search. Rated by the
  hardest rung the solve needed and the board size (`rating_basis:
  hardest_rung_and_size`): basics → Kids, the 2×2 pattern → Easy, no small
  loops and inside/outside → Medium, what-if → Hard, and Expert for both ways,
  deep what-if, or a what-if on a board of 14×14 or more. In a survey of 14×14
  and 16×16 boards thinned under the deepest cap, one what-if always unlocked
  the rest, so the size is what makes Expert. A band a board does not reach is
  served as the nearest one with `requested_difficulty`.
- **Meta:** `hardest_rung`, `rung_uses`, `size`, `cells`, `walls`.
- **Play API** (`play`): `puzzle`, `puzzle_from`, `check` (wrong marks, lines
  missing, solved) and `hint` (a wrong mark first, else the easiest rung that
  settles an undecided edge from the player's current marks, and that edge).
