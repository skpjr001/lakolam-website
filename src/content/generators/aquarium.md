---
title: "Aquarium"
blurb: "Aquarium — fill the tanks so the water levels match the edge counts"
category: puzzle
version: "1.0.0"
---
Fill the tanks with water. Within a tank the water finds its level — flat
layers from the bottom up — and the numbers count the water in each row and
column.

## What it is

The grid is divided into tanks. Water poured into a tank obeys gravity: it
settles into flat horizontal layers filling from the bottom, so within one
tank every row is either all water or all air, and no water floats above air.
The numbers along the top and side give the total water cells in each column
and row. Exactly one set of levels fits.

## How to play

A tank spanning several columns fills a whole row at once, so a column count
that can only be met by filling a tank's bottom row settles it — and that
level cascades to every column the tank touches. Play the counts against the
tank shapes; the flat-surface rule ties distant columns together.

## Purpose

A shading puzzle with a mechanic no other in the catalogue has: **gravity**.
The Nurikabe/Heyawake family shades free cells; Aquarium's water must stack
into flat layers, which turns each tank into a single small integer — how high
its water stands — and makes the uniqueness proof almost free.

## History

Aquarium spread through Conceptis-style puzzle apps and the daily-puzzle
sites (puzzle-aquarium.com and others) in the 2010s, a modern addition to the
Japanese-style logic canon.

## This implementation

- **Spec knobs:** `size` (5–9), `tank_size` (rough cells per tank),
  `difficulty`, `cell`, `line`.
- **Generation:** the grid is partitioned into tanks by seeded flood growth
  (tiny tanks absorbed into a neighbour), each tank given a random water
  level, and the row/column counts read off — kept only when the counts alone
  force a single answer.
- **Guarantees:** deterministic per seed; the water obeys gravity in every
  tank and matches its counts (checked); and an exhaustive search over the
  tanks — each contributing only a single integer of state, its level — proves
  exactly one assignment matches the counts. Rated by how many tanks there are
  to disentangle.
