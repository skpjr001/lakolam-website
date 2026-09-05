---
title: "Crossword"
blurb: "Symmetric crossword grids filled from a clued wordlist"
category: word
version: "1.0.0"
---
Fill the symmetric grid from numbered clues, across and down.

## What it is

A square grid of white and black cells, conventionally with 180° rotational
symmetry. Numbered white cells start the entries; each across and down entry
has a clue. Every white cell belongs to both an across and a down word
(fully checked grids), so each letter is confirmed twice.

## How to play

Answer what you know, pencil what you suspect, and let crossings settle
disagreements. Short entries recur across published puzzles (crosswordese
rewards experience); long entries yield to patterns once a few crossings are
in. In a well-made grid every letter is checked by two words, so a wrong
guess collides quickly.

## Purpose

The prestige word puzzle, and the hardest of the three word-grid crates: it
needs a *clued, scored* wordlist, which is a data-acquisition problem as
much as an algorithmic one. The crate exists because the grid-filling
machinery is shared with wordfit; the wordlist quality is the ongoing
investment.

## History

Invented by **Arthur Wynne** — a Liverpudlian journalist — for the *New York
World*, published 21 December 1913 as a diamond-shaped "Word-Cross". The
1920s made it a craze; The Times of London capitulated in 1930; the cryptic
tradition forked in Britain while American grids standardised on full
checking and rotational symmetry.

## This implementation

- **Spec knobs:** `size`, `max_blocks`, `theme`, `difficulty`.
- **Generation:** symmetric block placement under connectivity and
  minimum-word-length constraints, then backtracking fill with
  most-constrained-slot-first over the scored wordlist; clues come with the
  list entries.
- **Guarantees:** the grid is connected, symmetric, fully filled from the
  list, and every entry has a clue; the fill is deterministic per seed.
- **Difficulty:** wordlist scoring tier and grid openness (block count,
  average entry length), banded.
