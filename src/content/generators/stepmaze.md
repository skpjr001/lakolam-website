---
title: "Grow and Shrink Maze"
blurb: "Grow-and-shrink maze — step from tile to touching tile, the areas getting bigger and smaller by turns"
category: maze
version: "1.0.0"
---
A floor of rectangles where every step must go to a bigger tile, then a
smaller one, then a bigger one again.

## What it is

The floor is tiled with rectangles of different sizes, each marked with its
area. There are no walls: you may step from any tile to any tile it touches
along an edge. The catch is the rule — the tiles you step on must grow and
shrink by turns — so most moves are forbidden at any moment, and the way
through often doubles back over tiles you have already crossed.

## How to play

Go in at the arrow marked IN and leave at the arrow marked OUT.

- Step from one tile to another that shares an edge with it. Touching only
  at a corner does not count.
- The areas must grow and shrink by turns. If a step takes you onto a bigger
  tile, the next step must take you onto a smaller one; after a smaller one,
  a bigger one. Your first step may go either way.
- Two touching tiles of the same area never connect.
- You may cross the same tile more than once.
- The number on a tile is its area. On pages without numbers, count the
  small squares inside each tile.

Find the shortest way — there is only one.

## Purpose

Comparing sizes and keeping a rule in mind. Each step asks two questions —
which tiles touch this one, and which of them is the right kind of bigger or
smaller — and the answer depends on the step before. Without the numbers it
also practises area as counting squares. It suits confident readers from
about eight, and the larger floors are a real test for adults.

## History

Robert Abbott, the American inventor of the logic maze, described mazes
whose paths are governed by a rule rather than by walls in *Mad Mazes*
(1990) and *SuperMazes* (1997). The "area maze", in which the area of the
tile stepped on must alternately increase and decrease, is one of the
families of logic maze listed in his tradition. It is not the same thing as
Naoki Inaba's *area maze* geometry puzzles, which ask for a missing length.

## This implementation

- **Spec knobs:** `difficulty` (Kids 5×5 squares with tiles up to 4, Easy
  6×7 up to 5, Medium 7×9 up to 6, Hard 8×10 up to 6, Expert 9×12 up to 7),
  `cols` (0 = the level's; otherwise 4–14), `rows` (0 = the level's;
  otherwise 4–16), `max_area` (0 = the level's; otherwise 2–9), `numbers`
  (print the areas, or draw faint unit squares to count), `width`, `height`,
  `line`. Clamped requests are reported as `requested_<field>`.
- **Generation:** a greedy random packing fills the floor row by row with
  rectangles up to `max_area`, favouring squarish mid-sized tiles. Every
  tile on the left border is tried as IN and every tile on the right border
  as OUT. A pair qualifies when exactly one shortest route joins them under
  the rule and that route is longer than the plain tile-to-tile distance, so
  the rule, not the layout, makes the maze. A hill climb then splits tiles
  and merges tiles that share a whole side, keeping each change while the
  best qualifying route gets no further from the requested band; up to 24
  restarts.
- **Solving:** breadth-first search over (tile, direction of the last step:
  none, grew, shrank), counting shortest routes, capped.
- **Guarantees:** exactly one shortest route from IN to OUT (`unique:
  true`), longer than the plain distance. Tests re-prove it with a
  distance-to-OUT table by fixpoint iteration and a depth-first count capped
  at 2, re-check the length with a separate search built from the rectangles
  alone, check that the tiles cover the floor exactly, and walk the route
  checking that each step crosses a shared edge and the areas alternate.
  Rated by route length (`rating_basis: route_steps`: up to 6 steps Kids,
  7–9 Easy, 10–13 Medium, 14–18 Hard, 19 or more Expert); every band is
  reached at the level's size. Smaller floors asked for at a high band are
  served at the nearest band reached and labelled with
  `requested_difficulty`. The key draws the route through the shared edges,
  numbers each step and lists the areas in order.
