---
title: "Link Pairs"
blurb: "Link Pairs — remove matching tiles joined by a path with at most two turns until the board is clear"
category: puzzle
version: "1.0.0"
---
Join two matching tiles with a line that turns at most twice, and they come off. Clear the board.

## What it is

A rectangle of tiles, two or four of each picture. Two tiles that match can
be removed together when you can join them with a line of at most three
straight pieces that never crosses another tile. The line may run through
squares that have already been emptied and around the outside of the board.
Every board can be cleared completely, and the answer key shows one way to
do it, step by step.

## How to play

Pick two tiles with the same picture. Imagine a line from one to the other
that runs only along rows and columns, through empty squares, and bends no
more than twice. Neighbours always link, and so do two tiles in the same
row or column with nothing between them. The empty strip around the edge
counts too, so tiles on the outside are easy to reach. When the line exists,
cross both tiles out (or take them off). Keep going until the board is empty.

On paper, draw the line lightly in pencil before you cross the tiles out.
Be careful with pictures that appear four times: pairing the wrong two can
leave the other two stuck behind tiles that need them gone first. When you
are stuck, look for a pair that frees a blocked row or column.

## Purpose

A calm visual-search puzzle: scanning for matching pictures, then planning
paths and thinking a few moves ahead about which pair to take first. The
small boards suit young children; the large ones with four of each picture
reward planning.

## History

Path-linking tile games grew out of the tile-matching solitaires of the
1980s. The Japanese game Shisen-Sho ("four rivers"), from 1989, set the rule
that a link may bend at most twice, and countless web and phone versions
followed under names such as Tile Link and pair connect.

## This implementation

- **Spec knobs:** `difficulty`; `columns` (4–16) and `rows` (2–10), null for
  the band's grid — Kids 6×4, Easy 8×5, Medium 10×6, Hard 12×7, Expert
  14×8 (an odd tile count drops one column, reported as
  `requested_columns`); `copies` (2 or 4 tiles of each picture; null = 2 for
  Kids and Easy, 4 above; with more pairs than the 34 pictures, some appear
  more often); `style` (`colour` or `ink`); `tile` (width in points).
- **Generation:** reverse placement. Starting from an empty grid, the deepest
  empty squares (with seeded noise) are filled two at a time, each pair on
  squares that are linkable on the board as it stands, so removing the
  pairs in the reverse order always works. The pictures are then shared
  out among the pairs. Up to 24 deals are tried for the requested band.
- **Solving:** because equal pictures could pair up differently from the
  placement, each deal is proved clearable again by a forward depth-first
  search with memo over boards (the shared state-search crate, 30,000
  expansions); a deal it cannot settle within that budget is redrawn, never
  guessed. Sixteen seeded random playouts measure how often careless play
  gets stuck.
- **Rating:** by the number of tiles (≤ 24 Kids, ≤ 40 Easy, ≤ 60 Medium,
  ≤ 84 Hard, more Expert), one band up when at least a quarter of the
  random playouts got stuck, and one band down when none did and at least
  half the tiles can be paired at the start (`rating_basis:
  "tiles_and_dead_end_rate"`). Meta reports `open_pairs_at_start`,
  `stuck_playouts` and `dead_end_rate`.
- **Guarantees:** deterministic per seed. `clearable: true` — proved by the
  forward search, and the answer key's removal order is replayed link by
  link before the page is returned (`answers_checked`). Boards usually have
  many clearing orders; the key shows one, with each pair's step number and
  its link drawn through the empty squares and the border.
