---
title: "Clue Cipher"
blurb: "Clue cipher — a number-coded quotation broken through clue words in the same code; one decoding, proven"
category: word
version: "1.0.0"
---
A coded quotation you crack by solving clues written in the same code.

## What it is

A famous quotation is printed as rows of boxes, each with a number under
it. Every number stands for one letter, and the same number always means
the same letter, everywhere on the page. Below the quotation are clues;
their answers are written in boxes with the same numbers. One or more
letters may be given to start.

## How to play

Solve any clue you can and write the answer in its boxes. Then copy each
letter to every box on the page with the same number — in the quotation
and in the other clues. As the quotation fills in, its words start to show
themselves; guess a word, and its letters spread back to the clues you
could not get. Different numbers are always different letters. Every
letter of the quotation is used in at least one clue, so solving all the
clues reveals the whole quotation.

## Purpose

A gentle code-breaking page that mixes a crossword's clues with a
cryptogram's quotation: the clues give footholds, the quotation rewards
guessing, and each helps the other. It suits adults who like cryptograms
but want a way in, and makes a good daily page for word lovers.

## History

Number-coded quotations go back to the newspaper cryptogram; pairing them
with clue words whose letters share the code grew popular in puzzle apps
and magazines in the 2010s and 2020s. The quotations here are from authors
who died in 1945 or earlier, so every one is in the public domain.

## This implementation

- **Spec knobs:** `difficulty` (letters decoded for you and spare clues),
  `clues` (4–14; raised to what covering every letter takes), `width`,
  `height`, `margin`.
- **Generation:** a quotation whose every word is in the large dictionary
  is chosen (shorter ones on easier pages), then clue answers from the
  project's own clued word list — family-friendly, 4–8 letters, using only
  letters the quotation has — are picked greedily until every quotation
  letter is covered, plus spare clues on easier pages. The letters get the
  numbers 1, 2, 3… in random order. The band's letters are decoded for the
  solver; if the decoding is not yet the only one, more are decoded until
  it is.
- **Solving:** clues and partly read quotation words feed each other; the
  key prints every letter, the given ones in black.
- **Guarantees:** deterministic per seed; the code is one-to-one; every
  quotation letter appears in a clue answer and every answer letter in the
  quotation. Clues are definitions and cannot be proved to have one
  answer, so the uniqueness proof does not use them: taking every coded
  word on the page (quotation words and clue answers) as one cryptogram,
  an exhaustive search over the large dictionary (≈ 114,000 words, plus
  A, I and O) finds **exactly one** decoding in which different numbers
  are different letters — a search that runs out of its node budget counts
  as ambiguous, never unique. The tests re-count with a second search that
  builds each word's candidates by scanning the whole dictionary (no
  pattern index) and takes the words in a fixed order. Rated by the
  letters decoded for you: three or more Easy, two Medium, one Hard, none
  Expert (`rating_basis` `letters_decoded_for_you`); Kids is served as
  Easy, and a page that needed more letters reports `requested_difficulty`.
