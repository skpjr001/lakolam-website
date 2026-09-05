---
title: "Codeword"
blurb: "Codeword — a filled crossword in cipher, unique against its vocabulary"
category: word
version: "1.0.0"
---
A filled crossword in cipher: every cell shows a number, the same number
always means the same letter, and a few given letters are the foothold from
which the whole substitution is recovered.

## What it is

A criss-cross of interlocking words with the letters replaced by numbers
(1 up to the count of distinct letters on the page). A legend below the grid
tracks the cipher; the given letters are filled in both grid and legend.

## How to play

Start from the givens: every cell carrying their numbers is now known. Look
for word shapes those letters force — a three-letter slot `_ E _` crossing a
known R narrows fast — and each solved word donates all its letters to the
cipher. The puzzle is finished when the legend is complete.

## Why it is in the catalogue

The most popular pencil puzzle absent from the catalogue's first thirty-seven
— a staple of every puzzle magazine under the names Codeword, Codebreaker,
Cipher Crossword and Kaidoku. It reuses the criss-cross discipline wordfit
established (grown skeleton, one crossing per join, no adjacencies) and adds
the substitution layer on top.

## History

Cipher crosswords appeared in British puzzle magazines in the mid-20th
century and became a fixture under the Codeword name; the Japanese publisher
Nikoli runs the same form as Kaidoku. Unlike the crossword there are no
clues at all — the vocabulary itself is the constraint set.

## The implementation's guarantees

- **Uniqueness is claimed against a declared vocabulary, and proved.** A
  human solves with all of English; a generator cannot ladder that honestly.
  What is proved instead: given the grid, the givens and this crate's word
  list (or the spec's own), exactly one number→letter assignment makes every
  slot spell a distinct listed word. The solver that proves it is in the
  crate, and the metadata names the basis: `givens_against_vocabulary`.
- **Givens are revealed until uniqueness holds**, starting from the
  difficulty's allowance (Easy 4, Medium 3, Hard 2) and the measured count is
  what the difficulty is read from — fewer givens is harder, and the reported
  difficulty follows the count actually needed, not the one requested.
- The skeleton grows with its fill (a slot is only added with a word
  committed), and word choice prefers candidates bringing new letters, so the
  cipher typically spans 14–24 letters.
- The answer key ships as a second scene: full grid and full legend.
