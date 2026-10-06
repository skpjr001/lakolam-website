---
title: "Word Snake"
blurb: "Word snake — one path from START through every letter reads the themed words end to end"
category: word
version: "1.0.0"
---
One path from START through every letter in the grid, reading a list of
words end to end.

## What it is

A rectangle of letters with one square marked START. A single snake winds
through every square exactly once, moving up, down, left or right, never
diagonally. Read along the snake, the letters spell the listed words one
after another: the last letter of each word sits next to the first letter of
the next. The words come from one theme, such as animals or Christmas.

## How to play

Begin at the START square. Its letter is the first letter of one of the
listed words; find that word's second letter in a square next to it, then
the third, and so on, drawing a line as you go. When a word ends, the next
square along begins another word from the list. Every word is used once and
every square is visited once, so the snake must not cut off a corner or a
pocket of squares it can never reach later. If you get stuck, back up to the
last place where you had a choice. On the Kids level the words are listed in
the order the snake reads them.

## Purpose

A word search turned into a route-finding puzzle: spotting words is only
half of it, because each choice must also leave a way through the rest of
the grid. It trains planning ahead as well as spelling, and the theme makes
it a good classroom or holiday activity.

## History

Single-path letter grids have run in puzzle magazines for decades under
names such as Pathfinder, Round the Houses, Word Trail and Snake Words. The
continuous trail through every letter is the same idea as the Hamiltonian
paths of graph theory, studied by William Rowan Hamilton in the 1850s.

## This implementation

- **Spec knobs:** `difficulty` (Kids 4x5 with words of 3 to 6 letters listed
  in order; Easy 5x5, 3 to 7; Medium 6x6, 3 to 8; Hard 7x7, 4 to 9; Expert
  8x8, 4 to 10), `theme` (any lexicon theme), `language` (`en` default; `es`,
  `fr`, `de`, `it`, `pt`, `nl`; accents folded to A-Z), `cell`, `line`.
- **Generation:** a random Hamiltonian path is laid from a random start
  square (on the majority colour for odd boards) by a depth-first walk that
  prefers squares with few onward moves, with noise so the snake wanders, and
  prunes any move that cuts the unvisited squares in two. Theme words whose
  lengths add up to the square count are picked at random and written along
  the path. A theme without enough words of the level's lengths is refused
  with a message rather than padded.
- **Solving:** an exhaustive count of every path from START that visits every
  square and reads the listed words, each exactly once, in any order. Word
  boundaries are part of an answer, so a second way to split the same path
  into words counts as a second answer. The count stops at two and prunes
  moves that disconnect the unvisited squares; running out of its node
  budget counts as ambiguous.
- **Guarantees:** deterministic per seed; exactly one path-and-split reads the
  list, re-checked in the tests by an independent search that grows paths
  square by square and re-splits the letters read so far from scratch. The
  answer key draws the snake with each word in its own colour. Difficulty is
  rated by grid size (`rating_basis`: `grid_size`).
