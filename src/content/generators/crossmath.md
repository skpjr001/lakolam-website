---
title: "Math Crossword"
blurb: "Math crossword — place 1-9 so every row and column equation works out"
category: puzzle
version: "1.0.0"
---
Place the digits 1 to 9 so that every row and every column works out as a sum.

## What it is

A 3×3 grid of boxes laced with operators: each row is an equation read left
to right, each column one read top to bottom, and each ends with its result.
Use each digit 1–9 exactly once. Work every line in order, left to right or
top to bottom — so 2 + 3 × 4 is 20, not 14. A few digits are given.

## How to play

Start where the numbers are tight. A product that is large needs large
digits; a result of 1 after a subtraction pins two neighbours close together;
a division must come out exact. Each digit you place checks both its row and
its column, and since every digit appears once, the last few fall out by
elimination.

## Purpose

"Cross math" books sell in series on KDP for both children and adults, and
classroom worksheets use the same format for arithmetic practice with a
puzzle's pull. It rounds out the kids-maths lane (`numberpyramid`,
`magicsquare`, `sujiko`) with the four operations and a unique answer.

## History

Arithmetic-grid puzzles of this shape have run in puzzle magazines for decades
as math squares, number crosswords and "crossmath"; the 1–9-once variant
became common in puzzle books and apps in the 2010s.

## This implementation

- **Spec knobs:** `puzzles` per page (1–4), `difficulty`, `cell`.
- **Generation:** a random arrangement of 1–9 and random operators — plus and
  minus for Kids, times from Easy, division from Hard, only where it divides
  exactly and no line goes negative — fix the six results; digits are then
  removed while exactly one arrangement still fits, down to a floor per band.
- **Guarantees:** deterministic per seed; exactly one answer, proven by an
  exhaustive search over the arrangements of 1–9 (rows checked as they fill,
  columns at the end). Rated by the digits left printed — five Kids, four
  Easy, two or three Medium, one Hard, none with division Expert.
