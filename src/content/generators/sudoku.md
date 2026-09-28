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
- **thermo**: digits strictly rise from each thermometer's bulb;
- **anti-knight**: no two cells a chess knight's move apart hold the same
  digit;
- **anti-king**: no two diagonally touching cells hold the same digit
  (6×6 and up);
- **sandwich**: the number outside each row and column is the sum of the
  digits lying between its 1 and its highest digit — 9 on a 9×9, 6 on a
  6×6 (those two sizes only);
- **arrow**: the digits along an arrow add up to the digit in its circle;
  digits may repeat on an arrow;
- **little killer**: a number outside the grid gives the sum of the
  diagonal its small arrow points along; digits may repeat;
- **renban**: a purple line holds a set of consecutive digits, in any order;
- **whispers**: neighbouring digits along a green line differ by at least 5
  (at least 3 on a 6×6, 2 on a 4×4).

Diagonals, windows, shading, thermometers, the anti-knight and anti-king
rules, sandwich sums, arrows, little killers and lines all combine freely
with each other and with one edge-mark family (greater-than, Kropki, XV or
consecutive).

## How to play

Find a cell whose value is forced — a digit that can go nowhere else in its
row, column or region — write it in, and repeat. Harder boards need candidate
reasoning: mark which digits each empty cell can still take, then eliminate
with pairs, triples, box–line interactions and fish patterns. A proper sudoku
never requires guessing, and every puzzle here is verified to be solvable by inference alone.

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
  consecutive, thermo, anti_knight, anti_king, sandwich, arrow,
  little_killer, renban, whispers), `difficulty` target, `symmetric` digging,
  `max_cage` (killer).
- **Generation:** answer first (solver fills a full grid), then dig clues in
  180°-symmetric pairs while the board stays solvable by inference at the
  target band's technique ceiling. Killer reveals digits only when the cages
  alone leave the board ambiguous.
- **Extras:** rules that change which answers are legal — extra
  all-different groups (diagonals, windows) and the anti-knight / anti-king
  pairs — are known before the answer is filled, so the answer is filled
  against them (anti-knight and anti-king with short restarted searches).
  Every other mark is read off the finished answer — thermometers laid along
  strictly rising runs, renban lines along consecutive sets, whispers lines
  along wide steps, arrows from a circle through one to three cells summing
  to it, little killers on random diagonals (kept to the bottom and right
  when sandwich sums hold the top and left), sandwich sums for every row and
  column — so it is true by construction; lines, arrows and thermometers
  never share a cell. Each edge mark, thermometer step, whispers step and
  anti pair becomes a two-cell relation in the same solver, and the families
  whose convention is *all marks shown* (Kropki, XV, consecutive) also
  constrain every unmarked edge. Arrows and little killers are sum
  constraints with repeats allowed (forward/backward reachable-sum sets
  support each candidate exactly); a sandwich tries every placement of the
  1 and the top digit its candidates allow; a renban line keeps only
  candidates inside a feasible window of consecutive values. Digging then
  proceeds as usual, which is why greater-than, Kropki and sandwich boards
  often need almost no given digits. Reading any mark is its own rung on the
  ladder, `relation`, which bands Easy — so a board with marks is never rated
  Kids. Easy, Medium and Hard are all reached on 9×9 boards with every
  family; 4×4 and 6×6 boards mostly rate Easy. The expert climb is
  classic-only; extras boards target Expert by the ordinary dig and return an
  honest Hard. Refused: hyper off 9×9, sandwich off 6×6 / 9×9, anti-king on
  4×4 (no answer exists), anti-knight on a jigsaw above 6×6 (the fill almost
  never finds one), and more than one edge-mark family. Boards without extras
  — and boards with only the older extras — are byte-identical to earlier
  versions.
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
