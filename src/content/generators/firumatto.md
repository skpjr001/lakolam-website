---
title: "Firumatto"
blurb: "Firumatto — cut the grid into mats of length 1–4; same lengths never touch, four corners never meet"
category: puzzle
version: "1.0.0"
---
Lay the floor with straight mats one to four cells long — but no two mats
of the same length side by side, and never four corners meeting.

## What it is

A square grid with numbers in some cells. The solver divides the whole
grid into mats: straight strips one cell wide and one to four cells long.
A number gives the length of the mat it lies in, and a mat holds at most
one number. Two mats of the same length may not share a side, and no point
of the grid may be the corner of four different mats — the rule Japanese
tatami layouts follow.

## How to play

- Divide the grid into mats: straight strips, one cell wide, one, two,
  three or four cells long. A single cell is a mat of length 1.
- A number tells the length of its mat. A mat holds at most one number;
  mats without a number can be any length.
- Two mats of the same length may never touch along a side (touching at a
  corner is fine).
- No grid point may be shared by the corners of four different mats.
- There is exactly one way to lay the mats.

Good places to start: two equal numbers side by side cannot be in mats
that touch, so they must share a mat — or lie in mats running apart. A 1
is a single cell, so none of its neighbours is a single cell. At every
inner grid point, some mat must run across it: four separate corners are
forbidden.

## Purpose

A tiling puzzle with a gentle mix of counting and pattern rules. It trains
spatial planning — which way a mat can run, how far it can reach — and
attention to small local rules that add up to one answer.

## History

Firumatto ("fill mat") appeared in Puzzle Communication Nikoli No. 42
(1993) and is counted among the forerunners of Fillomino. Otto Janko's
online archive carries a collection of them.

## This implementation

- **Spec knobs:** `size` (5–10; 0 picks from the difficulty — 5, 6, 7, 8,
  9 from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped and the requested value is
  reported in the metadata.
- **Generation:** answer first. A random tiling by mats that keeps both
  rules (a backtracking fill in reading order, lengths weighted toward two
  and three), a number in every mat, then numbers are removed in a seeded
  order while the band's rung still settles the grid.
- **Solving:** a ladder on one yes/no variable per mat the numbers allow.
  *Cover*: every cell in exactly one mat, a mat in the answer rules out the
  mats of its length beside it, and at every inner grid point some mat must
  cover two of its four cells. *Blocking*: a mat that would overlap every
  mat left for some other cell goes. *Trial*: assume a mat in or out,
  propagate, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one answer, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it (`count_confirmed`), and
  re-proven in tests by an independent search that lays mats cell by cell
  from the rules alone. Searching for trial deductions over the table of
  mats is slow, so every band from Easy up is built at the blocking rung
  and the band follows the board's size (meta `rating_basis`): cover alone
  is Kids at 5×5 and Easy above; blocking is Easy at 6×6, Medium at 7×7,
  Hard at 8×8 and Expert from 9×9. With a custom `size` the band of that
  size is served and the request is reported beside it.
