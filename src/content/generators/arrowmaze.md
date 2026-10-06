---
title: "Arrow Maze"
blurb: "Arrow maze — no walls, only arrows: follow steps, jumps or traffic signs from IN to OUT"
category: maze
version: "1.0.0"
---
A maze with no walls at all — only arrows, and only one way through.

## What it is

A grid of squares with no walls. Every square prints the ways you are
allowed to leave it, and the task is to get from IN to OUT using only those
moves. There are three sets of rules, from first steps to a proper brain
workout:

- **Steps** — each square holds one to three arrows; move one square in the
  direction of an arrow.
- **Jumps** — each arrow has a number beside it; jump exactly that many
  squares in the arrow's direction, over anything in between.
- **Traffic** — each square is a crossroads with a small sign on each side.
  The sign you read depends on the side you drove in from, so the same
  square can send you different ways on different visits.

## How to play

Start at the square marked IN, coming in from the left. Choose one of the
arrows in your square and follow it to the next square; keep going until you
reach OUT.

- With plain arrows, move one square the way the arrow points.
- With numbered arrows, jump exactly that many squares the way the arrow
  points.
- With traffic signs, look only at the sign on the side of the square you
  just came in through. Its arrows show where you may go next: straight on,
  left or right. A short bar means there is no way on from that side. You
  can never turn back the way you came.

Some arrows lead into dead ends or loops that go round and round for ever —
if you find yourself stuck, go back to the last square where you had a
choice and try another arrow. There is exactly one route that reaches OUT.

## Purpose

Arrow mazes train directional reading (up, down, left, right — and, in the
traffic version, left and right *relative to the way you are facing*),
planning ahead and backtracking. Jumps add counting and estimation of
distance; traffic signs add keeping track of your heading, the skill behind
reading a map while walking.

## History

Arrow mazes descend from Robert Abbott's state-dependent "logic mazes" of
the 1960s–1990s (*Mad Mazes*, *SuperMazes*), where the rules of movement,
not walls, make the puzzle. His "traffic mazes" — towns of one-way streets
and turn restrictions printed as road signs — are the direct ancestor of the
expert level here, and number-jump grids are a staple of children's puzzle
books.

## This implementation

**Spec knobs:** `difficulty` (Kids 5×5 steps with at most two arrows a
square; Easy 7×7 steps; Medium 6×6 jumps of 1–2; Hard 7×7 jumps of 1–3;
Expert 5×5 traffic signs), `mode` (`auto` follows the level, or force
`steps`, `jumps`, `traffic`), `size` (0 = the level's, otherwise 4–10, with
the route length scaled to the board), `width`/`height` (page, Pt), `line`.

**Generation:** IN is a random square on the left edge, OUT one on the right.
The route is laid first as a self-avoiding random walk over the maze's
*states* — squares for steps and jumps, (square, heading) pairs for traffic —
with a length inside the level's window; a traffic route must cross at least
two squares twice. At first every route state shows only its route arrow and
every other square random arrows, so the reachable region is the route alone.
A local search then re-rolls one square (or one sign) at a time, adding
decoys on the route, and keeps a change only if the maze still satisfies the
invariant below and its reachable region did not shrink. The result is many
wrong turns, each leading into dead ends or inescapable loops.

**Solving:** the invariant, checked after every change by a forward BFS from
IN and a backward BFS from OUT: the states that are both reachable from IN
and able to reach OUT are exactly the route's states, and between them moves
only step forward along the route or loop back to an earlier point of it.
Hence the route is the only simple way to OUT and the unique shortest one,
confirmed by a layered BFS path count.

**Guarantees:** exactly one simple route from IN to OUT, and it is the
unique shortest; every move off the route enters a region from which OUT can
never be reached; every square except OUT shows one to three arrows (two at
most for Kids) and no arrow leaves the grid; traffic signs never allow a
U-turn. Difficulty is rated, not assumed: traffic is Hard or Expert, jumps
Medium or Hard, steps Kids or Easy, split by route length plus half the
number of reachable states (`rating_basis`
`rules_route_length_and_reachable_states`); a small custom board can rate
below the level asked for. Tests re-check uniqueness with an independent
method — "can still reach OUT" by fixpoint iteration, then a depth-first
count of simple routes, capped at two.
