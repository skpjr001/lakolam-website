---
title: "Word Square Deduction"
blurb: "Word-square deduction — rows and columns are words; coloured guesses beside each row pin the square"
category: word
version: "1.1.0"
---
Every row and every column of the square is a word. Coloured guesses
beside each row tell you which letters are right — work out the square.

## What it is

A 5×5 grid (4×4 for young solvers) to fill with letters so that all five
rows and all five columns read as English words. Beside each row are one or
more earlier guesses at that row's word, with each letter coloured: green
means the letter is in that row's word in exactly that place, yellow means
it is in the word but somewhere else, and grey means it is not in the word
at all (or not as many times as the guess uses it). There is exactly one
square that agrees with every colour.

## How to play

Start with the rows. A green letter goes straight into the grid. A yellow
letter belongs somewhere else in that row, and a grey letter is nowhere in
it. If a letter appears twice in a guess and only one copy is coloured, the
word holds that letter only once.

Often the colours leave a row with only one possible word — write it in.
When a row could still be several words, look at the columns: every column
must also be a word, so the letters you have already placed above and below
rule choices out. On harder squares you may need to try a word in a row and
see whether the columns can still be completed; if they cannot, that word
is wrong.

Every row and column word is an ordinary English word; the answer page
shows the finished square.

## Purpose

A deduction puzzle that joins two favourites: the colour feedback of the
daily five-letter word game, and the crossing logic of a word square. The
easy squares are vocabulary practice with a clear method; the harder ones
need you to reason between rows and columns rather than guess.

## History

Word squares are ancient — the Latin SATOR square was found scratched on
walls at Pompeii — and double word squares, with different words across
and down, were a Victorian puzzle-page staple. Colour-feedback guessing
comes from the pencil-and-paper game Jotto (1955) and the board game
Mastermind (Mordecai Meirowitz, 1970), and became a worldwide habit with
Josh Wardle's Wordle (2021). Squareword (2022) combined the two into a
daily word-square guessing game; this is a printable, clue-given deduction
version under a generic name.

## This implementation

- **Spec knobs:** `difficulty`, `cell`, `line`.
- **Levels:** Kids — a 4×4 square of everyday (basic-tier) words, every row
  pinned by its own guesses. Easy — 5×5, every row pinned by its own
  guesses. Medium — crossing between rows and columns is needed. Hard — a
  one-step trial is needed. Expert — none of those settles it; a deeper
  case split is needed.
- **Generation:** a double word square (all ten words different) is filled
  row by row from the family-friendly common tier (basic tier for the 4×4),
  each column kept a prefix of a pool word. Guesses are drawn from the same
  pool, never a word of the square: each row starts with one, chosen from a
  seeded sample as the one leaving the fewest candidates (bigger samples
  make stronger guesses for the easy bands), and guesses are added to the
  row with the most candidates until the square is unique. For Medium and
  above, every guess that is not needed is then removed. Several guess sets
  are tried per square, and several squares, until the rating matches the
  band; otherwise the nearest band found is served and labelled
  (`requested_difficulty`).
- **Solving / proof:** each row's candidates are every word of the large
  dictionary (`Tier::Large`, SCOWL ≤ 70, ≈ 114k words) that would have
  earned exactly the printed colours; crossing elimination prunes rows
  against columns (any large word); an exhaustive search over rows, pruned
  by the starts of large words down each column, counts squares and stops
  at two. Tests re-check with a separate plain search over string
  candidates. Rated by the easiest sound method that settles the square
  (`rows_alone`, `crossing`, `trial`, `search`).
- **Guarantees:** deterministic per seed; every row and column is a
  large-dictionary word and every guess's colours are correct; no other
  square of large-dictionary words fits every colour (`unique`); all words
  shown pass the family-friendly filter. Hard is not reached for every seed
  — a square whose minimal guesses always settle by crossing is served as
  Medium and labelled so.
- **Version 1.1:** the shared family-friendly word filter now refuses more words (an audit of the everyday dictionary tiers: crude, sexual, drug, drink and violent words and inflections of words already refused), so some pages draw different words.
