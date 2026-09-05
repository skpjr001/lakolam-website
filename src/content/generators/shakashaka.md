---
title: "Shakashaka"
blurb: "Place half-cell triangles so every white area left over is a rectangle"
category: puzzle
version: "1.0.0"
---
Place half-cell triangles so that every white area left over is a rectangle —
upright or tilted 45°.

## What it is

A grid with some black cells, a few of them numbered. Any white cell may hold
a right triangle filling half of it (four orientations). A number counts the
triangles in the four cells beside it. The defining rule: when the triangles
are in, every connected scrap of white must form a rectangle — either aligned
with the grid or turned 45° like a diamond.

## How to play

Numbers drive placement: a "0" keeps all four neighbours empty, higher counts
force triangles in. The shape rule does the rest — a triangle's hypotenuse
starts a diagonal edge that *must* continue in the neighbouring cell, or the
white area it borders acquires a 45° corner that no rectangle has. Follow
each diagonal until it closes a diamond or meets black. Empty rectangular
areas are perfectly legal; the numbers tell you where the diamonds were
meant to be.

## Purpose

The last generator added, deliberately deferred: its rectangle rule needs a
checker that cannot serve as its own oracle, so the checker was built and
tested first — boundary-walked at quarter-cell resolution in doubled integer
coordinates — and the search brute-force-verified against it. The crate is
the workspace's reference for "the checker comes before the generator".

## History

Nikoli, 2008, credited to Guten. The name is onomatopoeia — *shaka shaka*,
the sound of shaking — and Nikoli's own subtitle for it translates as "proof
of the pudding". It is among the youngest puzzles Nikoli made canonical.

## This implementation

- **Spec knobs:** `rows`, `cols`, `diamond_share`, `difficulty`.
- **Generation:** random black cells give *no* solvable boards at all (0/24
  measured, three densities) — every white scrap must end rectangular, and
  ragged areas cannot be fixed by triangles. So the board is built: guillotine
  cuts make white rooms (already rectangles, already legal), diamonds are
  planted in 2×2 rooms, numbers are read off the walls and thinned while the
  arrangement stays unique.
- **Guarantees:** exactly one arrangement, and it is the constructed one.
  The rectangle test has fixtures for the shapes that fool simpler tests —
  triangle (fills its rotated bounding box), hole, pinch — and the local
  corner prune (white runs of 2, 4 or 8 wedges only) is proven sound by
  exhaustive enumeration of small boards. That test caught a wedge-ordering
  bug that made the prune reject the diamond itself.
- **Difficulty:** search nodes per cell, thresholds from measured quintiles
  (2.3–17.4 across 30 boards).
