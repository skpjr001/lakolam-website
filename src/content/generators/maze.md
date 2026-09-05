---
title: "Maze"
blurb: "Mazes on square, triangular, hexagonal and circular grids, carved by eleven algorithms, with answer keys"
category: maze
version: "1.0.0"
---
Find the one path from entrance to exit.

## What it is

A field of passages and walls with a marked entry and exit. In a *perfect*
maze there are no loops — exactly one route joins any two points. This crate
carves rectangular, hex and circular mazes, and masked shapes (a heart, an
animal silhouette) for kids' pages; a `braid` knob melts dead-ends into
loops for a different texture.

## How to play

Trace with a pencil, backing out of dead ends. On paper, wall-following
(keep one hand on a wall) solves any perfect maze whose exit is on the
boundary. Harder mazes are attacked from both ends at once — the two
searches meet in the middle far faster than either alone.

## Purpose

The kids-lane anchor and the most shape-flexible generator (any silhouette
becomes a maze). It is also a texture study: the carving algorithm is itself
a style parameter — Kruskal mazes feel porous and even, recursive-backtracker
mazes feel like long winding corridors — and the spec exposes that choice.

## History

Labyrinths are ancient — the Knossos myth, Roman mosaic labyrinths, turf
mazes — but those were unicursal (one path, no choices). The puzzle maze
with junctions arrives with Renaissance hedge mazes (Hampton Court, 1690s).
Algorithmic generation is a 20th-century development: depth-first carving,
Eller's row-by-row method, Wilson's loop-erased walks — all of which this
crate implements.

## This implementation

- **Spec knobs:** `topology` (rect / hex / circular / masked), `algorithm`
  (recursive backtracker, Wilson's, Kruskal, growing tree, Eller's),
  `braid`, entry/exit placement, `difficulty`.
- **Generation:** carve on the shared `lako-grid` topologies; masked shapes
  rasterise a silhouette onto the grid and carve inside it.
- **Guarantees:** the maze is connected; at `braid = 0` it is perfect (every
  pair of cells joined by exactly one path); the answer key overlays the BFS
  solution path as an aux scene.
- **Difficulty:** solution-path length ratio, branching factor along the
  path, and dead-end depth distribution — measured on the carved maze, not
  assumed from the algorithm.

## Weave mazes

Setting `weave` above zero carves a maze whose passages cross over and under
one another. Rectangular grids only, and it replaces the chosen carver: a hop
needs "the cell directly beyond" rather than bare adjacency, the same reason
Binary Tree and Eller's are rectangle-only.

The construction is the interesting part. Adding a tunnel to a *finished*
maze would create a loop, because a finished maze is a spanning tree and
every pair of cells is already joined. So the tunnels are carved as part of
the tree: standing at a cell, the carver may dive under a visited
straight-through neighbour to claim the unvisited cell beyond it — one new
cell by one new edge, which is exactly what keeps the result perfect. A test
asserts it directly: `cells - 1` edges, every cell reachable, at any density.

The graph needed no new shape. `Passages` is a general adjacency list, so a
tunnel is just the edge between two cells two apart, and the breadth-first
solver walks it without knowing it is unusual — which a test also checks, by
stepping the whole solution through `passages`.

The renderer did need new work, and the reason is worth stating: a
wall-drawn maze cannot show a tunnel by omission the way a corridor-drawn one
can. The walls between the tunnel's ends and the cell it passes under are
*correctly* solid — the tunnel does not enter that cell — so with nothing
else drawn, a crossing is invisible and unsolvable. Each crossing is
therefore drawn explicitly, in the order that reads: the tunnel's side walls
through the cell, then the over-corridor's floor as a white band covering
them, then the over-corridor's walls redrawn on top.

Braiding is skipped under a weave, and the metadata says so — adding loops
afterwards would undo the property the hop construction exists to preserve.
The `algorithm` field reports `Weave` rather than the carver that went
unused.
