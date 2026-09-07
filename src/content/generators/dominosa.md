---
title: "Dominosa"
blurb: "Dominosa — partition the number field into the full set of dominoes"
category: puzzle
version: "1.0.0"
---
A grid of numbers, and one complete set of dominoes hidden in it. Draw the
borders so every domino from double-blank to double-six appears exactly once.

## What it is

Lay out a full domino set — 0-0, 0-1, up to n-n — then erase the lines between
the pieces, leaving only the numbers. The solver's job is to put the lines
back: partition the grid into dominoes so that each number pair is used once
and only once.

## How to play

Find a pair that can only sit one way — a number pair that appears in just one
place, or a cell whose neighbours leave a single legal partner. Mark that
domino, cross the pair off the list, and the constraints ripple outward. A
checklist of the 28 pairs (for the double-six set) is the usual companion.

## Purpose

The catalogue's first *matching / reconstruction* puzzle: not shading, not
placement, but recovering a partition from the values it left behind. And it
is the genre where uniqueness is the whole identity — a number field with two
valid tilings simply is not a Dominosa.

## History

A classic of recreational mathematics, popularised in puzzle columns and by
Simon Tatham's Puzzles (as "Dominosa"); the domino set itself dates to
18th-century China and Europe.

## This implementation

- **Spec knobs:** `max_pip` (3–7; the set runs 0..=max_pip and tiles a
  (max_pip+1)×(max_pip+2) grid), `difficulty`, `cell`, `line`.
- **Generation:** a random domino tiling of the rectangle is drawn, each
  domino assigned a distinct pair (orientation random), and the number field
  read off — kept only when a backtracking tiler finds it admits a single
  partition.
- **Guarantees:** deterministic per seed; the partition covers the grid and
  uses every pair exactly once (checked); and a backtracking tiler — placing a
  domino on the first free cell, forbidding any repeated pair, with a node
  budget — proves exactly one tiling exists (a truncated search is treated as
  ambiguous). Rated by the size of the domino set.
