---
title: "Quote Acrostic"
blurb: "Quote acrostic — solve the clues, copy the letters into the numbered grid to reveal a quotation; the first letters spell the author"
category: word
version: "1.0.0"
---
Solve the clues, copy each letter into the numbered grid, and a quotation
appears — with its author spelled down the first letters of the answers.

## What it is

A double-crostic: a famous quotation is hidden in a numbered grid, with
black squares between its words. Below the grid are lettered clues, each
with a row of numbered blanks. Every letter of every answer belongs in the
grid square with the same number, and the first letters of the answers,
read from A downwards, spell the author's name. Easier puzzles print some
of the grid letters for you.

## How to play

Start with the clues you are sure of and write each answer in its blanks.
Copy every letter into the grid square with the same number. As words of
the quotation take shape, guess the missing letters from the sense of the
sentence and copy them back into the clue blanks — the small letter in the
corner of each grid square tells you which clue it belongs to. Work back
and forth between clues and grid. The first letters of the answers spell
the author, which is a check on both.

## Purpose

The acrostic is a favourite of experienced solvers: it mixes vocabulary,
spelling and the pleasure of a sentence slowly coming into view, and each
half of the puzzle checks the other. Pages with printed letters give
newcomers a start; the hardest pages print none, as in the newspaper
classic.

## History

Elizabeth Kingsley invented the double-crostic for the Saturday Review in
1934. The New York Times has run one since 1943, long set by Thomas
Middleton and later by Emily Cox and Henry Rathvon, and the Wall Street
Journal, Simon & Schuster's Super Crostics and large-print acrostic books
keep the form popular with adult and senior solvers.

## This implementation

- **Spec knobs:** `difficulty` (the share of grid letters printed: Easy
  about 30%, Medium about 15%, Hard 10% or fewer, Expert none; Kids is
  served as Easy); `initials` (`surname`, the default, or `full_name`);
  `columns` (10-20, 0 = 15); `letter_labels` (clue letters in the grid
  corners); `width`, `height`, `margin`.
- **Generation:** quotations come from a public-domain list (every author
  died in 1945 or earlier). A depth-first search splits the quotation's
  letters into clued answers (3-8 letters, from the project's own clued
  word list, filtered for family use) whose first letters spell the
  author, longest words first, with a lookup table for the last two
  answers when an exact fit is wanted. Quotation letters no answer uses are
  printed as given letters; easier bands reveal further answer letters up
  to their share. Each answer letter is wired to a random grid square
  holding that letter.
- **Solving:** none is run: clues are definitions, and whether a clue has
  only one possible answer cannot be proved. The cross-check between grid
  and answers is the solver's check, as on a printed acrostic.
- **Guarantees:** letters cross-check — the answers' letters plus the
  given letters are exactly the quotation's letters, each answer letter is
  wired to one square holding it, and the initials spell the author
  (`answers_checked`, `guarantee` in meta). Uniqueness of the clues is not
  claimed. Difficulty is the printed share (`rating_basis`); an Expert
  search that finds no exact fit within its budget is served as Hard and
  reported as `requested_difficulty`.
