---
title: "Boggle Grid"
blurb: "Boggle grid — find words through touching letter dice; the key lists every word"
category: word
version: "1.0.0"
---
A grid of letter dice — find as many words as you can by linking touching
letters.

## What it is

A 4×4 (or 5×5) grid of letter dice. Make words by moving from die to die —
across, up, down or diagonally — using each die at most once in a word. Words
must be at least three letters long (four, or five, on harder grids). The
"Qu" die counts as the two letters together. The page says how many words and
points there are to find; the answer key lists them all.

## How to play

Start from common endings and beginnings — -ING, -ED, RE-, ST- — and see
which dice sit next to each other. Vowels in the middle of the grid are
generous; a corner consonant has only three neighbours. Longer words score
more: 3–4 letters 1 point, 5 letters 2, 6 letters 3, 7 letters 5, 8 or more
11, as in the game.

## Purpose

A newspaper staple in syndication for decades (daily "Boggle" features and
BrainBusters) and a classic family game, reduced to a single printable page:
no timer needed, and a complete answer key for checking. It adds the
catalogue's first free-path word search — `wordsearch` hides words in straight
lines; here they bend.

## History

Designed by Allan Turoff and released by Parker Brothers in 1972; Big Boggle,
the 5×5 version, followed in 1979.

## This implementation

- **Spec knobs:** `difficulty` (4×4 with three-letter words for Kids and Easy,
  four-letter minimum for Medium, 5×5 with four- and five-letter minimums for
  Hard and Expert), `cell`.
- **Generation:** the grid is rolled from the real dice sets — the sixteen
  classic dice for 4×4, the twenty-five Big Boggle dice for 5×5 — shuffled
  into place and each showing a random face. Rolls are drawn until the word
  count lands in the band for the difficulty and at least one word is three
  letters longer than the minimum.
- **Dictionary:** a vendored list of about 3,900 common English words of three
  to eight letters (the union of the workspace's curated lists).
- **Guarantees:** deterministic per seed; the answer key is the complete list
  of dictionary words the grid makes — a prefix-pruned depth-first search,
  re-checked in the tests by tracing every dictionary word directly. A real
  word missing from the list may still be found; the count is of words in the
  list.
