---
title: "Auxetic Kirigami"
blurb: "A true-size auxetic kirigami cut sheet: rotating squares, hierarchical or conformally graded, with an opened preview"
category: design
version: "1.0.0"
---
A sheet of paper that gets wider when you stretch it longer: cut the lines,
pull, and the squares spin open into a lattice of diamonds.

## What it is

A true-size cutting pattern for the "rotating squares" kirigami. The sheet
is divided into squares, and every line between them is cut except for a
tiny uncut bridge — a hinge — at one end. Each square ends up joined to each
of its neighbours by one corner. Pull two opposite edges and neighbouring
squares turn opposite ways, opening square windows between them, so the
sheet grows in both directions at once: it is *auxetic*. Three layouts:
a straight grid of equal squares, a fan and a full ring whose squares grow
outward smoothly. A second level cuts every square again into four smaller
rotating squares, for a sheet that opens further. Below the pattern, a
preview shows the sheet opened to the chosen angle.

## How to use it

Print at 100 % (no "fit to page") and check the 50 mm scale bar with a
ruler. Lay the sheet on a cutting mat and cut every solid line with a sharp
craft knife and a steel rule, including the outline (and the central hole of
a ring). Do not cut through the dots: each dot marks a hinge, a short bridge
of paper that must stay whole — the cut lines stop just short of it. Thin
card (160–220 g/m²) works best; on thin paper make the hinges longer.
Hold two opposite edges and pull gently: the squares turn and the windows
open, the sheet widening as it lengthens. Ring and fan sheets open into
curved lattices; try draping one over a bowl. Coloured pages tint the
squares so you can see which ones turn which way.

## Purpose

A hands-on piece of materials science: the same mechanism is used in
stretchable electronics, medical stents and deployable structures. Cutting
and opening it shows negative Poisson's ratio — growing sideways when
stretched — and how a pattern of cuts, not the material, sets the shape.

## History

Joseph Grima and Ken Evans proposed rotating rigid squares as a model for
auxetic behaviour ("Auxetic behavior from rotating squares", *Journal of
Materials Science Letters* 19, 2000), after Roderic Lakes' auxetic foams
(1987). Kirigami versions were studied by Shan, Kang, Wang, Bertoldi and
others (2015) and Rafsanjani and Bertoldi (2017); hierarchical cuts by Tang
and Yin ("Design of cut unit geometry in hierarchical kirigami-based auxetic
metamaterials for high stretchability and compressibility", *Extreme
Mechanics Letters* 12, 2017). Graded sheets bent by a conformal map follow
Choi, Dudte and Mahadevan ("Programming shape using kirigami tessellations",
*Nature Materials* 18, 2019). Kirigami itself is the Japanese paper art of
cutting as well as folding.

## This implementation

- **Spec knobs:** `page` (`letter`, `a4`, `a5`, `legal`, `tabloid`, `a3`),
  `landscape`, `margin_mm`; `layout` (`uniform`, `fan`, `ring`); `cells`
  (squares across a uniform sheet, or round a fan or ring, 2–40; a ring
  rounds up to an even count); `cell_mm` (square side, the smallest squares
  of a fan or ring, 4–60 mm); `hinge_mm` (uncut hinge length, 0.3–5 mm);
  `level` (1, or 2 for hierarchical cuts); `angle` (preview opening, 0–45°);
  `style` (`colour`, `lines`); `palette` (`auto`, `lagoon`, `saffron`,
  `garden`, `lilac`, `graphite`). The seed varies only decoration: palette
  (when `auto`), the tint pattern and a ring's turn.
- **Generation:** a grid of square cells (at level 2, each split 2 × 2). Every
  interior edge is cut except a hinge at its odd end (horizontal edges) or
  even end (vertical edges), by vertex parity; at level 2 edges on the coarse
  grid lines follow the rule at the coarse scale, so a whole coarse edge is
  one cut. Cuts then run straight through each vertex, horizontally at even
  vertices and vertically at odd ones. Fan and ring layouts push the grid
  through the exponential map `r₀·e^{δ(u+iv)}` (conformal, so every cell
  stays square in the small); rings are added inward until the next would
  make squares smaller than `cell_mm`. Hinges are held to a third of the
  local cell side. The preview opens the linkage: neighbouring cells turn
  by ∓θ (at level 2 a fine cell adds its own ∓θ to its unit's), each placed
  by walking the hinge graph so both sides of its hinge meet; fan and ring
  previews squeeze the opened grid back to its period and bend it with the
  same map.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic; `verification:
  hinge_graph_connected_and_linkage_closes`. Read back from the cut segments
  alone, every ligament is one hinge long at one end of its edge, the
  ligaments are exactly the rule's hinges, every hinge is a corner of both
  its squares, each square hangs from every neighbour at level 1, and the
  hinge graph is connected (tested on straight and wrapped grids at both
  levels). The opened linkage closes — the two sides of every hinge meet to
  1e-9 — at every angle, a small opening step moves every square smoothly,
  opened squares never overlap up to 45°, and level 1 grows by exactly
  cos θ + sin θ (tested). Squares are true size (`cell_mm` exactly on a
  uniform sheet, never smaller on a graded one); no cut comes within half a
  hinge of a hinge mark; all ink lies inside the margins on every page size
  and orientation (tested). Fan and ring previews are drawn through the
  map and are approximate; a sheet shrunk to fit reports `cells_fitted` /
  `cell_mm_fitted`, and clamped knobs `requested_<field>`.
