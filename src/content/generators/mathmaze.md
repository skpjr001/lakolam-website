---
title: "Math Maze"
blurb: "Maths maze — step only on cells that obey the rule, from start to finish"
category: maths
version: "1.0.0"
---
Find the way from START to FINISH, stepping only on the cells that obey the
rule: correct answers, multiples, factors, primes, even numbers, halves or
calculations that make the target.

## What it is

A grid of cells, each holding a number, a fraction, a calculation or a
calculation with an answer written in. A rule at the top says which cells are
safe — "calculations with the correct answer", "multiples of 6", "prime
numbers", "fractions equal to 1/2", "calculations that make 24" and so on.
The safe cells make exactly one path through the grid; every other cell is a
trap, and the traps beside the path are often look-alikes (7×8=54, 91, 5/11).

## How to play

1. Read the rule at the top of the page.
2. Start at the arrow marked START. That first cell obeys the rule.
3. Move one cell at a time, up, down, left or right — never diagonally — and
   only onto cells that obey the rule. Work each one out: is 7×8 really 56?
   Is 51 prime? Is 6/13 a half?
4. Keep going until you leave the grid at the arrow marked FINISH.

There is only one way through, and it never branches: if two cells next to
you both seem to obey the rule, check your working again. Shading the cells
you step on makes the path easy to see.

## Purpose

A maths maze turns a page of practice into a game: every cell is a question,
and the maze rewards getting them right, because a wrong judgement leads into
a dead end. It works for number facts (times tables, number bonds), number
properties (multiples, factors, primes, parity) and equivalent fractions, and
it is self-checking — a child who reaches FINISH has answered the cells on
the path correctly.

## History

Maths mazes and "answer path" puzzles are a long-standing classroom
favourite, printed in workbooks and puzzle magazines for decades under names
such as number mazes, fact mazes and times-table mazes. They borrow the maze's
pull — find the way out — and give each step a sum to solve.

## This implementation

- **Spec knobs:** `difficulty`; `rule` (`auto`, `correct`, `multiples`,
  `factors`, `primes`, `even`, `half`, `target`); `size` (0 = the level's
  grid, otherwise 4-12 cells a side); `locale` (`us` "Math maze", `uk`/`in`
  "Maths maze"); page `width`/`height`; `line`.
- **Levels:** Kids — 5×5 grid, sums and differences to 10, numbers to 20,
  few look-alikes. Easy — 6×6, facts to 20, multiples of 2, 3, 4, 5 or 10,
  primes to 30. Medium — 7×7, times tables to 10×10, multiples of 3-9,
  factors of 24-48, primes to 50, halves with bottoms to 12. Hard — 8×8,
  multiplication and division to 12×12, factors of 48-96, primes to 100,
  halves to 20ths. Expert — 9×9, two-digit sums and differences, products and
  quotients to 9×19, multiples of 13-25, factors of 120-240, primes to 200,
  halves to 30ths. The chance that a wrong cell beside the path is a
  look-alike (off by one or two, digits swapped, a neighbouring fact, an odd
  number that is not prime) rises from 25% at Kids to 85% at Expert. The
  default is the Medium times-table maze.
- **Generation:** the path is laid first as a random *induced* path — no two
  of its cells touch unless they are next to each other on the path — from a
  cell on the left edge to a cell on the right edge, covering at least 40% of
  the grid. Path cells get items that obey the rule; every other cell gets an
  item checked to break it, in exact integer arithmetic.
- **Solving:** reading each cell against the rule is all it takes; there is
  no search, because the rule cells are the route.
- **Guarantees:** deterministic per seed; exactly one route from START to
  FINISH with no branches and no dead ends — proven by counting: the cells
  obeying the rule form one connected group in which the two ends have one
  obeying neighbour and every other cell exactly two, which is a simple path
  and nothing else. Tests re-read every printed label with a separate
  evaluator and count routes by depth-first search (cap 2). Rated by grid
  size, number range and look-alike density, fixed per level.
