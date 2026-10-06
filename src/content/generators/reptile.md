---
title: "Rep-Tiles"
blurb: "Rep-tiles and fractal mosaics — sphinx, chair, L-tile, dragons, Gosper island, Pythagoras tree, H-tree, carpet, Vicsek"
category: design
version: "1.0.0"
---
Shapes made of smaller copies of themselves: a sphinx cut into four little
sphinxes, a Gosper island cut into seven little islands, a tree of squares
growing squares, cut again and again into a mosaic of every size.

## What it is

A rep-tile is a shape that can be divided into smaller copies of itself, all
the same size. Divide the copies again and the shape fills with a mosaic of
smaller and smaller pieces that still fit together perfectly. On each page
some branches stop early and some go deeper, so large and small pieces mix.
Ten figures:

- **Sphinx** - a five-sided shape made of six triangles; four half-size
  sphinxes make one sphinx.
- **Chair** - the L-tromino, three squares in an L; four half-size chairs make
  one chair.
- **L-tile** - four squares in an L; four half-size L's make one L.
- **Twin-dragon** - two dragon curves back to back, a tile with spiral edges
  made of two copies of itself.
- **Terdragon** - a three-copy dragon tile on the triangle grid.
- **Gosper island** - a snowflake-like island made of seven copies of itself.
- **Pythagoras tree** - a square with a right triangle on top, and a square on
  each side of the triangle, branching on and on.
- **H-tree** - an H, with a smaller H on each of its four tips.
- **Sierpinski carpet** - a square cut into nine, the middle one taken out,
  and the same done to the other eight.
- **Vicsek** - a square cut into nine, keeping only the cross of five.

The sphinx, chair and L-tile pages show either one whole tile or a mosaic
that fills the page, as if seen through a window into a huge tile.

## How to use it

As a colouring page, every piece is a closed shape big enough for a pencil.
Try never to let two touching pieces share a colour, or colour each size of
piece in its own family of colours so the large and small copies stand out.
On a whole-tile page, look for the four big copies first and colour each in
one family of shades. The colour versions make bright prints, covers and
puzzle-like posters: hunt for a piece the same shape as the whole page.

## Purpose

Rep-tiles are a favourite of recreational mathematics and make striking,
endlessly varied pages: each seed stops different branches early, so no two
mosaics are alike, and the pieces are always exact copies that fit with no
gaps. The ten figures range from calm (carpet, chair) to wild (dragons).

## History

Solomon Golomb named rep-tiles in 1962, and Martin Gardner made them famous in
his Scientific American column the next year. The sphinx is the only known
pentagon rep-tile. The twin-dragon comes from Chandler Davis and Donald
Knuth's work on dragon curves (1970), and the Gosper island from Bill Gosper's
flowsnake curve (1973). Waclaw Sierpinski described his carpet in 1916; Albert
Bosman drew the Pythagoras tree in 1942; the H-tree comes from circuit layout,
and Tamas Vicsek's cross fractal from the physics of growth (1983).

## This implementation

- **Spec knobs:** `kind` (`sphinx` default, `chair`, `l_tile`, `twin_dragon`,
  `terdragon`, `gosper`, `pythagoras`, `h_tree`, `carpet`, `vicsek`),
  `layout` (`fill` default, `single`; sphinx, chair and L-tile only),
  `levels` (1-5, default 3: how many piece sizes a page mixes), `smallest`
  (mm²; 0 = the figure's default of 70, 60, 46 or 40.5; never below 40.5),
  `variation` (0-1, default 0.45: how often a branch stops early), `angle`
  (Pythagoras branch angle, 20-70 degrees; 0 = seeded between 36 and 54),
  `coloring` (`palette` or `line_art`), `palette` (`garden`, `ocean`,
  `sunset`, `earth`, `pastel`), `stroke`, `width`, `height`, `margin`.
- **Generation:** *Polygon rep-tiles*: the prototile and four similarities
  onto its half-size copies, found by an exact-cover search over lattice
  placements and stored as tables. Recursion stops per branch inside the
  window of `levels` depths, with probability `variation`. In `fill` layout,
  a super-tile just large enough to hold the frame is placed at a seeded
  position and orientation (six candidate windows, the one giving the most
  pieces kept); pieces cut by the frame are clipped, and a clipped piece
  below the floor folds back into its parent. *Digit tiles*: every number
  with n digits in a lattice number system (base -1+i with digits 0, 1 on
  the square lattice; base 1 - w with digits 0, 1, -1 and base 3 + w with
  digits 0 and the six units on the triangular lattice, w a cube root of
  unity) is a square or hexagonal cell; the cells sharing their top digits
  form one piece, and `lako_grid::regions` traces the outlines. Each piece
  keeps at least 7, 4 or 2 digits of detail. *Pythagoras tree*: built level
  by level with per-branch angle jitter; a piece overlapping an earlier one
  stops its branch; squares below the floor are pruned, and a triangle too
  small to colour becomes the roof of its square. *H-tree*: bars shrink by
  1/sqrt 2 in length and 0.86 in width and stop at the children's edges, so
  bars only touch. *Carpet and Vicsek*: three-by-three subdivision with at
  most two cell sizes; carpet holes are ink.
- **Solving:** nothing to solve; it is a design.
- **Guarantees (tested):** deterministic per seed, and seeds differ. The four
  copies of each polygon rep-tile tile their parent exactly (areas sum, and
  grid probes lie in exactly one copy). Every piece lies in the frame, is a
  simple polygon, and is at least the requested smallest size; no two pieces
  overlap, and `fill` mosaics cover the frame. Touching pieces never share a
  colour (smallest-last greedy colouring with six colours, enough for any
  planar map); tree pieces are shaded by depth instead. Line-art pages of
  every figure and layout pass the adult colourability check (regions of at
  least 40 mm², strokes of at least 0.75 pt, ink under 55%). Every figure
  builds well under a second.
- **Caveats:** digit tiles are drawn at finite resolution (16384, 19683 or
  16807 cells), so their fractal edges are fine staircases and a piece can
  occasionally split into islands, which share one colour (`extra_islands`
  in meta). The colouring floor limits depth, so trees stop at about five or
  six levels and carpets at three. The H-tree's open background is one
  region.
