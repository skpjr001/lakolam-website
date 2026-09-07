---
title: "Thermometers"
blurb: "Thermometers — fill each from its bulb so the counts match"
category: puzzle
version: "1.0.0"
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

- **Spec knobs:** `size` (5–9), `max_length` (longest tube), `difficulty`,
  `cell`, `line`.
- **Generation:** the grid is packed with straight thermometers — from each
  free cell the longest available run is taken, so a few long tubes cover the
  board rather than many stubs — each given a random mercury level, and the
  row/column counts read off; kept only when the counts alone force one answer.
- **Guarantees:** deterministic per seed; mercury is a contiguous run from each
  bulb and the counts match (checked); and an exhaustive search — thermometers
  longest-first, pruned so no line overshoots and every line's deficit stays
  reachable — proves exactly one set of fills fits (a truncated search is
  treated as ambiguous). Rated by how many thermometers there are.
