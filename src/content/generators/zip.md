---
title: "Zip"
blurb: "Zip — one path through every cell, passing the numbered checkpoints in order"
category: puzzle
version: "1.0.0"
---
Draw one line through every square, passing the numbers in order.

## What it is

A square grid with a few numbered checkpoints and, sometimes, short walls
between squares. Draw a single line that starts at 1, passes 2, 3, 4 … in
order, finishes on the highest number, and visits every square exactly once.
The line moves across or down between neighbouring squares — never
diagonally, and never through a wall.

## How to play

Work outward from the ends and the walls. A square in a corner, or boxed in by
walls, has only two ways in or out, so both must be used. Between two
consecutive checkpoints the line cannot visit a higher number first, which
blocks whole corridors. Watch for squares that would be cut off: every square
the line has not yet reached must stay connected to it, and only the final
square may be a dead end.

## Purpose

The print form of LinkedIn's daily *Zip* (one of its most-played games since
2025) and a clean path puzzle for all ages: it shares its spirit with `hidato`
and `numberlink`, but the numbers are sparse waypoints rather than every
step, so the reasoning is about corridors and dead ends.

## History

LinkedIn launched *Zip* in 2025 among its daily games; single-path puzzles
through numbered checkpoints have older cousins in Hamiltonian-path puzzles
such as Hidato and Numbrix.

## This implementation

- **Spec knobs:** `size` (3–9; 0 picks from the difficulty — 4×4 Kids up to
  8×8 Expert), `difficulty`, `walls` (use walls as clues), `cell`, `line`.
- **Generation:** a random line covering the grid is drawn by Warnsdorff's
  rule with backtracking; every square starts as a checkpoint and a few walls
  are placed across squares the line does not join. Checkpoints (never the two
  ends) and then walls are removed while the line stays the only answer.
- **Solving:** an exhaustive line counter that respects the checkpoint order
  and walls, pruned by connectivity (the unvisited squares must stay reachable)
  and dead ends (only the final square may have one way in).
- **Guarantees:** deterministic per seed; exactly one line, proven by the
  exhaustive count (a search that runs out of budget counts as ambiguous).
  Rated by grid size and how few checkpoints and walls remain per square.
  Expert boards (8×8) take a few seconds to prove.
