---
title: "Moon or Sun"
blurb: "Moon or Sun — one loop through every room, taking all its moons or all its suns, alternating"
category: puzzle
version: "1.1.0"
---
One loop through every room — all the moons here, all the suns next door.

## What it is

A grid divided into rooms by thick borders, with moons and suns drawn in
some cells. Draw a single closed loop that visits every room exactly once.
In each room the loop collects either all the moons (and no suns) or all
the suns (and no moons) — and it switches every time it moves to the next
room: a moon room, then a sun room, then a moon room, all the way round.

## How to play

Draw lines between the centres of neighbouring cells to make one loop that
never crosses or touches itself. The loop enters every room once and
leaves once, so it crosses each room's border exactly twice. Inside a
room, decide whether the loop takes the moons or the suns: if it takes the
moons it must pass through every moon in that room and avoid every sun,
and the other way round. The next room along the loop must make the
opposite choice. Empty cells can be used or skipped freely.

Start with rooms where one choice is impossible — moons scattered in two
far corners that one visit cannot reach, for example — so the room must
take its suns. Every decided room decides its neighbours along the loop.
Cells holding a symbol the room rejects are walls; the loop must find a
way round them.

## Purpose

A loop puzzle with a rhythm. It trains the usual loop skills — one way in,
one way out, no early closing — and adds a two-colour pattern that runs
along the whole route, so a single deduction in one room can ripple round
the board.

## History

Moon or Sun (月か太陽, *Tsuki ka Taiyō*) is a Nikoli genre from
*Puzzle Communication Nikoli*, one of the publisher's more recent loop
puzzles. Like Country Road it is built on rooms the loop must visit once,
and it has spread through puzzle collections and online players such as
puzz.link.

## This implementation

- **Spec knobs:** `size` (5–9; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `difficulty`, `cell`, `line`.
- **Generation:** a random simple loop is grown as the outline of a tree of
  unit squares on the lattice of cell centres. It is cut into an even
  number of arcs, one room around each, alternating sun rooms and moon
  rooms; skipped cells join random neighbouring rooms. With a symbol in
  every cell (the room's kind on the loop, the other kind off it), a local
  search moves single cells between neighbouring rooms — keeping the move
  that leaves the fewest variables unsettled — until the ladder settles
  everything at the band's rung. Symbols are then removed in random order
  while it still does, always keeping at least one in every room. Moons
  are solid crescents and suns open rings with rays, so the page prints
  clearly in black and white.
- **Solving:** a ladder on yes/no variables (one per edge, one per cell,
  one per room for "takes the suns") — *local* (cell degrees; each room's
  border crossed exactly twice; a sun is visited exactly when its room
  takes suns, a moon exactly when it takes moons; rooms joined by a loop
  edge take different kinds), *loop* (no early closing, the possible cells
  hang together and touch every room, across a narrow passage the loop
  lives on one side), and *trial* (assume, propagate, keep the opposite on
  a contradiction).
- **Guarantees:** deterministic per seed; exactly one loop, proven because
  the sound ladder settles every variable, confirmed by a capped
  exhaustive count, and re-proven in tests by an independent path search
  that tries both kinds for the first room and walks the loop room by
  room. Rated by the hardest rung needed with size as the tie-break
  (local: Kids at 5×5, else Easy; loop: Easy up to 6×6, else Medium;
  trial: Hard up to 7×7, else Expert). Every band is reached at its
  default size; with a custom `size` the label states the band actually
  reached.
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
