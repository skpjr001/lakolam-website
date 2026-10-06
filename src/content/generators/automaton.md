---
title: "Cellular Automaton"
blurb: "Cellular-automaton tapestries — Rule 30, 90, 110 and friends as clean colourable regions, in squares, triangles or rings"
category: design
version: "1.0.0"
---
A tapestry woven by one rule number: a row of cells, each looking only at
itself and its two neighbours, repeated generation after generation down the
page — Rule 30's chaos, Rule 90's nested triangles, Rule 110's gliders — or
wrapped round into a mandala.

## What it is

A cellular automaton is a row of cells, each on or off, updated all at once.
The new state of a cell depends only on the old states of the cell and its
left and right neighbours: eight possible neighbourhoods, each sending the
cell on or off, so a rule is just eight bits, numbered 0 to 255. Start with a
single live cell and draw each generation beneath the last, and those eight
bits grow into a picture: some rules die out, some settle into stripes, and a
few — Rule 30, 45, 90, 110, 150 among them — make endlessly intricate
patterns that never quite repeat.

This page draws that picture as clean artwork. Cells of the same colour that
share a side are merged into one shape, so a solid triangle is one region
rather than hundreds of squares, and the colour of each cell can remember
more than one generation at a time: with three generations folded in, a cell
that has just switched on, one that has stayed on, and one that is just
switching off all get different shades, and the pattern gains depth and
direction. Other variations: three-colour rules, triangles instead of
squares, the generations wrapped into rings from the centre outward (a
mandala), and a Game of Life page scattered with the classic still lifes and
oscillators.

## How to use it

- **As wall art.** The colour pages use small palettes of shades — ink and
  slate, the warm browns of the textile cone shell, sea blues, embers,
  orchid, verdigris. Square tapestries suit a tall frame; the radial
  mandalas a square one.
- **As a colouring page.** The line-art version outlines every shape. Fewer
  cells mean bigger shapes: around 25 to 31 cells across suits most pens,
  and one colour bit keeps the page to two kinds of shape.
- **As a lesson.** Pick a rule number, write out its eight bits, and check a
  few rows by hand — then watch what the rule does over a whole page. Rule 30
  from a single cell, Rule 90 (the Sierpiński triangle), and Rule 110 from a
  random row are the classic three.

## Purpose

Cellular automata are the most striking demonstration there is that simple
rules make complex pictures, and their look — crisp pixel triangles, woven
diagonals — is a design language of its own. Merging the cells into shapes
makes them printable at any size and colourable by hand, and folding several
generations into the colour turns a black-and-white diagram into a textile.

## History

John von Neumann and Stanisław Ulam devised cellular automata in the 1940s
as models of self-reproduction. John Conway's Game of Life (1970), a
two-dimensional automaton with a birth-and-survival rule, made them famous:
its still lifes (the block, the beehive, the loaf), oscillators (the blinker,
the toad, the pulsar, the period-15 pentadecathlon) and gliders were
catalogued by hobbyists for decades. In the early 1980s Stephen Wolfram
studied the 256 one-dimensional rules exhaustively, numbered them, and sorted
their behaviour into four classes — dying out, settling into stripes,
chaos (Rule 30, which he used as a random-number generator) and complex
interacting structures (Rule 110, later proved capable of universal
computation by Matthew Cook). Nature got there first: the shell of the
textile cone snail, *Conus textile*, is patterned by a pigment process that
behaves like a one-dimensional automaton, drawing Rule-30-like triangles as
the shell grows. Rule 30 itself is cast in the cladding of Cambridge North
railway station, opened in 2017.

## This implementation

- **Spec knobs:** `mode` (`elementary`, `totalistic` three-colour, `life`),
  `rule` (0-255 elementary, 0-2186 totalistic; empty lets the seed choose),
  `init` (`single` cell, or a seeded `random` row with `density`), `cells`
  (ring size, 8-200; Life board width), `generations` (0 fills the page),
  `geometry` (`square`, `triangle`, `radial`), `colour_bits` (generations
  folded into each colour, 1-4; 1-2 for three-colour rules; Life phases),
  `folds` (radial single start: evenly spaced live cells, the mandala's
  rotational order), `style` (`palette`, `line_art`), `palette` (`auto`,
  `ink`, `conus`, `ocean`, `ember`, `orchid`, `verdigris`), page
  `width`/`height`, `stroke`.
- **Generation:** the row is a ring — the cells at each end are neighbours —
  evolved by the rule's bit table (elementary) or by base-3 digit *sum* of
  the code (three-colour totalistic). A seeded rule comes from a curated pool
  of complex (class III/IV) rules — for a single-cell start, only those that
  grow a centred, balanced triangle on a steady background — and is kept
  only if its evolution on *this* ring and page is measured lively: the last
  quarter neither empty nor full, and at least 70% of rows distinct.
  On a ring, some famous rules (18, 22, 126 on odd rings, 54) collide with
  themselves after wrapping and die or freeze; the measurement rejects them
  honestly instead of shipping a half-empty page. Each cell's colour class is
  its state in the last k generations read as a k-digit number, newest
  generation most significant. Cells are lattice polygons (squares; up and
  down triangles in a strip; annular sectors on a log-polar grid, so cells
  stay roughly square from the centre out); same-class cells sharing an edge
  are merged by union-find, and each region's boundary is traced with the
  region on its left, pivoting through the region's own cells at every
  vertex, so holes come out oppositely oriented and fill correctly. Where
  one region would pass through a vertex twice (two of its cells meeting
  only at a corner), the outline is chamfered 12% of an edge from the
  vertex, so every outline is a simple polygon. Collinear runs are merged
  (radial runs into arcs of at most 45°). Life mode places patterns from a
  curated list (block, beehive, loaf, boat, tub, pond, ship, long boat,
  aircraft carrier, snake, blinker, toad, beacon, clock, pulsar,
  pentadecathlon) in seeded orientations and positions, with phase
  envelopes at least three cells apart and two cells from the edge so no two
  patterns can interact.
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. The evolution is tested against
  Wolfram's rule table read independently (and Rule 30's published first
  rows), the totalistic step against the code's base-3 digits, and the
  colour classes against the generations they encode. Regions are tested to
  partition the cells exactly, to be edge-connected (independent flood
  fill) and maximal (two edge-neighbours share a region exactly when they
  share a class), in all three geometries; outline areas equal cell areas
  less the chamfers; no outline touches itself. Radial single starts have
  exact `folds`-fold rotational symmetry. Every Life pattern is tested to be
  a still life or oscillator of its known period, and every Life board is
  run for the least common multiple of its periods and must return to its
  start (`returns_to_start` in meta). Line-art pages report `colorable`
  against the adult rules; coarse pages (about 25 cells across) pass, while
  fine pages are honest fine-detail art with single-cell regions — meta
  gives the region count, smallest region in cells and the smallest cell
  in mm². Rating basis: none — it is a design.
