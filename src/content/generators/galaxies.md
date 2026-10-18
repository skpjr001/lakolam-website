---
title: "Spiral Galaxies"
blurb: "Spiral Galaxies — partition into whirls, each symmetric about its dot"
category: puzzle
version: "1.2.0"
---
Divide the whole board into whirls, one around each dot — every whirl looks
identical turned 180° about its own dot.

## What it is

The board is covered by galaxies. Each galaxy contains exactly one dot, and
is point-symmetric about it: rotate the galaxy half a turn around its dot and
it maps onto itself. A dot can sit at a cell's centre, on the line between two
cells, or at a corner where four meet. The dots are the only clue.

## How to play

Start from the dots. Each galaxy must at least cover the cells its dot
touches, and every cell it claims drags in the cell diametrically opposite.
Work outward with these moves, easiest first:

- **Mirror.** A cell can join a dot only if its opposite cell is on the
  board and free to join too. Every border you draw beside a dot has a
  mirror-image border on the far side of the dot. When a cell has only one
  dot left that could own it, it is settled — and so is its mirror.
- **Captured cells.** A galaxy is one piece, so it can only reach a cell
  along cells it could own. A cell walled off from every dot but one is
  captured by that dot.
- **Bridges.** If every route from a dot to one of its settled cells must
  pass through a certain cell, that cell belongs to the galaxy too.
- **What if.** On the big boards, suppose a cell joins a dot and follow the
  moves above; if that runs into a cell no dot can own, or a galaxy cut in
  two, the cell belongs elsewhere.

The board fills as a jigsaw of pinwheels.

**Picture boards.** Some boards have two kinds of dots: dark (or coloured)
and white. The rules are the same — and when the board is divided, shade
every galaxy whose dot is dark (in its dot's colour) and a picture appears,
mirror-symmetric left to right. Each galaxy is wholly one colour, so the
picture's outline always runs along galaxy borders.

## Purpose

The one puzzle in the catalogue whose generation is *native* to the engine.
`lako-geom` already computes rotational symmetry for the mandalas, and a
galaxy is a C₂-symmetric region under exactly that idea — so Spiral Galaxies
is the design lane and the puzzle lane meeting in the middle.

## History

Published by Nikoli as *Tentai Show* ("astronomical show"), and known in the
West as Spiral Galaxies. A favourite of Simon Tatham's puzzle collection.

## This implementation

- **Spec knobs:** `size` (5–15; 10 and up since version 1.2),
  `galaxy_share` (target coverage per whirl —
  smaller means more, tighter galaxies; null — the default — takes it from
  `difficulty`: 0.14 for expert, 0.25 for every other band), `difficulty`
  (default expert), `picture` (`none`, the default; `auto`, `heart`,
  `diamond`, `ring`, `cross`, `tree`, `house`), `palette` (`mono`, the
  default; `colour`), `cell`, `line`.
- **Picture mode (`picture`):** a motif is drawn over the board from a
  formula (so it fits any size and is left–right symmetric), one or two
  colour classes plus the background; `auto` lets the seed pick. The carve
  then keeps every galaxy inside one class — its core and every mirrored
  pair it grows by share the first cell's class — so the shaded galaxies
  are exactly the motif (checked). The dots' colours are a picture, not a
  clue: uniqueness is proven without them, by the solving ladder at every
  size (up to 9×9 the tests re-prove each board with the exhaustive
  search), and every picture board is rated by the ladder's hardest rung
  (`rating_basis: hardest_rung`) — galaxy density would put every picture
  in the densest band. Served: 5×5 and 7×7 easy, medium and hard for most
  seeds (expert now and then); 9×9 hard and expert; 12×12 hard and expert;
  15×15 hard or expert. Under 0.4 s at every size. Metadata adds `picture`
  (the motif) and `picture_galaxies`.
- **Palette (`palette`):** `mono` prints black and white dots and shades the
  picture grey in the key; `colour` gives the picture's dots and key their
  colours (heart red, tree green with a brown trunk, house yellow with a
  red roof …). On a board without a picture, `colour` tints the key's
  galaxies in four soft colours, neighbours (almost always) differing; the
  puzzle page is unchanged. Metadata adds `palette: "colour"`. With
  `picture: none` and `palette: mono` every page is byte-identical to
  before.
- **Generation:** symmetric galaxies are grown to cover the board, each cell
  added together with its 180° image so symmetry holds by construction; dots
  are placed only where their whole core mirrors on-board. The dots are then
  handed to a symmetric-search solver that assigns cells in mirror pairs and
  checks connectivity; the board ships only if that solver finds exactly one
  partition, and the shipped answer *is* the solver's partition.
- **Guarantees:** deterministic per seed; every galaxy provably symmetric and
  connected; exactly one partition, proven by exhaustive symmetric search.
  Rated by galaxy density (named in the metadata) — a region genre with no
  technique ladder: easy ≤ 0.10 galaxies per cell, medium ≤ 0.16, hard
  ≤ 0.22, expert above. The first board in the requested band is kept, else
  the nearest; with a null share on a board of 7×7 or less, 400 layouts are
  tried rather than 60.
- **Reachable bands (a limit of the carve):** grown galaxies stall small, and
  layouts of few large galaxies rarely admit a single partition, so a 7×7
  serves expert and hard reliably and medium for about one seed in four (3 of
  12 surveyed); easy (≤ 4 galaxies on a 7×7) was never reached, and a 5×5 is
  always expert. Kids has no rung. Every off-band page carries
  `requested_difficulty`.
- **Big boards (version 1.2): 10×10 to 15×15.** Past 9×9 the exhaustive
  search runs out of its node budget, and a capped count is never a proof,
  so these boards are proven by a sound solving ladder instead. It keeps, for
  every cell, the dots that could still own it, and only strikes off a dot
  no valid partition can give that cell: **mirror** (the cell's image about
  the dot must be on the board and free — mirrored walls), **captured**
  (the galaxy must reach the cell through cells it could own), **bridge** (a
  cut cell between a dot and its settled cells joins it; Tarjan's
  articulation points) and **what-if** (suppose a cell joins a dot, run the
  rungs below, strike the dot off on a contradiction). A layout ships only
  when the ladder settles every cell — then that partition is the only one.
  The same carve proposes the dots; up to 40 layouts are tried, and once
  one is proven, at most 8 more (4 above 12×12) for one in the requested
  band. Rated by the
  hardest rung (`rating_basis: hardest_rung`, `hardest_rung`,
  `what_if_rounds` in the metadata): mirror or captured easy, bridge
  medium, one what-if round hard, two or more expert. Carved layouts always
  need what-if at these sizes, so **only hard and expert are served**:
  asked for hard (or easier), a 10×10 was hard for 12 of 12 seeds surveyed,
  a 12×12 for 9 of 12, a 15×15 for 1–2 of 12 (else expert); kids, easy
  and medium requests are served the nearest of those, with
  `requested_difficulty`. The tests check the ladder against the exhaustive
  search: every layout it finishes on 5–8 boards, and generated 10×10
  boards, have exactly the ladder's partition. Timings: 10×10 under 0.1 s, 12×12
  under 0.5 s; a 15×15 expert under a second on average (worst seen 2.7 s),
  and a 15×15 asked for an easier band 2–3 s (worst seen 6.5 s) while it
  looks for a hard board. Sizes up to 9 are byte-identical to 1.1; a
  request of 10 or more (clamped to 9 before) now gets the larger board.
- **Version 1.1:** `galaxy_share` may be null, and is by default, so the
  band picks the share. Before, the share was 0.14 for every request and every
  page came out expert. Pages that set `galaxy_share`, expert requests, and
  the default page are byte-identical to 1.0.
