---
title: "Link-a-Pix"
blurb: "Link-a-Pix - join equal numbers with paths that long to reveal a pixel picture"
category: puzzle
version: "1.0.0"
---
Join each pair of matching numbers with a path that many squares long — and
the painted paths reveal a pixel picture.

## What it is

A grid with numbers scattered all over it, some printed in colour and some
circled in grey. Every number is one end of a hidden path, and the number says
how long that path is, counting both ends. Every square belongs to some path.
Find them all, paint the coloured ones, and a picture appears: a cat, a
strawberry, a sailing boat.

## How to play

Join the numbers in pairs. Each pair is two equal numbers of the same colour
(or both circled), and the path between them must be exactly that many
squares long, counting the two numbered squares. Paths run up, down, left and
right, never diagonally; they never cross, visit a square twice, or pass
through another number. A 1 is a path on its own. When a path is found, paint
it in its number's colour — the key under the grid names each colour —
and leave paths with circled numbers white.

Start with the 1s and 2s, which have nowhere else to go. Then look for
numbers with only one possible partner in reach, and for squares that every
route of a number must pass through: those squares are taken, so no other
path may use them. When you are stuck, try a route in pencil and see whether
it leaves some other number with no way to reach its partner — if so, that
route is wrong.

## Purpose

A picture puzzle built from paths rather than counts. Nonograms and Fill-a-Pix
reason about rows and neighbourhoods; Link-a-Pix is about reach and routing,
the same skill as Numberlink, with the reward of a picture at the end. Short
paths make it gentle for children; long ones make it a real search.

## History

Link-a-Pix was created by Conceptis, who also publish it as Paint by Pairs;
it has appeared in puzzle magazines and apps since the early 2000s, in black
and white and in colour.

## This implementation

- **Spec knobs:** `motif` (28 pixel pictures, or `auto`), `palette`
  (`colour` clues that pairs must match, or classic `mono`), `background`
  (`white`, the default: every cell around the figure is covered by paths
  that stay white, printed as grey circled numbers, so clues fill the whole
  grid and the outline cannot be read before solving; `colour`: the sky or
  grass is painted in its own colour; `blank`: only the figure carries paths,
  easier but its outline shows), `mirror`, `difficulty`, `size` (grid side;
  0 is the picture plus a margin, about 15; at most 20), `cell`, `line`.
  Clues print as numbers in their colour on white, with a bar of the true
  colour beneath (pale colours print their number in a darker shade), and a
  colour key under the grid.
- **Generation:** the answer comes first. A vendored sprite is placed on the
  grid, every cell is given a class (its colour, or white for the paper and,
  by default, the background), and the covered cells are cut into
  single-class paths by seeded walks; the path ends get
  the numbers. Then a local search, guided by which clues the solver leaves
  unjoined: while the solver stalls, an unjoined path is split in two (a
  board of 1s is trivially unique, so this ends); then touching paths are
  merged into longer ones, rung by rung up the ladder, each merge kept only
  if the solver still joins every clue. Merging rung by rung means that once
  no merge settles with easy logic, the merges that follow need the harder
  rung — which is what lifts a board into its band.
- **Solving:** each clue keeps its candidate routes — every path of the right
  length to a same-number, same-colour clue through free unnumbered cells,
  pruned by distance (a cell is only reachable if the steps left cover the
  distance to some partner). The ladder: *single* (a 1, or a clue with one
  route left), *partner* (every route of a clue reaches the same clue, so
  that clue's routes elsewhere go), *overlap* (cells on every route of a
  clue are reserved for it), *blocking* (a route that would cut off every
  route of another clue goes), *trial* (assume a route, follow the easier
  rungs; a contradiction removes it).
- **Guarantees:** deterministic per seed; exactly one solution, because every
  deduction is sound and the ladder joins every clue — confirmed in the tests
  by an independent backtracking count (cap 2; a count that runs out of
  budget counts as ambiguous) that also checks the answer paints exactly the
  picture. The band is the rounded-up average of two measurements: the
  hardest rung needed (single 0 … trial 4) and the longest path (up to 4
  cells 0, 6 → 1, 8 → 2, 10 → 3, longer 4); each difficulty caps both. The
  trial rung is rarely needed — a merge the easier rungs cannot settle is
  usually genuinely ambiguous — so Expert boards are typically blocking-level
  logic with paths of 11–12 cells. When no cut of a picture reaches the
  requested band in 32 tries, the nearest band found is returned and labelled
  as such. Boards build in well under a second.
