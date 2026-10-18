---
title: "Five in a Row: Winning Move"
blurb: "Five in a row — find the one stone that forces five within N moves"
category: puzzle
version: "1.0.0"
---
Black to play: which one stone forces five in a row?

## What it is

A game of five in a row (gomoku, caro) stopped in the middle, on a board of
11 to 15 lines. Stones go on the crossings; Black and White take turns;
nobody has five yet and nobody has a four waiting to be finished. The side to
move can force five or more in a line, across, down or diagonally, within N of
its own stones, whatever the other side does. Exactly one stone starts the
win, and nothing wins sooner.

## How to play

Read the prompt: it names the side to move and N, the number of that side's
stones allowed (the last one makes five). Black stones are solid; White
stones are hollow rings. Letters name the columns and numbers the rows, so a
stone can be written as, say, G7.

Find the one stone. A *four* (four stones in a line with the fifth space
free) must be blocked at once; an *open three* (three that can become a four
open at both ends) must be answered soon. With N = 2 the winning stone makes
two fours at once, or a four that is open at both ends. Easier puzzles win by
fours alone: every stone you play makes a four, the reply is forced, and the
last four cannot be blocked. Harder ones need threes too, where the defender
has more answers and every one of them must fail. Watch for a reply that
blocks your four and makes a four of the defender's own: it must be answered
first. The answer key numbers the stones of both sides in order, against the
longest defence, and marks the five.

## Purpose

A tactics drill for the oldest five-in-a-row games: the forcing four, the
double threat and the threat sequence, the heart of play in gomoku and caro.
A board cropped to 11–15 lines keeps the page readable.

## History

Five in a row on a Go board is centuries old in Japan, where it was called
gomoku narabe and was played by commoners in the Edo period; caro is its
Vietnamese cousin. Free-style gomoku was shown to be a first-player win on the
15 × 15 board by Victor Allis in 1993 with threat-space search, the method of
finding wins by sequences of fours and threes that this generator's puzzles
are built on. Renju adds restrictions on Black to balance the game.

## This implementation

- **Spec knobs:** `difficulty`, `size` (11–15, default 13; outside it is
  clamped and reported as `requested_size`), `cell`, `line`.
- **Rules:** free-style: five *or more* in a line wins; Black moves first;
  no renju restrictions. The edge of the board is the edge of play.
- **Bands:** Kids: win in 2. Easy: win in 3 by fours alone (VCF). Medium: win
  in 3 needing a three (VCT), or in 4 by fours. Hard: win in 4 with threes,
  or in 5 by fours. Expert: win in 5 with threes. Meta `kind` is `vcf` when
  the winning stone starts a win by fours alone, else `vct`.
- **Generation:** seeded games are played by a plausible policy (block a
  four; otherwise one of the six best-scoring points near the stones, never
  completing five). Positions along the way, with no four on the board for
  either side, are proved; the first that is a unique win of the requested
  band is served. Otherwise the nearest band found is served with
  `requested_difficulty`.
- **Solving:** a full-width minimax over every move of both sides, kept fast
  by sound rules only: forced moves (make five; block a single four; two
  fours cannot be blocked), an exact win-in-2 test, the *pass bound* (in
  free-style five in a row an extra stone of your own never hurts, so if the
  attacker cannot win even when the defender passes, no defence loses), and
  *relevance* (within a horizon of k attacker moves, a stone outside every
  5-cell window that could still become a four or five of either side plays
  like a pass). The defender's full set of replies is searched, counter-fours
  included. A transposition table keyed by Zobrist hashes, and a node budget:
  an overrun rejects the position.
- **Guarantees:** legal stone counts, no five and no four on the board;
  exactly one stone wins within N and nothing wins within N − 1
  (`winning_moves: 1`, `unique: true`, `depth`, `stone` as "G7", `line`,
  `rating_basis: "win_depth"`). Tests re-prove Kids–Medium pages, and the
  winning stone and "no shorter win" at Hard and Expert, with a separate plain
  minimax on the cell array (no table, no counters, no pass bound, no win-in-2
  shortcut; only the relevance rule), and check that it agrees with the
  prover on positions along played games.
- **App:** `play` exposes `new_game`, `puzzle`, `state`, `play`,
  `five_cells`, `engine_move` (strength = the length of forced win it looks
  for, 1–5, and from Medium up it defends against the opponent's forced win;
  otherwise a line-counting choice), `defend` (the reply that holds out
  longest in a puzzle) and `hint` (the next stone of the fastest forced five
  within 5, else the computer's choice), plus `cell_name`.
