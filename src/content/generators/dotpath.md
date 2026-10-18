---
title: "Dot Path"
blurb: "Dot Path — one path from START through every dot to END, no numbers"
category: puzzle
version: "1.0.0"
---
Start at S, visit every dot exactly once, and finish at E.

## What it is

A lattice of dots with a few gaps. The start dot S and the end dot E are
marked. The answer is a single path from S to E that moves between
neighbouring dots — up, down, left or right, never diagonally — and passes
through every dot exactly once. There are no numbers: the gaps and the two
ends are the only clues, and they allow exactly one path.

## How to play

Draw the path from S, one dot to the next, until every dot is used and you
arrive at E.

- **Dots with only two neighbours** (in a corner, against the edge, next to
  gaps) must be passed straight through those two neighbours: draw both
  lines at once.
- **Do not strand a dot.** If a step would leave a dot with only one way in,
  that dot would become a dead end — only E may be a dead end.
- **Do not cut the board in two.** If a step splits the dots you have not
  visited into two groups, you cannot reach them all.
- **Count the colours.** Think of the dots as a chessboard: every step goes
  from a light square to a dark one or back. If one colour has too many dots
  left, the path cannot alternate through them all.
- Work from both ends: E is fixed too, so the dots around E are often forced.

## Purpose

A pure, numberless path puzzle — the gentlest start in the path family, with
a single rule a young child can follow and a real chase on the large boards.
It trains planning ahead and spotting dead ends.

## History

Paths that visit every point of a network exactly once are Hamiltonian paths,
named after William Rowan Hamilton's Icosian game (1857). "Connect every dot
in one line" puzzles with fixed ends are a staple of puzzle apps and activity
books.

## This implementation

- **Spec knobs:** `difficulty`; `rows`, `cols` (lattice sides, 4–14; 0 picks
  the band's lattice: Kids 5×6, Easy 7×7, Medium 8×10, Hard 11×12, Expert
  12×14; a changed request is reported as `requested_rows` /
  `requested_cols`); `cell`, `line`.
- **Generation:** a path that always exists, changed until it is the only
  one. A snake through the whole lattice is mixed by random backbites (an end
  jumps to a neighbouring dot of the path and the loop it closes is
  reversed — still a path through every dot), at both ends. Then, while a
  second path from S to E exists, a dot where it leaves ours is chosen, the
  nearer end of our path walks towards it by backbites, and a gap is made
  there: the dot after one of the end's path neighbours is removed and the
  path re-joined around it, so the path still visits every dot that is left.
  At most 27% of the lattice becomes gaps (the first three quarters of them
  at random places, before any count could finish); past that an end grows
  back into a gap or backbites at random. Up to twelve starts are tried,
  within a fixed search budget (10 million count nodes in all). If none gives
  a board with a single path, the next smaller band lattice is tried (3
  million nodes each); the page is rated by the dots it really has and the
  request reported as `requested_difficulty`. On seeds 0–20 an Expert
  request is served as Expert (123 dots) on 12 seeds, Hard (97) on 8 and
  Medium (59) on 1, in at most about 5.5 s. As a last resort a comb (every
  other row full, joined at alternate ends: one chain of dots, so trivially
  unique) is served, so a valid spec never fails. Dots served by band at the
  default lattices: Kids about 24, Easy 36–39, Medium 59–61, Hard 97–101,
  Expert 123.
- **Solving:** an exhaustive depth-first count from S with cap 2 and sound
  prunings at every step: every unvisited dot but E needs two ways in and E
  one, a dot beside the head with exactly two must be next, every unvisited
  dot must stay reachable from E, and the chessboard colours left must
  alternate to finish on E's colour. A count that runs out of its 400,000-node
  budget is ambiguous, never unique.
- **Guarantees:** deterministic per seed; the answer runs from S to E through
  every dot once (checked) and the count proves it is the only one (`proof:
  exhaustive_count_cap_2`). Tests re-count Kids boards with a plain search
  without prunings, and check the pruned count against it on gap-free
  lattices with many paths. Rated by the number of dots (`rating_basis:
  dots`): up to 32 Kids, up to 56 Easy, up to 90 Medium, up to 120 Hard, more
  Expert. A band a board does not reach is served as the nearest with
  `requested_difficulty`.
- **Meta:** `dots`, `holes`, `rows`, `cols`, `search_nodes`.
- **Play API** (`play`): `puzzle`, `puzzle_from`, `check` (legal so far,
  solved, steps on track) and `hint` (the next dot, named `forced` when every
  other step breaks a pruning rule, else `path`; or how far to undo).
