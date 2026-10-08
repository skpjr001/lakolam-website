---
title: "Suraromu"
blurb: "Suraromu (Slalom) — one loop from the circle through every gate once, numbered gates in order"
category: puzzle
version: "1.0.0"
---
A slalom course on paper: one loop from the circle through every gate,
taking the numbered gates in order.

## What it is

A square grid with some black cells. Dotted lines run between black cells
(or from a black cell to the edge of the grid): these are the gates. One
cell holds a circle with a number — the number of gates on the course. Some
black cells at the end of a gate hold a number too. The task is to draw a
single closed loop, like a skier's run, that starts at the circle, passes
through every gate exactly once and comes back to the circle.

## How to play

Draw lines between the centres of neighbouring white cells (up, down, left
or right, never diagonally) to make one loop that never crosses, branches or
touches itself. It does not have to visit every cell.

- The loop passes through the circled cell.
- The loop never enters a black cell.
- The loop passes through every gate exactly once, going straight across it
  through one of its cells. It may never run along a gate.
- A number in a black cell at the end of a gate gives that gate's place in
  the order: starting from the circle, gate 1 must be the first gate the
  loop passes, gate 2 the second, and so on. You may set off from the
  circle in either direction. Gates without a number can come anywhere in
  the order.
- The number in the circle tells you how many gates there are in total.

Good places to start: a gate cell squeezed between black cells or the edge
has only one way across. Because each gate is crossed only once, crossing
it in one cell rules out all its other cells. And the last gate before the
loop returns to the circle has the number equal to the circle's number.

## Purpose

Suraromu adds a sense of journey to loop puzzles: the solver is planning a
route, not just closing a shape. It trains route planning, keeping an order
in mind, and spotting the narrow places where the course is forced. The
numbered gates reward thinking about the whole loop at once — which way
round it must run — rather than only about the next step.

## History

Suraromu ("Slalom") is a Nikoli genre and appears on Nikoli's list of
current puzzle types. Otto Janko's archive holds about 200 examples, and the
genre has reached general readers through features such as Atlas Obscura's
series on Nikoli puzzles. Its rules borrow the language of ski racing:
gates, a start, and a course run in order.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 6, 6, 7, 8, 9
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped and the value asked for is
  reported in meta (`requested_size`, `requested_cell`, `requested_line`).
- **Generation:** a random loop with no shortcuts (no two loop cells side
  by side unless they follow each other on the loop) is grown from a
  rectangle by random corner pushes, bulges and pull-backs. A start is
  picked on it, and gates are laid across straight stretches of the loop,
  each bounded by new black cells or the edge, at least two cells long.
  Every other cell off the loop starts black; a gate is shortened (its end
  cell turned black) while it still offers the loop a detour. Gates are
  numbered by their place along the loop and about half of the numbers
  (a third for Hard and Expert, all for Kids) are shown. Spare black cells
  are then removed in random order while the deduction ladder still
  settles everything at the band's rung.
- **Solving:** a ladder on yes/no variables — one per edge between cells,
  one per cell (on the loop or not). *Local*: a loop cell has two loop
  edges, any other none; black cells are off the loop, the circle on it;
  each gate has exactly one cell on the loop; steps along a gate are ruled
  out. *Loop*: no early closing, the possible cells hang together, narrow
  passages are crossed twice or not at all, and the gates met so far
  walking out from the circle each way must fit the numbers for one
  direction of travel. *Trial*: assume a value, keep the opposite on a
  contradiction.
- **Guarantees:** deterministic per seed; exactly one loop, proven because
  the sound ladder settles every variable (`uniqueness_proof`), confirmed
  by a capped exhaustive count when cheap (`count_confirmed`), and
  re-proven in tests by an independent count over the edges alone that
  reads the gate order off each finished loop. Rated by the hardest rung
  needed with size as the tie-break (local: Kids up to 6×6, else Easy;
  loop: Easy up to 6×6, else Medium; trial: Hard up to 8×8, else Expert).
  Every band is reached at its default size. With a custom `size` the
  label states the band actually reached and `requested_difficulty`
  records the request: Kids from 7×7 up is Easy, Medium at 5×5 and 6×6 is
  Easy, Expert up to 8×8 is Hard, Hard from 9×9 up is Expert, and on 5×5
  and 6×6 Hard and Expert often come out Easy (small courses rarely need
  the trial rung).
