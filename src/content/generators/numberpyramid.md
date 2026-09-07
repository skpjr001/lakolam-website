---
title: "Number Pyramid"
blurb: "Number Pyramid — each brick is the sum of the two below"
category: puzzle
version: "1.0.0"
---
A wall of bricks where each brick is the sum of the two beneath it. Fill in
the missing numbers.

## What it is

The bottom row is a line of numbers; every brick above holds the sum of the
two it rests on. Some bricks are given and the rest are blank. There is
exactly one way to complete the wall.

## How to play

Work both directions: two neighbouring bricks give the one above by addition;
a brick and one of its children give the other child by subtraction. Chase
these until the base row is known, and the rest follows.

## Purpose

The catalogue's arithmetic-cascade puzzle, and a classroom/kids-book staple.
It fits the engine's proof ethos unusually cleanly: because every brick is a
fixed linear combination of the base row, uniqueness is not a search but a
rank test — the given bricks pin the base exactly when their equations are
independent.

## History

Addition pyramids (also "number walls" or "brick walls") are a fixture of
primary-school arithmetic practice and puzzle workbooks worldwide.

## This implementation

- **Spec knobs:** `base` (bottom-row width, 3–6), `max_base` (largest base
  number), `difficulty`, `cell`, `line`.
- **Generation:** a random base row is chosen and the wall computed; then
  bricks are removed greedily as long as the survivors still determine the
  base, leaving a minimal set of givens where every shown brick is
  load-bearing.
- **Guarantees:** deterministic per seed; every brick equals the sum of the
  two below it (checked); and the completion is unique — proven exactly by
  Gaussian elimination showing the given bricks' equations have full rank over
  the base row (no search, no ambiguity). Rated by how many bricks are shown.
