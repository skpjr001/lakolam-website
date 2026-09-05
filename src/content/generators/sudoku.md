---
title: "Sudoku"
blurb: "Sudoku with proven uniqueness and technique-ladder difficulty"
category: puzzle
version: "1.0.0"
---
Fill the grid so every row, column and region holds each digit exactly once.

## What it is

A 9×9 grid (4×4 and 6×6 for younger solvers) partly filled with digits. The
remaining cells must be completed so that every row, every column, and every
marked region contains each digit exactly once. Three variants ship from this
crate: **classic** (rectangular boxes), **jigsaw** (irregular regions), and
**killer** (boxes plus dashed cages whose distinct digits sum to a printed
target — conventionally with no digits given at all).

## How to play

Find a cell whose value is forced — a digit that can go nowhere else in its
row, column or region — write it in, and repeat. Harder boards need candidate
reasoning: mark which digits each empty cell can still take, then eliminate
with pairs, triples, box–line interactions and fish patterns. A proper sudoku
never requires guessing, and every puzzle from this crate is verified to be
solvable by inference alone.

## Purpose

The anchor puzzle of any mixed collection — instantly recognised, deeply
studied, and with a real difficulty vocabulary (the technique ladder) that most
other puzzles lack. It is also the crate that drove the workspace's shared
constraint engine: rows, columns and regions are `AllDifferent` groups, killer
cages reuse the kakuro sum propagator, and jigsaw is just a different partition.

## History

The modern form appeared as **Number Place** in Dell Pencil Puzzles & Word
Games (1979), designed by Howard Garns. Nikoli introduced it to Japan in 1984,
where the name **sūdoku** ("the digits must be single") stuck. Wayne Gould's
computer-generated puzzles in The Times (2004) started the worldwide boom.
Killer sudoku descends from Japanese "samunamupure" (sum number place); jigsaw
variants circulate as "squiggly" or "irregular" sudoku.

## This implementation

- **Spec knobs:** `size` (4/6/9), `variant` (classic/jigsaw/killer),
  `difficulty` target, `symmetric` digging, `max_cage` (killer).
- **Generation:** answer first (solver fills a full grid), then dig clues in
  180°-symmetric pairs while the board stays solvable by inference at the
  target band's technique ceiling. Killer reveals digits only when the cages
  alone leave the board ambiguous.
- **Guarantees:** exactly one solution, proven; the printed difficulty is the
  hardest technique the ladder *actually used*, never an estimate. Techniques
  run from singles through pairs, box–line, X-Wing and Swordfish.
- **Expert:** unreachable by digging (of 600 maximally dug boards, none
  needed a Swordfish), so Expert boards are *climbed* into existence — clue
  swaps that never decrease the measured difficulty, walking the space of
  unique boards until one needs a Swordfish. Hits on about two seeds in
  three, in 15–35 s; a miss returns an honest Hard, labelled with the
  requested band alongside. Classic variant only, and the climb trades the
  symmetric clue pattern for the fish pattern it hunts.
