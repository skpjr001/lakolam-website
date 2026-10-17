---
title: "Car Park"
blurb: "Car Park — slide the cars along their lanes to drive the marked car out (or the 2x2 block out of the tray)"
category: puzzle
version: "1.0.0"
---
Slide the cars and lorries along their lanes until the marked car can drive
out of the exit.

## What it is

A 6×6 car park packed with cars (two squares long) and lorries (three
squares long). Each vehicle faces along its lane and can only roll forwards
or backwards. The red car X wants to leave through the gap in the right-hand
wall. A second mode is the classic sliding-block tray: a big 2×2 block, with
smaller blocks around it, must reach the opening at the bottom. Every board
can be solved, and the answer key shows a shortest solution. A sheet of
pieces to cut out comes with each board, so you can play it on the page.

## How to play

Car park: a move slides one vehicle along its own lane, as far as you like,
until it meets another vehicle or the wall. Vehicles never turn and never
jump over each other. You have won when X reaches the exit.

Sliding blocks: a move slides one block up, down, left or right, as far as
the free squares allow, in a straight line. You have won when the big block
X sits over the opening at the bottom.

Write each move as the letter, the direction and how far: the key's arrow
followed by 2 after A means "slide A two squares that way". Count your moves: the answer key gives the
fewest possible. Cutting out the pieces and placing them on the board makes
it far easier to try ideas.

## Purpose

The sliding-car puzzle is one of the best-loved one-player puzzles, in toy
shops and on phones alike, and it prints well: a board and a few cut-out
cars are all you need. The sliding-block tray is its older cousin and a
true classic of patience and planning.

## History

Sliding-block puzzles go back to the late 19th century; the tray with a big
square block is known in many countries, as Klotski in Poland and Huarong
Dao (after a story from the Three Kingdoms) in China, and was popular
across Europe and Asia in the 20th century. The car-park version was
devised by Nob Yoshigahara in the 1970s and sold widely from 1996 under the
trademark Rush Hour; unblock games for phones followed.

## This implementation

- **Spec knobs:** `mode` `unblock` (car park, default) or `klotski` (the
  sliding-block tray); `difficulty`; `pieces` (including the marked one;
  null = by band; car park 3–14, blocks 9–15 — fewer blocks means more 1×2
  blocks); `cutouts` (add the cut-out sheet as a hint-block aux page);
  `cell`, `line`.
- **Generation:** a seeded random layout (the marked car on the exit row,
  no vehicle lying across that row; for blocks, the 2×2 off the goal, two
  empty squares, the rest filled with 1×1s and 1×2s). The layout's whole
  reachable component is enumerated (`lako_statesearch::distances`) and the
  distance of every position to the nearest solved one is computed by one
  breadth-first search seeded with all solved positions (moves are
  reversible). The start is a position at a distance in the band (in its
  harder half when the layout allows; Expert is held to at most 40 moves
  past the Hard ceiling, to keep the answer printable). Random car parks rarely need more
  than about twelve moves, so for Easy and up the layout is improved by a
  local search: add, remove or replace one vehicle, and keep the change when
  the lot's hardest start gets no easier. Up to 12 layouts are tried; the
  nearest band reached is served with `requested_difficulty`. A piece count
  that never gives a solvable layout falls back to the band's own count
  (`requested_pieces`).
- **Solving:** the chosen start is solved again from scratch with
  breadth-first search (`lako_statesearch::shortest`); it must agree with the
  distance it was chosen at. Among the starts at the chosen distance, up to
  eight are checked with `count_shortest` (cap 2) and one with a single
  shortest move list is preferred; `unique_optimal` reports the count for
  the start served. Moves count one piece slid any distance in a straight
  line (`move_counting` in meta). Blocks of the same shape are
  interchangeable, so the block tray's state is its grid of shapes.
- **Guarantees:** deterministic per seed; `solvable: true`; `optimal_moves`
  is the proven optimum, rated by `rating_basis: "optimal_moves"` — car park
  Kids ≤ 4, Easy 5–9, Medium 10–15, Hard 16–24, Expert 25+; blocks Kids ≤ 8,
  Easy 9–18, Medium 19–32, Hard 33–50, Expert 51+. Measured: every band of
  both modes is served (car park Expert at 25–31 moves; blocks Expert at
  about 75–90). The move list (meta `solution`) is replayed on the printed
  pieces by the rules written out afresh. Tests re-prove every band's
  optimum with an independent breadth-first search over piece positions.
  Car-park optima are rarely unique (two independent cars can swap order),
  so `unique_optimal` is usually false there; it is often true for small
  block trays. Default generation takes about 0.2 s; Hard and Expert car
  parks up to about 1–2 s (the local search); block trays about 0.1–0.25 s.
