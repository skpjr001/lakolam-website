---
title: "Vowelless"
blurb: "Vowelless — the consonants are given; restore the vowels"
category: word
version: "1.0.0"
---
Every answer has had its vowels removed and its consonants closed up. Put the
vowels back.

## What it is

A list of words printed as bare consonant skeletons — `QLT` for *quilt*,
`NJY` for *enjoy*. Only A, E, I, O and U have been taken out (Y stays put).
Restore each word.

## How to play

Say the consonants aloud and let the word surface; the length of the answer
tells you how many vowels are missing. Each skeleton belongs to just one word,
so once it clicks you can move on with confidence.

## Purpose

The newspaper "vowelless" novelty crossword, reduced to the part the engine
can prove. Rather than lean on clue definitions it cannot verify, it stands on
the same honest guarantee `lako-jumble` and `lako-acrostic` use: every clue's
skeleton belongs to exactly one word in the vocabulary. It is the first
vowel-restoration mechanic in the catalogue.

## History

Vowelless (or "missing vowels") puzzles are a long-running variety fixture in
British puzzle magazines like *Puzzler*, and a common novelty in word-puzzle
books.

## This implementation

- **Spec knobs:** `words` (4–12), `wordlist` (override vocabulary), `cell`.
- **Generation:** every word whose consonant skeleton is *unique* in the
  vocabulary is a candidate; a spread of them is drawn per seed and printed as
  skeletons.
- **Guarantees:** deterministic per seed; each skeleton restores to exactly one
  vocabulary word (checked against the full list, so a skeleton with two
  readings is refused) and every answer genuinely drops at least one vowel.
  Rated by how many words are on the page.
