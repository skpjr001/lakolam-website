---
title: "Tents"
blurb: "Tents — pitch one tent beside every tree, none touching, counts on the edges"
category: puzzle
version: "1.1.0"
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
- **Version 1.1 — the pairing rung:** the ladder stopped at line
  enumeration, so on the 8×8 default the bands reached were Easy and
  Medium, and Hard and Expert requests came back Medium. The genre's
  pairing logic is now a rung, at sudoku's pointing-pair level: every tent
  belongs to its own tree, so (by augmenting-path matching on the trees'
  candidate spots) a cell that could not be a tent alongside the tents
  already placed is grass, and a cell without which some tree would be left
  with no spot is a tent. This also carries the tent total, one per tree.
  It runs only at the Hard and Expert ceilings, where uniqueness is then
  proven under the full rules, pairing included (and re-proved in the tests
  by a separate count that gives each tree its own spot); Kids, Easy and
  Medium boards are byte-identical to 1.0. The rating keeps size as the
  tie-break: the pairing rung is **Hard** on boards up to 8×8 and
  **Expert** from 9×9. **Reachable bands:** Easy, Medium and Hard on the
  8×8 default (Expert requests there get Hard); Easy, Hard and Expert from
  9×9, where enumeration rates Hard. Kids is never reached — line counting,
  the first rung any board needs, is an Easy technique — and is served as
  Easy; every off-band board records `requested_difficulty`.
