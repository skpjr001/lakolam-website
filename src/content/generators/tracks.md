---
title: "Train Tracks"
blurb: "Train Tracks — lay one railway from A to B to match the row and column counts"
category: puzzle
version: "1.0.0"
---
Lay one railway from A to B — the numbers say how many squares of each row
and column the track passes through.

## What it is

A grid with an entrance, A, on the left edge and an exit, B, on the bottom
edge. Draw one continuous track between them through the centres of the
squares, turning only at right angles. The track never crosses itself,
branches or forms a loop. The number beside each row and above each column
counts the squares in it that hold track. A few pieces are printed to start
you off.

## How to play

Begin with the extremes: a 0 empties its line; a line whose count equals its
free squares fills them all. Every track square joins exactly two
neighbours, so a printed piece pointing into a square puts track there, and a
square boxed in by empties cannot hold track. Follow the line out from A and
back from B; when counts alone stall, try a piece in a square and see whether
the line can still be completed — a dead end or a closed loop rules it out.

## Purpose

A newspaper and book staple (The Times has published collections, and it runs
daily on puzzle sites) with a distinct feel: a path puzzle driven by counts
rather than clue numbers inside the grid. It sits between `numberlink`'s
routing and `battleships`' edge counts.

## History

Popularised by the Times puzzle pages and Simon Tatham's collection (as
*Tracks*); the rail-laying theme and edge-count mechanic have run in puzzle
magazines for decades.

## This implementation

- **Spec knobs:** `size` (4–12; 0 picks from the difficulty), `difficulty`,
  `cell`, `line`.
- **Generation:** a random self-avoiding line is walked from the left edge to
  the bottom row, covering 30–55% of the squares; every piece starts printed,
  and pieces (never the two exits) are erased while the solver still settles
  every square by inference at or below the requested difficulty.
- **Solving:** each square keeps its seven possible states (empty or six
  pieces) and a ladder applies them — *basic* (rails must meet, nothing
  points off the board but the exits, the counts), *reach* (squares that can't
  be reached from A hold no track), and *trial* (assume a state, strike it on
  a contradiction). A closed loop of settled pieces is always a contradiction.
- **Guarantees:** deterministic per seed; exactly one line, since every
  deduction is sound and the ladder settles every square — confirmed by an
  independent pruned count in the tests. Counts and rails alone are Easy; the
  boards that need a what-if are banded by size (7×7 Medium, 8–9 Hard, 10+
  Expert).
