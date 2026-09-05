---
title: "Slitherlink"
blurb: "Draw one closed loop, clued by how many edges each cell touches"
category: puzzle
version: "1.0.0"
---
Draw a single closed loop along the grid lines so each clue counts the edges
drawn around its cell.

## What it is

A lattice of dots. Some cells between the dots carry a number 0–3: exactly
that many of the cell's four edges are part of the loop. The loop is one
simple closed curve — it never branches, never crosses itself, and there is
only one of it.

## How to play

Zeros are gifts: no edge touches them, and a 3 beside a 0 is nearly forced.
Corners and edges constrain hard — a 3 in a corner takes both outer edges.
Track dot degrees: every dot on the loop has exactly two drawn edges, so a dot
with two edges decided excludes the rest. The single-loop rule closes the
game: never complete a small cycle while cells remain unsatisfied.

## Purpose

The archetypal loop puzzle and one of Nikoli's "big four". In the workspace it
is the hardest solver honestly bounded: slitherlink is NP-complete, the search
carries four proof-based prunes, a worklist propagator, and a union-find over
dots — and its development history (including a rollback bug that could have
called ambiguous boards unique) is recorded in the module docs as a warning.

## History

Nikoli, 1989, credited as a collaboration refined by founder Maki Kaji.
Published in English as Slitherlink, Fences, Loop the Loop and Dotty Dilemma.
It remains one of the most-analysed pencil puzzles in computer science.

## This implementation

- **Spec knobs:** `rows`, `cols`, `clue_share`, `difficulty`.
- **Generation:** answer first — a closed loop is grown on the dual grid as a
  random simple polygon (the `lattice` module, shared through `lako-grid`),
  every cell's edge count is read off it, then clues are removed while the
  loop stays unique.
- **Guarantees:** exactly one loop satisfies the printed clues; the search is
  cross-checked against brute force over **every clue subset** of a small
  board — the test that once caught a union-find rollback bug no ordinary
  fixture would have found.
- **Difficulty:** which clue patterns the deduction needed, banded; raw search
  nodes reported alongside.
