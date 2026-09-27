---
title: "Sudoku"
blurb: "Sudoku with proven uniqueness and technique-ladder difficulty"
category: puzzle
version: "1.1.0"
---
Fill the grid so every row, column and region holds each digit exactly once.

## What it is

A 9×9 grid (4×4 and 6×6 for younger solvers) partly filled with digits. The
remaining cells must be completed so that every row, every column, and every
marked region contains each digit exactly once. Three variants ship from this
crate: **classic** (rectangular boxes), **jigsaw** (irregular regions), and
**killer** (boxes plus dashed cages whose distinct digits sum to a printed
target — conventionally with no digits given at all).

Any of them can also carry **extras** — the popular variant rules, laid over
the board as plugins:

- **diagonal** (Sudoku-X): both long diagonals hold every digit once;
- **hyper** (Windoku): four extra shaded 3×3 windows do too (9×9 only);
- **even/odd**: shaded cells hold even digits;
- **greater-than**: a < or > sign between every pair of neighbours in a box;
- **Kropki**: a white dot joins consecutive digits, a black dot a digit and
  its double, and no dot means neither;
- **XV**: X marks a pair summing to 10, V a pair summing to 5, no mark
  neither;
- **consecutive**: a bar marks every consecutive pair, no bar means not;
- **thermo**: digits strictly rise from each thermometer's bulb.

Diagonals, windows and even shading combine freely with each other and with
one edge-mark family (greater-than, Kropki, XV or consecutive).

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

- **Spec knobs:** `size` (4/6/9/12), `variant` (classic/jigsaw/killer),
  `extras` (any of diagonal, hyper, even_odd, greater_than, kropki, xv,
  consecutive, thermo), `difficulty` target, `symmetric` digging,
  `max_cage` (killer).
- **Generation:** answer first (solver fills a full grid), then dig clues in
  180°-symmetric pairs while the board stays solvable by inference at the
  target band's technique ceiling. Killer reveals digits only when the cages
  alone leave the board ambiguous.
- **Extras:** extra all-different groups (diagonals, windows) are known before
  the answer is filled, so the answer is filled against them; every other
  mark is read off the finished answer — thermometers are laid along strictly
  rising runs — so it is true by construction. Each mark becomes a two-cell
  relation (an allowed-pairs table) in the same solver, and the families
  whose convention is *all marks shown* (Kropki, XV, consecutive) also
  constrain every unmarked edge. Digging then proceeds as usual, which is why
  greater-than and Kropki boards often need almost no given digits. Reading a
  mark is its own rung on the ladder, `relation`, which bands Easy — so a
  board with marks is never rated Kids. The expert climb is classic-only;
  extras boards target Expert by the ordinary dig. Boards without extras are
  byte-identical to earlier versions.
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
