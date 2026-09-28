---
title: "Waffle"
blurb: "Waffle — swap scrambled, colour-marked tiles back into six interlocking words"
category: word
version: "1.0.0"
---
Six five-letter words woven into a waffle grid, their letters scrambled —
swap tiles two at a time until every word reads true.

## What it is

A 5 x 5 grid with four holes, shaped like a waffle. Its 21 tiles spell three
words across (rows one, three and five) and three words down (columns one,
three and five). The tiles are printed scrambled and coloured: **green** means
the letter is already in its right place; **yellow** means the letter belongs
somewhere else in that tile's row or column word; **grey** means it belongs in
neither. Green tiles carry a white dot and yellow tiles a white ring, so the
marks survive black-and-white printing. The page also says how many swaps the
puzzle can be solved in.

## How to play

Leave the green tiles where they are. A grey tile must move to a word it is
not currently part of; a yellow tile stays within its row or column but
changes square. A letter shown yellow only once in a word that holds two of
it means only one more copy is needed there. Work out the six words, then
swap tiles two at a time to reach them; the challenge is to finish in the
printed number of swaps, which is the fewest possible — every swap should put
at least one tile in its right place, and the best put two.

## Purpose

A deduction puzzle made of words: the colours narrow each square down, the
crossing words confirm each other, and the swap target adds a planning layer.
It complements `wordle` (feedback on a single word) with feedback spread over
a whole grid.

## History

Created by James Robinson and launched as a daily web game in January 2022;
its daily grid is always solvable in 10 swaps, and a weekly "Deluxe" edition
uses a larger grid.

## This implementation

- **Spec knobs:** `puzzles` (1-4 per page), `difficulty`, `cell`.
- **Dictionary:** a vendored list of about 1,200 common five-letter English
  words; answers are drawn from it and uniqueness is proven against it.
- **Generation:** six distinct words that interlock are found (a top word,
  three downs from its letters, then across words matching the downs). A
  number of tiles stays in place as greens; the rest are scrambled as a
  permutation with a set number of cycles, so the swap count is known, and
  the scramble is rejected if a repeated letter lands in place by accident or
  lets it be solved in fewer swaps. Colouring follows the game: tiles are read
  row by row, and a misplaced tile is yellow when its across word (then its
  down word) still needs that letter in a non-green square, each need used
  once — so repeated letters are marked yellow only as often as they are
  missing.
- **Solving:** a word-by-word search lists every arrangement of the same 21
  letters that keeps the greens, moves every other tile, spells six
  dictionary words and gives exactly the printed colours. The minimum swap
  count is 21 minus the most cycles the letter moves split into, found
  exhaustively because repeated letters make the split a choice.
- **Guarantees:** deterministic per seed; exactly one answer — proven by the
  word search at generation and confirmed in the tests by an independent
  tile-by-tile search with word-prefix pruning (running out of its node
  budget counts as a failure). The printed swap count is the true minimum.
  Rated by greens given against swaps needed: Kids 11 greens and 5 swaps,
  Easy 9 and 7, Medium 7 and 9, Hard 6 and 10 (the original's target), Expert
  4 and 12.
