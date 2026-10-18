---
title: "Box Pusher"
blurb: "Box Pusher — push every crate onto a target; crates can be pushed but never pulled"
category: puzzle
version: "1.0.0"
---
Push every crate onto a target — but crates can only be pushed, never pulled.

## What it is

A walled room seen from above, with a few crates, as many targets
(diamonds on the floor) and the worker who moves them. Every room can be
finished, and the answer key gives a solution with the fewest possible
pushes. In the equation version the crates carry digits and signs, and the
targets sit in a row of tiles that must read as a true sum once every
crate is home.

## How to play

The worker walks one square at a time — up, down, left or right — over
empty floor. Walking into a crate pushes it one square the same way, but
only if the square beyond it is empty floor: a crate cannot be pushed into
a wall or into another crate, and the worker cannot pull. You have finished
when every crate stands on a target.

Think before you push. A crate pushed into a corner that is not a target
can never come out again, and two crates pushed side by side against a wall
are stuck together. Work out which crate goes to which target, and in what
order, so that no crate blocks the way for another.

The answer key lists the pushes in order by crate letter: "3. B ↑ ×2"
means "walk round to crate B and push it up two squares". Try to finish
with as few pushes as the key.

In the equation version, each crate shows a digit or a sign, and the
targets are the gaps in a row of tiles such as "7 □ 5 = 3 □". Only one way
of filling the gaps makes the sum true — so first work out which crate
belongs in which gap, then push each one into its own place. The tiles of
the row are solid, like walls.

## Purpose

A classic planning puzzle: every move is easy, but the order matters and
mistakes cannot be undone by the rules, so you learn to look ahead and to
spot dead ends before you walk into them. On paper it rewards careful
drawing of a plan. The equation version adds simple arithmetic: deciding
where each digit or sign must go before moving anything.

## History

Warehouse-keeper puzzles of this kind were made popular by a Japanese
computer game of 1982 and have been reinvented countless times since,
under many names; thousands of rooms have been designed by hand, and the
puzzle is a standard test problem for computer planning. Proving that a
room can be solved is famously hard in general, which is why small rooms
can still be fiendish.

## This implementation

- **Spec knobs:** `difficulty`; `crates` 2–5 (null = by band: Kids 2,
  Easy 2–3, Medium 3, Hard 3–4, Expert 4–5; equation mode Kids/Easy 2,
  Medium 2–3, Hard 3, Expert 3–4); `width` and `height` of the floor inside
  the walls, 5–12 (null = by band: 5, 6, 7, 8, 9; equation mode is at least
  8 wide, reported as `requested_width`); `mode` `plain` or `equation`;
  `cell`, `line`.
- **Generation:** a seeded room — the floor inside a wall border, with
  wall blocks added at random (more for harder bands) as long as the floor
  stays connected and every floor square keeps two open neighbours — and
  seeded targets on squares a crate can be pushed onto. The room is then
  searched *backwards*: breadth-first over pulls from the solved room (one
  start for each region the worker could stand in), up to 120,000
  positions. Breadth-first order makes every stored distance exact even
  when the limit stops the search, so a start is taken from the deepest
  layer the band allows (fewest crates already home, worker placed at
  random in its region). Up to 24 rooms are tried; a band no room reaches
  is served from the deepest room found and `requested_difficulty` records
  the request. In equation mode a true equation `a op b = c` (numbers up to
  99, + – × ÷, at most six symbols) is drawn, some of its symbols go on
  crates and the rest become fixed tiles; the choice is kept only when,
  over every way of sharing the crates out over the gaps, exactly one
  reading is true (either `N op N = N` or `N = N op N`, whole numbers, no
  leading zeros, exact division). Crates with the same symbol are
  interchangeable.
- **Solving:** the optimum is proved *forwards*, independently of the
  backward search, with A* (`lako_statesearch::shortest_astar`) over
  positions (crate squares, sorted within each symbol, plus the smallest
  square of the worker's region). The bound — the sum of each crate's
  fewest pushes to a target of its symbol, alone in the room — is
  admissible. Pruning is sound only: a push is dropped when it puts a crate
  on a square from which no target of its symbol can be reached even with
  the room empty (this covers corner dead squares and dead wall runs), or
  when it completes a frozen 2×2 block of walls and crates holding a crate
  off its target (none of those crates can ever move again). A forward
  answer that disagrees with the backward distance, or a search that runs
  out of its budget (2,000,000 expansions), rejects the room — never a
  guess. `count_shortest` (cap 2, 100,000 expansions) decides
  `unique_optimal` when it can; shortest push lists are almost never
  unique, because independent pushes can swap order.
- **Guarantees:** deterministic per seed; `solvable: true`; `optimal_moves`
  (= `optimal_pushes`, `move_unit: "push"`) is the proven fewest pushes,
  rated by `rating_basis: "optimal_moves"` (Kids ≤ 8, Easy 9–15, Medium
  16–24, Hard 25–34, Expert 35+); `player_moves` counts the printed route
  (fewest pushes, with a shortest walk before each — not a proven minimum
  of steps); `route` gives it in the classic notation (u r d l walk, U R D L
  push) and `pushes` lists each push as `[column, row, direction]` (0-based
  grid with the border). The route is replayed by the rules written out
  afresh before the page is returned; in equation mode the row is read
  back and checked true, with `equation` and `unique_placement: true` in
  meta. Tests re-prove the optimum with an independent 0-1 breadth-first
  search over worker steps and pushes with no pruning, check the dead-end
  tests never fire along a solution, and follow the play API's hints to
  the end. Defaults take a few milliseconds; Expert rooms up to about 3 s.
