---
title: "ABC Path"
blurb: "ABC Path — A to Y, each letter touching the next, guided by edge clues"
category: puzzle
version: "1.2.0"
---
Place A to Y in a 5×5 grid so every letter touches the next, guided by clues
around the edges.

## What it is

Twenty-five cells, twenty-five letters, and one rule: consecutive letters are
adjacent — orthogonally or diagonally, a king's move. A's cell is printed
inside the grid; the letters around the edges say which row or column each
one occupies.

## How to play

From A, B must be one of the eight touching cells *and* in the line its edge
clue names — usually one or two candidates. Each placement narrows the next,
and the chain propagates: knowing where a letter must be tells you where its
successor cannot be, all the way to Y.

## Why it is in the catalogue

Another shared-engine puzzle: `AllDifferent` over the grid is unchanged since
sudoku, uniqueness and thinning are the shared routines, and the new code is
the adjacency rule plus a small line-membership constraint.

## History

A modern puzzle popularised by Grandgames and Janko's collection, also
published as Letter Path and (with digits) as Number Path.

## The implementation's guarantees

- **The adjacency propagator reasons forward, not just locally.** The first
  version asked only the weak question — "can this cell hold `v`, given some
  neighbour can hold `v ± 1`" — and the ladder could not finish a board even
  with every clue printed. The rule that works is the strong one: a letter's
  successor lives in the *neighbourhood of wherever the letter could be*, so
  pinning one letter confines the next, and since the letters are a single
  thread that cascades the whole way along it.
- **Boards are over-clued, then thinned.** Giving each letter one clue (row
  or column, by coin) under-determines the path — no board was solvable. With
  both a row and a column clue per letter the full board solves at `Trivial`,
  which is the right place to start reducing from: thin from certainly
  solvable rather than hope a sparse board happens to work.
- Uniqueness and no guessing are proved on the board that ships, and the test
  additionally checks the ladder's solution *is* the generated path.
- Rating basis: `surviving_clue_count` — named honestly, because one rule
  means the ladder cannot separate boards.
- **Version 1.1 — no runaway path searches.** The random path search is a
  plain backtracking walk, and now and then it paints itself into a corner
  it can only back out of by trying hundreds of millions of orders — 20–50
  seconds for one page, the default included. A search now gives up after
  60 million steps (a few seconds) and the attempt is skipped; pages whose
  attempts all stayed under that are unchanged (192 of 200 sampled pages),
  and the slowest sampled page now takes about ten seconds. Kids and Expert,
  which the clue-count rating cannot give, also stop as soon as they hold a
  board in the nearest band it can (Easy, Hard) instead of trying all 16
  attempts — the board they would have returned anyway.
- **Version 1.2 — Easy is reachable.** Thinning runs to a minimal board,
  and a minimal board rates Medium or Hard, so an Easy or Kids request was
  served Medium after trying every attempt (seven to ten seconds a page). Such
  a request now puts thinned clues back — in a seeded order, at most three per
  line so the stack fits the margin — until the board rates Easy; extra clues
  never admit a second answer, and uniqueness is still proved on the board
  that ships. Medium, Hard and Expert pages are unchanged. The ladder is now
  Kids → Easy, Easy → Easy, Medium → Medium, Hard → Hard, Expert → Hard (the
  clue-count rating has no Kids or Expert band; `requested_difficulty` always
  records the request).
