---
title: "Arrow Escape"
blurb: "Arrow escape — tap each arrow off the board in the one order that works"
category: puzzle
version: "1.1.0"
---
Tap the arrows off the board — but only one can go at a time.

## What it is

A grid holds arrows (or long blocks with arrows on them, or bent snakes
with an arrow for a head). Each one can only slide off the board in the
direction it points, and only when nothing stands anywhere in its way
between it and the edge. Clear the board. The
puzzle is to number the pieces in the order they leave: on the standard
page exactly one piece is free at every step, so there is only one order.

## How to play

Find the piece with a clear run to the edge — there is just one — and
write 1 on it. Imagine it gone: now exactly one more piece has a clear run;
that is 2. Carry on until every piece is numbered. A piece is blocked by
anything in its line, however far away, so check the whole row or column
in front of each arrow. On a packed "free" board several pieces may be free
at once, and any order that clears the board is right.

Snakes bend, but they leave head first: the head runs straight on the way
its arrow points, all the way to the edge, and the body follows behind it
through the same squares. So a snake can go only when every square from its
head to the edge is empty — the bends of its body do not matter, but if its
own tail lies in front of its head, it is stuck. Every square a snake covers
blocks the others.

## Purpose

A paper version of a hugely popular tap-to-clear phone game. It trains
careful scanning and thinking one step ahead, and the single forced order
makes it easy to check. The long-block option gives it the feel of a
sliding-block jam; snakes make the board a tangle to read, since a bent
body can stand in many paths at once.

## History

Exit-the-board puzzles grew out of the sliding-block tradition of the
1970s and 80s; the tap-away form, where pieces fly off in their own
direction, became a mobile hit in the 2020s under many names.

## This implementation

- **Spec knobs:** `order` (`unique` or `free`), `pieces` (`arrows`, one
  cell, `long`, blocks of 2–3 cells sliding along their length, or
  `snake`, bent paths of 2–8 cells that leave head first), `difficulty`,
  `size` (4–12; 0 picks by band: snakes 5, 7, 9, 11, 12 from kids to
  expert), `snake_len` (snakes only: the longest snake, 2–8; each snake
  has between that less two, at least 2, and that many cells; 0 picks by
  band — 3 kids, 4 easy, 5 medium and hard, 4 expert; a clamped value is
  reported as `requested_snake_len`).
- **Generation:** pieces are placed in reverse of the order they leave.
  Each new piece must have a clear run to the edge past every piece already
  down, so a piece is only ever blocked by pieces placed after it — which
  leave before it — and the board can always be cleared. For `unique`,
  each new piece must also stand in the run of the piece placed just
  before; then exactly one piece is free at every step. A depth-first
  search with a node budget, preferring pieces with long clear runs, grows
  this chain to the band's length (up to 60 seeded tries). `free` grows a
  chain to set the depth and then packs the board with any piece whose run
  is clear. Snakes are grown by random walks — from a square of the
  previous piece's path (unique) or any free square — that turn with
  chance 45 % (kids), 55 % (easy) or 65 % (medium up) wherever they could
  go straight on, then given the end whose straight run to the edge is clear
  of every piece already down and of the snake's own body as its head; six
  walks per path square feed the same search. A snake leaves exactly when
  a straight piece would — its head's run is empty — so the blocking
  relation, the removal search and the count are the same for all three
  kinds.
- **Solving:** removal as a state space (the set of pieces left), counted
  by the shared state-search crate's memoised depth-first count: the number
  of valid orders, capped at 1000.
- **Guarantees:** deterministic per seed; the key's order is replayed
  before the page is returned (`solvable`, `answers_checked`). In `unique`
  mode the count is exactly 1 (`unique`, `unique_optimal`; generation fails
  rather than print otherwise) and the page is rated by its pieces — every
  one is in the forced chain: kids ≤ 6, easy 7–12, medium 13–20, hard
  21–30, expert 31+. In `free` mode `valid_orders` gives the count and the
  page is rated by the longest chain of pieces that must leave one after
  another (`longest_chain`): kids ≤ 3, easy 4–5, medium 6–8, hard 9–12,
  expert 13+. Long blocks reach an expert chain (on a 12×12) on most seeds
  only; otherwise the nearest band is served and recorded as
  `requested_difficulty`, and a clamped size as `requested_size`. Snakes
  are rated the same way. A 12×12 holds a forced chain of about 22 snakes
  of 3–5 cells, so expert snake boards take snakes of 2–4 cells and reach
  31+ on about 70 % of seeds (the rest are served as hard); every other
  snake band is reached on every seed tried (60 per band and order), most
  boards in milliseconds and an expert one in under 0.7 s. From medium up
  about nine snakes in ten bend at least once (about half at expert, where
  many are two cells); `bent_snakes`, `turns`, `longest_snake` and
  `snake_len` are in the meta of snake pages. The tests
  rebuild the blocking by moving each piece cell by cell — the head
  stepping on and the body following, like a train, which for a straight
  piece is a slide — and re-count the orders with their own search.

**Structured data:** every page carries its content as JSON beside the picture (`Generated::data`) — `cells` gives the piece (index into `pieces`) covering each square, `null` if none; each piece lists its cells tail to head and the step `[dr, dc]` it slides along (for a snake, its cells in order along the body, and the step its head runs); `order` is a removal order that clears the board (the only one when `unique`); snake pages add `"pieces_kind": "snake"`.

**Snakes** came later as a new `pieces` value and a new knob: arrow and block pages are byte-identical to before.

**Since 1.1.0:** the board panel's pale fill and its grey outline are two items — the fill in the page's background layer — so a page rendered on a transparent background keeps the board outline and drops only the fill.
