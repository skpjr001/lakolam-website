---
title: "Making Words"
blurb: "Making Words — cut-out letter tiles, little words built up to a mystery word that uses them all, and a sort by ending"
category: word
version: "1.1.0"
---
Cut out the letter tiles, build little words, then find the mystery word that uses every tile.

## What it is

The classroom word-building routine. A row of letter tiles — the letters
of a mystery word, vowels first and then consonants, so the order gives
nothing away — is printed to cut out. Below are word boxes grouped by
length ("three 3-letter words", "two 4-letter words") or, in the ladder
layout, numbered steps that build each word from the one before. The last
box is the mystery word, which uses every tile. A sort strip at the
bottom asks for made words that share an ending, such as -AT or -IN.

## How to play

Cut out the tiles. Move them around to make words, and write each word
in a box of the right length — you can only use the letters on the tiles,
each one once. Start with short words and work up to longer ones. In the
ladder layout, follow the steps: make a word, then add a letter, change
one letter, or move the letters around to make the next word. The last
box needs a word that uses every tile: that is the mystery word. Finish
with the sort: find the words you made that end with the letters shown.

## Purpose

Making Words is a hands-on phonics and spelling lesson: moving one tile
changes one sound, so children see how letters and sounds build words,
and the sort draws attention to spelling patterns (rimes) that help them
read and spell new words by analogy. The mystery word adds a puzzle to
keep the whole lesson purposeful.

## History

Patricia Cunningham and Dorothy Hall developed Making Words in the early
1990s as part of the Four Blocks literacy framework; their books of
Making Words lessons are a staple of primary classrooms. Teachers usually
lead the lesson aloud; this sheet is the independent, printable form.
Unlike Word Wheel and Spelling Bee — open word hunts round a fixed set of
letters — Making Words is a guided lesson: cut-out tiles, boxes by
length, a ladder of small changes, and a sort by spelling pattern.

## This implementation

- **Spec knobs:** `difficulty`; `task` (`boxes`, `ladder`); `theme` (an
  English theme such as `animals`, `food` or `space` for the mystery word;
  empty for any word — a theme with no word that works falls back and is
  reported as `requested_theme`); `words` (4–20 boxes or steps before the
  mystery word; 0 = the level's count; more than the tiles allow, or out
  of range, is reported as `requested_words`); `sort`; `name_line`;
  `width` (360–3000 pt), `height` (480–3000 pt), `margin` (0–20% of the
  shorter side).
- **Levels:** Kids — a five- or six-letter everyday mystery word, words
  from two letters, 8 boxes; Easy — six letters, 10 boxes; Medium — six or
  seven letters, common words, 12 boxes; Hard — seven or eight letters, 14
  boxes; Expert — eight or nine letters, words of four or more letters,
  14 boxes. The level is the mystery word's length, the word tier and the
  number of words (`rating_basis`).
- **Generation:** a mystery word is drawn from the level's everyday,
  family-friendly words (or the theme). Every word the tiles make is
  listed; boxes are spread over the lengths, shortest first, never more
  boxes of a length than there are words of it. A ladder is found by
  randomised search: each step adds a letter, changes one letter in place
  or rearranges the letters, with no word repeated. The sort uses the
  ending (a vowel and a consonant) shared by the most made words.
- **Checks:** the mystery word is the only word in Lakolam's large
  dictionary (about 114,000 words) made of exactly its letters, so the
  last box has one answer. Every length group, ladder step and sort slot
  is checked against the words the tiles make.
- **Guarantees:** deterministic per seed; every box can be filled with an
  everyday word made from the tiles (`answers_checked`,
  `every_box_fillable`); the mystery word is unique; the answer page fills
  every box and lists every word the tiles make. Any other real word that
  fits a box counts too. The tests recheck the mystery word against the
  whole dictionary and recompute the made words with plain letter counts.
- **Version 1.1:** the shared family-friendly word filter now refuses more words (an audit of the everyday dictionary tiers: crude, sexual, drug, drink and violent words and inflections of words already refused), so some pages draw different words.
