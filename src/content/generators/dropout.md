---
title: "Dropout"
blurb: "Dropout — a crossword's letters have fallen to the foot of their columns: put back the black squares and the words"
category: word
version: "1.0.0"
---
A finished crossword whose letters have all fallen to the bottom of their
columns. Put the black squares back and the words reappear.

## What it is

A small crossword, filled with real words and with no clues. Every letter
has dropped straight down to the foot of its column, keeping its order,
and the black squares have vanished. The upper diagram shows the fallen
letters; the lower one is the empty grid to restore, with one column
already solved (marked with an arrow). There is exactly one way to put the
grid back together.

## How to play

Each column of the lower grid holds the same letters as the matching column
of the fallen stack, in the same order from top to bottom. Your job is to
decide where in each column the black squares go. A column with fewer
letters than squares has that many black squares to place.

Three rules hold for the finished grid:

- every run of letters across and every run down is a real word;
- every word is at least three letters long;
- the pattern of black squares looks the same when the page is turned
  upside down, so a black square near the top left has a partner near the
  bottom right.

Start with the solved column and its upside-down partner. Then look at each
column on its own: often its letters only split into words one way. Try the
splits that remain against the rows: a split that leaves an impossible
string of letters across is wrong. Every column you settle also settles its
partner.

## Purpose

A crossword that runs backwards. Instead of finding words from clues, the
solver finds where words break, using spelling and word shapes alone. It
rewards a feel for how English words begin and end, and it suits solvers
who enjoy crosswords but not general-knowledge clues.

## History

The drop quote, or quote falls, has been a magazine staple for decades:
the letters of a quotation have fallen below their columns and must be
lifted back into place. Doing the same to a whole crossword, black squares
and all, is a variety-puzzle format known by names such as Dropout and Eyes
Down. Showing one column solved, and keeping the black squares symmetric as
in a daily crossword, gives the solver a firm place to start.

## This implementation

- **Spec knobs:** `difficulty`, `size` (7 to 11; 0 picks 7 for Kids and
  Easy, 9 for Medium, 11 for Hard and Expert), `cell`, `line`.
- **Generation:** a block pattern with half-turn symmetry is grown one
  symmetric pair at a time: every run across and down 3 to 6 letters (7×7)
  or 3 to 7 (larger), no 2×2 of black squares, no row or column more
  than a third black, white squares connected,
  about a sixth to a fifth of the grid black. It is filled by backtracking
  with forward checking over a per-length bitset index of family-friendly
  words: three-letter words from the Basic tier, longer ones from Common,
  no word twice. Up to 24 fills are tried, and for each the columns are
  tried in a seeded order as the solved column.
- **Solving:** a column and its half-turn partner are one unit. Each unit's
  domain is every block placement whose down runs are words in the large
  dictionary (about 114,000 words) in both columns. An exhaustive search
  over the units, pruning each row by large-dictionary prefixes from the
  left and suffixes from the right, counts restorations and stops at two;
  a search that exceeds its node budget counts as ambiguous. Only a
  solved column that leaves exactly one restoration is used.
- **Guarantees:** deterministic per seed; every answer is a real,
  family-friendly word and the grid is symmetric, fully checked and
  connected; exactly one restoration exists, proven against the large
  dictionary and re-counted in the tests by an independent search (block
  masks enumerated directly, words looked up in the dictionary, no prefix
  pruning). Difficulty uses `rating_basis` `deduction_rung_and_size`: the
  easiest rung of a ladder that settles every column (column logic alone;
  then row logic, each row's possible words against each column's
  remaining placements, to a fixed point; then one-deep trial), plus the
  grid size and the number of placements column logic leaves open
  (`open_placements`). 7×7 is Easy; 9×9 is Medium, or Hard with 8 or more
  open placements; 11×11 is Hard, or Expert with 15 or more; a grid
  needing trial would be Hard (9×9) or Expert. Every grid measured so far
  is settled by row logic. **Kids is not reachable** (the smallest grid
  is already Easy work): a Kids request is served as Easy and labelled so
  (`requested_difficulty` in the metadata).
