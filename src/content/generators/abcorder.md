---
title: "ABC Order"
blurb: "ABC order - put words in alphabetical order by first, second, third or fourth letter"
category: puzzle
version: "1.0.0"
---
A word bank to write in alphabetical order, plus quick "which comes first?"
pairs to circle.

## What it is

An alphabetical order worksheet. A box holds six to twelve words in mixed-up
order, and numbered lines below wait for them in ABC order. At the easiest
levels every word starts with a different letter; higher up, some words
share their first letter, their first two letters or their first three, so
the next letter decides. A second section gives pairs of words that start
the same way: circle the one that comes first.

## How to play

Read the words in the box. Find the word whose first letter comes earliest
in the alphabet and write it on line 1, then cross it off. Keep going until
every word is on a line. When two words start with the same letter, look at
the second letter to decide which comes first; if those match too, look at
the third letter, and so on. In the last section, look at each pair of words
and circle the one that comes first in ABC order.

## Purpose

Putting words in alphabetical order is a core early-grades skill: it builds
letter-order fluency and is the first step towards using a dictionary,
glossary or index. Working to the second, third and fourth letter follows
the order in which schools teach it, from kindergarten and grade 1 (first
letter) to grade 2 (second letter) and grades 3 and up (third letter and
beyond).

## History

Alphabetical order has organised word lists since the glossaries of the
ancient world, and became universal with printed dictionaries and indexes.
"ABC order" exercises, sorting a short list onto numbered lines, have been
part of primary language-arts workbooks for generations.

## This implementation

- **Spec knobs:** `difficulty`, `count` (0 = by difficulty; 4 to 12),
  `pairs` (the "which comes first?" section), `width`, `height`, `margin`,
  `name_line`.
- **Generation:** words come from vendored grade-level lists (kindergarten,
  grade 1, 2, 3, 4 and up). Kids: 6 kindergarten words, first letter. Easy:
  8 words up to grade 1, first letter. Medium: 10 words up to grade 2,
  second letter, with at least two neighbouring pairs sharing a first
  letter. Hard: 12 words from grades 1 to 3, third letter, at least three
  pairs sharing two letters. Expert: 12 words from grades 2 to 4, fourth
  letter, at least four pairs sharing three letters. Tie groups are drawn
  first from words that share a start, then the list is filled with words
  that stay apart within the level's depth. Pairs (4 for Kids, 5 for Easy,
  6 otherwise) share exactly the letters before the level's depth and are
  not on the main list. `rating_basis` is `sorting_depth_and_word_count`.
- **Solving:** nothing to search — the key is the sorted list, with the
  earlier word of each pair circled.
- **Guarantees:** deterministic per seed. The key is the strict ABC order of
  the bank; no two words agree on as many letters as the level's depth, and
  no word is the start of another (so "car / card" questions never arise);
  past the first letter, the required number of neighbouring words do agree
  one letter earlier, so the deeper letter is really needed. Checked when
  the page is built and re-checked in the tests by an independent
  letter-by-letter comparison and sort. Meta carries `answers_checked`.
