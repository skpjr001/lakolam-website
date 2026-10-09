---
title: "Clueless Crossword"
blurb: "Clueless Crossword — a few letters given and no clues: fill the grid so every run across and down is a word"
category: word
version: "1.1.0"
---
A crossword with no clues at all: a few letters are given, and every run across and down must be a word.

## What it is

A small crossword grid, black squares and all, with some of its letters
already printed and no clues. Fill in the empty squares so that every
row and every column reads as real words of three or more letters,
separated by black squares. The given letters are just enough: there is
exactly one way to finish the grid.

## How to play

Every white square takes one letter. Wherever two or more white squares
run together across or down, they must spell an everyday English word —
no names, no abbreviations. Every white square belongs to a word across
and a word down, so each letter you write has to work both ways.

Start with the words that have the most letters given: often only one
word fits, so write it in. Each new word gives letters to the words that
cross it. When no word is certain, look at a single empty square and ask
which letters could go there for the word across and the word down —
sometimes only one letter suits both. There is exactly one solution.

## Purpose

A crossword for people who know their words but find clues a chore. It
exercises spelling and word patterns (which letters can follow which,
which endings are possible) and the crossing logic of a crossword,
without needing general knowledge, wordplay or a particular culture.

## History

Puzzle magazines have long printed variations on the clueless
crossword — grids with a scattering of given letters and no clues — and
mobile apps have revived the form in recent years under names like
Clueless Crossword. Its fairness rests entirely on the given letters:
too few and the grid has several fillings, which is why each grid here is
checked against a large dictionary rather than only the words it was
filled from.

## This implementation

- **Spec knobs:** `difficulty`; `size` — grid side 5 to 9 squares (0 =
  the difficulty's; other values are clamped); `cell` (square size, 16–48
  pt); `line` (0.3–3 pt).
- **Levels:** Easy — 5×5, every word can be found from its own given
  letters. Medium — 7×7, the same. Hard — 7×7, some squares need the
  crossing-letters reasoning. Expert — 9×9 with crossing letters. Kids is
  not reachable (a 5×5 grid is already Easy) and is served as Easy. An
  explicit size sets the band honestly (a 9×9 grid with words-only
  reasoning is Hard).
- **Generation:** a 180°-symmetric, fully checked block pattern (every
  run 3 to 5 letters on grids up to 6×6, 3 to 7 above; white squares
  connected; no 2×2 of blocks) is filled from family-friendly words —
  three-letter words from the basic tier, longer ones from the common
  tier — with a bitset slot filler. Every letter starts as a given; the
  givens are visited in a seeded order and each one is rubbed out if the
  grid still solves with the level's technique. Every given left is
  needed.
- **Solving:** two sound techniques against the large dictionary (SCOWL
  ≤ 70, ≈ 114k words). *Word fit*: a run whose known letters fit exactly
  one dictionary word is filled with it. *Crossing letters*: each square
  keeps only the letters that some still-possible word across and some
  still-possible word down put there, and each run keeps only the words
  whose letters are all still possible, repeated until nothing changes.
  The rating is the weakest technique that settles every square, plus
  the grid size.
- **Guarantees:** deterministic per seed; the technique settling every
  square is itself a proof of uniqueness, and an exhaustive count (crossing
  letters plus branching, capped at two, node-budgeted — a spent budget
  is ambiguous, never unique) confirms it; the tests re-count every level
  with an independent square-by-square search over dictionary prefixes.
  Answers are family-friendly common words; the proof also covers rarer
  words, so a solver with a big vocabulary finds no second filling. If a
  grid size cannot be generated, a smaller grid is used and meta records
  `requested_size`. Meta carries `unique`, `difficulty` with
  `rating_basis: grid_size_and_technique`, `technique`, the number of
  givens and the answer words.
- **Version 1.1:** the shared family-friendly word filter now refuses more words (an audit of the everyday dictionary tiers: crude, sexual, drug, drink and violent words and inflections of words already refused), so some pages draw different words.
