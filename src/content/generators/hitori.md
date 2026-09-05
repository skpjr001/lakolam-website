---
title: "Hitori"
blurb: "Shade cells until no number repeats in any row or column"
category: puzzle
version: "1.0.0"
---
Shade out cells until no number repeats in any row or column — without ever
shading two neighbours or cutting the board in two.

## What it is

A grid filled with numbers. Some cells must be shaded (eliminated) so that:
no number appears twice among the *unshaded* cells of any row or column; no
two shaded cells share an edge; and the unshaded cells remain one connected
region.

## How to play

Look for patterns: in "a b a", the middle cell must survive, so the outer pair
resolves around it; a number sandwiched between two copies of another number
is forced unshaded. When shading a cell, immediately circle its neighbours as
safe. Watch connectivity — a shading that would strand a corner is wrong even
if the numbers allow it.

## Purpose

The subtractive counterpart to sudoku: instead of writing digits in, you cross
them out. Its three rules prune in three different ways (locally, per line,
globally), which made it the workspace's cleanest example of layering
incremental checks over a final global one.

## History

Nikoli, 1990. The full name is *Hitori ni shite kure* — "leave me alone" —
after the goal of making every number solitary in its lines.

## This implementation

- **Spec knobs:** `rows`, `cols`, `symbols`, `difficulty`.
- **Generation:** a near-Latin grid is built, duplicates are introduced
  deliberately, and the shading that fixes them is verified unique.
- **Guarantees:** the shipped answer passes all three rules (checked against
  the rule definition before the solver runs), and `count(2) == Exact(1)` from
  a bounded search — hitori is NP-complete, so the budget exists, and running
  out of it rejects the board rather than trusting it.
- **Cross-check:** the solver's count is tested against an exhaustive sweep of
  all 2⁹ shadings of a 3×3 — the pruning is an optimisation of exactly that
  enumeration, and the test is what makes it trustworthy.
- **A fact worth knowing:** a duplicate-free grid is *legal* with nothing
  shaded, and shading a unique number is pointless but not illegal — so a
  Latin square admits many legal shadings, and "no duplicates" alone is
  nowhere near a puzzle. The generator works from that fact rather than
  against it.
