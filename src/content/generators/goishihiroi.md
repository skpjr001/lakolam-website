---
title: "Pick Up Stones (Goishi Hiroi)"
blurb: "Goishi Hiroi — pick up every stone, going straight to the next one and never turning back, in the one order that works"
category: maze
version: "1.0.0"
---
Pick up every stone in one go — straight lines only, and never back the way
you came.

## What it is

A board of lines with stones sitting where lines cross. The stones have to
be picked up one after another in a single trip, and the rules about how
you may move between them leave exactly one order that collects them all.
The board can be a plain square or a shape — a diamond, a circle, a heart,
a cross or a ring — which makes it a friendly, large-print page for younger
solvers and for anyone who enjoys a calm puzzle.

## How to play

- The page marks the first stone with a 1. Pick it up.
- From the stone you are on, go straight along a line of the board — up,
  down, left or right — to the next stone on that line, and pick it up.
- You cannot jump over a stone that is still there. You may cross spots
  where stones have already been picked up.
- At each stone you may carry straight on or turn left or right, but you
  may never go back the way you came.
- You cannot leave the board: the lines stop at its edge.
- Number the stones 1, 2, 3 and so on in the order you pick them up.

Every stone gets picked up, and only one order works. On the harder version
no stone is marked, and finding where to start is part of the puzzle.

## Purpose

Planning ahead with a simple rule. Each move has only a few choices, so the
puzzle is easy to start, but a careless choice strands a stone that can no
longer be reached — the solver learns to look for stones that have only one
way in and to save them for the right moment. It is a gentle exercise in
sequencing and spatial attention that suits children, older adults and
puzzle-book readers alike.

## History

Goishi hiroi ("picking up go stones") is an old Japanese pastime played
with go stones laid on the points of a go board; it appears in Edo-period
puzzle collections, including a book of 1727. Under the name *Hiroimono* it
was shown in 2007 by Daniel Andersson to be NP-complete, which is why a
large board can still be a real challenge. Puzzle apps and puzzle magazines
keep it alive today.

## This implementation

- **Spec knobs:** `difficulty` (Kids 6×6 board with 10 stones, Easy 7×7
  with 15, Medium 8×8 with 20, Hard 9×9 with 25, Expert 10×10 with 30),
  `size` (0 = the level's; otherwise 5–14 points a side), `stones` (0 = the
  level's; otherwise 6–32), `shape` (square, diamond, circle, heart, cross,
  ring), `show_start`, `large_print` (bigger instructions and heavier
  stones), `width`, `height`, `line`. A shape other than the square gets a
  board big enough to hold about as many points as the level's square. At
  most 32% of the board's points take stones, and at most 20 stones when
  the start is hidden; a smaller count is reported as `requested_stones`,
  and other clamps as `requested_<field>`.
- **Generation:** a random legal pick-up walk is laid on the board (a new
  stone may not sit on a point an earlier move crossed, since it would have
  blocked that move). It is then improved by hill-climbing on the number of
  *forced* moves from the start — moves where every other legal move can no
  longer be completed to a full pick-up: the walk is cut at or just before
  its first real choice and a new random tail is laid, keeping the change
  when the forced run does not get shorter. A walk whose every move is
  forced (and, with the start hidden, from whose other stones no full
  pick-up exists) is the only order. If a walk stalls, fewer stones are
  tried. A hidden-start layout too sparse to be unique marks its start and
  reports `requested_show_start`.
- **Solving:** an exhaustive count of complete pick-up orders over (stones
  left, current stone, arrival direction), memoised, with a dead-end check
  (a stone that shares no line with any stone still down can never be
  reached), capped at 2. A count that spends its node budget is treated as
  ambiguous, never unique.
- **Guarantees:** exactly one order picks up every stone (`unique: true`),
  proven by that count before a page is served. Tests re-prove it on the
  board itself, point by point, with a separate memoised count over the
  occupancy grid, and on small layouts with a plain unmemoised search; they
  also replay the order by hand (straight moves, no reversal, no jumped
  stone, never off the board). Rated by stones — Kids up to 12, Easy 13–17,
  Medium 18–22, Hard 23–27, Expert 28 or more — one band lower when fewer
  than a quarter of the stones offer a real choice, one band higher when the
  start is hidden (`rating_basis: stones_and_choices_along_the_order`).
  Because a hidden start is capped at 20 stones, Expert with a hidden start
  is served as Hard, labelled with `requested_difficulty`. The key numbers
  every stone and draws the route.
