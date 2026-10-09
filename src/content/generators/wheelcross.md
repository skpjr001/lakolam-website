---
title: "Letter Wheel Crossword"
blurb: "Letter Wheel Crossword — fill a small grid with words spelled from the letters on a wheel"
category: word
version: "1.1.0"
---
A wheel of letters and a small crossword: every answer is spelled from the
wheel.

## What it is

Five to seven letters sit around a wheel. Above it is a small criss-cross
grid of empty squares. Every word in the grid can be made from the letters
on the wheel, and one of them uses every letter. There are no clues and no
word list: find the words that fit. A few squares may already hold a letter
to get you started.

## How to play

Make words from the letters on the wheel, using each letter no more often
than it appears there. Every word in the grid is at least three letters
long, and every word is different. The longest space in the grid takes a
word that uses all the letters on the wheel, so it is a good first target.

Where two words cross, they share a letter. Once a word is in, its letters
tell you the first or last letter of the words that cross it. Use the
length of each space and any letters already in it to choose between
possible words. There is exactly one way to complete the grid.

## Purpose

A gentle, satisfying word hunt with a built-in check: a word that fits the
wheel but not the crossings is not the answer. The large squares make it
easy to read and write in, so it suits large-print books, younger solvers
and anyone who enjoys anagrams.

## History

Letter-wheel crosswords became hugely popular as mobile word games in the
2010s, where the player swipes across a ring of letters to fill a small
grid. They descend from much older anagram and "how many words can you
make" puzzles found in newspapers and puzzle books.

## This implementation

- **Spec knobs:** `difficulty`, `cell` (square size; default 40 pt, large
  print), `line`.
- **Generation:** the wheel is an everyday (Basic tier), family-friendly
  word of 5 letters (Kids, Easy), 6 (Medium) or 7 (Hard, Expert). Every
  family-friendly word of 3 letters or more that the wheel can spell (Basic
  tier for Kids and Easy, Common otherwise) is a candidate. A criss-cross
  grows from the full-wheel word: each new word must cross the grid at
  matching letters without touching other words side by side, placements
  with more crossings are preferred, and the grid stays within 7×7 to
  11×11. Targets: 4, 6, 7, 9 and 11 words.
- **Solving:** each space's domain is *every* word of its length in the
  large dictionary (about 114,000 words) that the wheel can spell. An
  exhaustive search over the crossings, with all words different, counts
  the fills and stops at two. While two fills exist, a starter letter is
  printed in a square where they differ; then each starter is removed again
  if the grid stays unique without it.
- **Guarantees:** deterministic per seed; every answer is a real,
  family-friendly word spelled from the wheel; one answer uses the whole
  wheel; exactly one fill matches the grid and its starters, re-checked in
  the tests by an independent count (domains by sorted-letter matching,
  plain slot-order search). `rating_basis` is
  `wheel_letters_words_and_starters`: words to find, plus two for every
  wheel letter beyond five, minus one for every two starters. Bands are
  served at the nearest reachable band and labelled so
  (`requested_difficulty` in the metadata).
- **Version 1.1:** the shared family-friendly word filter now refuses more words (an audit of the everyday dictionary tiers: crude, sexual, drug, drink and violent words and inflections of words already refused), so some pages draw different words.
