---
title: "Anagram Magic Square"
blurb: "Anagram Magic Square — unscramble the cells, read the magic-order initials"
category: word
version: "1.0.0"
---
Unscramble the nine words, then read their first letters in the order the
magic square gives — 1, 2, 3 up to 9 — to reveal a hidden word.

## What it is

A 3×3 grid holds nine scrambled words, and its cells are numbered 1 to 9 in a
magic square: every row, column and diagonal sums to fifteen. Solve each
anagram, follow the numbers in order, and the answers' initials spell a hidden
tenth word.

## How to play

Unscramble each cell — every scramble makes exactly one word, so there is no
guessing. Then walk the cells in numeric order, collecting first letters. The
magic square is both the reading key and a self-check: if your numbers do not
add to fifteen every way, something is wrong.

## Purpose

A Penny-press classic that is an unusually clean fit for this engine: three
guarantees stacked, all provable. The number side is a real magic square; the
word side rests on the anagram-uniqueness `lako-jumble` established; and the
acrostic ties them together into one hidden answer.

## History

The Anagram Magic Square is a long-running Penny Dell / Penny Press title,
pairing the ancient magic square with wordplay and a hidden-message payoff.

## This implementation

- **Spec knobs:** `hidden` (the nine-letter word to spell; empty picks one per
  seed), `cell`, `line`.
- **Generation:** runs backward from the hidden word — for each of its nine
  letters an anagram-unique word beginning with that letter is drawn, then
  scrambled; the words are placed so the cell numbered *k* (in a randomly
  oriented Lo Shu square) holds word *k*.
- **Guarantees:** deterministic per seed; all three rules checked — the numbers
  form a magic square (every line sums to fifteen), every scramble is a genuine
  anagram of exactly one vocabulary word, and the initials in number order
  spell the hidden word. Vocabulary vendored, so the crate depends on no other
  generator.
