---
title: "Every-Tile Path"
blurb: "Every-tile path — walk from START to EXIT stepping on every tile, some two or three times, by the one way"
category: puzzle
version: "1.0.0"
---
Cross the floor from START to EXIT and use up every tile on the way — some
of them twice, or even three times.

## What it is

A floor of square tiles with gaps in it. You walk across it one tile at a
time, and every tile you step on is used up: a plain tile after one visit,
a tile marked 2 or 3 after that many. A used-up tile is gone. The walk must
finish on EXIT at the very moment the last tile is used. There is exactly
one way to do it.

## How to play

Start on START. Each step, move to the next tile up, down, left or right —
never diagonally, and never across a gap. Count your visits: a plain tile
can be stepped on once, a tile marked 2 twice and a tile marked 3 three
times (START counts as stepped on when you begin). Once a tile is used up
you cannot step on it again.

Finish on EXIT with every tile used up. The page says how many steps that
takes. Draw your walk with a pencil, or number the tiles in the order you
stand on them.

## Purpose

Route planning with a twist of counting. Plain tiles teach the classic
"visit everything once" path: leave no corner stranded, keep a way back
open. The 2 and 3 tiles turn that around — you must come back, so the
puzzle becomes "when do I return, and from which side?" It trains looking
ahead several moves and noticing which tiles are dead ends that can only be
the finish.

## History

Paths that visit every square of a board exactly once go back to the
knight's tours studied by Euler in 1759, and to the Hamiltonian paths of
graph theory named after William Rowan Hamilton's 1857 "Icosian game".
Puzzle books turned them into "walk through every room" mazes. Browser and
phone games of the 2000s and 2010s added tiles that crumble behind you and
tiles that need two or three visits, which is the form printed here.

## This implementation

- **Spec knobs:** `difficulty` (Kids 4×4 board, 9–12 steps, no 2s; Easy
  5×5, 13–20 steps, one 2; Medium 6×6, 21–30 steps, two 2s; Hard 7×7,
  31–42 steps, two 2s and a 3; Expert 8×8, 43–60 steps, three 2s and a 3),
  `size` (0 = the level's; otherwise 4–9, tiles scaled with the area),
  `multi_visits` (off: every tile once), `width`, `height`, `line`.
- **Generation:** a floor is carved from a walk. A random walk from a
  random START snakes over an empty board, preferring the square with the
  fewest fresh squares beyond it, and now and then steps back onto a used
  tile (never START) to make the band's 2s and 3s; it ends on a fresh
  square, EXIT, and every square it never touched is a gap. That walk always
  works. A local search then makes it the only one: count the floor's walks
  (to 24), cut the walk — near where another walk parts from it, or
  anywhere, and from either end, since a walk run backwards is a walk too —
  regrow the rest, and keep the new floor when it has no more walks. If a
  band's 2s and 3s defeat every restart, it eases off one extra visit at a
  time (a 3 first); the floor is still rated by its steps.
- **Solving:** a depth-first count capped at 2 over (position, visits left),
  pruned by the checkerboard balance (the walk alternates colours, so the
  visits left on each colour must match), by connectivity of the tiles left,
  and by dead ends (a tile with one usable neighbour must be entered and
  left through it). A count that runs out of its node budget is never taken
  as unique.
- **Guarantees:** exactly one walk uses every tile its number of times and
  ends on EXIT (`unique: true`, `unique_optimal: true`, `solvable: true`).
  Every walk on a floor has the same number of steps — one per visit — so
  that is the answer's length (`optimal_moves`, `rating_basis:
  optimal_moves`) and rates the band; a floor served elsewhere says so with
  `requested_difficulty` (the defaults serve every band at the tested seeds).
  Meta also gives `tiles`, `double_tiles`, `triple_tiles`. Tests re-count
  every band with a separate memoised search over (square, visits left) that
  shares nothing with the generator's pruning, check both counters agree on
  small hand-made floors, and replay the walk step by step. The answer key
  draws the walk and writes on every tile the steps at which it is stood on.
- **Speed:** Kids to Medium in milliseconds; Hard about 0.2 s; Expert about
  1 s (up to ~4 s on the slowest of 30 tested seeds); `size: 9` at Expert
  takes up to ~10 s.
