---
title: "Elimination"
blurb: "Elimination — cross out names clue by clue until exactly one is left; every clue is needed"
category: word
version: "1.1.0"
---
A list of names, a handful of clues, and only one name that fits them all — cross out the rest.

## What it is

An elimination puzzle. The page lists suspects in alphabetical columns,
like a register: full names (first name and surname), or, in the
"password" version, single everyday words. Below the list is a numbered
set of clues about letters and lengths — "The surname contains the letter
A", "The first name is longer than the surname", "Exactly one of these is
true: …". Exactly one name on the list fits every clue, and every clue
matters: leave any one out and more than one name would be left.

## How to play

Read the clues one at a time. For each clue, go down the list and cross
out every name the clue does not describe. Clues can be used in any
order. When all the clues are used, one name is left — that is the
answer.

- "The first name" is the first word of a full name, "the surname" the
  second. On a password page the clues talk about "the password".
- Vowels are A, E, I, O and U (Y does not count).
- A double letter is the same letter twice in a row, as in the LL of
  KELLY.
- "Exactly one of these is true" means one part is true and the other is
  false — cross out a name if both parts are true or both are false.

## Purpose

Elimination trains careful, systematic checking: applying a rule to a
long list without missing a case, and keeping track of what is left. The
password pages give early readers a reason to look closely at letters,
word length and spelling patterns.

## History

Crossing names off a list of suspects is as old as the detective story,
and word-elimination puzzles ("What's left?") have long been a staple of
puzzle magazines. The format surged in 2025–26 with books that give a
whole register of suspects and a short set of clues, inviting the reader
to eliminate names until a single culprit remains.

## This implementation

- **Spec knobs:** `difficulty`, `mode` (`names`, `words`), `suspects`
  (12–600; 0 = the level's default), `name_line`, `width`, `height`,
  `margin`.
- **Levels:** Kids — about 30 suspects, clues about first and last letters,
  letters contained and exact length (3–6 clues, printed in a helpful
  order). Easy — about 60, adds letter positions, "more/fewer than"
  lengths and negative clues. Medium — about 120, adds vowel counts,
  double and repeated letters, and comparing the two names' lengths and
  initials; clues shuffled. Hard — about 200, adds alphabetical order of
  the two names, shared letters and chained letters. Expert — about 300,
  adds up to three "exactly one of these is true" clues. The level is the
  suspect count and the clue families in play (`rating_basis`); the
  hardest family actually printed is in meta (`hardest_family`). Password
  pages have no two-name clues, so their Hard level uses the Medium
  families on a longer list.
- **Generation:** first names are a curated subset of the US Social
  Security Administration's national baby-name data and surnames a subset
  of the US Census 2010 surname list (both US federal works, public
  domain); they are paired by the seed, never in a fixed way. Password
  words come from the grade spelling lists (Kids, Easy) or the everyday
  tier of the dictionary, family-friendly, base forms only. A culprit is
  chosen, then clues true of the culprit that each cross out at least one
  remaining name are added — a clue family is picked at random, positive
  clues preferred, cuts of moderate size preferred — until one name is
  left. The set is then pruned: any clue whose removal still leaves one
  survivor is dropped. Compound clues pair a true and a false fact about
  different things, each true of at least a twentieth of the list and
  false of at least a twentieth. Several culprits are tried to land the
  clue count in the level's window.
- **Solving:** every clue is a plain predicate, so the order does not
  matter; the key crosses out each name and marks it with the first clue
  (in printed order) that rules it out.
- **Guarantees:** deterministic per seed; exactly one suspect survives
  every clue (`unique`); every clue is needed — without any one of them at
  least two suspects survive (`every_clue_needed`); both are recomputed
  over the whole list before the page ships, and the tests re-check them
  by parsing the printed clue text with an independent reader.
- **Version 1.1:** the shared family-friendly word filter now refuses more words (an audit of the everyday dictionary tiers: crude, sexual, drug, drink and violent words and inflections of words already refused), so some pages draw different words.
