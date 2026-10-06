---
title: "Theseus and the Minotaur"
blurb: "Theseus and the Minotaur — escape the maze while the Minotaur takes two steps toward you for each of yours"
category: maze
version: "1.0.0"
---
Escape the labyrinth — but every step you take, the Minotaur takes two.

## What it is

Robert Abbott's famous logic maze. Each board is a small walled grid with
Theseus, the Minotaur and one gap in the outer wall. The Minotaur is fast
but simple-minded: he always lunges toward Theseus by a fixed rule, so he can
be led into corners and trapped behind walls. A page holds several boards,
easiest first; each says how many moves its escape takes, and there is
exactly one way to escape in that many.

## How to play

You are Theseus (T). Get out through the gap marked EXIT.

1. On your turn, move one square up, down, left or right — or wait where you
   are. You cannot walk through walls.
2. Then the Minotaur (M) takes **two steps**, one after the other. For each
   step:
   - if moving left or right would bring him closer to your column, and no
     wall is in the way, he moves that way;
   - otherwise, if moving up or down would bring him closer to your row, and
     no wall is in the way, he moves that way;
   - otherwise he stays where he is for that step.
3. If the Minotaur ever lands on your square — or you step onto his — you
   lose. Stepping out through the exit wins at once, before he moves.

Escape in the number of moves shown above the board. Waiting counts as a
move. Tip: the Minotaur always tries sideways first, so a wall between you
in his row can stop him dead.

## Purpose

Thinking about an opponent's moves. The solver has to predict the
Minotaur's two steps after each of their own, and plan whole sequences that
lure him behind a wall. It is a gentle introduction to the look-ahead
reasoning of chess and of programming: a fixed rule, followed exactly,
produces behaviour you can exploit.

## History

Robert Abbott published *Theseus and the Minotaur* in *Mad Mazes* (1990),
building on the Greek myth of the hero who entered Daedalus's labyrinth on
Crete. Toby Nelson's computer version (1999) added many levels found by
computer search, and the puzzle became one of the best-known "logic mazes".
Search is the natural way to design them: the boards are tiny, but the
number of positions of the two pieces together is what makes them hard.

## This implementation

- **Spec knobs:** `difficulty` (Kids 4×4 boards escaped in 6–10 moves, Easy
  5×5 in 11–16, Medium 5×5 in 17–24, Hard 6×6 in 25–34, Expert 6×6 in
  35–50), `levels` (boards per page, 1–6), `width`, `height`, `line`.
- **Generation:** each board starts from random walls (22 % of inner edges),
  random pieces and a random exit. Local search then toggles single walls
  and occasionally moves a piece or the exit, keeping a change whose score
  does not drop. The score rewards a unique shortest escape, as long as
  possible up to the band's top, in which the Minotaur matters (the escape
  is at least three moves longer than walking straight out).
- **Solving:** breadth-first search over (Theseus, Minotaur) positions, at
  most 36 × 36 states, with five moves each, counting shortest escapes.
- **Guarantees:** every board has exactly one escape in the printed number
  of moves and none in fewer (`unique: true`). Tests re-prove it without the
  generator's search — a moves-to-escape table over every pair of positions
  by fixpoint iteration, then a depth-first count of escapes within the
  budget, capped at 2 — replay the stored escape, and check the Minotaur's
  rule on hand-made positions. Each board is rated by its escape length; the
  page carries the rating of its easiest board
  (`rating_basis: shortest_escape_moves_easiest_board`). A board that misses
  its band is returned at its honest rating. The key lists every escape as
  U, D, L, R and W (wait) in groups of five and traces Theseus's path.
