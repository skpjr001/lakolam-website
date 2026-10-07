---
title: "Word Forms"
blurb: "Word forms — contractions, irregular past tense and irregular plurals: write, match and sort"
category: word
version: "1.0.0"
---
Don't, went, mice — the word forms that break the rules: contractions, irregular past tenses and irregular plurals.

## What it is

A grammar-and-spelling worksheet on three kinds of word forms children
have to learn one by one: **contractions** (DO NOT = DON'T, I AM = I'M),
**irregular past tenses** (GO, WENT; CATCH, CAUGHT) and **irregular
plurals** (MOUSE, MICE; LEAF, LEAVES). Each page practises one kind, in
one of three ways: write the form, match two shuffled columns, or write
the form and sort it as regular or irregular.

## How to play

- **Write:** write the form of each word on the line — the contraction of
  the two words, the past tense of the verb, or the plural of the noun.
  In a contraction an apostrophe (') takes the place of the missing
  letters: DO NOT = DON'T. On a "backwards" page, work the other way: write
  the two words a contraction stands for, the verb a past tense comes
  from, or the singular of a plural.
- **Match:** draw a line from each word on the left to its partner on the
  right. Every word has exactly one partner.
- **Sort:** write the past tense (or plural), then circle REGULAR if it
  just adds -ED (or -S / -ES, with the usual spelling changes: HOPPED,
  CRIED, BABIES) and IRREGULAR if it changes in another way (WENT, MICE)
  or does not change at all (CUT, SHEEP).

## Purpose

Contractions, irregular verbs and irregular plurals are among the most
common spelling and grammar errors in early writing, because no rule
produces them — they have to be remembered. Practising them in small
groups, commonest first, and sorting them against regular forms builds
that memory and the habit of noticing when a word breaks the pattern.

## History

Most irregular past tenses (SING, SANG; DRIVE, DROVE) are the "strong
verbs" of Old English, which changed their vowel instead of adding an
ending; plurals like MICE, FEET and CHILDREN are relics of Old English
noun classes. Contractions with an apostrophe became standard in written
English in the seventeenth and eighteenth centuries.

## This implementation

- **Spec knobs:** `difficulty`, `form` (`contractions`, `past_tense`,
  `plurals`), `task` (`write`, `match`, `sort`), `reverse` (work
  backwards), `rows` (4–20; 0 = the level's default), `name_line`,
  `width`, `height`, `margin`.
- **Levels:** each table is split into five groups, commonest first, and
  a level uses its group and every easier one, with about half the page
  from its own group. Contractions: Kids — the NOT contractions (DON'T,
  CAN'T, ISN'T); Easy — adds I'M, YOU'RE, LET'S, HE'S; Medium — adds 'LL
  and 'VE; Hard — adds WON'T, SHOULDN'T, WHERE'S; Expert — adds 'D and
  COULD'VE. Past tense and plurals run from GO/WENT and MOUSE/MICE up to
  FORBADE and CRITERIA. The level is the table groups in play
  (`rating_basis`); every band is served as asked.
- **Generation:** every answer comes from tables written for Lakolam
  (about 55 contractions, 125 irregular and 55 regular verbs, 45
  irregular and 30 regular plurals); regular forms are written out, not
  made by a rule. Verbs and nouns with two accepted forms in everyday use
  (DREAMED / DREAMT, HANGED / HUNG, CACTI / CACTUSES) are left out, so
  every answer is the only standard one. A page never repeats a prompt or
  an answer, holds at most a quarter of unchanged forms (SHEEP, CUT), and
  a sort page alternates regular and irregular entries. Contractions have
  no regular/irregular sort, so a contractions sort page is served as a
  match page (`requested_task` in meta).
- **Solving / checks:** contractions that stand for two expansions (HE'S
  = HE IS or HE HAS; I'D = I WOULD or I HAD) are only asked from the
  expansion, never backwards. Match pages are one-to-one, so they pair up
  exactly one way. Past tenses, plurals and their base words are checked
  in the dictionary.
- **Guarantees:** deterministic per seed; every answer is a table entry
  (`answers_checked`), re-checked before the page ships; the tests
  recount match pages by brute force over every pairing.
