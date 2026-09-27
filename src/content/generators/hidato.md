---
title: "Hidato"
blurb: "Hidato — number the path 1 to N, each touching the next, diagonals allowed"
category: puzzle
version: "1.0.0"
---
Fill in 1 to N so each number touches the next — across, down or diagonally.

## What it is

A grid, sometimes with a few cells blacked out, holding a scattering of
numbers. Fill every open cell so the numbers 1 to N form one unbroken path:
each number sits in one of the eight cells around the number before it. The
first and last numbers are circled and always printed.

## How to play

Count the steps. Two printed numbers five apart must be joined by a path of
five king moves, which confines every number between them to the cells within
reach of both. When a number has only one reachable cell, or a cell only one
number can reach, write it in. Harder boards need a sharper look: a number must
sit beside a possible home for the number before it *and* the number after it.
The hardest boards call for a short what-if — try a number in a cell and see
whether the chain still closes.

## Purpose

A syndicated newspaper puzzle (Daily Mail, Telegraph, Detroit Free Press) and
the print form of LinkedIn's *Zip*. It complements `numbricks`, whose path
moves only orthogonally: allowing diagonals makes the path tangle and cross
itself, so the reasoning becomes step-counting over king moves rather than
parity and corridors.

## History

Invented by the Israeli mathematician Dr. Gyora Benedek and published from
2008 as Hidato ("hidat" is Hebrew for riddle); also known as Hidoku.

## This implementation

- **Spec knobs:** `width` and `height` (3–11; 0 picks a size from the
  difficulty), `holes` (knock about one cell in twelve out of the rectangle),
  `difficulty`, `cell`, `line`.
- **Generation:** a random Hamiltonian king-move path is laid through the open
  cells by Warnsdorff's rule with backtracking; every number starts printed,
  and numbers are erased (never 1 or N) while the solver still places them
  all by inference at or below the requested difficulty.
- **Solving:** a candidate set per number and a technique ladder — *range*
  (step counts from placed numbers, plus number and cell singles), *chain*
  (a number must neighbour a candidate of its predecessor and successor),
  *pair* (two numbers sharing the same two cells own them), and *trial*
  (place, propagate, strike the cell on a contradiction).
- **Guarantees:** deterministic per seed; exactly one path, since every
  deduction is sound and the ladder places every number — confirmed in the
  tests by exhaustive counts: a plain path walk on small boards, a pruned
  branching count on large ones. Rated by the hardest technique
  needed; trial boards of 70+ numbers rate Expert, smaller ones Hard. The
  answer key traces the path.
