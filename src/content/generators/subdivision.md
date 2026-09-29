---
title: "Subdivision"
blurb: "Recursive subdivision art — Mondrian, quadtree, triangles, golden kd-cuts, circles, plotter fills"
category: design
version: "1.1.0"
---
Cut a rectangle, cut the pieces, and cut them again: Mondrian blocks,
quadtrees, folded triangles, golden-ratio grids, Bauhaus circles and
plotter-style pattern cells, all from one simple rule.

## What it is

Recursive subdivision is one of the oldest ideas in generative art. Start
with the whole page, split it in two (or four), then keep splitting some of
the pieces until they reach a chosen size. Six styles share that rule:

- **Rectangles** - a Mondrian-style composition: off-white blocks, a few in
  red, blue and yellow, divided by heavy black lines.
- **Quadtree** - every split makes four equal quarters, so large and small
  squares mingle.
- **Triangles** - each triangle is halved across its longest side, starting
  from a square or from one big triangle, for a folded, faceted look.
- **Kd** - cuts alternate between across and down, on golden-section and
  one-third proportions.
- **Circles** - a quadtree whose squares each hold a circle, a target of
  rings, a half disc, a quarter disc or a leaf, in the Bauhaus manner.
- **Patterns** - every cell gets its own texture: hatching, cross-hatching,
  dots, nested outlines, rings, arcs, waves or zigzags, the look of pen-plotter
  art.

## How to use it

Frame the colour versions as prints, or use them as covers and backgrounds.
The line-art versions are colouring pages: every block (and every circle,
half disc or nested outline inside it) is a closed shape to fill, so choose a
palette of three or four colours and try never to let two touching blocks
share one. On a pattern page, colour the cells and let the textures show
through, or trace a single cell's pattern as a slow, calming line exercise.

## Purpose

A single, flexible abstract-art generator for wall art, notebook covers,
wrapping paper and adult colouring books. The styles span strict and playful:
the Mondrian page is bold and sparse, the quadtree and kd pages rhythmic, the
circles page cheerful, and the pattern page dense and meditative.

## History

Piet Mondrian's grid compositions (from about 1920) made the divided
rectangle an icon of modern art. Quadtrees and k-d trees came from computer
science in the 1970s (Finkel and Bentley; Bentley) as ways to divide space,
and generative artists soon borrowed them. Recursive subdivision with
hand-drawn fills became a signature of the pen-plotter revival of the 2010s,
and the circle-in-a-square grids echo Bauhaus poster design.

## This implementation

- **Spec knobs:** `kind` (rectangles, quadtree, triangles, kd, circles,
  patterns), `width`, `height`, `depth` (1-10; 0 picks one to suit the kind),
  `min_cell` (points: no cell is narrower than this in any direction),
  `split_bias` (the chance a cell below the first levels splits again),
  `gap` (white space between cells), `coloring` (palette or lineart),
  `palette` (auto, piet, bauhaus, earth, sunset, ocean, mono), `stroke`
  (0 = heavy lines for Mondrian, fine for the rest), `patterns` (add
  plotter fills to any kind), `spacing` (pattern line spacing), `start`
  (square or triangle, for the triangles kind), `bold` (Bold & Easy, below).
- **Generation:** depth-first recursion from the frame. The first two or
  three levels always split (when the minimum size allows); after that a
  cell splits with probability `split_bias`, and only when both children
  keep the minimum width. Mondrian cuts favour the long side on free ratios
  between 0.22 and 0.78; kd cuts alternate axis and choose among 1/phi,
  1 - 1/phi, 1/3, 2/3 and 1/2; triangles are bisected from the midpoint of
  their longest side. Colours are assigned greedily so neighbouring cells
  differ; the Mondrian palette keeps most cells white, puts red on one of
  the three largest, and always places blue and yellow. Pattern fills are
  generated over each cell and clipped to it (Cyrus-Beck), with neighbouring
  cells steered away from repeating a pattern.
- **Bold & Easy (`bold`):** a chunky colouring page: line art, no fill
  patterns (the `patterns` kind draws as `kd`), no gap, a heavy line
  (4.5 pt at 600 pt, scaling with the page), at most four levels, no cell
  narrower than 12% of the frame (14% for circles, whose shapes need the
  room), and a split bias of at most 0.55 so more of the page stays in big
  pieces. A circles cell keeps only shapes of at least 1.6 times the kids'
  200 mm² floor. Checked against the kids' profile (the circles' white fills
  are paper, so the check reads the lines alone); meta adds `bold` and
  `colorability_profile`.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed; the leaf cells tile the frame
  exactly (their areas sum to the frame's, all lie inside it and no two
  overlap, checked with a separating-axis test); every cell's smallest
  caliper width is at least `min_cell`; every fill mark lies inside its
  cell. Line-art pages pass the colourability check (regions of at least 40
  mm2, strokes of at least 0.75 pt, ink under 55%); shapes too small to
  colour are left out. Meta reports `tiles_frame`, `area_error`,
  `smallest_cell_width` and `colorable`. A page builds in a few
  milliseconds. Bold pages are tested for every kind and start on the
  rendered page: every patch of paper is at least 200 mm² and every line at
  least 4.5 pt.
