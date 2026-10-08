---
title: "Word Sudoku"
blurb: "Word sudoku — letters instead of digits, and a hidden word in one row"
category: puzzle
version: "1.2.0"
---
A sudoku played with letters instead of digits — and once it is solved, one row
spells a hidden word.

## What it is

A 9×9 grid (or 4×4 and 6×6 for younger solvers) using the letters of a single
word, one letter for each digit. Fill the grid so every row, column and box
holds each letter exactly once. The letters are listed under the grid in
alphabetical order; when the grid is complete, one row reads the word itself.

## How to play

Exactly as sudoku: find a letter that can go in only one square of a row,
column or box, write it in, and repeat. Harder grids need candidate pairs and
box–line reasoning. The hidden word is a bonus — spotting it early can even
help, since one row must spell it in order.

## Purpose

Word sudoku is a staple of puzzle books and classroom worksheets: the same
logic as sudoku, a friendlier look for word lovers, and a small reward at the
end. It lives inside the `sudoku` crate and shares its engine, ratings and
uniqueness proof.

## History

"Wordoku" and "Godoku" appeared soon after the 2005 sudoku boom, when papers
and puzzle books began swapping the digits for letters — often spelling a word
along a row or a diagonal.

## This implementation

- **Spec knobs:** `size` (4, 6 or 9), `difficulty`, `word` (a word with that
  many different letters; empty picks one from a curated list), `symmetric`,
  `cell`, `line`.
- **Generation:** a classic sudoku is built by the `sudoku` generator — answer
  filled, clues dug while the technique ladder still finishes the board — and
  then its digits are relabelled so that one randomly chosen row of the answer
  reads 1, 2, 3 … in order, which the letters turn into the word.
- **Guarantees:** relabelling symbols changes nothing about a sudoku, so the
  board stays uniquely solvable and its rating — the hardest technique the
  ladder needed — is exactly the underlying sudoku's; the tests re-check both
  after relabelling. The answer key names the word and its row.
- **Out-of-range knobs (1.1.0+):** the shared size list offers twelve, which
  has no twelve-letter word list; it is now served as nine letters with
  `requested_size: 12` in meta instead of being refused.

- **Footer fit (1.2.0+):** the letter-set line under a nine-letter grid ran
  about 6 pt past both edges of the page at the default cell size; footer text
  is now shrunk just enough to fit inside the page, so boards whose footer
  already fitted are unchanged and the default page is drawn slightly smaller
  in that one line.
