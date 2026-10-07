---
title: "Anakross"
blurb: "Anakross — unjumble eight-letter words and wrap each clockwise round its numbered diamond; neighbours share their tips"
category: word
version: "1.0.0"
---
Unjumble eight-letter words, then wrap each one clockwise round its numbered diamond.

## What it is

A grid of numbered diamonds, each a ring of eight squares round its
number. Neighbouring diamonds touch at their tips and share the square
there. Below the grid is a list of jumbled eight-letter words, one for
each diamond but in no particular order, and a few starter letters are
printed in the grid. Unjumble the words, then work out which diamond each
one goes round.

## How to play

Each answer reads clockwise round one number, starting from the square at
the top of its diamond (marked with a small line underneath) — top, then
the squares down the right-hand side, along the bottom and back up the
left. First solve the jumbles: each one has exactly one answer. Then fit
the words into the diamonds. Where two diamonds touch, the shared square
is a letter of both words, so a word's first, third, fifth and seventh
letters must agree with its neighbours. The starter letters show where to
begin. Every word is used once.

## Purpose

Anakross combines two skills: anagram solving, which exercises
vocabulary and letter-pattern recognition, and fitting, which is pure
logic — testing which word can go where. Neither half alone finishes the
puzzle, so solvers switch between them, and a word found in the grid can
help crack a jumble that resisted.

## History

Anakross is a staple of British puzzle magazines, published under that
name by Puzzler Media among its A to Z of puzzle types. It joins the old
anagram clue — a staple since Victorian word games — to the fitword or
"kriss kross" puzzle, in which a list of words must be fitted into a
grid.

## This implementation

- **Spec knobs:** `difficulty`; `starters` (0 = the level's choice, or at
  least this many, up to 40 — fewer than the placement needs cannot be
  given, and the asked number is then reported as `requested_starters`);
  `cell` (14–48 pt); `line` (0.2–4 pt).
- **Levels:** Kids — 3 diamonds of everyday words, at least two starter
  letters per diamond; Easy — 5 diamonds of everyday words, at least one
  starter per diamond; Medium — 6 diamonds of common words, at least one
  starter per two diamonds; Hard — 8 diamonds, at least two starters;
  Expert — 10 diamonds, at least one starter. Starters beyond the floor
  are printed only where the placement needs them. The level is the number
  of diamonds, the word tier and the starters (`rating_basis`).
- **Generation:** diamonds are laid out on a checkerboard of centres so
  that neighbours share exactly one square, their tips. The rings are
  filled one by one with distinct family-friendly eight-letter words
  agreeing on shared squares, by randomised backtracking. Each word is
  jumbled until the jumble is not itself a word and, where possible, keeps
  no three letters of the answer together; jumbles are listed in
  alphabetical order. Starters begin as every square and are removed in
  random order (first letters last) while the placement stays unique, down
  to the level's floor.
- **Solving:** every answer is the *only* word of Lakolam's large
  dictionary (about 114,000 words) made of its letters, so each jumble has
  one solution. Placements are counted exhaustively — every assignment of
  words to diamonds that agrees with the starters and the shared tips —
  capped at two.
- **Guarantees:** deterministic per seed; each jumble has exactly one
  answer and exactly one placement fits (`unique`); every word is a
  family-friendly word of the level's tier. The tests recount the
  placements with an independent search and re-derive every jumble's
  answers by scanning the dictionary.
