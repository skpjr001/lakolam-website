---
title: "Tetonor"
blurb: "Tetonor — complete the strip; each pair makes one sum and one product in the grid"
category: puzzle
version: "1.0.0"
---
Sixteen numbers in a grid, sixteen in a strip: pair up the strip so every
pair makes one sum and one product in the grid.

## What it is

A 4×4 grid of sixteen different numbers sits above a strip of sixteen
numbers written in ascending order, some of them blank. The strip splits
into eight pairs. Each pair (a, b) makes exactly two numbers in the grid: its
sum a + b and its product a × b. Every grid number is made by exactly one
pair. Fill in the blank strip numbers and label every grid number with the
pair and the operation that makes it.

## How to play

Look for grid numbers that belong together: a sum and a product made by the
same pair. If two numbers are s and p, the pair adds to s and multiplies to
p — try splitting the smaller one: 8 could be 3 + 5, and 15 = 3 × 5 is then
its partner. Small grid numbers are usually sums and large ones products; a
prime number that is a product must be 1 × itself, so its partner sum is one
more. Use the strip as a check: it lists every pair's numbers in order, so a
known strip number must turn up in some pair, and a blank lies between the
numbers either side of it. Cross off each grid number as you label it — when
all sixteen are labelled, the blanks in the strip fill themselves.

## Purpose

A number puzzle unlike any other in the catalogue: not a grid to fill but a
matching of sums with products, which exercises mental multiplication and
factor pairs. It suits adults who like arithmetic puzzles and older children
learning times tables alike, and a board fits on a quarter page.

## History

Tetonor is a newspaper number puzzle best known from the puzzle pages of
The Times and The Sunday Times, where it runs alongside Sudoku, Kakuro and
Futoshiki in this same grid-and-strip layout. It belongs to a long line of
sum-and-product riddles ("two numbers add to 8 and multiply to 15") used to
teach factor pairs and, later, quadratic equations.

## This implementation

- **Spec knobs:** `difficulty`, `cell` (grid cell size; the strip boxes are
  half as wide), `line`.
- **Generation:** eight pairs are drawn from 1 up to a band maximum (10 Kids,
  12 Easy, 15 Medium, 20 Hard, 25 Expert) so that all sixteen sums and
  products differ (and no pair has sum equal to product); for Kids and Easy
  the draw also keeps the grid's false leads low. The grid is the sixteen
  values shuffled; the strip is the sixteen pair numbers sorted.
  Strip numbers are then blanked one at a time while exactly one pairing
  still fits — 2 blanks Kids, 5 Easy, 7 Medium, 9 Hard, 11 Expert.
- **Solving:** every (sum, product) partner pair of grid cells that some
  whole-number pair explains is listed; an exact cover of the sixteen cells
  by eight such partners, most-constrained cell first, is checked against
  the visible strip.
- **Guarantees:** deterministic per seed; exactly one pairing fits (the
  search runs to the end with cap 2; a search that ran out of budget would
  be rejected). Since the grid numbers all differ, one pairing fixes the
  strip and every label. The tests confirm it with an independent count that
  tries every partner cell in both roles and factors directly. Rated as the
  harder of two measures: the blanks in the strip (0-3 Kids, 4-5 Easy, 6-7
  Medium, 8-9 Hard, 10+ Expert) and the false leads in the grid — decoy
  partner pairs a solver must rule out (0-1 Kids, 2-4 Easy, 5-8 Medium, 9+
  Hard), with Hard or Expert when the grid alone pairs up more than one way
  and only the strip decides. Hard and Expert boards are required to be hard
  on the second measure too, not only to hide more.
