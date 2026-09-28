---
title: "Signpost"
blurb: "Signpost — number the grid 1 to N so every arrow points toward the next number"
category: puzzle
version: "1.0.0"
---
Number every square from 1 to the last so each arrow points toward the next
number — near or far, along its line.

## What it is

A square grid where every square carries an arrow in one of eight
directions: up, down, left, right or diagonal. The last square carries a
star instead. Write the numbers 1, 2, 3 … up to the number of squares, one
in each square, so that each number's arrow points at the square holding the
next number. The next number may be the neighbouring square or anywhere
further along the arrow's line, skipping over squares in between. The first
and last numbers are printed, along with a few others.

## How to play

Start at the ends. The square after 1 lies somewhere along 1's arrow, and the
square before the star must have an arrow pointing at the star. A square that
only one arrow in the whole grid points at must follow that arrow's square;
an arrow whose line holds just one free square must lead there. Printed
numbers help from both sides: if 12 is printed, then 11 is a square whose
arrow points at 12, and 13 lies along 12's arrow. Link squares into short
chains as you go — a chain of known steps moves as one piece, and must fit
between the printed numbers around it. Every square is used exactly once, so
a chain may never loop back on itself.

## Purpose

A path puzzle unlike `hidato` or `numbricks`: the steps are not between
neighbours but along lines of sight, so the whole board is in play at every
move. Arrows make it friendly to start — every square tells you where to look
— while the long jumps keep large boards tough. It prints cleanly and suits
all ages, from a 4×4 for children to a 7×7 with few printed numbers.

## History

Simon Tatham's Portable Puzzle Collection carries it as Signpost, after a
puzzle called Pfeilpfad ("arrow path") published by Angela and Otto Janko;
arrow-path number puzzles of this kind appear in several puzzle magazines.

## This implementation

- **Spec knobs:** `size` (3–8; 0 picks it from the difficulty: 4×4 Kids, 5×5
  Easy, 6×6 Medium, 7×7 Hard and Expert), `difficulty`, `cell`, `line`.
- **Generation:** a random path through every square is laid in which each
  step is a queen move — any distance along one of the eight lines, jumping
  over visited squares — chosen by a softened fewest-onward-moves rule with
  backtracking. Each square's arrow is read off from its step, the last square
  gets the star, and numbers are erased one at a time (1 and the last always
  stay) while the solver still orders every square.
- **Solving:** *link* logic — every square keeps its candidate successors
  (squares along its arrow) and candidate numbers; a number needs a fitting
  neighbour on both sides, a successor needs a fitting pair of numbers, a
  square with one successor left owns it, a square only one arrow can still
  reach takes that link, and each number goes in exactly one square. Numbers
  shift along settled links, so chains move as one and loops run out of
  numbers. Above it, *trial*: fix one square's successor, run the link logic,
  and strike it on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, since every
  deduction is sound and the ladder places every number — confirmed in the
  tests by an independent search that builds the path step by step from 1
  and treats running out of its node budget as ambiguous. Rated by grid size
  and the hardest technique needed; Expert is a 7×7 that needs a what-if (a
  few fresh paths are tried to find one before settling for an honest Hard).
