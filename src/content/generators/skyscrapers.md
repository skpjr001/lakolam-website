---
title: "Skyscrapers"
blurb: "Skyscrapers — a Latin square read from its edges by visibility counts"
category: puzzle
version: "1.1.0"
---
Each cell holds a building 1..n tall, once per row and column; the numbers
outside say how many buildings are visible from that side.

## What it is

A Latin square read from its edges. Looking along a line, a building is
visible only if every building before it is shorter — so a clue of 1 means
the tallest stands nearest, and a clue of n means the line ascends step by
step. Everything between is deduction.

## How to play

The extremes go in first (1 and n force whole lines). After that, work out
which arrangements of a line are still consistent with what you know and its
clue: heights that appear in none of them are impossible. On the larger
boards a few heights may already be printed in the grid to start you off.

## Why it is in the catalogue

The third *one value per cell* puzzle on the shared engine, after ripple and
futoshiki: rows and columns are `AllDifferent`, uniqueness and thinning are
the shared routines, the rating is the technique ladder. The only new code is
the visibility clue.

## History

A Japanese puzzle-magazine staple (also Building, Towers, Wolkenkratzer)
popularised worldwide through Croco-Puzzle and the World Puzzle Championship,
where it is a regular round.

## The implementation's guarantees

- **The clue rule is a line solver, not rules of thumb.** The first version
  implemented the three deductions a person names first (clue 1 forces the
  tallest, clue n forces the ascent, height caps by position) and the ladder
  could not finish a single board: those prune the *extremes* and say almost
  nothing about the middle clues, which are most of a page. The propagator
  now enumerates the arrangements still consistent with the domains and
  eliminates heights absent from all of them — affordable because a line is
  at most 7 cells, pruned by domains and by running visibility.
- It sits on the ladder at `SumCombination`, the rung kakuro's combination
  reasoning uses, and for the same reason: one clue's own bookkeeping, no
  cross-referencing.
- **Uniqueness and no guessing** are proved on the board that ships, and the
  answer is checked against the rules directly (`obeys`) before any search.
- Clues are thinned while the ladder can still finish unaided — the shipped
  5×5 typically prints 8–10 of the 20 possible.
- Rating basis: `technique_ladder`.

### Version 1.1 — every size generates

The board side is 4–7 (other values are clamped). At 6 and 7 the original
generator, which builds its answer from a shuffled cyclic Latin square, finds
no board the clues pin down for most seeds — the cyclic squares' edge clues
rarely decide a unique filling — and failed outright. Only that failure path
changed: when all 20 original attempts produce nothing, up to 12 more start
from a fully random Latin square; where the edge clues alone still leave the
ladder stuck, heights are printed in the grid one at a time until it can
finish, then the givens and then the clues are thinned while it still can.
Uniqueness and the no-guessing rating are proved exactly as before. These
boards rate Medium; another band asked for is served as Medium and labelled
(`requested_difficulty`), never relabelled. An original attempt the ladder
cannot finish even with every clue printed is now skipped before thinning
(thinning could only fail), which cuts a 7×7 board from ~13 s to ~3 s.
Every board that generated before is byte-identical.
