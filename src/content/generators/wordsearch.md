---
title: "Word Search"
blurb: "Themed word searches with distribution-matched filler and answer keys"
category: word
version: "1.3.0"
---
Find the listed words hidden in a grid of letters — across, down, and
diagonally, forwards or backwards.

## What it is

A rectangular grid of letters with a themed word list beside it. Every listed
word appears in the grid as a straight line of consecutive letters in one of
up to eight directions. The unused cells are filled with decoy letters.

## How to play

Scan for a word's rarest letter — a Q or a Z narrows candidates instantly.
Sweep each row and column with the word's first two letters in mind, then
check both diagonals. Circle finds and cross them off the list. On the harder settings, leftover letters can spell a hidden message once
every word is found.

## Purpose

The most accessible puzzle in the catalogue — no rules to learn, playable by
early readers — and the volume seller of printed collections. Product quality
lives in the themed wordlists more than the algorithm, and the crate treats
the fill as a craft problem: decoys are drawn from the placed words' own
letter distribution, because a uniform fill makes real words pop out.

## History

Invented by **Norman E. Gibat**, published in the *Selenby Digest* of Norman,
Oklahoma, in March 1968 (Spanish-language *sopa de letras* by Pedro Ocón de
Oro is a contemporaneous independent claim). Teachers spread it; by the
1970s it was a fixture of every puzzle magazine.

## This implementation

- **Spec knobs:** `rows`, `cols`, your own `words` or a `theme`, `directions`
  (kids mode restricts to left-to-right and top-to-bottom), `difficulty`,
  `filler` (`matched` or `uniform`), `hidden_message`, `word_list`.
  `theme` is `starter` (a fifteen-word space list, the default) or any of
  the sixty-odd themed lists of the shared lexicon: holidays and faith
  (`christmas`, `easter`, `hanukkah`, `diwali`, `eid`, `lunar_new_year`,
  `bible_names`, `virtues`, ...), seasons, decades (`the_60s` to `the_90s`),
  sports, hobbies, animals, nature, places (`us_states`, `world_capitals`,
  `national_parks`) and more. `language` (`en` default; `es`, `fr`, `de`,
  `it`, `pt`, `nl`) picks the list in that language (ten themes each:
  animals, food, colours, family, home, nature, school, body, travel,
  christmas). A theme with no list in the chosen language (the default
  `starter` among them) uses the nearest of those ten instead — `animals`
  for creature themes, `food`, `school`, `travel`, `home`, otherwise
  `nature` — and the metadata names it (`theme`, `requested_theme`);
  before v1.3 that was an error, so a page whose only change from the
  defaults was the language would not generate. `accents`: `fold` (default for theme lists: E for É, N for Ñ,
  AE/OE/UE for German umlauts) or `keep` (accented capitals in the grid);
  unset leaves your own words cleaned as before (A-Z only). `count` (0 =
  all of your words, or for a theme a random selection of about one word
  per thirteen cells).
- **Generation:** backtracking placement with controlled overlap density;
  fill letters sampled from the placed words' distribution, or, for a
  list in a language other than English, from that language's letter
  frequencies (with its accented capitals when they are kept); word list
  and answer key rendered from the same placement, so they cannot disagree.
  A theme list is a pool: the words for a page are drawn from it on their
  own seed stream, so pages without a theme are unchanged.
- **Guarantees:** every listed word is findable and its occurrences are
  located by scanning the finished grid (the answer key is drawn from that
  scan, so key and grid cannot disagree); words the filler accidentally
  duplicates are counted and reported as ambiguous_words in the metadata.
- **Difficulty:** grid size, direction set, word length distribution and fill
  entropy, banded.
