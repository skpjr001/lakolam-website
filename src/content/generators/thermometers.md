---
title: "Thermometers"
blurb: "Thermometers — fill each from its bulb so the counts match"
category: puzzle
version: "1.2.0"
---
Fill the thermometers with mercury. Each fills from its bulb toward its tip in
one unbroken run, and the numbers count the filled cells in each row and column.

## What it is

The grid is packed with thermometers, each a bulb and a tube. Mercury rises
from the bulb toward the tip and never leaves a gap, so a thermometer is either
empty, full, or filled to some point in between — always starting at the bulb.
The clues along the edges give the filled-cell count for each column and row.

## How to play

A column count of zero empties every thermometer cell in it — and because
mercury is contiguous from the bulb, emptying a cell empties everything beyond
it toward the tip. A full count fills the line, which forces mercury back
toward the bulbs. Work the extremes first; the contiguity rule carries the
deductions along each tube.

## Purpose

The sibling of `lako-aquarium`: another puzzle whose every shape holds a
single integer of state — how far the mercury has risen — so the uniqueness
proof is a product of small numbers rather than a search over cells. It reads
very differently on the page, though: bulbs and tubes instead of tanks.

## History

Thermometers is a modern Japanese-style logic puzzle, popularised through
Conceptis and the daily-puzzle sites alongside Aquarium; the two are often
paired in variety collections.

## This implementation

- **Spec knobs:** `size` (5–9), `max_length` (longest tube; null — the
  default — takes it from `difficulty`: kids and easy the grid side, medium 5,
  hard 3, expert 2, with hard and expert using 4 on 8×8 and 9×9), `difficulty`,
  `cell`, `line`.
- **Generation:** the grid is packed with straight thermometers — from each
  free cell the longest available run is taken, so a few long tubes cover the
  board rather than many stubs — each given a random mercury level, and the
  row/column counts read off; kept only when the counts alone force one answer.
- **Guarantees:** deterministic per seed; mercury is a contiguous run from each
  bulb and the counts match (checked); and an exhaustive search — thermometers
  longest-first, pruned so no line overshoots and every line's deficit stays
  reachable — proves exactly one set of fills fits (a truncated search is
  treated as ambiguous). Rated by how many thermometers there are
  (`rating_basis: thermometer_count`: per cell, easy ≤ 0.24, medium ≤ 0.34,
  hard ≤ 0.44, expert above).
- **Reachable bands:** on the default 7×7 a null `max_length` serves easy for
  most seeds (9 of 12 surveyed; the rest medium), medium, hard and expert
  (10 of 12; the rest hard). There is no kids rung — kids is served as easy or
  medium. On a 9×9, tubes shorter than 4 took 8–16 s a page and still came
  out mostly medium, so on 8×8 and 9×9 hard and expert use 4 — fast, but
  mostly served as medium. Off-band pages carry `requested_difficulty`.
- **Knobs that find nothing (v1.1):** short caps (`max_length` 0–3) failed for
  some seeds and sizes. Now, only when the requested cap finds nothing, a
  second pass from fresh seeds retries it, then raises it a step at a time
  toward 5; the metadata reports `max_length_used` when it differs. Every
  board that generated before is unchanged.
- **Version 1.2:** `max_length` may be null, and is by default, so the band
  picks the longest tube. Before, it was 5 for every request and every page
  came out medium. Pages that set `max_length`, medium requests, and the
  default page are byte-identical to 1.1.
