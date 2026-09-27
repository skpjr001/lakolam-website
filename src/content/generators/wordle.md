---
title: "Wordle Deduction"
blurb: "Wordle deduction — deduce the hidden word from guesses and their colour feedback"
category: word
version: "1.0.1"
---
Someone has already played — read their guesses and the colours, and name
the hidden five-letter word.

## What it is

Each puzzle shows a few five-letter guesses, every tile coloured the way the
game marks it: **green** for the right letter in the right spot, **yellow**
for a letter that is in the word but elsewhere, **grey** for a letter that is
not in it. Below them is an empty row: fill in the one word that fits every
clue. Several puzzles share a page; a legend explains the colours, and small
corner marks keep them readable when printed in greyscale.

## How to play

Collect the facts. Greens fix letters in place; yellows say a letter is
present but rule out that position; greys rule a letter out entirely — unless
the same guess also marked that letter green or yellow, in which case the
grey says there are no *more* copies of it. Write the known pattern down
(`_ R _ _ E`, with A somewhere but not second), then run through the words
that fit.

## Purpose

Wordle was played billions of times a year by 2025, and "Wordle challenge"
books sell as a format of their own. This is the print form: a deduction
puzzle rather than a guessing game, since the page already holds everything
needed to find the word.

## History

Wordle was created by Josh Wardle and released in October 2021; The New York
Times bought it in 2022. Its feedback rules descend from the older pen-and-
paper code game *Jotto* (1955) and the peg game *Mastermind* (1970).

## This implementation

- **Spec knobs:** `puzzles` per page (1–6), `difficulty`, `cell`.
- **Dictionary:** a vendored list of about 1,200 common five-letter words (the
  union of the workspace's curated lists). Answers are drawn from it, and
  uniqueness is proven against it — the answer key's word is the only one in
  the list that fits.
- **Generation:** an answer is drawn, then guesses are chosen one row at a
  time so the number of words still fitting falls roughly geometrically from
  the whole dictionary to exactly one on the last row. Feedback follows the
  game's own rule for repeated letters (greens first, then yellows only for as
  many copies as remain).
- **Guarantees:** deterministic per seed; exactly one dictionary word fits
  every row; read in order, each row narrows the field, so the word is not
  pinned before the last one; no answer repeats on a page. Rated by rows shown
  (five Easy, four Medium, three Hard) and greens given (three rows with three
  greens or fewer is Expert).
