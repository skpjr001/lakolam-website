---
title: "Magic Square"
blurb: "Magic Square — every row, column and diagonal shares one sum"
category: maths
version: "1.1.0"
---
Place the numbers so that every row, every column, and both diagonals add up
to the same total.

## What it is

A grid to be filled with the numbers 1 to n², each once, so that every line —
row, column, and the two long diagonals — shares one sum, the *magic
constant*. Some numbers are given; there is exactly one way to place the rest.

## How to play

Find a line with only one blank: its number is forced by the magic constant.
The centre of a 3×3 is always one third of the constant. Chase forced cells,
and cross numbers off as you place them.

## Purpose

The oldest recreational number puzzle, and a classroom favourite — and a rule
unlike any other in the catalogue: not a cage sum or a no-repeat line, but a
single total balancing the whole grid across rows, columns *and* diagonals.

## History

The 3×3 Lo Shu square appears in Chinese legend over two millennia old, carried
on the back of a turtle from the river Luo; magic squares spread through
Islamic, Indian and European mathematics and recur in art from Dürer's
*Melencolia I* to Gaudí's Sagrada Família.

## This implementation

- **Spec knobs:** `size` (3 or 4), `difficulty` (default hard), `cell`,
  `line`.
- **Generation:** a base square (the Lo Shu for order 3, the
  diagonal-complement construction for order 4) is placed in one of its eight
  dihedral orientations, then given cells are trimmed — each removal kept only
  while the answer stays forced — until their share reaches the requested
  band's (kids ≥ 70 %, easy ≥ 55 %, medium ≥ 40 %), or to a minimal forcing
  set for hard.
- **Guarantees:** deterministic per seed; the numbers are exactly 1..n² and
  every line sums to the magic constant (checked); and a backtracking search
  filling the blanks with the missing numbers — pruning the instant a
  completed line misses the target — proves exactly one completion fits. Rated
  by how many numbers are given (`rating_basis: given_ratio`).
- **Reachable bands:** kids, easy, medium and hard at both sizes. There is no
  expert rung: a minimal square is the hardest this genre's given count can
  make, so expert is served as hard with `requested_difficulty`.
- **Version 1.1:** `difficulty` now steers the trim. Before, every square was
  trimmed to a minimal set and came out hard whatever was asked; now kids,
  easy and medium stop the trim at their band's share. Hard (the new default)
  and expert requests, and so the default page, are byte-identical to 1.0.
