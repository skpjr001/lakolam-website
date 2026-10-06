---
title: "Tanglewords"
blurb: "Tanglewords - snaking word search and fill-in, every word path proven unique"
category: word
version: "1.2.0"
---
A word search where the words do not run in straight lines: each one snakes
from letter to touching letter through the grid.

## What it is

A grid of letters and a themed word list. Every listed word is hidden along
a path of touching cells: each letter sits next to the one before it, and a
word never uses the same cell twice. On the easier settings the letters touch
side by side; on the harder ones they may also touch corner to corner.

There are two versions. In the **search**, the words hide among extra
letters, and each word can be traced in exactly one way. In the **fill-in**,
there are no extra letters at all: the listed words use up every cell of the
grid exactly once, and there is exactly one way to split the grid into them.

## How to play

Choose a word and find its first letter. Look at the cells touching it for
the second letter, then at the cells touching that one for the third, and so
on, never going back to a cell you have already used in that word. If the
trail runs dry, go back to the last letter that had another choice and try
that way instead. A rare letter, or a double letter, is often the quickest
place to start. Draw a line through each word as you trace it.

In the search, words may cross and share a letter, and some letters belong
to no word. In the fill-in, every letter belongs to exactly one word, so the
corners and edges are the best place to begin: a corner letter has few
neighbours, so its word can only go a few ways. Each word you trace leaves
fewer cells for the rest.

- **Kids, Easy, Medium:** letters touch side by side only.
- **Hard, Expert:** letters may also touch corner to corner, which gives each
  word many more possible routes.

## Purpose

Tanglewords turns the word search from a scanning puzzle into a tracing one:
instead of sweeping straight lines, the solver follows a word step by step
and backs up from dead ends. The fill-in version adds a second layer of
logic, like a jigsaw made of words: once part of the grid is traced, the
remaining cells must still divide into the remaining words.

## History

Snaking word searches have long run in puzzle magazines as a variant of the
classic word search (invented by Norman E. Gibat in 1968), under names such
as snake word search and word snake. The fill-in form, where the words tile
the whole grid, became widely known through word-tiling games such as the
New York Times's Strands (2024).

## This implementation

- **Spec knobs:** `variant` (`search` or `fill_in`), `difficulty`, `theme`
  or your own `words` (four letters or more), `language`, `accents`,
  `rows`, `cols` and, for the search, `count` (0 = from the difficulty),
  `word_list`, `cell`, `line`. `theme` is one of the six built-in lists
  (space, animals, ocean, fruit, weather, garden, unchanged) or any list of
  the shared lexicon (`halloween`, `the_70s`, `birds`, ... sixty-odd English
  themes). `language` (`en` default; `es`, `fr`, `de`, `it`, `pt`, `nl`)
  picks that language's list (ten themes each) and fills the search grid
  with its letter frequencies. `accents`: `fold` (default for theme lists)
  or `keep` (accented capitals in the grid); unset leaves your own words
  cleaned as before (A-Z only).
  A theme with no list in the chosen language (the default `ocean` among
  them) uses the nearest of those ten instead — `animals` for creature
  themes, `food`, `school`, `travel`, `home`, otherwise `nature` — and the
  metadata names it (`theme`, `requested_theme`); before v1.2 that was an
  error, so a page whose only change from the defaults was the language
  would not generate.
- **Generation (search):** Kids 7x7 with 5 words, Easy 8x8 with 7, Medium
  10x10 with 9 (side-by-side steps); Hard 10x10 with 10 and Expert 12x12 with
  12 (diagonal steps too, words of five letters or more). Words (none
  contained in another, forwards or backwards) are routed longest first by a
  randomised depth-first walk that must turn at least once per two steps,
  shares at most one letter with earlier words, and never crosses its own
  diagonal. A route is rejected if any word could then be read a second way
  through word letters alone. Empty cells take letters drawn from the words
  themselves; filler cells on any extra route are re-rolled until each word
  has exactly one.
- **Generation (fill-in):** the grid (Kids 4x5, Easy 5x5, Medium 6x6, Hard
  6x6 with diagonals, Expert 7x7 with diagonals) is cut into snaking paths by
  backtracking from the first free cell, with lengths chosen from the word
  list and every leftover region kept large enough for a word; each path then
  takes a word of its length, read from either end.
- **Small search grids** (v1.2): Hard and Expert on five rows or columns
  cannot fit the level's ten or twelve long words. Only when every attempt
  at the level's count fails, the search hides one word fewer at a time
  (down to three) from fresh seeds, and the metadata notes the level's
  count as `requested_words`. Every page that generated before is
  unchanged.
- **Solving:** search: an exhaustive depth-first count of every route of
  each word from every starting cell. Fill-in: every route of every word is
  listed, then an exact-cover search on the most constrained cell counts the
  ways to cover the grid with one route per word, stopping at two; running
  out of its node budget counts as ambiguous.
- **Guarantees:** deterministic per seed. Search: every listed word has
  exactly one route in the printed grid. Fill-in: exactly one way to cover
  the grid with the listed words (routes, not just cell groups, are unique).
  The answer key draws each route, with a ring on its first letter. Tests
  re-check both with independent methods (routes found by walking each word
  from its last letter; a plain word-by-word cover count). Difficulty is
  rated by grid size, word count and adjacency (`rating_basis` in the
  metadata).
