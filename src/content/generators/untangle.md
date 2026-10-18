---
title: "Untangle"
blurb: "Untangle — move the numbered points of a tangled drawing until no two lines cross"
category: puzzle
version: "1.0.0"
---
A drawing of numbered points and lines, tangled up: move the points until no two lines cross.

## What it is

A network of numbered points joined by straight lines, drawn with its
points round a circle so that the lines cross many times. The network can
always be drawn with no crossings at all, and the answer key shows one
such drawing on a grid of dots. Below the puzzle is an empty dot grid to
redraw it on.

## How to play

Each line joins two numbered points, and it must keep joining the same two
points. Your job is to place the points somewhere else so that no two
lines cross and no line runs through a point.

On paper, redraw the picture on the dot grid: put each numbered point on a
dot of your choice, then draw every line again between the same numbers.
Lines are always straight. Start with a point that has few lines, or with a
triangle of points that are all joined to each other, and build outwards.
If two lines cross, move one of their points.

In the app, drag the points; the count of crossings goes down as you
untangle, and you are done when it reaches zero.

## Purpose

A visual puzzle about shapes and connections rather than numbers. It
builds an intuition for networks: which points belong together, what
"inside" and "outside" mean in a drawing, and how one move changes many
lines at once.

## History

Untangling puzzles grew out of the mathematics of planar graphs —
networks that can be drawn on paper without crossings — studied since
Euler's time and characterised by Kuratowski in 1930. As a game, dragging
the points of a tangled planar network became popular in browsers in the
mid-2000s and has been widely copied since.

## This implementation

- **Spec knobs:** `difficulty`; `nodes` 6–30 (null = by band: Kids 6, Easy
  9, Medium 13, Hard 18, Expert 25); `dot_grid` (print the empty dot grid
  to redraw on, default on); `size` (side of each drawing), `node` (point
  radius), `line`. A clamped `nodes` is reported as `requested_nodes`.
- **Generation:** the points are seeded distinct points of a `g × g`
  lattice, g = ⌈√(1.6 n)⌉ + 1 (5 for 6 points, 6 for 13, 8 for 25–30).
  A greedy triangulation joins them: every pair, shortest first, unless the
  segment passes through another point or meets an edge already drawn
  (exact integer tests) — planar by construction. Edges are then dropped in
  seeded order down to ⌊7n/4⌋, never below degree 2 and never
  disconnecting the graph. The start puts the points round a circle at
  seeded, slightly uneven angles; of 40 seeded orders the one with the most
  crossings is kept. Crossings of a circle drawing are counted exactly:
  two lines with four different ends cross when their ends alternate round
  the circle. The band is read from the number of points (≤ 7 Kids, 8–10
  Easy, 11–15 Medium, 16–21 Hard, 22+ Expert; `rating_basis: "nodes"`).
- **Solving:** nothing to search — the lattice drawing the graph was built
  on is an untangled drawing, and it is the key. App hints move one point
  to its place in that drawing: the move that leaves the fewest crossings
  if it lowers the count, otherwise the lowest point not yet in place
  (repeating that always ends untangled).
- **Guarantees:** deterministic per seed; `answers_checked: true` and
  `untangleable: true`: before the page is returned the key drawing is
  checked exactly (no two edges meet except at a shared end, no edge runs
  through a point, no two points share a dot, every point on the grid, the
  graph connected), and the start's crossings, recounted with
  floating-point geometry, must equal the exact count in
  `crossings_at_start` (always > 0). Meta also gives `nodes`, `edges`,
  `grid`, `edge_list` (1-based) and the key's `solution` coordinates.
  Generation takes well under a millisecond (30 points: ~0.5 ms).
