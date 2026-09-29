---
title: "Arithmagons"
blurb: "Arithmagons — each side is the sum or product of its two corners; fill in the rest"
category: maths
version: "1.0.0"
---
Triangles, squares and pentagons whose side numbers are made from their
corners: find the missing numbers.

## What it is

An arithmagon is a polygon with a circle at every corner and a square on
every side. The number in each square is made from the two circles at the
ends of that side — their sum, or on the harder puzzles their product (the
sign in the middle of the shape says which). Some numbers are filled in; you
find the rest. Every puzzle has exactly one answer.

## How to play

1. Look at the sign in the middle: **+** means each square is the two circles
   added together; **×** means they are multiplied.
2. Find a side where you know two of its three numbers, and work out the
   third: add the two circles, or take one circle away from the square (divide
   the square by the circle for ×).
3. Keep going round the shape until every circle and square is filled.
4. If every side has two unknowns, think about the whole shape. For a +
   triangle with only its squares given: add the two squares next to a
   corner, take away the square opposite, and halve the result — that is the
   corner. For a + pentagon: add the two squares next to a corner,
   take away the two squares beyond those, add the square opposite, and halve. For a × triangle, multiply the two squares
   next to a corner, divide by the square opposite, and find the number that
   multiplies by itself to give the answer.

Check your answer: every square must match its two circles.

## Purpose

Arithmagons practise addition and subtraction (or multiplication and
division) as inverses, and the harder ones lead naturally into algebra: a
triangle given only its sides is three equations in three unknowns, and
solving it by reasoning is a first taste of simultaneous equations.

## History

Arithmagons ("arithmetic polygons") have been used in British and Australian
mathematics teaching since at least the 1980s, popularised by resources such
as NRICH, as a low-floor, high-ceiling task: young children fill in sums,
older students generalise to formulas and discover why squares behave
differently from triangles.

## This implementation

- **Spec knobs:** `difficulty`; `shape` (`auto`, `triangle`, `square`,
  `pentagon`); `operation` (`auto`, `sum`, `product`); `negatives` (allow
  negative corners in sum puzzles, rated Expert); `count` (1-8 puzzles,
  default 6); page `width`/`height`; `line`.
- **Levels:** Kids — + triangles with corners to 10, solvable one side at a
  time. Easy — + triangles, squares and pentagons with corners to 20, one side
  at a time. Medium — + triangles showing only their sides (corners to 30).
  Hard — + pentagons showing only their sides, or × triangles and squares
  solvable one side at a time. Expert — × triangles, squares and pentagons that
  cannot be solved one side at a time (usually showing only their sides), and
  + puzzles with negative corners when `negatives` is on.
  A spec whose shape or operation cannot reach the requested band (a +
  square can always be solved one side at a time, so it is never Medium) gets
  the nearest honest band, recorded as `difficulty` beside
  `requested_difficulty`.
- **Generation:** corners are drawn at random, sides computed, and a set of
  givens chosen — either all the sides (plus one corner on a square), or a
  random mix of corners and sides. A candidate is kept only if its answer is
  unique and its rating matches the band.
- **Solving:** a chain solver fills any side with one unknown until it
  stalls; puzzles it finishes are *chain* puzzles, the rest need the whole
  system (the formulas in How to play).
- **Guarantees:** deterministic per seed; exactly one answer. For sums, the
  givens are linear equations in the corners and are kept only when they have
  full rank (exact fraction-free Gaussian elimination) — an odd polygon's
  sides alone always do, an even polygon's never do, so squares always show a
  corner. For products, each hidden corner ranges over the divisors of a given
  side beside it and an exhaustive search counts answers (cap 2). Tests
  re-check every puzzle with a brute-force search over a box of values (every
  value up to twice the largest number shown — which holds every possible
  positive answer) and confirm the chain/system rating. All numbers are
  positive whole numbers unless `negatives` is on.
