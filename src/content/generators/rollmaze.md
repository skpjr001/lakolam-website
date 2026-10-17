---
title: "Rolling Die Maze"
blurb: "Rolling-die maze — tip a die (or a 1x1x2 block) square by square to GOAL, minding which face is up"
category: maze
version: "1.1.0"
---
Tip a die from square to square — but which face is up decides where you may
go. Cut out the die, fold it, and roll your way to GOAL.

## What it is

A board of squares and a die that moves by tipping over one of its edges.
Every roll changes which number is on top, so the same square can be fine
one moment and forbidden the next. The page says how many rolls the trip
takes, and there is exactly one way to do it in that many.

There are three kinds of board:

- **Forbidden faces:** grey squares may never have the 6 on top, and black
  squares are holes. Finish on GOAL with the 6 showing.
- **Matching numbers:** every square has a number, and the die may only be
  tipped onto a square if the face that lands on it — the bottom — shows
  that number.
- **Rolling block:** instead of a die, a block two squares long. Standing up,
  it falls flat across two squares; lying down, it rolls sideways or stands
  back up. Stand it upright on GOAL. Block boards can add **cracked
  squares**, where the block may lie but never stand, and a **switch and
  bridge**: the bridge starts missing and appears or vanishes each time the
  block lands on the switch.

## How to play

Cut out the net, fold it into a die (or a block) and tape it. Put it on START
with the 1 on top and the 2 facing the top of the page (the block stands
upright).

Each move, tip it over one of its bottom edges onto the next square — up,
down, left or right on the page. It can never go off the board or onto a
black hole.

- **Forbidden faces:** never stop on a grey square with the 6 on top. End on
  GOAL with the 6 on top.
- **Matching numbers:** you may only tip onto a square if the face landing on
  it shows the square's number. (Opposite faces of a die add up to 7, so
  that is the number on top subtracted from 7.)
- **Rolling block:** no part of the block may ever hang over a hole or off
  the board. End standing up on GOAL. On a cracked (orange) square the block
  may lie down but never stand up. Striped squares are a bridge that starts
  missing, like a hole; every time any part of the block lands on the round
  switch, the bridge appears (or vanishes again).

Reach GOAL in the number of moves printed on the page.

## Purpose

Spatial reasoning you can hold in your hand. Keeping track of six faces
through a sequence of rolls is hard to do in the head; with the folded die
on the board, children and adults alike can test ideas, then learn to
predict them — which face comes up when you roll north twice, or east then
south. The block teaches that the same move can cover one square or two.

## History

Rolling-cube puzzles — a cube tumbled across a board so that a marked face
ends up in the right place — were a favourite of Martin Gardner's
*Mathematical Games* column. Robert Abbott turned the idea into mazes,
publishing rolling-die mazes in *SuperMazes* (1997) and on his Logic Mazes
website, where squares restrict which face may be up. The 1×1×2 rolling
block became famous through the Flash game *Bloxorz* (Damien Clarke, 2007).

## This implementation

- **Spec knobs:** `difficulty` (Kids 4×4 with a 4–6 move route, Easy 5×5
  7–10, Medium 6×6 11–14, Hard 7×7 15–19, Expert 8×8 20–26), `mode`
  (`forbidden`, `match`, `block`), `size` (0 = the level's; otherwise 4–10,
  with the move band scaled), `fragile` and `switches` (block mode only,
  both off by default; the die modes ignore them), `net` (print the net),
  `width`, `height`, `line`.
- **Generation:** START and GOAL are placed well apart and the board is
  filled at random (forbidden: holes, greys and plain squares; match:
  numbers, with a random legal roll from START printed onto the squares it
  enters so the board starts solvable; block: holes, and cracked squares
  with `fragile`; with `switches` a switch and a one- or two-square bridge
  are placed apart from START, GOAL and each other). Local search then
  changes one square at a time, keeping a change when the score does not get
  worse: no route at all is worst, then more than one shortest route or a
  length outside the band; ties go to boards where more positions can be
  reached — the wrong turns. With the block options on, a board also has to
  make them matter: the one route must cross the bridge (so it must press
  the switch first), and lifting the cracked-square rule must give a
  shorter route or a second one. The options draw from the seed only when
  switched on, so plain boards are unchanged.
- **Solving:** breadth-first search over positions — a square and one of the
  die's 24 orientations, or a square and how the block lies (standing, across,
  down) and, with a switch, whether the bridge is down — counting shortest routes into every finishing position (with the
  6 on top there are four orientations that finish).
- **Guarantees:** exactly one route reaches GOAL in the printed number of
  moves, and none in fewer (`unique: true`). Tests re-prove it without the
  generator's search — a distance-to-goal table by fixpoint iteration over
  every position, then a depth-first count within the budget, capped at 2 —
  re-prove block boards (plain, cracked squares, switches) with a second
  model that tips the block by geometry — the squares its cubes cover —
  over (cubes, bridge) states, replay die routes with the faces tracked by hand against every square's
  rule, check the block never covers a hole, and check the 24 orientations
  and roll rules (opposite faces sum to 7, four rolls one way come back).
  Rated by route length (`rating_basis: route_moves`); a board that misses
  its band is returned at its honest rating. The key traces the route and
  lists every roll with the number on top after it (for the block, `*` when
  it stands up and `+` when it lands on the switch). Meta: `solvable`,
  `optimal_moves`, `unique_optimal`, and with the options `fragile_squares`,
  `switch_presses`, `bridge_crossed`.

  A split block (two cubes moving separately) is not offered: its state
  space and rules are a different puzzle from the one this page prints.
