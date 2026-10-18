---
title: "Battleships (Bimaru)"
blurb: "Battleships (Bimaru) — find the hidden fleet from the edge counts"
category: puzzle
version: "1.2.0"
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
one-cell moat of water, which cascades across the board. When a fleet is
printed under the grid, hide exactly those ships — tick each one off as you
find it, and the longest still missing tells you where it cannot fit.

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

- **Spec knobs:** `size` (6–15), `difficulty`, `cell`, `line`, `fleet`
  (ship lengths 1–6, up to 30 ships; empty is the classic fleet). The
  classic fleet is scaled to the board — one of the longest length, two of
  the next, and so on.
- **Version 1.2 — big boards and fleets of the puzzle's own.** The largest
  board was 10; 11–15 are new (a request above 10 was clamped to 10
  before). 11–13 sail the ten-by-ten fleet plus a five (eleven ships, 25
  cells), 14–15 a five, two fours, three threes, three twos and three ones
  (twelve ships, 31 cells). On the big boards the reveals are grown from
  none instead of trimmed from all: while two arrangements fit, a cell
  where they differ is revealed (a ship cell when the search is too open to
  finish within its budget), then each added reveal is dropped again if
  the board stays single-answer. The count there runs on bitsets and prunes
  any line that no longer has room for the cells it still needs. `fleet` hides any fleet instead (a "surprise attack": the
  solver learns the fleet from the list printed under the grid; the big
  boards print their list too). It is sorted
  longest first; a fleet whose ships and no-touch moats would fill more
  than 55% of the board is refused, as is one that cannot be hidden with a
  single answer. With `fleet` empty, requests of 6–10 are byte-identical
  to 1.1.
- **Generation:** the fleet is placed at random with its no-touch moat, the
  edge counts are read off, and then the board is resolved to a single answer
  — starting from full occupancy (a tiny forced search) and trimming revealed
  cells greedily, keeping only reveals a proof of uniqueness still needs.
- **Guarantees:** deterministic per seed; the fleet is exactly the required
  multiset, no two ships touch, and the counts match (all checked); and a
  whole-fleet backtracking solver — largest ships first, pruned by the
  remaining edge counts and the reveals — proves exactly one arrangement fits
  (a truncated search is treated as ambiguous, never as unique). Rated by how
  many cells are revealed: Easy from 18% of cells, Medium from 10%, Hard
  from 4%, Expert below that.
- **Version 1.1 — the request steers the band.** Trimming keeps only the
  reveals uniqueness needs, so before 1.1 every request got a Hard or Expert
  board. Now an easier request reveals extra cells of the one answer — ship
  segments first, then water — until the board rates as asked (Easy from
  20% of cells revealed, Medium 12%, Hard 5%). Kids is served as Easy, and an
  Expert request whose trimmed board still shows more than 4% of cells is
  served as Hard; both report `requested_difficulty`. Expert requests, and
  any request whose trimmed board already rates at or easier than asked, get
  the same board as before.
