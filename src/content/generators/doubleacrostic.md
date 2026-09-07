---
title: "Double Acrostic"
blurb: "Double Acrostic — initials spell one word, finals spell another"
category: word
version: "1.0.0"
---
Unscramble each row into a word. The first letters, read down, spell one
hidden word; the last letters spell another.

## What it is

A short stack of scrambled words. Solve each, and two hidden words appear at
once — one down the shaded front column (the initials), one down the shaded
back column (the finals). The scramble is the only clue; the two words are the
reward.

## How to play

Work the rows in any order: each scramble is an anagram of exactly one word in
the vocabulary, so there is never a choice of answer. As the columns fill, the
two hidden words emerge and confirm the rest.

## Purpose

Lewis Carroll's original acrostic form — two words at once — and a companion
to `lako-acrostic`'s single hidden word. Like it, it ships with an *honest*
guarantee: rather than lean on clue definitions it cannot verify, it stands on
the proven anagram-uniqueness `lako-jumble` established.

## History

The double acrostic was invented by Lewis Carroll (Charles Dodgson), who
composed them as verse puzzles for children — words whose initials and finals
each spelled a theme. It predates the crossword by decades.

## This implementation

- **Spec knobs:** `front` and `back` (the two hidden words; empty picks a
  verified pair per seed), `cell`.
- **Generation:** runs backward from the two words — for each position a
  distinct anagram-unique word that starts with the front letter and ends with
  the back letter is drawn, then scrambled.
- **Guarantees:** deterministic per seed; every row is anagram-unique in the
  vocabulary (so each has one solution) and genuinely scrambled; the initials
  spell the front word and the finals spell the back word — all checked at
  build time. Vocabulary vendored, so the crate depends on no other generator.
