---
title: "Turn Maze"
blurb: "Turn maze — one path through every square turning right at R and left at L, or a street maze driven with no left (or right) turns"
category: maze
version: "1.0.0"
---
One path, every square, and a letter in some squares telling you which way
to turn — or a street map where you may never turn left.

## What it is

Two kinds of maze where the rule is about turning, judged from the way you
are travelling.

The **marked turn maze** is a grid with a start dot, a chequered finish and a
few blocked squares. Your path must pass through every open square exactly
once. Some squares hold an R or an L: the path must turn right or left there.
Because right and left depend on which side you come in from, the same R
sends you different ways depending on your route, and that is the puzzle.

The **no-left-turn maze** is a street map with walls. You drive in at START
and out at GOAL and you may never turn left or turn round, only go straight
on or turn right. To go left you have to loop round a block with three right
turns, so the shortest way often passes some squares twice. The **no-right-
turn** maze is the mirror image.

## How to play

Marked turn maze:

- Start at the dot and draw one path to the chequered finish, moving up,
  down, left or right from square to square.
- The path must pass through every white square exactly once. Grey squares
  are blocked.
- In a square marked R the path turns right; in a square marked L it turns
  left. Imagine walking the path: right and left are your right and left as
  you walk into the square.
- In a blank square the path may go straight on or turn either way.

No-left-turn (or no-right-turn) maze:

- Drive in at START, following the arrow, and drive out at GOAL.
- Move from square to square along the streets; you cannot pass through a
  wall.
- You may go straight on or turn right, but never turn left and never turn
  round. (In the no-right-turn maze, the other way about.)
- You may pass through a square more than once. The page tells you how many
  steps the shortest way takes: find that way.

## Purpose

Left and right relative to a moving traveller, not to the page, is a skill
that trips up children and adults alike; these mazes make it the whole
point. The marked maze adds planning — a path through every square — and
rewards the strategies taught for it: start in corners and next to blocked
squares, where the path has few choices. The street maze trains looking
ahead: a left you need has to be planned as a loop several squares early.

## History

The marked turn maze is the "Turn Mazes" chapter of Beast Academy *Puzzles
1* (Art of Problem Solving), a US maths-enrichment curriculum, which pairs
the puzzles with strategy pages. No-left-turn mazes are older: the first
known one, by Bob Stanton, appeared in *Games* magazine in 1989, and Andrea
Gilbert's clickmazes collection has a family of them. Walk-through
"no left turn" hay and hedge mazes use the same rule.

## This implementation

- **Spec knobs:** `mode` (`marked`, `noleft`, `noright`), `difficulty`,
  `size` (grid side, 0 = the level's, otherwise 4–9), `width`, `height`,
  `line`. Marked levels: Kids 4×4, Easy 5×5, Medium 6×6, Hard 7×7, Expert
  8×8, each with side − 3 blocked squares. Street levels use the same grids
  with a shortest route of 6–10, 10–15, 14–22, 20–30 and 26–40 steps that
  loops round a block (passes a square again) 0, 1, 1, 2 and 3 times; with
  `size` set, the step band scales with the area. Clamped requests are
  reported as `requested_<field>`.
- **Generation (marked):** a boustrophedon path through the whole grid is
  scrambled by backbite moves into a random Hamiltonian path; blocked
  squares are made by cutting squares off one end of it (more backbites in
  between), so the path still covers every open square. Every turn is
  marked, and the marks are then removed one at a time, in random order,
  whenever the maze still has exactly one answer without it — the page
  keeps only marks that are needed.
- **Generation (street):** START and GOAL on the rim, on different sides;
  walls are scattered and toggled one at a time by local search, keeping a
  change when it does not make the maze worse: no route (then GOAL's
  closest approach), more than one shortest route, a length outside the
  band, too few loops; among equal mazes, the one with more reachable
  (square, heading) states wins.
- **Solving:** marked — an exhaustive depth-first count of paths, capped at
  two, with bitboard pruning (no dead-end squares, the unvisited squares
  connected, every unvisited R/L still able to turn); a count that runs out
  of its node budget is treated as ambiguous. Street — breadth-first search
  over (square, heading), counting shortest routes.
- **Guarantees:** marked — exactly one path visits every open square once
  and obeys every mark, and every mark on the page is needed. Street —
  exactly one legal route reaches GOAL in the printed number of steps, and
  none in fewer (`unique: true`). Tests re-prove the marked maze with a
  separate plain depth-first count (no bitboards, no look-ahead), check the
  two counts agree on hundreds of random grids with unique, several and no
  answers, and recheck every turn with cross products; street mazes are
  re-proved with a distance-to-exit table built by fixpoint iteration and a
  capped count of routes within the printed length, and every turn is
  rechecked. Marked mazes are rated by open squares (Kids up to 15, Easy
  16–24, Medium 25–35, Hard 36–48, Expert 49+; `rating_basis:
  open_squares`); street mazes by route steps (Kids up to 10, Easy 11–15,
  Medium 16–22, Hard 23–30, Expert 31+) capped by the loops it needs (none:
  Easy at most, one: Medium, two: Hard; `rating_basis:
  route_steps_and_loops`). A band not reached is served as the nearest,
  labelled honestly with `requested_difficulty`; occasionally a street seed
  serves Expert as Hard.
