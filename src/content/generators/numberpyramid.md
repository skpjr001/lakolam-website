---
title: "Number Pyramid"
blurb: "Number Pyramid — each brick is the sum of the two below"
category: maths
version: "1.1.0"
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

- **Spec knobs:** `base` (bottom-row width, 3–6, or null to take it from
  `difficulty`: 4 for kids–medium, 5 for hard, 6 for expert), `max_base`
  (largest base number), `difficulty`, `cell`, `line`.
- **Generation:** a random base row is chosen and the wall computed; then
  bricks are removed greedily as long as the survivors still determine the
  base — until their share reaches the requested band's (kids ≥ 70 %, easy
  ≥ 55 %, medium ≥ 40 %), or, for hard and expert, down to a minimal set
  where every shown brick is load-bearing.
- **Guarantees:** deterministic per seed; every brick equals the sum of the
  two below it (checked); and the completion is unique — proven exactly by
  Gaussian elimination showing the given bricks' equations have full rank over
  the base row (no search, no ambiguity). Rated by how many bricks are shown
  (`rating_basis: given_ratio`).
- **Reachable bands:** a minimal set is always exactly `base` bricks, so a
  3- or 4-brick base bottoms out at medium (4 of 10 is 40 %) and hard needs a
  base of 5 or 6 — which a null `base` picks. There is no expert rung: expert
  is served as hard on a 6-brick base, with `requested_difficulty`.
- **Version 1.1:** `difficulty` now steers the trim, and `base` may be null
  (the new default) to take its width from the band. Before, every pyramid
  was trimmed to a minimal set and the default 4-brick base always came out
  medium; now kids, easy, medium and hard are each served. Pages whose spec
  set `base` with hard or expert, any medium request, and the default page are
  byte-identical to 1.0.
