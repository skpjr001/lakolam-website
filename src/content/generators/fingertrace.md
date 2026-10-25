---
title: "Finger Tracing Meander"
blurb: "Finger-tracing meander: one smooth closed groove winding through a whole shape, never crossing"
category: design
version: "1.0.0"
---
One smooth groove that winds through a whole shape and comes back to where
it started, never crossing itself — to follow slowly with a fingertip.

## What it is

A single closed channel, two walls with a path between, filling a circle,
heart, leaf, rounded square, star or the outline of a picture. There are no
junctions and no dead ends: from the dot, the path visits every part of the
shape and returns home. Some pages have long sweeping corridors; others
turn often, like coral.

## How to use it

Put a fingertip on the dot and follow the groove in the direction of the
arrow, slowly, without lifting, until you are back at the dot. Breathe
easily as you go. It also works with a pencil or a crayon, keeping between
the walls, and the shape and the groove can be coloured afterwards.

## Purpose

A calm, tactile focus activity — the same idea as finger labyrinths — and a
fine-motor tracing page that can be done without a pencil. Unlike a maze
there is nothing to solve; unlike a labyrinth the path fills a whole shape.

## History

Finger labyrinths, carved or printed versions of walking labyrinths, are
used for relaxation and focus; single-line meanders are an old decorative
form. The construction here is the classic "wall-follower round a spanning
tree" behind many unicursal puzzles, with David Wilson's algorithm for
uniform spanning trees (1996) and George Chaikin's corner cutting (1974).

## This implementation

- **Spec knobs:** `shape` (auto — circle, heart, leaf or rounded square by
  seed — circle, heart, leaf, rounded_square, star (best at 20+ cells),
  picture), `image` (a PNG or JPEG; when set it is the shape, and an empty
  picture shape uses a built-in silhouette chosen by the seed), `cells`
  (3–40 across, default 16), `wander` (long, branchy), `groove` (0.2–0.8 of the
  corridor), `title`, `palette` (auto, clay, meadow, lagoon, line_art),
  `width`, `height`, `margin`.
- **Generation:** the shape is cut into square cells, keeping those whose
  groove would lie wholly inside it and then the largest connected group (a grid too coarse to hold
  two cells is refined, recorded as `requested_cells`). A spanning tree
  joins the cells — a randomised depth-first search for long corridors,
  Wilson's loop-erased random walks for a branchy one — with at most three
  branches meeting in a cell (the walks avoid full cells, and any four-way
  crossing left is rerouted through a neighbouring pair with free sides),
  because a four-way crossing pinches the groove. The walk
  round the tree on the doubled grid visits each cell's four quarter cells
  once and returns: a Hamiltonian cycle of the shape. Three rounds of
  Chaikin corner cutting smooth it, and the walls are its offsets at ± half
  the groove (exact polygon offsets; a very long loop, over 12 000 points,
  is drawn with nested strokes instead, noted as `walls` in meta). The
  shape is shown as a soft field hugging the groove with an even margin.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  single_closed_path`. Tested on every shape, both wanders and several
  grids: the walk visits every quarter cell of every cell exactly once, one
  grid step at a time, and returns to its start; the smoothed centre line
  is a simple closed curve (no edge meets any other, decided on exact
  integer topology); every point lies inside the cells and the outline;
  every cell is passed through; no cell has four branches (on grids of nine
  or more cells across). A bad picture is refused cleanly. All ink
  stays inside the page.
