---
title: "Word Wheel"
blurb: "Word Wheel — find every word using the central letter, and the nine"
category: word
version: "1.0.0"
---
Nine letters, one at the hub. Find every word of four or more letters that
uses the centre — and the one word that uses all nine.

## What it is

A ring of eight letters around a central ninth. Each answer must use the
centre letter and only letters shown on the wheel, no more times than they
appear. The target — how many words there are to find — is printed, and there
is always one word using all nine letters.

## How to play

Fix the centre letter in mind; every word contains it. Work up by length:
four-letter words first, then five, hunting for the hidden nine. The printed
count tells you when you have them all.

## Purpose

The British newspaper staple (the *Nine Letter Word* or *Word Wheel*) that
the catalogue lacked, and one whose guarantee is unusually strong: the answer
key is the **complete** list of valid dictionary words, found by an exhaustive
scan, so the printed target is provably exact — not an estimate a setter hoped
was right.

## History

Word wheels spread through *The Guardian*, *The Times* and *The Washington
Post* through the 1990s and 2000s, and multiplied on mobile puzzle apps. The
form descends from the older "how many words" letter games.

## This implementation

- **Spec knobs:** `letters` (nine, centre first; empty picks a nine-letter
  word per seed), `difficulty`, `cell`.
- **Generation:** the nine letters come from a real nine-letter word, so a
  full-nine answer always exists; the ring is shuffled per seed. The
  dictionary is a vendored list of ~1,700 common four- to eight-letter words
  (kept in the crate, so it leans on no other generator), scanned
  exhaustively for every word spellable from the wheel through its centre.
- **Guarantees:** deterministic per seed; the answer key is the complete valid
  set (checked by an independent re-scan in the tests); a nine-letter answer
  always present. Rated by how many words there are to find — more is easier —
  with the basis named in the metadata.
