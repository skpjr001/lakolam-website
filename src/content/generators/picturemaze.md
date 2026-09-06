---
title: "Picture Maze"
blurb: "Picture maze — the one solution path shades into a hidden picture"
category: maze
version: "1.0.0"
---
Solve the maze and the single winding path from entrance to exit shades a
hidden picture — a heart, star, diamond, or cross.

## What it is

A maze with one entrance and one exit. There is exactly one route between
them, and the cells that route passes through are exactly the cells of a
hidden silhouette. Colour the corridor you travelled and the picture appears.

## How to play

Solve it as an ordinary maze — but the goal is the drawing, not just the
exit. Every dead-end branch leads out of the shape, so a route that strays
off the silhouette is heading down a false corridor.

## Purpose

The maze lane's most rewarding format, and one that ties the two ends of the
workspace together: the silhouettes come from the same parametric-shape idea
`lako-dottodot` verifies, and the corridors from `lako-maze`, with the
picture riding the solution instead of the dots.

## History

Picture mazes (Conceptis's *Maze-a-Pix* among them) turned the plain maze
into a colouring reveal, and have been a newspaper and puzzle-book fixture
since the 2000s.

## This implementation

- **Spec knobs:** `size` (10–20), `picture` (heart / star / diamond / cross;
  empty picks one per seed), `cell`, `line`.
- **Generation, turned inside out:** rather than carve a maze and hope its
  solution traces a shape, the construction makes the shape's path the
  solution. A long simple path is found *within* the silhouette (Warnsdorff-
  guided search from boundary starts), then every remaining cell is hung off
  it as a dead-end branch, growing a spanning tree of the whole grid.
- **Guarantees:** because the finished maze is a tree, the entrance-to-exit
  route is unique — checked by an independent path count, not assumed — and it
  is the silhouette path by construction. The solution never strays outside
  the shape, and coverage (reported in the metadata) is high enough that the
  picture always reads; a grid graph is bipartite, so a few silhouettes admit
  no fully-covering path, and the search takes the longest one rather than
  refusing the picture. Rated by solution length over grid size.
