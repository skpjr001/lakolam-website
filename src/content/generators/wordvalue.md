---
title: "Word Values"
blurb: "Word values — A = 1 to Z = 26: add up words, compare them, find the dollar word"
category: word
version: "1.0.0"
---
A = 1, B = 2 … Z = 26: how much is your word worth? Can you find a dollar word worth exactly 100?

## What it is

A spelling-and-adding worksheet. Every letter has a value — its place in
the alphabet, or the letter-tile values from word games — and a word is
worth all its letters added up. A chart of the values runs across the
top. The sheet has three sections: work out the value of each word
letter by letter, compare two words with <, > or =, and circle the one
word in each row worth a given number. At the hardest level every target
is 100: find the "dollar word".

## How to play

Use the chart at the top to find each letter's value.

- **Work it out:** write the value of each letter in the box under it,
  then add them all up and write the total. CAT = 3 + 1 + 20 = 24.
- **Compare:** work out both words, then write <, > or = in the circle.
- **Find the word:** work out the words in the row and circle the one
  worth exactly the number at the start. Only one word in each row is.

## Purpose

Word values turn spelling into an adding exercise: children practise
mental addition with many small numbers, check their work, and look
closely at how words are spelled. Dollar words — words worth exactly
100 with A = 1 — are a long-loved classroom challenge.

## History

Giving letters number values is ancient (Greek isopsephy, Hebrew
gematria). In classrooms the "dollar word" challenge — find a word whose
letters, at A = 1 cent to Z = 26 cents, add to exactly a dollar — has
been a popular maths-and-spelling activity for decades. Letter-tile
values come from word games where rare letters score more.

## This implementation

- **Spec knobs:** `difficulty`, `task` (`mixed`, `compute`, `compare`,
  `find`), `scoring` (`alphabet` A = 1 … Z = 26, or `tiles`), `rows`
  (2–12 per section; 0 = the level's default), `choices` (3–5 words per
  find row), `chart`, `name_line`, `width`, `height`, `margin`.
- **Levels and rating:** the level is how many letters are added: Kids
  three-letter words, Easy up to four, Medium up to five, Hard six or
  seven, Expert eight or more — and with A = 1 the Expert find target is
  100. The band is computed from the longest word printed
  (`rating_basis: letters_added`), and every page includes a word of its
  level's top length, so each band is reached as asked.
- **Generation:** words are family-friendly words from grade spelling
  lists (all levels) and the everyday dictionary tier (Medium up). The
  compare section includes one equal pair when one exists. A find row
  picks a target, one word worth it, and decoys worth nearby amounts (so
  the row has to be added up, not guessed) but never the target.
- **Solving / checks:** every value, comparison and find row is
  recomputed from the printed letters by `obeys()` and, in the tests, by
  a separate table built from the alphabet.
- **Guarantees:** deterministic per seed; answers checked
  (`answers_checked`); each find row has exactly one word worth its
  target. The answer key fills in every letter value, total, sign and
  circle.
