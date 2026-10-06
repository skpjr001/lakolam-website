---
title: "Number Fill-In"
blurb: "Number fill-in — fit every listed number into the grid; one arrangement only"
category: maths
version: "1.0.0"
---
Fit every number on the list into the grid, across or down, so that all the
crossings agree.

## What it is

A crossword-shaped grid with no clues, and a list of numbers grouped by how
many digits they have. Every number goes into the grid exactly once, reading
left to right or top to bottom, and where two numbers cross they share a
digit. A shaded starter digit or two may be printed in the grid. There is
exactly one way to fit the whole list. Also known as number kriss-kross or
figure fit, it is a staple of large-print puzzle books, and the page is large
print unless asked otherwise.

## How to play

Count the squares in each space first: a space of four squares takes a
4-digit number. Look for a length with only one number — it can only go in
the one space of that size, if there is one — and write it in. Every number
you place puts digits into the spaces that cross it, and those digits narrow
down which numbers can fit there. A starter digit works the same way: only
some numbers of the right length have that digit in that place.

When a space still has two or three candidates, turn it round: take a number
and look for the spaces it could go in. If only one space fits it, it goes
there. Tick each number off the list as you use it.

## Purpose

A gentle, absorbing puzzle that needs no arithmetic, only careful matching —
popular with older solvers, and a good attention and working-memory
exercise. Large print by default: big squares, big digits and a list that
is easy to read and tick off.

## History

Fill-ins with words ("kriss-kross") ran in Dell and Penny Press magazines
from the mid-20th century; the number version followed as the digit
equivalent and became a regular in variety and large-print puzzle books,
under names such as number fill-in, figure fit and number kriss-kross. No
inventor is recorded.

## This implementation

- **Spec knobs:** `difficulty` (sets how many numbers and how long: Kids
  about 10 numbers of 3–4 digits, Easy 16 of 3–5, Medium 22 of 3–6, Hard 30
  of 3–7, Expert 38 of 3–8), `numbers` (override the count, 4–60),
  `large_print` (default on), `width`, `height`, `line`.
- **Generation:** the grid and its digits are grown together, one number at
  a time, each new number crossing the grid so far (preferring placements
  that cross more than one number). Every run of two or more squares in the
  grid is a listed number — no number touches a parallel neighbour or runs
  into another — numbers never start with 0 and never repeat. Growing both
  together means a fit exists by construction.
- **Solving:** arrangements are counted (most constrained space first, cap
  2). Numbers collide far more often than words, so whenever two
  arrangements fit, a square where they differ is given as a starter digit,
  until exactly one fits; then every starter that is not needed is taken
  back out (greedy reduce-while-unique). A count that runs past its search
  budget counts as ambiguous, never unique.
- **Rating:** a solver using only singles (a space only one number fits; a
  number that fits only one space) works the puzzle from its starter
  digits. The band is the number count (up to 12 Kids, 18 Easy, 26 Medium,
  34 Hard, above that Expert), one band higher when the singles stall and
  trial and error is needed. When the count alone already makes the band
  asked for, extra starter digits are given until the singles finish, so
  the page is not pushed a band higher; Expert pages may need trial and
  error. Meta records `hardest_technique` and `rating_basis`.
- **Guarantees:** deterministic per seed; the digits spell every listed
  number; every run in the grid is a listed number; exactly one arrangement
  fits, re-proved on every page by an independent search (slots in growth
  order, every number tried, no shared code with the generator's counter);
  every starter digit is needed, for uniqueness or for the singles to
  finish. The answer key shows every digit in red, starters shaded.
