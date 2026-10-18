---
title: "Flip Path"
blurb: "Flip Path — one path flips every tile it enters; finish with every tile green"
category: puzzle
version: "1.0.0"
---
Draw one path from S to E; every tile you step on flips colour. Turn the
whole board green.

## What it is

A grid of tiles, some blue (marked with a ring) and some green (marked with a
small dot), with a start tile S and an end tile E. One path from S to E turns
every tile green, and there is only one such path.

## How to play

Draw a line from S to E, moving from tile to tile up, down, left or right.

- **Every tile you enter flips colour:** blue turns green, green turns blue.
  S counts as entered when you start, and E when you finish.
- **Crossings:** your line may cross itself on a tile — straight across one
  way, and later straight across the other way, like a plus sign. A tile
  crossed twice flips twice, so it ends the colour it started. You may not
  turn on a tile you cross, and no tile can be entered three times.
- **Finish with every tile green.**

So each blue tile (ring) must be entered exactly once, and each green tile
(dot) must either be left alone or crossed straight through twice — entering
it just once would leave it blue.

Ways in:

- A blue tile in a corner or against green tiles has few ways in and out —
  look for tiles where the path has only one way to go.
- Green tiles are tempting short cuts but are usually traps: going through
  one means coming back across it the other way later.
- On harder boards one or more green tiles must be crossed, and finding which
  one is the key to the puzzle.

## Purpose

A path puzzle with a twist that children understand at once — flip the
colours, make it all green — and a hidden layer of crossings for older
solvers. Printed in colour or as symbols only (rings and dots), so it works on
any printer.

## History

Colour-flipping line puzzles are a staple of online games for children; this
one keeps the rule (every tile you pass flips) and makes it a printable logic
puzzle with a single answer and an explicit crossing rule.

## This implementation

- **Spec knobs:** `difficulty`; `size` (tiles per side, 3–7 — larger
  boards rarely have a single path a count can prove quickly; 0 picks the
  band's side: Kids 4, Easy 5, Medium 6, Hard 7, Expert 7; a changed request
  is reported as `requested_size`); `colour` (true: blue and green tiles with
  symbols; false: symbols only, ink-saving); `cell`, `line`.
- **Rules as implemented:** the path is a list of tiles; each entry flips
  the tile; a tile may be entered twice only as a crossing (both passes
  straight, on different axes); START and END are entered once; the path may
  never reuse a step. Solved means every tile is green at the end, so blue
  tiles are entered exactly once and green tiles zero times or crossed.
- **Generation:** answer first. A random walk from a random tile steps to
  the unentered neighbour with the fewest onward choices (ties at random);
  from Easy up it may also cross a tile it passed straight earlier, on the
  other axis, onto an unentered tile beyond (Expert crosses whenever it can,
  aiming for four crossings). Tiles entered once are blue, the rest green.
  Walks shorter than half the board are dropped; up to 2,000 walks are tried
  for the band.
- **Solving:** an exhaustive depth-first count with cap 2: at a green tile
  the path goes straight; a green tile may be entered only along an axis
  with tiles on both sides (and a first entry only where the crossing pass
  will fit); prunings — every unentered blue tile needs two ways in (END
  one), and every unentered blue tile, END and owed crossing must stay
  reachable from the head. A count that runs out of its 300,000-node budget
  counts as ambiguous (a candidate walk gets 40,000 nodes).
- **Guarantees:** deterministic per seed; the answer replays to all green
  under the rules (checked by `obeys()`); the count proves it is the only
  path (`proof: exhaustive_count_cap_2`). Tests re-count small boards with a
  plain search that knows only the rule replay, and check the pruned count
  against it on boards with many answers. Rated by side and crossings
  (`rating_basis: side_and_crossings`): score = side − 4 + ⌊crossings ÷ 2⌋;
  0 or less Kids, 1 Easy, 2 Medium, 3 Hard, 4 or more Expert. A band a board
  does not reach is served as the nearest with `requested_difficulty`.
- **Meta:** `size`, `blue`, `green`, `crossings`, `traps` (green tiles the
  path never enters), `path_length`, `colour`, `search_nodes`.
- **Play API** (`play`): `puzzle`, `puzzle_from`, `check` (replay: legal,
  first broken step, colours now, solved) and `hint` (the next tile, named
  `start`, `straight_on` on a green tile, or `path`; or how far to undo).
