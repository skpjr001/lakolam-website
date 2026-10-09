---
title: "Which Path?"
blurb: "Which path? A kids' maze race — several animals, and only one path reaches the goal"
category: maze
version: "1.0.0"
---
Three animals, one house — and only one of them can get there. Which path is
the right one?

## What it is

A maze race for young children. Animals wait at the openings along the top of
a maze, each with a letter, and a goal waits under the bottom — a house, a
cake, a present. Only one animal's path leads all the way to the goal; the
others wander off and stop at dead ends, some of them very close. In the
second kind of race, every animal can reach the goal and the question is
whose way is shortest.

## How to play

Pick an animal and trace its path with your finger or a pencil, starting at
its opening at the top. You may only move along the white paths — never
through a wall. If you reach a dead end, that animal cannot get to the goal.
Try the next one. When you find the path that reaches the goal, write down
that animal's letter.

In the shortest-way race, every path gets there: count the squares along
each way, or trace them all, and choose the shortest.

## Purpose

Tracing a path builds pencil control and visual tracking, and trying each
start in turn is a first taste of checking every case. The big squares and
pictures suit children from three to six; larger grids and more starts give
older children a longer search.

## History

"Which way to the playground?" mazes, with several characters and one right
path, have been a staple of preschool activity books and classroom
worksheets for decades — a gentle first maze before a child is ready for a
single long route through a large one.

## This implementation

- **Spec knobs:** `difficulty` (Kids 6×6 with 3 starts, Easy 8×8 with 3,
  Medium 10×10 with 4, Hard 12×12 with 4, Expert 14×14 with 5), `mode`
  (`one_reaches` or `shortest`), `starts` (0 = the level's number;
  otherwise 2–5), `size` (0 = the level's; otherwise 5–20), `pictures`
  (animal pictures and a pictured goal, or letters and a GOAL square),
  `colour`, `width`, `height`, `line`.
- **Generation:** a growing-tree carve makes a spanning tree; the starts are
  spread across the top row and the goal sits in the bottom row.
  *One reaches:* a winner is drawn, and every other start's tree path to the
  goal is followed until it meets the winner's path; one wall is put back on
  that stretch, in its last third, so the loser's path runs a long way and
  stops close to the winning route. *Shortest:* the tree is kept whole and
  re-carved until exactly one start is nearest the goal, preferring a lead of
  three squares or more. Forty layouts are scored (long winning route, losers
  that wander far and stop near the goal) and the best is kept.
- **Solving:** breadth-first search from the goal gives each start's
  distance, or none.
- **Guarantees:** union-find over the open passages (a different method from
  the build's search) proves that exactly one start shares the goal's
  connected component, or in `shortest` mode that all do and the winner's
  route is strictly shortest; the tests check a third time by depth-first
  search. The answer key draws the winning route and names its letter. Meta
  records the near-miss distance of each losing start and, in `shortest`
  mode, every start's step count and the winner's lead (`gap`).
- **Rating:** by grid side (`rating_basis: grid_size`): up to 6 Kids, 8 Easy,
  10 Medium, 12 Hard, larger Expert. A hand-set `size` therefore sets the
  band, and the request is kept as `requested_difficulty`. Clamped knobs are
  reported as `requested_size`, `requested_starts`, `requested_width` and so
  on.
