---
title: "Slant (Gokigen Naname)"
blurb: "Fill every cell with a diagonal, matching the corner counts and closing no loop"
category: puzzle
version: "1.0.0"
---
Fill every cell with a diagonal so the circled numbers count their touching
diagonals — and no diagonals form a loop.

## What it is

Every cell of the grid gets exactly one diagonal, `/` or `\`. Circled numbers
sit on the lattice *points* between cells: each counts how many of the (up to
four) surrounding diagonals touch that point. And the diagonals may never
close a loop.

## How to play

Corners and edges first: a corner point touches one cell, so its number (0 or
1) decides that cell instantly. A "4" takes all four diagonals into its
point; a "0" pushes all four away. The loop rule does the quiet work — the
smallest possible loop is a diamond of four diagonals (`/\` over `\/`), and
avoiding it forces late cells. Track connected chains: joining two ends of
the same chain is exactly what a loop is.

## Purpose

The only puzzle here where *every* cell is filled and the clues live on
points rather than cells — a genuinely different geometry that exercises the
grid renderer. Its loop rule is implemented as a union-find, the same
machinery a maze carver uses, shared conceptually if not in code.

## History

Nikoli, published as **Gokigen Naname** (roughly "in a diagonal mood").
Western publishers standardised on Slant, after Simon Tatham's popular
open-source implementation of it.

## This implementation

- **Spec knobs:** `rows`, `cols`, `clue_share`, `difficulty`.
- **Generation:** answer first — a loop-free diagonal filling is built (the
  `Forest` union-find with an undo log makes trial placements cheap), point
  counts are read off it, clues are thinned while unique.
- **Guarantees:** exactly one filling satisfies the printed numbers; the
  solver was cross-checked against brute force over **every** diagonal
  filling of a 2×3.
- **A lesson recorded:** the star of four diagonals meeting at a point is a
  *tree*, not a loop — the actual minimal cycle is the diamond, an assumption
  the brute-force sweep corrected. Difficulty bands were re-centred on the
  measured clue-density spread after by-eye thresholds put every board in
  Hard and cost 8× in retries.
