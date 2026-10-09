---
title: "Verbal Reasoning"
blurb: "11+ verbal reasoning — insert or move a letter, letter series, letter and word codes, make a word, letters for numbers; every answer proven unique"
category: word
version: "1.1.0"
---
Eleven-plus verbal reasoning practice: letters, codes and words, every answer
proven to be the only one.

## What it is

A practice page in the style of the UK 11+ verbal reasoning papers, using the
question types that can be checked exactly: insert a letter, move a letter,
letter series, letter codes, word codes, make a word and letters for
numbers. A page holds one type or a mix of four, each section opening with a
worked example.

## How to play

- **Insert a letter:** find the one letter that ends the first word and
  starts the second, in both pairs: in RO ( ? ) EIGE and BUL ( ? ) LUNT the
  letter is B (ROB, BEIGE, BULB, BLUNT).
- **Move a letter:** take one letter out of the first word and put it into
  the second, without changing the order of the other letters, so that both
  make new words. Write the letter that moves.
- **Letter series:** find the next letter or pair of letters. Each letter
  moves along the alphabet by a steady step, by two steps taken in turn, or
  by a step that grows by one each time. Use the alphabet at the top.
- **Letter codes:** the example shows a word and its code. Work out how
  each letter moved along the alphabet (after Z comes A again), then code
  the new word or decode the code.
- **Word codes:** each letter has its own number. Match the codes to the
  words (one code is missing), then answer the question.
- **Make a word:** the word in brackets is made from letters of the two
  words beside it. Take letters from the same places in the second group to
  make the missing word.
- **Letters for numbers:** each letter stands for a number. Work out the
  sum and write the answer as a letter.

## Purpose

Verbal reasoning is a tested subject in many selective-school entrance exams,
and children improve fastest by meeting each question type many times. Every
page here is fresh, and every question has exactly one answer, so the answer
key can be trusted when a child's answer differs from it.

## History

Verbal reasoning tests grew out of the intelligence tests of the early
twentieth century and became a fixture of the English eleven-plus after the
1944 Education Act. Today's papers, set by GL Assessment and others, use
about twenty standard question types; the letter and code types here are
among the most practised.

## This implementation

- **Spec knobs:** `kind` (`mixed`, the default: four types chosen by the
  seed; or one of the seven types); `difficulty` (Easy about Years 3-4,
  Medium the 11+ standard, Hard 11+ stretch; Kids is served as Easy and
  Expert as Hard); `questions` (4-20, 0 = 12); `examples`, `alphabet`,
  `name_line`; `width`, `height`, `margin`.
- **Generation:** answer-first for each type. Insert, move and make-a-word
  draw words from the most common words of the dictionary (SCOWL size 20)
  at Easy and Medium and the common tier (size 35) at Hard, filtered for
  family use (plus a short local list of words a children's page should
  not print), and build the question around them. Letter series pick a
  step rule per letter position and a start that keeps all six terms in
  A-Z. Codes use shifts (Easy +1, +2 or -1 without wrapping; Medium any
  shift of up to four), and at Hard alternating shifts, shifts growing by
  one, or the mirror alphabet. Word codes pick four common words made of
  the same few letters and a digit for each letter. Letters for numbers
  pick five different values and a sum whose value is one of them.
- **Solving:** every type has a solver that lists every answer the question
  admits — insert and move letters over the large dictionary (about
  114,000 words); make-a-word over every way of taking the example's
  letters from its outer words; codes over every rule in the stated family
  (all 25 shifts, every alternating pair, every shift growing or shrinking
  by one, and the mirror); series over constant, alternating and growing
  steps; word codes over every way of matching the three codes to three of
  the four words. A question is kept only when that list is exactly its
  answer; the tests re-solve the word and series types from the printed
  text alone.
- **Guarantees:** each question has exactly one answer within the type's
  stated rules (`unique: true`, `answers_checked: true`); answers and shown
  words are family-friendly common words; difficulty is the band of the
  hardest question (`rating_basis`), served lower and reported as
  `requested_difficulty` only when a band cannot be filled.
- **Version 1.1:** the shared family-friendly word filter now refuses more words (an audit of the everyday dictionary tiers: crude, sexual, drug, drink and violent words and inflections of words already refused), so some pages draw different words.
