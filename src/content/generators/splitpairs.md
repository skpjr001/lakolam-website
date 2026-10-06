---
title: "Split Pairs"
blurb: "Split Pairs — a clue-free crossword where every entry is two words differing only in a split pair of squares"
category: word
version: "1.0.0"
---
A crossword with no clues where every answer is two words at once.

## What it is

Every entry in the grid is a pair of words that are spelled the same except
for two neighbouring squares. Those two squares are printed split by a
diagonal line, with two letters on each side. Fill the empty squares so
that the entry makes a real word with the letters on either side of the
split: S P [AR / IT] E reads SPARE one way and SPITE the other. Entries
cross like a crossword, so every square you fill must work for every word
through it.

## How to play

Pick an entry and read the two letter pairs in its split square. Ask which
letters around them make a word with both pairs: _ _ AR _ and _ _ IT _ have
the same letters in the blank squares, so try words that fit both, such as
SPARE and SPITE, or SPARS and SPITS. Usually several pairs are possible at
first.

The crossings decide. A letter shared with a crossing entry must also work
there, so fill the entries you are surest of and use their letters to rule
out choices elsewhere. Every word is an everyday English word, and there is
exactly one way to fill the grid. A few grids print a starter letter in a
shaded square.

## Purpose

A clue-free crossword that is all wordplay: no general knowledge, only
spotting which letters can surround two different pairs. It exercises
vocabulary and spelling, and the crossing logic keeps it fair.

## History

The format was invented by the American puzzle constructor George Bredehorn
and was a long-running favourite in GAMES magazine. This is an original
generator of puzzles in that style.

## This implementation

- **Spec knobs:** `difficulty`, `cell`, `line`.
- **Generation:** every pair of family-friendly, everyday (Basic tier)
  words of 4–7 letters that are identical except for a two-letter window,
  where both letters differ, is indexed; plain inflections (plurals, -ED,
  -ING) are left out. A criss-cross of pairs grows from a long first entry:
  each new entry crosses the grid only at unsplit squares, with matching
  letters and no side-by-side contact, and placements with the most
  crossings are preferred. Targets: 4, 6, 8, 11 and 14 entries in grids up
  to 8, 9, 11, 12 and 15 squares across.
- **Solving:** each entry's domain is every way to fill its unsplit squares
  so that *both* words are in the large dictionary (about 114,000 words).
  An exhaustive search over the crossings counts fills and stops at two.
  While two fills exist, a starter letter is printed where they differ;
  then every starter that is no longer needed is removed. Most grids need
  none; the best of several layouts (closest band, fewest starters) is
  kept.
- **Guarantees:** deterministic per seed; every word is a real everyday
  word; split squares are never crossed; exactly one fill matches the
  splits and starters, re-checked in the tests by an independent count
  (domains built from the other side of the split, plain entry-order
  search). Splits are always two squares wide. `rating_basis` is
  `pairs_and_starters`: entries minus one for every two starters — up to 4
  Kids, 5–6 Easy, 7–9 Medium, 10–12 Hard, 13 or more Expert, served at the
  nearest reachable band and labelled so (`requested_difficulty`).
