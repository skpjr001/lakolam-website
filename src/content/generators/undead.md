---
title: "Haunted Mirror Maze"
blurb: "Haunted mirror maze — place ghosts, vampires and zombies so every line of sight sees its number"
category: puzzle
version: "1.0.0"
---
Ghosts, vampires and zombies hide among the mirrors — count what each
doorway sees to find them all.

## What it is

A square room is full of diagonal mirrors, and every cell without a mirror
holds exactly one monster: a ghost, a vampire or a zombie. Above the grid
you are told how many of each there are. The numbers around the edge are
lookouts: each says how many monsters can be seen looking straight into the
room from that spot, with the line of sight bouncing off every mirror it
meets until it leaves the room again.

## How to play

Write G, V or Z (or draw the monster) in every cell without a mirror, using
exactly the number of each kind shown at the top.

Follow a line of sight from an edge number into the grid. It runs straight
until it meets a mirror, turns as a light beam would, and carries on until
it leaves the grid. Count the monsters it passes:

- a **ghost** is only seen in a mirror — it counts only after the line has
  bounced at least once;
- a **vampire** has no reflection — it counts only before the first bounce;
- a **zombie** is always seen and always counts.

If a line passes the same monster twice, it counts twice. Every edge number
must come out exactly right.

Good places to start: a 0 means every cell before the first mirror holds a
ghost and every cell after it a vampire. A line with no mirror at all sees
only vampires and zombies, so its number counts exactly those. And when a
line's number equals the number of cells it passes, every one of them must
be seen.

## Purpose

A logic puzzle that is half optics, half bookkeeping. Tracing the bouncing
sight lines is a pleasure in itself, and each kind of monster turns a line
into a different sort of count, so solving means juggling several small
sums at once. Spooky enough for a Halloween page, honest enough for a
puzzle book all year.

## History

The Haunted Mirror Maze was invented by David Millar, and became widely
known as "Undead" in Simon Tatham's Portable Puzzle Collection, where it
was contributed by Steffen Bauer. The mirrors-and-sight-lines idea echoes
older laser and mirror puzzles, but the three monsters, each seen in a
different way, are the genre's own.

## This implementation

- **Spec knobs:** `size` (4–7; 0 picks from the difficulty — 4, 5, 5, 5, 6
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** between 35% and 55% of the cells get a random mirror and
  every other cell a random monster. A local search then improves the
  board: around the cells the deduction ladder leaves open, it tries a
  sample of 16 moves (a different monster, a turned mirror, a mirror
  cleared, a mirror added) and keeps the one that leaves the fewest cells
  open, until the ladder settles every cell at the band's rung. Every edge
  spot is numbered, and all three kinds of monster always appear. When the
  requested rung yields no board at all, fresh attempts run at the rungs
  above and the band actually reached is printed.
- **Solving:** a ladder on yes/no variables (one per cell and kind of
  monster). *Local*: one monster per cell, the three totals, and each
  sight line's number bounded by the least and the most its cells could
  still add. *Line*: each sight line as a whole — a monster is ruled out
  of a cell when no choice for the line's other cells makes the number come
  out exactly (dynamic programming over the reachable totals). *Trial*:
  assume a monster, propagate, rule it out on a contradiction.
- **Guarantees:** deterministic per seed; exactly one filling, proven
  because the sound ladder settles every cell, confirmed by a capped
  exhaustive count, and re-proven in tests by an independent search whose
  feasibility test walks each sight line directly. Rated by the hardest
  rung needed with size as the tie-break (local: Kids at 4×4, else Easy;
  line: Easy at 4×4, else Medium; trial: Hard up to 5×5, else Expert).
  Every band is reached at its default size; with a custom `size` the label
  always states the band actually reached (Kids from 5×5 up is Easy; Easy
  at 4×4 is Kids; Hard from 6×6 up is Expert).
