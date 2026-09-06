---
title: "Tents"
blurb: "Tents — pitch one tent beside every tree, none touching, counts on the edges"
category: puzzle
version: "1.0.0"
---
Pitch one tent beside every tree — tents never touch, and the edge counts say
how many camp in each row and column.

## What it is

A grid scattered with trees. Every tree owns exactly one tent, orthogonally
adjacent to it; tents never touch each other, not even diagonally; and the
numbers along the edges count the tents in each row and column. Some counts
may be omitted.

## How to play

Zeros are free moves: grass the whole line. Cells beside no tree are grass
too. Then work the counts — a line whose quota is met is done, and a line
with exactly as many candidate cells as tents left fills them all. The
endgame is usually a cornered tree with a single free spot.

## Purpose

A newspaper and puzzle-app staple the catalogue lacked, and a structurally
interesting one: the pairing rule (each tree ↔ its own tent) is a perfect
matching, which the cell-level constraint model cannot express. The
generator therefore proves it outright, which is a new kind of guarantee for
the workspace.

## History

Published as *Zeltlager* by Léon Balmaekers in 1989, and widely known through
Simon Tatham's puzzle collection and the World Puzzle Championship as Tents,
or Tents and Trees.

## This implementation

- **Spec knobs:** `size` (6–12), `density` (share of cells in tent–tree
  pairs), `difficulty`, `cell`, `line`.
- **Generation:** tents are placed first, none touching; a tree is attached
  beside each; the edge counts are then thinned away one at a time while the
  technique ladder still finishes the board at the requested ceiling.
- **Solving:** line counting and exact line enumeration (with the in-line
  separation rule folded in), tent–tent elimination, and the cornered-tree
  force.
- **Guarantees:** deterministic per seed; exactly one solution, proven by
  exhaustive count *and* checked to admit a perfect tree–tent matching;
  solvable by inference alone, rated by the hardest technique used.
