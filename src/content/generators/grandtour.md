---
title: "Grand Tour"
blurb: "Grand Tour — one loop through every dot of the grid, using every given segment"
category: puzzle
version: "1.0.0"
---
One loop through every dot: a few segments are drawn for you, and the rest of
the tour is yours to find.

## What it is

A rectangle of dots with a handful of short line segments already drawn
between neighbouring dots. The task is to complete a single closed loop that
runs along the grid lines, visits every dot exactly once and uses every
segment that is already there. There are no numbers and no symbols — just
dots, lines and the one tour that fits them.

## How to play

Draw lines between neighbouring dots (across or up and down, never
diagonally) to make one closed loop.

- The loop must pass through every dot exactly once, so every dot ends up
  with exactly two lines: one in, one out.
- Every segment already drawn is part of the loop.
- The loop never crosses or touches itself, and it is all one piece: there
  must not be two separate loops.

Good places to start: a corner dot has only two neighbours, so both of its
lines are certain. A dot that already has two lines is finished — rule out
its other directions. A dot on the edge with one way blocked has few
choices left. Watch out for closing a small loop too early: any line that
would close a loop before every dot is on it must be left out.

## Purpose

Grand Tour is the purest of the loop puzzles: nothing to count and nothing
to decode, only the logic of "every dot needs exactly two lines" and "one
loop, not several". That makes the rules quick to learn for any age, while
the bigger boards still demand careful look-ahead. It exercises spatial
planning, spotting forced moves, and avoiding dead ends.

## History

The puzzle was introduced in the early 1990s by the setter known as "Stitch"
in *Dell Champion Variety Puzzles*, and has since appeared under several
names: Loop Finder, Round Trip and Monorail. Otto Janko's archive holds
hundreds of examples, and Glenn Iba extended the idea to other dot
patterns. Mathematically the loop is a Hamiltonian cycle of the grid graph —
which is why a grid with an odd number of dots never has one.

## This implementation

- **Spec knobs:** `size` (dots per row, 4–12; 0 picks from the difficulty —
  6, 6, 8, 8, 10 from Kids to Expert; an odd size gets one extra row, so 7
  gives a 7 × 8 board, because a loop through every dot needs an even
  number of dots), `difficulty`, `cell` (dot spacing, 18–90 pt), `line`
  (segment weight, 0.2–4 pt). Out-of-range numbers are clamped and the value
  asked for is reported in meta (`requested_size`, `requested_cell`,
  `requested_line`).
- **Generation:** a serpentine loop through every dot is scrambled by
  random square flips — two parallel loop sides of a unit square swapped
  for the other two. A flip that splits the loop is followed at once by a
  flip that joins the halves again. Every loop segment starts as a given;
  givens are removed in random order while the deduction ladder still
  settles every segment at the band's rung.
- **Solving:** a ladder on yes/no variables, one per segment between
  neighbouring dots. *Local*: every dot has exactly two segments. *Loop*:
  no loop may close before it holds every dot, the possible segments must
  hang together, and a narrow passage is crossed twice or not at all.
  *Trial*: assume a segment, follow the consequences, keep the opposite on
  a contradiction.
- **Guarantees:** deterministic per seed; exactly one loop, proven because
  the sound ladder settles every segment (`uniqueness_proof`), confirmed by
  a capped exhaustive count when it fits its budget (`count_confirmed`),
  and re-proven in tests by an independent path search from the corner dot.
  Rated by the hardest rung needed with the dot count as the tie-break
  (local: Kids up to 42 dots, else Easy; loop: Easy up to 42 dots, else
  Medium; trial: Hard up to 72 dots, else Expert). Every band is reached at
  its default size. With a custom `size` the label states the band actually
  reached and `requested_difficulty` records the request: Kids on boards
  above 42 dots is Easy, Medium on small boards is Easy, Expert up to 72
  dots is Hard, Hard above 72 dots is Expert, and on a 4 × 4 board the
  trial rung is rarely needed, so Hard and Expert usually come out Easy.
