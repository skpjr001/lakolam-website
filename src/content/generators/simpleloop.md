---
title: "Simple Loop"
blurb: "Simple Loop — draw one closed loop through every white cell"
category: puzzle
version: "1.0.0"
---
One closed loop through every white cell — the black cells are the only
clue.

## What it is

A grid with a few black cells. Draw a single loop that visits every white
cell exactly once, moving between cells that share a side, and returns to
where it started. There are no numbers at all: the black cells, and the
fact that the loop must reach everything, decide the answer.

## How to play

Draw lines between the centres of neighbouring white cells so that every
white cell has exactly two lines — one in, one out — and all the lines join
into one big loop.

Start in the corners and beside black cells: a white cell with only two
white neighbours must use both. Once a cell has its two lines, it takes no
more. Never close a small loop early — the loop is only finished when it
has passed through every white cell. On harder boards, look for narrow
passages: if the white cells would fall into two parts without some line,
that line is needed (in fact, the loop must cross every such passage twice).

## Purpose

The purest loop puzzle: nothing to read, nothing to count, just the shape of
the board. It trains the two ideas behind every loop genre — degree two
everywhere, and no early closure — and prints beautifully as a black-and-
white pattern.

## History

Simple Loop is a Japanese-style pencil-puzzle genre, found in online
collections such as puzz.link, and it is the puzzle form of an old
mathematical question: finding a Hamiltonian cycle — a round trip through
every vertex exactly once — in a grid graph. It is a common warm-up genre
in puzzle collections and apps.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8, 10
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** a tree-like shape of unit squares is grown on the lattice
  of cell centres; its outline is always one simple loop, and every cell the
  outline misses is black. A local search then toggles squares beside the
  edges the ladder cannot settle, keeping the move that leaves the fewest
  unsettled, until the loop is forced (and, for Hard and Expert, until the
  proof needs the trial rung). Black cells stay between a tenth and a
  quarter of the board (up to a third for Kids and Easy).
- **Solving:** a ladder on yes/no edges — *local* (every white cell has
  exactly two loop edges), *loop* (no edge may close a loop short of every
  white cell, and the possible edges must hold the white cells together
  with no bridge, since the loop crosses any narrow passage twice), and
  *trial* (assume an edge, propagate, keep the opposite on a
  contradiction).
- **Guarantees:** deterministic per seed; exactly one loop, proven because
  the sound ladder settles every edge, confirmed by a capped exhaustive
  count, and re-proven in tests by an independent Hamiltonian-cycle search.
  Rated by the hardest rung needed with size as the tie-break (local: Kids
  up to 6×6, else Easy; loop: Easy up to 6×6, else Medium; trial: Hard up to
  8×8, else Expert). Expert boards are 10×10 and occasionally fall back to
  the nearest band found; the label always states the band actually
  reached.
