---
title: "Quartiles"
blurb: "Quartiles — rebuild five long words from twenty shuffled word-chunk tiles"
category: word
version: "1.0.0"
---
Twenty tiles of word chunks — join them back into five long words, and find
every shorter word hiding along the way.

## What it is

A 4 x 5 grid of tiles, each holding a chunk of two to four letters. Five long
words have each been cut into exactly four tiles, and all twenty tiles have
been shuffled together. Those five words are the **quartiles**. Other words
can be made from one, two or three tiles too, and they count as well.

## How to play

Join tiles side by side, in any order, to spell a word; within one word each
tile can be used only once, but a tile can be reused across different words.
Find the five quartiles — every tile belongs to exactly one of them — and as
many other words as you can. Scoring: a word of one tile scores 1, two tiles
2, three tiles 4, a quartile 8, and finding all five quartiles earns 40 more.
Look for common beginnings and endings (RE, UN, TION, NESS, ING) first: they
anchor the long words.

## Purpose

A word puzzle that rewards seeing words as parts — prefixes, suffixes,
syllables — rather than as single letters. It sits between `jumble` (one
word, letter by letter) and `spellingbee` (many words from a fixed set), and
the five-quartile goal gives it a clear finish line.

## History

Quartiles launched in 2024 as a daily game in Apple News+, alongside its
crossword and Emoji Game. Chunk-assembly word games are older — syllable
puzzles and "word fragments" pages have long been magazine staples — but the
five-words-of-four-tiles grid is Apple's.

## This implementation

- **Spec knobs:** `difficulty`, `cell` (tile height; tiles are about twice as
  wide).
- **Dictionary:** a vendored list of about 3,800 common English words of four
  to fourteen letters (the union of the workspace's curated lists).
- **Generation:** five words of the difficulty's length range are drawn and
  each is cut at random into four chunks of two to four letters, all twenty
  chunks distinct and no quartile inside another. Every dictionary word is
  then segmented over the tiles; the board is kept only if the five are the
  only four-tile words and each is buildable in exactly one way.
- **Solving:** the answer key lists the quartiles with their tile splits and
  every other dictionary word of one to three tiles — the complete list, as
  every dictionary word is tested.
- **Guarantees:** deterministic per seed; the five quartiles are the unique
  four-tile answer and use every tile once, re-checked in the tests by the
  opposite route (gluing every sequence of up to four distinct tiles and
  looking it up), which also confirms the shorter-word list is complete.
  Rated by the total length of the five quartiles, since longer words are
  rarer vocabulary cut into less obvious chunks: Kids is five eight-letter
  words (all two-letter tiles), Easy up to 44 letters, Medium 45-49, Hard
  50-54, Expert 55 and more (words of 11-14 letters). The count of shorter
  words is reported but not rated. A word missing from the list may still be
  real; the key counts words in the list. Boards generate in about 1 ms.
