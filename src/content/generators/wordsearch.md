---
title: "Word Search"
blurb: "Themed word searches with distribution-matched filler and answer keys"
category: word
version: "1.0.0"
---
Find the listed words hidden in a grid of letters — across, down, and
diagonally, forwards or backwards.

## What it is

A rectangular grid of letters with a themed word list beside it. Every listed
word appears in the grid as a straight line of consecutive letters in one of
up to eight directions. The unused cells are filled with decoy letters.

## How to play

Scan for a word's rarest letter — a Q or a Z narrows candidates instantly.
Sweep each row and column with the word's first two letters in mind, then
check both diagonals. Circle finds and cross them off the list. In this
crate's harder settings, leftover letters can spell a hidden message once
every word is found.

## Purpose

The most accessible puzzle in the catalogue — no rules to learn, playable by
early readers — and the volume seller of printed collections. Product quality
lives in the themed wordlists more than the algorithm, and the crate treats
the fill as a craft problem: decoys are drawn from the placed words' own
letter distribution, because a uniform fill makes real words pop out.

## History

Invented by **Norman E. Gibat**, published in the *Selenby Digest* of Norman,
Oklahoma, in March 1968 (Spanish-language *sopa de letras* by Pedro Ocón de
Oro is a contemporaneous independent claim). Teachers spread it; by the
1970s it was a fixture of every puzzle magazine.

## This implementation

- **Spec knobs:** `rows`, `cols`, `theme`/word list, `directions` (kids mode
  restricts to left-to-right and top-to-bottom), `difficulty`.
- **Generation:** backtracking placement with controlled overlap density;
  fill letters sampled from the placed words' distribution; word list and
  answer key rendered from the same placement, so they cannot disagree.
- **Guarantees:** every listed word is findable and its occurrences are
  located by scanning the finished grid (the answer key is drawn from that
  scan, so key and grid cannot disagree); words the filler accidentally
  duplicates are counted and reported as ambiguous_words in the metadata.
- **Difficulty:** grid size, direction set, word length distribution and fill
  entropy, banded.
