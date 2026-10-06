---
title: "Lighthouses"
blurb: "Lighthouses — place ships so each lighthouse counts the ships in its row and column"
category: puzzle
version: "1.0.0"
---
Find the ships at sea — each lighthouse counts the ships in its row and
column.

## What it is

A grid of open sea with numbered lighthouses. Hidden in the grid are ships,
each filling a single cell. Every lighthouse's number tells how many ships
lie in its row and its column together, and every ship can be seen by at
least one lighthouse.

## How to play

Mark the ships so that:

- each lighthouse's number equals the ships in its row plus the ships in its
  column;
- ships never touch each other or a lighthouse, not even at a corner;
- every ship lies in the same row or column as at least one lighthouse.

Begin by crossing out the water you can be sure of: the eight cells around
every lighthouse, cells no lighthouse can see, and every cell a 0 can see.
A lighthouse whose number is already reached sees no more ships; one that
needs every open cell it can see gets them all. Remember that ships in a
straight run of open cells must leave gaps: three open cells in a row hold
at most two ships, and only in the end cells.

## Purpose

A counting puzzle in the family of Battleships and Tents, with a crossing
twist — each clue covers a row and a column at once, so clues interact
everywhere. It is quick to learn and scales from a few lighthouses to dense
harbours.

## History

Lighthouses is a pencil-puzzle genre of the Battleships family, found in
puzzle-competition sets and online puzzle collections. It keeps the
classic no-touching fleet but moves the counts from the edges of the grid
onto the lighthouses inside it.

## This implementation

- **Spec knobs:** `size` (5–12; 0 picks from the difficulty — 6, 7, 8, 9, 10
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** about one cell in nine becomes a ship, none touching.
  Lighthouses are added on clear water (no ship on or around the cell) until
  the ladder settles every cell at the requested rung, then removed one at a
  time while it still does and every ship is still seen.
- **Solving:** a ladder on yes/no cells — *local* (a lighthouse's count is
  met, or needs every open cell; a ship clears its neighbours), *packing*
  (a run of open cells along a line holds at most every other cell, so a
  count can force ships into a tight run), and *trial* (assume a cell,
  propagate, keep the opposite on a contradiction).
- **Guarantees:** deterministic per seed; exactly one fleet, proven because
  the sound ladder settles every cell, confirmed by a capped exhaustive
  count, and re-proven in tests by an independent backtracking count. Rated
  by the hardest rung needed (local: Kids up to 6×6, else Easy; packing:
  Medium; trial: Hard up to 9×9, else Expert). If a band is not reached in
  40 attempts the nearest band found is returned and labelled as such.
