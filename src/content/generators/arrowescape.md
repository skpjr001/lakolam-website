---
title: "Arrow Escape"
blurb: "Arrow escape — tap each arrow off the board in the one order that works"
category: puzzle
version: "1.0.0"
---
Tap the arrows off the board — but only one can go at a time.

## What it is

A grid holds arrows (or long blocks with arrows on them). Each one can only
slide off the board in the direction it points, and only when nothing
stands anywhere in its way between it and the edge. Clear the board. The
puzzle is to number the pieces in the order they leave: on the standard
page exactly one piece is free at every step, so there is only one order.

## How to play

Find the piece with a clear run to the edge — there is just one — and
write 1 on it. Imagine it gone: now exactly one more piece has a clear run;
that is 2. Carry on until every piece is numbered. A piece is blocked by
anything in its line, however far away, so check the whole row or column
in front of each arrow. On a packed "free" board several pieces may be free
at once, and any order that clears the board is right.

## Purpose

A paper version of a hugely popular tap-to-clear phone game. It trains
careful scanning and thinking one step ahead, and the single forced order
makes it easy to check. The long-block option gives it the feel of a
sliding-block jam.

## History

Exit-the-board puzzles grew out of the sliding-block tradition of the
1970s and 80s; the tap-away form, where pieces fly off in their own
direction, became a mobile hit in the 2020s under many names.

## This implementation

- **Spec knobs:** `order` (`unique` or `free`), `pieces` (`arrows`, one
  cell, or `long`, blocks of 2–3 cells sliding along their length),
  `difficulty`, `size` (4–12; 0 picks by band).
- **Generation:** pieces are placed in reverse of the order they leave.
  Each new piece must have a clear run to the edge past every piece already
  down, so a piece is only ever blocked by pieces placed after it — which
  leave before it — and the board can always be cleared. For `unique`,
  each new piece must also stand in the run of the piece placed just
  before; then exactly one piece is free at every step. A depth-first
  search with a node budget, preferring pieces with long clear runs, grows
  this chain to the band's length (up to 60 seeded tries). `free` grows a
  chain to set the depth and then packs the board with any piece whose run
  is clear.
- **Solving:** removal as a state space (the set of pieces left), counted
  by the shared state-search crate's memoised depth-first count: the number
  of valid orders, capped at 1000.
- **Guarantees:** deterministic per seed; the key's order is replayed
  before the page is returned (`solvable`, `answers_checked`). In `unique`
  mode the count is exactly 1 (`unique`, `unique_optimal`; generation fails
  rather than print otherwise) and the page is rated by its pieces — every
  one is in the forced chain: kids ≤ 6, easy 7–12, medium 13–20, hard
  21–30, expert 31+. In `free` mode `valid_orders` gives the count and the
  page is rated by the longest chain of pieces that must leave one after
  another (`longest_chain`): kids ≤ 3, easy 4–5, medium 6–8, hard 9–12,
  expert 13+. Long blocks reach an expert chain (on a 12×12) on most seeds
  only; otherwise the nearest band is served and recorded as
  `requested_difficulty`, and a clamped size as `requested_size`. The tests
  rebuild the blocking by sliding each piece cell by cell and re-count the
  orders with their own search.
