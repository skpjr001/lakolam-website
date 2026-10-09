---
title: "Skyscrapers"
blurb: "Skyscrapers — a Latin square read from its edges by visibility counts"
category: puzzle
version: "1.2.0"
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
- Line solving sits on the ladder at `SumCombination`, the rung kakuro's combination
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

### Version 1.2 — a ladder with rungs

Version 1.1 rated every board Medium, whatever was asked for: the clue
propagator had one rung (`SumCombination`, line solving), every board needs
it, and the solver had nothing above Medium to try. Now:

- Below the line-solving rung the clue applies the three deductions a solver
  names — a 1 puts the tallest in front, an `n` makes the line climb, a clue
  `k` caps the cell `i` steps in at `n - k + 1 + i` — rated `Relation`
  (Easy). Line solving is used only when those and the Latin singles stall.
- X-Wing and Swordfish over rows and columns are on the ladder, so a board
  that needs one is rated by it (Hard, Expert).
- Clues are thinned while the ladder can finish within the requested band's
  top rung (Easy: `Relation`; Medium: hidden pair; Hard: X-Wing; Expert:
  everything), falling back to the whole ladder when the full clue set
  needs more. The rating is still what the ladder needed, cheapest rung
  first.

Measured over seeds 1–20 at 5×5: Easy requests are served Easy on 9 seeds
and Medium on 11; Medium requests Medium on all 20; Hard requests Hard on 13
and Medium on 7. Kids does not exist (every board needs its clues read,
which is Easy) and is served as Easy or Medium; Expert (a Swordfish) was not
reached and is served as Hard or Medium. The served band is recorded with
`requested_difficulty`. A Medium request draws the same page as 1.1 (its
thinning stops at the same boards; sampled 12 of 12), with `relation` now in
the metadata's technique trace; other requests change on about half their
seeds.
