---
title: "Crypto-Families"
blurb: "Crypto-Families — one category's words in a single letter code: the category is given, crack the code"
category: word
version: "1.0.0"
---
A list of words from one category, all written in the same secret letter code: you know the category, now crack the code.

## What it is

Every word in the list belongs to the category printed at the top —
fruits, birds, tools, countries — and every word has been written in one
shared substitution code: each letter of the alphabet stands for a
different letter, and the same code is used throughout. Decode the words
to reveal the list. Some puzzles give one or more letters away to start
you off.

## How to play

Each letter in the code always stands for the same real letter, and two
different code letters never stand for the same real letter. No letter
stands for itself. Write the real letter on the line under each code
letter; when you work out a letter, fill it in everywhere it appears,
and note it in the code table at the foot of the page.

Use the category. Short words and words with repeated letters are good
places to start: a three-letter bird whose code letters are all
different, or a fruit whose code has the same letter twice in the
middle, can only be a few words. Every letter you place helps decode
the other words. There is exactly one way to decode the whole list.

## Purpose

A friendly way into cryptograms. The category narrows each word down,
so the puzzle is about pattern spotting and careful bookkeeping rather
than about guessing a whole sentence. It trains letter-pattern
recognition, vocabulary within a topic, and the logic of a one-to-one
code.

## History

Crypto-Families is a long-running feature of American puzzle magazines,
alongside the classic quotation cryptogram. Cryptograms themselves go
back centuries as a pastime, and became a newspaper and magazine staple
in the twentieth century; giving the solver a category instead of a
sentence makes the form gentler and lets every word be guessed on its
own.

## This implementation

- **Spec knobs:** `difficulty`; `family` — one of 25 categories, or `any`
  to let the seed choose; `words` — 6 to 14 words (0 = the difficulty's;
  other values are clamped); `cell` (letter box size, 14–36 pt).
- **Levels:** Easy — 12 words, three letters given. Medium — 10 words,
  one given. Hard — 10 words, none given. Expert — 7 words, none given.
  Kids is not separately reachable and is served as Easy. If the proof
  needs letters beyond the quota, they are given and the page is rated
  from what it prints: three or more given is Easy, one or two Medium,
  none Hard (nine words or more) or Expert (fewer).
- **Generation:** the category lists are written for Lakolam: only true
  members of each category, single family-friendly words of 3 to 12
  letters. The words are drawn in a seeded order, enciphered with a
  random single-cycle permutation of the alphabet (so no letter stands
  for itself), and the quota of letters is given away from the commonest
  code letters.
- **Solving:** an exhaustive search over one-to-one letter assignments —
  each code word must decode to a word with the same letter pattern in
  the large dictionary (SCOWL ≤ 70, ≈ 114k words) or the category list —
  takes the code word with the fewest candidates first and counts
  decodings up to two. A second decoding reveals one more letter where
  the two disagree, and the count runs again; a search that runs out of
  its node budget also reveals one more letter (ambiguous, never
  unique).
- **Guarantees:** deterministic per seed; exactly one decoding, proven
  without using the category title — so it holds even for a solver who
  ignores the title or knows obscure words; the tests re-count every
  level with an independent search (words in a fixed order, a hash-set
  dictionary). Meta carries `unique`, `difficulty` with
  `rating_basis: revealed_letters_and_word_count`, how many letters were
  given and how many the proof added, the category, and the answers.
