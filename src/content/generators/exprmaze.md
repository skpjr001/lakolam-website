---
title: "Expression Path"
blurb: "Expression Path — walk numbers and signs from START to GOAL; the one path whose sum, worked as you go, makes the target"
category: maze
version: "1.0.0"
---
Walk a grid of numbers and signs from START to GOAL, working out the sum as you go: only one path lands on the target.

## What it is

A maze made of a sum. The grid is a checkerboard of numbers and signs (+, –,
× and ÷): every step up, down, left or right takes you from a number to a
sign or from a sign to a number. So any path from START to GOAL reads like a
sum, such as 6 + 4 × 3 – 5 ÷ 7, and the TARGET printed at the top is what
exactly one of those paths works out to. Shaded squares are walls.

Five levels: a 5×5 grid with only + and – for young children, 5×5 with
+ – ×, then 5×7, 7×7 and 9×9 grids with all four signs.

## How to play

1. Start on the number marked START, in the top left corner. That number is
   your running total.
2. Step up, down, left or right onto a sign, then onto the number beyond
   it. Do the sum to your running total straight away: if your total is 12
   and you step over ÷ onto 3, your total is now 4.
3. Work strictly in the order you walk, one step at a time, not with the
   "times and divide first" rule from school: 2 + 3 × 4 along a path is
   5 × 4 = 20.
4. Never use a square twice, and never step onto a shaded square.
5. Your running total must always be a whole number from 0 to 99. A
   division has to come out exactly, a subtraction may not take you below 0,
   and nothing may take you past 99. A step that breaks this rule is a dead
   end.
6. Finish on GOAL, in the bottom right corner. Your total there must be the
   TARGET. Only one path does.

Jot your running total in the margin as you go. When a path dies — a
division that does not come out, a total that would go below 0 — back up
to the last place you had a choice and try another way.

## Purpose

Mental arithmetic with all four operations and a reason to do it: every
step is a calculation, and every dead end is one that does not work. Solvers
practise keeping a running total, divisibility ("is 42 a multiple of 4?"),
working backwards from the target ("to finish with ÷ 3 I need 54 just
before"), and the patience to try a route, check it and give it up. It also
makes a memorable lesson in order of operations: the same signs give a
different answer when they are worked in the order you walk.

## History

Arithmetic mazes, in which the squares you pass make a calculation that must
come out to a given number, are a long-standing blend of maze and number
drill in puzzle books, maths magazines and classroom worksheets, from
simple "add up the path" mazes for children to grids of numbers and
operators for adults. This version is our own design: numbers and signs
alternate on a checkerboard so that every walk is a well-formed sum, the
sum is worked strictly in walking order with a running total kept from 0
to 99, and the generator proves that only one path reaches the target.

## This implementation

- **Spec knobs:** `difficulty` (Kids: 5×5 with + and –; Easy: 5×5 with
  + – ×; Medium: 5×7 with all four; Hard: 7×7; Expert: 9×9),
  `operators` (`auto` — the level decides; `add_subtract`; `all`. The grid
  is the level's; + and – alone rate one band easier, so Hard with
  `add_subtract` is served as Medium on the 7×7, and Kids with `all` as
  Easy on the 5×5, each with `requested_difficulty` in meta), `max_number` (0 = the level decides, 9;
  otherwise 3–20, clamped and reported as `requested_max_number`), `cell`
  (square size, 24–90 pt) and `line` (grid line width, 0.4–4 pt).
- **Generation:** a random self-avoiding path is planted from the top-left
  square to the bottom-right one, a little under half the grid long and
  longer on bigger grids, with no shortcuts (no two of its squares touch
  unless they are consecutive), so any other path has to leave it
  somewhere. A sum is written along it whose running total stays from 3 to
  80 where it can, so no step collapses it to 0 or 1, × 1 and ÷ 1 never
  appear and the signs vary; the last step aims for a target of 25 or more.
  The other squares are filled at random, and on the larger grids some
  signs off the path become walls (none on 5×5, about a tenth on 5×7, a
  quarter on 7×7, two fifths on 9×9, and a fifth more with + and – alone,
  where almost every step is legal) so the maze has corridors and dead
  ends. Several sums are tried on the same path and the one that the fewest
  other paths also reach is kept. A local search then changes one square
  at a time off the path — mostly the squares many rival paths use; a new
  number, a new sign, now and then a wall — keeping each change unless it
  lets more rivals through, until none is left. A board that cannot be
  finished is thrown away; if very small numbers with + and – alone never
  give a single path, the number range is widened a step at a time and the
  range asked for is reported.
- **Solving:** an exhaustive depth-first search over every simple path from
  START, pruned by the arithmetic rules (a step whose result is not a whole
  number from 0 to 99 is dead) and by a bitboard flood fill that drops any
  path cut off from GOAL. It counts the paths other than the planted one
  that end on the target; a search that spends its node budget proves
  nothing, and that board is discarded. The final proof's node count is in
  meta as `search_nodes`.
- **Guarantees:** exactly one path from START to GOAL, never repeating a
  square or using a wall, whose sum worked left to right stays a whole
  number from 0 to 99 and makes the target (`unique: true`). Tests re-prove
  it with an independent plain depth-first count of every such path,
  capped at 2, that walks squares one at a time and checks reachability by
  breadth-first search, and re-walk the answer square by square (adjacent,
  number and sign alternating, no repeats, every step's arithmetic, the
  target). Rated by the grid and the operators (`rating_basis`): 5×5 Easy,
  5×7 Medium, 7×7 Hard, 9×9 Expert, one band easier with + and – alone;
  meta also records `path_length`, `numbers_on_path`, `walls` and
  `search_nodes`.
- **Structured data:** `kind: "exprmaze"`, `rows`, `cols`, `cells` (every
  square as printed, row-major: a number, a sign `+ - × ÷`, or null for a
  wall), `givens`, `blocked` (the wall squares), `start`, `goal`, `target`,
  `cap` (99), `solution` (the one path's squares from START, signs
  included) and `totals` (the running total after each number on it).
- **Pages:** the page shows the title, the rules, the boxed TARGET and the
  grid — numbers bold, signs smaller and grey, walls shaded, START and GOAL
  ringed and tagged. The answer key draws the path through the square
  centres, one step at a time, and writes the working out below the grid.
