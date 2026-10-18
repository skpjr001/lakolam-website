---
title: "Crossover Grid"
blurb: "Crossover Grid — place picture cards where each meets its row and column criteria"
category: puzzle
version: "1.0.0"
---
Every card has a place: where its row and its column both agree.

## What it is

A square grid — 3×3, 4×4 or 5×5 — has a rule beside each row and above each
column: "STARS", "STRIPED", "ODD NUMBER", "DOUBLE FRAME". Below it is a set
of numbered picture cards. Each card shows one to four copies of a shape
(circle, square, triangle, diamond or star), all filled the same way
(solid, striped, dotted or empty), inside a frame (plain, double or with
round corners). Place one card in every cell so that each card meets both
its row's rule and its column's rule. On harder pages some cards are
decoys and are left over.

## How to play

Write a card's number in each cell. A card can go in a cell only if it
matches the rule of that row *and* the rule of that column, and each card is
used at most once.

- Group rules: FOUR-SIDED means squares and diamonds; POINTED means
  triangles, diamonds and stars; ODD NUMBER and EVEN NUMBER count the
  shapes on the card; PATTERNED means striped or dotted.
- Look for a cell that only one card can fill, place it, and cross that
  card off — this often leaves another cell with only one card.
- Look the other way too: a card that fits only one empty cell must go
  there.
- Decoys match a row's rule or a column's rule but never both at one cell:
  spot them early and set them aside.

## Purpose

A sorting and classification puzzle built on two attributes at once — the
grid version of "which one belongs here?" — with no general knowledge
needed. Small grids with single-value rules suit young children; 5×5 grids
with long chains of placements are a real test of bookkeeping.

## History

The crossing-criteria grid is a popular online daily format in which every
cell must be filled with something that satisfies both its row and its
column. This version replaces trivia with a deck of our own picture cards,
so every answer can be checked from the page, and makes the grid a proper
puzzle with exactly one solution.

## This implementation

- **Spec knobs:** `size` (3–5; null picks by band: Kids and Easy 3, Medium
  and Hard 4, Expert 5), `decoys` (0–8; null picks by band: 0, 1, 2, 3, 4),
  `difficulty`, `cell`, `line`.
- **Deck:** 240 cards — 5 shapes × 1–4 copies × 4 fills × 3 frames. Rules
  test one attribute: single values (16) or groups (7: four-sided, pointed,
  odd, even, 3 or more, 1 or 2, patterned). Kids and 5×5 grids use single
  values only (on 5×5 the groups are too broad for a forced order to exist).
- **Generation:** rules are drawn so every cell can be met; then cards are
  chosen in a solving order. A "cell step" gives a cell a card that fits no
  earlier cell-step cell, so at its turn the cell has only that card left; a
  "card step" gives it a card that fits no other open cell. Hard and Expert
  grow long chains (the next cell is the one waiting longest; cards that fit
  many cells still to come are preferred); Kids and Easy prefer cards that
  fit few. Decoys meet some row's or some column's rule but fit no cell (a
  decoy that fitted a cell could replace that cell's card, so the answer
  would not be unique). Cards are numbered in a shuffled order.
- **Solving:** by Kotzig's theorem a grid with exactly one assignment always
  has a cell with one card left or a card with one cell left, so the solve
  is a chain of forced placements. The ladder also knows subsets (k cells
  sharing k cards) and trials, used by the app hints.
- **Rating** (`rating_basis: "elimination_depth"`): the number of waves of
  forced placements (a wave places every card that is the only one left for
  its cell, at once). Kids = 3×3 with single-value rules; Easy ≤ 3 waves;
  Medium 4–6; Hard 7–10; Expert ≥ 11 (reached on 5×5, 12–20 waves). A grid
  deeper than asked is eased by printing cards in their cells (meta
  `given`). Small grids cannot reach the deep bands and large ones not Kids:
  served as the nearest band with `requested_difficulty`. Meta: `waves`,
  `card_side_waves`, `rows`, `columns`, `cards`, `decoys`, `answer` (card
  number per cell, row-major).
- **Guarantees:** deterministic per seed; every card in the answer meets its
  row and column rule and no card is used twice; an exhaustive perfect
  matching count (cap 2) proves exactly one assignment. Tests re-count with
  a plain row-major search against the printed rules.
- **Play API** (`play`): `puzzle(band, seed)` → `Board` (row and column
  labels, cards, answer, givens, fit masks, rung); marks are a card index
  per cell (`EMPTY` = none); `check` → misfits, repeated cards, wrong cells,
  solved; `hint` → a wrong card first, else the next forced placement from
  the current position (`only_card`, `only_cell`, or `subset` / `trial`
  when those were needed to reach it).
