---
title: "Plank Maze"
blurb: "Plank maze (river crossing) — pick up planks and lay them between stumps to cross the swamp in the one shortest way"
category: maze
version: "1.0.0"
---
Cross the swamp by moving the planks — one plank at a time, laid only
between stumps that are exactly the right distance apart.

## What it is

A swamp full of tree stumps lies between two banks. A few planks of
different lengths already bridge some of the stumps, but not enough to get
across. The hiker can pick up a plank and lay it somewhere new, so each
plank can be used again and again; the puzzle is to find the order of moves
that builds a way to the far bank. The page prints how many moves it takes,
and only one sequence of that many moves works.

## How to play

- The hiker starts on START, on the near bank, and must reach END on the
  far bank.
- The hiker can walk along planks from stump to stump as much as they like.
  Walking is free.
- In one move, the hiker picks up a plank at the stump they are standing
  on, then lays it down from a stump they can still walk to.
- A plank must go in a straight line, along a row or a column, between two
  stumps exactly as far apart as the plank is long. There may be no stump in
  between, and a plank may never cross another plank.
- The hiker carries one plank at a time.
- Write each move as the plank's two ends before and after, using the
  letters and numbers around the swamp — for example, "B3-B4 to B2-C2".

Get across in the number of moves printed on the page.

## Purpose

Planning with resources that move. Every plank is both the path you stand
on and the material for the next bridge, so solvers must think about where
they will be standing after each move and keep a way back to the planks they
still need. It trains step-by-step planning and the habit of working
backwards from the goal ("to reach END I need a plank of length 2 here…").

## History

Plank puzzles were made into a family of logic mazes by Andrea Gilbert,
whose clickmazes site presents dozens of "river crossing" plank puzzles
built from the same rules. ThinkFun published the idea as the single-player
game *River Crossing* (2002), with 40 challenge cards of growing difficulty,
and it is still sold today.

## This implementation

- **Spec knobs:** `difficulty` (Kids: a swamp 4 stumps wide and 3 deep, 2
  planks, 2–3 moves; Easy 5×3, 3 planks, 4–5; Medium 5×4, 3 planks, 6–7;
  Hard 5×5, 4 planks, 8–10; Expert 6×5, 4 planks, 11–14), `columns` (0 = the
  level's; otherwise 3–7), `rows` (0 = the level's; otherwise 2–6; the
  target number of moves scales with the swamp's size), `planks` (0 = the
  level's; otherwise 1–5), `colour`, `width`, `height`, `line`. Clamped
  requests are reported as `requested_<field>`.
- **Generation:** START and END go on random columns of the two banks and
  stumps are scattered over the swamp; local search then toggles stumps,
  moves planks and swaps a plank for one of another length (1 to 3),
  keeping a change when the swamp does not get worse. "Worse" counts, in
  order: no way across (then how close to the far bank the hiker gets), more
  than one shortest sequence of moves, and a length outside the level's
  band; among equal swamps, the one with more reachable positions wins.
  Swamps whose search passes 2,500 positions are set aside, and each attempt
  has a fixed budget of searched positions, so big swamps stay quick.
- **Solving:** breadth-first search over (plank positions, the stumps the
  hiker can walk to), counting shortest move sequences. A move picks up a
  plank the hiker can reach, standing at either of its ends, and lays it
  from any stump the hiker can then walk to.
- **Guarantees:** exactly one sequence of plank moves gets the hiker across
  in the printed number of moves, and none does in fewer (`unique: true`).
  Tests re-prove it with a second move generator that steps along the board
  point by point and a memoised count of every move sequence up to the
  printed length, capped at 2 (sequences are told apart by their printed
  moves); they also replay the answer by hand against the rules and check a
  plain breadth-first search finds the same length. Rated by the number of
  moves (Kids up to 3, Easy 4–5, Medium 6–7, Hard 8–10, Expert 11 or more),
  one band lower when fewer than two positions per move can be reached
  (`rating_basis: plank_moves_and_reachable_positions`); a band not reached
  is served as the nearest one, labelled with `requested_difficulty`. The key
  lists the moves and draws the swamp after each, the moved plank in red and
  its old place dashed.
