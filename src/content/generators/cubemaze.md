---
title: "Cube Maze"
blurb: "Cube maze — cut out, fold and glue a cube whose maze runs over all six faces"
category: maze
version: "1.0.0"
---
Cut it out, fold it into a cube, and follow the maze around all six sides.

## What it is

A maze printed on a cross-shaped cube net: six square faces, each a grid of
squares, with glue tabs around the edge. Folded up, the passages carry on
over the edges of the cube from one face to the next, so the way from S to G
wanders around the whole solid. Start and goal are on opposite faces.

## How to play

Cut around the outside of the net, tabs and all. Fold along every dashed
line, and glue each numbered tab under the edge with the same number. Now
find the way from S to G without crossing a wall. When a passage runs off the
edge of a face, it carries straight on over the fold onto the next face.

You can also solve it flat: a passage that leaves the net at a numbered edge
comes back in at the other edge with the same number. There is exactly one
way through.

## Purpose

A maze and a craft in one page — a surface maze that has to be built before
it can be walked, and a hands-on way to see how a flat net folds into a cube.
It pairs with the cube nets of the maths lane and suits kids' activity packs,
classrooms and anyone who likes a maze that turns in the hand.

## History

Mazes on the faces of a cube go back at least to Larry Evans' *Maze Cubes*
(1977) and the "surface mazes" of the big maze compendiums. Printable
fold-up cube mazes are a staple of teachers' resources (Tim van de Vall's
cube maze), and Wolfram and the University of Dayton have published
generators for 3D-printed cube mazes.

## This implementation

- **Spec knobs:** `difficulty` (face size 3, 4, 6, 8 or 10 squares), `size`
  (2–12 squares per face edge, 0 = the level's), `colour` (a light tint per
  face), `width`, `height`, `line`.
- **Generation:** the net is the cross with BACK hanging below DOWN. The
  surface graph joins squares within a face, across the five fold lines, and
  across the seven glued seams from a hand-made seam table (which edge meets
  which, and whether the count along it is reversed). A growing-tree carver
  (half newest, half random) cuts a spanning tree of all `6n²` squares. START
  is a random square; GOAL is the square on the opposite face farthest from
  it along the maze.
- **Solving:** the maze is a tree, so the route is the tree path; the answer
  key draws it on the net, running to the edge and coming back in on the
  matching edge where it crosses a glued seam.
- **Guarantees:** deterministic per seed. A perfect maze, proven in the
  build (open passages = squares − 1 and everything connected) and re-checked
  by an independent depth-first count of simple routes, capped at 2, that
  finds exactly one. The **fold check**: the net is folded numerically — each
  face turned a quarter turn about its hinge, BACK riding on DOWN — and every
  open passage must join two squares whose folded centres touch on the cube
  (one square apart on a face, `√½` apart across a cube edge). The tests go
  further: for face sizes 2–7 the whole seam-table graph equals the graph of
  squares that touch on the folded cube. Rated by face size
  (`rating_basis: face_size`); a size that rates differently from the
  requested band reports `requested_difficulty`, and clamped knobs report
  `requested_<field>`.
