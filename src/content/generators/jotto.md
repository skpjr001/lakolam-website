---
title: "Jotto Deduction"
blurb: "Jotto deduction — deduce the hidden word from guesses and how many letters each shares"
category: word
version: "1.0.0"
---
Each guess comes with just a number: how many letters it shares with the
hidden word. Count, compare and cross off until only one word is left.

## What it is

Each puzzle shows a few five-letter guesses, each with a number in a circle:
how many letters that guess shares with a hidden five-letter word. The
number says nothing about *where* the letters are. Below the guesses is an
empty row for the answer, and an A–Z strip for crossing letters out. Several
puzzles share a page.

## How to play

**Shared letters** means: match letters between the guess and the hidden
word one for one, in any position; the number is how many matches there are.
On this page every guess and every hidden word uses five *different* letters,
so the number is simply how many of the guess's letters appear somewhere in
the hidden word. (CRANE and TRACE share four letters — C, R, A, E.)

Work letter by letter, then unscramble:

- A **0** is a gift: none of those five letters is in the word. Cross them
  off the strip.
- When a guess's number is already used up by letters you know are in, its
  other letters are out; when it needs every letter you have not ruled out,
  they are all in.
- Compare two guesses that share letters: if one has a higher number, the
  letters it does not share with the other must make up the difference.
- The word has exactly five letters. Once you know which five, there is only
  one way to arrange them into a word.

## Purpose

A word-deduction puzzle with the least information per clue of any in the
family — no colours, no positions — so it rewards bookkeeping and logic over
vocabulary. It suits solvers who like Wordle but want something slower and
more logical, and it prints well: one ink, no colour needed.

## History

Jotto is a pencil-and-paper game for two players, invented by Morton M.
Rosenfeld and published in 1955; each player picks a secret five-letter word
and the other guesses, scoring only the count of shared letters ("jots").
It is an ancestor of the peg game Mastermind (1970) and of Wordle (2021),
which added positional colours. This page runs the game backwards: the
guesses are already made, and you deduce the word.

## This implementation

- **Spec knobs:** `puzzles` per page (1–6), `difficulty`, `cell` (tile size),
  `alphabet` (the A–Z crossing-off strip).
- **Words:** hidden words and guesses come from the everyday tier of the
  workspace dictionary (SCOWL ≤ 20), have five different letters, are not a
  plain plural or past tense, and pass a family-friendly filter. A hidden
  word never has an anagram anywhere in the large list (a count cannot tell
  HEART from EARTH).
- **Generation:** an answer is drawn; guesses are added one at a time — the
  best of a small random sample at narrowing the five-letter sets that still
  fit — until the band's letter logic settles all 26 letters (Expert: until
  one letter set fits). Then clues are dropped, in a seeded order, while the
  band's logic still settles; lower counts are printed first.
- **Solving:** a letter solver with three sound techniques — *count* (one
  clue at a time, including "five letters in all"), *compare* (two clues'
  open letters bound each other), *trial* (suppose one letter in or out,
  propagate, strike the supposition that breaks a count). Difficulty is the
  easiest ladder that settles every letter: count Easy, compare Medium, trial
  Hard; Expert puzzles are pinned only by a search over letter sets. Kids is
  not offered — the nearest honest band, Easy, is served instead.
- **Guarantees:** deterministic per seed; every count is the true multiset
  intersection; exactly one five-letter set of the alphabet fits every count;
  exactly one word of the large dictionary (`Tier::Large`, ≈ 6,500
  five-letter words, repeated letters included) fits every count, and it is
  the answer; no answer repeats on a page. Meta records the technique each
  puzzle needed, its clue count and how the field of words shrinks clue by
  clue.
