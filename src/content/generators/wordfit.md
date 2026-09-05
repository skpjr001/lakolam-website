---
title: "Word Fit (Criss-Cross)"
blurb: "Criss-cross fill-in puzzles with a proven-unique arrangement"
category: word
version: "1.0.0"
---
Fit the listed words into the interlocking skeleton — no clues, just shapes
and crossings.

## What it is

A crossword-like frame of horizontal and vertical slots, and a word list
grouped by length. Every word is used exactly once; crossing slots must agree
on their shared letter. Unlike a crossword there are no definitions — the
letter crossings are the whole constraint.

## How to play

Start where the list gives no choice: a length with only one word, or the
longest slot. Each placement fixes letters in every crossing slot, narrowing
their candidate lists; the puzzle cascades from a single confident entry.
When two words could fill a slot, look one crossing further — one of them
will contradict a neighbour.

## Purpose

The crossword's self-contained cousin: it needs no clue-writing, so it ships
in any theme instantly — which is exactly why it precedes the crossword in
the product plan. In the workspace it is a clean exact-assignment search:
most-constrained-slot-first over a length-bucketed bank.

## History

"Kriss Kross" fill-in puzzles have run in Dell and Penny Press magazines
since the mid-20th century, a genre refined for decades before ever getting a
canonical inventor — none is recorded.

## This implementation

- **Spec knobs:** `rows`, `cols`, `words`/theme, `difficulty`.
- **Generation:** the skeleton is generated first (a random walk of slots
  with intersections), then filled by backtracking with
  most-constrained-slot-first from a wordlist bucketed by length.
- **Guarantees:** the shipped arrangement is proven **unique** — no other
  assignment of the same word list fits the same skeleton — which is the
  property that makes an answer key honest.
- **Difficulty:** slot count, crossing density, and how many words share each
  length (more same-length words means more real choice), banded.
