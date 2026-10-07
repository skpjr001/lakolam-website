---
title: "Pills"
blurb: "Pills — hide pills of three digits worth 1 to N; the edge numbers sum the covered digits"
category: puzzle
version: "1.0.0"
---
A box of digits with pills hidden in it: find the strips of three whose
digits add up to 1, 2, 3 … and match the totals round the edge.

## What it is

Every cell of the grid holds a digit. Hidden in it are a number of
"pills" — strips of three cells, lying across or down. A pill is worth the
sum of its three digits, and there is exactly one pill of every value from
1 up to the number of pills printed under the grid. The numbers beside the
grid give, for each row and column, the total of the digits covered by
pills.

## How to play

- Draw the pills: strips of three cells side by side, across or down.
  Pills never overlap, but they may touch.
- A pill's value is the sum of its three digits. There is exactly one pill
  worth 1, one worth 2, and so on up to the number shown under the grid.
- The number at the left of a row (or above a column) is the sum of all the
  digits in that row (or column) that lie inside pills. A 0 means no pill
  covers anything but zeros there.

Good places to start: list the strips that make the small values — a pill
worth 1 needs two zeros and a one — since there are usually only a few. A
row or column with total 0 can only hold pills over zeros. When a value
has just one possible strip left, that pill is placed, and its cells are
out of bounds for every other pill.

## Purpose

A search-and-add puzzle that gives mental arithmetic a purpose: quick
sums of three digits, totals across a line, and the logic of "only one
place left" when candidates run out.

## History

Pills (German *Pillen*) comes from the German puzzle scene and is one of
the larger collections on Otto Janko's puzzle site, which holds several
hundred of them on grids from 6×6 to 10×10.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8, 9
  from Kids to Expert), `pills` (2 up to one per six cells; 0 picks 4, 6,
  7, 9, 10, 12 for sizes 5 to 10), `difficulty`, `cell` (18–90 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped and the requested value is
  reported in the metadata. Digits run from 0 to a top digit just large
  enough for three of them to make the largest pill (at least 3).
- **Generation:** the pills are planted on random free strips with the
  values shuffled over them, each pill's three digits a random split of its
  value, and every other digit random. Then a local search repairs the
  board: while the deduction ladder leaves a decoy strip undecided, one of
  that decoy's digits outside every pill is changed. Digits outside the
  pills never change the answer or the edge totals, so every repair keeps
  the planted answer valid. For the Hard and Expert bands a board the
  ladder settles without trial gets a fresh random digit outside the pills
  and is tried again.
- **Solving:** a ladder on yes/no variables, one per strip whose digits
  make a value from 1 to N. *Local*: exactly one strip per value, no two
  chosen strips on a cell, and each line's covered digits a subset sum of
  the strips crossing it that reaches its total. *Trial*: assume a strip in
  or out, propagate, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one hiding, proven
  because the sound ladder settles every strip (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it when cheap
  (`count_confirmed`), and re-proven in tests by an independent search
  that places one value at a time with line-total bounds. Rated by the
  hardest rung needed with size as the tie-break (local: Kids at 5×5, Easy
  at 6×6, else Medium; trial: Hard up to 8×8, else Expert). Every band is
  reached at its default size; with a custom `size` the label states the
  band actually reached.
