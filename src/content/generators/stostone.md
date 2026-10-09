---
title: "Sto-Stone"
blurb: "Sto-Stone — shade one stone per region, stones apart; dropped straight down they fill the bottom half"
category: puzzle
version: "1.0.0"
---
Shade one stone in every region — then let them all fall, and they must
fill the bottom half of the grid exactly.

## What it is

A square grid cut into outlined regions, some with a number, and marked
half-way down. Shade one stone in every region so that the stones never
touch across region borders, and so that if every stone dropped straight
down, the stones would fill the lower half of the grid with no gaps.

## How to play

- Shade one stone in every region: a group of cells joined side by side.
  Every region has exactly one stone, of at least one cell.
- A number in a region tells you how many cells its stone has.
- Stones in different regions never touch along a side.
- Now imagine every stone falling straight down as one solid piece, until
  it lands on the bottom edge or on another stone. When all the stones
  have landed, they must fill the bottom half of the grid exactly — every
  cell below the half-way marks shaded, every cell above it empty.

Good places to start: because stones fall straight down, every column
holds exactly as many shaded cells as half its height. A region that sits
entirely in one column, or a large number in a small region, leaves few
choices. Then check the fall: a stone resting on a narrow support can
leave a gap underneath it, which is not allowed.

## Purpose

A shading puzzle with a physical twist: the usual region logic is joined by
a picture of falling blocks, so the solver reasons about columns and about
how pieces would stack. It practises counting by columns and imagining
shapes moving.

## History

Sto-Stone (ストストーン) is a Nikoli genre, on the publisher's current list
of puzzles; Otto Janko's collection carries about a hundred of them, and the
puzz.link site can animate the fall.

## This implementation

- **Spec knobs:** `size` (6 or 8; 0 picks from the difficulty — 6, 8, 6,
  8, 8 from Kids to Expert; other values are clamped into 6–8 and rounded
  down to even), `difficulty`, `cell` (14–100 pt), `line` (0.2–4 pt;
  region borders three times as heavy, plus tick marks at the half-way
  line). Clamped values are reported as `requested_*` in the metadata.
- **Rule reading:** Janko's and the puzz.link checker's: one connected
  stone per region, stones of different regions never side by side, and
  after every stone has fallen as a rigid piece (stones never pass one
  another) the bottom half is full and the top half empty.
- **Generation (reverse drop):** the bottom half is tiled into stones of
  two to six cells, grown mostly sideways. The stones are then lifted,
  bottom ones first, by a search over heights: a stone rises at least one
  row more than every stone it rested on (so a gap opens between them),
  never past the top, and no two lifted stones share a side. Dropping such
  a lift always gives the packed half back — a stone left hanging would
  rest on a stone that is itself still lifted, down to one on the floor,
  which cannot be — and the generator checks it by simulation. A region is
  grown around each lifted stone (at most 12 cells). With every region
  numbered, white cells are moved across region borders while that leaves
  no more cells open, until the deduction ladder settles every cell; then
  numbers are removed in random order while it still does.
- **Solving:** a ladder over one yes/no variable per cell. *Region and
  columns*: each region's stone is one of its connected groups (of the
  numbered size) agreeing with what is settled, no shaded pair crosses a
  border, and every column holds exactly half its height. *Fall*: on a
  finished board, drop the stones and check the bottom half is filled.
  *Trial*: assume a cell, propagate (a trial that finishes the board runs
  the fall check), keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one shading, proven
  because the sound ladder settles every cell (meta `uniqueness_proof`),
  with a capped exhaustive count confirming it when cheap
  (`count_confirmed`), and re-proven in tests by an independent search
  over each region's stones that drops them with its own row-by-row
  simulation. Rated by the hardest rung needed with size as the tie-break:
  region and column reasoning alone is Kids at 6×6 and Easy at 8×8;
  needing the fall check or trial is Medium at 6×6 and Hard at 8×8.
  Expert is not reached — 10×10 boards were too slow to prove
  independently within the test budget — so Expert is served as Hard and
  says so in `requested_difficulty`.
