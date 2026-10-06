---
title: "Snakes and Ladders"
blurb: "Snakes and ladders boards balanced by an exact Markov-chain game length"
category: design
version: "1.1.0"
---
A printable board whose game length is worked out exactly — short games for
little ones, long ones for the patient.

## What it is

A numbered board of 8x8, 10x10 or 12x12 squares, counting from the bottom
left and winding back and forth to the top, with ladders that carry you up
and snakes that send you down. Two themed packs swap the art: rockets and
black holes in space, bubbles and eels under the sea.

## How to play

Each player puts a counter beside square 1. Take turns to roll one die and
move your counter forward that many squares. If you land at the foot of a
ladder (or on a rocket, or on the smallest bubble), climb straight up to its
top. If you land on a snake's head (or in a black hole, or on an eel's
head), slide down to its tail. The first player to reach the last square
wins; the board says whether you may go past it or need the exact roll to
land on it (with the exact rule, a roll that would take you past the end is
lost and you stay where you are).

## Purpose

The first board game for many children: counting, turn-taking and losing
gracefully, with no decisions to make. A printable board is only fun if the
game ends in a sensible time, so each board is checked for its expected
length instead of being scattered by hand.

## History

Snakes and ladders comes from the ancient Indian game Moksha Patam, in which
ladders stood for virtues and snakes for vices on the way to liberation. It
reached Victorian England in the 1890s, and the United States as Chutes and
Ladders in 1943. It is also a textbook example in probability: the game is
a Markov chain, so its expected length can be calculated exactly.

## This implementation

- **Spec knobs:** `size` (8, 10 or 12), `difficulty` (game-length band),
  `theme` (`classic`, `space`, `ocean`), `rule` (`overshoot` or `exact`),
  `snakes` and `ladders` (0 picks counts from the difficulty, scaled to the
  board), `board` (width in Pt), `title` (empty uses the theme's name).
- **Generation:** snakes and ladders are placed at random under the board
  rules — no square is both a start and an end (so no chains, and no two
  share a square), no snake head on the last square, no ladder foot on
  square 1, and each spans at least one row, at most six tenths of the rows,
  and between half a row and half the board in squares — plus drawing
  rules: nothing flatter than one row per two columns, ladders never cross
  or crowd ladders, snakes never cross or crowd snakes, and nothing runs
  over another's ends. A board is kept when its expected game length,
  divided by that of the same-size empty board under the same rule, falls
  in the difficulty's band: Kids 0.55-0.80, Easy 0.80-1.00, Medium
  1.00-1.25, Hard 1.25-1.60, Expert 1.60-2.20. Up to 3,000 seeded attempts;
  if none lands in band the closest is kept and labelled with the band it
  actually reached (never observed in testing). A board takes a few
  milliseconds.
- **Solving:** the expected number of rolls from each square satisfies
  E[s] = 1 + (1/6) x (the sum of E over the six outcomes), with E = 0 on
  the last square; the system, one equation per square, is solved directly
  by Gaussian elimination rather than by simulation. The metadata carries
  `expected_rolls`, the empty-board baseline, their ratio, and every snake
  and ladder.
- **Guarantees:** deterministic per seed; the board rules hold (tested
  across every size and difficulty, and the rule check rejects each kind of
  bad board); every size and difficulty lands in its band, and mean game
  length rises with difficulty (tested); the solved expectations satisfy
  every equation and agree with 20,000 simulated games within 3%; the empty
  board matches the closed form (7/6)^(k-1) for the last six squares, and
  six rolls from the second-last square under the exact rule. Rated by
  `expected_rolls_markov_vs_empty_board`. There is no answer key: the page
  is a game board with nothing to solve.
- **Out-of-range knobs (1.1.0+):** when no board keeps the placement rules
  with the `snakes`/`ladders` counts asked for (say 128 snakes), the counts
  are cut by a quarter at a time, with up to 300 fresh attempts per round,
  until a board fits; meta then carries `requested_snakes` /
  `requested_ladders`. Boards that generated before are unchanged.

