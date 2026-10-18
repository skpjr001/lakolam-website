---
title: "Guilty or Innocent"
blurb: "Guilty or Innocent — mark every person in the grid from true clues about neighbours, rows and lines of sight"
category: puzzle
version: "1.0.0"
---
A grid of people, a handful of true clues, and one question for each of
them: guilty or innocent?

## What it is

A deduction puzzle on a grid of named people — each with a job and a
little portrait. A few verdicts are shown to start you off. The clues talk
about neighbours, rows and columns, jobs, and what each person can see
along their row or column: "Lena has exactly two guilty neighbours",
"Nobody above Dev is innocent", "All the guilty people in column B are
connected". Every clue is true, and exactly one set of verdicts fits them
all.

## How to play

- Every person is either guilty or innocent. Mark each one: circle G or I
  in their box.
- The grey boxes already show a verdict.
- A person's **neighbours** are the people touching their box, side by
  side or corner to corner — up to eight of them.
- "Above", "below", "to the left of" and "to the right of" mean everyone
  in that direction along the same column or row, not just the next
  person. "Between Ana and Bao" means the people in the line from one to
  the other, not counting them.
- "Connected" means the people with that verdict sit in one unbroken run
  along the row or column.
- Start with a clue that decides someone on its own: if Emeka has no
  guilty neighbours, every neighbour of Emeka is innocent.
- On harder grids, read two clues about the same people together: one may
  tell you how many are guilty, the other where they can be.
- On the hardest grids, try a verdict in your head. If following the clues
  from it breaks a clue, the other verdict is the right one.

## Purpose

A tidy, story-flavoured logic puzzle that is all reasoning and no
guessing: counting, overlapping groups and a little case analysis. The
small grids suit children who can count neighbours; the large ones make a
satisfying puzzle for adults.

## History

Grids of characters marked from clues about their neighbours became a
popular daily web puzzle in 2025, following a long line of logic puzzles
built from statements about who stands where. This is an original version
with invented names and clues.

## This implementation

- **Spec knobs:** `difficulty` (grid size and the hardest step needed),
  `width`, `height`, `margin`.
- **Generation:** names are drawn from a varied list of invented first
  names and set out alphabetically, row by row; jobs come in groups of two
  to four; each person gets a portrait (hair style, glasses, smile). A
  random verdict for everyone (30–70% guilty) and the band's revealed
  cells. Every true clue of eleven families — neighbour counts (exact or
  at least), lines of sight in four directions, row and column counts,
  odd/even, connected runs, jobs, corners, the edge, pairs, people between
  two others, and comparisons of rows or of two neighbourhoods — goes into
  a pool, drawn in weighted seeded order. Clues are added until the ladder,
  capped at the band's rung, settles everyone; then each clue is removed
  again if the ladder still settles everyone without it.
- **Solving:** a sound ladder. *Single clue*: some verdict for a person
  would make one clue impossible on its own (each clue's test is exact:
  it fails only when no completion of its people could satisfy it).
  *Two clues*: every way to satisfy two clues that share people agrees on
  someone. *What-if*: assuming a verdict, single-clue steps lead to a
  broken clue.
- **Guarantees:** deterministic per seed; every clue is true; the ladder
  settles every person from the revealed ones, and an exhaustive count
  with propagation (cap 2) finds exactly one answer. Tests re-count with a
  plain search that judges each clue from scratch only once all its people
  are decided, and check that no clue is spare. Rated by the hardest rung
  and the grid (`rating_basis: hardest_rung_and_size`): Kids 3×4 with
  single clues and three verdicts shown; Easy 4×5 with single clues; Medium
  5×5 needing two clues together; Hard 5×5 needing a what-if; Expert 5×6
  (five columns, six rows) needing a what-if. Each band was served as asked
  on 8 of 8 seeds; a page builds in under 0.35 s. A band not reached is
  reported as `requested_difficulty`. The app gets the board, a check and a
  hint that names the next step and its clues.
