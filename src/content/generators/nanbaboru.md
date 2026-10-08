---
title: "Nanbaboru"
blurb: "Nanbaboru — numbers 1 to k once per row and column of a larger grid; circles filled, crosses empty"
category: puzzle
version: "1.0.0"
---
A few numbers in a bigger grid — each one exactly once in every row and
column, with circles that must be filled and crosses that must stay empty.

## What it is

A square grid, larger than the range of numbers it uses: for example a 7×7
grid with the numbers 1 to 5. Every row and every column holds each number
of the range exactly once, so some cells in each line stay empty. A few
cells show a printed number, a circle or a cross to get you started.

## How to play

- Write numbers from the range printed above the grid (for example 1–5)
  into some of the cells.
- Every row and every column must contain each number of the range exactly
  once. The remaining cells of the line stay empty.
- A circled cell must hold a number. A crossed cell must stay empty.
- A printed number is already in place.
- There is exactly one way to fill the grid.

Good places to start: a number already in a row cannot appear anywhere else
in that row or its column. When a line already has all its empty cells
(crossed or worked out), every other cell in it holds a number. When a
number has only one cell left in a line where it can go, it goes there.

## Purpose

A Latin-square puzzle with a twist: deciding *where* the numbers go matters
as much as *which* number goes where. It trains the same "only place left"
scanning as sudoku, with the extra question of which cells stay empty — a
calm puzzle that grows from a quick 5×5 into a demanding 9×9.

## History

Nanbaboru ("number ball") is a pencil-puzzle genre in the tradition of the
Japanese puzzle magazines, collected in Otto Janko's large online archive
of logic puzzles, where many examples are by Adolfo Zanellati. Its ancestor
is the partial Latin square used in puzzles like Doppelblock and Easy as
ABC, where each line holds a fixed set of symbols and the rest of the
line is empty.

## This implementation

- **Spec knobs:** `size` (4–9; 0 picks from the difficulty — 5, 6, 7, 8, 9
  from Kids to Expert), `numbers` (the largest number k, 2 up to one less
  than the side; 0 picks two less than the side), `difficulty`, `cell`
  (18–90 pt), `line` (0.2–4 pt). Out-of-range numbers are clamped and the
  requested value is reported in the metadata.
- **Generation:** answer first. A random Latin square of order n (a
  most-constrained-cell search with shuffled values) keeps its symbols 1..k
  and blanks the rest, so every line holds each number once. Every cell then
  starts fully revealed — its number, or a cross — and repeated passes in
  random order weaken each clue (a number to nothing, else to a circle; a
  cross to nothing), keeping a step only while the ladder still settles the
  grid at the band's rung. Up to 60 grids are dug for the band (4 at the
  trial rung); the first that needs exactly that rung is served, else the
  nearest band.
- **Solving:** a ladder on yes/no variables — one per cell and number, and
  one "holds a number" flag per cell. *Single rules*: one number per cell,
  circles filled, crosses empty, a placed number crossed off its row and
  column, a line with all k numbers found emptied. *Only place*: a number
  with one possible cell in a line goes there; a line with exactly k
  possible cells fills them. *Whole line*: the line as a perfect matching
  between its cells and the k numbers plus the empty slots, so a placement
  no complete matching uses is ruled out. *Trial*: assume a value, follow
  the consequences, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven because
  the sound ladder settles every variable (meta `uniqueness_proof`), with a
  capped exhaustive count confirming it when cheap (`count_confirmed`), and
  re-proven in tests by an independent most-constrained-cell search that
  shares no code with the ladder. Rated by the hardest rung needed with the
  side as the tie-break (single rules: Kids up to 5×5, else Easy; only
  place: Easy up to 6×6, else Medium; whole line: Medium up to 6×6, Hard up
  to 8×8, Expert at 9×9; trial: Hard up to 6×6, else Expert). Minimal digs
  rarely need more than the only-place rung, so the larger bands are reached
  through board size: every band is served at its default size. With a
  custom `size` the label states the band reached — a 4×4 never needs more
  than Easy, and Kids from 6×6 up is Easy.
