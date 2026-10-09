---
title: "Missing Link"
blurb: "Missing Link — find the one word that joins each row's three clue words into compound words"
category: word
version: "1.1.0"
---
Find the one word that joins all three clues in a row into compound words.

## What it is

Each row shows three clue words beside a row of empty boxes. One word fits
the boxes and joins every clue to make a single, everyday compound word. A
clue printed to the left of the boxes goes in front of the answer: FOOT,
BASKET and SNOW all go in front of BALL. A clue printed to the right comes
after it: BALL then ROOM makes BALLROOM. The first box of every answer is
shaded, and the shaded letters, read from top to bottom, spell a hidden word.

## How to play

Read the three clues in a row and look for a word that would make a new word
with each of them. Put the answer after any clue on the left (SNOW + BALL =
SNOWBALL) and in front of any clue on the right (BALL + ROOM = BALLROOM).
The number of boxes tells you how long the answer is, and it must work with
all three clues, not just one or two. Write the answer in the boxes. When
you have filled every row, read the shaded first letters from top to bottom
and write the hidden word in the boxes at the bottom. If a row has you
stuck, the hidden word can help: once you can guess it, you know the first
letter of every answer.

## Purpose

A quick, satisfying vocabulary puzzle. Hunting for the shared word trains
the habit of seeing words inside words, practises spelling of compound
words, and rewards lateral thinking more than knowledge. Rows are short, so
it suits a coffee break, a classroom warm-up or a puzzle book's word
section, and the hidden word gives a second, smaller reward at the end.

## History

Linking puzzles of this kind have run in newspapers and puzzle magazines for
decades, under names such as Link Words, Missing Links, Common Ground and
Word Links, and they appear on television quizzes where a team must find
the word that connects a set of clues. Compound words are a natural source:
English builds new words by joining old ones (football, sunflower,
bookcase) far more freely than many languages.

## This implementation

- **Spec knobs:** `difficulty`, `acrostic` (default on: the answers' first
  letters spell a hidden word), `cell` (box size), `line`.
- **Generation:** the compounds come from a curated list written for this
  project: link words with the words that go in front of them and after
  them, genuine compounds only, so accidental splits such as CAR + PET never
  appear. Every clue and link must be a common, family-friendly word, and
  every compound a dictionary word a keen solver knows. With the acrostic
  on, a hidden word is chosen whose every letter starts some usable link,
  and each row is built for its letter. Clues never repeat on a page and are
  never another row's answer.
- **Bands:** Kids 5 rows and Easy 6 rows, every row with all three clues on
  one side and the most common compounds preferred; Medium 8 rows, three
  of them mixing sides; Hard 9 rows, six mixed; Expert 10 rows, all mixed,
  where the solver must try each answer both in front of and behind words.
- **Solving:** for each row, every word of the answer's length in a large
  dictionary of about 114,000 words is tried against every clue on its
  printed side; a row ships only when the answer is the single survivor.
- **Guarantees:** deterministic per seed; every row has exactly one answer
  of its length, proven against the large dictionary (generation reads the
  candidates off the first clue; the tests re-count by trying every word of
  the answer's length); the shaded letters spell the hidden word. Rated by
  the number of rows and how many rows mix clue sides (`rating_basis`:
  `rows_and_mixed_sides`): no mixed rows is Kids (up to 5 rows) or Easy;
  some mixed rows (up to half, up to 8 rows) Medium; more Hard; all mixed
  Expert. Every band is served as requested.
- **Version 1.1:** the shared family-friendly word filter now refuses more words (an audit of the everyday dictionary tiers: crude, sexual, drug, drink and violent words and inflections of words already refused), so some pages draw different words.
