---
title: "Kojun"
blurb: "Kojun — regions numbered 1..size, neighbours differ, the upper of two stacked region cells is larger"
category: puzzle
version: "1.0.0"
---
Number every region from 1 up to its size — neighbours never match, and
within a region the upper of two stacked cells is always larger.

## What it is

A square grid divided into outlined regions of one to six cells, with some
numbers already written in. A region of N cells holds the numbers 1 to N,
each once. Two touching cells never hold the same number, and inside a
region numbers fall as you go down.

## How to play

- Write a number in every cell. A region of N cells holds each of the
  numbers 1 to N exactly once (a one-cell region holds 1).
- Two cells that share a side never hold the same number, even across a
  region border.
- When two cells of the same region sit one directly above the other, the
  upper number must be larger than the lower one.
- There is exactly one solution.

Good places to start: a region of two stacked cells must read 2 over 1. The
top cell of a vertical strip in a region is its largest number, and the
bottom one its smallest. A number in a cell rules that number out of its
four neighbours.

## Purpose

A gentle number-placement puzzle: only small numbers, no arithmetic, and
two simple rules that work together. It trains elimination and ordering,
and is a good step between Suguru-style region puzzles and sudoku.

## History

Kojun is a Nikoli genre, first published in the puzzle magazine *Puzzle
Communication Nikoli* (No. 125, 2008), sometimes spelled Cojun. It belongs
to the same family as Suguru (also called Tectonic), where regions count
themselves, and adds the "larger above smaller" rule within a region.
Otto Janko's online collection has many examples.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 6, 7, 8, 7, 8
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4
  pt). Out-of-range numbers are clamped and the requested value is
  reported in the metadata.
- **Generation:** answer first. The grid is carved into regions of one to
  six cells (grown from random seeds with sizes mostly three to six), and a
  randomised most-constrained-cell search fills it; a partition that cannot
  be filled within the search's budget is carved again. Every number starts
  printed and is removed in random order while the ladder still settles the
  grid at the band's rung. Several grids are dug for the band and the first
  that needs its rung is served.
- **Solving:** a ladder on one yes/no variable per cell and number. *Single
  rules*: one number per cell within its region's range, each number once
  per region, neighbours differ, and the upper of two stacked region cells
  is larger (bounds on both). *Whole region*: every filling of a region with
  1..N that agrees with what is known and keeps its stacked cells in order;
  a number no filling puts in a cell is ruled out. *Trial*: assume a value,
  follow the consequences, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every variable (meta
  `uniqueness_proof`), with a capped exhaustive count confirming it when
  cheap (`count_confirmed`), and re-proven in tests by an independent
  most-constrained-cell search that shares no code with the ladder. Rated
  by the hardest rung needed with size as the tie-break (single rules: Kids
  up to 6×6, Easy at 7×7, else Medium; whole region: Easy up to 6×6, Medium
  up to 8×8, else Hard; trial: Hard up to 7×7, else Expert). Minimal digs
  almost always fall to the single rules or need trial, so Easy and Medium
  are reached through board size; every band is served at its default
  size. With a custom `size` the label states the band reached (Kids from
  7×7 up is Easy or Medium).
