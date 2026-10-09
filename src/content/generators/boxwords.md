---
title: "Box Words"
blurb: "Box word seek — every word reads round the edges of a rectangle, clockwise or counterclockwise, each exactly once"
category: word
version: "1.0.0"
---
A word seek where every word wraps round the edges of a rectangle.

## What it is

A square of letters with a list of words below it, as in a word search —
but no word runs in a straight line. Each one reads **round the edge of a
rectangle**: it starts on any edge cell, travels clockwise or
counterclockwise, and ends right beside where it began. An eight-letter
word wraps a 3×3 box, a six-letter word a 2×3 box, a four-letter word a
2×2 square, so every word in the list has an even number of letters. One
word is usually drawn in for you as an example.

## How to play

Pick a word from the list and look for its first letter. From there, try
to walk round a box: along a row, turn the corner down a column, back along
the row below, and up to the start. The box must be exactly big enough for
the word — the letters go all the way round, with none left over. When you
find a word, draw the loop and cross the word off.

Every word fits exactly one box in the whole grid. On strict pages, no word
reads in a straight line anywhere either, so the usual word-search scan
never helps.

## Purpose

A fresh twist on the word seek for the solvers who love word searches
most: the same relaxed hunt, with a new shape to train the eye. It suits
seniors' puzzle packs and large-print books, and themed lists make it a
seasonal page.

## History

Puzzle magazines have long run word-seek variants that bend the line —
zigzags, spirals, letters round a square. Box-shaped seeks appear in
North American puzzle magazines and became a standalone puzzle book
genre in 2026.

## This implementation

- **Spec knobs:** `difficulty` (grid size and word count), `theme` (any
  English theme of the shared word lists; empty for everyday words),
  `size` (grid side 8–20), `words` (4–24), `example`, `strict`, `width`,
  `height`, `margin`.
- **Generation:** even-length words (4–14 letters, family-friendly) are
  drawn from the theme. They are placed longest first on random boxes,
  sharing letters where they agree (a box may share at most a third of
  its edge with earlier words); the rest of the grid is filled with the
  placed words' own letters, so stray letters give nothing away. A repair
  loop then changes cells no word uses until no word reads round any other
  box (and, when strict, in no straight line). A word whose own cycle reads
  it twice (ABAB, or ABBA read backwards) is never chosen.
- **Solving:** a visual hunt; the key draws every box with a circle on
  the starting letter.
- **Guarantees:** deterministic per seed; every listed word reads round
  **exactly one** box, counted over every rectangle of the right edge
  length, every start cell and both directions; with `strict`, no listed
  word reads in a straight line in any of the eight directions. The tests
  re-count with a different method — each rectangle's edge read as a
  cyclic string, doubled, forwards and backwards, and searched. Rated from
  the grid side and the number of words actually placed (`rating_basis`
  `size_and_words`); a band the page does not reach is reported as
  `requested_difficulty`, and a word count the theme or grid cannot supply
  as `requested_words`.
