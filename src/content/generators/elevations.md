---
title: "Plans and Elevations"
blurb: "Plans and elevations — draw the plan, front and side elevations of cube stacks, match views, count cubes from views"
category: maths
version: "1.0.0"
---
Draw the plan, front and side views of cube stacks, pick the right view, and count the cubes from three views.

## What it is

A worksheet of two to six questions about solids built from unit cubes.
Each solid is a set of stacks on a small grid, drawn isometrically with
shaded faces and arrows marking the FRONT and the SIDE. Draw its plan
(the view from above), front elevation and side elevation on squared
grids; draw the front and side elevations from a plan with the number of
cubes in each stack written in it; decide which of four drawings is the
asked view; or work out how many cubes a solid has from its plan, front
and side elevations (the smallest and largest numbers when the views do
not decide it). The answer key draws every view in red.

## How to play

- **The plan** is what you see looking straight down. Draw one square for
  each stack, with the front of the solid at the bottom of your drawing.
- **The front elevation** is what you see looking in the direction of the
  FRONT arrow; **the side elevation** is the view along the SIDE arrow.
  Draw a square for every cube face you would see, flat on, as if you
  were far away: a stack hidden behind a taller one adds nothing.
- **Lines inside a view:** draw a line wherever the depth changes —
  between two stacks of different heights on the plan, and on an
  elevation between faces that are different distances away. Faces at
  the same depth join with no line.
- **From a plan with heights:** the front elevation shows, for each
  column of the plan, its tallest stack; the side elevation does the same
  for each row, seen from the right.
- **Counting cubes:** use the plan for where the stacks are and the
  elevations for how tall they can be. Every cube is a whole cube, and
  stacks stand on the ground.

The top of every stack can be seen in each drawing, so each picture
shows exactly one solid.

## Purpose

Moving between a 3-D object and its 2-D views is a core skill of
technical drawing, architecture and engineering, and a requirement of
GCSE Mathematics in England ("construct and interpret plans and
elevations of 3D shapes", Foundation tier). It is also chapter 10 of
NCERT class 8, "Visualising Solid Shapes", and part of spatial-reasoning
work in many other curricula.

## History

Showing an object by a plan and elevations goes back to architects'
drawings in antiquity — Vitruvius names the *ichnographia* (plan) and
*orthographia* (elevation) in the first century BC. Gaspard Monge turned
it into a mathematical method, descriptive geometry, at the École
Polytechnique in the 1790s; first- and third-angle projection, the
standards of engineering drawing, grew from his work.

## This implementation

- **Spec knobs:** `difficulty` (the solid's size: Easy 3 × 2 stacks up to
  2 high, Medium 3 × 3 up to 3, Hard 4 × 3 up to 3, Expert 4 × 4 up to 4;
  counting uses at most nine stacks); `topic` (`mixed`, `draw_views`,
  `from_plan`, `match_view`, `count_cubes` — counting starts at Medium);
  `locale` (`uk` "plan, front elevation, side elevation"; `us` and `in`
  "top view, front view, side view", `in` titled "visualising solid
  shapes"); `count` (2-6); `width` (300-2000 Pt), `height` (300-3000 Pt)
  and `line` (0.5-4 Pt). Out-of-range values are clamped and reported in
  meta as `requested_*`.
- **Generation:** stacks are drawn at random with nearer stacks at most
  one cube taller than those behind them; a solid is kept only if it is
  connected, uses every row and column, reaches the level's full height,
  has different front and side views, and every stack's top shows in the
  isometric drawing. Wrong options in "which view" are the other views
  of the same solid, a mirror image, or the view of a slightly changed
  solid — all different drawings.
- **Solving:** each view is computed from the solid: for every square the
  nearest face is found, and lines are drawn between squares whose
  nearest faces are at different depths. Cube counts come from searching
  every height map with the same plan footprint that is no taller than
  the views allow.
- **Guarantees:** every isometric drawing is proven to show exactly one
  solid (an exact search over the triangular lattice for every set of
  stacks, with every top visible, that draws the same picture finds only
  this one). Views are recomputed from the individual cubes by a separate
  route; a "which view" question has exactly one matching option; counts
  are recomputed by brute force over every height map, comparing all
  three drawings. Meta: `answers_checked`, `unique`, `difficulty`,
  `rating_basis` (`grid_size_and_height`). With lines drawn at every
  change of depth, three views fix most of these small solids, so the
  "smallest and largest" form of the counting question is rare.
