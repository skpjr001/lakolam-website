---
title: "Lost in the Fog"
blurb: "Lost in the Fog — a blind walk log through a house map; find the one square you could have started (or ended) on"
category: maze
version: "1.0.0"
---
You walked through a house in thick fog and saw nothing — but you kept a
log. Work out the one square you could have started from.

## What it is

A map of a house — walls, doorways and furniture on a grid of squares, with
letters across the top and numbers down the side — and the log of a walk
taken blind: "3 squares north", "2 squares east, then bump!". Many squares
fit the first line of the log, fewer fit the first two, and by the end only
one square in the whole house could have been the start. A second kind of
page asks where the walk ended instead. In the harder "walls" log, the
walker never bumps; instead, at the start and after every leg, they feel
how many sides of their square are blocked.

## How to play

- North is up the page. Each line of the log is one leg of the walk, in
  order.
- "3 squares north" means you walked three squares north without being
  stopped.
- "Then bump!" means the very next square that way was blocked — by a
  wall, a piece of furniture or the edge of the map. "Bump at once" means
  you could not move at all.
- In a walls log, "felt 2 walls" means exactly two of the four sides of the
  square you stopped on were blocked (walls, furniture and the edge all
  count).
- You cannot walk through walls or furniture.
- Find the one square where the whole log works (or, if the page asks where
  you are now, the square where it ends). Write its letter and number as
  the answer.
- Tip: try the first leg from every square and cross out the ones that
  fail, then check the next leg on the squares that are left.

## Purpose

Position and direction — the compass points, counting squares, grid
references — used to reason rather than just to follow. Testing every
square against a rule and crossing out the ones that fail is a careful,
systematic search, the same idea behind how a robot works out where it is
from what its bump sensors tell it.

## History

Puzzles where you must work out where you are from a blind description go
back to "where am I?" logic puzzles and to the robot-localisation problems
of computing. Schools teach the ingredients as "position and direction"
(compass points, grid references and turns) and in computing lessons on
following and writing algorithms. Web games have recently made a theme of
seeing too little — mazes in fog and grids that fade — and this page turns
that idea into a pencil puzzle with a log instead of a view.

## This implementation

- **Spec knobs:** `difficulty` (Kids 5×5 map with a 2–3 leg log, Easy 6×6
  with 4–5 legs, Medium 7×7 with 6–7, Hard 8×8 with 8–9, Expert 9×9 with
  10–12), `ask` (`start` or `end`), `clues` (`bumps` or `walls`), `size`
  (map side, 0 = the level's, otherwise 4–10), `width`, `height`, `line`.
  Clamped requests are reported as `requested_<field>`.
- **Generation:** a random house — a few wall runs, each with a doorway,
  and furniture on about one square in nine, with every open square
  reachable. A true start is picked and the log grown one leg at a time:
  among the legs possible from the walker's real position, the one chosen
  keeps the number of squares still fitting the log closest to a steady
  geometric shrink from all of them down to one at the target length;
  legs that rule nothing out are mostly skipped, and turning back the way
  you came, or going on the same way, is discouraged. The log ends as soon
  as one square is left. Up to 40 houses are tried.
- **Solving:** every square of the map is tried as a start and walked
  through the log; meta lists how many squares still fit after each leg
  (`candidates_after_each_leg`).
- **Guarantees:** exactly one square answers the question: for `start`,
  only one square fits the whole log; for `end`, every fitting start ends
  on the same square (`unique: true`), and without its last leg the log
  fits more than one square. Tests re-prove it with a separate walker
  (coordinates and a set of shut doorways) square by square, recount the
  fitting squares after every leg independently, and check the walls log
  never bumps. Because every leg is an exact number of squares, `end` pages
  narrow down at the same pace as `start` pages. Rated by the legs in the
  log (Kids up to 3, Easy 4–5, Medium 6–7, Hard 8–9, Expert 10 or more;
  `rating_basis: log_legs`); a band not reached is served as the nearest,
  labelled honestly with `requested_difficulty`.
