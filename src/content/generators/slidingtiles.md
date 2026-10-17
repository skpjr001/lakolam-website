---
title: "Sliding Tiles"
blurb: "Sliding Tiles — slide the tiles into the gap until they are in order (numbers, a picture, or a road)"
category: puzzle
version: "1.0.0"
---
Slide the tiles into the gap until the numbers are in order, the picture is
whole, or the road joins up.

## What it is

A square tray of tiles with one empty space. In the numbered version the
tiles must end in order, 1 in the top-left corner and the gap in the
bottom-right. In the picture version the tiles are pieces of a picture,
shown beside the tray, to put back together; each piece also has a small
number. In the road version the tiles carry pieces of road, and you must
make one road run from START to GOAL. Every tray can be solved, and the
answer key lists a shortest solution.

## How to play

A move slides one tile that is next to the gap — above, below, left or
right of it — into the gap. Tiles never lift out or jump. Keep going until
the tray is solved: numbers in order, the picture complete, or an unbroken
road from START to GOAL (for the road, any tiles may end anywhere as long as
the road joins).

The answer key lists the tiles to slide, in order, by their numbers. Try to
match its count: it is the fewest moves possible. A good way in for the
numbered tray is to finish the top row, then the left column, and work
inwards.

## Purpose

The sliding puzzle is a classic of planning and patience, and on paper it
becomes a puzzle of looking ahead: the solver tracks the gap and plans a few
slides at a time. The picture and road versions make it friendly for
younger solvers.

## History

The fifteen puzzle swept America and Europe in 1880; Sam Loyd later claimed
it as his own, though it was made by Noyes Chapman, a postmaster in New
York state. Loyd's famous prize for swapping the 14 and 15 could never be
won: half of all arrangements cannot be solved, as William Johnson and
William Story proved in 1879. Picture versions and road-building versions
followed as toys and, later, computer games.

## This implementation

- **Spec knobs:** `mode` `numbers` (default), `picture` (one of three
  built-in vector pictures — house, sailboat, rocket — chosen by the seed;
  shown beside the tray as "make this") or `track` (3×3 road tiles);
  `difficulty`; `size` 3–5 (null = by band: Kids and Easy 3×3, harder 4×4;
  the track is always 3×3, recorded as `requested_size`); `cell`, `line`.
- **Generation:** a random walk of the gap from the goal (never straight
  back), so every start is solvable; numbered starts are also checked by the
  parity rule (`parity_checked`). The walk length adapts — a start that
  proves too easy lengthens the next walk — over up to 40 starts; the
  nearest band reached is served with `requested_difficulty`. Road trays
  lay a random road from START to GOAL through the 3×3, fill the other
  tiles with random road pieces or plain grass, leave one gap, and walk.
- **Solving:** 3×3 numbered trays by A* (`lako_statesearch::shortest_astar`,
  Manhattan distance plus linear conflicts) and `count_shortest` (cap 2)
  for `unique_optimal`; 4×4 and 5×5 by a local IDA* with the same
  admissible bound (incremental Manhattan distance, conflicts per line as
  tiles in their home line minus their longest in-order run), 6,000,000
  expansions per start — a start it cannot settle is discarded, never
  guessed; `unique_optimal` is not reported there. Road trays by
  breadth-first search (`lako_statesearch::shortest`) to the *set* of all
  joined-road positions, so the optimum is the fewest moves to any joined
  road (meta `goal: "any connected road"`), with `count_shortest` for
  `unique_optimal`; identical road tiles are interchangeable in the state.
- **Guarantees:** deterministic per seed; `solvable: true`; `optimal_moves`
  is proven, rated by `rating_basis: "optimal_moves"`: Kids ≤ 8, Easy 9–16,
  Medium 17–26, Hard 27–38, Expert 39+ (held to 39–46). Measured over seeds:
  numbered Kids/Easy on 3×3, Medium/Hard/Expert on 4×4, all served as asked
  (4×4 Expert about 40 ms; 5×5 Expert on request about 0.5 s). A 3×3 tray is
  never more than 31 moves from solved, so 3×3 Expert is served as Hard. The
  road tray reaches about 24 moves at most: Kids, Easy and Medium are
  served, and Hard and Expert are served as Medium with
  `requested_difficulty`. The answer (meta `solution`, tile labels) is
  replayed by the rules written out afresh. Tests re-prove 3×3 and road
  optima with an independent breadth-first search (with its own road
  check) and 4×4 optima with an independent IDA* using the plain Manhattan
  distance.
