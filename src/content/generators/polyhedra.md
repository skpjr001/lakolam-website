---
title: "Polyhedra"
blurb: "Papercraft nets of the Platonic and Archimedean solids and star ornaments, with numbered glue tabs"
category: design
version: "1.0.0"
---
Cut, fold and glue: paper models of the Platonic and Archimedean solids and
three star ornaments, each on one page with numbered glue tabs.

## What it is

A papercraft net: the faces of a solid laid out flat in one connected piece
(or, for the largest solids, a few pieces), ready to cut out and fold up.
The five Platonic solids, all thirteen Archimedean solids — from the
cuboctahedron to the snub dodecahedron — and three stars: Kepler's stella
octangula, the small stellated dodecahedron and the great stellated
dodecahedron. Faces can be printed in colour or left white for coloured
card.

## How to use it

Print the page on card stock (160–220 g/m² works well). Cut along the solid
lines, round the outside of the shape and the tabs. Score every fold line
with a ruler and a dry ballpoint pen or a blunt knife, then crease it.

- **Mountain folds** (dash-dot lines) fold away from you, so the printed side
  stays on the outside. Tabs fold back the same way.
- **Valley folds** (dashed lines, only on the stars) fold toward you: they
  are the creases between neighbouring spikes.
- **Glue tabs** (grey) carry a number. Each tab glues under the edge with the
  same number, which is printed just inside that edge.

Glue a few tabs at a time and let them grip before moving on, working round
the model so the last faces close like a lid. A pencil end pushed in through
the last opening helps press the final tabs. For a tree ornament, thread a
loop of thread through a corner before closing it.

## Purpose

Making a solid by hand teaches what a picture cannot: how many faces meet at
a corner, why some corners are flat and some pointed, how a flat sheet
becomes a closed surface. Polyhedra are a classroom staple and a satisfying
craft — the stars in particular make striking decorations.

## History

The five regular solids are named after Plato, who in the *Timaeus* matched
them to the elements; Euclid's *Elements* ends by proving there are exactly
five. Archimedes described the thirteen semi-regular solids, but his text is
lost; Kepler rediscovered them all in *Harmonices Mundi* (1619), where he
also drew the small and great stellated dodecahedra. The stella octangula
was drawn by Luca Pacioli and Leonardo before Kepler named it. Albrecht
Dürer's *Underweysung der Messung* (1525) is the first printed book to show
nets — solids unfolded flat to be cut out — and it is still unknown whether
every convex solid has an edge unfolding that never overlaps itself
(Dürer's problem).

## This implementation

- **Spec knobs:** `width`, `height`, `margin`; `solid` (any of the 21, or
  `any` for a seeded choice); `faces` (`colour` or `outline`); `palette`
  (`pastel`, `jewel`, `festive`); `numbers` (glue numbers on tabs and
  edges); `labels` (title, face count and line legend); `tab_size` (tab
  height as a fraction of the edge, 0.15–0.4); `edge_mm` (0 = as large as
  the page allows; a size too big for the page is shrunk and
  `edge_shrunk` is set); `line` (cut-line weight).
- **Generation:** vertices come from the standard Cartesian coordinates
  (even or all permutations with sign changes); the snub dodecahedron is the
  orbit of one vertex under the icosahedron's 60 rotations. Edges are the
  vertex pairs at the minimum distance and faces are traced round each
  vertex's sorted neighbours. Stars raise a pyramid on every face of an
  octahedron (equilateral sides), dodecahedron or icosahedron (golden
  triangles, sides φ times the base). The net grows from one face by
  hinging neighbours on, nearest first with seeded jitter, skipping any
  placement that would overlap a face already down or lie edge to edge with
  one it is not hinged to; several seeded attempts are made and the one
  with the fewest pieces, then the most compact, wins. Each cut edge gets
  one tab on whichever side has room, its ends tapered to the notch they
  sit in (45°, or 60% of a narrower corner) and lowered if needed; where
  neither side has room even for a low tab, the piece is split at that face
  and tabs are tried again. Pieces are turned and shelf-packed at the
  largest scale that fits the page. Platonic faces and star spikes are
  coloured so neighbours differ; Archimedean faces are coloured by kind.
- **Solving:** nothing to solve — a design to build.
- **Guarantees:** every page passes `net_verified`, an independent check of
  the finished net: each face appears exactly once, congruent to the solid's
  face and not mirrored (so the printed side ends up outside); hinged faces
  meet exactly along their shared edge and each piece's hinges form a tree;
  every edge of the solid is either a fold or a cut, and every cut edge has
  exactly one tab, on one of its two sides; no two polygons of a piece —
  faces and tabs — overlap (exact separating-axis test on every pair); and
  no two unhinged faces lie edge to edge. Folds are mountains on convex
  edges and valleys on concave ones. Every solid fits Letter and A4 pages.
  The counts of vertices, edges and faces, Euler's formula, planarity and
  unit edges are tested for all 21 solids. The largest solid, the truncated
  icosidodecahedron, usually needs several pieces (its corners leave only a
  6° notch, so tabs crowd), and the stars sometimes need two or more.
