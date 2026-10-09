---
title: "Greek and Latin Roots"
blurb: "Greek and Latin roots — match meanings, circle the root, write the missing root, sort words by root"
category: word
version: "1.0.0"
---
What do TELESCOPE, TELEPHONE and TELEVISION share? Learn the roots inside English words.

## What it is

A vocabulary worksheet on the Greek and Latin roots that build thousands
of English words: TELE (far), PORT (carry), SPECT (look), BIO (life) and
about seventy more. The page can hold four kinds of exercise — match each
root to its meaning, circle the root in a word, write the missing root
from its meaning, and sort a bank of words under their roots.

## How to use it

- **Match:** write the letter of each root's meaning on its line.
- **Circle:** find the root hiding in each word and circle it. Each word
  holds just one of the roots you are learning.
- **Missing root:** the boxes stand for the root's letters, and its
  meaning is in brackets. Write the root that makes a real word.
- **Sort:** write every word from the bank in the box of the root it
  contains.

Then talk about the words: if PORT means carry, what might PORTABLE mean?
The answer page shows every answer.

## Purpose

Knowing roots lets readers work out words they have never met. Using
Greek and Latin affixes and roots as clues to meaning is a named reading
standard from grade 4 to grade 8, and root study is a staple of 11+, SAT
and GRE vocabulary preparation. Easy pages use the commonest roots;
harder pages add middle-school and advanced ones.

## History

Teaching words through their roots goes back to classical schooling,
when Latin and Greek were taught directly. Modern vocabulary programmes
kept the roots and dropped the grammar: a few dozen roots unlock a large
share of academic English.

## This implementation

- **Spec knobs:** `difficulty` (root level and item count), `task`
  (mixed, match, circle, build, sort), `source` (both, Greek, Latin),
  `items` (4–16), `width`, `height`, `margin`.
- **Generation:** roots are drawn from a curated table written for this
  project — each with its origin, meaning, level (grades 4–5, 6–8, or
  advanced) and four or five example words — at the band's levels, never
  two with overlapping meanings (AQUA and HYDR, both water) on one page.
  Words are drawn from each root's examples, filtered by the checks below.
- **Solving:** recognise roots and their meanings; the answer page fills
  the lines and boxes and circles the roots.
- **Guarantees:** deterministic per seed; checked answers (`answers_checked`
  in meta): every example word is in the large dictionary, family-friendly,
  and contains its root; the roots on a page have distinct meanings, so
  each match has one answer; a word to circle contains exactly one root of
  the whole table, once; a missing-root item has exactly one table root
  that completes it into a dictionary word, and its hint is that root's
  meaning; a word to sort contains exactly one of the page's roots. The
  tests re-check every item by brute force over the table. Rated by the
  roots used (`rating_basis` `root_level`): only level-1 roots → Kids (six
  items or fewer) or Easy; level 2 at most → Medium; some advanced roots →
  Hard, more than half → Expert. A band or item count the settings cannot
  reach is reported as `requested_difficulty` or `requested_items`.
