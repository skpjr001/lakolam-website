---
title: "Stretch Letters"
blurb: "Stretch letters — fit the list across only; tall boxes hold one letter shared by every row they span"
category: word
version: "1.1.0"
---
A fill-in where the only crossings are tall letters stretched over several rows.

## What it is

A grid of rows, broken into word spaces by black squares, and a list of
words grouped by length. Every word goes in **across** — nothing reads
down. Some boxes are tall: they stretch over two, three or four rows, and
the single letter written in a tall box belongs to every across word that
passes through it. The tall boxes are the only places where words meet.
A letter or two may be printed in to start.

## How to play

Fit every word from the list into the grid, one word to each space,
reading across. A word must be exactly as long as its space. When a word
passes through a tall box, its letter there is shared with every other
word passing through that box, so each word you place gives you a letter
in the rows above and below. Start where the choice is smallest — a
length with few words, or a space that already has a letter — and work
outwards along the tall boxes. Cross words off as you use them. There is
only one way to fit them all.

## Purpose

A no-clues, no-dictionary-needed fill-in in the family of criss-cross and
framework puzzles, with a lighter touch: the crossings are few and easy
to see, which suits relaxed solvers, large-print books and seniors'
packs. Easy pages have short everyday words; expert pages carry over
thirty words in a 15×16 grid.

## History

Fill-ins, with their lists of words to fit by length, are a staple of
North American puzzle magazines. The stretched-letter variant, whose
crossings are tall shared boxes rather than down words, has run there for
decades and is sold as its own puzzle book.

## This implementation

- **Spec knobs:** `difficulty` (the grid size: 6×7 up to 15×16), `rows`
  (5–16), `columns` (7–17), `width`, `height`, `margin`.
- **Generation:** each row is cut by black squares into spaces of three
  or more cells; tall boxes (two to four rows high, never side by side)
  are dropped until every space touches at least one, with extra boxes in
  longer spaces. The spaces are filled with distinct everyday
  family-friendly words by a backtracking search that honours every tall
  box. Then the solver's own problem — fit exactly these listed words into
  these spaces — is counted. While a second fit exists, a letter that
  tells the two fits apart is printed in (or, when the count is too large
  to finish, a letter in the most open spaces, at the position where
  their candidates disagree most); finally each printed letter is removed
  again if the fit stays unique, so none is spare.
- **Solving:** place words where a length group or the shared letters
  leave one choice, and follow the tall boxes; the key prints every
  letter, printed-in ones in black and the rest in red.
- **Guarantees:** deterministic per seed; every white cell is in exactly
  one space of three or more; each tall box holds one letter shared by
  all its rows; the listed words are distinct; and **exactly one**
  assignment of the listed words to the spaces agrees with the tall boxes
  and printed letters — an exhaustive count capped at 2, where a count
  that runs out of its node budget is treated as ambiguous, never unique.
  The tests re-count with a different search (a fixed breadth-first order
  writing letters cell by cell) and check that every printed letter is
  needed. Rated by the number of words (≤ 9 Kids, ≤ 15 Easy, ≤ 22 Medium,
  ≤ 29 Hard, more Expert), one band easier when more than a quarter as
  many letters as words are printed (`rating_basis` `words_and_givens`);
  a band the page does not reach is reported as `requested_difficulty`.
- **Version 1.1:** the shared family-friendly word filter now refuses more words (an audit of the everyday dictionary tiers: crude, sexual, drug, drink and violent words and inflections of words already refused), so some pages draw different words.
