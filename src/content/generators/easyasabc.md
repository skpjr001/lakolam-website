---
title: "Easy as ABC"
blurb: "Easy as ABC — each letter once per row and column; edge clues name the first letter seen"
category: puzzle
version: "1.0.0"
---
Put each letter once in every row and column — the letters outside the grid
say which one you meet first from that side.

## What it is

A square grid and a set of letters, fewer than the grid is wide (A to C in a
5×5, A to D in a 6×6, A to E in a 7×7). Each row and each column contains
every letter exactly once; its remaining squares stay blank. A letter printed
outside the grid is the first letter seen looking into that row or column
from that side — blanks are skipped. Larger grids print a few letters inside
too.

## How to play

Work one line at a time. A clue letter must come before every other letter in
its line, so it cannot sit near the far end, and the square next to the clue
holds either that letter or a blank. Two clues on one line pin both ends;
where a row's possibilities and a column's cross, a square settles. Mark
blanks as well as letters — they count toward the line's quota.

## Purpose

A staple of the World Puzzle Championship and puzzle magazines ("found in
almost every puzzle championship"), and the catalogue's first puzzle whose
clues sit outside the grid and speak of *order*: not a sum or a count, but
which letter comes first. It uses letters rather than digits, which gives a
page a different look.

## History

Also known as ABC Box, Buchstabensalat and ABC-View; a long-standing genre of
German and Dutch puzzle magazines before it became a championship regular.

## This implementation

- **Spec knobs:** `difficulty` (which sets the grid: 4×4 with A–C for Kids,
  5×5 A–C, 6×6 A–D, 7×7 A–E), `cell`, `line`.
- **Generation:** an answer is built row by row from every legal line
  pattern, keeping each column legal; every edge clue starts printed. Letters
  are printed inside the grid only while the edges alone cannot settle it (on
  a 7×7 they never can), then the inside letters are thinned first — the edges
  are the puzzle — and the edge clues after.
- **Solving:** *line* reasoning — every filling of a row or column that fits
  its clues and current candidates, intersected square by square — with
  *trial* above it. Trial was measured never to settle a board whole-line
  reasoning could not, so the bands come from grid size.
- **Guarantees:** deterministic per seed; exactly one answer, since the line
  reasoning is sound and settles every square — confirmed by an independent
  branching count in the tests. Rated Kids (4×4) to Hard (7×7); an Expert
  request returns an honest Hard.
