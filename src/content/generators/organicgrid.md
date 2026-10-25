---
title: "Organic Quad Grid"
blurb: "Organic quad grid in the manner of Townscaper: triangles paired into rhombi, split into quads and relaxed towards squares"
category: design
version: "1.0.0"
---
A grid of four-sided cells that wanders like an old town's paving: no two
cells quite alike, yet every one of them a soft, nearly square quad.

## What it is

A design built the way the game Townscaper builds its towns. A hexagon is
cut into small equilateral triangles; neighbouring triangles are paired at
random into diamonds; every diamond (and any triangle left over) is cut
from its centre to the middle of each side, which turns the whole hexagon
into four-sided cells. Then every cell is nudged, many times over, towards
being a square. The result keeps the regular grid's calm but has gentle
swirls wherever three, five or six cells meet at a corner instead of four.

The cells can be filled with flat colours, drawn as rounded cobblestones
set in mortar, carry two quarter-circle arcs each (which join up from cell
to cell into long winding ribbons), or be split into small checkers. The
grid can fill the page or sit as a hexagonal island.

## How to use it

Frame it as it is, or print the line-art version and colour it: cell by
cell like a mosaic, or pick out the swirls where the grid bends round an
odd corner. On the ribbon pages, follow one ribbon with a finger or a
pencil — each is a single closed loop or runs off the edge of the page.
The cobbles make a fine background for a drawn town or garden path.

## Purpose

A beautiful, restful pattern, and a look at a clever idea from game design:
how to make a grid that feels hand-laid but is still made of squares, so
that houses, roads and tiles can be built on it.

## History

The irregular quad grid was devised by Oskar Stålberg for his town-building
toy Townscaper (2020) and described in his talks and posts (e.g. "Building
a world on an irregular grid", 2019–2021): triangles merged into quads,
quads subdivided, and the vertices relaxed towards squares. Splitting a
polygon into quads through its centroid and edge midpoints is the first
step of Catmull–Clark subdivision (1978). The arcs are Truchet tiles,
after Sébastien Truchet (1704), in the quarter-circle form popularised by
Cyril Stanley Smith (1987).

## This implementation

- **Spec knobs:** `layout` (fill, island), `cell` (side of the starting
  triangles, 12–160 pt), `merge` (share of triangles paired, 0–1), `relax`
  (relaxation rounds, 0–200), `fill` (auto, plain, cobbles, truchet,
  checker), `palette` (auto, harbour, meadow, stone, sunset, line_art),
  `stroke`, `width`, `height`, `margin`.
- **Generation:** a hexagon of side n holds 6n² triangles (n chosen so the
  hexagon covers the plate, or fits it for an island, at most 58). Triangles
  are visited in seeded order and each unpaired one is paired, with
  probability `merge`, with a random unpaired neighbour. Every k-gon becomes
  k quads (vertex, edge midpoint, centroid, edge midpoint); midpoints are
  shared by edge, so the mesh conforms. Relaxation: each quad's best-fit
  square has the quad's centre and the mean of its corner vectors rotated
  back by 0°, 90°, 180°, 270°; every free vertex moves to the mean of its
  quads' square corners, all at once (Jacobi), with the rim pinned. In fill
  layout the grid is turned by a seeded angle and cropped to the plate.
  Truchet arcs are drawn in the unit square and mapped into each quad
  bilinearly, so arcs from neighbouring quads meet at the shared edge
  midpoint; arcs are joined into curves by union–find over edges and each
  curve gets one colour. Over-range knobs are clamped and recorded as
  `requested_<field>` (`cell` grows when the grid would exceed 58 rings).
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification: every_cell_a_quad`.
  Tested: every triangle is used exactly once; every cell has four corners;
  every interior edge is shared by exactly two quads in opposite
  directions (the mesh conforms); interior vertex valences are 3–6;
  relaxation is deterministic, independent of quad order, never moves the
  rim, never folds a quad, and lowers the squareness error every round
  (reported in meta before and after). All ink stays inside the page.
