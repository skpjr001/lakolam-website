---
title: "3-D Maze"
blurb: "Isometric 3-D maze — hedges, gaps and stairs across a block landscape from S to G"
category: maze
version: "1.0.0"
---
A maze across a little block landscape — hedges, gaps and flights of stairs,
drawn in isometric.

## What it is

The maze is a square of block columns seen from above and to one side, each
column one to four levels tall, standing in flat patches. You walk on the
tops of the blocks. Low green hedges divide squares at the same level; white
flights of stairs climb from one level to the next. Get from S to G. There is
exactly one way.

## How to play

Start on the square marked S and find a way to the square marked G.

- On one level you may step to the next square unless a hedge stands between
  them. A gap in a hedge is a way through.
- To go up or down a level you must use a flight of white stairs. Each
  flight climbs exactly one level.
- A ledge without stairs, or a drop of more than one level, cannot be
  crossed.

Trace your route with a pencil. Look carefully at the stairs — they show
where the levels join — and remember that a square hidden a little behind a
taller block is still there to walk on.

## Purpose

A maze that reads as a place rather than a plan: the third dimension comes
from the levels, so the solver has to see which ledges join and which do
not. It sits beside the flat grid mazes as a calmer, more visual page for
adult maze books and older children.

## History

Isometric "3-D mazes" were popularised by Larry Evans, whose *3-Dimensional
Mazes* (1976–77, later *3-D Mazes*) drew walkways, stairs and bridges over
one another; over-and-under structures are a staple of the big maze
compendiums. Hedge mazes themselves go back to the garden labyrinths of the
Renaissance.

## This implementation

- **Spec knobs:** `difficulty` (grids of 5, 7, 9, 11 and 13 squares), `size`
  (4–16, 0 = the level's), `step` (height of one level, 0.25–0.6 of a
  square), `colour` (a colour per level, or greys), `width`, `height`,
  `line`.
- **Generation:** the grid is split into small winding patches; a
  backtracking search gives each patch a level, back to front, so that no
  square rises more than one level above a square behind it and no top is
  hidden too much by the squares and hedges in front of it (a pattern table
  measured exactly once per pattern). Every border between squares at one
  level starts hedged. A randomised depth-first walk then carves a spanning
  tree: from the newest square into a neighbour not yet joined, by a gap in
  the hedge or — one level down, toward the viewer — a flight of stairs,
  kept only while everything around it stays visible. START is one end of
  the longest route in the largest tree (a double sweep); GOAL is the
  farthest square whose distance falls in the requested band.
- **Solving:** the reachable squares form a tree, so the route is the tree
  path; the answer key draws it over the blocks.
- **Guarantees:** deterministic per seed. A perfect maze: the squares
  reachable from S, joined by the legal steps re-derived from the heights,
  hedges and stairs alone, have exactly one fewer step than squares, and a
  capped depth-first count finds exactly one route from S to G. Stairs are
  only built on a riser that faces the viewer, and climb exactly one level.
  The named visual property: every walkable top, every flight of stairs and
  every hedge is at least half visible, measured by painter's-order
  occlusion over the projected polygons (a top is not counted as hidden by
  the hedge or stairs standing on it); the tests confirm the measure by
  rasterising each thing in its own colour. Rated by the length of the route
  (`rating_basis: route_steps`: Kids up to 14 steps, Easy 15–29, Medium
  30–49, Hard 50–79, Expert 80 or more); a `size` too small or too large for
  the requested band serves the nearest band and reports
  `requested_difficulty`; clamped knobs report `requested_<field>`.
