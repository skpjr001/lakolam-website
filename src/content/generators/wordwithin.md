---
title: "Word Within"
blurb: "Word Within — write the longest word you can that contains each chunk of letters, with good, great and best targets"
category: word
version: "1.1.0"
---
Each box holds a short chunk of letters: write the longest word you can that contains it.

## What it is

A page of letter chunks — TIE, ROG, ARIF. For each one, write the
longest word you can think of that contains those letters together and
in that order: TIE is inside PATIENCE, ROG inside PROGRAMMER. Each row
shows three targets to aim for, and the answer page lists the longest
words we found.

## How to play

Write one word on the line beside each chunk. Your word must contain
the chunk's letters side by side, in the same order, anywhere in the
word — at the start, the middle or the end. It must be a real everyday
word, longer than the chunk itself. Score one point per letter.

The targets show how well you did: GOOD is a length most words with
that chunk reach, GREAT is reached only by the longest few, and OUR BEST
is the longest word in our everyday word list. Beating it is possible —
a bigger dictionary has longer words — and worth a cheer. Try adding
beginnings and endings: UN-, RE-, -NESS, -ATION, -INGS.

## Purpose

A vocabulary stretcher with no wrong answers, only better ones. It
rewards thinking about how words are built — prefixes, roots and
suffixes — and works for a classroom warm-up, a family game (who wrote
the longest?) or a quiet solo challenge.

## History

The format comes from Wordiply, a daily word game launched by The
Guardian in 2022, in which players get a few tries to find the longest
word containing the day's letter combination. Finding words inside other
words is much older — a staple of word games and spelling lessons — but
the longest-word scoring turns it into a game.

## This implementation

- **Spec knobs:** `difficulty`; `rows` — 4 to 16 chunks; `chunk` —
  letters per chunk, 2 to 4 (0 = the difficulty's: two for Kids, four for
  Expert, three otherwise); `targets` — print the targets on the puzzle
  page; `cell` (letter box size, 14–36 pt). Out-of-range numbers are
  clamped.
- **Levels:** the number of common words that contain a chunk sets its
  band — Easy 250 or more, Medium 60 to 249, Hard 15 to 59, Expert 4 to
  14. Every row on a page is in the same band. Kids draws from the
  basic tier (≈ 11k everyday words) instead, commonest chunks first, and
  is its own band. If a band has too few chunks of the requested length
  (two-letter chunks are never rare), the nearest band that has enough
  is used and meta records `requested_difficulty`.
- **Generation:** every chunk inside the family-friendly common words
  (SCOWL ≤ 35, plus a short list of stems kept off family pages) is
  indexed with the words that contain it. Chunks must hold a vowel (or
  Y), pass the blocklist, and not be the example chunk TIE; rows are drawn
  in a seeded order, and no chunk on a page sits inside another.
- **Answers:** an open-answer activity — any real word containing the
  chunk is right. The key lists the three longest words (skipping a
  shorter form of a word already listed, such as RETIREMENT after
  RETIREMENTS).
- **Guarantees** (`answers_checked`): every key word contains its chunk,
  is a family-friendly common word and is no longer than OUR BEST; GOOD
  is reached by three quarters of the words, GREAT by the longest tenth
  and at least three, and OUR BEST is the longest — the tests re-derive
  every count and target by scanning the whole word list. Deterministic
  per seed. Meta carries `answers_checked`, `difficulty` with
  `rating_basis: common_words_containing_chunk`, the chunks, their word
  counts and the key words.
- **Version 1.1:** the shared family-friendly word filter now refuses more words (an audit of the everyday dictionary tiers: crude, sexual, drug, drink and violent words and inflections of words already refused), so some pages draw different words.
