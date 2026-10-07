---
title: "Cross Pairs"
blurb: "Cross Pairs — a word seek with no list: find the pairs of words that cross at their middle letters"
category: word
version: "1.0.0"
---
A word seek with no word list: find the pairs of words that cross at their middle letters.

## What it is

A square of letters hides a stated number of cross pairs. A cross pair
is two words of the same length — five letters, or on the harder levels
five or seven — that share their middle letter: one reads across and the
other down, making a plus sign, or on the harder levels both run on the
diagonals, making an X. One pair is looped as an example. There is no list
of words to look for; the pairs themselves are the clue.

## How to play

Look for a letter that sits in the middle of two words at once — one
across and one down through it (or, where the instructions say so, the
two diagonals through it). Both words have the same length, so the middle
letter is the third letter of a five-letter word, or the fourth of a
seven-letter one. Loop both words of each pair. The instructions say how
many pairs there are, how long the words are, and whether words can read
backwards; when they cannot, words read from left to right and from top
to bottom. A word may share a letter with a word from another pair.

## Purpose

Without a word list, the solver has to recognise words directly in the
letter field, and the crossing condition keeps the search systematic:
pick a letter, look both ways. It exercises visual scanning and
vocabulary together, and the pairs make each find doubly satisfying.

## History

Word seek (word search) puzzles have been a newspaper and magazine
staple since the late 1960s. Penny Dell Puzzles publishes "Cross Pairs
Word Seek" as its own variety title: hidden pairs of words that cross at
their common middle letter, with one pair looped to start.

## This implementation

- **Spec knobs:** `difficulty`; `pairs` (2–12; 0 = the level's count;
  out-of-range values are clamped and reported as `requested_pairs`; the
  grid grows when needed to fit more pairs); `example` (loop one pair);
  `cell` (12–60 pt); `line` (0.2–4 pt).
- **Levels:** Kids — a 9×9 grid, 4 pairs of everyday five-letter words,
  across and down only, read forwards; Easy — 10×10, 5 pairs; Medium —
  11×11, 6 pairs of common words, diagonal X pairs too (diagonals read
  downwards); Hard — 12×12, 7 pairs of five or seven letters, words may
  read backwards; Expert — 14×14, 9 pairs. The level is the grid size,
  number of pairs, word lengths, diagonals and backward words
  (`rating_basis`).
- **Generation:** pairs are planted one at a time — two distinct
  family-friendly words with the same middle letter, at a free centre,
  sharing at most one square with words already placed, and only where
  letters agree. A seven-letter pair whose inner five letters would also
  form a pair is rejected. The rest of the grid is filled with letters
  drawn by English letter frequency.
- **Solving / checks:** every square of the finished grid is tested as a
  centre, for every shape, length and reading direction the level allows,
  against Lakolam's large dictionary (about 114,000 words). Any
  accidental pair has one of its filler letters re-drawn, and the scan
  repeats until exactly the planted pairs qualify; a layout that cannot be
  repaired is discarded.
- **Guarantees:** deterministic per seed; the grid holds exactly the
  stated number of cross pairs (`unique`) — even a solver who knows
  obscure words finds no extra — and the key loops all of them; no word
  repeats, and every hidden word is an everyday, family-friendly word. The
  tests recount the pairs with an independent scan of every full row,
  column and diagonal.
