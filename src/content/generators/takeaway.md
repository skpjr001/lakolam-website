---
title: "Take-Away Games"
blurb: "Take-away games — Nim, misere Nim, subtraction and Northcott endgames, each with exactly one winning move proven by game-tree search"
category: puzzle
version: "1.0.0"
---
It is your move, and exactly one move wins — find it.

## What it is

A page of four to eight endgame positions from classic two-player
take-away games: Nim, misère Nim, a subtraction game and Northcott's game.
Each position is drawn as rows of counters (or matchsticks), lettered A, B,
C…, or as a board of rows with a white and a black counter in each. You are
the player to move, and in every position exactly one move wins, whatever
your opponent does afterwards. The answer key crosses out the counters to
take, or shows the counter's slide with an arrow.

## How to play

- **Nim:** on your turn, take any number of counters (at least one) from
  one row. Whoever takes the last counter wins. The trick: write each row in
  binary (1, 2, 4, 8…) and look for a move that leaves every power of two
  used an even number of times across the rows — then whatever your opponent
  does, you can put it right again.
- **Misère Nim:** the same, but whoever takes the last counter loses. Play
  as in Nim until the move that would leave only rows of one counter; then
  leave an odd number of single counters instead.
- **Subtraction game:** take 1 to the stated number (say 3) from one row.
  With one row, leave a multiple of 4 (one more than the most you may take).
  With several rows, a row's remainder after dividing by 4 behaves like a
  Nim row of that size.
- **Northcott's game:** you are white. Slide one of your white counters
  along its row, any distance, left or right, but not onto or past the black
  counter. Whoever cannot move loses. Count the empty squares between the two
  counters in each row: those gaps play exactly like Nim rows.
- Write your answer as "take 3 from row B", or "move row B to square 4"
  (the squares are numbered along the top of the board).

## Purpose

Nim-like games are the classic first taste of game theory and of binary
numbers put to work: a position is a win or a loss, and the winning move can
be calculated rather than guessed. They are maths-club and enrichment
staples, and a good way to practise working backwards from the end of a
game. A position with exactly one winning move makes a puzzle with a single
answer.

## History

Nim is ancient in spirit but was named and completely solved by Charles
Bouton of Harvard in 1901, using binary "nim-sums". In the 1930s Roland
Sprague and Patrick Grundy showed independently that every impartial game
behaves like a Nim heap, which is why the subtraction game reduces to Nim
with remainders. Misère Nim's twist was in Bouton's paper too. Northcott's
game, a two-colour sliding game on a chequerboard, appears in Berlekamp,
Conway and Guy's *Winning Ways* (1982) as a game that is Nim in disguise
even though counters may also move backwards.

## This implementation

- **Spec knobs:** `difficulty`; `game` (`mixed`, `nim`, `misere`,
  `subtraction`, `northcott`); `max_take` (2-6, the subtraction game's limit;
  ignored by the other games); `pieces` (`counters` or `sticks`; ignored by
  Northcott's board); `count` (4-8); page `width`, `height` and `line`.
  Out-of-range numbers are clamped and reported as `requested_*` in meta.
- **Generation:** positions are drawn at random at the level's size — Kids
  two rows up to 5 (one row of 3-15 in the subtraction game, a 2-row,
  5-square board), Easy two rows up to 9 (one row of 16-30; 2 rows of 7
  squares), Medium three rows (two; 3 rows of 7), Hard four rows (three; 3
  rows of 8), Expert five rows (four; 4 rows of 7) — and kept only when
  exactly one move wins. In the subtraction game with several rows, one
  row is long (up to 30) and the others short (at most the take limit),
  since otherwise two rows can almost always answer. No position repeats
  on a page, counting reordered rows as the same.
- **Solving:** the proof is a game-tree search, not the formulas. Heap games
  are solved by a memoised search of every reachable position (sorted rows);
  Northcott's game, where counters can retreat and play can loop, by
  retrograde analysis of every position on the board for both players. A
  move wins exactly when it leaves the opponent in a lost position.
- **Guarantees:** `unique` — the search finds exactly one winning move in
  every printed position. `answers_checked` — an independent check with the
  classical theory (Bouton's nim-sum, the misère rule, Grundy values
  n mod (k + 1), the nim-sum of Northcott gaps) agrees that exactly that
  move, and no other, wins. Tests also confirm the search and the theory
  agree on every small position, that retrograde analysis leaves no drawn
  Northcott position, and that a wrong answer is caught. Rated by the size
  of the position (`rating_basis: rows_and_position_size`).
