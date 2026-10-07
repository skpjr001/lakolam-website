---
title: "Unequal Length Maze"
blurb: "Unequal Length Maze — one path through every open square, no two consecutive straight segments the same length"
category: maze
version: "1.0.0"
---
Visit every open square from START to END, turning at the end of every
straight run — and never making two runs in a row the same length.

## What it is

A square grid with a few blocked squares. Find a path from the bottom-left
square to the top-right square that passes through every open square
exactly once. The path is made of straight runs that turn at right angles,
and no two runs that follow each other may be the same length.

## How to play

1. Start in the bottom-left square (at the START arrow) and finish in the
   top-right square (at the END arrow).
2. Move up, down, left or right from square to square, never into a
   blocked square and never into a square you have already visited.
3. Visit every open square exactly once.
4. The path is a chain of straight runs. A run's length is the number of
   squares it moves. Each run must be a different length from the run just
   before it — a run of 2 cannot be followed by another run of 2.

Look at the corners and dead ends first: a square with only two open
neighbours must be passed straight through or turned in, and the lengths of
the runs on either side of a turn must differ, which often decides where a
long run has to stop.

## Purpose

A route-finding puzzle that every solver can start on, with a twist that
forces planning ahead: every turn depends on the length of the run before
it. It practises systematic search, counting squares and backtracking.

## History

Unequal Length Mazes first appeared on Erich Friedman's Puzzle Palace
website in 2006, among his many original path puzzles. The genre was
picked up by competition authors and used at the World Puzzle Championship
in 2014 (including the individual playoffs) and 2017.

## This implementation

- **Spec knobs:** `size` (4–8; 0 picks from the difficulty — 4, 5, 6, 7, 8
  from Kids to Expert; with a size given, the difficulty is ignored and the
  band follows the size), `difficulty`, `blocks` (1–12 blocked squares; 0
  lets the generator choose), `cell` (24–90 pt), `line` (0.2–4 pt). A path
  between the two corners always covers an odd number of squares (both
  corners are the same colour on a chequerboard), so a block count of the
  wrong parity, or one that gives no single-path maze, is moved to the
  nearest that works and the request is reported as `requested_blocks`;
  other clamped values likewise (`requested_size`, …).
- **Generation:** a random path that keeps the rule is planted by a
  randomised depth-first search through all but the chosen number of
  squares; the squares it misses become the blocks. The board is kept only
  when the exhaustive count finds that path and no other.
- **Solving:** a depth-first search over paths through every open square,
  carrying the current direction and the lengths of the current and
  previous runs (a turn is allowed only when they differ), pruned by a
  bitboard flood fill (every unvisited square must stay reachable) and a
  dead-end test (an unvisited square other than the goal with fewer than
  two ways in would end the path early). Capped at 2 with a node budget; a
  spent budget is ambiguous, never unique.
- **Guarantees:** deterministic per seed; exactly one path (`unique`),
  re-proven in tests by a plain depth-first count of every simple path
  through all the open squares, checked against the rules only when
  finished. Rated by board size (`rating_basis: grid_size`): 4×4 Kids, 5×5
  Easy, 6×6 Medium, 7×7 Hard, 8×8 Expert.
