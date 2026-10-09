---
title: "Numberlink"
blurb: "Join each numbered pair with a path, filling every cell"
category: puzzle
version: "1.1.0"
---
Join each numbered pair with a path so that no paths cross and every cell is
used.

## What it is

A grid with pairs of matching numbers. Each pair must be joined by a path of
horizontal and vertical steps. Paths may not cross or overlap, and — in the
strict form this crate generates — every cell of the grid is used by exactly
one path.

## How to play

Start with pairs pinned against walls or corners; their paths have little
choice. A path that would leave an unreachable pocket of empty cells is wrong,
because every cell must be covered. Well-made numberlinks solve with almost no
case analysis — each deduction is "this corridor can only serve that pair" —
and a path that hugs itself is always wrong (the shortcut would be a second
solution).

## Purpose

The puzzle behind the *Flow*-style mobile games, and the crate that documents
why full coverage matters: without it, numberlink has astronomically many
solutions and uniqueness cannot honestly be claimed at all.

## History

Ancestors go back to Sam Loyd's era of connection puzzles (a recognisable
specimen appeared in 1897); the modern form was standardised by Nikoli in
1989 under the names **Arukone** ("walk-connect") and Numberlink. The
touchscreen era made it one of the most-played puzzle mechanics in the world.

## History note in this workspace

Routing is NP-complete, and numberlink is the workspace's single most
expensive generator (~1.4 s a board) — the profiling table names it the next
optimisation target.

## This implementation

- **Spec knobs:** `rows`, `cols` (5–10), `min_path` (2–12), `difficulty`,
  `cell`, `line`.
- **Generation:** answer first — the grid is decomposed into non-crossing
  paths that cover it, endpoints become the clues, and the router proves the
  clues admit exactly one covering set of paths. If no plain carve routes
  uniquely (most 10-wide boards, long `min_path`), a second phase carves
  freely and *repairs* short paths — a short path's end joins an adjacent
  path's cell and takes that path's cells to one of its ends, never touching
  itself — and if even that finds nothing, `min_path` is relaxed one step at
  a time and reported as `min_path` beside `requested_min_path`. The band is
  rated by average path length (`rating_basis: average_path_length`), and
  the requested band steers the carve: a walk stops at 3 cells for Kids, 4
  for Easy, 6 for Medium and 10 for Hard (never below `min_path + 1`), while
  Expert walks until it is stuck. Kids means an average path under three
  cells, so it is reachable only at `min_path` 2; at the default 3 a Kids
  request ships Easy with `requested_difficulty`.
- **Guarantees:** `count(2) == Exact(1)` from a bounded search; a budget
  overrun is a *rejection*, never a shipped guess. Prunes: per-pair
  reachability flood fills (epoch-stamped so resets are free), stranded-cell
  detection, and the no-self-touching rule real numberlink shares.
- **Difficulty:** average path length (cells per pair), banded: under 3
  Kids, under 4.5 Easy, under 6.5 Medium, under 9 Hard, else Expert.
- **Version 1.1 — the band steers the carve.** An uncapped walk runs until
  it is stuck, which on the default 7x7 always made six or seven long paths:
  every request from Kids to Hard was served Hard or Expert (half of each),
  and only Expert was honest. The plain and repaired carves now cap a walk's
  length by the requested band, so Easy, Medium and Hard are served as asked
  (and Kids at `min_path` 2); pages at those bands change, Expert pages do
  not. Lower bands are also far quicker: the 200-carve search no longer runs
  dry looking for a band the walk could not make.
