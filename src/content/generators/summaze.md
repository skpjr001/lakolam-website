---
title: "Sum Maze"
blurb: "Sum maze — find the one path from START to END whose numbers add up to the target"
category: maze
version: "1.0.0"
---
A grid of numbers with no walls: find the one path from START to END whose
numbers add up to exactly the target.

## What it is

A maze made of arithmetic. Every square holds a number, and there are no
walls to stop you — any route from START to END is allowed, as long as it
steps between touching squares and never visits a square twice. What makes
it a maze is the target printed at the top: the numbers on your path must
add up to exactly that total, and only one path in the whole grid does.

Five sizes, from a 4×4 grid of numbers up to 5 for young children to a 6×6
grid of numbers up to 20 (and 7×7 as an option).

## How to play

1. Start on the square the START arrow points to. Its number counts.
2. Step up, down, left or right to a touching square, adding its number to
   your running total. Never step on a square you have already visited.
3. Finish on the square next to the END arrow (its number counts too). Your
   total must be exactly the target.

Keep a running total in the margin. If it passes the target before you
reach END, back up and try another way. If you reach END short of the
target, look for a longer way round. Exactly one path works.

## Purpose

Mental addition with a reason to do it: every step is a sum, and every
dead end is a sum that went over. Solvers practise adding single and double
digits, keeping a running total, estimating ("I still need about 20, and END
is four squares away"), and backtracking — trying a route, checking it and
giving it up when the numbers say no.

## History

Number-path mazes in which the squares you pass must add up to a given
total are a long-standing blend of maze and addition drill in maths puzzle
collections and classroom worksheets. Erich Friedman's Puzzle Palace, a
long-running online collection of original puzzles, features many puzzles
of this kind, where a path through a grid of numbers must meet an
arithmetic condition.

## This implementation

- **Spec knobs:** `difficulty` (Kids: 4×4 with numbers 1–5; Easy: 5×5, 1–9;
  Medium: 6×6, 1–9; Hard: 6×6, 1–15; Expert: 6×6, 1–20), `size` (0 = the
  level decides; otherwise 4–7), `max_value` (0 = the level decides;
  otherwise 3–20, at least 4 on 6×6 and 5 on 7×7), `width`, `height`, `line`.
  START is on the left edge and END on the right edge (corners on 4×4).
- **Generation:** a random self-avoiding path is planted from START to END,
  covering a third to nearly half the grid, and refused if its squares could
  be walked in another order (numbers could never tell those two apart).
  Numbers start low on the path and higher elsewhere, and the target is the
  path's total. A local search then changes one number at a time — mostly on
  squares that rival paths use — keeping each change unless it lets more
  rival paths through, until no other path has the target total. A second
  pass evens the numbers out (raising path numbers, lowering the rest) as
  far as it can while no rival appears, so small numbers do not simply mark
  the way. A board that cannot be finished is thrown away and a fresh one
  planted; if a very small number range on a big grid never works, the range
  is widened a step at a time and the range asked for is recorded.
- **Solving:** an exhaustive depth-first search over every simple path from
  START, pruned by the running total (numbers are all positive, so a total
  past the target is dead), by the least the remaining distance to END can
  add, and by a bitboard flood fill that drops any path cut off from END.
  It looks for any path other than the planted one with the target total;
  a search that spends its node budget proves nothing, and that board is
  discarded.
- **Guarantees:** exactly one path from START to END, never repeating a
  square, whose numbers add up to the target (`unique: true`), re-proved in
  tests by a plain depth-first count of every such path, capped at 2,
  without the generator's pruning. Rated by the grid and the numbers
  (`rating_basis: grid_size_and_number_range`): 4×4 Kids, 5×5 Easy, 6×6
  Medium, 7×7 Hard, one band harder for numbers past 9 and another past 15,
  one band easier for numbers of 5 or under. On the larger boards the path's
  numbers still run somewhat smaller on average than the rest — the price of
  a single answer, since a path whose total sits in the crowded middle of
  all possible totals always has rivals.
