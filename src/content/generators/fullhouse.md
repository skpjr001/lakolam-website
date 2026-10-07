---
title: "Full House"
blurb: "Full House — one path through every blank square, turning only when it is blocked"
category: maze
version: "1.0.0"
---
Draw one line through every white square, going straight until something
stops you.

## What it is

A square grid with a few dark squares. One path passes through every white
square exactly once. The path runs in straight lines and may only change
direction when the next square ahead is dark, already part of the path, or off
the edge of the grid. The start is not marked on harder pages — finding it is
part of the puzzle. There is exactly one such path.

## How to play

Pick a white square to start from and choose a direction. Keep going in that
direction until you are blocked by a dark square, your own path or the edge,
and only then turn. Carry on until every white square is used. If you get
stuck with squares left over, rub out and try a different start or a different
first turn.

Good places to look: a white square with only one white neighbour can only be
an end of the path, so it is either where you start or where you finish.
Corners and squares hemmed in by dark squares are often the key. On the easier
pages the start is marked with a dot.

## Purpose

A pencil maze with a single rule and a satisfying "one-stroke" solve, close to
the sliding one-line puzzles popular as phone games. It sits beside the ice
maze (which slides to a goal) and the snake and loop puzzles, but asks for
something neither does: cover the whole board with one forced-turn path.

## History

Full House puzzles were published by Erich Friedman on his Puzzle Palace
pages, alongside a hexagonal "Full Hex" version, as part of his families of
path and maze puzzles. The same mechanic — a ball that rolls until it hits
something and must paint every square — later became a popular genre of
mobile puzzle games.

## This implementation

- **Spec knobs:** `difficulty` (Kids 5×5 and Easy 6×6 with the start marked,
  Medium 7×7, Hard 8×8, Expert 9×9), `size` (0 = the level's, otherwise 4–10),
  `start` (`auto` by level, `show`, `hide`), `width`, `height`, `line`.
- **Generation:** answer-first. A random slide path is laid on an empty grid:
  each leg runs until it is blocked, or is occasionally cut short by placing a
  dark square just beyond it; every square the path misses turns dark. A
  spiral is unique on almost any board and solves itself, so candidates are
  scored by how often the path switches between left and right turns, minus a
  little per dark square, and the best of up to forty unique boards is kept.
- **Solving:** a depth-first search from every white square, leg by leg (each
  move slides until blocked), with a sound dead-end prune: a free square with
  no free way in can never be reached, and a square with only one way in must
  be the path's end — two such squares end the branch.
- **Guarantees:** deterministic per seed; the search counts complete paths
  over every start with cap 2 inside a node budget, and only a board with
  exactly one path (the one laid) is kept — a spent budget counts as
  ambiguous. Tests re-prove it with an independent square-by-square walk with
  no pruning, and replay the answer against the rule square by square. The
  start may be hidden because uniqueness is proved over all starts. Rated by
  grid size (`rating_basis: grid_size_and_start`); an explicit `size` is rated
  by the size actually drawn, and the request is recorded.
