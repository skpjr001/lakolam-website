---
title: "Word Groups"
blurb: "Word Groups — sort sixteen words into four groups of four that share a connection"
category: word
version: "1.0.0"
---
Sixteen words, four groups of four. Find the connections.

## What it is

Sixteen words are printed in a block. They belong to four groups of four
words each, and each group shares one connection. Some connections are
about meaning (all birds, all planets); others are about spelling (all
hide the same small word, all are anagrams of each other, or all make a new
word when the same word is added in front or behind). Sort the words into
their groups and name each connection.

## How to play

Look for four words that obviously belong together, but be careful: a word
can seem to fit two groups. Before you commit to a group, check that the
other twelve words can still be sorted into three groups of four.

If meaning does not help, look at the spelling. Try reading the words
inside each word (PLANT hides ANT). Try writing the words as anagrams.
Try putting a short word in front of each word (SUN + SET, SUN + RISE) or
after it (BACK + HAND, OFF + HAND). Write the groups on the lines below the
block. There is exactly one way to split the sixteen words into four
groups.

## Purpose

A lateral-thinking puzzle that rewards both general knowledge and an eye
for how words are built. The red herrings on harder puzzles teach solvers
to test a hunch against the whole board rather than grab the first group
they see.

## History

Grouping puzzles are old: "odd one out" and "what do these have in common"
questions have filled quiz books and television quiz rounds for decades.
The sixteen-word, four-group format became widely popular in the 2020s
through daily online word games.

## This implementation

- **Spec knobs:** `difficulty`, `tile` (tile width in points).
- **Generation:** theme groups come from eighteen curated subsets of the
  `lako-lexicon` English theme lists (fruits, birds, planets, dog breeds,
  capital cities…), leaving out words with a second meaning (DATE, SWALLOW,
  BOXER). Two printed themes never share a word in their *whole* lexicon
  lists. Spelling groups are computed from the dictionary: anagram sets of
  everyday 4–6 letter words; everyday 5–8 letter words hiding the same short
  theme word (CAT, EAR, OAK, RED…) strictly inside; and everyday compounds
  formed by one short word with at least six partners (SUN + SET, BACK +
  HAND). Inflected forms (DREAMS, DREAMED) and words sharing a stem with
  another printed word are left out. Kids and Easy are four themes (Kids:
  everyday words of up to 7 letters); Medium adds one spelling group; Hard
  two spelling groups and one red herring; Expert three and two.
- **Solving / uniqueness:** a red herring is a word that genuinely fits a
  second group on the board (TIME in SOME + ___ also makes TIMELESS for
  ___ + LESS). Apart from planted herrings, no word has another printed
  group's connection, even counting whole theme lists. Then every possible
  connection among the sixteen words — every lexicon theme list, every
  anagram set, every common word hidden in a printed word, every common
  prefix and suffix that makes a common word — is collected, and an
  exact-cover search counts the ways to split the sixteen into four groups
  of four that each share one. Exactly one split may exist.
- **Guarantees:** deterministic per seed; every word is family-friendly;
  the split is unique against the connection universe above, re-checked in
  the tests by an independent method (each of the 1,820 four-word subsets
  tested directly against per-word theme, hidden-word, prefix and suffix
  sets). Connections outside that universe (first letters, word lengths,
  trivia) are not modelled, and the theme groups rely on curated lists.
  `rating_basis` is `group_kinds_and_red_herrings`: spelling groups plus
  herrings — 0 is Easy (Kids when every word is everyday and short), 1–2
  Medium, 3–4 Hard, 5 or more Expert. The answer key shades each group and
  names its connection; the metadata lists the herrings.
