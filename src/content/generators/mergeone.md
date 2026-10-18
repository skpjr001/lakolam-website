---
title: "Merge to One"
blurb: "Merge to One — slide numbered tiles so equal numbers merge, until a single tile is left"
category: puzzle
version: "1.0.0"
---
Push the numbered tiles together — two equal numbers join into one — until a
single tile is left.

## What it is

A small square board, lettered across and numbered down, with a few brick
walls and some numbered tiles. Every board is made so that all its tiles can
be merged into one, and the page names that last number and the fewest
moves it can be done in. Nothing new ever appears on the board: it is a pure
planning puzzle, and the answer key shows a shortest solution step by step.

## How to play

A move pushes one tile up, down, left or right. It slides in a straight line
over empty squares and stops when it meets a wall, the edge of the board or
another tile. If the tile it runs into shows the same number, the two merge
into one tile with the next number up (two 3s make a 4) on the square of the
tile that was hit. A tile next to an equal tile can merge with it straight
away. A push that would not move anything does not count.

Keep merging until only one tile is left — it will be the goal number on the
page. Try to do it in the fewest moves; the page tells you the best
possible. In the tilt version, every tile slides at once in the direction
you choose, and two equal tiles that meet merge (each tile merges at most
once per tilt). In the doubles version the numbers double instead: two 8s
make 16.

The answer key draws each move as a small board with the tile to push
outlined and an arrow, captioned like "B3 RIGHT" (the tile on square B3,
pushed right).

## Purpose

Merging puzzles are hugely popular as phone games, but most add random new
tiles; this one has none, so every board is a fixed puzzle with a best
answer you can find by thinking ahead. Walls and the "slide until stopped"
rule make positioning the tiles the real challenge.

## History

Sliding-tile merge games boomed in 2014 and spawned many variants: halving,
summing, levels, and fixed puzzle boards with no random tiles at all. The
slide-until-stopped movement is older still, from ice-sliding puzzles in
video games of the 1980s and 1990s. This version is our own, with proven
fewest-move answers.

## This implementation

- **Spec knobs:** `difficulty`; `rules` `push` (one tile, default) or `tilt`
  (the whole board); `merge` `level` (3 + 3 → 4, default) or `double`
  (8 + 8 → 16, the same puzzle written in powers of two); `size` 3–6
  (null = by band: Kids 4, Easy 4, Medium 5, Hard 5, Expert 6); `tiles` 2–10
  (null = Kids 3, Easy 4, Medium 5, Hard 7, Expert 9); `walls` 0–12 (null =
  Kids 1, Easy 2, Medium 3, Hard 3, Expert 5); `target` 2–10, the level of
  the last tile (null = the least the tiles allow plus 0–2; raised when too
  small, reported as `requested_target`); `style` `colour` or `ink`;
  `cell`, `line`. Counts that do not fit the board are clamped and reported
  as `requested_<field>`.
- **Generation:** the target tile is split at random (a level-v tile into
  two of level v − 1) until there are enough tiles, so the tiles always add
  up to exactly one target tile; walls and tiles are scattered over the
  board. Each board is solved and up to 80 are tried for the requested band;
  once 8 searches have failed (an unsolvable board, or the budget ran out)
  and some board is in hand, the nearest band is served with
  `requested_difficulty`.
- **Solving:** A* (`lako_statesearch::shortest_astar`) over packed boards
  (four bits a cell). A push merges at most one pair, so tiles − 1 is an
  admissible bound; a tilt merges each tile at most once, so the tile count
  at best halves per tilt (bound ⌈log₂ tiles⌉). The node budget is 250,000
  per board; an unproved board is discarded, never guessed. The board
  chosen then gets a capped breadth-first count of shortest solutions
  (`count_shortest`, 200,000 nodes): `unique_optimal: true` is reported only
  when that proves the shortest solution unique, which is rare — merges
  that do not touch can be made in either order.
- **Bands:** by the proven fewest moves. Push: Kids ≤ 3, Easy 4–6, Medium
  7–9, Hard 10–12, Expert 13+. Tilt: Kids ≤ 2, Easy 3–4, Medium 5–6, Hard
  7–8, Expert 9+. Defaults take a few to 40 ms; push Expert (6×6, nine
  tiles) about 0.4–2 s.
- **Guarantees:** deterministic per seed; `solvable: true`; `optimal_moves`
  proven (`rating_basis: "optimal_moves"`); `target` is the printed last
  number; `solution` lists the moves as printed. The answer is replayed by
  the rules written out afresh on a plain grid before the page is returned;
  tests re-prove the optimum with an independent breadth-first search (tilt,
  and push up to Medium) and an independent iterative-deepening search (push
  Hard and Expert).
