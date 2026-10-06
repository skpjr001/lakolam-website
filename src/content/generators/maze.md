---
title: "Maze"
blurb: "Mazes on square, triangular, hexagonal and circular grids, carved by eleven algorithms, with answer keys"
category: maze
version: "1.2.0"
---
Find the one path from entrance to exit.

## What it is

A field of passages and walls with a marked entry and exit. In a *perfect*
maze there are no loops — exactly one route joins any two points. This crate
carves rectangular, hex, triangular and circular mazes — including the
classic **theta** maze, whose rings subdivide as they grow so the cells stay
square, solved from a door in the rim to the centre — and masked shapes (a
heart, an animal silhouette) for kids' pages; a `braid` knob melts dead-ends into
loops for a different texture.

## How to play

Trace with a pencil, backing out of dead ends. On a maze with several
floors, the floor plans are drawn side by side: a triangle marks a
staircase — pointing up where it climbs, down where it arrives — and the
same letter marks both ends, so climbing at `B` on floor 1 brings you out
at `B` on floor 2. Start on floor 1 and finish on the top floor. On paper, wall-following
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

- **Spec knobs:** `topology` (rect / hex / triangular / circular / theta),
  `mask`, `algorithm` (recursive backtracker, Wilson's, Kruskal, growing
  tree, Eller's), `braid`, `weave`, `openings` (furthest / perimeter /
  centre), `difficulty`, `levels` (1–4 floors, default 1) and `stairs`
  (staircases between each pair of adjacent floors, 1–8, default 3).
- **Theta grids:** ring 0 is one central disc; each later ring multiplies the
  one inside it by however many unit-deep cells fit around its inner edge
  (the polar subdivision from *Mazes for Programmers*), so a 12-ring maze runs
  1, 6, 12, 24, 24, 48 … cells outward. Every arc is sampled on one shared
  angular lattice, so neighbouring cells meet at identical vertices and the
  shared wall renderer needs no special case.
- **Centre openings:** the goal is the central cell (the disc on a theta
  grid), and the door is the rim cell furthest from it through the carve.
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

## Multi-level mazes

Setting `levels` above 1 draws that many floor plans of the same shape (the
mask applies to each) side by side, joined by staircases. Rectangular
topologies only — a request on another grid is refused with the reason —
and the weave is ignored (the metadata reports `weave: 0`).

The floors are one wide rectangular grid with a masked-out column between
neighbours, so the shared renderer draws them, and the gap, with no new
wall logic. A staircase is an ordinary `Passages` edge between the same
position on two adjacent floors; the breadth-first solver climbs it like
any corridor, and the key's solution line lifts off at one end and lands
at the other.

**Perfect over the 3-D graph.** Each floor is carved as its own spanning
tree by the chosen carver. The first staircase between two floors joins
their trees; every further one would close a loop, so before it is added
one floor edge on the tree path between its ends is removed (chosen by
seed). One edge out, one in: still a spanning tree. Tests assert `cells −
1` edges with every cell reachable for 2, 3 and 4 floors and for a masked
shape. A floor can come apart into pieces that way, reachable only by
going up and back down — which is what makes a staircase a decision. With
`braid` the floors carry loops and `single_route` says false.

The way in is on the ground floor and the way out on the top floor (the
furthest-apart rim doors for `perimeter`; the centre of the top floor for
`centre`; the top-floor cell furthest from the first cell for `furthest`),
never on a staircase cell; a position holds at most one staircase, so up
and down marks never share a cell. A single floor (`levels: 1`, the
default) is byte-identical to version 1.1 — page, key and metadata, checked
over six specs × six seeds — and consumes no new randomness; multi-level
carves draw from their own stream (`maze/levels/<attempt>`). Metadata adds
`levels`, `stairs` and `stairs_used` (the climbs the solution makes).
