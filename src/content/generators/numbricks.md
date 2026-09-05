---
title: "Numbricks"
blurb: "Numbricks — 1 to n² snaking through the grid, one step at a time"
category: puzzle
version: "1.0.0"
---
Fill the grid with 1 to n² so that consecutive numbers touch — up, down,
left or right, never diagonally.

## What it is

A single snaking path visiting every cell, with a handful of numbers printed
to anchor it. Also published as Numbrix (Marilyn vos Savant's version, from
*Parade* magazine in 2008) and as Hidato's orthogonal cousin.

## How to play

Work outward from the given numbers, and inward from the ends: 1 and n² are
always printed, so the path's start and finish are known. Between two givens
`k` and `k + 4` there must be a route exactly four steps long, which usually
leaves one option.

## Why it is in the catalogue

The sibling of ABC Path, and the difference is instructive: orthogonal
adjacency (four neighbours instead of eight) makes the path *far* more
constrained, which is why numbricks can print five clues on a 5×5 where ABC
Path needs sixteen edge labels.

## The implementation's guarantees

- The adjacency propagator reasons **forward**: a number's successor lives in
  the neighbourhood of wherever the number could be, so one pin cascades
  along the single thread. (Written fresh rather than shared with ABC Path —
  generator crates never depend on each other — but with its lesson already
  learned.)
- The random path uses a **Warnsdorff bias** (visit the most constrained
  neighbour first), which turns a search that stalls on a 5×5 into one that
  lands almost immediately.
- **The endpoints are never thinned away**: a numbricks without 1 and n²
  printed is a different, much harder puzzle, and a test says so.
- Uniqueness and no guessing are proved on the board that ships, and the
  ladder's solution is checked to *be* the generated snake.
- Rating basis: `surviving_clue_count`, named honestly — one rule means the
  ladder cannot separate boards.
- Size is capped at 5×5 by the solver's 32-value ceiling (a 6×6 would need
  36 values).
