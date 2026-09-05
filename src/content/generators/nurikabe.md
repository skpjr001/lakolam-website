---
title: "Nurikabe"
blurb: "Shade a connected wall around numbered islands, with no 2x2 block shaded"
category: puzzle
version: "1.0.0"
---
Shade a connected wall around numbered islands: each number is an island of
exactly that many white cells.

## What it is

A grid with some numbered cells. Cells are shaded ("wall") or left white
("islands"). Every island contains exactly one number and exactly that many
cells; islands may not touch each other orthogonally; the wall is a single
connected mass; and no 2×2 block is entirely wall.

## How to play

A "1" is a complete island — shade all four neighbours. Two numbers that are
diagonal neighbours pinch the cell between them. Grow islands only where their
number still allows; every cell that no island could reach must be wall. Use
the 2×2 rule constantly: three shaded cells in a square force the fourth
white. The wall's connectivity settles the endgame.

## Purpose

The classic shading puzzle, and the workspace's reference for answer-first
generation with **repair**: an invalid layout is nudged legal (join split
walls, break courtyards) rather than resampled. Its island enumeration drove
the shared `lako-grid::polyomino` module.

## History

Nikoli, 1991. Named for the *nurikabe* of Japanese folklore — an invisible
wall-spirit that blocks travellers at night. The puzzle is also published as
Cell Structure and Islands in the Stream.

## This implementation

- **Spec knobs:** `rows`, `cols`, `max_island`, `island_share`, `difficulty`.
- **Generation:** answer first — islands are grown, the rest becomes wall, a
  repair pass fixes split walls and 2×2 courtyards, one number per island is
  read off the layout, and the search proves the numbers admit exactly one
  shading. The solver enumerates each number's possible island as a polyomino
  rather than shading cell by cell.
- **Guarantees:** `count_answers(2) == 1`, with the generated layout checked
  against all four rules *before* the search runs, so a construction bug
  cannot hide behind a solver bug.
- **A lesson recorded:** the polyomino enumeration's obvious pruning bound was
  unsound and silently lost 3 of the 18 three-cell shapes; it was caught only
  because the shape counts (1, 4, 18, 76, 315) are pinned in a test. The
  boards are capped at 128 cells so shapes fit a `u128` and overlap tests are
  single instructions.
