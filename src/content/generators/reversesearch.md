---
title: "Reverse Word Search"
blurb: "Reverse Word Search — write every listed word in from its shown first letter until the grid is full"
category: word
version: "1.0.0"
---
A word search in reverse: the grid is empty, and you write the words in.

## What it is

An empty grid shows just one letter for each word in the list: its first letter. Write every word
into the grid, starting on a square that shows its first letter, so that when all the words are in,
every square is filled.

## How to play

1. Each word starts on a shaded square showing its first letter, and every shaded square starts
   exactly one word.
2. A word runs in a straight line from its first letter. The page says which directions are
   allowed: on easy pages only left to right or top to bottom; on harder pages diagonally too, and
   on the hardest also backwards and upwards.
3. Words may cross each other, but only where they share the same letter.
4. When every word is in place, no square is left empty. Use that: a word that would leave a
   square no other word can reach is in the wrong place.

Tip: start with the long words and the letters that appear on only one shaded square.

## Purpose

Spelling, planning and logic: each word has only a few places to go, and the full grid and crossing
letters decide which one. It turns a passive word search into active word placement.

## History

The word search appeared in the late 1960s. Its reverse — fill the grid instead of finding in it —
is a long-standing variety in puzzle magazines and puzzle websites, usually with the first letter
of each word given and the rule that the finished grid is full.

## This implementation

**Spec knobs:** `difficulty` (Kids: 5×5, right or down; Easy: 6×6, right or down; Medium: 7×7,
right, down or diagonally downward; Hard: 8×8, all eight directions; Expert: 10×10, all eight
directions), `theme` (12 themes or `auto`), `cell` (14–60 pt), `line`.

**Generation:** themed words (from `lako-lexicon`, in the large dictionary, family-friendly) are
placed at random wherever each adds at least two new squares, crossing only on equal letters, each
on its own start square; then every square still empty is filled with a word (themed first, else a
basic-tier family-friendly dictionary word) placed through it. A finished grid that the count does
not prove unique is thrown away and the next tried. About 6 words at Kids up to about 24 at Expert.

**Solving:** an exact count of every way to place the list — each word on a shown square with its
first letter, each shown square starting one word, an allowed direction, letters agreeing with
every crossing and every shown letter, every square filled — branching on the word with the fewest
placements left, capped at two.

**Guarantees:** `unique` — exactly one placement of the words fits. `rating_basis:
size_and_directions`. Tests re-count with an independent search (words in list order, a fresh grid
per branch). Meta: `size`, `directions`, `words`, `word_count`, `theme`.
