---
title: "Aqre"
blurb: "Aqre — shade a connected wall by region counts, never four in a row"
category: puzzle
version: "1.0.0"
---
Shade cells into one connected wall, matching each region's number — and
never let four of a colour line up.

## What it is

A square grid is divided by bold lines into regions; some regions show a
number. Shade some cells. The shaded cells must form a single group joined
side to side, a numbered region contains exactly that many shaded cells, and
no row or column may contain four or more shaded cells in a row, or four or
more unshaded cells in a row. There is exactly one solution.

## How to play

- Shade cells so that all shaded cells are connected through their sides.
- A region with a number holds exactly that many shaded cells. Regions
  without a number may hold any number.
- In every row and column, there must never be four shaded cells in a row,
  nor four unshaded cells in a row.

Start with the zeros and the full regions: a 0 leaves every cell of its
region unshaded, a number equal to the region's size shades it all. Then
watch for three in a row — the next cell along must be the other colour. Keep
the wall connected: a cell that is the only link between two shaded parts
must be shaded, and an unshaded cell can never wall a shaded group off.

## Purpose

A region-count shading puzzle in the family of `heyawake` and `norinori`,
with a rule that cuts both ways: long runs of *either* colour are forbidden,
so empty space is as constrained as shading. Its compact rules and smooth
difficulty range suit both quick fillers and longer solves.

## History

Aqre was invented by the American puzzle author Eric Fox and introduced on
Grandmaster Puzzles (GMPuzzles) in 2020, where it has since become a regular
shading genre.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty: Kids 5, Easy 6,
  Medium 7, Hard 8, Expert 9), `difficulty`, `cell`, `line`.
- **Generation:** a connected shading with no run of four of either colour is
  found by local search (flip cells, keep flips that add no faults). Regions
  of two to six cells are grown around it, leaning towards cells of the seed
  cell's colour so that many regions come out wholly shaded or wholly
  unshaded — the counts that say the most. A random carving almost never
  admits one answer even fully numbered, so the regions are then reshaped by
  local search (move a border cell into a neighbouring region, keep moves that
  leave no more cells open), measured by how many cells the solving ladder
  leaves unsettled. Finally numbers are removed while the ladder still
  settles every cell at the requested ceiling.
- **Solving:** a ladder of three sound rungs: **Basic** (region counts met or
  forced; three of a colour in a window of four forces the fourth), **Connect**
  (cells no shaded cell can reach are unshaded; a cell whose loss would split
  the shaded cells is shaded), and **Trial** (assume one cell, strike the
  assumption if Basic and Connect reach a contradiction).
- **Guarantees:** deterministic per seed. The answer obeys every rule (checked
  against the definition). Uniqueness is proven by the ladder settling every
  cell through sound inference, and re-checked by an independent exhaustive
  count (branching with counts and runs only, connectivity checked at the
  leaves, cap 2; a count that runs out of its node budget counts as
  ambiguous). Rated by the hardest rung needed and the size
  (`rating_basis: hardest_technique_and_size`): Basic is Kids on 5×5 and Easy
  above, Connect is Medium, Trial is Hard up to 8×8 and Expert above. A
  request whose band the chosen size cannot reach ships the nearest band
  found, with `requested_difficulty` recorded.
