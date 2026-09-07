---
title: "Yin-Yang"
blurb: "Yin-Yang — two connected colours, no 2x2 all one shade"
category: puzzle
version: "1.0.0"
---
Fill every cell black or white so that all the black cells connect, all the
white cells connect, and no 2×2 square is a single colour.

## What it is

Two colours, each in one piece. Some cells are given as black or white
circles; the rest are yours to fill. The catch is the pair of rules that pull
against each other: connectivity wants big blobs, while the no-2×2 rule
forbids them — so the two colours end up as thin, interlocking regions.

## How to play

The no-2×2 rule is the workhorse: three cells of one colour in an L force the
fourth to the other colour. Then chase connectivity — a colour about to be
cut into two pieces tells you a cell must bridge it. The two rules together
usually leave only one legal shade for each cell once a few are placed.

## Purpose

The only puzzle in the catalogue built on *dual* connectivity — both colours
must each be a single region. It is a compact, elegant rule set (two
connected regions, no monochrome square) that is nonetheless NP-complete, so
it makes a satisfying solver target.

## History

Published in Japan as *Shiromaru-Kuromaru* ("white circle, black circle") and
known in the West as Yin-Yang; a favourite of the puzz.link / Penpa community
and a regular at world puzzle championships.

## This implementation

- **Spec knobs:** `size` (5–8), `difficulty`, `cell`, `line`.
- **Generation:** a valid board is built from a guaranteed-correct comb — a
  black spine down the first column with teeth along the even rows, whose
  white complement threads down the last column (both connected, no 2×2 for
  any size) — then diversified by a random walk of single-cell flips that keep
  the board valid. Given circles are trimmed from the full solution down to a
  set that still forces one answer.
- **Guarantees:** deterministic per seed; both colours connected and no 2×2
  monochrome (checked); and a backtracking search — pruning monochrome squares
  as they form, checking both regions connected at the leaves, node-budgeted —
  proves exactly one completion fits. Rated by how many circles are given.
