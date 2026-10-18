---
title: "Drop Four: Win in N"
blurb: "Drop four — find the one column that forces four in a row within N moves"
category: puzzle
version: "1.0.0"
---
Red to play: which column forces four in a row?

## What it is

A game of four in a row with gravity, stopped in the middle. Discs drop to
the lowest free space of a column; Red and Yellow take turns; nobody has four
yet. The side to move can force a line of four, across, up or diagonally,
within N of its own moves, whatever the other side does. Exactly one column
does it, and nothing wins sooner.

## How to play

Read the prompt: it names the side to move and N, the number of that side's
moves allowed (the last one makes the four). Red discs are solid; Yellow discs
are light with a ring inside.

Find the one column to drop in. With N = 1 there is a four to finish now.
With N = 2 the drop must leave two ways to finish at once, so a single block
cannot stop both. Longer wins chain threats: every drop forces the reply, or
builds a threat on top of another so that blocking one hands over the next.
Watch the gravity: a space only counts once the space below it is filled, and
a drop right under the opponent's winning space hands them the game. The
answer key shows the winning column, the moves of both sides numbered in
order against the longest defence, and the four ringed.

## Purpose

A tactics drill for the most played gravity game: the double threat, the
forcing move and the zugzwang of the column below, on paper or in the app.
It brings the "win in N" idea of chess problems to a game children already
know.

## History

Vertical four-in-a-row games were sold from the 1970s and are now played on
every kind of board and screen. The 7 × 6 board was solved in 1988, by James
Dow Allen and independently by Victor Allis: the first player wins with
perfect play. Composed "win in N" positions are a staple of puzzle columns
and game sites.

## This implementation

- **Spec knobs:** `difficulty` (N: Kids 1, Easy 2, Medium 3, Hard 4, Expert
  5), `board` (`7x6` default, `8x7`, `9x7`), `cell`, `line`.
- **Generation:** seeded games are played out by a plausible random policy
  (block an immediate threat nine times in ten, avoid dropping under the
  opponent's winning space, lean to the centre, never complete four). Positions
  along the way are tested until one proves out as a unique win in exactly N
  for the side to move. Medium and up prefer positions with a *decoy*: another
  drop that makes a new threat of four but does not win in N (counted in meta
  as `decoys`). If a band cannot be found within 400 games the nearest band is
  served and `requested_difficulty` records the request (not seen in tests: all
  bands are found on all boards in milliseconds).
- **Solving:** bitboards (column-major, a sentinel bit per column, `u128` for
  the 9 × 7 board). The prover answers "does the side to move force four
  within n of its moves" with a transposition table and only sound pruning:
  take a win at once, a single opponent threat must be blocked (two cannot),
  never drop under an opponent's winning space, two threats at once win.
  Each query has a node budget; an overrun rejects the position, never passes
  it. The main line picks the attacker's fastest win against the reply that
  holds out longest. `rules::DropFourGame` implements the shared
  `lako_gametree::Game`, and its `prove_win_in` agrees on every band (test).
- **Guarantees:** a legal position (stacked discs, Red has as many discs as
  Yellow or one more, the side to move follows from the count, no four on
  the board); exactly one column wins within N, no column wins within N − 1
  (`winning_moves: 1`, `unique: true`, `depth`, `column` 1-based, `line`,
  `rating_basis: "win_depth"`). Every band and board is re-proved in the tests
  by a plain minimax with no table and no pruning beyond the rules.
- **App:** `play` exposes puzzles and whole games: `new_game`, `puzzle`,
  `state`, `legal_drops`, `drop`, `winning_cells`, `engine_move` (strength =
  search depth 1/3/5/7/9 plies by band, after any forced win it can prove),
  `defend` (the longest-holding reply in a puzzle) and `hint` (the next drop
  of the fastest forced win within 5, else the computer's best drop).
