---
title: "Heesch Coronas"
blurb: "Heesch coronas: non-tiling polyforms ringed by every layer of copies they admit, proved by exhaustive search"
category: design
version: "1.0.0"
---
A shape that cannot tile the plane, ringed by its own copies layer after
layer — until no further layer will close.

## What it is

Some shapes tile the plane: copies of them cover it with no gaps and no
overlaps, for ever. Most shapes cannot. But a shape that cannot tile may
still be surrounded: a ring of copies can fit snugly round it, closing up
all the way, and sometimes a second ring round that, and a third. The
number of complete rings a shape allows is its Heesch number. Each page
shows one shape in the middle, made of squares, hexagons or triangles, with
its rings coloured like the bands of an archery target. The last ring drawn
is the last there is: no arrangement of copies can close a further ring
round any patch of that many rings. For contrast, the page can also show a
shape that does tile, whose rings could go on for ever.

## How to use it

Look at the outer ring and try to see why it cannot be surrounded again:
somewhere on its edge is a notch or corner that no copy can fill without
leaving a gap. Print the line version to colour each ring in its own colour,
or colour every copy the same way it is turned, to see how many different
positions the shape needed. Cut a few copies from card and try to beat the
page: you will not get one ring further. Compare a shape that tiles with one
that does not — they can look almost alike.

## Purpose

An honest picture of an open problem in geometry. The pages use shapes
whose numbers have been worked out by a complete search, so every ring
shown is real and the stopping point is proved, not guessed.

## History

The question goes back to Heinrich Heesch, who raised it in 1968 (Heesch's
problem): which numbers can a non-tiling shape's ring count take? For years
the record was small; Casey Mann found shapes with Heesch number 5 in 2004,
and Bojan Bašić one with Heesch number 6 in 2021 — the highest known. Craig
S. Kaplan, "Heesch numbers of unmarked polyforms" (Contributions to
Discrete Mathematics, 2022), computed the numbers of every non-tiling
polyomino up to 19 cells, polyhex up to 17 and polyiamond up to 24 by
turning each question into a satisfiability problem; he found, for
instance, that the smallest polyominoes with hole-free Heesch number 2
have 9 cells and with number 3 have 17, while a 7-cell polyhex already
reaches 3. This page's shapes come from its own complete search over the
small sizes where those numbers first appear; where the two can be compared
its counts agree with Kaplan's tables (two 7-cell polyominoes with number
1, one 9-cell polyomino with 2, one 6-cell polyhex with 1, nine 9-cell
polyiamonds with 1, three 10-cell polyiamonds with 2).

## This implementation

- **Spec knobs:** `width`, `height` (points); `family` (`polyomino`,
  `polyhex`, `polyiamond`; default `polyomino`); `shape` (`non_tiler`,
  `tiler`); `coronas` (1-3, default 2: the Heesch number of a non-tiler,
  or the rings drawn round a tiler — the non-tilers kept here have Heesch
  number 1 or 2, so a request for 3 coronas round a non-tiler is served 2
  and reported as `requested_coronas`); `palette` (`auto`, `target`,
  `sea`, `sunset`, `earth`, `mono`); `style` (`colour`, `lines`);
  `caption`; `stroke`.
- **Generation:** cells are integer lattice points (squares at twice their
  centre, triangles at three times their centroid in a 60° basis, hexagons
  in axial coordinates), so rotations, reflections and translations are
  integer maps and adjacency comes from shared vertices. Corona `k` must
  cover every cell sharing a vertex with the patch of coronas `0..k`, with
  non-overlapping copies of the shape, and leave the new patch free of
  holes (Kaplan's hole-free number H_c). The search branches on the
  uncovered boundary cell with the fewest fitting copies and tries each
  copy that covers it; every copy touching the patch covers such a cell, so
  every patch is met exactly once and a search that fails is a proof. It
  prunes any pocket of free cells walled off by the patch whose size is not
  a multiple of the shape's. A page takes a curated shape (the seed picks
  among those with the number asked for and turns it by a grid symmetry)
  and searches for its patch in a seeded order with a small node budget;
  if that runs out, it uses the shape's stored patch (found by the same
  search in its fixed order) carried through the same symmetry — meta
  `search_order` says which (`seeded`, `stored`, or `lattice` for a tiler).
  A tiler's rings are cut from its translation tiling: ring `k` is every
  translate touching the rings inside it.
- **Curation:** every free polyform without holes was enumerated at 6-9
  cells (polyominoes), 6 and part of 7 (polyhexes) and 9-10
  (polyiamonds); tilers
  were set aside (translation tilings, and pairs of copies that tile by
  translation), and each remaining shape's number was proved by iterative
  deepening (a `k`-patch found, the search for `k + 1` coronas exhausted,
  150,000 nodes per depth). Shapes whose search ran out of budget were left
  out rather than guessed — among them the 10-cell polyiamond Kaplan gives
  Heesch number 3, so no shape with number 3 is offered yet.
- **Guarantees:** deterministic per seed; an independent check of every
  patch (every page over every family, shape kind and corona count, and
  every stored patch under every grid symmetry): every copy is congruent
  to the shape (same canonical form under the grid's rotations and
  reflections), no cell is covered twice, every copy of corona `k` touches
  the patch inside it, every cell sharing a vertex with that patch is
  covered, and no patch's boundary has a hole loop. Every curated Heesch
  number is re-proved by the tests (patch found, next corona exhausted)
  with the curation's budget, and the enumeration reproduces the known
  counts of free polyforms. `verification:
  coronas_surround_no_overlap_congruent_hole_free`, `heesch_definition:
  hole_free_Hc`. The line page reports `colorable` from the adult
  colourability check. Clamped knobs are reported as `requested_<field>`.
