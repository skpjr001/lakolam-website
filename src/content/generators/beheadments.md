---
title: "Beheadments and Curtailments"
blurb: "Beheadments and curtailments — take one letter away to leave a new word; the letters spell a hidden word"
category: word
version: "1.0.0"
---
Take one letter off a word to leave another — PLATE becomes LATE, BEARD becomes BEAR — and the letters you take spell a hidden word.

## What it is

A word-play puzzle. Each row shows a word. Take exactly one letter away —
off the front (a *beheadment*), off the back (a *curtailment*) or, at the
harder levels, from anywhere inside — and a new word is left. Only one
removal in each row works. Write the new word and the letter you took;
read down, the removed letters spell a hidden word.

## How to play

For each word, try taking away one letter at a time — the first letter,
the last letter, or (when the page says "take one letter out") any
letter — and see which leaves a real word. Only one does.

Write the word that is left on the line and the letter you took away in
the box. When every box is filled, read the letters from top to bottom:
they spell the hidden word. If the hidden word does not make sense, look
again at the rows you were unsure of.

## Purpose

The puzzle trains close attention to spelling and to the words hiding
inside words. The hidden word gives a built-in check, so solvers can
tell when they have every row right.

## History

Beheadments and curtailments are among the oldest forms of English word
play, popular in Victorian puzzle columns and kept alive by the National
Puzzlers' League, whose "flats" (verse puzzles) use them. Radio and
newspaper word games still ask for "a word that becomes another when you
remove its first letter".

## This implementation

- **Spec knobs:** `difficulty`, `removal` (`auto`, `front`, `ends`,
  `anywhere`), `rows` (the hidden word's length, 4–10; 0 = the level's
  default), `name_line`, `width`, `height`, `margin`.
- **Levels and rating:** Kids — four-letter words, front or back, four
  rows. Easy — four and five letters. Medium — five and six letters.
  Hard — any letter of five- and six-letter words. Expert — any letter of
  six- to eight-letter words, seven rows. The band is set by the
  positions a solver must try and the word lengths
  (`rating_basis: removal_positions_and_word_length`); `removal`
  overrides the positions.
- **Generation:** printed words are everyday (`Tier::Basic`),
  family-friendly dictionary words; the words left are everyday words (up
  to Medium) or common ones (Hard, Expert). Taking an added -S, -D, -R or
  -Y back off a word (CATS → CAT) is refused as too easy. The hidden word
  is an everyday word (not a plural or past tense, nothing grim); it is
  spelled by choosing, for each of its letters, a row whose removed letter
  it is, with no word repeated. If a hidden word of the requested length
  cannot be spelled (front-only removal has few letters to give), a
  shorter one is used and `requested_rows` is recorded.
- **Solving / proof:** for each row, every removal the level allows is
  tried against the large dictionary (`Tier::Large`, SCOWL ≤ 70,
  ≈ 114k words), and the row is used only when exactly one word results
  (removing either of a doubled letter leaves the same word and counts
  once). The tests re-check every row by slicing the word independently.
- **Guarantees:** deterministic per seed; exactly one answer per row
  (`unique`); the removed letters spell the hidden word; nothing repeats.
