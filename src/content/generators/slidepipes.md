---
title: "Slide Pipes"
blurb: "Slide Pipes — slide whole rows and columns until every pipe joins one network from the source"
category: puzzle
version: "1.0.0"
---
Slide whole rows and columns of pipe tiles until every pipe joins up with the
source.

## What it is

A square grid of tiles, each carrying a piece of pipe: straights, bends,
T-pieces, crosses and dead-end taps. One tile holds the red source. Once
the network has been jumbled by sliding its rows and columns, your job is
to slide it back together. Arrows round the edge show the rows and
columns that slide, and the page says in how few slides it can be done.
Every grid can be solved, and the answer key shows a shortest solution.

## How to play

A slide moves one whole row one square left or right, or one whole column
one square up or down. The tile pushed off one end comes straight back in
at the other end, so nothing is ever lost. Tiles never turn: a bend stays
the same way round wherever it goes.

The grid is finished when every pipe end meets another pipe end, so that
water from the source could reach every tile, with no pipe left open. On
the ordinary grid no pipe may point off the edge of the board; when the
page says pipes may join across the edges, a pipe leaving one side
continues on the opposite side.

Try to finish in the number of slides on the page. The answer key draws
each slide on a small grid, with the row or column shaded and an arrow
showing the way it moves, captioned like "ROW 2 LEFT" or "COLUMN B DOWN".

## Purpose

A spatial-reasoning puzzle: every slide moves a whole line at once, so
fixing one joint can break three others, and you must picture the grid a
few slides ahead. Short solutions make it suitable for timed play and
for younger solvers on the small grids.

## History

Puzzles that rotate or shift whole rows and columns of a grid go back at
least to 1980s permutation puzzles. Connecting a pipe network from a source
by turning tiles became a classic computer puzzle in the 1990s, and a
variant in which whole rows and columns slide instead appeared in free
puzzle collections in the 2000s. This version is our own, with proven
fewest-slide answers.

## This implementation

- **Spec knobs:** `difficulty`; `rows`, `cols` 2–5 (null = by band: Kids
  and Easy 3×3, Medium and Hard 4×4, Expert 5×5); `wrap` (pipes join across
  the edges; off by default); `style` `colour` or `ink`; `cell`, `line`.
  Sizes past 5 are clamped and reported as `requested_rows`/`requested_cols`.
- **Generation:** the solved network is a random spanning tree of the grid
  (grown from the centre cell, the source, by random frontier edges, across
  the edges too when `wrap` is on), so it has no loops and no loose ends.
  It is scrambled by a seeded walk of legal slides that never steps straight
  back (Kids 1–2 slides, Easy 3–4, Medium 4–5, Hard 5–6, Expert 6–7); a
  scramble that lands on another solved layout is dropped. Up to 60 boards
  are tried for the requested band; after six searches that could not be
  settled, the nearest band found is served with `requested_difficulty`.
- **Solving:** A* (`lako_statesearch::shortest_astar`) over the tiles packed
  four bits a cell in a `u128`, with the source's cell beside them. Any
  solved layout is a goal, not only the one scrambled from (on a wrapping
  grid every shift of a solution is a solution too). The bound counts loose
  joints (a pipe end not met, or facing the edge) and divides by the most
  one slide can change, 3 × side + 1, so it never overestimates. The node
  budget is 400,000 per board; an unproved board is discarded, never
  guessed. The board chosen gets a capped breadth-first count of shortest
  solutions (150,000 nodes); `unique_optimal: true` is reported only when
  that proves the shortest solution unique.
- **Bands:** by the proven fewest slides — Kids ≤ 2, Easy 3, Medium 4,
  Hard 5, Expert 6 or more. Proofs are exact only on small boards, so the
  band sizes stop at 5×5 and Expert at 6–7 slides. Defaults (Medium, 4×4)
  take 5–25 ms; Hard 4×4 under 0.5 s; Expert 5×5 0.6–4 s.
- **Guarantees:** deterministic per seed; `solvable: true`; `optimal_moves`
  proven (`rating_basis: "optimal_moves"`); `solution` lists the slides as
  printed. The answer is replayed on a plain grid with the rules written
  out afresh (slide, then every pipe end met and every tile joined to the
  source) before the page is returned; tests re-prove the optimum for Kids
  to Hard boards, plain and wrapping, with an independent breadth-first
  search.
