---
title: "Gravity Worm"
blurb: "Gravity Worm — steer a falling worm, eat apples to grow, and reach the portal"
category: puzzle
version: "1.0.0"
---
Steer a hungry worm that falls whenever it loses its footing — eat apples
to grow long enough to reach the portal.

## What it is

A level seen from the side: ground, ledges and pits, a few apples, a
swirling portal and a short green worm. Gravity pulls the worm down, so
high places are out of reach until it has grown. Every level can be
finished, and the answer key gives a solution with the fewest possible
moves.

## How to play

Move the worm's head one square up, down, left or right; the rest of the
body follows along behind. The head cannot go into the ground, off the
edge, or into the worm's own body.

After every move, gravity acts: if no part of the worm is resting on top
of ground or an apple, the whole worm drops straight down until some part
of it is. A worm that falls off the bottom of the level, or onto spikes,
is lost — start again.

When the head moves onto an apple the worm eats it and grows one square
longer. A longer worm can reach higher: it can stand on its tail and
stretch up, as long as some part of it still rests on something.

Reach the portal with the worm's head to finish (falling into it counts
too). You will need to eat at least one apple. The answer key lists the
moves as arrows, numbered every five, and traces the head's path on the
level.

## Purpose

A short, satisfying planning puzzle: each move is simple, but the order of
the apples and the way the worm folds decide whether it can climb. It
trains thinking a few steps ahead and picturing how a shape moves and
falls.

## History

Worms and snakes that grow by eating go back to the arcade game of 1976
and the phone games of the late 1990s. Turning the snake sideways and
adding gravity made a family of modern puzzle games in the 2010s, in which
the snake must fold itself to climb and reach an exit.

## This implementation

- **Spec knobs:** `difficulty`; `width` 6–16 and `height` 5–12 cells (null
  = by band: 7×6, 8×7, 9×8, 10×8, 11×9); `apples` 0–5 (null = by band: Kids
  1, Easy 1–2, Medium 2, Hard 2–3, Expert 3); `spikes` (null = Hard and
  Expert); `cell`, `line`.
- **Generation:** seeded terrain — ground columns whose heights follow a
  random walk (with the odd pit from Medium up), up to two ledges in the
  air, spikes on top of the ground away from the worm — then a three-cell
  worm lying on a flat stretch, a portal at least three steps from its
  head, and the apples on free cells. Up to 600 levels are tried; of the
  first eight that rate in the band, the one whose solution eats the most
  apples (then the longest) is printed. A band no level reaches is served
  from the nearest one found, with `requested_difficulty`.
- **Solving:** breadth-first search (`lako_statesearch::shortest`) over
  positions = the worm's cells (head first) plus the apples still uneaten;
  a move settles gravity completely before the position is stored, and a
  move that loses is not a move. The first solution found is a proven
  optimum. A level is kept only if it has at least four moves and, when it
  has apples, a second search with apples made inedible (still solid)
  proves the portal unreachable — so at least one apple must be eaten. A
  search past its budget (300,000 positions) rejects the level.
  `count_shortest` (cap 2) gives `unique_optimal`.
- **Guarantees:** deterministic per seed; `solvable: true`;
  `optimal_moves` is the proven fewest moves, rated by `rating_basis:
  "optimal_moves"` (Kids ≤ 7, Easy 8–12, Medium 13–18, Hard 19–25, Expert
  26+); `apples_needed: true` when there are apples; `solution` holds the
  moves as letters U R D L. The solution is replayed by the rules written
  out afresh (a separate simulation) before the page is returned. Tests
  re-prove the optimum, and that the level cannot be finished without
  eating, with an independent breadth-first search, and follow the play
  API's hints into the portal. Every band generates in well under 0.1 s.
