---
title: "Hashi (Hashiwokakero)"
blurb: "Join the islands with bridges, clued by how many each one takes"
category: puzzle
version: "1.2.0"
---
Connect the numbered islands with bridges: each island's number is how many
bridge ends it takes, and everything must join up.

## What it is

Circled numbers ("islands") on a grid. Islands are joined by horizontal or
vertical bridges — at most two between any pair, never crossing another
bridge or island. Each island's number says exactly how many bridges touch
it, and the finished network must be connected.

## How to play

Join the islands with straight bridges along rows and columns. Each island's
number is how many bridges end at it; two islands take one bridge or two
between them, never more; bridges never cross each other or pass over an
island; and in the end every island must be joined to every other.

The moves, from first to last:

- **Counting.** Compare a number with what its neighbours can still take.
  An "8" takes double bridges in all four directions; a corner "4" is fully
  forced; an island with number 2k and k neighbours takes at least one
  bridge to each. A neighbour that is already full can take nothing more.
- **Blocking.** A bridge you are sure of blocks every bridge that would
  cross it, which can leave a neighbouring island with fewer ways to go.
- **Isolation.** Never close off a group: two 1s are never joined to each
  other, two 2s never by a double bridge, and any bridge that would make a
  finished group with no way out to the rest is wrong. Turned round: a group
  of joined islands with only one way left to the rest must take it.
- **What if.** On the hardest big boards, try one bridge count on one pair
  and follow the moves above. If that leads to an impossible island, that
  count is wrong.

Draw what is forced, recount, repeat.

## Purpose

The only workspace puzzle whose answer is a *graph* rather than a colouring
or a partition — bridges, degrees, planarity. It renders beautifully sparse,
which makes it a good breather page between dense grids.

## History

Nikoli, 1989. *Hashi wo kakero* means "build bridges!". Published in English
as Hashi or Bridges; the mechanic descends from graph-realisation questions —
degree sequences made playable.

## This implementation

- **Spec knobs:** `rows`, `cols` (5–25 each), `islands` (4 up to a sixth
  of the cells; 104 on 25×25), `extra_bridges`, `difficulty`, `cell`, `line`.
  `extra_bridges` is the share (of the island count) of bridges added after
  the growth: a new pair across open water, or a second bridge on a pair
  already joined. Version 1.1 let it double existing bridges — before, the
  walk to a neighbour stopped on the bridge's own corridor, so doubling never
  happened, few new pairs could be found, and every share from 0.175 to 1.5
  gave the same board. The default page changed with it.
- **Generation:** answer first — islands are placed on the lattice, a
  connected planar multigraph (≤2 edges per pair, no crossings) is built over
  them, and each island's clue is its degree in that graph.
- **Big boards (version 1.2):** the ceiling was 16 a side; it is now 25. A
  side above 16 takes a new path (its own seed labels): the same growth, then
  the solving ladder below must settle every pair. When it stalls, a local
  search changes the bridge count on one unsettled pair (the layout kept
  legal, so two clues change) and keeps the change when the ladder leaves no
  more pairs unsettled; boards still unsettled after 80 tries are dropped.
  Boards up to 16×16 are byte-identical to 1.1; a request above 16 (clamped
  to 16 before) now gets the larger board.
- **Solving (big boards):** a sound four-rung ladder over the candidate pairs,
  each with the possible counts {0, 1, 2}: counting (an island's number
  against its neighbours' minimum and maximum), blocking (a certain bridge
  strikes the spans crossing it), isolation (a count that would close a
  satisfied group short of the whole board is struck; a group with one
  possible exit must use it), and a one-level what-if over rungs 1–3. The
  easiest rung that makes progress is always applied first.
- **Guarantees:** the degree sequence admits exactly one bridge layout. Up
  to 16×16 this is proven by a bounded search whose variables are the
  candidate pairs (0, 1 or 2 bridges each), with degree and crossing checked
  incrementally and connectivity as the final test; a search that runs out of
  budget rejects the board. Above 16 it is proven by the ladder: every rung
  only strikes counts no legal layout can use, it leaves one count on every
  pair, and that layout is then checked against every rule. Tests re-count
  big boards with the exhaustive search on a far larger budget.
- **Difficulty:** up to 16×16, forced-move ratio and degree distribution,
  banded (`rating_basis: unforced_island_share`). Above 16, the hardest rung
  the ladder needed (`rating_basis: hardest_rung`, `hardest_technique`):
  counting → Easy, blocking → Medium, isolation → Hard, what-if → Expert.
  Kids is not served on big boards (the gentlest rung is the Easy band);
  such a request gets Easy and `requested_difficulty`. A band no attempt
  reached is served as the nearest one, also with `requested_difficulty`.
