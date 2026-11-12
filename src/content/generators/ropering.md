---
title: "Rope Ring"
blurb: "Rope Ring — move pegs between holes until no rope crosses another, in the fewest moves"
category: puzzle
version: "1.0.0"
---
Ropes are tangled across a ring of pegs: lift a peg, drop it in an empty
hole, and untangle them all in the fewest moves.

## What it is

A round wooden board with a ring of numbered holes. Coloured ropes are
stretched straight across the board, each between two pegs set in two
holes; a hole or two stays empty. One rope is gold and is nailed down. The
ropes cross each other, and the page says how many moves it takes to get
every rope clear of every other — no fewer will do, and there is only one
way to do it in that many.

## How to play

A move: lift one peg of a plain rope out of its hole and push it into an
empty hole. The rope now runs straight from its other end to the new
hole. The gold rope never moves.

Two ropes cross when one end of the second rope lies on each side of the
first: walking round the ring you meet their ends in turn, first one rope,
then the other, then the first, then the other.

You have won when no two ropes cross. On a "free the gold rope" page you
have won as soon as the gold rope crosses no other rope.

Do it in the number of moves the page gives. Write each move as two hole
numbers, "4 to 9" for "the peg in hole 4 goes to hole 9". A useful start:
count how many ropes each rope crosses, and remember that each move changes
only one rope. The answer key draws every move as a numbered arrow and
shows the ropes at the finish.

## Purpose

A tidy-up puzzle you can play with a pencil. It trains planning ahead (an
empty hole is a resource: where you leave it decides what you can do next)
and seeing order round a circle, which is the heart of when two chords
cross.

## History

Untangling puzzles go back to the knot and string puzzles of the 19th
century, and screen games of the 2010s made "untangle the ropes" a popular
genre on phones, mostly as free-form dragging. This page is our own design:
holes fixed round a ring make every position a short list of hole pairs,
so each board can be solved exactly and printed with a single answer.
Two chords of a circle cross exactly when their end points alternate round
it — the same fact behind non-crossing matchings and the Catalan numbers.

## This implementation

- **Spec knobs:** `difficulty`; `holes` (12-20; 0 = by band: 12, 13, 15,
  17, 19); `ropes` including the gold one (3-9; 0 = by band: 5, 6, 7, 8,
  9; at most (holes - 1) / 2, so a hole is always empty); `goal` `all`
  (default: no two ropes cross) or `gold` (only the gold rope must cross
  nothing; the ring is then made odd and full, one hole empty — with two
  empty holes the crossing rope's peg would have two places to go);
  `order` `unique` (default) or `free`; `radius` (120-400 pt),
  `rope` (thickness, 4-20 pt) and `line` (outline, 0.3-4 pt). Clamped
  values are reported as `requested_<field>`.
- **Generation:** a random untangled ring (a random balanced bracket word
  over randomly chosen holes, one of its longest ropes made gold) is scrambled by the
  band's number of reverse moves, then improved by local search: swap
  what two holes hold (never the gold ones), keep the change when the
  board gets no worse — nearer the target move count, then fewer shortest
  solutions. The quick filter is a depth-first count pruned by an
  admissible bound (every crossing needs one of its two ropes moved, and a
  move moves one rope, so the smallest set of non-gold ropes covering every
  crossing bounds the moves left). Up to 8 starts are tried within a node
  budget; a board at the target count is proven before it is kept. A count
  not reached is tried one lower on a smaller budget, and the served band
  is reported with `requested_difficulty`. When no board has a single
  shortest solution at all (many empty holes give a peg many equal places
  to go), a rope is added and the search repeated (`requested_ropes`).
- **Solving:** the proof is a breadth-first search in `lako_statesearch`
  (`count_shortest`, cap 2, 150,000 expanded positions at most): the
  fewest moves and the number of shortest solutions. A search that runs out
  of budget is never unique — the board is dropped. The key's move list is
  `lako_statesearch::shortest`. With `order: unique` two solutions differ
  if their move lists differ at all (moves that could be swapped count as
  different solutions). With `order: free`, moves on four different holes
  are taken as one solution in either order (they always commute): the
  search plays only the lexicographic normal form of each class (a barred
  set of moves carried with each position), so it counts classes. With one
  empty hole every move fills the hole the last one emptied and the two
  options agree; they differ when two or more holes are empty.
- **Rating:** by the proven fewest moves (`rating_basis: "optimal_moves"`):
  Kids 1, Easy 2, Medium 3, Hard 4, Expert 5. Measured reach: a single
  shortest solution of 6 moves was not found on 19 holes in thousands of
  local-search steps, so Expert is 5 moves on the largest ring. `goal:
  "gold"` is always one move: with the gold rope nailed, freeing it means
  moving one end of every rope that crosses it to the other side, and with
  two or more such ropes they can be fixed in either order — two shortest
  solutions — so only one-crossing boards are unique, served as Kids with
  `requested_difficulty`. A move count is only aimed at when the proof can
  finish it (about `b^(moves-1)` positions, `b` the moves from a position,
  within four times the proof budget): on 20 holes (two empty) Expert would
  need about a million positions per layer, so it is served as Hard, and
  Hard there comes out Hard or Medium. Few ropes aim at most ropes - 2 moves.
  Measured (6 seeds each, release build): Kids to Hard under 10 ms, Expert
  about 0.2 s (0.6 s with `order: free`), every band served as asked on the
  default rings.
- **Guarantees:** deterministic per seed; `unique: true` — exactly one
  shortest solution (per `order`); the gold rope never moves. Tests check
  every band with `obeys()`, which is independent of the generator: it
  judges crossings by segment geometry on the drawn ring, replays the key,
  rebuilds breadth-first layers with its own move rules to show nothing
  shorter works, and lists every shortest move list — one, or for `free`
  all with the key's Foata normal form. The structured data
  (`kind: "ropering"`) holds the holes (1 at the top, clockwise), each
  rope's ends at the start (id 0 gold), the empty holes, the solution's
  moves (`from`, `to`) and the ropes at the finish; a test rebuilds the
  board from it and re-checks it.
- **App:** `play` gives the board for a band and seed, the move check, the
  goal check, a shortest-plan hint ladder, and a cheap evaluation
  (crossings, gold crossings, a lower bound on the moves left) for computer
  opponents.
