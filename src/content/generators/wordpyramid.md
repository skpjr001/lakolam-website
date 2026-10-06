---
title: "Word Pyramid"
blurb: "Word pyramid — add a letter and rearrange, every row the one word that fits"
category: word
version: "1.0.0"
---
Add a letter, rearrange, and climb down the pyramid: AN, AND, BAND, BRAND.

## What it is

A pyramid of rows of boxes, each row one box longer than the row above.
Every row holds a word made of all the letters of the word above plus one
more, in any order. The top word is printed. On the easier levels the letter
each row adds is shown beside it; on the harder levels only the top and
bottom words are printed, and the steps between are yours to find.

## How to play

Take the word in the row above, add the new letter, and rearrange all the
letters to make a word that fills the row. Letters can move anywhere: TEA
plus R can become RATE. Then use that word for the next row down. On the
Hard and Expert levels, compare the top and bottom words to see which
letters must be added, then work out the order: each row must still be a
real word. There is exactly one answer for every row.

## Purpose

An anagram puzzle in small, satisfying steps. Each row is a short anagram,
so beginners can make progress, while the top-and-bottom form asks for a
plan across the whole pyramid. It builds vocabulary and spelling
flexibility.

## History

Add-a-letter puzzles, also called Step Ladders or Word Pyramids, are a
long-standing staple of children's activity books and puzzle magazines, and
a cousin of the word ladder that Lewis Carroll published in 1879. The
progressive anagram also appears in word games such as Scrabble, where
players hunt for words that extend by one letter.

## This implementation

- **Spec knobs:** `difficulty`, `cell` (box size), `line`.
- **Levels:** Kids, 2 letters up to 6, everyday (Basic) words; Easy, 3 up to
  7, Basic; Medium, 3 up to 8, common words; all three print each added
  letter. Hard, 3 up to 7, and Expert, 3 up to 8, common words, print only
  the top and bottom words.
- **Generation:** with letters given, a depth-first search from a random top
  word adds one letter at a time, keeping only steps whose letters spell
  exactly one word in the large dictionary. With top and bottom only, random
  bottom words are paired with top words hidden inside them until exactly
  one chain joins them. Answers come from the Basic or Common tiers of the
  dictionary and pass a family-friendly filter; a step that only adds a
  plural S on the end is refused.
- **Solving:** uniqueness is proved against the large dictionary (SCOWL up
  to size 70, about 114,000 words), not the answer list, so a solver with a
  big vocabulary finds no second answer. Letters given: each row's letters
  spell exactly one word. Top and bottom: a count over every order of adding
  the bottom word's extra letters, with every intermediate a word (anagrams
  counted separately), comes to exactly one.
- **Guarantees:** deterministic per seed; every row is the row above plus one
  letter, rearranged; uniqueness re-checked in the tests by independent full
  scans of the dictionary (no anagram index). Difficulty is set by row
  lengths and which clues are printed (`rating_basis`: `rows_and_clues`).
