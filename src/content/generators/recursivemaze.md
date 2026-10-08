---
title: "Recursive Maze"
blurb: "Recursive maze — lettered boxes are smaller copies of the whole maze; dive in and out of the copies to reach the goal"
category: maze
version: "1.0.0"
---
A maze that contains smaller copies of itself: dive into the lettered boxes
and climb back out to find the one shortest way to the goal.

## What it is

A square maze with a few numbered gaps in its outer wall and two or three
lettered boxes inside it. Each box is a small copy of the whole maze, with
the same numbered gaps around its edge. Going into a box takes you into a
copy of the maze, which has boxes of its own, so you can go deeper and
deeper. START and GOAL are in the big maze, and the walls in it alone do
not join them: the way always runs through the boxes.

## How to play

1. Begin at START and move from square to square through the open
   passages.
2. Walking into a box through its gap numbered 2 takes you inside that
   copy of the maze, to the square just inside its outer gap 2.
3. Inside a copy, walking out through an outer gap, say 3, brings you back
   out of the box you came in by, through that box's gap 3.
4. Copies contain boxes too, so you can go several copies deep. Keep a
   list of the boxes you are inside, newest last: going into a box adds its
   letter, coming out removes the last letter.
5. The outer gaps of the big maze itself lead nowhere, and only the big
   maze's GOAL counts - the GOAL inside a copy is an ordinary square.
6. Find the shortest way from START to GOAL. There is only one.

Tip: work out first which outer gaps can be reached from which inside one
copy. Every copy is the same, so that one picture tells you where each
box leads.

## Purpose

A logic maze for adults and keen older children. It trains keeping track of
a stack of nested places, and spotting that a small fact about one copy
("from gap 1 you can reach gap 3") holds in every copy at every depth -
the idea behind recursion in mathematics and programming.

## History

Mark J. P. Wolf introduced fractal (recursive) mazes in the 1990s; Ed Pegg
Jr. featured them on MathPuzzle, Wolf collected them in *101 Enigmatic
Puzzles* (2020), and a Wolfram Demonstration lets readers walk one. The
genre belongs to the "multi-state" logic mazes Robert Abbott made famous,
where where you are depends on more than the square you stand on. Recent
work (FUN 2026) studies how hard such mazes can be to solve.

## This implementation

- **Spec knobs:** `difficulty`; `size` (6-12 squares a side; 0 = the
  level's 6, 7, 8, 9, 10 from Kids to Expert); `boxes` (1-3; 0 = the
  level's 1, 2, 2, 3, 3); `gaps` (2-4 outer gaps, at most one per side;
  0 = the level's 3, 3, 4, 4, 4); `colour` (pale tints for the boxes);
  `width`, `height` (page, 300-2000 and 300-3000 pt) and `line` (0.5-5
  pt). Out-of-range numbers are clamped and reported in meta
  (`requested_size`, `requested_boxes` when fewer boxes fit, …). Boxes are
  2×2 squares (3×3 from size 10), kept a square apart from each other and
  the border; a box's gaps sit at the scaled positions of the outer gaps.
- **Generation:** the free squares are carved as a spanning tree, cut into
  a few pieces, and START and GOAL are dropped at random. A hill-climb then
  toggles passages (never closing a loop inside one level) and moves START
  and GOAL, scoring each layout by: a single shortest escape; START and
  GOAL not joined without a box; a route of at least 2n steps; the rated
  band against the requested one; depth up to the level's target (1, 1, 2,
  3, 4); and a route length near the level's aim. Up to ten fresh layouts
  are tried and the best is kept.
- **Solving:** exact, with no depth cap. Every route from the top level
  back to the top level splits into well-nested in/out pairs, and all
  copies are the same maze, so the shortest walk through a copy from gap k
  to gap j, `S(k, j)`, is one table for every box at every depth. `S` is
  the least fixpoint of shortest paths in one level whose box doors carry
  summary edges of cost `S + 2`, computed by repeating Dijkstra from every
  gap until nothing changes. Shortest-walk counts (capped at 2) are then
  taken in increasing order of `S` (a walk using a summary edge only uses
  shorter ones), and a last Dijkstra-and-count runs from START to GOAL.
- **Guarantees:** deterministic per seed; exactly one shortest escape
  (`unique`), re-proven in tests by plain breadth-first search over
  explicit stacks of boxes, pruned only by a sound lower bound (an
  abstraction that forgets which boxes are on the stack); the pushdown
  count is also checked against brute force on raw, non-unique layouts.
  START and GOAL are never joined without a box (`boxes_needed`). Rated by
  the deepest copy the escape enters (`rating_basis:
  escape_depth_and_steps`): one deep and at most 24 steps Kids, one deep
  Easy, two Medium, three Hard, four or more Expert. Expert (four deep) is
  reached on most seeds but not all; a missed band is served honestly as
  the nearest and reported as `requested_difficulty`.
