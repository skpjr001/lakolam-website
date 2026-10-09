---
title: "Renban"
blurb: "Renban — a Latin square whose bold regions each hold a gap-free run of numbers, in any order"
category: puzzle
version: "1.0.0"
---
A Latin square whose bold regions each hold an unbroken run of numbers — in
any order.

## What it is

An N×N grid divided into bold regions of different sizes. Every row and
every column holds 1 to N once, as in a Latin square, and the numbers inside
each region must be consecutive: a run with no gaps, written in any order.

## How to play

Write a number from 1 to N in every cell so that:

- each row and each column holds every number from 1 to N exactly once;
- the numbers in each bold region are all different and form a run without
  gaps — 5, 7, 6 is fine; 5, 6, 8 is not. The order inside the region does
  not matter.

A region of three cells holding a 5 can only hold numbers from 3 to 7. A
region of four on a 6×6 grid always contains 3 and 4. A region with one cell
left and the numbers 2 and 4 placed must take the 3.

## Purpose

A Latin-square workout with a gentle twist: the regions add a feel for
number ranges (what fits beside a 5?) to the usual row-and-column logic.
Small boards suit children learning to count on and back.

## History

Renban means "serial numbers" in Japanese; the full name, Renban Place,
reads roughly as "placing number runs". Otto Janko's collection notes that
its inventor is unknown and that it may have first appeared in the Japanese
magazine Puzzle Communication Nikoli. The rules used here are Janko's: a
number from 1 to N in every cell of an N×N grid, each once per row and
column, and the numbers of each region forming a sequence without gaps, not
necessarily in order.

## This implementation

- **Spec knobs:** `size` (4–9; 0 picks from the difficulty — 4, 5, 6, 7, 8
  from Kids to Expert), `difficulty`, `cell`, `line`. Clamped values are
  reported as `requested_*`.
- **Generation:** a random Latin square (a few random seeds, then the shared
  constraint engine's search); regions grow over it from random cells,
  joining neighbours whose numbers extend the region's run, to sizes of one
  to six, and regions of one or two cells then join a neighbour while the
  two together still form a run of at most five, so few cells stand alone.
  Givens are then removed in seeded order while
  the ladder still settles the board — first with the cheap rungs, then with
  the requested ceiling.
- **Solving:** the shared engine — rows and columns all-different (singles,
  pairs, triples), each region all-different, and each region a run: every
  start whose window each cell can still meet and whose every number some
  cell can still take stays possible, cells are cut to those windows, and a
  number inside every possible window with one home in the region goes
  there (a *relation* step, Easy) — plus a **trial** rung above them: assume
  a value, follow it with the cheap rungs, and cross it off when that ends in
  a contradiction.
- **Guarantees:** deterministic per seed; exactly one filling, proven
  because the sound ladder settles every cell, confirmed by a capped count,
  and re-proven in tests by an independent forward-checking search written
  straight from the rules. Rated by the hardest rung needed (`rating_basis:
  hardest_rung_with_size_tiebreak`): naked singles Kids, hidden singles and
  region runs Easy, pairs and triples Medium, trial Hard up to 7×7 and Expert
  above. A band a size cannot reach (Expert below 8×8, Hard from 8×8, the
  harder bands on 4×4) is served at the nearest band found and labelled as
  such beside `requested_difficulty`.
