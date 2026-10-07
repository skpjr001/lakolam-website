---
title: "Magic Snail"
blurb: "Magic Snail — A, B, C once in every row and column, reading A, B, C, A, B, C along the spiral"
category: puzzle
version: "1.0.0"
---
Fill the spiral so that A, B, C come round and round in order — and every
row and column holds each letter once.

## What it is

A square grid is wound into a snail: a spiral corridor that starts at the
top-left corner, runs clockwise around the edge and curls into the centre.
Some letters are already written in. Fill in more letters so the grid
obeys two rules at once. There is exactly one answer.

## How to play

1. Every row and every column contains each of the letters A, B and C
   exactly once (A to D on the four-letter version). The other cells stay
   blank.
2. Follow the snail from the arrow at the top-left corner, round the
   spiral, to the middle. The letters you meet must come in the order A, B,
   C, A, B, C… — always starting with A and ending with C (or D).

Mark blanks with a dot as you find them. The first letter on the snail must
be an A, and the last must be the final letter of the cycle — that alone
often places letters near the start and the centre. A letter already in
place tells you what the next letter along the snail must be, and what the
one before it was; then the row and column rules decide where those can go.

## Purpose

Easy-as-ABC with a twist: the row-and-column rule is a familiar Latin-square
idea, but the order along the spiral forces the solver to think about the
whole board as one long line. It is gentle at 5×5 and genuinely hard at 7×7
and 8×8, and it uses letters, so it sits well beside the word and number
puzzles in a mixed book.

## History

The Magic Snail (also printed as *Digital Snail* or *Schnecke*) is a
classic of the World Puzzle Championship and of German and Dutch puzzle
magazines, usually with the digits 1–3 or 1–4. The rules here follow the
standard statement: each row and column holds each symbol once, and along
the snail from the upper-left corner to the centre the symbols run 1-2-3-…
in order.

## This implementation

- **Spec knobs:** `difficulty`; `size` (grid side, 5–8; 0 = picked from
  the difficulty: 5 Kids, 6 Easy, 7 Medium, 6 Hard, 7 Expert); `letters`
  (3 or 4); `cell`; `line`. No snail exists for three letters on a 4×4 or
  for four letters below 7×7 (an exhaustive count finds none), so the side
  starts at 5 and four letters fall back to three on smaller grids; meta
  records `requested_letters`.
- **Generation:** answer first. A random filling comes from a search that
  branches on the letters in a seeded order. Letters are printed one at a
  time until the deduction ladder settles every cell, then removed again
  wherever it still does — usually leaving three to six.
- **Solving:** a yes/no engine with a variable per cell and symbol. Rungs:
  *lines* (each letter once per row and column, the right number of
  blanks), *snail order* (the letters met so far, counted round the cycle
  from both ends of the spiral, rule out every symbol no reading can
  allow), and *trial* (assume one symbol, strike it on a contradiction; one
  level deep, never a search).
- **Guarantees:** deterministic per seed. Every board settles cell by cell
  with sound rules, which proves the answer unique; tests re-prove it with
  an independent capped count that walks the snail cell by cell. Rated by
  the hardest rung needed and the size: without trial, 5×5 is Kids, 6×6
  Easy and larger Medium; with trial, up to 6×6 is Hard and larger Expert.
  Lines alone never settle a board — the snail order is always needed. A
  size that cannot reach the requested band is rated honestly at the
  nearest band, with `requested_difficulty` in meta.
