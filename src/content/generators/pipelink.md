---
title: "Pipelink"
blurb: "Pipelink — one loop through every cell that may cross itself, going straight at every crossing"
category: puzzle
version: "1.0.0"
---
One pipe through every cell of the grid — it may cross itself, but only
straight across.

## What it is

A square grid in which a few cells already show a piece of pipe: a straight,
a bend or a crossing. The task is to complete one closed pipe that runs
through the centre of every cell. Unlike most loop puzzles, the pipe is
allowed to cross itself, but at a crossing it must carry straight on in both
directions — it never turns there.

## How to play

Draw lines between the centres of neighbouring cells (up, down, left or
right, never diagonally) so that every cell is used.

- Every cell holds one piece: a straight (in one side, out the opposite
  side), a bend (in one side, out a neighbouring side), or a crossing (all
  four sides, the pipe passing straight through twice).
- A crossing can only happen in a cell with four neighbours, so never on
  the edge of the grid.
- The pieces already drawn are part of the answer and cannot be changed.
- When you follow the pipe from any point — going straight through every
  crossing — you must travel through every cell and come back to where you
  started. One single pipe: no separate loops.

Good places to start: a corner cell can only be a bend. A cell on the edge
can never be a crossing. And watch for small loops closing too early: a
pipe that closes before it has passed through every cell is wrong.

## Purpose

Pipelink turns a simple loop into something richer: because the pipe may
cross itself, the solver must keep track of which strands belong together,
not just where the lines go. It trains spatial reasoning, following a path
through a tangle, and the habit of checking that a closed loop is truly
the whole loop.

## History

Pipelink is a classic Nikoli genre, popular in Japan since the 1990s, and
Otto Janko's archive holds about 190 examples. Puzzle Weekly has published
it as a title of its own. Janko also lists a cousin, "Pipeline", where the
pipe's ends are left open.

## This implementation

- **Spec knobs:** `size` (4–10; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped and the value asked for is
  reported in meta (`requested_size`, `requested_cell`, `requested_line`).
- **Generation:** a randomised search (edges tried in random order) finds
  any valid pipe, which is then scrambled by random square toggles — the
  four edges between a 2×2 block of cells switched on or off — kept while
  every cell stays a straight, bend or crossing, the pipe stays one strand,
  and the crossings stay within a random budget. Every piece starts shown;
  pieces are hidden in random order while the deduction ladder still
  settles every edge at the band's rung.
- **Solving:** a ladder on yes/no variables, one per edge between cells.
  *Local*: every cell has exactly two pipe ends, or four. *Loop*: pipe ends
  are joined through cells whose joins are certain (two opposite ends
  always run straight on; a bend is certain once the cell cannot be a
  crossing); a strand that closes must hold every pipe end placed and touch
  every cell — and each undecided edge is tested both ways against that.
  *Trial*: assume an edge, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one pipe, proven because
  the sound ladder settles every edge (`uniqueness_proof`), confirmed by a
  capped exhaustive count when cheap (`count_confirmed`), and re-proven in
  tests by an independent count over the edges that traces each finished
  pipe straight through its crossings. Rated by the hardest rung needed
  with size as the tie-break (local: Kids up to 5×5, else Easy; loop: Easy
  up to 6×6, else Medium; trial: Hard up to 7×7, else Expert). Every band is
  reached at its default size. With a custom `size` the label states the
  band actually reached and `requested_difficulty` records the request:
  Kids from 6×6 up is Easy, Medium at 4×4 to 6×6 is Easy, Expert up to 7×7
  is Hard, Hard from 8×8 up is Expert, and on the smallest boards Hard and
  Expert sometimes come out Easy.
