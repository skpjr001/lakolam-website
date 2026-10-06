---
title: "Number Search"
blurb: "Number Search — find each listed number in a grid of digits; every one appears exactly once"
category: maths
version: "1.1.0"
---
Find every number on the list hidden in a grid of digits.

## What it is

A word search with numbers. The grid is filled with digits, and the list
below it gives the numbers to find — four to eight digits long. Each one
runs in a straight line: across, down or diagonally, and on the harder
pages backwards too. Every number on the list appears in the grid exactly
once.

## How to play

- Pick a number from the list and look for its first two digits side by
  side, then follow that direction to check the rest.
- Numbers run in a straight line, without gaps. The instructions at the top
  of the page say which directions are used: on the easier pages numbers
  read forwards (left to right, top to bottom, and down the diagonals);
  on the harder pages they can also read backwards.
- Circle each number when you find it and tick it off the list.
- Watch out for near misses: on the harder pages the grid holds the first
  few digits of some numbers in other places, followed by the wrong digit.
- Each number is in the grid only once, so once you have found it, you can
  stop looking.

## Purpose

Visual scanning, attention to detail and short-term memory for digit
strings — holding "7089020" in mind while the eye sweeps the grid. Number
searches are a mainstay of large-print activity books for adults and a calm,
screen-free exercise for children learning to read long numbers.

## History

Number searches followed the word search, which spread through American
puzzle magazines in the late 1960s and 1970s. Swapping letters for digits
made a puzzle that crosses languages and suits readers who find word
puzzles hard, and number-search books became a regular shelf beside the
word-search books, often in large print.

## This implementation

**Spec knobs:** `difficulty`; `size` (6-16, 0 picks from the difficulty:
9, 10, 11, 12, 13 from Kids to Expert); `count` (0 picks about one number
per ten cells, 6-16); `min_digits`/`max_digits` (4-8, 0 picks from the
difficulty: 4, 4-5, 5-6, 6-7, 7-8); `directions` (any of the eight, empty
for the difficulty's set); `decoys` (near misses in the filler, on from
Medium unless set); page `width`/`height`; `line`. The default is a large-
print 11 × 11 grid on a letter page.

**Generation:** numbers are drawn with a first digit 1-9; none is a
palindrome, and none appears inside another, read either way. They are
placed longest first in the allowed directions, sometimes crossing where
digits agree (never along more than all but one digit). Decoys copy all but
the last digit of a listed number into free cells. The rest is random
digits. Then the grid is scanned, and a random filler digit inside an extra
reading of a listed number is re-rolled, scan after scan, until no extra reading
remains — or the grid is redrawn.

**Solving:** the scan is exhaustive: every start cell and all eight
directions, whatever directions the page uses, so a number hidden only
across cannot also be read backwards on a diagonal. A palindrome's two
readings would cover the same cells, which is why palindromes are never
listed.

**Guarantees:** deterministic per seed; every listed number reads exactly
once in the grid, at the place recorded in meta, in any of the eight
directions. Tests re-check with an independent scan that turns every row,
column and diagonal into a string and counts matches forwards and
backwards with a sliding window (so overlapping repeats count). Difficulty
is the direction set (`rating_basis: direction_set`): two forward
directions Kids, three Easy, four Medium, any backwards direction Hard, all
eight Expert — so a page with directions set by hand is rated by what it
actually uses.
- **Out-of-range knobs (1.1.0+):** a knob outside its range is held to it
  instead of refused, and meta names it in `adjusted`: `size` to 6–16,
  `min_digits`/`max_digits` to 4–8 (a longest set below the level's shortest
  pulls the shortest down; both set the wrong way round are swapped), and
  numbers longer than the grid is wide are shortened to fit it.

