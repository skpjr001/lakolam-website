---
title: "Tile Score"
blurb: "Tile Score — find the one top-scoring word from a rack of letter tiles on a strip of bonus squares"
category: word
version: "1.0.0"
---
Seven letter tiles, a strip of bonus squares — find the one word that scores the most.

## What it is

A word-building puzzle with points. Each problem gives a rack of letter
tiles, each marked with its value (common letters like E are worth 1,
rare ones like Q and Z are worth 10), and a strip of squares, some of
them bonus squares. Make a word from the tiles, place it on the strip,
and score it. The page gives the top score; exactly one word reaches it.

## How to play

1. Make a word of three or more letters from the tiles. Each tile can be
   used once.
2. Place the word on the strip, one tile per square, reading left to
   right. It can start on any square as long as it fits.
3. Score it: add up the tiles' values, doubling the value of a tile on a
   DL square (double letter) and tripling it on a TL square (triple
   letter). Then double the total for each DW square (double word) the
   word covers, and triple it for each TW square (triple word).
4. On a seven-tile rack, using all seven tiles scores 20 points more.

Try different words and different places on the strip. Can you find the
word that reaches the top score? Write it and its score on the lines.

## Purpose

Tile Score mixes vocabulary with arithmetic and strategy: a short word
with a high-value letter on the right square can beat a long word of
common letters. It rewards trying alternatives and checking sums, and the
known top score tells a solver when to stop looking.

## History

Scoring words built from lettered, valued tiles goes back to the
crossword board games of the 1930s and 40s. Newspapers have run daily
"best word from seven tiles" puzzles since the 1970s, and score-chasing
word games remain a staple of puzzle apps.

## This implementation

- **Spec knobs:** `difficulty`, `problems` (1–8; 0 = the level's default),
  `show_target` (print the top score), `name_line`, `width`, `height`,
  `margin`.
- **Levels:** Kids — 5 tiles on a 6-square strip with a double letter and
  a double word, the best word an everyday word, 4 problems. Easy — 6
  tiles, 7 squares, adds a triple letter; the best word a common word.
  Medium — 7 tiles, 8 squares. Hard — 7 tiles, 9 squares, adds a triple
  word; the best word may be less common. Expert — as Hard with a second
  double letter and twice as many high-value letters in the bag. The
  level is the rack size, the bonus squares and how common the best word
  must be (`rating_basis`); every band is served as asked.
- **Generation:** racks are drawn from the usual English tile-letter
  distribution (98 tiles, no blanks; at least two vowels and two
  consonants, no Q without a U); bonus squares are placed at random. The
  letter values are the usual letter-tile values.
- **Solving:** every word of Lakolam's large dictionary (about 114,000
  words) that the rack can spell is scored at every placement on the
  strip. A problem is kept only if exactly one word reaches the best
  score (the same word may reach it in more than one place — the key shows
  one), that word is family-friendly, at least four letters long and as
  common as the level requires, and the top score is worth finding (at
  least 12 on a five-tile rack, 18 otherwise). "Best" means best within
  that dictionary; it is not a claim about any particular word game's
  official word list.
- **Guarantees:** deterministic per seed; the printed top score is reached
  by exactly one word (`unique`), re-checked by rescoring before the page
  ships; the tests re-check it by an independent search over every
  arrangement of the tiles with separately written scoring.
