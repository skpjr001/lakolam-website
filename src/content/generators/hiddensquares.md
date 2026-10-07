---
title: "Hidden Word Squares"
blurb: "Hidden Word Squares — find every block of the letter grid whose rows and columns are all words"
category: word
version: "1.0.0"
---
A grid of letters hides little word squares — blocks whose rows and columns are all words. Find every one.

## What it is

A word-search with no word list. The letter grid hides a stated number
of word squares: 3×3 blocks (or 4×4 on the bigger option) in which every
row, read across, and every column, read down, is a word. One square is
outlined to show what to look for; the others are somewhere in the grid,
and exactly that many exist.

## How to play

Look for a 3×3 block of letters where all three rows read as words from
left to right and all three columns read as words from top to bottom —
for example

    R A Y
    A G E
    W E T

has the rows RAY, AGE, WET and the columns RAW, AGE, YET. Draw a box
around each square you find. The instructions say how many squares
there are; no two of them share a letter. Words are read only across
(left to right) and down (top to bottom), never backwards or
diagonally.

## Purpose

Hidden squares train flexible word recognition: every letter could start
a row and a column at once, so the solver checks words in two directions
together. Short words dominate, which makes the puzzle approachable,
while the search across the whole grid keeps it engaging.

## History

Word squares — grids reading the same or different words across and down
— are among the oldest word puzzles, found carved in Roman times (the
SATOR square). Hiding small word squares in a field of random letters is
a modern variety-magazine form, popular in puzzle packets alongside word
searches.

## This implementation

- **Spec knobs:** `difficulty`, `square` (`three`, `four`), `example`
  (outline one square), `cell` (12–60 pt), `line` (0.2–4 pt).
- **Levels:** 3×3 squares — Kids: a 7×7 grid hiding 3; Easy: 8×8, 4;
  Medium: 9×9, 5; Hard: 10×10, 6; Expert: 12×12, 8. 4×4 squares — Kids:
  9×9, 2; Easy: 10×10, 3; Medium: 11×11, 3; Hard: 12×12, 4; Expert:
  14×14, 6. The level is the grid size and the number of squares
  (`rating_basis`).
- **Generation:** each square is built by randomised backtracking from
  everyday, family-friendly words of three (or four) letters: rows are
  distinct and the square is not a mirror image (its columns are not just
  its rows). Squares are placed without overlapping and no word repeats
  between squares. The rest of the grid is filled with letters drawn by
  English letter frequency.
- **Solving / checks:** every 3×3 (or 4×4) window of the finished grid is
  tested against Lakolam's large dictionary (about 114,000 words). Any
  window other than a planted one that qualifies has one of its filler
  letters re-drawn, and the scan repeats until exactly the planted
  squares qualify; a layout that cannot be repaired is discarded.
- **Guarantees:** deterministic per seed; the grid holds exactly the
  stated number of word squares (`unique`) — even a solver who knows
  obscure three-letter words finds no extra — and the key outlines all of
  them; every word in a hidden square is an everyday, family-friendly
  word. The tests recount the squares with an independent window scan.
