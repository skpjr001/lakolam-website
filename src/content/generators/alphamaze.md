---
title: "Alphabet Maze"
blurb: "Alphabet maze — step A to Z (or count, skip-count, or follow a shape pattern) through touching squares"
category: maze
version: "1.0.0"
---
A grid of letters with no walls: say the alphabet and step from A to Z
through touching squares. Or count, skip-count, or follow a shape pattern.

## What it is

A maze made of a sequence. Every square holds a letter, a number or a shape,
and the way through is hidden in plain sight: from START you may only step
to a touching square that holds the *next* item. Wrong turns are everywhere —
a second C next to your B, a 15 that leads nowhere — but only one path runs
all the way to GOAL.

Six sequences: the alphabet (A to Z), counting by ones, skip-counting by
twos, fives or tens, and a repeating pattern of shapes (circle, square,
triangle, and a star on the harder levels).

## How to play

1. Find START. It holds the first item: A, 1, 2, 5, 10 or the first shape of
   the pattern shown at the top of the page.
2. Look at the squares touching yours — up, down, left or right (on the
   harder levels diagonally too). Step to one that holds the next item: B
   after A, 4 after 2, the next shape in the pattern.
3. Keep going, one item at a time, until you reach GOAL. Draw a line as you
   go.

Some squares hold the right next item but lead nowhere: if you get stuck,
go back to the last square where you had a choice and try the other way.
Other shapes or numbers that are not in the sequence are never part of the
path.

## Purpose

Letter order and counting become something you *do* with a pencil, not a
list you recite. Young children practise the alphabet, counting to 50 and
the times-table skip-counts (2s, 5s, 10s); the pattern version practises
spotting and continuing a repeating pattern, an early algebra skill. Every
step also asks the solver to scan the neighbours and to back out of a dead
end — first planning and checking.

## History

Alphabet and number-sequence mazes are a staple of preschool and early-years
worksheets ("ABC mazes", "count to 20 mazes", "skip-counting mazes") and of
activity books for young children. The pattern form echoes the colour and
shape mazes of logic-maze designers such as Robert Abbott, in which you must
move through colours in a fixed rotation.

## This implementation

- **Spec knobs:** `difficulty` (Kids: a roomy grid and few choices; Easy and
  Medium: more decoys and more places to choose; Hard: diagonal steps too;
  Expert: diagonal steps and a choice at most squares), `sequence`
  (`alphabet` — the default — `count`, `twos`, `fives`, `tens`, `shapes`),
  `length` (0 = the default: 26 letters, otherwise 12–50 items by level and
  sequence; alphabet 5–26, others 6–80), `size` (0 = sized to the route and
  level; otherwise 4–14), `diagonal` (unset = the level decides), `width`,
  `height`, `line`.
- **Generation:** one self-avoiding walk is planted for the answer (in the
  shape pattern it may not touch an earlier square of the shape that follows
  it, and diagonal steps never cross). The other squares are then filled by
  local search: mostly with the item that follows a neighbour (a tempting
  wrong turn), otherwise with any earlier item, a near miss off the count
  (such as 12 among the fives) or a shape outside the pattern. No decoy shows
  the last item, so there is only one GOAL to find.
- **Solving:** the board is a graph on squares with an edge wherever the
  next item touches. A fill is kept only while the squares that lie on any
  START-to-GOAL route are exactly the planted walk — then the walk is the
  only way through, and every branch off it is a dead end. Within that, the
  search steers the number of *decision points* (route squares with more
  than one way on) into the level's band and makes as many squares
  reachable as it can.
- **Guarantees:** exactly one route from START to GOAL that follows the
  sequence and never repeats a square (`unique: true`), re-proved in tests
  without the generator's search — co-reachability by fixpoint iteration,
  then a depth-first count of simple routes capped at 2 — and replayed
  item by item from the printed grid. Rated by the share of route squares
  that offer a choice (under 12% Kids, 25% Easy, 40% Medium, 55% Hard, more
  Expert), one band harder with diagonal steps
  (`rating_basis: decision_points_and_diagonal_steps`). A level whose band
  the grid cannot reach (for example Expert without diagonals) is served
  the nearest maze with its honest rating. If a long route does not fit a
  small grid, it is shortened and `requested_length` records the request.
  The key shades the route and draws it in red.
