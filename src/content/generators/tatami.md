---
title: "Tatami"
blurb: "Tatami — fill straight mats with 1 to N, every number equally often per line, equal numbers never touching"
category: puzzle
version: "1.0.0"
---
Fill straight mats with 1 to N — every number equally often in each line,
and equal numbers never side by side.

## What it is

A square grid laid with straight mats, each three (or four) cells long, like
the floor mats of a Japanese room. A few numbers are given. Every cell gets a
number, and the mats, rows and columns must all balance.

## How to play

Write a number in every cell so that:

- each mat of N cells holds the numbers 1 to N, once each;
- in every row and every column, each number appears equally often (on a
  9×9 board with mats of three, each of 1, 2 and 3 appears three times per
  row and per column);
- two equal numbers never touch along a side (touching at a corner is
  fine).

Start beside the givens: a number rules itself out of the cells next to it.
A row that already holds its share of 2s has no room for another, and when a
number has exactly as many places left in a line as it still needs, it fills
them all.

## Purpose

A balanced number-placement puzzle with a very small alphabet: with only
three numbers, every cell is a choice between a few values, and the logic
comes from counting and from the no-touching rule rather than from long
candidate lists. Good practice in tallying and in "where can this go?"
reasoning.

## History

The genre is also published as Patchwork and Nonzero. Otto Janko's
collection, which holds more than 400 of them on boards from 8×8 to 12×12,
notes that its inventor and first publication are unknown; the German
magazine Logisch has printed it regularly as Tatami. The rules used here are
Janko's: every region of N cells holds 1 to N once, every number occurs
equally often in each row and column, and equal numbers never touch
orthogonally.

## This implementation

- **Spec knobs:** `size` (6, 9 or 12 for mats of three; 8 for mats of four;
  0 picks from the difficulty — 6, 6, 9, 9, 12 from Kids to Expert, always 8
  for mats of four), `mat` (3–4), `difficulty`, `cell`, `line`. Other sizes
  snap to the nearest legal side; clamped values are reported as
  `requested_*`. A 12×12 of four-cell mats is not offered: settling it took
  minutes.
- **Generation:** a random tiling of straight mats (each open cell takes a
  horizontal or vertical mat in random order, backtracking out of dead
  ends), filled by the shared constraint engine's search from a few random
  seeds. Givens are then removed in seeded order while the ladder still
  settles the board — first with the single-cell rungs, then with the
  requested ceiling.
- **Solving:** the shared engine with three constraints — each mat holds
  1..N once (singles, pairs, triples), each line holds every number
  `size / N` times (a number with its share placed is crossed off the line;
  a number with exactly as many homes left as it needs fills them), and
  equal neighbours are forbidden — plus a **trial** rung above them: assume
  a value, follow it with the single-cell rungs, and cross it off when that
  ends in a contradiction.
- **Guarantees:** deterministic per seed; exactly one filling, proven
  because the sound ladder settles every cell, confirmed by a capped count,
  and re-proven in tests by an independent forward-checking search written
  straight from the rules. Rated by the hardest rung needed (`rating_basis:
  hardest_rung_with_size_tiebreak`): naked singles are Kids on 6×6 and Easy
  above; hidden singles Easy on 6×6 and Medium above; pairs and triples
  Medium; trial Hard up to 9×9 and Expert on 12×12. Pairs are rarely the
  hardest step — boards that outgrow singles almost always need trial — so
  Medium is reached through hidden singles on 9×9. A band a size cannot
  reach (Kids on 9×9, Expert below 12×12, Expert with mats of four) is served
  at the nearest band found and labelled as such beside
  `requested_difficulty`.
