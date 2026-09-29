---
title: "Letter Boxed"
blurb: "Letter Boxed - chain words round a square of 12 letters, using them all in the fewest words"
category: word
version: "1.0.0"
---
Twelve letters round a square: chain words together until every letter is
used, in as few words as you can.

## What it is

A square with three letters on each side. You make words by travelling
round the box, but a word can never use two letters from the same side one
after the other. The words link up in a chain: each new word starts with the
last letter of the word before. The puzzle is finished when every one of the
twelve letters has been used at least once, and the page gives a target —
the smallest number of words that can do it.

## How to play

Make words of three or more letters from the letters round the box. Letters
that sit next to each other in a word must come from different sides of the
square; letters may be used more than once. Write the first word on line 1.
The next word must begin with the last letter of that word, and so on down
the lines. Keep going until you have used all twelve letters. Try to finish
in the target number of words — it can always be done, and it cannot be done
in fewer. Plural and past forms count only if they are ordinary words.

## Purpose

Letter Boxed rewards the same skills as a crossword without any clues:
spelling, vocabulary and planning ahead, because a word that ends on an
awkward letter leaves nowhere to go. The target makes it a proper puzzle —
any chain that uses the letters counts, but matching the target means
choosing words that sweep up many new letters at once.

## History

Letter Boxed was created by Sam Ezersky for The New York Times and launched
among its daily games in 2019, where it quickly became one of the paper's
most-played word puzzles. Its square of twelve letters and "next letter from
another side" rule have been widely copied since.

## This implementation

- **Spec knobs:** `difficulty`, `size` (side of the square in Pt), `line`.
- **Dictionary:** about 3,350 common, family-friendly English words of three
  to eight letters, vendored from the workspace's curated lists, minus a
  short blocklist and minus words with a doubled letter (which the side rule
  makes unplayable).
- **Generation:** a seeded random chain of dictionary words is drawn that
  covers exactly twelve letters, each word starting with the previous word's
  last letter; the letters are then dealt three to a side by a backtracking
  search so no two letters that follow each other in the chain share a side.
  Kids and Easy chains use words of up to six letters. The box is kept only
  if the chain is one of the shortest solutions and the rating lands in the
  requested band.
- **Solving:** every dictionary word the box can make is found; a
  breadth-first search over states (letters used, last letter) finds the
  fewest words any solution needs and counts every word sequence of that
  length. Difficulty is rated by that count (`rating_basis`
  `fewest_words_and_shortest_solution_count`): Kids 5 words, Easy 4,
  Medium 3, Hard 2 with three or more two-word solutions, Expert 2 with at
  most two. The page's target is the proven fewest.
- **Guarantees:** deterministic per seed. The key's words are all in the
  dictionary, obey the side rule, chain end to start and use all twelve
  letters; no solution with fewer words exists in the dictionary — proven by
  the breadth-first search and re-checked in the tests by an independent
  depth-first search, which also re-counts the shortest solutions. Letter
  Boxed has many answers by design, so no uniqueness is claimed: meta
  carries `answers_checked`, and a solver may find real words that are not
  in the list.
