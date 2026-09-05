---
title: "Word Ladder"
blurb: "Word ladder — Carroll's doublets, with the shortest path proven unique"
category: word
version: "1.0.0"
---
Change one letter per step, every rung a real word: WAIT to MIND in four
moves.

## What it is

Lewis Carroll's "Doublets", published in *Vanity Fair* in 1879 — he claimed
to have invented it on Christmas Day 1877 for two bored young ladies. The
form has been a puzzle-page staple ever since, and a computer-science
standard (shortest paths in the one-letter-difference graph).

## How to play

Fill each empty row with a word that differs from the row above by exactly
one letter, arriving at the bottom word in the printed number of steps.

## The implementation's guarantees

- **The shortest ladder is proven unique** before publishing: a
  path-counting BFS over the vocabulary's one-letter graph accepts an
  endpoint pair only when exactly one shortest path realises the printed
  length — so the answer key is *the* answer at that length, not one of
  several. Longer detours always exist; the claim is scoped to the rung
  count, and says so.
- A second, independent BFS in the tests re-verifies distance and path count
  for every published ladder, so the search and the claim cannot share a bug.
- ~590 common four-letter words ship built-in; custom lists work if all words
  share one length.
- Rating basis: `rung_count` (≤3 Easy, 4 Medium, more Hard).
