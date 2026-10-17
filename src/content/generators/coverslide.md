---
title: "Cover-All Slide"
blurb: "Cover-all slide — slide until something stops you, your trail becomes a wall; fill every square by the one route"
category: puzzle
version: "1.0.0"
---
Shoot off in a straight line and don't stop until you hit something — then
fill the whole room with your own long body.

## What it is

A walled room of white squares with a head on one of them. The head moves
like a sliding puzzle piece that cannot brake: once it sets off it keeps
going until the next square is a wall or part of its own body, and its body
stretches out behind it and stays there. The aim is to fill every white
square. Each room has exactly one route that does it.

## How to play

The head starts on its square. Pick a direction — up, down, left or right —
and slide: the head keeps going until the very next square is a wall, the
edge of the room or a square its body already fills. Every square it passes
is now filled. Then slide again from where it stopped.

You can never cross your own body, so a wrong turn can cut a corner of the
room off for good. Fill every white square to finish. Draw the route with a
pencil: a line from the head through each square where a slide stops. The
page says how many slides it takes.

## Purpose

Planning ahead under one simple, unforgiving rule. Every move is easy to
make and impossible to undo, so the puzzle rewards looking at the end of the
route before starting it: which corner must be filled last, which corridor
can only be entered once, which square is a dead end that has to be the
finish. The small rooms are quick and friendly for children; the big ones
take real look-ahead.

## History

Space-filling routes are an old puzzle form — the knight's tour and the
"draw it without lifting your pencil" figures both ask for a path that uses
everything exactly once. Sliding pieces that cannot stop come from ice
puzzles in video games. Phone games put the two together around 2014: a
long creature that slides until it bumps into something and leaves its body
behind, with the aim of filling the screen. This page prints that puzzle for
pencil and paper.

## This implementation

- **Spec knobs:** `difficulty` (Kids 5×5 room with a 4–6 slide route, Easy
  6×6 7–10, Medium 7×7 11–15, Hard 8×8 16–21, Expert 9×9 22–30), `size`
  (0 = the level's; otherwise 4–11 with the slide band scaled by area),
  `show_moves` (print the number of slides), `width`, `height`, `line`.
- **Generation:** a room is carved from a route. Starting from a random
  square on an empty board, slides are laid down in random directions at
  random lengths (each turn at a right angle, as the real head must); the
  square just past each stop is walled off so the slide really stops there,
  and every square the route never covers becomes wall. That route always
  works, so the question is only whether it is the only one. Up to 3,000
  rooms are carved per page; rooms under half open are dropped, and of the
  unique ones the generator keeps the one in the requested band with the
  most decisions (slides where another direction was also open), then the
  most open squares.
- **Solving:** a depth-first count of every covering route over (head,
  covered squares) states with `lako-statesearch::count_solutions`, capped
  at 2 within a node budget; a count that runs out of budget is treated as
  ambiguous and the room is dropped.
- **Guarantees:** exactly one sequence of slides fills the room (`unique:
  true`, `unique_optimal: true`, `solvable: true`). Every covering route
  passes the same squares, and this room has one, so its slide count is the
  answer's length (`optimal_moves`, `rating_basis: optimal_moves`); the band
  is rated from it and a room that lands elsewhere says so with
  `requested_difficulty` (the defaults serve every band at the tested
  seeds). Tests re-count every room with a separate plain recursion over a
  grid of booleans (no bitsets, no search crate), check it finds the same
  route, replay the route square by square, and check a 2×2 room counts as
  two routes. The answer key draws the route with each slide's stop
  numbered and lists the directions.
