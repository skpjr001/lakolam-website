---
title: "Three-Choice Kriss Kross"
blurb: "Three-Choice Kriss Kross — a kriss-kross where each slot offers three words; pick the one per slot that makes every crossing agree"
category: word
version: "1.1.0"
---
Every slot in the grid offers three words, and only one of them fits. Pick
the right word for each slot so that every crossing agrees.

## What it is

A criss-cross grid of empty squares with numbered slots running across and
down. Below the grid, each slot has three words of the right length. One of
the three is the answer; the other two are decoys. A decoy never fits for
long: somewhere it puts a letter on a crossing square that no word of the
crossing slot can share. With the right word chosen in every slot, the
whole grid fills with letters that agree wherever two words cross.

## How to play

Look at a square where two slots cross. Each of the three words in one slot
puts a letter on that square, and so does each word in the other slot. A
word whose letter does not match any word of the crossing slot cannot be the
answer: cross it out. Do this all over the grid. Each word you cross out
may leave another word with no partner, so go round again until only one
word is left in every slot. Write the words into the grid. In the harder
puzzles you will need several rounds of crossing out, and the hardest may
need you to try a word and see whether it leads to a clash.

## Purpose

A word puzzle that is really a logic puzzle: no clues to solve and no
vocabulary to know, only careful letter-by-letter comparison. It practises
attention to spelling and systematic elimination, and the three-way choices
keep it approachable for solvers who find a blank crossword daunting.

## History

Crosswords offering a choice of answers have long appeared in puzzle
magazines, under names such as Three to One and Treble Chance, as a gentler
cousin of the fill-in (kriss kross) puzzle, where every word of a list must
be fitted into a grid. Here the list is broken into three-word choices per
slot, which turns fitting into a chain of eliminations.

## This implementation

- **Spec knobs:** `difficulty`, `cell` (square size), `line`.
- **Generation:** a kriss-kross of family-friendly dictionary words is grown
  one word at a time, each new word crossing the grid at a matching letter
  (alternating across and down, preferring more crossings, within a size
  limit). Kids grids have 5 slots of 3 to 5 letters from the most common
  words, Easy 7 slots of 3 to 6 letters, Medium 9, Hard 11 and Expert 13
  slots of 4 to 7 common words. Plurals, past tenses and similar
  inflections are left out. Each slot then gets two decoys of the same
  length that differ from the answer on at least one crossing square (a
  decoy matching the answer at every crossing could never be ruled out).
  The decoys are chosen by local search: one decoy at a time is swapped for
  another while the puzzle moves toward exactly one consistent fill and the
  band's number of elimination rounds. No word is printed twice.
- **Solving:** an exhaustive search over the three choices of every slot,
  with crossings agreeing and no word used twice, counts the fills and stops
  at two.
- **Guarantees:** deterministic per seed; exactly one choice per slot fills
  the grid, re-checked in the tests by walking all the choices slot by slot
  in printed order and writing letters into the grid squares. Rated by
  replaying the solver's elimination (`rating_basis`:
  `elimination_rounds`): in each round, every word with no matching partner
  in some crossing slot is crossed out. One round settles Kids (up to 5
  slots) or Easy; two rounds Medium; three or four Hard; five or more, or a
  trial guess, Expert. When the search cannot reach the requested band, the
  nearest band is returned and labelled honestly.
- **Version 1.1:** the shared family-friendly word filter now refuses more words (an audit of the everyday dictionary tiers: crude, sexual, drug, drink and violent words and inflections of words already refused), so some pages draw different words.
