---
title: "Corner and Straight Mazes"
blurb: "Corner and straight mazes — numbers count the path's corners (or straight passes) in their square and its neighbours"
category: maze
version: "1.0.0"
---
Find the one path through the grid: the numbers count its corners — or, in
the straight version, its straight passes — in each square and the squares
around it.

## What it is

A square grid with numbers in some squares and an arrow in and out. Find a
path from the bottom-left square to the top-right square, entering and
leaving where the arrows show. The path need not visit every square. In a
corner maze, a number says how many times the path turns a corner in that
square and the four squares touching it; in a straight maze, how many times
it goes straight through them.

## How to play

1. Enter the bottom-left square from the arrow, and leave the top-right
   square through the other arrow.
2. Move up, down, left or right from square to square, never visiting a
   square twice. You do not have to visit every square.
3. In every square on the path the path either turns a corner or goes
   straight on. The entry and exit arrows count: if the path comes in from
   the left and goes up, the first square is a corner.
4. Corner maze: a number counts the corners in its own square plus the
   squares directly above, below, left and right of it. Straight maze: the
   same, counting straight passes instead.
5. Squares the path does not visit count nothing. Numbers may lie on the
   path or off it.

A 0 is a strong clue: in a corner maze the path may only run straight
through those five squares, or miss them. A high number such as 4 or 5
means the path weaves back and forth right there.

## Purpose

A path puzzle where the clues describe the shape of the route rather than
where it goes. It trains visualising a path's turns, counting in a plus
shape around each number and testing a guess against several clues at once.

## History

Corner Mazes and Straight Mazes are a matched pair of original puzzles from
Erich Friedman's Puzzle Palace website, where each appears with a set of
graded puzzles; they belong to his long series of maze variants in which
numbers describe the path instead of walls.

## This implementation

- **Spec knobs:** `kind` (`corner` or `straight`), `size` (4–8; 0 picks
  from the difficulty — 4, 5, 6, 7, 8 from Kids to Expert; with a size
  given, the difficulty is ignored and the band follows the size),
  `difficulty`, `cell` (24–90 pt), `line` (0.2–4 pt). Out-of-range numbers
  are clamped and the value asked for is reported in meta
  (`requested_size`, …). The entry side (left or bottom) and exit side
  (right or top) are chosen per seed and drawn as arrows.
- **Generation:** a random simple path is planted from start to goal,
  covering two-fifths to three-fifths of the squares, and a third of the
  squares are given their numbers. While the search finds a second path, a
  number where the two paths' counts differ is added (or, when the search
  spends its budget, any one more); numbers are then dropped in random
  order while the planted path stays the only one.
- **Solving:** a depth-first search over simple paths from the start. A
  square's kind is known as soon as the path leaves it, so every number
  carries a running total: a branch dies when a total passes its number,
  when even every square around the number that the path can still reach
  would not make it up, or when the goal is cut off. Capped at 2 with a node
  budget; a spent budget is ambiguous, never unique.
- **Guarantees:** deterministic per seed; exactly one path (`unique`),
  re-proven in tests by an independent search that recomputes every number
  from scratch at each step and checks finished paths against the rules.
  Rated by board size (`rating_basis: grid_size`): 4×4 Kids, 5×5 Easy, 6×6
  Medium, 7×7 Hard, 8×8 Expert.
