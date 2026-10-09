---
title: "Cryptogram"
blurb: "Substitution ciphers over public-domain quotes, with a frequency table"
category: word
version: "1.1.0"
---
Break the substitution cipher and recover the quotation.

## What it is

A short text — here, a public-domain quotation — enciphered by a consistent
letter-for-letter substitution: every A in the plaintext became the same
cipher letter, and no letter stands for itself. Punctuation, spacing and word
breaks survive, which is what makes it solvable with a pencil.

## How to play

One-letter words are A or I. The most frequent cipher letter is probably E,
T, A or O; a frequency table (printed alongside the puzzle) makes that concrete. Apostrophe patterns give T, S and N'T; double letters narrow
fast (LL, EE, SS, OO). Guess a common short word, propagate its letters
everywhere, and abandon the guess at the first contradiction — the cascade
either confirms itself in a few words or collapses.

## Purpose

The only text puzzle in the catalogue, and the one that trades on curation:
the corpus must be genuinely public-domain (pre-1929 or explicitly so), and
quote selection *is* the product. In the workspace it also demonstrates a
correctness property that looks like decoration and is not: the cipher is a
true derangement, because a letter mapping to itself hands out free letters.

## History

Substitution ciphers are ancient (Caesar's shift, the Hebrew atbash), but the
parlor puzzle dates to the 19th century — Edgar Allan Poe stoked the vogue
and built "The Gold-Bug" (1843) around frequency analysis. The American
Cryptogram Association (1929) standardised the hobby form it still has.

## This implementation

- **Spec knobs:** `corpus`/quote selection, `hints`, `difficulty`.
- **Generation:** a random **derangement** of the alphabet (no fixed points —
  built deranged in one pass, not by rejection) applied to a corpus quote;
  optional starter hints; a letter-frequency table shipped as an aux scene.
- **Guarantees:** the derangement property is tested for every seed; hint
  letters are verified against the key; the corpus is public-domain by
  construction.
- **Difficulty:** quote length, letter-frequency flatness, and how many one-
  and two-letter words are exposed, banded.
- **Version 1.1 — every band is served.** Without hints no English quote
  rates below Medium — letter flatness alone is about 0.9 — so Kids and Easy
  requests were served Medium (the schema promised Easy quotes for Kids;
  there were none). A request gentler than every quote at the requested
  hints now raises the hints one letter at a time, up to five, until a
  quote rates in that band: Easy gets one hint, Kids two (seeds 1–12). The
  hints are counted by the rating, so the label is measured, not relabelled,
  and meta `requested_hints` records the change. Measured over seeds 1–20,
  every band from Kids to Expert is served as asked. Medium, Hard and Expert
  pages are byte-identical to 1.0 (12 of 12 sampled per band); their meta
  gains `rating_basis` (`letter_flatness_length_short_words_hints`).
