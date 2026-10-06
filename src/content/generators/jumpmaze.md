---
title: "Jump Maze"
blurb: "Jump maze — move exactly the number on your square and land on GOAL (Alice mode: stride changers)"
category: maze
version: "1.1.0"
---
A grid of numbers with no walls at all: jump exactly the number you stand on
and find the one way to land on GOAL.

## What it is

A maze made of numbers. Each square tells you how far to jump from it, in a
straight line, so the corridors are invisible — you discover them by
counting. There is exactly one way from START to GOAL, and the grid is full
of tempting jumps that lead into corners you can never leave.

In the **Alice** version the squares carry arrows instead of numbers, and
you carry a stride: some squares say `+1` or `–1` and change how far every
later jump goes.

## How to play

Start on the square marked START, in the top left corner.

- **Numbers:** look at the number on your square and move exactly that many
  squares in a straight line — up, down, left or right (on the harder levels
  diagonally too). Jump over the squares in between; only the square you land
  on counts. Then do it again from the new square.
- **Alice:** your stride starts at 1. Move exactly your stride in the
  direction of one of the arrows on your square. When you land on a `+1`
  square your stride grows by one for the rest of the way; a `–1` square
  shrinks it by one (it never goes below 1).

You must land exactly on GOAL — jumping past it does not count. Tip: work
backwards too. Which squares could possibly jump onto GOAL?

## Purpose

Counting, direction and planning ahead in one small grid. The young solver
practises counting squares; the older one learns to search — to notice that
most squares lead to traps and to reason backwards from the goal. The Alice
version adds a quantity that changes as you go, a first taste of thinking in
*states* rather than places.

## History

Number-jump mazes appear in puzzle books under many names ("jumping mazes",
"number mazes"); Robert Abbott's *Mad Mazes* (1990) and his Logic Mazes
website made the genre famous, including the *Alice mazes* in which, as in
Lewis Carroll's story, you grow and shrink — his arrows marked how the size
of each move changes.

## This implementation

- **Spec knobs:** `difficulty` (Kids 5×5 jumps 1–3, Easy 6×6 1–4, Medium
  7×7 1–5, Hard 8×8 1–6 with diagonal moves, Expert 9×9 1–6 diagonal and the
  longest route), `mode` (`numbers` — the default — or `alice`), `size` (0 =
  the level's; otherwise 4–12), `diagonal` (unset = the level decides),
  `width`, `height`, `line`.
- **Generation:** a random fill improved by local search. Each candidate is
  analysed with a breadth-first search over *states* (the square, plus the
  stride in Alice mode): what is reachable from START, which of those states
  can still reach GOAL, and the shortest distance. A mutation (one square's
  number, or an Alice square's arrows or `±1` mark) is kept when it does not
  make things worse. The search aims for the states that lie on any route to
  GOAL being exactly the states of one shortest route, with the route length
  in the level's band, and then keeps polishing to make as much of the grid
  reachable as possible — the wrong turns are the puzzle.
- **Solving:** if the states that can lie on a START-to-GOAL route number
  exactly the shortest distance plus one, each distance layer holds one of
  them, so the shortest route is unique and no jump can skip ahead along it;
  every other jump from the route leads into a region from which GOAL can
  never be reached. A jump back along the route only makes a loop.
- **Guarantees:** exactly one route from START to GOAL that never repeats a
  position (`unique: true`), re-proved in tests without the generator's
  search — co-reachability by fixpoint iteration over every state, then a
  depth-first count of simple routes capped at 2 — and the route is replayed
  square by square from the printed numbers and arrows. Rated by route
  length, stepped down a band when few states are reachable
  (`rating_basis: route_length_and_reachable_states`); if a level's band is
  missed, the nearest legal maze is returned with its honest rating. The key
  draws every jump as a numbered red arrow.
- **Version 1.1 — every size generates:** short jumps on a large grid
  (Kids and Easy at 10–12, Kids with diagonals from 8) sometimes left no
  attempt with a single route, and the maze failed outright. Only that
  failure path changed: when all twelve original attempts produce nothing,
  the longest jump is raised one step at a time (up to the grid side less
  one), twelve fresh attempts each, until one route is carved; it is checked
  and rated exactly as before, so a longer route earns its honest band.
  Every maze that generated before is byte-identical.

