---
title: "Mate in N"
blurb: "Mate in N — white to play and mate in 1-3 moves, one key move, proven by search"
category: puzzle
version: "1.0.0"
---
White to play and checkmate in one, two or three moves, with only one
first move that works.

## What it is

A chess problem in its classic form: a position on a diagram, White to
move, and a task such as "mate in 2". White must force checkmate in at most
that many moves against every defence Black can try. Exactly one first move
(the *key*) does it, and there is no quicker mate, so the solution is never
in doubt.

- **Mate in 1** (Kids and Easy): find the one move that checkmates. Kids
  pages have at most five men on the board; Easy pages more, with pieces
  that look useful but are not.
- **Mate in 2** (Medium): the key is a check or a capture, and Black's best
  reply still loses to a mate next move.
- **Mate in 2 with a quiet key, or mate in 3** (Hard): the first move gives
  no check and takes nothing, or the mate takes three moves.
- **Mate in 3 with a quiet key** (Expert): a three-mover whose first move
  is a calm, waiting move.

## How to play

White moves up the board. It is White's turn: find the first move that
leads to checkmate in the number of moves shown, whatever Black does.

Write your solution on the lines under the diagram: White's move, then
Black's best reply, then White's next move, until mate. Count only White's
moves: "mate in 2" means White's second move gives checkmate.

Tips: look at every check and capture first, but do not stop there; on the
harder pages the key is a quiet move that takes away Black's last escape
square or sets up a mate Black cannot stop. Once you have a candidate, try
every reply for Black, including checks and captures, and make sure each
one still loses in time. If one Black reply escapes, look again.

The solution page shows the key with an arrow and the main line: Black's
most stubborn defence and White's mating answers.

## Purpose

Chess problems train calculation: seeing every reply, not just the hoped-for
one. Short mates are the staple of chess club handouts, newspaper columns
and puzzle books; a page a day builds the habit of checking forcing moves
and the patience to look for quiet ones.

## History

Composed chess problems are older than modern chess rules: Arabic
manuscripts of the 9th century already record *mansubat*, positions with a
task. The "White to play and mate in N" form was fixed in the 19th century,
when problem columns appeared in newspapers and composers set the
standards still used today: a legal position, a single key, and no *cook*
(a second solution). The two-mover and three-mover became the most popular
lengths, and a key that neither checks nor captures came to be valued as
the hallmark of a good problem.

## This implementation

- **Spec knobs:** `difficulty`, `cell` (square size, 24–96 pt), `line`
  (board outline, 0.4–4 pt), `coordinates` (files a–h and ranks 1–8).
- **Generation:** a seeded placement: the black king drawn to the edge,
  the white king two to four squares away, a small white force (one queen
  or rook on Kids; two or three of queen, rook, bishop, knight plus up to
  three pawns otherwise) and a few black blockers. A placement is kept only
  as a legal setup: one king each, kings apart, Black not in check, White
  not in check either, no pawns on the first or last rank, at most 16 men
  and 8 pawns a side, promoted pieces covered by missing
  pawns, no castling or en-passant rights. Then it is proved; the first
  placement that rates as the requested band is served.
- **Solving:** `lako_gametree::prove_win_in` — an AND/OR search with a
  transposition table, killer moves and checks-then-captures ordering,
  over a home-grown legal move generator (`lako_gametree::chess`, verified
  by perft on the standard test positions). It first proves there is no
  mate in N−1, then counts the first moves that mate within N, capped at
  two. Each proof has a node budget of three million; a proof that runs
  out is a rejection, never a puzzle. The main line follows Black's
  longest defence and White's quickest mate after it.
- **Rating** (`rating_basis: win_depth`): mate in 1 with ≤ 5 men Kids,
  else Easy; mate in 2 with a check, capture or promotion key Medium, with
  a quiet key Hard; mate in 3 with a forcing key Hard, with a quiet key
  Expert. If a band is not found within the attempt limit (it has not
  happened in testing), the nearest band found is served and the request
  recorded as `requested_difficulty`.
- **Guarantees:** deterministic per seed; every position is a legal setup;
  exactly one first move mates within N, and none mates in fewer (meta
  `unique: true`, `winning_moves: 1`, `depth`); the line printed is legal
  and ends in checkmate. Tests re-prove all of it by plain minimax with no
  pruning and no table, on every band. Meta also carries the `key` (SAN),
  `key_uci`, `key_kind` (check / capture / promotion / quiet), the `line`
  in SAN and UCI, the `fen` and the number of `men`.
- **Speed** (test-release, 20 seeds): Kids and Easy ≈ 1 ms; Medium mean
  14 ms (worst 51 ms); Hard mean 79 ms (worst 0.3 s); Expert mean 0.37 s
  (worst 1.4 s).
- Draws by repetition, the fifty-move rule and insufficient material are
  not modelled; they never change whether a mate in three exists.
