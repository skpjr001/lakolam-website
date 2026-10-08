---
title: "Toichika"
blurb: "Toichika — one arrow per region; arrows pair off, pointing straight at each other"
category: puzzle
version: "1.0.0"
---
One arrow in every region — and every arrow points straight at a partner
that points straight back.

## What it is

A square grid divided into outlined regions, with a few arrows already
drawn. Each region gets exactly one arrow, pointing up, down, left or
right. The arrows come in pairs that face each other along a row or a
column, with nothing between them.

## How to play

- Draw exactly one arrow in every region, pointing up, down, left or right.
- Every arrow must point at another arrow in the same row or column that
  points straight back at it. These two arrows are a pair.
- No other arrow may stand between the two arrows of a pair.
- The regions of a pair must not touch along a side.
- Every arrow belongs to a pair. Arrows already drawn are given.
- There is exactly one solution.

Good places to start: an arrow can only point where a partner could stand,
so an arrow pointing at the nearby edge of the grid is impossible. A given
arrow needs a partner somewhere along its line: if only one region in that
direction can hold it, the partner is found, and every cell between the two
stays empty.

## Purpose

A spatial pairing puzzle with no numbers: it trains looking along rows and
columns, keeping track of which regions can still "see" each other, and
reasoning about what must stay empty between two partners.

## History

Toichika ("far and near") is a Nikoli genre, created by the author Gesaku
and published in Nikoli's puzzle magazine. It is collected, with many
examples, in Otto Janko's online archive of logic puzzles, and is
playable in the open-source pzprjs puzzle editor.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 9,
  10 from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line` (0.2–4
  pt). Out-of-range numbers are clamped and the requested value is
  reported in the metadata.
- **Generation:** answer first. Arrow pairs are dropped at random, each
  pair facing along a clear line (no arrow between, no arrow inside another
  pair's gap), about one pair per ten cells. One region grows round-robin
  from every arrow, never next to its partner's region, until the regions
  tile the grid (a grid that cannot be tiled is redrawn). A local search
  then moves single cells between neighbouring regions — keeping regions
  whole and partners apart — while the ladder leaves no more cells open.
  Arrows of the answer are printed where the ladder still stalls, then
  trimmed while the grid still settles; grids with the fewest printed
  arrows are preferred.
- **Solving:** a ladder on one yes/no variable per cell and direction.
  *Pairing*: one arrow per region; an arrow needs a partner facing it along
  its line with nothing between, in a region that does not border its own —
  so an arrow with no possible partner is ruled out, a placed arrow with
  one possible partner places it, and the cells before its first possible
  partner are emptied. *Trial*: assume a value, follow the consequences,
  keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every variable (meta
  `uniqueness_proof`), with a capped exhaustive count confirming it when
  cheap (`count_confirmed`), and re-proven in tests by an independent
  region-by-region search that shares no code with the ladder. Rated by
  the hardest rung needed with size as the tie-break (pairing: Kids at
  5×5, Easy at 6×6, Medium at 7×7 and 8×8, Hard from 9×9; trial: Hard up
  to 7×7, else Expert). Random layouts are rarely unique without help, so
  most grids print some arrows (typically a fifth to two fifths of them),
  and once they are printed the trial rung is seldom needed: Expert is
  reached at its default 10×10 on most seeds and otherwise served as Hard.
