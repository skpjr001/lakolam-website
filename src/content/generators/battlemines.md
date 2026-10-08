---
title: "Battlemines"
blurb: "Battlemines — hide the fleet so every number counts the ship segments around it"
category: puzzle
version: "1.0.0"
---
Find the hidden fleet. There are no counts along the edges, only Minesweeper numbers.

## What it is

A fleet of ships hides in the grid. The ships are drawn under the board:
one long ship, a couple of medium ones, and a few one-cell boats. Ships lie
in straight lines along the rows or columns, and no two ships touch, not
even at a corner. Some cells hold numbers. A number cell is never part of a
ship. The number counts how many ship cells are in the eight cells around
it. Exactly one fleet fits.

## How to play

Shade the cells that are ships, so that every ship under the board is in
the grid exactly once.

- A **0** means all eight cells around it are water.
- A number equal to the open cells around it means they are all ship cells.
- Ships never touch, so the cells around a finished ship are water,
  diagonals included.
- Ships never bend, so two ship cells that meet at a corner can't both be
  right.
- Keep track of the fleet. Once all the longest ships are found, a gap that
  only a long ship could fill must be water.

When nothing else works, try a cell as a ship and follow it until something
breaks. Then it must be water.

## Purpose

Battleships without the row and column totals. The whole puzzle rests on
local counts, so it reads like Minesweeper but solves like a fleet puzzle.
It sits next to `battleships` and `minesweeper` in a puzzle book and gives
the solver a third way of thinking about the same ships.

## History

Battlemines is a World Puzzle Championship genre. It appeared at the 1999
WPC in Budapest, and it has since become a staple of puzzle archives:
Otto Janko's collection alone holds about 240 of them. It joins two older
traditions, the pencil-and-paper Battleships game (Bimaru, from the 1980s)
and the Minesweeper number clue.

## This implementation

- **Spec knobs:** `difficulty` (sets the board size when `size` is null,
  and the hardest deduction the numbers may need), `size` (6–10; boards of 9
  and up carry a four-cell battleship), `cell`, `line`.
- **Generation:** the fleet is placed at random with no two ships touching
  (one of the longest length, two of the next, and so on). Every water cell
  is numbered. Numbers are then removed in random order as long as the ladder
  still settles the board up to the requested rung. The page keeps only the
  numbers that are needed.
- **Solving:** on the yes/no engine, with three rungs. **Local** covers each
  number's count and the rule that no two ship cells meet diagonally (that
  rule alone keeps ships straight and apart). **Fleet** covers the total
  number of ship cells, no run longer than the longest ship, finished ships
  counted against the fleet, and water in any cell that no remaining ship
  could cover. **Trial** assumes a cell, propagates, and keeps the opposite
  value on a contradiction.
- **Guarantees:** deterministic per seed. The fleet is legal and every
  number is its true count. The sound ladder settles every cell, which proves
  uniqueness. `obeys()` checks this again with an independent ship-placement
  count, capped at 2. That count takes the tightest unmet number, and either
  makes its first open neighbour water or covers it with exactly one ship.
  Tests check that this count agrees with the engine's own exhaustive count as
  numbers are removed, and that every printed number is needed. Rated by board
  size plus the hardest rung used (`rating_basis:
  board_size_and_hardest_rung`). Kids is a 6×6 board solved by local counting
  alone, and Expert is a 10×10 board that needs trial.
