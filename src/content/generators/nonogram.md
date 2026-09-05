---
title: "Nonogram"
blurb: "Picture logic puzzles, proven solvable by line reasoning alone"
category: puzzle
version: "1.0.0"
---
Picture logic: shade cells so each row and column matches its run-length clues,
revealing a hidden picture.

## What it is

A grid with numbers along the top and left. Each number list describes the
runs of filled cells in that row or column, in order, with at least one blank
cell between runs. Solving the grid correctly reveals a small picture — a
heart, a cat, a boat.

## How to play

Work line by line. If a 15-wide row is clued "12", the middle nine cells are
filled in every legal placement — mark them. Rows and columns feed each other:
every cell fixed in a row narrows its column, and the puzzle finishes by
bouncing between the two directions. Mark known-blank cells with a dot; they
are as informative as filled ones.

## Purpose

The most visual of the logic puzzles — the only one whose answer is a picture,
which makes it a favourite for younger solvers and for themed books. It also
carries the workspace's strictest quality bar: a nonogram that needs guessing
is rejected outright, because no human solves one that way.

## History

Invented independently in the late 1980s by **Non Ishida** (a Tokyo graphics
editor, via a skyscraper-lights design competition) and puzzle author **Tetsuya
Nishio**. Serialised in Japanese magazines from 1988, brought to The Sunday
Telegraph in 1990 under the name *nonogram* (after Ishida). Also known as
picross, griddlers, hanjie, and paint-by-numbers.

## This implementation

- **Spec knobs:** `rows`, `cols`, `picture` (a named silhouette or random
  texture), `density` for the random pictures.
- **Generation:** render the picture to a bitmap, derive the clues, then
  **verify the grid is solvable by line reasoning alone** — the O(n·k)
  reachability line solver in `lako-solver::line`. Named silhouettes are
  re-rendered slightly fatter or leaner across retries until a line-solvable
  thickness is found, rather than abandoning the requested picture.
- **Guarantees:** line solving makes only forced deductions, so completing the
  grid *is* the uniqueness proof — no separate solution count is needed.
- **Difficulty:** the number of full sweeps the line solver needed; more
  passes means more row/column cross-referencing.
