---
title: "Tilt Maze"
blurb: "Tilt maze — every marble rolls with each tilt and they stop one another; drop the gold marble in the hole in the one shortest way"
category: maze
version: "1.0.0"
---
Tilt the tray and every marble rolls at once — get the gold one into the
hole and keep the blue ones out.

## What it is

A square tray with blocks, one hole, a gold marble and one to three blue
marbles. You cannot move a marble on its own: each tilt sends all of them
rolling the same way, and they stop against the walls, the blocks and each
other. The blue marbles are both a danger, since they must never fall in,
and a tool, since a blue marble is often the only thing that can stop the
gold one in the right square. The page prints how many tilts the answer
takes, and only one sequence of tilts that long works.

## How to play

- Tilt the tray up, down, left or right. Every marble rolls that way until
  it hits the wall, a block or another marble.
- A marble that rolls over the hole drops in.
- Drop the gold marble (the one with the star) into the hole in the number
  of tilts printed on the page.
- Never let a blue marble drop in — not even on the last tilt.
- Write an arrow in each box for your tilts, in order.

When the page is printed in black and white, the gold marble is white with
a star and the blue marbles are grey.

## Purpose

Thinking about many moving parts at once. Each tilt is a single simple
choice, but it moves every marble, so the solver has to picture where all of
them will end up and use one marble as a stop for another. It trains
look-ahead and working memory in the way sliding-block and robot puzzles
do, on a page small enough to solve with a pencil.

## History

Tilt mazes are one of the families of logic maze collected by Andrea
Gilbert on her clickmazes site, alongside Robert Abbott's multi-state
mazes. The idea goes back to hand-held tilting puzzles with rolling balls,
and ThinkFun's *Tilt* game (a tray of sliders tilted towards a centre hole,
with 40 challenge cards) brought the "everything moves together" rule to a
table-top puzzle.

## This implementation

- **Spec knobs:** `difficulty` (Kids 5×5 tray, 2 marbles, 3–4 tilts; Easy
  6×6, 2 marbles, 5–6; Medium 6×6, 3 marbles, 6–8; Hard 7×7, 3 marbles,
  8–10; Expert 8×8, 3 marbles, 10–13), `size` (0 = the level's; otherwise
  5–9; the target number of tilts scales with it), `marbles` (gold one
  included; 0 = the level's, otherwise 2–4), `colour`, `width`, `height`,
  `line`. Clamped requests are reported as `requested_<field>`.
- **Generation:** the hole goes on an inner square and the marbles on random
  squares; blocks are scattered and then toggled one at a time by local
  search, keeping a change when it does not make the tray worse. "Worse"
  counts, in order: no solution (then the gold marble's closest approach to
  the hole), more than one shortest tilt sequence, a length outside the
  level's band, and a route on which no marble is ever stopped by another
  marble (so the blue marbles always matter); among equal trays, the one
  with more reachable positions wins. Up to 16 trays are tried in search
  of the requested band.
- **Solving:** breadth-first search over marble positions (the gold marble
  and the set of blue ones), counting shortest tilt sequences, capped. A
  tilt that moves nothing is not a move; a tilt that drops a blue marble is
  never taken.
- **Guarantees:** exactly one tilt sequence drops the gold marble in the
  printed number of tilts, and none does in fewer (`unique: true`). Tests
  re-prove it with a second simulation — marbles stepped one square at a
  time until nothing moves — and a memoised count of every tilt sequence up
  to the printed length, capped at 2; they check the two simulations agree
  on hundreds of random trays and that a plain breadth-first search finds
  the same length. Rated by the number of tilts (Kids up to 4, Easy 5–6,
  Medium 7–8, Hard 9–10, Expert 11 or more), one band lower when fewer than
  three positions per tilt can be reached (`rating_basis:
  tilts_and_reachable_positions`); a band not reached is served as the
  nearest one, labelled honestly with `requested_difficulty`. The key lists
  the tilts and draws the tray after each one.
