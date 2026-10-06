---
title: "Cross-Number"
blurb: "Cross-number — a crossword of numbers, clued by calculations or by number facts"
category: maths
version: "1.0.0"
---
A crossword whose answers are numbers: one digit in each square, and
crossing answers share their digit.

## What it is

A square grid with black squares and numbered starting squares, like a
crossword, with ACROSS and DOWN clues below it. Every answer is a whole
number written one digit to a square, and no answer starts with 0. The page
comes in two kinds. In the classroom kind every clue is a calculation, such
as 47 + 38 or 56 × 4 (at the top level, 24 × 7 + 5). In the logic kind the
clues are facts about the numbers — "a square number", "digits add up to 15",
"a multiple of 13" — or links to other answers, such as "7 DOWN × 3" or
"2 ACROSS REVERSED", and only one grid fits them all.

## How to play

**Calculation clues:** work out each clue and write the answer in the grid,
starting at the numbered square and going across or down. Where two answers
cross they share a square, so the digit you write must suit both answers.
If a crossing digit disagrees, one of the two calculations needs another
look — the grid checks your work. In a clue with two steps, do the
multiplying or dividing first.

**Logic clues:** no clue gives its answer straight away, so combine them.
Start with the most restrictive: a 2-digit cube can only be 27 or 64, and a
2-digit number that reads the same backwards is 11, 22, … 99. Write possible
digits lightly, and use the crossings: if an across answer must end in 4 or
6 and the down answer through that square must be prime, its last digit
cannot be even. A link like "7 DOWN × 3" fixes one answer as soon as you
know the other. Keep narrowing until every square has one digit.

## Purpose

The calculation kind turns a page of sums into a puzzle: children practise
the four operations (or two-step calculations), and because answers cross,
mistakes show up on their own — a worksheet that marks itself. The logic
kind is for adults and keen older pupils: number facts (squares, cubes,
primes, multiples, digit sums) used in reasoning, not just recall.

## History

Cross-number puzzles (also called cross-figures) followed the crossword
craze of the 1920s into newspapers and puzzle magazines. The logic style,
with clues that refer to one another, became a fixture of advanced puzzle
series such as the numerical puzzles of The Listener crossword and of
mathematics magazines; the calculation style is a long-standing classroom
favourite for practising arithmetic.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`computed` — the default — or
  `logic`); `locale` (`us`, `uk`, `in`: digit grouping for large numbers,
  "MATH"/"MATHS"); `size` (grid side 5–9, 0 = by difficulty); `width`,
  `height`, `line`.
- **Generation:** a square frame with 180° symmetric black squares is drawn
  at random: every run longer than the level allows is broken, squares left
  in no answer are blackened, and the frame is kept only if the white
  squares are connected, at least 60% of them are white, and at least 60% of
  those are checked (in both an across and a down answer). Digits are then
  drawn for every white square (no answer starts with 0).
- **Computed clues:** each calculation is written for its answer. Kids: add
  and subtract (5×5 grid, answers up to 3 digits). Easy: and multiply by one
  digit (6×6). Medium: all four operations, multiplying by up to 12 and
  dividing by up to 9 (7×7, up to 4 digits). Hard: two-digit by two-digit
  multiplication and division by up to 25. Expert: two-step calculations
  `a × b ± c` and `a ÷ b ± c` (8×8, up to 5 digits), always written with the
  multiplication or division first so the order-of-operations convention
  and left-to-right working agree. Division is always exact; no negative
  numbers appear.
- **Logic clues:** answers are filled one at a time, some made from an
  earlier answer (× 2–9, ± up to 99, reversed — the link becomes a clue),
  some chosen to be special numbers, the rest random. Each answer starts
  with every true fact on the menu (square, cube, prime, reads the same
  backwards, triangle number, up to two multiples of 6–25, digit sum) and
  its link. Grids are counted by search (cap 2, most-constrained answer
  first); a count that runs out of its budget counts as ambiguous. Pieces of
  clues are then removed in seeded order while the count stays at one,
  plain facts first, and every answer keeps at least one fact.
- **Rating:** computed pages are rated by their operations and answer
  length, which the level sets (`rating_basis:
  operations_and_answer_length`). Logic pages are rated by solving them
  without guessing — candidates per answer narrowed by facts, crossing
  digits and links until nothing changes: if that finishes the grid the page
  is Hard, otherwise (trial and error needed) Expert. Logic mode has no
  Kids, Easy or Medium band: those requests are served at Hard and labelled
  Hard.
- **Guarantees:** deterministic per seed. Computed: every printed
  calculation, read back from its text and worked left to right, equals the
  number in its squares (tests check every clue in every band and locale).
  Logic: every clue is true of the answer, and exactly one grid fits,
  re-proved by an independent square-by-square search; every clue piece is
  needed. The answer key fills the grid in red and adds "= answer" after
  each clue. Meta carries `unique`, `answers_checked`, `difficulty`,
  `rating_basis`, `needs_trial` and every clue with its answer.
