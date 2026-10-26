---
title: "Parquet Floor"
blurb: "Parquet floors board by board: herringbone, chevron, basket weave, Versailles, Chantilly, ladder, hexagonal and Louis cubes, with wood grain and border bands"
category: design
version: "1.0.0"
---
A wooden floor laid board by board — herringbone, chevron, basket weave,
Versailles panels or Louis cubes — with the grain drawn in every board.

## What it is

A plan of a parquet or marquetry floor seen from above. Every board is its
own shape with its own grain, and together they cover the floor exactly. The
patterns are the classics of the joiner's trade: herringbone (rectangular
boards in a zig-zag), chevron (boards cut at 45° so their ends meet on a
straight seam), basket weave (square blocks of boards turning a quarter
turn), ladder (long rails with short rungs between), hexagons of parallel
boards, Louis cubes (rhombi in three woods that look like stacked boxes),
and the panel parquets Versailles and Chantilly, whose interlaced straps run
over and under each other inside a mitred frame. A border band of boards
along the walls, with a thin inlay strip, can frame the field.

## How to use it

Enjoy it as a picture of craft, or use it as a plan: count the boards in one
repeat, follow one board's grain, find where a strap goes over and then
under. To colour it, choose the line-art palette and give each kind of piece
its own wood — light for the cube tops, darker for the sides, one colour for
the straps and another for the panels between them.

## Purpose

A satisfying, orderly page about how flat pieces fill a floor without a gap,
and how a few rules of cutting and turning give very different floors.

## History

Parquet de menuiserie (joiner's parquet) began in 17th-century France, when
the panels later called *parquet de Versailles* replaced marble floors that
needed constant washing and rotted the joists beneath; the Chantilly pattern
is named after the château. Herringbone (*point de Hongrie* for the
chevron) has been laid in wood since the 16th century, after Roman brick
paving (*opus spicatum*). Marquetry floors with tumbling-block cubes became
fashionable in 18th-century France and Russia. Sources: André-Jacob Roubo,
*L'Art du menuisier* (1769–1775), the plates on floors; Bruno de Laubadère,
*Parquets* (Flammarion, 1990).

## This implementation

- **Spec knobs:** `pattern` (auto, herringbone, chevron, basket_weave,
  versailles, chantilly, ladder, hexagonal, cube), `palette` (auto, oak,
  oak_walnut, marquetry, wenge_maple, line_art), `board_width` (points),
  `board_ratio` (length as a multiple of width), `border` (band and inlay
  along the walls), `grain` (strength of the wood figure), `width`,
  `height`, `margin`.
- **Generation:** each pattern is a lattice tiling — a fundamental cell of
  board polygons and two lattice vectors (herringbone: one flat and one
  upright board stepped along the diagonal, turned 45°; chevron:
  parallelograms in columns leaning opposite ways; hexagonal: hexagons cut
  into parallel strips, three grain directions coloured by `(i + 2j) mod 3`
  so neighbours differ; cubes: hexagons cut into three rhombi). Versailles
  and Chantilly panels are the faces of a planar arrangement of the frame,
  its mitres and the strap edges, each strap's edges interrupted where it
  passes under another, so the straps weave. The cell is translated over the
  field from a seeded origin and each board clipped to the room by an exact
  convex clip; the border band is cut into mitred lengths. Grain lines run
  along each board, displaced by smooth seeded noise, with an occasional
  cathedral figure; each board's colour is its wood with its own slight tone.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  boards_tile_the_floor_exactly` (meta also reports the floor area and the
  boards' total area). Tested for every pattern with and without the border
  and at three board ratios: the boards' areas sum to the floor's area, no
  two boards overlap (pairwise intersection area zero), and every board lies
  inside the floor; all ink stays on the page.
