---
title: "Compound Words"
blurb: "Compound words — join, split, match the halves and circle the partners, matchings proven unique"
category: word
version: "1.1.0"
---
Sun + flower = sunflower — join, split, match and circle the words that make compound words.

## What it is

A worksheet on closed compound words: two whole words written together
as one, like SUNFLOWER, FOOTBALL or CUPBOARD. The same idea is practised
four ways: join two words into a compound, split a compound into its two
words, match two shuffled columns of halves, or circle every word in a
row that makes a compound with the word in the box.

## How to play

- **Match:** each word on the left starts a compound word; its other half
  is somewhere on the right. Draw a line from each left word to the word
  that finishes it. Every word is used once, and there is only one way to
  match them all.
- **Join:** put the two words together and write the compound word on the
  line: SUN + FLOWER = SUNFLOWER.
- **Split:** each compound word is written in boxes. Draw a line between
  the two words that make it: SUN/FLOWER.
- **Circle:** the word in the box is one half of a compound; the blank
  shows whether the missing half goes before it (___ + BALL) or after it
  (STAR + ___). Circle every word in the row that makes a real compound
  word with it. Some rows have two answers, some three.

## Purpose

Compound words are an early reading and spelling milestone: spotting the
two smaller words inside a long one makes it easier to read, spell and
guess the meaning of (a birdhouse is a house for birds). Matching and
circling add a little puzzle, because a half can seem to fit more than
one partner until the whole set is worked out.

## History

Compounding is one of the oldest ways English makes new words — Old
English already had compounds such as *daeges-eage* (day's eye, our
DAISY). Compound-word matching and "put the two words together" drills
have been staples of primary-school vocabulary and phonics materials for
generations.

## This implementation

- **Spec knobs:** `difficulty`, `task` (`match`, `join`, `split`,
  `circle`), `rows` (4–16; 0 = the level's default; circle pages hold at
  most 12), `name_line`, `width`, `height`, `margin`.
- **Levels:** Kids — everyday compounds of up to 8 letters, 6 rows.
  Easy — everyday compounds up to 10 letters, 8 rows. Medium — common
  compounds up to 11 letters, 10 rows. Hard — up to 13 letters, 12 rows.
  Expert — any curated compound, 14 rows. The level is the word tier,
  length and row count (`rating_basis`); every band is served as asked.
- **Generation:** compounds come from a curated list of genuine closed
  compounds written for Lakolam (shared with Missing Link), so
  accidental splits such as CAR + PET or HAM + LET never appear. A
  compound is used only if it and both halves are family-friendly, the
  halves are common words of three or more letters, and the compound is
  in the dictionary at the level's tier. No half repeats on a page. A
  match page is grown pair by pair, keeping a pair only if the page still
  has exactly one way to match. Circle rows use a half that has at least
  three curated partners on one side; wrong words are other halves from
  the list.
- **Solving / checks:** fairness is proved against the large dictionary
  (about 114,000 words), not the curated list, so a solver with a big
  vocabulary finds no second answer: a match page has exactly one perfect
  matching in which every pair spells a dictionary word (exhaustive count,
  capped at 2; the tests recount exactly by a different method); a split
  row has exactly one cut into two dictionary words; a circle row's wrong
  words never join the box word into a dictionary word, and its right
  words are curated compounds.
- **Guarantees:** deterministic per seed; every answer is a curated,
  family-friendly compound in the dictionary (`answers_checked`); match
  pages carry `unique`. If too few everyday compounds fit a long page the
  pool widens to common compounds; meta records `requested_rows` when a
  page holds fewer rows than asked.
- **Version 1.1:** the shared family-friendly word filter now refuses more words (an audit of the everyday dictionary tiers: crude, sexual, drug, drink and violent words and inflections of words already refused), so some pages draw different words.
