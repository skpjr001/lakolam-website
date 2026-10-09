---
title: "Number Labyrinth"
blurb: "Number Labyrinth — 1..N once in every row and column, met in repeating order along a labyrinth corridor"
category: puzzle
version: "1.0.0"
---
Walk the labyrinth from the circle and meet the numbers in order — 1, 2, 3,
4, 1, 2, 3, 4 … — while every row and column holds each number once.

## What it is

A square grid whose thick walls make a single winding corridor that passes
through every cell, starting at the circled cell. The range of numbers is
printed above the grid (for example 1–4), and a few numbers are already
written in. Some cells get numbers and the rest stay empty.

## How to play

- Write numbers from the given range into some of the cells. Every row and
  every column must contain each number of the range exactly once; the
  other cells of the row or column stay empty.
- Start in the circled cell and walk along the corridor, never crossing a
  thick wall, until you have visited every cell. The numbers you pass must
  come in the order 1, 2, 3 … up to the largest, then 1, 2, 3 … again, over
  and over. The first number you meet is a 1 and the last is the largest.
- Empty cells along the way do not matter; only the order of the numbers
  counts.
- There is exactly one solution.

Good places to start: trace the corridor once with a pencil so you know
its order. A printed number tells you which number comes next along the
corridor and which came before it. A row that already shows most of its
numbers has only a few cells left for the rest.

## Purpose

A number-placement puzzle with a maze in it: it mixes Latin-square
counting (each number once per row and column) with following a path and
keeping a repeating sequence in mind. It trains planning ahead and
checking two kinds of rule at once.

## History

The Number Labyrinth (German *Zahlenlabyrinth*) is collected by Otto Janko,
whose puzzles run from 5×5 to 11×11; the early ones used a spiral corridor
and later ones winding paths. It belongs to the family of "partial Latin
square" puzzles such as Easy as ABC and Nanbaboru, where only some cells
of each row and column are filled.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `numbers` (the largest number, 2–4, or 2–3 on a
  5×5 grid; 0 picks the most the side allows), `difficulty`, `cell` (18–90
  pt), `line` (0.2–4 pt). Out-of-range numbers are clamped and the
  requested value is reported in the metadata.
- **Generation:** answer first. A random corridor through every cell comes
  from a serpentine reshaped by backbite moves (an end steps onto a
  neighbour and the stretch between is reversed). A randomised search then
  walks the corridor deciding for each cell "empty" or "the next number of
  the cycle", as each row and column allow; a corridor with no filling
  inside the search's budget is replaced. With random winding corridors,
  fillings almost never exist once the largest number exceeds 4 (3 on a 5×5
  grid), so the range is capped there — like Janko's own 9×9 puzzles with
  numbers 1–4. Every number starts printed and is removed in random order
  while the ladder still settles the grid at the band's rung (the rule
  rungs first, then trial for Hard and Expert).
- **Solving:** a ladder on one yes/no variable per cell and entry (a number
  or empty). *Single rules*: one entry per cell; each number exactly once
  per row and column, and the right count of empty cells; along the
  corridor, past empty cells the number after a v can only be v + 1 (after
  the largest comes 1) and the one before only v − 1, the corridor
  starting as if after the largest number and ending on it. *Whole
  corridor*: every placement along the whole corridor in repeating order
  that fits what is known (a forward and backward sweep over "the last
  number met"). *Trial*: assume a value, follow the consequences, keep the
  opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it when cheap
  (`count_confirmed`), and re-proven in tests by an independent search that
  walks the corridor cell by cell and shares no code with the ladder. Rated
  by the hardest rung needed with size as the tie-break (single rules: Kids
  at 5×5, Easy at 6×6, else Medium; whole corridor: Easy at 5×5, Medium at
  6×6, else Hard; trial: Hard at 5×5, else Expert). Every band is served at
  its default size; with a custom `size` the label states the band reached.
