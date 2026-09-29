---
title: "Word Shapes"
blurb: "Word shapes - write each spelling word into the row of boxes shaped like it"
category: puzzle
version: "1.0.0"
---
Spelling words drawn as rows of boxes: find the word whose letters fit each
shape and write it in.

## What it is

A classroom spelling page, sometimes called word configuration boxes. Every
word from the word bank is drawn as a row of boxes, one box per letter, and
the boxes follow the shape of the word written in small letters: a tall box
for a letter that reaches up (b, d, f, h, k, l, t), a box that hangs below
the line for a letter with a tail (g, j, p, q, y), and a short box for every
other letter. The shapes are mixed up, so each one has to be matched to its
word.

## How to play

Read the words in the box at the top. Pick a shape and count its boxes, then
look where the tall boxes and the hanging boxes are. Find the word from the
box that fits, and write it in, one letter in each box, using small letters
so the tall and hanging letters fill their boxes. Every shape fits exactly
one word. If a box already has a letter in it, that is the first letter of
the word — two words in the box share a shape, and the letter tells them
apart. Cross each word off the box when you use it.

## Purpose

Word shapes help early readers and spellers notice the outline of a word —
its length and where its tall letters and tails fall — which supports
spelling practice and letter-size awareness in handwriting. Matching shapes
to a word bank turns a weekly spelling list into a short puzzle children can
do on their own.

## History

Configuration boxes, also called word shape boxes, have been a staple of
elementary spelling workbooks and teacher-made practice sheets for decades,
drawing on the reading research idea that familiar words are recognised
partly by their outline.

## This implementation

- **Spec knobs:** `difficulty`, `words` (your own list; empty = drawn from
  the grade-level list), `count` (0 = by difficulty), `box_size` (0 = as
  large as the page allows, up to 40 pt), `width`, `height`, `margin`,
  `name_line`.
- **Generation:** difficulty is the grade band of the vendored word lists:
  Kids = kindergarten (short words and first sight words, 6 words), Easy =
  grade 1 (8), Medium = grade 2 (10), Hard = grade 3 (10), Expert = grade 4
  and up (12). Words are drawn in seeded order, skipping any whose shape
  another chosen word already has; the bank is printed in capitals in
  alphabetical order and the shapes in a shuffled order, in two columns.
  A typed list may contain words that share a shape: those shapes show the
  first letter in the first box, and a list in which two words share both
  shape and first letter is refused.
- **Solving:** nothing to search — the answer key writes each word into its
  boxes. `rating_basis` is `grade_level_word_list`.
- **Guarantees:** deterministic per seed. Every shape (with its hint letter,
  if shown) fits exactly one word in the bank, and the shapes are exactly
  the bank words — checked when the page is built and re-checked in the
  tests by an independent backtracking count that finds exactly one way to
  match shapes to words. Letters are classed by school print heights. Meta
  carries `answers_checked`; a page whose words cannot fit is refused rather
  than clipped.
