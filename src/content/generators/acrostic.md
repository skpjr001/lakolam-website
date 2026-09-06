---
title: "Acrostic"
blurb: "Acrostic — unscramble each row, read the initials for the hidden word"
category: word
version: "1.0.0"
---
Unscramble each row into a real word; the first letters, read down, spell the
hidden word.

## What it is

A short stack of scrambled words. Solving each fills its answer boxes, and the
shaded first column — the initial of every answer — reads top to bottom as a
hidden word. The scramble is the only clue; the acrostic is the reward.

## How to play

Work the rows in any order: each scramble is an anagram of exactly one word in
the puzzle's vocabulary, so there is never a choice of answer. As the initials
fill in, the hidden word often reveals itself before the last row is solved,
and can be used to confirm the rest.

## Purpose

The acrostic tradition — clued answers whose initials spell a message — dates
to Elizabeth Kingsley's 1934 *Saturday Review* puzzles and the New York
Times's long-running series. This is its purest mechanical form, and it lets
the workspace ship an acrostic with an *honest* guarantee: rather than lean on
clue definitions it cannot verify, it stands on the same proven
anagram-uniqueness that `lako-jumble` established.

## History

Modern acrostics were invented by Elizabeth Kingsley in 1934; the NYT ran her
double-crostics from 1943 and has published acrostics ever since, alongside
its famous crossword.

## This implementation

- **Spec knobs:** `hidden` (the word to spell; empty picks one per seed),
  `wordlist` (override vocabulary), `cell`.
- **Generation:** runs backward from the hidden word — for each of its
  letters, a distinct anagram-unique vocabulary word beginning with that
  letter is drawn (shuffled per initial, so the same hidden word yields
  different puzzles across seeds), then scrambled to a spelling that is not
  the original.
- **Guarantees:** deterministic per seed; every row is anagram-unique in the
  vocabulary (so each has exactly one solution) and genuinely scrambled; the
  initials provably spell the hidden word — all three checked at build time,
  not assumed. Rated gently by the hidden word's length (more rows to solve),
  and the metadata names the basis.
