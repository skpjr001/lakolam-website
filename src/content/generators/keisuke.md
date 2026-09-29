---
title: "Keisuke"
blurb: "Keisuke - fit the listed numbers into the grid like a digit crossword"
category: puzzle
version: "1.0.0"
---
A crossword with digits instead of letters: fit every listed number into the
grid so the crossings agree.

## What it is

A grid of white and black squares, like a small crossword, and two lists of
numbers — one for across, one for down — grouped by how many digits they
have. Every white stretch of two or more squares holds exactly one listed
number, reading left to right or top to bottom. Sometimes one digit is
already printed in the grid to get you started.

## How to play

Write one digit in every white square so that each across stretch spells a
number from the across list and each down stretch spells a number from the
down list. Every listed number is used exactly once, and a number only fits a
stretch of its own length.

Start where a length leaves no choice: if only one across stretch has five
squares and only one five-digit across number is listed, it goes there.
Every number you place fills digits in the stretches that cross it, and those
digits rule out numbers that do not match. Look too for a number that fits
only one stretch. When that stalls, compare crossings: if every number that
could go down through a square starts with a 3 or a 7, any across number
needing a different digit in that square is out.

## Purpose

A fill-in puzzle that needs no vocabulary, so it works across languages and
ages, and a gentle bridge from word crosswords to number logic. Placement is
pure pattern matching — lengths and crossing digits — which makes small
grids suitable for children while large open grids take real bookkeeping.

## History

Keisuke is a modern Japanese-named number fill-in in the kakuro family, found
in puzzle magazines and apps. It descends from the fill-in (or "Kriss Kross")
puzzle, where a list of words is fitted into a blank crossword grid, a
long-standing magazine staple; Keisuke keeps the grid and trades the words
for numbers.

## This implementation

- **Spec knobs:** `rows` and `cols` (5-12), each 0 to pick from the
  difficulty (Kids 5×5 up to Expert 9×9); `difficulty`, `cell`, `line`.
- **Generation:** a rotationally symmetric black pattern is carved at random,
  then repaired: no stretch longer than seven, no white square outside a
  stretch of two, one connected white area covering at least half the grid.
  Every white square gets a random digit 1-9 and the lists are read off. The
  board is kept only if the placement is unique with no starting digit, or
  with one starting digit; among the options that are unique, the one rated
  nearest the requested band is printed (no digit when that is as good).
- **Solving:** a sound placement ladder — *single* (a stretch only one
  unused number still fits), *hidden* (a number that fits only as many
  stretches as copies remain) and *crossing* (the digits each square can
  still take from both of its stretches; numbers needing any other digit are
  struck). A board the ladder cannot finish is rated *search*.
- **Guarantees:** deterministic per seed; exactly one placement, proven by an
  exhaustive stretch-by-stretch search (always filling the stretch with the
  fewest fitting numbers, cap 2; a search that runs out of budget counts as
  ambiguous) and checked independently in the tests by a digit-by-digit
  count that matches every stretch's prefix against the lists. Difficulty is
  the size tier (up to 18 white squares, up to 34, beyond) plus the rank of
  the cheapest ladder rung that finishes the board (single 0, hidden 1,
  crossing 2, search 3), capped at Expert; the search's node and branch
  counts are kept as the board's search effort. Digits run 1-9 (no zero).
  Random fills are usually settled by single and crossing steps, so Hard and
  Expert come from larger grids with crossing reasoning rather than from
  guessing; a size given explicitly keeps its tier, so the nearest honest
  band is returned when the requested one is out of reach.
