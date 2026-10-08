---
title: "Icebarn"
blurb: "Icebarn (Aisuban) — one path from IN to OUT along every arrow and over every ice area, crossing only on ice"
category: maze
version: "1.0.0"
---
One path from IN to OUT, along every arrow and across every patch of ice —
where it slides straight on and may cross itself.

## What it is

A square grid with an IN arrow and an OUT arrow on its border, grey ice
cells, and small arrows on some of the lines between cells. The task is to
draw a single path from IN to OUT that follows every arrow and crosses every
area of ice. On white floor you can steer; on ice you slide straight, and
only on ice may your path cross itself.

## How to play

Draw one path that enters the grid at IN and leaves it at OUT, moving
through the centres of cells up, down, left or right.

- On a white cell the path may go straight or turn, but it may visit a
  white cell only once.
- Grey cells are ice; touching grey cells together form one ice area. On
  ice the path always goes straight on — it can never turn there. It may
  cross an ice cell twice, once across and once up or down, which makes a
  crossing.
- The path must pass every small arrow, travelling in the direction the
  arrow points.
- The path must cross every ice area at least once.
- It does not have to visit every cell.

Good places to start: follow the arrows near IN, and remember that a path
that reaches ice keeps sliding until the ice ends. A path that would have
to turn on ice, or come back to a white cell, has gone the wrong way.

## Purpose

Icebarn is a logic maze: there are no dead-end walls, only rules of
movement, so finding the way is pure reasoning — reading arrows forwards
and backwards, planning slides across the ice, and checking that every area
is reached. It suits solvers who enjoy mazes but want a proof, not a guess.

## History

Icebarn (Aisuban, "ice burn" — a frozen barn floor) was published by
Nikoli in 2004 (Puzzle Communication Nikoli vol. 108). Otto Janko's archive
holds about 150 of them, it has appeared at the World Puzzle Championship,
and it is playable on puzz.link. It is the Nikoli genre closest to a maze.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 6, 7, 8, 8, 9
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped and the value asked for is
  reported in meta (`requested_size`, `requested_cell`, `requested_line`).
- **Generation:** two to four ice areas are laid as random blobs that do
  not touch, IN is put on a random border cell, and a random path walks
  from it — straight across ice, free to turn on white cells it has not
  used, steering first towards ice areas not yet visited and then back
  across an ice cell it has crossed one way only — until it is long enough,
  has visited every area and made its crossings, and can leave through the
  border; where it leaves is OUT. Ice areas the walk missed melt back to
  white. Every step of the path starts as an arrow; arrows are removed in
  random order while the deduction ladder still settles every edge at the
  path rung, and for the trial bands a few more are tried at the trial
  rung.
- **Solving:** a ladder on yes/no variables, one per edge between cells.
  *Local*: every white cell has two path ends or none, every ice cell none,
  two opposite ones or all four (IN and OUT count as ends). *Path*: pieces
  of path joined through cells whose joins are certain may never close into
  a loop, must run the way the arrows, IN and OUT point (a parity
  union-find), and once IN meets OUT the path must hold every piece and
  cross every ice area; everything on the path, OUT and every ice area must
  stay reachable from IN — each undecided edge is tested both ways against
  that. *Trial*: assume an edge, follow the consequences, keep the opposite
  on a contradiction.
- **Guarantees:** deterministic per seed; exactly one path, proven because
  the sound ladder settles every edge (`uniqueness_proof`), confirmed by a
  capped exhaustive count when cheap (`count_confirmed`), and re-proven in
  tests by an independent count over the edges that walks each finished
  path from IN. The local rung alone never settles a board (it cannot rule
  out a loose loop), so ratings rest on the path and trial rungs with size
  as the tie-break: path — Kids up to 6×6, Easy at 7×7, else Medium;
  trial — Hard up to 8×8, else Expert. Every band is reached at its default
  size. With a custom `size` the label states the band actually reached and
  `requested_difficulty` records the request: Easy and Medium up to 6×6 are
  Kids, Kids and Medium at 7×7 are Easy, Kids and Easy from 8×8 are Medium,
  Expert up to 8×8 is Hard and Hard from 9×9 is Expert.
