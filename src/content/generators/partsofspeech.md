---
title: "Parts of Speech"
blurb: "Parts of speech — sort words into noun, verb, adjective and adverb columns, circle a part of speech, find the odd one out, or name the underlined word"
category: word
version: "1.0.0"
---
Nouns name, verbs do, adjectives describe — sort them, circle them, spot the odd one out and name them in a sentence.

## What it is

A grammar worksheet on the four main parts of speech: **nouns** (a
person, place, thing or idea: TEACHER, BEACH, COURAGE), **verbs** (an
action or a doing word: SING, DISCOVER), **adjectives** (words that
describe a noun: FLUFFY, ANCIENT) and **adverbs** (words that tell how,
when or where something is done: QUIETLY, OFTEN, EVERYWHERE). Younger
pages use nouns and verbs only; adjectives and then adverbs join as the
level rises.

## How to play

- **Sort:** read each word in the box and write it in the column for its
  part of speech.
- **Circle:** each row says which part of speech to look for. Circle every
  word in the row that is one. A row can have one, two or three.
- **Odd one out:** three words in each row are the same part of speech.
  Circle the one that is different.
- **Sentences:** read the sentence and look at the underlined word. Is it
  a noun, a verb, an adjective or an adverb? Circle the answer.

## Purpose

Knowing the parts of speech is the start of grammar: it helps children
build sentences, choose describing words, use a dictionary and talk about
their writing. Sorting single words practises the idea of a part of
speech; the sentence task practises spotting the job a word does in a
real sentence.

## History

The idea goes back to the Greek grammarian Dionysius Thrax, whose *Art
of Grammar* (about 100 BC) named eight parts of speech, and to the Latin
grammars every European schoolchild learned from. English school
grammars kept the eight, and noun–verb–adjective sorts have been a
primary-classroom staple ever since.

## This implementation

- **Spec knobs:** `difficulty`; `task` (`sort`, `circle`, `odd_one`,
  `sentences`); `count` — words to sort (6–24) or rows (4–14), 0 for the
  level's own; `name_line`; `width`, `height`, `margin`.
- **Levels:** Kids — nouns and verbs, everyday words (about ages 5–7).
  Easy — adds adjectives. Medium — nouns, verbs and adjectives with grade
  3–5 words. Hard — adds adverbs. The page is rated by the number of
  parts of speech on it and the grade of its words (`rating_basis`); the
  lists stop at grade 5, so Expert is served as Hard and reported as
  `requested_difficulty`.
- **Generation:** words come from curated lists written for Lakolam, in
  two grades, in which every word has **one** dominant part of speech for
  a young reader. Words with two everyday uses — RUN, PLAY, JUMP, LIGHT,
  COLD, LOUD, CLEAN, BOOK, FISH, colour words — are left out, so a word on
  its own still has one right answer. Sort pages split the words as evenly
  as the count allows; circle rows cycle through the parts and hold one to
  three targets; odd-one-out rows take three words of one part and one of
  another; sentences come from a curated set (about 50) in which each
  target word is marked with the part it plays there, and the rows cycle
  through the parts. No word repeats on a page. If a list runs out the
  page holds fewer rows, reported as `requested_count`.
- **Solving:** every answer is read from the lists (or the sentence's
  mark); the tests re-check each page against an independent reading of
  the raw data.
- **Guarantees:** deterministic per seed; the lists are disjoint and every
  word is a family-friendly dictionary word (tested); every sort word fits
  exactly one column, every circle row's targets are exactly its words of
  the asked part, every odd-one-out row has exactly one word of another
  part, and every underlined word plays the part named in the key
  (`answers_checked`).
