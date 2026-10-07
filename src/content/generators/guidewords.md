---
title: "Guide Words"
blurb: "Guide words — which words belong on a dictionary page between two guide words"
category: word
version: "1.0.0"
---
Does BOAT belong on the page that runs from BEACH to BRICK? Use the guide words to find out.

## What it is

A dictionary-skills worksheet. The two words printed at the top of a
dictionary page — the guide words — are the first and the last word on
that page, and every word on the page comes between them in alphabetical
order. Each box on the sheet is a dictionary page with its guide words
and a handful of words: some belong on the page, some come before it and
some after. The other kind of sheet shows three pages in a row and a bank
of words to sort onto them by page number.

## How to play

Read the two guide words at the top of the page. A word belongs on the
page if it comes **after** the first guide word and **before** the last
one in alphabetical order.

Compare letter by letter. Start with the first letters; if they are the
same, compare the second letters, then the third, and so on. If one word
runs out first — CAR and CART — the shorter word comes first.

On a page sheet, circle every word that belongs on the page. On a sorting
sheet, write the page number each word would be on.

## Purpose

Guide words are how a reader finds a word in a printed dictionary
quickly. The worksheet practises alphabetical order beyond the first
letter, which is the skill that makes a dictionary, glossary or index
usable, and it is a standard dictionary-skills objective in the early
grades.

## History

Guide words (also called catchwords or running heads) have been printed
at the tops of dictionary pages since the eighteenth century. Exercises
asking which words "belong on the page" have been part of school
dictionary-skills lessons for as long as classrooms have used
dictionaries.

## This implementation

- **Spec knobs:** `difficulty`, `task` (`circle` or `sort`), `pages`
  (circle: 2–6), `words` (circle: 4–10 per page; sort: 6–15 in the
  bank; 0 = the level's default), `name_line`, `width`, `height`,
  `margin`.
- **Levels and rating:** the level is how deep the comparisons go. For
  each word the generator counts how many letters a reader must compare
  against the guide words to place it (one more than the letters they
  share; running out of letters counts as a letter). The sheet's band is
  the deepest comparison on it: 1 letter = Kids, 2 = Easy, 3 = Medium,
  4 = Hard, 5 or more = Expert (`rating_basis: letters_compared`). Kids
  and Easy draw from grade spelling lists; Medium adds everyday
  dictionary words, Hard and Expert common ones, kept to base forms
  (plurals, past tenses and comparatives are left out, as in a real
  dictionary's headwords).
- **Generation:** guide words are chosen to share one letter fewer than
  the target depth; words near them in the alphabet are kept only if
  they are decided within the target depth, deepest first, so every page
  reaches its band. Circle pages never overlap and get rising page
  numbers; sorting pages are consecutive (each page starts at the word
  after the last one ends) and the bank is spread over all three. If a
  word list cannot fill the requested number of pages or words at the
  level's depth, the counts are reduced first (`requested_pages`,
  `requested_words` in meta) and only then the depth.
- **Solving / checks:** every answer is decided by plain alphabetical
  comparison and re-checked by `obeys()` (and in the tests by a separate
  letter-by-letter comparison): each circle page has at least one word on
  it and one off it; each bank word falls on exactly one page.
- **Guarantees:** deterministic per seed; answers checked
  (`answers_checked`); the band is computed from the words printed, never
  assumed.
