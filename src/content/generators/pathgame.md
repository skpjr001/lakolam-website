---
title: "Path Game"
blurb: "Roll-and-move board games on a winding path, with action squares and question cards, the expected game length solved exactly"
category: design
version: "1.0.0"
---
A roll-and-move board game on a winding road, with action squares, question
cards and a game length worked out exactly.

## What it is

A printable board game: a path of numbered squares winds across the page
from START to FINISH. Some squares tell you to GO ON or GO BACK a few
squares, to MISS A TURN, to ROLL AGAIN, or to JUMP along a shortcut to a
square further on. Question squares (marked ?) send you to a deck of cards —
sums, differences, times tables or sight words — printed on a second sheet,
each card with its answer upside down at the foot. The road can wind at
random, spiral into the middle, or run back and forth in rows.

## How to use it

Print the board, and the card sheet if there is one; cut the cards apart
along the dashed lines and shuffle them face down. Each player needs a
counter (a coin, a button) and you need one ordinary die.

**How to play.** Everyone starts on START. Take turns to roll the die and
move your counter that many squares along the road. If you land on a square
with words, do what it says — just once: if it moves you onto another
special square, stay there without doing that one too. MISS A TURN means you
skip your next go. ROLL AGAIN means roll and move again straight away. JUMP
TO means follow the arrow to the square it names. On a ? square, take the
top card and answer it; another player can check the answer printed upside
down. The first player to reach FINISH wins (if the board says so, you need
the exact number to land on FINISH — a bigger roll means you stay where you
are).

The line under the board says roughly how many rounds a game lasts, so you
can pick a board that fits the time you have.

## Purpose

Making and playing board games is a classroom favourite: taking turns,
counting on, reading instructions and — with the cards — practising number
facts or sight words while having fun. Families get a fresh game every
time, and teachers get a board whose length is known before the lesson.

## History

Race games on a track are among the oldest games known: the Royal Game of
Ur and senet are over four thousand years old. The spiral Game of the Goose,
with its lucky and unlucky squares, spread across Europe from the late
1500s and is the ancestor of the Victorian printed board games and of
snakes and ladders. Because the next square depends only on where you are
and the roll, such games are Markov chains, and their expected length can be
calculated exactly — a classic exercise in probability.

## This implementation

- **Spec knobs:** `squares` (20–100, START and FINISH included); `layout`
  (`winding`, `spiral`, `serpentine`); `length` (`quick`, `standard`,
  `long`); `specials` (`none`, `few`, `some`, `many`); `cards` (`none`,
  `addition` to 20, `subtraction` within 20, `times` 2–12, `sight_words`
  from the Dolch pre-primer and primer lists, `blank`); `finish`
  (`overshoot`, `exact`); `players` (2–6); `palette` (`bright`, `pastel`,
  `nature`); `title` (empty picks one from the seed); `width`, `height`.
- **Generation:** the road is a Hamiltonian path over a grid of nodes (a
  serpentine, a square spiral, or — for winding — the serpentine scrambled
  by thousands of seeded backbite moves) with every corner rounded; the
  squares are spaced evenly along it and shrunk until a separating-axis test
  shows no two squares come within the gap of each other. About one square
  in eight is a question square when cards are on; action squares are then
  placed (never next to each other, START or FINISH, and never landing on
  another special), weighted toward go-on, roll-again and shortcuts for a
  quick game and go-back and miss-a-turn for a long one. Shortcuts only join
  squares that sit close across a bend, along a line that passes no other
  square. Layouts are re-drawn (up to 300 times) until the expected length
  falls in the band: quick below 0.93 of the plain path's expected turns,
  standard 0.93–1.07, long above 1.07. With no specials the game is the
  plain path (standard), and a different request is reported as
  `requested_length`.
- **Solving:** the expected number of turns from every square solves
  `T(s) = 1 + (1/6) Σ C(s, d)` exactly by Gaussian elimination, where a
  landing costs `T(u)` after a move to `u`, `1 + T(u)` after a missed turn,
  `T(u) − 1` for an extra roll and nothing at FINISH. The turn-by-turn
  distribution gives the median and 90th-percentile game and the expected
  rounds until the first of `players` finishes (Σ S(r)^players).
- **Guarantees:** `expected_turns_checked` — the exact solve agrees with the
  survival sum of the turn-by-turn distribution to 1e-6; `path_checked` —
  no two squares overlap, every square can be landed on, and FINISH can be
  reached from every square, so every game ends; `answers_checked` — every
  card answer is re-derived from the numbers on the card, and no card
  repeats. The served `length` is the band the measured ratio falls in.
