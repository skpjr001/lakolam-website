---
title: "Country Road"
blurb: "Country Road — one loop entering every room once; numbers count its cells in the room"
category: puzzle
version: "1.1.0"
---
One loop that drives through every room exactly once — the numbers say how
long it stays.

## What it is

A grid divided into rooms by thick borders. Some rooms hold a number. Draw
a single closed loop through the centres of the cells that visits every
room once: it drives in, wanders through some of the room's cells, and
leaves, never to return. A number tells you how many of that room's cells
the loop passes through. And the loop must not leave gaps along a border:
two cells it skips may never sit side by side on opposite sides of a thick
line.

## How to play

Draw lines between the centres of neighbouring cells to make one loop that
never crosses or touches itself. Every room is visited exactly once — the
loop crosses each room's border exactly twice, once going in and once
coming out. A room's number is how many of its cells the loop passes
through; rooms without a number can have any count. Wherever two cells
touch across a thick border, the loop must pass through at least one of
them.

Good places to start: a small room with a big number (the loop must fill
most of it), a room with a 1 (the loop just clips one cell), and long
stretches of border, where skipped cells force the loop onto the other
side. Remember that once the loop leaves a room it can never come back, and
it must not close until it has visited every room.

## Purpose

A loop puzzle with a story: the loop is a road trip that calls in at every
district once. It mixes counting (the room numbers) with route planning
(one way in, one way out) and an unusual border rule that turns empty
cells into clues of their own.

## History

Country Road (カントリーロード) is a Nikoli genre, introduced in the late
1990s in the magazine *Puzzle Communication Nikoli*. It is one of
Nikoli's family of room-and-loop puzzles and appears regularly in puzzle
championships and online collections such as puzz.link.

## This implementation

- **Spec knobs:** `size` (5–9; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** a random simple loop is grown as the outline of a tree of
  unit squares on the lattice of cell centres, leaving a fifth to a third
  of the cells off the loop. The loop is cut into short arcs, one room
  around each, and every patch of skipped cells joins one room it touches,
  so skipped cells never meet across a border. With every room numbered,
  a local search moves single loop cells and whole patches of skipped
  cells into neighbouring rooms — keeping the move that leaves the fewest
  cells and edges unsettled — until the ladder settles everything at the
  band's rung. Numbers are then removed in random order while it still
  does.
- **Solving:** a ladder on yes/no variables (one per edge between cells,
  one per cell) — *local* (a visited cell has two loop edges, a skipped one
  none; each room's border is crossed exactly twice; room numbers; at
  least one of two cells beside each other across a border is visited),
  *loop* (no loop may close before it holds every visited cell and touches
  every room; the possible cells must hang together; across a narrow
  passage the loop lives wholly on one side), and *trial* (assume a value,
  propagate, keep the opposite on a contradiction).
- **Guarantees:** deterministic per seed; exactly one loop, proven because
  the sound ladder settles every variable, confirmed by a capped
  exhaustive count, and re-proven in tests by an independent path search
  that walks loops room by room. Rated by the hardest rung needed with
  size as the tie-break (local: Kids at 5×5, else Easy; loop: Easy up to
  6×6, else Medium; trial: Hard up to 7×7, else Expert). Every band is
  reached at its default size; with a custom `size` the label always
  states the band actually reached.
- **Version 1.1:** an attempt whose capped count runs out of budget is now
  skipped (it used to end generation with an error), and when the first 40
  attempts find no board at all, up to 40 more with fresh seeds run at the
  requested rung and then at each rung above it, serving the nearest band
  reached, honestly labelled — so every size and band generates (swept over
  sizes 5–9, all bands, seeds 0–19). Large boards on the Kids band, out of
  reach of the local rung, come out as Easy or harder. Every board that
  1.0 generated is unchanged.
- **Speed:** where the requested band cannot exist at the chosen size
  (Hard above 7×7, Kids above 5×5), the search stops as soon as it holds a
  board in the nearest reachable band — the board it would have returned
  anyway, so the output is unchanged; Hard at 9×9 dropped from over 30 s to
  about a second.
