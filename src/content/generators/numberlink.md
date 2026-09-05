---
title: "Numberlink"
blurb: "Join each numbered pair with a path, filling every cell"
category: puzzle
version: "1.0.0"
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

- **Spec knobs:** `rows`, `cols`, `pairs`, `difficulty`.
- **Generation:** answer first — the grid is decomposed into non-crossing
  paths that cover it, endpoints become the clues, and the router proves the
  clues admit exactly one covering set of paths.
- **Guarantees:** `count(2) == Exact(1)` from a bounded search; a budget
  overrun is a *rejection*, never a shipped guess. Prunes: per-pair
  reachability flood fills (epoch-stamped so resets are free), stranded-cell
  detection, and the no-self-touching rule real numberlink shares.
- **Difficulty:** path count, length variance and search depth, banded.
