---
title: "Draughts Problems"
blurb: "Draughts problems — white to move and win, with exactly one winning first move (english, international, russian or brazilian rules)"
category: puzzle
version: "1.0.0"
---
White to move and win: find the one first move that forces the win.

## What it is

A page of draughts (checkers) positions with only a few pieces left on the
board. In each one White is to move and can force a win in the number of
moves the caption gives — and exactly one first move does it. The problems
come in four rule sets: English draughts (checkers) on the 8×8 board,
international draughts on the 10×10 board, and Russian and Brazilian
draughts on 8×8. The answer key draws the winning first move on each board
and writes out the whole winning line.

## How to play

White plays up the page, Black plays down. Pieces stand on the dark
squares and move diagonally. A man moves one square forward; when it
reaches the far row it is crowned and becomes a king (drawn with a crown).
You capture by jumping diagonally over an enemy piece to the empty square
just beyond it, and if the jumping piece can then jump again it must carry
on in the same move. Capturing is compulsory: if you can take, you must.

The rule sets differ in a few ways:

- **English:** men move and capture forward only. A king moves and jumps
  one square at a time, in any direction. When several captures are
  possible you may choose any of them, but you must finish it. A man that
  reaches the far row during a capture is crowned and its move ends there.
- **International (10×10) and Brazilian (8×8):** men also capture
  backwards. Kings fly: they move any distance along a diagonal, and capture
  a piece at any distance, landing on any empty square beyond it. You must
  make the capture that takes the most pieces. A man only becomes a king if
  its move ends on the far row.
- **Russian:** like Brazilian, but you may choose any capture, and a man
  that reaches the far row in the middle of a capture is crowned at once
  and carries on capturing as a king.

In every rule set a piece can be jumped only once in a capture, and the
pieces taken are lifted off when the move is finished. A flying king must
land where it can go on capturing, if it can.

You win when Black has no pieces left or none of them can move. "Win in 3"
means: whatever Black replies, you can win with at most three of your own
moves. Find the first move — often a quiet move, or a piece given away so
that Black is forced to capture and open the way for a big jump of your
own (a "shot"). Then play the line out against Black's best defence.

English and international boards number the dark squares from the top
left, 1 to 32 or 1 to 50, and moves are written like 11-15 (a move) or
22x15 (a capture, every landing square shown in English). Russian and
Brazilian boards use letters a–h and numbers 1–8 around the edge, and moves
are written like c3-d4 or c3:e5 (Russian) and c3xe5 (Brazilian).

## Purpose

Problems are how draughts players learn to see combinations: the forced
capture, the sacrifice that sets up a multi-jump, the king that traps a man
against the edge. Short, exact positions with one answer make them good
homework sheets for a club or a classroom, and a good way into the game for
anyone who knows the moves and wants to know more.

## History

Draughts is old: a game of men jumping men on a chequered board was played
in southern France by the twelfth century, and the 8×8 game with
compulsory capture was settled by the sixteenth. English writers were
publishing books of problems and "strokes" by the eighteenth century. The
10×10 international game grew up in the Netherlands and France in the
1700s and is now played world-wide; Russia, Brazil and many other
countries kept their own 8×8 versions with flying kings. English draughts
was solved by computer in 2007: with perfect play the starting position is
a draw — which is why the puzzles start from positions where one side has
already gone wrong.

## This implementation

- **Spec knobs:** `difficulty` (Kids … Expert), `rules` (`english`,
  `international`, `russian`, `brazilian`), `count` (1–12 problems on the
  page, default 4), `numbers` (square numbers or board coordinates),
  `cell` (square size, 12–60 pt), `line` (0.3–4 pt). Clamped values are
  reported as `requested_count`, `requested_cell`, `requested_line`.
- **Rules engine:** home-grown bitboards for 32 and 50 squares; complete
  capture generation by depth-first search over every jump sequence, with
  captured pieces staying on the board until the move ends (so no piece is
  taken twice and taken pieces block), flying kings landing on any square
  beyond, the rule that a flying king must land where the capture goes on,
  the majority rule (international, Brazilian), crowning that ends a capture
  (English), continues as a king (Russian) or only counts at the end of the
  move (international, Brazilian). Different paths that take the same
  pieces from the same start to the same end are one move.
- **Generation:** pieces are dropped into a window of the board (5–7
  squares a side, by band) — 2–4 White and 2–3 Black pieces for Kids up to
  3–5 a side for Expert, at most ten in all, kings from Medium on. A
  position is kept when it is legal (no more pieces than a side starts
  with, no man on its own crowning row) and White has at least two legal
  moves. Kids problems must begin with a capture (a choice of captures, one
  of which takes everything); Expert problems must open with a shot — a
  quiet move after which Black is forced to capture — for the first three
  quarters of the tries. Several problems on a page are never the same
  position.
- **Solving:** `lako_gametree::prove_win_in` — an AND/OR proof search with
  a transposition table and iterative deepening — first proves there is no
  win in fewer than N moves, then counts the first moves that win within N
  (stopping at two). A search that runs out of its node budget (400,000) is
  not a proof, and the position is thrown away. The main line answers every
  move with Black's longest defence.
- **Bands:** by the win depth N (`rating_basis: "win_depth"`): Kids win in
  1, Easy 2, Medium 3, Hard 4, Expert 5. A band that cannot be found in its
  tries falls back to the nearest band (reported as `requested_difficulty`);
  in testing every band was served in every rule set.
- **Guarantees:** exactly one winning first move, no shorter win, and the
  main line legal and ending with Black unable to move — re-proved in the
  tests by a plain minimax with no table and no pruning beyond "any"/"all"
  (`Problem::obeys`). Meta: `unique`, `winning_moves: 1`, `depth`,
  `difficulty`, `rules`, `shots`, `kings`, `max_pieces`, and per problem the
  pieces, the first move and the full solution in notation.
- **Play:** `lako_draughtsproblem::play` serves the app: a puzzle, the legal
  moves with full capture paths, White's move judged (won, good, mistake,
  refused) with Black's longest defence as the reply, and a hint that names
  the next move of the quickest winning line.
