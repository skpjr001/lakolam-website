---
title: "Same Game"
blurb: "Same Game — remove groups of two or more same-coloured blocks, let the rest fall, and clear the whole board"
category: puzzle
version: "1.0.0"
---
Remove groups of matching blocks, let the rest fall, and clear the whole board.

## What it is

A full rectangle of coloured blocks, each also marked with its colour's
symbol (circle, square, triangle, diamond, plus, star), so the page works
in black ink and for colour-blind solvers. Rows and columns are numbered
round the edge. Every board can be cleared completely, and the answer key
shows one way.

## How to play

Choose a group: two or more blocks of the same colour joined side by side
(not corner to corner). The whole group disappears. Blocks above the gap
fall straight down, and if a column empties, the columns to its right
close up to the left. A single block with no matching neighbour cannot be
removed on its own — it has to be joined to others first.

Keep going until no block is left. If you are left with blocks that have
no partner, the board is stuck: start again and plan differently. On
paper, cross out each group and redraw the board after a few moves, or
track the falls in your head.

The key numbers every block by the move that removes it: all the blocks
marked 1 go together first, then the blocks marked 2, and so on. Blocks
with the same number may sit apart at the start — they come together as
the others fall away.

## Purpose

A planning puzzle about order: removing a group changes which blocks touch
later, so the trick is to keep each colour's last blocks able to meet. It
trains looking ahead and seeing how a picture changes as things fall.

## History

Block-removal games of this kind appeared on Japanese home computers in
the mid-1980s and spread worldwide as computer, browser and phone games
under many names. Most versions score points; this one asks the older
question of whether the board can be cleared completely.

## This implementation

- **Spec knobs:** `difficulty`; `width` 4–20 and `height` 4–14 (null = by
  band); `colours` 3–6 (null = by band); `style` `colour` (coloured blocks
  with symbols) or `ink` (symbols only); `cell`, `line`. Band boards: Kids
  6×6, 3 colours; Easy 8×8, 3; Medium 10×8, 4; Hard 12×10, 4; Expert
  15×10, 5. Clamped knobs are reported as `requested_width`,
  `requested_height`, `requested_colours`.
- **Generation:** reverse construction from the empty board. Each step
  inserts a group — runs of one to three cells in up to three neighbouring
  columns starting at a common row, runs filling columns to the top, or
  brand-new columns (with bottom runs beside them) — in a colour that
  touches none of the group's neighbours, so removing it forward removes
  exactly it and gives back the board before. Growth favours the lowest
  columns (a level skyline), refuses to leave a one-cell hole between full
  columns, backs up a few steps when stuck, and restarts if it stays stuck.
  The insertions read backwards are the clearing plan. Each candidate board
  plays 200 seeded random games (a random group each move); Kids–Medium
  keep the harder of two boards, Hard and Expert the hardest of three
  (fewest random clears), and a board every random game clears is never
  kept while more candidates are allowed. The band is read from the board:
  points for blocks (≤ 36, ≤ 64, ≤ 80, ≤ 120, more → 0–4) plus colours
  (3–6 → 0–3); 0 Kids, 1 Easy, 2–3 Medium, 4–5 Hard, 6+ Expert
  (`rating_basis: "size_colours"`), with `requested_difficulty` when an
  explicit knob moves it.
- **Solving:** the plan comes from the construction and is replayed click
  by click with the rules written out afresh before the page is returned.
  For hints the board is searched afresh by depth-first search with a memo
  of dead positions, trying first the removals that leave the fewest
  unpartnered blocks (positions with a colour down to one block are dead).
  Band boards build in 3 ms (Kids) to 60 ms (Expert); 20×14 takes
  0.2–0.5 s.
- **Guarantees:** deterministic per seed; `solvable: true` and
  `clearable: true` (proved by the replayed plan); `moves` is the plan's
  length (not a minimum — clearing, not speed, is the goal);
  `groups_at_start`, `random_clears` of `random_playouts` (how forgiving
  the board is). Meta `solution` lists the clicks as [column, row], 1-based
  from the bottom-left, at the moment of each click. Tests check every
  band's plan, re-prove small boards clearable with an independent search,
  and check the hint search against `lako_statesearch::count_solutions`
  and the independent search on random boards.
