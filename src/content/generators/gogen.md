---
title: "Gogen"
blurb: "Gogen — place 25 letters so every listed word traces through touching cells"
category: word
version: "1.0.0"
---
Twenty-five letters, a list of words, one way to fit them all in a 5x5
grid.

## What it is

A 5x5 grid holds the letters A to Y, each exactly once (Z is left out).
Nine letters are printed, in the corners, the middles of the edges and the
centre. Below the grid is a list of words. Every word can be traced through
the grid by moving from each letter to the next through touching squares:
side by side or corner to corner. Fill in the other sixteen letters so that
every word on the list can be traced.

## How to play

The letters still to place are printed under the grid. For each word, every
pair of letters next to each other in the word must sit in touching squares.
Start with a missing letter that appears in a word next to a printed letter:
it must go in one of the squares around that printed letter. Two printed
neighbours narrow it down further, often to a single square. Write small
pencil notes of the squares each letter could take, and cross a letter off
the list when it is placed.

As the grid fills, look at it the other way round too: an empty square that
only one remaining letter can reach must hold that letter. On the harder
puzzles, ask whether a letter's square would leave room for all its
neighbours from the word list: a square with no free space nearby for a
letter that must touch it is ruled out. Each letter is used once only, and a
word may pass through the same square more than once.

## Purpose

Gogen is a logic puzzle that happens to be made of words. Spelling is never
in doubt (the words are printed), so the challenge is pure placement
reasoning: keeping track of which letters must touch, and what that rules
out. It suits word lovers who also enjoy sudoku.

## History

Gogen is credited to the puzzle setter Charles Lyons and became known in
the mid-2000s through British newspapers, notably The Daily Telegraph. Its
fixed pattern of nine printed letters and its Z-less alphabet are part of
the classic form.

## This implementation

- **Spec knobs:** `difficulty`, `cell` (distance between letters), `line`.
- **Generation:** a random arrangement of the 25 letters is improved by
  hill-climbing on letter swaps toward one that many common words trace
  through, and in which every hidden letter has partners. Every
  family-friendly dictionary word that traces through the final arrangement
  starts on the list (Kids: the Basic tier, 3 to 5 letters; Easy: Basic, 4
  to 6; Medium: Common, 4 to 7; Hard and Expert: Common, 4 to 8; no word
  with Z or a doubled letter). The list is then thinned: words are dropped in
  a random order, shorter ones a little sooner, whenever the puzzle stays
  unique and no harder than the band. Several drop orders and arrangements
  are tried to land exactly on the band.
- **Solving:** each word becomes letter pairs that must touch. An exhaustive
  count places the hidden letters (most constrained first) and stops at two.
  A separate logical solver rates the puzzle by its hardest step: a letter
  with one possible square (Easy; Kids with short Basic words), a square
  only one letter can reach (Medium), ruling out a square because a partner
  letter could not then touch it (Hard), or none of these suffices and a
  trial placement is needed (Expert).
- **Guarantees:** deterministic per seed; every listed word traces through
  the answer; exactly one arrangement fits the words and the nine printed
  letters, proven by the exhaustive count and re-checked in the tests by an
  independent count in plain alphabetical order that reads adjacency
  straight off the words. Uniqueness depends only on the printed list, never
  on a dictionary. `rating_basis` is `hardest_technique`, and the step is
  named in the metadata.
