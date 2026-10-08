---
title: "Synonyms and Antonyms"
blurb: "Synonyms and antonyms — match, circle or write the word that means the same or the opposite; every matching proven to have one solution"
category: word
version: "1.0.0"
---
Big and large mean the same; big and small mean the opposite — match them, circle them, write them.

## What it is

A vocabulary page on **synonyms** (words that mean the same, or nearly the
same: GLAD and HAPPY) and **antonyms** (words that mean the opposite: HOT
and COLD). Each row gives a word and asks for its partner — by drawing a
line, by circling one word of three, or by writing one.

## How to play

- **Match:** draw a line from each word on the left to the word on the
  right that means the same (or the opposite — the heading says which).
  Every word is used once.
- **Choice:** each row says SAME AS or OPPOSITE OF. Circle the one word of
  the three that means the same as, or the opposite of, the word in the
  box.
- **Write:** write a word that means the same as, or the opposite of, the
  word in the box. More than one answer can be right.

## Purpose

Knowing several words for one idea, and the word for its opposite, is at
the heart of vocabulary growth: it makes reading easier and writing more
varied, and it trains the habit of thinking about shades of meaning.
Opposites come first for young children (big and small, up and down);
older readers meet subtler pairs (frugal and extravagant, candid and
evasive).

## History

Collections of words with like meanings go back to antiquity, but the
modern habit owes most to Peter Mark Roget, whose *Thesaurus of English
Words and Phrases* (1852) grouped words by idea. "Same or opposite"
matching and "write the opposite" drills have been staples of
schoolbooks and vocabulary tests ever since.

## This implementation

- **Spec knobs:** `difficulty`; `task` (`match`, `choice`, `write`);
  `relation` (`both`, `synonyms`, `antonyms` — with both, half the rows
  ask for the same and half for the opposite, and a match page has a
  block of each); `rows` (4–12, 0 for 8); `name_line`; `width`,
  `height`, `margin`.
- **Levels:** every line of the word graph has a grade: Kids — first
  words (about ages 5–6), Easy — ages 7–8, Medium — ages 9–11, Hard —
  secondary and adult vocabulary. The page is rated by its hardest line
  (`rating_basis`); Expert is served as Hard and reported as
  `requested_difficulty`. Easier lines fill in only when a level runs
  short.
- **Generation:** a curated word graph written for Lakolam, about 160
  lines of one meaning each: words on the same side of a line are
  synonyms, words across it antonyms, and every word is on exactly one
  line. Words that stay close in meaning across lines (HARD and EASY, NICE
  and GOOD, WANE and DIMINISH) are listed in "close" groups. A page takes
  each row from a different line, and no two of its lines may hold close
  words; a choice row's two wrong words have no link of any kind to the
  word in the box or to the answer.
- **Solving:** a match block is proved to have exactly one way to match:
  every pair a reader might link (a recorded link or a close pair) is an
  edge, and the perfect matchings are counted exhaustively, capped at 2;
  the tests recount them by brute force from the raw data.
- **Guarantees:** deterministic per seed; every word is a family-friendly
  dictionary word (tested); match and choice pages carry `unique` (one
  answer, judged over the recorded and close links); write pages list every
  recorded partner in the metadata and the key shows up to three
  (`answers_checked`). The guarantee is only as wide as the curated graph:
  a pair of everyday words that the graph does not link is treated as
  unrelated.
