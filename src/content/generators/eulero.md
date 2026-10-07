---
title: "Eulero"
blurb: "Eulero — a letter and a number in every cell, each once per row and column, and every pair once in the grid; or the court-card version"
category: puzzle
version: "1.0.0"
---
A letter and a number in every square — and every letter-number pair exactly
once.

## What it is

A square grid in which each square holds a letter and a number, such as B3.
A few squares are filled in. Complete the rest so the three rules below hold;
there is exactly one way. A card version uses the sixteen court cards
instead: Ace, King, Queen and Jack in spades, hearts, diamonds and clubs.

## How to play

- On a grid of side 5, use the letters A to E and the numbers 1 to 5 (on a
  grid of side 4, A to D and 1 to 4, and so on).
- Each row and each column holds every letter once and every number once.
- Every letter-number pair appears exactly once in the whole grid, so if B3
  is somewhere, no other square can be B3.

In the card version, each row and column holds one Ace, one King, one Queen
and one Jack, and one card of each suit, and each of the sixteen cards is used
exactly once.

Treat the letters and the numbers as two puzzles laid on top of each other.
When a square's letter is known, any other square in the grid with that same
letter cannot take the same number. And when a pair has only one square left
where it could go, it goes there.

## Purpose

A Latin-square puzzle with a second layer: the pair rule ties the two layers
together, so a clue in one helps the other. The card version is a
centuries-old parlour puzzle that looks lovely on the page.

## History

Graeco-Latin squares are named for Leonhard Euler, who in 1782 asked whether
36 officers of six ranks and six regiments could stand in a 6×6 square with
every rank and regiment once in each row and column. He suspected not;
Gaston Tarry proved it in 1901, and in 1959 Bose, Shrikhande and Parker
showed that 6 is the only size above 2 with no solution. The court-card
puzzle is older still: Jacques Ozanam printed it in his *Récréations
mathématiques* in 1725. As a pencil puzzle with given pairs it is "Eulero" in
Otto Janko's collection.

## This implementation

- **Spec knobs:** `difficulty`, `size` (0 = by level: Kids 4, Easy 5,
  Medium and up 7; otherwise 3–7, with 6 served as 5 because no solution
  exists), `symbols` (`letters` or `cards` — cards are always 4×4), `cell`,
  `line`.
- **Generation:** answer-first. Two orthogonal Latin squares come from
  `a·row + column` and `b·row + column` with distinct non-zero `a`, `b` over
  the field of that order (integers mod 3, 5 or 7, or GF(4) for side 4); rows,
  columns and each layer's symbols are shuffled and the square may be
  transposed. Given pairs are removed one at a time while the technique ladder
  at the requested ceiling still finishes the board; up to 48 boards are tried
  for one rated in the requested band.
- **Solving:** the shared constraint engine — a Latin layer each for letters
  and numbers (all-different per row and column, plus X-Wing and Swordfish,
  which are sound on a Latin square) and a pair rule that removes a placed
  pair from every other square (elimination) and places a pair that has only
  one possible square left (a hidden single).
- **Guarantees:** deterministic per seed; the ladder settles every square
  without guessing, which proves the answer unique, and the engine's capped
  count agrees. Tests re-prove uniqueness with an independent cell-by-cell
  search and check every rule from the values alone. Rated by the hardest
  technique the solve needed (`rating_basis: technique_ladder`). With the
  level sizes every band is reached (Expert needs a Swordfish; a few Expert
  requests come out Hard and say so in `requested_difficulty`). A 3×3 or
  4×4 board, and so the card version, can only be Kids or Easy — the nearest
  band is served.
