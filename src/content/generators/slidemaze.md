---
title: "Ice Maze"
blurb: "Ice maze — slide until a rock stops you and come to rest exactly on GOAL"
category: maze
version: "1.0.0"
---
The floor is ice: once you set off you cannot stop until a rock gets in the
way. Find the one way to come to rest on GOAL in the moves allowed.

## What it is

A grid of slippery squares scattered with rocks. There are no corridors —
the rocks and the outer wall are the only things that can stop you, so the
places you can actually stand are few, and the route between them is hidden
in plain sight. The page tells you how many moves the trip takes, and there
is exactly one way to do it in that many.

A variant adds lettered squares, A, B, C…, that you must stop on, in order,
before heading for GOAL.

## How to play

Start on START. Each move, choose up, down, left or right and slide: you keep
going in that direction until the next square is a rock or the wall. Then you
may choose a new direction.

- You must **stop** on GOAL. Sliding over it does not count.
- Reach GOAL in the number of moves printed on the page.
- If there are letters, stop on A, then B, then C (and so on) before you
  finish on GOAL. Sliding over a letter does not count either.

Tip: look for the squares from which a slide would end on GOAL — there are
only a few — and work backwards to them.

## Purpose

Planning with an unusual rule of motion. The solver cannot step one square at
a time, so every move has to be pictured to its end; the reward is learning to
think in "where can I stop?" rather than "where can I go?". It is good
spatial reasoning practice for children and a satisfying search for adults.

## History

Sliding-block and ice-floor puzzles are a video-game staple — the ice caves
of *The Legend of Zelda* and the Ice Path and gym floors of *Pokémon* made
them famous — and the same idea appears on paper as "ice mazes" and in
robot-motion puzzles such as Alex Randolph's board game *Ricochet Robots*
(1999), where pieces likewise move until they hit something.

## This implementation

- **Spec knobs:** `difficulty` (Kids 6×6 with a 3–4 move route, Easy 8×8
  5–7, Medium 10×10 8–10, Hard 12×12 11–14, Expert 14×14 15–20),
  `waypoints` (0–4 lettered squares to stop on in order), `size` (0 = the
  level's; otherwise 5–18), `width`, `height`, `line`.
- **Generation:** START, GOAL and any letters are placed well apart, rocks are
  sprinkled at 12–16 %, then local search toggles one square at a time
  between ice and rock. Each candidate gets a breadth-first search over
  stopping places (and, with letters, how many are done), counting shortest
  routes to GOAL. A toggle is kept when it does not make things worse; the
  search aims for exactly one shortest route with its length in the level's
  band, then keeps going to make as many stopping places reachable as
  possible — the wrong turns.
- **Solving:** the solver's search is over stopping squares; because the
  printed move count is the shortest possible, a route of that many moves is
  a shortest route, and there is exactly one.
- **Guarantees:** exactly one route reaches GOAL (with every letter done, in
  order) in the printed number of moves, and none in fewer (`unique: true`).
  Tests re-prove it without the generator's search — a distance-to-goal table
  by fixpoint iteration over every state, then a depth-first count of routes
  within the budget, capped at 2 — and replay every slide square by square to
  check it passes no rock and really stops where it says. Rated by the number
  of moves, stepped down a band when few stopping places are reachable
  (`rating_basis: route_moves_and_reachable_stops`); letters lengthen the
  route, so a lettered maze often rates a band above the level asked for, and
  if a band is missed the nearest legal maze is returned with its honest
  rating. The key draws the route in red and numbers every stop.
