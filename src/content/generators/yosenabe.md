---
title: "Yosenabe"
blurb: "Yosenabe — slide every number straight into a grey pot so each pot's total adds up"
category: puzzle
version: "1.0.0"
---
Hot pot: slide every number straight into a grey pot so that each pot's
total comes out right.

## What it is

A square grid with grey areas — the pots — and circled numbers outside
them. Some pots show a total in their corner. Every circle slides in a
straight line until it is inside a pot. Each pot must receive at least
one circle, and a pot with a total must receive circles that add up to
exactly that total.

## How to play

- Move every circle in a straight line — up, down, left or right,
  without turning — into a grey pot. Draw an arrow from the circle into
  the pot.
- A circle's path may cross a pot on its way to another pot, but it may
  never cross another circle or another circle's path.
- Every pot must receive at least one circle.
- A number in the corner of a pot is the total of the circles that end
  in it. A pot without a number may hold any total.
- It does not matter where inside the pot an arrow ends. There is exactly
  one way to choose which pot each circle goes to.

Good places to start: a pot that only one circle can reach must get that
circle. A circle bigger than what is left of a pot's total cannot go in
it. A pot whose total can only be made by every circle that can still
reach it gets them all.

## Purpose

An arithmetic puzzle with a picture: small sums decided by geometry. It
practises adding to a target and ruling out combinations, and trains
thinking about paths that block each other.

## History

Yosenabe (寄せ鍋, a Japanese hot-pot dish of mixed ingredients) first
appeared in Puzzle Communication Nikoli No. 135 (2011) and is on the
publisher's current list of puzzles; Otto Janko's online archive carries
about 200 of them. Janko's rules state that paths may cross a pot.

## This implementation

- **Spec knobs:** `size` (4–10; 0 picks from the difficulty — 5, 6, 7, 8,
  9 from Kids to Expert), `difficulty`, `max_value` (largest number in a
  circle, 2–9), `cell` (18–90 pt), `line` (0.2–4 pt). Out-of-range
  numbers are clamped and the requested value is reported in the
  metadata.
- **Generation:** answer first. Pots are scattered as blobs of one to
  four cells that never touch side by side; each pot gets one to three
  circles on straight tracks that end on the first cell of that pot along
  the way and use no cell another track uses (pots no circle reaches are
  dropped). Values are drawn at random until the ladder settles the board
  with every total shown; totals are then hidden in a seeded order while
  the band's rung still settles it. For Medium and up a local search
  re-draws one value at a time, keeping a change that leaves the board
  settled and no easier, until the band's rung is needed.
- **Solving:** where inside a pot an arrow ends is not part of the
  answer — a path that runs on past the first cell of its pot only takes
  cells from the others — so each circle's moves are "the first cell of
  each pot it meets" in each direction, up to the edge or another circle.
  A trajectory cover picks one move per circle: no shared cells, at least
  one circle per pot, shown totals exact. The ladder: *single* (a move
  clashing with a settled one, or overfilling a pot, goes; a circle with
  one move left takes it), *area* (a pot that needs every circle still
  able to reach it — by count or by total — gets them all), *overlap*
  (cells every remaining move of a circle uses are its own), *trial*
  (assume a move, follow the rungs below, drop it on a contradiction).
- **Guarantees:** deterministic per seed; exactly one answer (as to which
  pot each circle enters and from which side), proven by the sound ladder
  settling every circle and confirmed by an exhaustive count capped at
  two (a spent budget counts as ambiguous); tests re-prove it with an
  independent search that lets every circle stop on any cell of any pot
  and tells answers apart by pot and direction. Rated by the hardest rung
  the solve needs (meta `rating_basis`, `hardest_technique`): single is
  Easy (Kids on 5×5 or smaller), area Medium, overlap Hard, trial Expert.
  A requested band the board does not reach is served as the nearest one
  and labelled honestly beside `requested_difficulty`.
