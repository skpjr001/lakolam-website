---
title: "Suko"
blurb: "Suko - place 1-9 so the corner circles and the coloured regions add up"
category: puzzle
version: "1.0.0"
---
Place 1 to 9 in the grid so that each circle equals the sum of the four
numbers around it, and each coloured area adds up to its total.

## What it is

A 3×3 grid holds the digits 1 to 9, each once. A circle sits at each of the
four inner corners, and its number is the total of the 2×2 block of cells it
touches. The nine cells are also split into three coloured areas, each with
its total printed in a corner. No digits are given, and there is exactly one
arrangement.

## How to play

Start with the circles: they overlap on the centre cell, and comparing them
tells you how the corner and edge cells trade off. Then bring in the coloured
areas: an area of two cells with a small total allows only a few pairs of
digits, and an area's total often settles which of two candidates belongs
where. Each digit is used once, so every number you place rules it out
everywhere else. Harder grids lean more on the coloured totals, because the
circles alone leave many possibilities open.

## Purpose

The richer sibling of `sujiko`: the same compact 3×3 permutation, with a
second kind of clue that lets a grid carry no given digits at all. It fills
the same short newspaper slot while giving a genuine range of difficulty.

## History

Suko was created by Jai Gomer of Kobayaashi Studios and runs daily in *The
Times*, alongside its predecessor Sujiko.

## This implementation

- **Spec knobs:** `difficulty`, `cell`, `line`.
- **Generation:** a random permutation of 1–9 is placed and its four corner
  sums computed. The permutations of 1–9 that fit those sums alone are
  counted; permutations are redrawn until that count falls in the requested
  band. The 58 ways to split the grid into three connected areas of 2 to 4
  cells are then tried in random order until one makes the answer unique.
  Only if no split works are digits revealed (as few as possible, then
  trimmed); this fallback has never been needed in testing.
- **Solving:** uniqueness is proven by filtering all 9! = 362,880
  permutations against the four sums and three totals; exactly one survives.
- **Guarantees:** deterministic per seed; the digits are a permutation of
  1–9, the areas are connected and sized 2 to 4, every sum and total matches,
  and an independent backtracking count (checking each circle and area the
  moment its last cell is placed) confirms exactly one arrangement. Rated by
  how many permutations the circles allow on their own, i.e. how much the
  coloured totals must do: Kids 1–2, Easy 3–6, Medium 7–14, Hard 15–30,
  Expert 31 or more (about 3% of random grids, so Expert takes a few more
  draws). A grid needing given digits is rated Kids. Every band is reached
  with zero givens; boards generate in under 0.3 s.
