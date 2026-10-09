---
title: "Write the Room"
blurb: "Write the room — lettered cards to post round the classroom, a recording sheet and a key"
category: puzzle
version: "1.0.0"
---
Lettered cards go up round the classroom; children hunt for each one and
write its answer on their sheet.

## What it is

A set of four to twelve cards, lettered A, B, C…, to cut out and post on
walls, doors and shelves, with a recording sheet that has a box and a
handwriting line for each letter, and an answer key. The cards can show a
picture to name, a sight word to copy, a maths fact to answer, or a number
to write in words.

## How to use it

Cut out the cards and stick them up around the room. Each child takes a
recording sheet and a clipboard, walks about to find the cards in any order,
and writes the answer for card A in box A, card B in box B, and so on:

- **Pictures:** write the name of the picture.
- **Sight words:** copy the word.
- **Maths:** write the answer to the fact.
- **Number words:** write the number in words.

Check the sheets with the answer key.

## Purpose

Write the room turns practice into movement: children get up, search, read
and write, which suits young learners who find it hard to sit still. The
same routine works for phonics, high-frequency words, number facts and
number spelling, from pre-kindergarten to second grade.

## History

Write the room (also called "read the room" or a scavenger-hunt worksheet) is
a long-standing kindergarten and first-grade centre activity, popular in
classroom resource shops in themed seasonal sets.

## This implementation

- **Spec knobs:** `mode` (`pictures`, `sight_words`, `maths`,
  `number_words`), `difficulty` (pictures: the longest name, up to 4
  letters for Kids, 5 Easy, 6 Medium, 8 Hard, longer or two words Expert;
  sight words: the Dolch pre-primer, primer, first, second and third grade
  lists; maths: sums to 5, sums to 10, adding and taking away within 10 and
  within 20, times and division facts to 10 × 10; number words: 0–12,
  10–30, 20–60, 50–100, 100–999), `cards` (4–12), `theme` (the picture pack
  in pictures mode, a small corner picture on each card otherwise),
  `lowercase` (lowercase words, as children first read them, or capitals),
  `width`, `height`.
- **Generation:** cards are drawn without repeats from the band's set: the
  picture pack filtered by name length (with at least one name at the
  band's own length when the pack has one), the Dolch list, the full fact
  table, or the number range. The cards page, the recording sheet (a
  supporting page) and the key are laid out from the same list.
- **Guarantees:** every card differs; every answer is recomputed from its
  card alone — a picture's answer is its label, a fact's answer is exact
  integer arithmetic (division facts always divide exactly), and number
  words are spelled US style ("one hundred twelve", "fifty-seven") and
  checked against a second speller over 0–999. Every picture in a set is a
  clearly different drawing. Meta carries `answers_checked` and the answers.
- **Rating:** pictures are rated by the longest name actually drawn
  (`rating_basis: longest_picture_name`). A small seasonal pack without
  enough short names serves a harder band and reports `requested_difficulty`.
  The other modes are rated by the list, table or range they draw from.
  Clamps are reported as `requested_cards`, `requested_width`,
  `requested_height`.
- **Data:** the Dolch sight-word lists (1948) are in the public domain.
