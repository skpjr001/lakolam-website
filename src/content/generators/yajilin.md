---
title: "Yajilin"
blurb: "Yajilin — arrows count hidden shaded cells, one loop threads the rest"
category: puzzle
version: "1.1.0"
---
Grey arrows count the shaded cells they point at; a single loop threads
every cell that is neither.

## What it is

A grid scattered with grey clue cells, each carrying a number and an arrow:
that many shaded cells lie in that direction, all the way to the edge. Every
remaining cell is either shaded — no two shaded cells touch orthogonally — or
part of one closed loop through *all* the leftover cells.

## How to play

Zero-arrows clear their whole ray, and a cleared cell must carry the loop.
The loop's mechanics do most of the work: a cell with two decided loop ends
is finished, a dead-end must be shaded, and a shaded cell forces the loop
around it. The arrows and the loop tighten each other — that interplay is the
genre.

## Purpose

The most-cited Nikoli genre the catalogue was missing, and the workspace's
first *combined* puzzle: shading and loop in one answer. It reuses masyu's
search architecture (edge decisions in row bands, union-find over cycles,
proof-only pruning) with the clue logic swapped from circle shapes to ray
counts.

## History

Published by Nikoli as *Yajirin* ("arrow link"), from *yajirushi* (arrow) —
a fusion of their own Yajisan-Kazusan counting clues with the loop genres.

## This implementation

- **Spec knobs:** `size` (6–10), `clues` (share of cells printed as clues),
  `difficulty`, `cell`, `line`.
- **Generation:** solver-first. The clue cells are fixed, then the exhaustive
  search *samples* a valid configuration around them — loop and shading
  together, steered by a seeded branch preference. (Building the loop and the
  shading separately kept producing boards with slack: the rigidity of the
  genre comes from the loop threading between isolated shaded cells.) Arrows
  then report the truth about the shading, aimed at the most informative
  direction.
- **Uniqueness by monotone repair:** while a second answer exists, one shaded
  cell is converted into a clue cell and every count recomputed — each step
  keeps the sampled answer valid while strictly removing freedom, until the
  count of answers is exactly one (proven by exhaustive search) or the board
  is discarded.
- **When the request admits nothing:** a low clue share leaves the loop too
  much slack, so if no board at the requested share is unique the share is
  raised (0.10, 0.14, 0.20) and reported as `clue_share` beside
  `requested_clues`; an odd side that still finds nothing is built one
  smaller and reported as `requested_size`. Boards the request did produce
  are unchanged.
- **Guarantees:** deterministic per seed; exactly one answer, loop and
  shading both; the shipped answer is the sampled configuration, checked
  outright. Difficulty is rated by clue density, the same basis as masyu, and
  the metadata names it.

- **Version 1.1 — Easy is reachable:** the repair stops at the first unique
  board, which leaves too few clue cells for the Easy band, so Kids and
  Easy requests came back Easy or Medium by chance. An Easy (or Kids)
  request now keeps converting shaded cells into clue cells past uniqueness
  until 22% of the board is clues, re-proving uniqueness after every step
  (recomputed counts are new clues, so the count is checked, not assumed).
  Medium, Hard and Expert boards are byte-identical to 1.0. **Reachable
  bands:** Easy (10 seeds in 12 on the 8×8 default; the rest run out of
  shaded cells and are Medium) and Medium. Hard and Expert need a board
  unique with fewer than 14% (Hard) or 8% (Expert) of its cells clued, and the repair only
  ever adds clue cells: starting from sparser shares (0.08, 0.06) was
  measured and still finished Medium on every seed, so those requests are
  served as Medium (or as the nearest found) with `requested_difficulty`
  recorded. Kids has no band of its own and is served as Easy.
