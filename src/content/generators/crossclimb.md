---
title: "Crossclimb"
blurb: "Crossclimb — solve the scrambled clues, order the word ladder, unlock top and bottom"
category: word
version: "1.0.0"
---
Solve the clues, stack the answers into a word ladder, then unlock the top
and bottom rungs.

## What it is

A word ladder with clues. Five to seven words of the same length stand one
above another, and each differs from the word above it by exactly one letter.
The clues for the middle rungs are printed in scrambled order; the top and
bottom rungs are locked, with their own clues saved for last.

## How to play

Solve the numbered clues first. Every answer has the same number of letters
as the boxes in a row. Then arrange your answers in the middle rows so that
each word changes just one letter from the word above it - there is only one
order that works. With the middle of the ladder in place, unlock the top and
bottom rows: solve their clues, and check that the top word is one letter
away from the first middle word and the bottom word one letter away from the
last. If an answer will not fit anywhere in the ladder, it is probably wrong:
the ladder is a check on the clues, and the clues are a check on the ladder.

## Purpose

Two skills in one small puzzle: vocabulary (the clues) and pattern spotting
(the ordering). Because the ladder only accepts words one letter apart, a
half-remembered answer can often be confirmed or corrected by its neighbours,
which makes it friendly to solvers who find ordinary crosswords daunting.

## History

The word ladder itself is Lewis Carroll's "Doublets", published in *Vanity
Fair* in 1879. Crossclimb puts clues on the rungs; it is one of the daily
games LinkedIn launched in 2024 alongside Queens and Pinpoint, where the
middle rows are dragged into order and the top and bottom rows unlock once
the middle is right.

## This implementation

- **Spec knobs:** `difficulty`; `letters` (4 or 5) and `rungs` (5 to 7 words,
  top and bottom included), 0 picking each from the difficulty; `cell`,
  `line`.
- **Generation:** a self-avoiding random walk through the one-letter-change
  graph of a clued word list (the same project-written clue list the
  crossword uses, filtered to four and five letters), rejected until the
  order is forced; the middle clues are then shuffled so no clue sits beside
  its own rung.
- **Solving:** the ordering is checked by enumeration. The middle words'
  one-letter-change graph must have exactly one Hamiltonian path (read in
  either direction), the top word must touch one end of it and not the other,
  the bottom word the other end, and the whole ladder must have exactly one
  top-to-bottom Hamiltonian path.
- **Guarantees:** deterministic per seed; every word is in the dictionary and
  appears once; neighbouring rungs differ by exactly one letter; the ladder
  order is unique, re-proven in the tests by an independent method (every
  permutation of the middle words tried between the top and bottom). The
  answer key shows the filled ladder, shades the letter that changed on each
  rung, and numbers each rung with its scrambled clue. Rated by size: Easy is
  5 words of 4 letters, Medium 7 of 4 (the usual daily shape), Hard 6 of 5,
  Expert 7 of 5. The clues are general crossword vocabulary, so Kids builds
  the Easy ladder and is rated Easy.
