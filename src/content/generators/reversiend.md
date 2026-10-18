---
title: "Reversi Endgames"
blurb: "Reversi endgames: find the only move that wins (or ends with the most discs), proven by an exact search to the end of the game"
category: puzzle
version: "1.0.0"
---
A reversi board near the end of the game, and only one move that wins.

## What it is

A position from a real game of reversi with a few empty squares left —
four for beginners, up to twelve for experts. One side is to play, and of
all its moves exactly one wins the game against the best defence. (As an
option, the puzzle asks instead for the only move that ends the game with
the most discs.) The answer key shows the winning move, the rest of the
game played out perfectly by both sides, and the final count.

## How to play

Reversi is played on an 8×8 board with discs that are black on one side
and white on the other. A move puts a disc of your colour on an empty
square so that one or more straight lines of the other side's discs —
across, down or diagonally — lie between the new disc and another disc of
yours. All those discs are turned over to your colour. If you have no such
move you must pass; when neither side can move, the game is over and the
side with more discs wins.

In the puzzle, the heading says who is to play. Find the one move that
wins however the other side replies: read ahead to the end of the game,
counting what each move turns over, and remember that a pass can hand
your opponent two moves in a row. Columns are lettered A to H from the
left and rows numbered 1 to 8 from the top, so the answer is named like
G2. In the answer key the winning move is ringed and every move of the
best play to the end is numbered in its square, on a small disc of the
colour that played it.

## Purpose

Endgames are where reversi is won and lost, and they are the part of the
game that can be read exactly. These puzzles train counting, looking
ahead and the value of parity and passes, from a few squares for
newcomers to a dozen for strong players.

## History

Reversi was published in London in the 1880s, with rival claims from
Lewis Waterman and John W. Mollett; the modern form, starting from four
discs in the centre, became a hugely popular commercial game in the 1970s.
Computers were solving reversi endgames perfectly decades before they did
so for chess, and endgame puzzles ("find the only winning move") are a
staple of reversi clubs.

## This implementation

- **Spec knobs:** `difficulty` (by empty squares: Kids 4, Easy 6, Medium
  8, Hard 10, Expert 12), `empties` (2-14; 0 takes the band's count; when
  set, the band is rated from it, with `requested_difficulty` when it
  differs), `goal` (`win` — the only winning move; `most_discs` — the only
  move that ends with the most discs), `side` (`either`, `black`,
  `white`), `coordinates`, `ink` (`colour`: a pale green board; `black`),
  `cell` (24-90 pt), `line`.
- **Generation:** seeded games are played from the standard start
  position (each game leaning random or greedy — most discs turned — by
  its own coin) until the empties are left; a position where the side to
  move has fewer than two moves (three from 7 empties up) is skipped. The
  position must have exactly one qualifying move. To show the other
  colour to move, the board is mirrored left to right and the colours
  swapped — the mirrored start position is the colour-swapped start, so
  the position stays reachable.
- **Solving:** an exact alpha-beta negamax to the end of the game over
  bitboards (fastest-first move ordering, passes handled, a node budget of
  6,000,000 per position; running out rejects the position). For `win`,
  each move's outcome is found by a null-window search and the scan stops
  at a second winner; then every move's exact final disc difference and
  the perfect-play line (best move, lowest square on ties) are computed.
  The final score is the plain disc count; squares still empty when
  neither side can move count for nobody.
- **Guarantees:** exactly one move wins (or ends with the most discs),
  by the exact value of every legal move; the position arose in a legal
  game from the start; the printed line is perfect play and its final
  count is in meta. Meta: `unique`, `winning_moves: 1`, `empties`,
  `depth` (the mover's own moves in the perfect-play line),
  `difficulty`, `rating_basis: "empties"`, `answer`, `value`, `final`,
  `line`, `move_values`. Tests re-prove the answer with a plain minimax on
  independent, square-by-square rules, check the bitboard rules against
  them over random games, and play the line out through the app API.
- **App:** `lako_reversiend::play` — `new_puzzle`, `legal_moves`,
  `apply_move` (forced passes applied), `move_values`, `best_move` (the
  computer's reply and the hint: perfect play, lowest square on ties),
  `judge`, `count`.
