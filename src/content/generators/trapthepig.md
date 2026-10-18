---
title: "Trap the Pig"
blurb: "Trap the pig: place walls on a hex board so the pig cannot run off the edge — exactly one first wall traps it in N, proven by exact search"
category: puzzle
version: "1.0.0"
---
A pig in the middle of a hex board wants to run off the edge — wall it in.

## What it is

A board of hexagonal cells with some walls already standing and a pig in
the centre. You put down walls one at a time; after each wall the pig
takes a step toward the edge. The puzzle tells you how many walls you
have — "trap the pig in 3 walls" — and only one first wall makes that
possible, whichever way the pig runs. The answer key marks that wall and
shows one way to finish the trap.

## How to play

Each turn, put one wall on any empty cell (not the pig's). If the pig can
no longer reach the edge of the board through empty cells, it is trapped
and you win. Otherwise the pig moves to a neighbouring empty cell that is
one step nearer the edge; when several cells are equally near, it may
take any of them, so your plan must work whichever it picks. If the pig
is standing on an edge cell, it runs off the board and escapes.

Find the first wall that lets you trap the pig with the number of walls
given. Count how many steps the pig needs to reach the edge, look for the
gaps in the walls nearest its shortest way out, and remember that every
wall you place gives the pig another step. In the answer key the one first
wall is red and numbered 1; the other numbers show one way to finish the
trap if the pig runs along the dotted path.

## Purpose

A quick, visual puzzle about planning ahead against an opponent whose
moves you can predict: it teaches shortest paths, bottlenecks and why the
order of your moves matters. Small boards with one or two walls suit
young children; four or five walls on a larger board take real
look-ahead.

## History

Trapping games on a hex grid, where one player blocks cells while a
runner heads for the edge, became popular as browser and phone games in
the 2000s, often with a cat or a pig as the runner. They are close
cousins of older "angel and devil" pursuit problems and of connection
games played on hexagons.

## This implementation

- **Spec knobs:** `difficulty` (by walls: Kids 1, Easy 2, Medium 3, Hard
  4, Expert 5), `radius` (rings round the centre, 3-6, i.e. 37-127 cells;
  0 takes the band's size — 3 for Kids and Easy, 4 above; out-of-range
  values are clamped and reported as `requested_radius`), `ink`
  (`colour` or `black`), `cell` (16-80 pt).
- **Generation:** the pig starts in the centre; every other cell gets a
  wall with a probability drawn per board from 0.36-0.52 (seeded). A
  board is kept when the least number of walls that traps the pig is the
  band's and exactly one first wall achieves it. Five-wall boards with a
  single first wall are rare (about one random board in 70), so Expert
  tries up to 500 boards within a work budget (1,200,000 max-flow and
  distance computations, a few seconds); after a third of it, it hunts
  four-wall boards instead, and serves the nearest band found (Hard) with
  `requested_difficulty`. Expert reaches five walls on radius 3-5; on
  radius 6 it is usually served as Hard.
- **Solving:** an exact AND/OR search: the player's turn is an OR over
  every empty cell, the pig's turn an AND over every step the rule allows,
  memoised by (walls, pig, walls left), with a node budget of 400,000 per
  board (running out rejects it). One sound cut-off: with k walls left the
  pig ends within k − 1 steps of where it stands, and the final walls cut
  that cell off from the edge, so some cell within reach must have a
  vertex cut (max-flow with split cells) of at most k. The least depth is
  found by trying 1, 2, 3 … walls; the first walls are then counted
  (cap 2).
- **Guarantees:** exactly one first wall traps the pig within N walls
  against every choice of the pig, and no plan does it with fewer; the
  pig is neither trapped nor on the edge at the start. Meta: `unique`,
  `winning_moves: 1`, `depth` and `walls_to_trap` (N), `difficulty`,
  `rating_basis: "win_depth"`, `radius`, `first_wall`, `plan`,
  `pig_path` (axial [q, r] coordinates, centre [0, 0]). Tests re-prove
  every band with `lako_gametree::prove_win_in` (no cut-off) and the small
  bands with a plain search on independent axial-coordinate rules, check
  the max-flow cut against brute force, and play the key's plan out.
- **App:** `lako_trapthepig::play` — `new_puzzle`, `coords`,
  `neighbours`, `distances`, `place_wall` (the wall, then the app's pig
  step), `hint` (the next wall of a least-walls plan within 5 walls, else
  the wall that keeps the pig furthest from the edge), `trap_within`. The
  app's pig is deterministic: of its allowed steps it takes the first in a
  direction order (a permutation of east, north-east, north-west, west,
  south-west, south-east) shuffled from the seed (`tie_order`).
