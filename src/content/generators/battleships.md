---
title: "Battleships (Bimaru)"
blurb: "Battleships (Bimaru) — find the hidden fleet from the edge counts"
category: puzzle
version: "1.0.0"
---
Find the hidden fleet. The numbers count the ship cells in each row and
column; ships run straight and never touch, not even at a corner.

## What it is

A fleet is hidden in the grid — one long ship, then progressively more of the
shorter ones. Every ship is a straight run of cells, no two ships touch
(orthogonally *or* diagonally), and the numbers along the edges give the exact
count of ship cells in each row and column. A few cells are revealed to start.

## How to play

Start where a row or column count equals the water — those cells are empty —
or equals a full line. Ships pushed against the frame or against revealed
water pin down. The no-touch rule is the engine: every ship is surrounded by a
one-cell moat of water, which cascades across the board.

## Purpose

The catalogue's first *fleet-placement* genre. Every other grid puzzle here
shades single cells or carves free regions; Battleships places rigid,
multi-cell pieces that may not touch — a genuinely new mechanic, and one of
the most widely syndicated logic puzzles in the world.

## History

Solitaire Battleships derives from the pencil-and-paper game; Jaime Poniachik
introduced the solitaire deduction form in Argentina's *Humor & Juegos* in
1982, and it spread through Conceptis to newspapers worldwide as Bimaru,
Yubotu and Battleship Solitaire.

## This implementation

- **Spec knobs:** `size` (6–10), `difficulty`, `cell`, `line`. The fleet is
  scaled to the board — one of the longest length, two of the next, and so on.
- **Generation:** the fleet is placed at random with its no-touch moat, the
  edge counts are read off, and then the board is resolved to a single answer
  — starting from full occupancy (a tiny forced search) and trimming revealed
  cells greedily, keeping only reveals a proof of uniqueness still needs.
- **Guarantees:** deterministic per seed; the fleet is exactly the required
  multiset, no two ships touch, and the counts match (all checked); and a
  whole-fleet backtracking solver — largest ships first, pruned by the
  remaining edge counts and the reveals — proves exactly one arrangement fits
  (a truncated search is treated as ambiguous, never as unique). Rated by how
  many cells are revealed.
