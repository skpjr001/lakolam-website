---
title: "Sight Words"
blurb: "Sight words — read, trace, write, find, fill in and build each Dolch word"
category: word
version: "1.0.0"
---
Sight-word practice pages: read each word, trace it, write it, find it
among look-alikes, fill in its missing letter and build it from tiles.

## What it is

A practice page for the small, very common words that early readers learn
to recognise at a glance — THE, SAID, COME, WHERE, BECAUSE. Each word gets
its own panel (two to a page by default) with six short activities that
look at the same word in six different ways. The words come from the Dolch
lists, the classic sight-word lists for preschool to third grade plus 94
common nouns, or from your own list.

All words are printed in capital letters.

## How to play

For each word on the page:

1. **Read it.** Say the word in the big box out loud.
2. **Trace it.** Draw over the dotted letters.
3. **Write it.** Write the word on the lines by yourself.
4. **Find it.** Some of the words in the row are the real word; the others
   have one letter changed or two letters swapped. Circle every real one,
   then write how many you found in the box.
5. **Fill in the missing letter.** Write the letter that goes in each empty
   box.
6. **Build it.** Use the letter tiles to spell the word in the empty boxes.
   Cut the tiles out and move them, or just copy them in the right order.

## Purpose

Sight words make up more than half of the words in early reading books, and
many of them cannot be sounded out (SAID, ONE, WHERE). Children learn them
by seeing and using them often. Each activity practises a different part of
that: reading the whole word, the shape of each letter (tracing and
writing), careful visual checking of every letter (finding the word among
near misses such as SIAD or SAIB), and spelling order (missing letters and
building from tiles).

## History

Edward William Dolch compiled his list of 220 "service words" and 95 common
nouns from children's books of the 1930s and 1940s and published it in
*Problems in Reading* (1948). The lists, grouped by grade from pre-primer to
third grade, are still among the most widely used in schools; the later Fry
list of 1,000 instant words covers similar ground. Read-trace-write-find
pages built around one sight word at a time are a staple of kindergarten and
first-grade workbooks.

## This implementation

- **Spec knobs:** `level` (`pre_primer` — the default — `primer`,
  `first_grade`, `second_grade`, `third_grade`, `nouns`), `words` (your own
  words, separated by commas or spaces; letters only, 1–10 letters each;
  others are skipped; empty = drawn from the level), `words_per_page` (1–3,
  default 2), `find_count` (entries in the find row, counting the word's own
  copies; 5–10, default 8), `missing` (letters left out, 1–3, default 1;
  never the whole word except for a one-letter word), `width`, `height`,
  `name_line`.
- **Generation:** words are drawn without repeats from the chosen Dolch
  list (vendored; the lists are public domain). Two entries are left out
  because the page works one plain word at a time: the contraction DON'T
  and the two-word noun SANTA CLAUS. Each panel's find row holds 2–4 copies
  of the word (never more than half the row) among look-alikes made by
  swapping one letter for a capital that looks like it (E and F, O and Q,
  M and N, P and R ...) or by swapping two neighbouring letters; every
  look-alike passes the family-friendly filter. Missing letters are chosen
  at random positions, and the tiles are the word's letters shuffled out of
  order (unless every letter is the same).
- **Solving:** nothing to deduce; the answer key circles every copy in the
  find row and writes the count, fills in the missing letters and fills the
  build boxes.
- **Guarantees:** `answers_checked: true` — every look-alike is exactly one
  look-alike letter or one neighbour swap away from the word and is never
  the word itself, so the circled count is exact; the missing letters
  restore the word; the tiles are exactly the word's letters, out of order.
  Checked for every word of every list in tests. The stroke font draws
  capitals only, so words are shown in capitals — the main limit of this
  page, since many classrooms teach sight words in lower case.
