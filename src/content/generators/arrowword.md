---
title: "Arrowword"
blurb: "Arrowword — a fully-checked word square with in-grid clues and arrows"
category: word
version: "1.1.0"
---
The crossword with its clues inside the grid. Each clue sits in a shaded cell
with an arrow, and the answer runs off the way the arrow points.

## What it is

A compact, fully-checked crossword built as a word square: every row and every
column is a word. The clues for the rows run down the left edge (arrows
pointing right into their answers); the clues for the columns run along the top
(arrows pointing down). There is no separate clue list — everything is in the
grid.

## How to play

Solve any clue you can, and its letters immediately constrain the crossing
answers. Because every cell belongs to both a row word and a column word, a
single confident answer cracks open the whole square.

## Purpose

The single most common crossword format in continental Europe (the *Scanword*
or *Swedish crossword*). It is a *layout* of the crossword mechanic rather than
a new one — included, as the research recommended, purely for how widespread it
is — and it is the catalogue's only in-grid-clue crossword.

## History

The arrowword (Swedish crossword) spread from Scandinavia across Europe through
the 20th century and now fills dedicated magazines — Take a Break's Arrowwords,
Puzzler Arrowords, Lovatts — in dozens of languages.

## This implementation

- **Spec knobs:** `size` (3–5, or null — the default — to take it from
  `difficulty`: kids 3, easy 4, medium and above 5), `difficulty`, `cell`,
  `line`.
- **Generation:** a word square is filled row by row from the clued vocabulary,
  pruned by requiring every partial column to be the prefix of some word and
  every completed column to be an actual word; each row and column then takes
  its dictionary clue.
- **Guarantees:** deterministic per seed; every row and column is a clued
  dictionary word — a valid, fully-checked word square (checked at build time).
  Like a crossword, the solve rests on the clues; the grid's correctness is the
  provable part. Clued wordlist vendored, so the crate depends on no other
  generator. Rated by grid size (`rating_basis: grid_size`: 3 kids, 4 easy,
  5 medium).
- **Reachable bands:** kids, easy and medium. 5×5 is the largest word square
  built from the clued list, so there is no hard or expert rung: those are
  served as medium with `requested_difficulty`.
- **Version 1.1:** `size` may be null, and is by default, so `difficulty`
  picks the grid, and a 3×3 kids square was added (an explicit `size: 3` was
  clamped to 4 before). Before, every request was served medium on a 5×5.
  Pages that set `size` to 4 or 5, medium-and-above requests, and the default
  page are byte-identical to 1.0.
