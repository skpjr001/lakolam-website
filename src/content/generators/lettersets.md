---
title: "Letter Sets"
blurb: "Letter Sets — a clue-free crossword: unscramble each answer's alphabetised letters so the crossings agree"
category: word
version: "1.1.0"
---
A crossword with no clues: every answer is given as its own letters,
sorted into alphabetical order.

## What it is

A crossword grid in the British style, with black squares and answers
running across and down. Instead of a clue, each answer is listed with its
letters in alphabetical order, so STAR is shown as A R S T. Unscramble every
set so that the across and down answers agree wherever they cross. There is
exactly one way to fill the grid.

## How to play

Each number in the grid starts an answer. Find that number in the Across or
Down list: the letters beside it are exactly the letters of the answer, in
alphabetical order, each used once. Unscramble them and write the word into
the grid.

Many sets spell only one word, and those are the place to start. Some sets
spell several words (A E S T could be EATS, SEAT, TEAS or EAST); for these,
look at the squares the answer shares with crossing answers. A letter you
have already placed from a crossing word tells you which arrangement is
right. Work back and forth between the two lists until every square is
filled.

## Purpose

Anagrams with a safety net. The crossings turn guesswork into deduction, so
the puzzle rewards both a good eye for words and careful checking. It suits
solvers who like crosswords but not cryptic or general-knowledge clues, and
it works well for vocabulary practice.

## History

Anagram crosswords have appeared in puzzle magazines for decades under
several names, usually with each clue printed as a jumble of the answer's
letters. Printing the letters in alphabetical order gives every solver the
same, fair starting point, since no jumble accidentally hints at the answer.

## This implementation

- **Spec knobs:** `difficulty`, `size` (odd, 7–15; 0 picks 7 for Kids, 9
  for Easy, 11 for Medium and 13 for Hard and Expert), `cell`, `line`.
- **Generation:** a 180°-symmetric half-checked lattice (crossing squares on
  the even rows and columns, blocks on the odd ones, joined into answers by
  seeded gates, repaired until every square is in an answer and the grid is
  connected), filled by backtracking with forward checking over a
  per-length bitset index of family-friendly words: the Basic tier for Kids,
  Common otherwise, answers 3 to 9 letters, all different. The fill leans
  toward letter sets with a single word (Kids, Easy), neutrally (Medium,
  Hard), or toward sets with several words (Expert).
- **Solving:** each answer's domain is every word in the large dictionary
  (about 114,000 words) with exactly its letters. An exhaustive search
  across the crossings, after sound arc propagation, counts the fills and
  stops at two. A fill with a second solution bans its ambiguous answers and
  is refilled; then a new layout is tried.
- **Guarantees:** deterministic per seed; every answer is a real,
  family-friendly word; exactly one fill of the grid matches the printed
  letter sets, proven against the large dictionary and re-checked in the
  tests by an independent count (domains rebuilt by scanning the dictionary,
  plain slot-order search). Difficulty is rated by `rating_basis`
  `anagram_ambiguous_slots`: the number of sets that spell more than one
  word, and whether crossing propagation alone settles the grid (it has in
  every grid measured; a grid needing trial and error would be Expert).
  Kids is a 7×7 grid with up to 3 ambiguous sets, Easy up to 3, Medium 4–7,
  Hard 8–15, Expert 16 or more. A request whose band is not reached in 40
  layouts is served at the nearest band and labelled so
  (`requested_difficulty` in the metadata).
- **Version 1.1:** the shared family-friendly word filter now refuses more words (an audit of the everyday dictionary tiers: crude, sexual, drug, drink and violent words and inflections of words already refused), so some pages draw different words.
