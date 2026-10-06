---
title: "Word Knots"
blurb: "Word Knots — place each region's jumbled letters so every run across and down is a word"
category: word
version: "1.1.0"
---
A small crossword with no clues, cut into regions. Each region shows its
letters, but not their order.

## What it is

A crossword grid divided by bold lines into regions of two to five
squares. In the corner of each region are its letters, in alphabetical
order. Put every letter into a square of its own region so that each run
of letters across and down spells a word. There are no clues: the words
have to fit together, and there is exactly one way they do.

## How to play

Every square in a region gets one of that region's letters, and each
letter is used exactly once (a letter shown twice is used twice). When the
grid is full, every run of white squares across, and every run down, must
be a real word. Every run is at least three letters long.

Look for squares with few choices. A square at the start of a word can
only hold a letter that some word starts with; a corner square must suit
both its across and its down word. When a letter can only go in one
square of its region, write it in, and cross it off. Each letter you place
narrows the words through that square, so keep switching between the
across and down words until every region is used up.

## Purpose

A crossword built from logic instead of trivia. It rewards spelling, a
feel for which letters start and end words, and patient elimination, much
like a sudoku with letters. The small grids make it a quick daily puzzle
that suits all ages.

## History

Placing jumbled letters into a crossword is an old idea in puzzle
magazines. The form with regions of letters, each region's letters shown
together in its corner, was popularised by the game Knotwords (2022), by
Zach Gage and Jack Schlesinger. Word Knots is a generic version of that
idea for print.

## This implementation

- **Spec knobs:** `difficulty`, `size` (4 to 7; 0 picks 4 for Kids, 5 for
  Easy and Medium, 6 for Hard and 7 for Expert), `cell`, `line`.
- **Generation:** a block pattern with half-turn symmetry, fully checked
  (every run at least three squares, at most six from 6×6 up), white
  squares connected, no 2×2 of blocks, filled by backtracking with forward
  checking over a per-length bitset index of different, family-friendly
  words (the Basic tier for Kids and for three-letter words, Common
  otherwise). The squares are then cut into connected regions by seeded
  growth: two or three squares for Kids and Easy, three or four for Medium
  and Hard, three to five for Expert. Up to 12 cuts are tried per fill and
  16 fills per puzzle. Basic words never fill a 6×6 or 7×7 grid, so Kids
  at those sizes (v1.1) first tries as before and, only when nothing is
  found, runs the same attempts again from fresh seeds with the Common
  words the other bands use; such a grid is rated by its size (Hard or
  Expert) and labelled with `requested_difficulty`.
- **Solving:** an exhaustive search places letters square by square in
  reading order, each from its region's remaining letters, and prunes every
  across and down run against prefixes of words in the large dictionary
  (about 114,000 words). It counts fills and stops at two; a search that
  exceeds its node budget counts as ambiguous. Only a cut with exactly one
  fill is used.
- **Guarantees:** deterministic per seed; every answer is a real,
  family-friendly word; the regions partition the white squares into
  connected pieces; exactly one fill exists, proven against the large
  dictionary and re-counted in the tests by an independent search (region
  by region over every distinct arrangement of its letters, runs checked
  whole). Difficulty uses `rating_basis` `deduction_rung_size_and_regions`:
  the easiest rung of a ladder that settles every square - region logic (a
  letter with exactly as many possible squares as copies goes there; a
  letter whose copies are all placed leaves the region's other squares)
  together with word logic (a letter stays in a square only if some
  dictionary word for each of its runs fits the squares' remaining letters
  and the regions' letter counts), then one-deep trial - plus size and the
  largest region. With the first rung: 4×4 is Kids, 5×5 is Easy (regions
  up to three) or Medium, 6×6 Hard, 7×7 Expert; a grid needing trial would
  be Hard at 5×5 and Expert above. Every grid measured so far is settled
  by the first rung, so the bands rest on size and region size. **Size is
  capped at 7×7:** denser grids rarely fill from common words, and the
  exhaustive count grows quickly with region size.
