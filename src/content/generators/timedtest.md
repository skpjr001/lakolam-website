---
title: "Timed Test"
blurb: "Timed tests — mad-minute fact drills and fact-frenzy grids"
category: maths
version: "1.1.0"
---
Fact drills against the clock: a page of 20, 30, 50 or 100 basic facts, or
a 10 x 10 frenzy grid with shuffled headers, with TIME and SCORE boxes.

## What it is

Two kinds of page. A **drill** is a full page of basic facts, stacked in
columns or written on one line, with a TIME and SCORE box at the top and,
for books of daily practice, a DAY counter. It can cover every fact of an
operation in a range ("multiplication facts 0-10") or a single family
("multiplying by 7"). A **frenzy** is a square grid: the top row and the
left column hold the same numbers in two different shuffled orders, and
every empty square is filled with the row number plus, or times, the
column number. The answer key shows every answer in red.

## How to play

Start the clock (or have someone time you) and write the answer to each
fact as fast as you can, working across each row. Do not stop on one you do
not know: skip it and come back. When you finish, write your TIME, then
check your answers and write your SCORE out of the total.

For a frenzy grid, pick a square, find its number at the start of the row
and at the top of the column, and add them or multiply them (the sign in
the top corner tells you which). Write the answer in the square. Filling
the grid in any order you like is part of the fun, and the shuffled
headers mean you cannot just count along.

Repeat the same kind of page each day and watch your time drop and your
score climb.

## Purpose

Fluent recall of the basic facts frees working memory for multi-digit
arithmetic, fractions and algebra. Short daily timed practice, with the
child competing against their own previous time and score, is a
long-standing way to build that fluency. Single-family drills ("x 7")
target the facts a child is learning now; full-range drills and frenzy
grids check that the whole set is secure.

## History

One-minute fact tests, popularised in American classrooms as "Mad
Minutes" from the 1970s, descend from the speed drills of early
20th-century arithmetic reform; the scrambled multiplication grid is a
long-standing classroom favourite in the UK and elsewhere, a shuffled
cousin of Pythagoras's multiplication table.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`drill` or `frenzy`); `operation`
  (`add`, `sub`, `mul`, `div`, `addsub`, `muldiv`, `mixed`); `focus` (one
  family, e.g. 7); `min` and `max` (the numbers in the facts, 0-20);
  `problems` (10-100 for drills; 20, 30, 50 and 100 are the classic sizes);
  `layout` (`vertical` or `horizontal`; division is always on one line);
  `size` (frenzy N, 5-12); `time_box`; `day`; `locale`; page `width`,
  `height`, `line`.
- **Difficulty (grade):** Kids = addition 0-5, 20 problems (K-1); Easy =
  addition and subtraction 0-10, 30 problems (grade 1-2); Medium =
  multiplication 0-10, 50 problems (grade 3); Hard = multiplication and
  division 0-10, 50 problems (grade 3-4); Expert = all four 0-12, 100
  problems (grade 4-5). Frenzy grids add for addition and subtraction
  levels and multiply otherwise, over 0 to N-1 (addition) or 1 to N
  (multiplication) unless a range is given.
- **Generation:** a drill first lists its fact set. Addition and
  multiplication facts are unordered pairs (3 x 7 and 7 x 3 are one fact;
  each problem shows it one way round at random). Subtraction facts are
  `(a + b) - a` and division facts `(a x b) / a` with `a` at least 1, for
  a, b in the range (a focus fixes `a`), so they are exact and never
  negative. The page takes whole copies of the set while they fit, then
  a random selection of distinct facts for the rest, shuffles, and moves
  equal facts apart. A frenzy picks N distinct numbers from the range and
  shuffles them twice, once for the rows and once for the columns.
- **Solving:** answers are exact whole numbers, checked in the tests by
  the inverse operation.
- **Guarantees:** deterministic per seed. Drill coverage: when the page has
  at least as many problems as the set has facts, every fact appears at
  least once and no fact appears more than once more often than any other
  (all 66 multiplication facts 0-10 fit in a 100-problem page); when it has
  fewer, no fact repeats. Frenzy: the row and column headers are each a
  permutation of the same N distinct numbers, and every square's key
  answer is the row number plus or times the column number. Proven in the
  tests. Meta records `answers_checked`, the fact-set size,
  `every_fact_covered`, the grade and `rating_basis:
  operation_range_and_count`. A page takes a few milliseconds.
- **Out-of-range knobs (1.1.0+):** a knob the sheet cannot print is brought
  into range instead of refused, and meta names it in `adjusted`: `problems`
  to 10–100, `min`/`max` to 0–20 (swapped when reversed; division reaches at
  least 1), `focus` to 0–20 (1 for division), a frenzy `size` to 5–12 with
  its range widened to hold that many numbers, and vertical `layout` with
  division becomes horizontal.

