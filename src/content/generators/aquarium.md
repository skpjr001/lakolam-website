---
title: "Aquarium"
blurb: "Aquarium — fill the tanks so the water levels match the edge counts"
category: puzzle
version: "1.1.0"
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

- **Spec knobs:** `size` (5–9), `tank_size` (rough cells per tank — where
  the build starts), `difficulty` (steers the tank size), `cell`, `line`.
- **Generation:** the grid is partitioned into tanks by seeded flood growth
  (tiny tanks absorbed into a neighbour), each tank given a random water
  level, and the row/column counts read off — kept only when the counts alone
  force a single answer.
- **Guarantees:** deterministic per seed; the water obeys gravity in every
  tank and matches its counts (checked); and an exhaustive search over the
  tanks — each contributing only a single integer of state, its level — proves
  exactly one assignment matches the counts. Rated by how many tanks there are
  to disentangle.
- **Version 1.1 — the band steers the tank size.** The rating counts tanks
  per cell, and the tank count follows the tank size, so a build that ignored
  the request served the same band whatever was asked (Medium or Hard at the
  defaults). Now the build starts at `tank_size` and, every 30 attempts that
  bring no board in the requested band, steps the size one cell toward it —
  smaller tanks for a harder band, larger for an easier one, within 3–8. The
  size used is reported as `tank_size` (and the request as
  `requested_tank_size` when it moved). At the defaults Easy, Medium, Hard and
  Expert are each served as asked; Kids, which the tank count has no band
  for, is served as Easy with `requested_difficulty`. A page whose first
  unique board already rated as asked draws that same board; the rest change
  (at the defaults, three seeds in four).
  The exhaustive count also prunes a branch once the tanks left, filled to
  the brim, could not reach a row or column count — the same count, found
  far faster (a 9×9 board of small tanks went from minutes to milliseconds).
