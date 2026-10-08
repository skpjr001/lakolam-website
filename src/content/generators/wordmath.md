---
title: "Word Math"
blurb: "Word math — a long division or multiplication written in letters, proven to have one reading; the letters in digit order spell the key word"
category: word
version: "1.0.0"
---
A long division written entirely in letters — crack the digits, then read the
key word.

## What it is

A complete long division (or long multiplication) in which every digit has
been replaced by a letter: the quotient, the divisor, the dividend, every
partial product, every line brought down and the remainder. Each letter
stands for one digit, different letters for different digits, and all ten
digits appear. When every letter is known, write the letters in order from 0
to 9: they spell a ten-letter word.

## How to play

Every line of the working is a real piece of arithmetic, so each one is a
clue. A number never starts with 0. A partial product is the divisor times
one digit of the quotient, so a quotient letter that copies the divisor's
letters back out must be 1. Each subtraction must come out right, and the
first letter of a line brought down often shows a borrow. Look for the
letter that appears where only 0 or 1 can go, fix it, and let each
subtraction give you the next. When you have all ten digits, write the
letters in the boxes from 0 to 9 to spell the key word.

## Purpose

A logic puzzle for adults who like numbers: no guessing, just column
arithmetic read backwards. It is a bigger, richer cousin of the letter
addition: a division page gives the solver many more lines to work with,
and the key word at the end gives a satisfying check that every digit is
right.

## History

Letter arithmetic goes back to nineteenth-century puzzle columns, and long
divisions with most digits missing ("skeleton divisions") were a favourite
of Henry Dudeney and later of W. F. Cheney. American puzzle magazines,
Dell's math and logic titles above all, made the all-letter version with a
ten-letter key word a regular feature under the name **Word Math**.

## This implementation

- **Spec knobs:** `kind` (`division`, the default, or `multiplication`);
  `difficulty` sets the size — division Easy 2-digit divisor and 3-digit
  quotient, Medium 3 and 3, Hard 3 and 4, Expert 4 and 4; multiplication
  Easy 3 × 2 digits, Medium 3 × 3, Hard 4 × 3, Expert 4 × 4 (Kids is served
  as Easy); `letter` (point size, 10-60); `key_boxes` (the ten numbered
  answer boxes).
- **Generation:** answer-first. A divisor, a quotient with no zero digits
  (a zero digit has no working to show) and a remainder are drawn at the
  band's size; the long division is laid out digit by digit; layouts that
  do not use all ten digits are dropped. The key word comes from a
  hand-picked list of common ten-letter words with ten different letters,
  and digit `d` is written as the key word's `d`-th letter.
- **Solving:** the uniqueness counter enumerates the divisor (first
  factor) by its letter pattern, then each quotient (multiplier) digit by
  the partial product it must produce, then the remainder, and compares the
  whole recomputed layout with the puzzle, counting up to two readings.
  About one random layout in two to twenty survives, depending on size;
  generation takes milliseconds.
- **Guarantees:** exactly one assignment of digits to letters makes the
  page a correct long division (multiplication) — proved by the counter
  and re-checked in the tests by a brute force over all 10! digit
  permutations; no number starts with zero; all ten digits appear, so the
  key word is fully determined. Difficulty is rated by layout size
  (`rating_basis`); meta carries `unique: true`, the key word and the
  numbers.
