---
title: "Yagit"
blurb: "Yagit (Sheep and Wolves) — fences from edge to edge, turning only at black dots, that part sheep from wolves"
category: puzzle
version: "1.0.0"
---
Build fences from edge to edge that keep every sheep away from every wolf —
turning only at the black dots.

## What it is

A square field of cells with sheep and wolves in some of them and black
dots on some of the inner grid points. The task is to draw fences along the
grid lines so that sheep and wolves never share a field. The fences are
long and straight: they only bend where a black dot allows it.

## How to play

Draw fences along the grid lines.

- Every fence starts at the outer edge of the grid and ends at the outer
  edge. A fence never stops in the middle of the field and never forms a
  closed ring.
- A fence may turn only at a black dot. It may also run straight through a
  black dot, and not every dot has to be used.
- Fences may cross each other, or themselves, at any grid point without a
  dot — but never at a black dot.
- When you are done, every area cut out by the fences holds at least one
  animal, and never sheep and wolves together.

Good places to start: a sheep and a wolf side by side always need a fence
between them, and that fence must run on straight until it reaches a black
dot or the edge. An area with no animal in it means a fence is in the wrong
place.

## Purpose

Yagit asks for long-range reasoning: one fence decision runs right across
the grid, and every area it creates must make sense. It trains spatial
planning, thinking in straight lines, and checking that each region of a
map holds what it should.

## History

Yagit ("goats and wolves" in Japanese) appeared in Nikoli's Puzzle
Communication Nikoli (issues 123 and 125, 2008). Otto Janko's archive holds
about 240 of them, it has featured at the World Puzzle Championship, and
pzprjs plays it as "Goats and Wolves". The sheep here stand in for the
goats.

## This implementation

- **Spec knobs:** `size` (5–9; 0 picks from the difficulty — 5, 6, 7, 7, 8
  from Kids to Expert), `difficulty`, `cell` (18–90 pt), `line`
  (0.2–4 pt). Out-of-range numbers are clamped and the value asked for is
  reported in meta (`requested_size`, `requested_cell`, `requested_line`).
- **Generation:** random fences are drawn from border to border — straight
  on, crossing other fences at plain points, or turning at a fresh point
  that becomes a black dot — until the grid is cut into at least three
  regions, none larger than a quarter of it (a large region invites a spare
  fence). A few decoy dots are added, some on plain points and some where a
  fence runs straight through. Regions are coloured sheep and wolf
  alternately (fences from edge to edge always allow that), one animal goes
  into each region, and more are added, each the best of a sample at
  leaving the fewest fence segments unsettled by the deduction ladder,
  until it settles every segment; animals are then removed in random order
  (never the last of a region) while it still does.
- **Solving:** a ladder on yes/no variables, one per border between two
  neighbouring cells (a fence segment). *Local*: at every inner grid point
  the fences go straight, cross (not at a dot) or, at a dot, turn; a sheep
  and a wolf side by side need a fence between them. *Region*: segments
  joined through points whose joins are certain never close into a ring,
  cells joined across settled open borders never hold both kinds, and every
  area the still-possible fences could cut out holds an animal — each
  undecided segment is tested both ways against that. *Trial*: assume a
  segment, follow the consequences, keep the opposite on a contradiction.
- **Guarantees:** deterministic per seed; exactly one set of fences, proven
  because the sound ladder settles every segment (`uniqueness_proof`),
  confirmed by a capped exhaustive count when cheap (`count_confirmed`), and
  re-proven in tests by an independent count over the segments that floods
  the regions and traces every fence from the border. The local rung alone
  never settles a board (it cannot rule out a spare fence), so ratings rest
  on the region and trial rungs with size as the tie-break: region — Kids at
  5×5, Easy at 6×6, else Medium; trial — Hard up to 7×7, else Expert. Every
  band is reached at its default size. With a custom `size` the label
  states the band actually reached and `requested_difficulty` records the
  request: Easy and Medium at 5×5 are Kids, Kids and Medium at 6×6 are
  Easy, Kids and Easy from 7×7 are Medium, Expert up to 7×7 is Hard and
  Hard from 8×8 is Expert.
