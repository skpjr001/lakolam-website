---
title: "Hashi (Hashiwokakero)"
blurb: "Join the islands with bridges, clued by how many each one takes"
category: puzzle
version: "1.0.0"
---
Connect the numbered islands with bridges: each island's number is how many
bridge ends it takes, and everything must join up.

## What it is

Circled numbers ("islands") on a grid. Islands are joined by horizontal or
vertical bridges — at most two between any pair, never crossing another
bridge or island. Each island's number says exactly how many bridges touch
it, and the finished network must be connected.

## How to play

Saturated islands come first: an "8" takes double bridges in all four
directions; a corner "4" is fully forced. An island with number 2k and k
neighbours takes at least one bridge to each. Draw what is forced, recount,
repeat. Keep connectivity in mind late in the solve — a move that would seal
off a satisfied sub-network is wrong.

## Purpose

The only workspace puzzle whose answer is a *graph* rather than a colouring
or a partition — bridges, degrees, planarity. It renders beautifully sparse,
which makes it a good breather page between dense grids.

## History

Nikoli, 1989. *Hashi wo kakero* means "build bridges!". Published in English
as Hashi or Bridges; the mechanic descends from graph-realisation questions —
degree sequences made playable.

## This implementation

- **Spec knobs:** `rows`, `cols`, `islands`, `difficulty`.
- **Generation:** answer first — islands are placed on the lattice, a
  connected planar multigraph (≤2 edges per pair, no crossings) is built over
  them, and each island's clue is its degree in that graph.
- **Guarantees:** the degree sequence admits exactly one bridge layout,
  proven by a bounded search whose variables are the candidate pairs (0, 1 or
  2 bridges each) with degree and crossing checked incrementally and
  connectivity as the final test.
- **Difficulty:** forced-move ratio and degree distribution, banded.
