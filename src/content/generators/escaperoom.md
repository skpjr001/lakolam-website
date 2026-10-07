---
title: "Escape Room"
blurb: "Paper escape room — four to six proven mini puzzles, each giving one symbol of the code that opens the final lock"
category: puzzle
version: "1.0.0"
---
Four to six small puzzles on one page. Every one you solve gives you one
symbol of the code that opens the final lock.

## What it is

A paper escape room. The page holds four, five or six locks, each a small
puzzle: a mini sudoku, a sujiko, a code breaker, a secret-message maze, a
missing-letter puzzle or a cryptogram. Under each lock a line says which part
of its answer is the lock's symbol: the digit in the circled square, the
second digit of the code, the fourth letter of the hidden word. Along the
bottom, the final lock has one box for each lock's symbol. Fill them all in
order and you have the code.

## How to play

Solve the locks in any order. When a lock is solved, read its symbol exactly
as the line under it says and write it in the box with the same number on the
final lock. A circled square is never one of the numbers already printed, so
you have to solve the grid to read it. Every lock has exactly one answer, so
every box has exactly one right symbol. When all the boxes are full, check
your code against the answer page. It shows each lock solved, its symbol, and
the finished code.

## Purpose

Paper escape rooms are a best seller with teachers and party hosts: a review
lesson or a game night in one sheet. Here the locks are not made up. Each one
is a page from one of the catalogue's own puzzle generators, with that
generator's proof that its answer is unique. The room adds the chain on top:
it reads every answer back from what was printed and checks it before it uses
the lock.

## History

Escape rooms began as video games (*Crimson Room*, 2004) and became
real-world rooms from 2007 (Takao Kato's *Real Escape Game* in Kyoto). Their
paper form, puzzles whose answers open combination locks or fill in a final
code, spread through classrooms ("breakout" lessons) and printable party kits
in the 2010s.

## This implementation

- **Spec knobs:** `locks` (4–6; four print two by two, five and six three
  across), `kinds` (the puzzles in order; places left empty are filled by the
  seed with kinds not yet used, never a cryptogram for Kids), `difficulty`
  (passed to every lock's generator).
- **Generation:** each lock asks its generator (through the catalogue
  registry, so it also works when the web engine is split into sections) for
  a page sized for its panel. Sudoku is 4×4 for Kids and Easy, 6×6 for Medium
  and Hard, and a Hard-rated 9×9 for Expert (an Expert 9×9 can take the sudoku generator half a minute to find). The code breaker has 3 digits for Kids and
  Easy and 4 otherwise. The maze and missing-letter locks are given a neutral
  word from a curated list. The cryptogram gets a neutral sentence, with 3, 2
  or 1 starting letters at Kids, Easy and Medium. The symbol's position is
  chosen by the seed.
- **Solving:** each lock is solved by its own generator, which proves its
  answer unique. The room reads the answer back. Sudoku and sujiko
  grids are read from the digits printed on the answer key (exactly one per
  cell, at the same positions as the page's givens) and checked against the
  rules: Latin rows and columns, or 1–9 once with the four corner sums. The
  code breaker's code is re-proved unique by brute force over every code
  against the printed clues. The maze message, hidden word and cryptogram
  letter count are checked against the generator's own report.
- **Guarantees:** every lock is unique, so every symbol is determined. A
  symbol is a pure function of that unique answer and the printed rule, and a
  circled square is never a printed given. A lock that cannot be read back
  and checked is regenerated, never used. Rated by the hardest lock as
  actually generated (`rating_basis: hardest_lock`). When that differs from
  the request, the requested band is recorded. A Kids room with a 4×4 sudoku
  may still rate Easy or Medium if a lock's generator has no Kids band.
  Deterministic per seed.
- **Where it lives:** in `lako-catalog`, beside spot the difference, because
  it uses other generators' pages; no generator crate depends on another.
