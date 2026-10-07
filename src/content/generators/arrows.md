---
title: "Arrows"
blurb: "Arrows (Pfeile) — an arrow in every border cell; each number counts the arrows pointing at it"
category: puzzle
version: "1.0.0"
---
Aim an arrow from every border cell so that each number counts exactly the
arrows pointing at it.

## What it is

A square of numbers is framed by a ring of empty grey cells (the four
corners are left out). Every grey cell needs an arrow pointing straight or
diagonally into the square. An arrow points at every cell on the line in
front of it, all the way across. Each number tells you how many arrows point
at its cell. Sometimes an arrow or two is drawn in to start. There is
exactly one way to draw them all.

## How to play

1. Draw one arrow in every grey cell. It must point into the numbered
   square: straight across, or diagonally.
2. An arrow points at every cell along its line, not just the first one.
3. Each number must equal the number of arrows pointing at its cell.

Zeros are the best place to start: no arrow may point through a 0, which
rules out directions for many border cells at once. A big number near the
edge can often be reached by only a few arrows, so all of them must point
at it. Each arrow you settle lowers the count still needed by every cell on
its line.

## Purpose

A counting puzzle that looks nothing like a digit grid: the numbers are all
given, and the work is in the lines that cross the square. It trains the
same habit as Minesweeper — weighing every clue a choice touches — on a
small, tidy board that suits a quick newspaper slot.

## History

Arrows (German *Pfeile*) is credited to Masayuki Nagashima (1994) and
became a staple of German and Dutch puzzle magazines; it also appears in
World Puzzle Federation contests. The rules follow the WPF statement: an
arrow in each cell outside the grid, pointing in one of the eight
directions at the numbered cells, each number counting the arrows that
point at it. Here every cell of the square carries a number, so every arrow
automatically points at numbered cells.

## This implementation

- **Spec knobs:** `difficulty`; `size` (side of the numbered square, 3–8;
  0 = picked from the difficulty: 4 for Kids, 5 Easy, 6 Medium and Hard,
  7 Expert); `cell`; `line`.
- **Generation:** answer first. Every border cell gets a random direction
  that enters the square and every number is counted from them. Arrows are
  then drawn in, in a seeded order, until the deduction ladder settles every
  arrow, and removed again wherever the board still settles without them —
  most boards print none or one or two.
- **Solving:** a yes/no engine with one variable per arrow direction. The
  first rung is *counting*: a number already met rules out every other
  arrow aimed at it, and a number that needs every remaining arrow that
  could reach it takes them all. The second rung is *trial*: assume one
  direction and strike it if counting then contradicts (one level deep,
  never a search).
- **Guarantees:** deterministic per seed. Every board settles arrow by
  arrow with sound rules, which proves the answer unique; tests re-prove it
  with an independent capped count that tries every direction of every
  arrow. Rated by the hardest rung needed and the size: counting alone is
  Kids up to 4×4, Easy at 5×5 and Medium above; a board that needs trial is
  Hard up to 6×6 and Expert above. A size that cannot reach the requested
  band (a 3×3 at Expert) is rated honestly at the nearest band, and meta
  records `requested_difficulty`.
