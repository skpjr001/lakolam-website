---
title: "Paper Soccer"
blurb: "Paper Soccer — bounce the ball dot to dot and score in exactly N moves, or print a pitch for two"
category: puzzle
version: "1.0.0"
---
Bounce the ball from dot to dot and find the one way to score this turn —
or print a pitch and play a friend.

## What it is

A football pitch drawn as a grid of dots, with a small goal at each end.
The ball moves one dot at a time — straight or diagonally — and every move
draws a line. In a puzzle, a game is already under way: the lines played so
far are drawn, the ball sits at the end of them, and it is your turn. The
title says how many moves you need to score in the top goal. There is
exactly one way to do it in that many moves, and no way in fewer. The board
page is an empty pitch for two players.

## How to play

Move the ball to one of the eight dots around it, along a line that has not
been drawn yet, and draw that line. You can never move along the edge of
the pitch or the sides of a goal: they are walls.

Bounces give you another move. If the ball lands on a dot that already
touches a line (an old move, the edge of the pitch or a goal post), you move
again straight away. If it lands on a fresh, untouched dot, your turn ends.
Reach any dot inside the goal you attack to score.

Puzzle: score in the top goal in this one turn, in exactly the number of
moves the title gives. Every move except the last must land on a used dot
or the edge so that you can keep going. Draw your line from the ball and
count your moves.

Two players: the ball starts on the centre spot. Player 1 attacks the top
goal and moves first; player 2 attacks the bottom goal. Take turns, bouncing
as often as you can. You win by scoring, and also if your opponent has to
move but has no line left to draw. Use two colours of pen so you can see
whose line is whose.

## Purpose

A pencil-and-paper game that needs nothing but squared paper, played in
school breaks for generations. The puzzles turn its key skill — chaining
bounces off old lines — into a short, exact calculation: look for the dots
that let you move again, and plan a path through them into the net. The
answers can be checked at a glance.

## History

Paper soccer grew up in Polish schools, where squared exercise books made it
easy to play under the desk; its playground name means "little footballers".
It spread through Central and Eastern Europe in the second half of the
twentieth century and is now played online as well as on paper. Pitch sizes
vary from school to school: 8 by 10 squares is the common one.

## This implementation

- **Spec knobs:** `mode` (`puzzle`, the default, or `board`), `width` (even,
  6-10 cells, default 8) and `height` (even, 8-12 cells, default 10) — odd
  values round down and out-of-range ones are clamped, recorded as
  `requested_width` / `requested_height`; `difficulty`; `cell`; `line`.
- **Rules as built:** dots `x = 0..=width`, `y = 0..=height`; each goal two
  cells wide and one deep, centred on a short side. Walls are the pitch's
  edge (except the goal line between the posts) and the goals' side nets. A
  dot bounces when a wall or any drawn line touches it — every edge dot
  except the middle of each goal mouth, which is open. A **move** is one
  line, dot to neighbouring dot; a **turn** is a chain of moves ending on a
  fresh dot, in a goal, or stuck. The puzzle counts moves within one turn.
- **Generation:** seeded games are played from the centre spot — legal
  random moves, weighted 4:2:1 toward the top goal (up, across, back), never
  into a goal, between a third of the pitch's cell count and the full count
  of moves long. After every
  move that ended a turn, the position (ball in the attacking half) is tried:
  if its shortest scoring turn is unique it is a candidate, rated by its
  length. Up to 600 games are tried for the band asked; the nearest band
  found is served otherwise, with `requested_difficulty`.
- **Solving:** iterative deepening over (ball, drawn lines): for k = 1, 2, …
  every one-turn line of exactly k moves (each move legal, every move but
  the last a bounce) is counted, capped at 2, until some k scores. The
  puzzle's N is that k; it is accepted only when exactly one line of N moves
  scores. The search is exhaustive to depth N within a 400,000-node budget;
  a search that runs out of budget is unproved and never used.
- **Guarantees:** deterministic per seed; the drawn line is a legal game
  from the centre spot (replayed in tests); the shortest way to score this
  turn has exactly N moves and exactly one line of N moves scores
  (`unique`). Tests re-prove it with an independent breadth-first search over
  whole states (ball plus drawn-line set) that counts move sequences per
  state, on every band at 6×8, 8×10 and 10×12. Rated by N
  (`rating_basis: moves_in_scoring_turn`): Kids 1-2, Easy 3, Medium 4-5,
  Hard 6-7, Expert 8 or more (up to 14 searched; 8-11 seen). Every band is
  reached on every size tested. The answer key draws the scoring line in red
  and numbers its moves. Board mode is the same empty pitch for every seed
  (meta `dots` counts its points); it has no answer key.
