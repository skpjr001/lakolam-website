---
title: "Flood Fill"
blurb: "Flood Fill — recolour the corner region, swallowing its neighbours, until one colour fills the board in N moves"
category: puzzle
version: "1.0.0"
---
Spread the colour from the top-left corner until it covers the whole board, within the move limit.

## What it is

A square board of coloured cells, each also marked with its colour's
symbol (circle, square, triangle, diamond, plus, star), so the page works
in black ink and for colour-blind solvers. The top of the page says how
many moves you may use. Every board can be filled within that limit, and
the answer key gives a shortest way.

## How to play

Start at the top-left corner, which has a bold outline. The corner cell and
every cell joined to it through cells of the same colour, side by side,
form your region.

Each move, choose a colour. Your whole region changes to that colour, and
any touching cells of that colour join the region — together with
everything joined to them. Keep choosing until the whole board is one
colour.

Write your moves in the numbered boxes, as the symbol of each colour you
choose. You win if the board is filled before the boxes run out. Look
ahead: a colour that joins a big patch now may leave a scattered colour
that costs extra moves later. If a colour touches your region everywhere it
still appears, take it — it can never be wrong.

## Purpose

A planning puzzle with one simple rule. It teaches looking ahead and
weighing a big gain now against the moves a choice saves later, and it
shows the idea of a growing region and its frontier. The symbols make it
fair to colour-blind players and printable in one ink.

## History

Flood-filling games, in which a spreading region swallows neighbours of a
chosen colour, appeared as computer games in the 2000s and spread widely as
browser and phone games. Finding the fewest moves for a board is a hard
problem for computers in general (it was shown to be NP-hard in 2010), but
boards of this size can be solved exactly.

## This implementation

- **Spec knobs:** `difficulty`; `size` 6–14 (board side; null = by band);
  `colours` 3–6 (null = by band); `slack` 0–5 (moves allowed beyond the
  fewest; null = by band); `style` `colour` (coloured cells with symbols)
  or `ink` (symbols only); `cell`, `line`. Band boards: Kids 6×6, 3
  colours, slack 3; Easy 8×8, 4, 2; Medium 10×10, 4, 1; Hard 12×12, 5, 1;
  Expert 14×14, 5, 0. Clamped knobs are reported as `requested_size`,
  `requested_colours`, `requested_slack`.
- **Generation:** every cell gets a seeded random colour (a board missing a
  colour, or solvable in fewer moves than it has colours, is redrawn). The
  band is read back from the board made: points for side (6, 8, 10, 12,
  14 → 0–4), colours (3–6 → 0–3) and slack (3+, 2, 1, 0 → 0–3); a total of
  ≤ 1 is Kids, 2–3 Easy, 4–5 Medium, 6–7 Hard, 8+ Expert
  (`rating_basis: "size_colours_slack"`). An explicit knob that moves the
  board to another band is served honestly with `requested_difficulty`.
- **Solving:** the board is contracted to its regions (≤ 196, held as a
  256-bit set) and A* (`lako_statesearch::shortest_astar`) searches sets of
  flooded regions. The lower bound is the larger of the breadth-first
  distance from the flood to its farthest region (one move floods at most
  one ring further) and the number of colours still showing (each needs a
  move); both are admissible, so the first plan found is optimal. A colour
  whose every remaining region touches the flood is played alone — wiping
  out a colour is always part of some optimal plan (flooding is monotone,
  so playing it first floods a superset at every later step, and its later
  play can be dropped). Band boards settle in 0.1 ms (Kids) to ~60 ms
  (Expert); 14×14 with six colours takes ~2.5 s. A board the
  1,500,000-node budget cannot settle is discarded, never guessed.
- **Guarantees:** deterministic per seed; `solvable: true`; `optimal_moves`
  is the proven fewest moves and `move_limit` the printed limit
  (`optimal_moves + slack`); the plan (meta `solution`, colours 1–6 in
  palette order red, blue, yellow, green, orange, purple) is replayed on the
  cells by the rule written out afresh before the page is returned. The
  answer key lists the plan as numbered swatches and numbers every cell by
  the move that floods it. Tests re-prove the optimum with an independent
  breadth-first search over whole boards (every colour playable) on small
  boards and every Kids page. Shortest plans are often not unique, so
  `unique_optimal` is not reported.
