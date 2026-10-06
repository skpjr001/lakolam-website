---
title: "Staircase"
blurb: "Staircase — fit themed words into a stepped grid; the shaded diagonal spells a mystery word"
category: word
version: "1.0.0"
---
Fit the themed words into the stepped grid, and the shaded squares spell a
mystery word.

## What it is

A grid of rows, one word to a row, with one shaded square in each row. The
shaded squares form a staircase running down and to the right. Every word on
the list belongs in exactly one row, and when all are in place the shaded
letters, read from top to bottom, spell a mystery word from the same theme.
A few letters may be printed to help tell apart rows of the same length.

## How to play

Count the squares in each row and match the words to rows of the same
length. A word whose length belongs to only one row can go straight in.
Where several rows share a length, use the printed letters to decide which
word goes where. Write each word along its row from left to right. When the
grid is full, read the shaded letters from top to bottom to find the mystery
word, and write it in the boxes below. If you spot the mystery word early,
it can help you place the last few words.

## Purpose

A gentle fit-the-words puzzle with a reward at the end. Matching by length
practises counting and spelling, and the hidden word gives a satisfying
finish, which makes it a good warm-up or classroom activity around a theme.

## History

Puzzles in which the answers' letters at fixed positions spell a hidden word
go back to the acrostic poems of antiquity and the Victorian double
acrostic. The stepped, diagonal form is a magazine favourite under names
such as Staircase and Acrofit, usually with clues; here the answers are
given as a themed list.

## This implementation

- **Spec knobs:** `difficulty`, `theme` (any lexicon theme; default
  `christmas`), `language` (`en` default; `es`, `fr`, `de`, `it`, `pt`, `nl`;
  accents folded to A-Z), `cell`, `line`.
- **Generation:** the mystery word is a theme word (Kids 4 to 5 letters, Easy
  6 to 7, Medium 6 to 7, Hard 7 to 8, Expert 8 to 9). Working back from it,
  each of its letters gets a different theme word (3 to 10 letters) holding
  that letter, placed so the letter falls on that row's step. The level caps
  how many rows may share a length: none for Kids and Easy, two for Medium,
  three for Hard, four for Expert. Letters are then printed in tied rows
  until the fit is unique, and trimmed back to the fewest needed; the shaded
  squares are never printed. A theme too small for a long mystery word falls
  back to a shorter one.
- **Solving:** an exhaustive count of the ways to put each listed word in a
  row of its length, agreeing with the printed letters, stopping at two.
- **Guarantees:** deterministic per seed; exactly one fit, re-checked in the
  tests by trying every permutation of words over rows; the shaded letters
  spell the mystery word. Rated by the mystery word's length and the largest
  group of rows sharing a length (`rating_basis`:
  `mystery_length_and_length_ties`): no shared lengths is Kids (mystery up to
  5 letters) or Easy, two is Medium, three Hard, four or more Expert. When a
  theme cannot reach the requested band, the nearest band is returned and
  labelled honestly.
