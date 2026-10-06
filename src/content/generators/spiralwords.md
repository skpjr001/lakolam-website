---
title: "Spiral Words"
blurb: "Spiral words — themed words chain last letter to first around a square spiral; find the order"
category: word
version: "1.0.0"
---
A chain of themed words winds into the centre of a square spiral. Each word
begins with the last letter of the one before — put them in order.

## What it is

A square grid walled into a single spiral corridor that starts at the arrow
in the top-left corner and winds clockwise into the middle. Below it is a
list of words on one theme, in alphabetical order. The words fill the
corridor one after another, and each word **starts with the last letter of
the word before it**, so neighbouring words share a square. A few letters
are already in the spiral to get you going; only one order of the list fits.

## How to play

Begin at the arrow. The first letter is given: find the words in the list
that start with it, and try one in the corridor, following the spiral
round the corners. Its last letter is also the first letter of the next
word, written in the same square. Carry on until every word is used and the
corridor is full.

Use the given letters to check yourself: a word that would put the wrong
letter on a given square is not the right one. On the easier spirals there
is always just one word that fits next. On the harder ones, two words may
seem to fit; look ahead, because the wrong choice leaves a word that can no
longer join the chain. Cross words off the list as you place them.

## Purpose

A gentle vocabulary and spelling puzzle with a satisfying shape: young
solvers practise themed words and letter matching, and the harder spirals
add planning — choosing an order so that every word can still be linked.

## History

Spiral word puzzles — "whirly words", "spiral crosswords" and "word
spirals" — have run in puzzle magazines and children's activity books for
decades, usually with a clue for each word. Word chains in which each word
begins with the previous word's last letter are the old parlour game also
known as Grab on Behind or Last and First, and the Japanese game
shiritori. This version replaces the clues with a themed list to order.

## This implementation

- **Spec knobs:** `difficulty`, `theme` (a word-list id such as `animals`,
  `space`, `fruit`; empty picks one of about two dozen family-friendly
  themes), `overlap` (1 or 2 shared letters; two-letter chains use everyday
  words, because theme lists are too small to chain on two letters, and
  ignore `theme`), `theme_hint`, `cell`, `line`.
- **Levels:** Kids — 5 words; Easy — 7; Medium — 9; in each the chain can be
  followed from the start with only one fitting word at every step. Hard —
  10 words; Expert — 12; both need looking ahead at some step. If a theme
  cannot give a chain of the full length, up to two words fewer are used.
- **Generation:** the theme's words (3–9 letters, family-friendly) form an
  overlap graph; a chain of the level's length is found by randomised
  depth-first search, and the spiral is the smallest square that holds it
  (unused centre squares are shaded). The first letter is always given.
  While a second ordering fits, a square where the two orderings differ is
  revealed; for the easy bands, squares are also revealed where a
  step-by-step solver would face a choice. Givens that are not needed are
  then removed. Several themes and chains are tried until the rating
  matches the band, otherwise the nearest is served and labelled
  (`requested_difficulty`).
- **Solving / proof:** every ordering of the listed words that chains
  correctly and agrees with the given letters is counted, stopping at two
  (a search past its node budget counts as ambiguous). Tests re-check with
  a plain search that spells each complete ordering and compares it with
  the givens. Rated by whether the chain is forced step by step and by its
  length (`forced_chain_and_length`).
- **Guarantees:** deterministic per seed; exactly one order of the listed
  words links correctly and fits the given letters (`unique`); every word
  passes the family-friendly filter. The answer page fills the spiral,
  tints the shared squares and numbers the list in chain order.
