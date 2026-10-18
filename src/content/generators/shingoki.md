---
title: "Shingoki"
blurb: "Shingoki — one loop through every circle: straight through white, turning at black, numbers sum the straight runs"
category: puzzle
version: "1.0.0"
---
Draw one loop through every circle: straight through the white ones, turning
at the black ones, with each number adding up the two straight lines.

## What it is

A grid of dots with black and white circles on some of them. The answer is a
single closed loop drawn along the lines between neighbouring dots. It must
pass through every circle, and it may pass through plain dots too. There is
exactly one loop that fits all the circles.

## How to play

Join dots with short lines to make one loop that never crosses or touches
itself.

- **White circle:** the loop goes straight through it.
- **Black circle:** the loop turns there (a right-angle corner).
- **A number** on a circle is the total length of the two straight lines that
  leave it, counted in dot-to-dot steps up to the next corner. A black 5 might
  have a straight line of 2 going up and 3 going left; a white 4 might run 1
  step to one side and 3 to the other.

Ways in:

- A circle on the edge of the board, or in a corner, has fewer directions to
  choose from — a black circle in a corner must take both sides of the corner.
- A small number is very telling: a black 2 must turn after one step in each
  direction, so the dots next to it are corners too.
- A straight line cannot run on through a black circle (it would have to turn
  there), and cannot stop at a white circle (it goes straight on).
- The loop is one piece: never join the two ends of a piece you have drawn
  unless that finishes the whole loop.
- On harder boards, try a line one way and follow it; if it soon breaks a
  rule, it goes the other way.

## Purpose

A loop puzzle where the clues measure distance as well as direction: the
numbers turn a pleasant line-drawing puzzle into one that rewards counting and
planning ahead. A step up from Masyu in the loop family.

## History

Shingoki, also published as Semaphores, is a modern pencil puzzle best known
from the puzzle-shingoki.com site of the puzzle-\*.com family of daily
puzzle sites. Its black-turn, white-straight circles echo Masyu from the
Japanese publisher Nikoli; the numbers measuring the straight runs are its
own idea.

## This implementation

- **Spec knobs:** `difficulty`; `size` (dots per side, 5–14; 0 picks the
  band's side: Kids 6, Easy 7, Medium 8, Hard 10, Expert 12; a changed
  request is reported as `requested_size`); `numbers` (`all` — every printed
  circle shows its number, the default; `needed` — numbers are thinned too,
  leaving only those the loop needs); `cell`, `line`.
- **Generation:** answer first. A loop is drawn as the outline of a random
  region of squares (grown while its outline stays one loop, to 45–62% of the
  board), then widened by random detours — a loop edge with two free dots
  beside it bends out through them — until it passes 75–90% of the dots
  (loops that leave big empty patches let a second loop wander through them).
  Every dot the loop passes gets a circle: white where it runs straight, black
  where it turns, numbered with its two runs. Circles are then removed one at
  a time, in seed order, while the ladder capped at the requested band still
  settles every edge (with `needed`, numbers next). Eight loops are tried for
  the band.
- **Solving:** a `lako-loop` puzzle. Each circle enumerates, per direction,
  the run lengths the marks still allow (a run cannot pass through a black
  circle, cannot stop at a white one, must stop where the line turns), keeps
  the direction pairs its colour allows and — on the patterns rung — the
  length pairs that add up to its number, and marks what every choice agrees
  on. The rungs: basics (colours, dot degree), patterns (numbers), no small
  loops, inside/outside, what-if, both ways, deep what-if.
- **Guarantees:** deterministic per seed; the answer is one closed loop
  meeting every circle (checked); the ladder settles every edge from the
  printed circles alone, and every rung is a pure consequence of the rules,
  so the loop is the only one (`proof: sound_ladder_settles_every_edge`).
  Tests re-count the loops on 6×6 boards of every band with an independent
  walk over all simple loops. Rated by the hardest rung the solve needed
  (`rating_basis: hardest_rung`): colours alone → Kids, numbers → Easy, no
  small loops and inside/outside → Medium, what-if → Hard, both ways and deep
  what-if → Expert. All five bands are reached at their default sizes; a band
  a board does not reach is served as the nearest with
  `requested_difficulty`.
- **Meta:** `hardest_rung`, `rung_uses`, `size`, `white`, `black`,
  `numbered`, `loop_length`.
- **Play API** (`play`): `puzzle`, `puzzle_from`, `check` (wrong marks, lines
  missing, solved) and `hint` (a wrong mark first, else the easiest rung that
  settles an undecided edge from the player's current marks, and that edge).
