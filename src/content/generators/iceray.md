---
title: "Ice-Ray Lattice"
blurb: "Ice-ray lattice — Chinese cracked-ice window tracery, with plum blossoms"
category: design
version: "1.0.0"
---
The cracked-ice window of Chinese gardens: a lattice of wooden bars that
splits the window into irregular panes like ice breaking on a pond, with
plum blossoms scattered over it.

## What it is

Ice-ray (bing lie, "cracked ice") is a family of Chinese window and screen
lattices. The bars run straight but at every angle, meeting in three-way
joints, and the panes between them are triangles, four-sided and five-sided
pieces of every size, so the whole window looks like a sheet of ice that has
just cracked. Framed as a rectangle, a round moon gate, a hexagon or a fan,
and often dotted with plum blossoms (the "ice and plum" design, spring
flowers on the thawing ice), it is one of the loveliest patterns of
traditional Chinese joinery.

## How to use it

The wood-and-paper version is ready to frame, or to print as a screen or a
card. For colouring, choose the line-art version: each pane is its own
region, and the bars form one continuous frame. Try colouring the panes in
the pale blues and whites of ice, or the warm golds of lamplight through
rice paper, give the bars a wood colour, and make the blossoms pink or white
with red hearts. The solid-bar version makes a bold black-and-white print,
like a paper cut.

## Purpose

A traditional design with real structure behind it, for colouring books,
wall art, cards and wrapping paper. Every page is different, yet every page
keeps the character of the real lattice: straight bars, sound joints, no
slivers and no needle-sharp corners.

## History

Ice-ray lattices appear in Chinese windows, balustrades and furniture from
at least the Ming dynasty, and Ji Cheng's garden treatise *Yuan Ye* (1631)
illustrates them. Daniel Sheets Dye recorded hundreds of examples in *A
Grammar of Chinese Lattice* (1937). In 1977 the architect George Stiny
showed that the whole family follows one shape rule: divide a convex piece
into two with a single straight cut from one of its edges to another. The
"ice and plum" pattern, with blossoms on the cracks, pairs the lattice with
the plum, the flower that blooms while ice is still on the ground.

## This implementation

- **Spec knobs:** `shape` (rectangle, circle, hexagon, fan), `width`,
  `height`, `density` (1-10: how finely the ice cracks), `min_angle`
  (15-50 degrees: the sharpest corner allowed), `bars` (double: bars of real
  width outlined on both sides; solid: bars filled; line: one line per bar),
  `bar` (bar width in points), `stroke`, `blossoms` (0-30; about one in four
  is a bud), `coloring` (wood or lineart).
- **Generation:** Stiny's grammar. The frame starts as one convex piece (a
  circle is a 96-sided polygon; the fan is first divided into its five ribs,
  each a convex piece). Repeatedly, one of the larger pieces is chosen and a
  straight cut is sought between two of its sides (sides picked in
  proportion to their length, points in the middle 64% of the side). A cut
  is kept only if it lands clear of every existing joint (at least 2.2 bar
  widths away), meets both sides at no less than `min_angle`, runs at least
  15 degrees off parallel to every other substantial side of the piece, and
  leaves two pieces that meet the minimum area, a minimum width, at most
  five real corners, and a pane (the opening inside the bars) of at least
  420 square points. Among up to six valid cuts the most balanced one wins,
  with a little randomness. The new joint is also inserted into the
  neighbouring piece's edge, so later cuts can see it. Bars are drawn by
  shrinking every piece by half the bar width (half-plane clipping), so all
  bars have the same width. Blossoms sit on joints, clear of the frame and
  of each other; each is a five-lobed polar curve with creases, stamens and
  a heart.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed; every final piece is convex; the
  pieces tile the frame exactly (areas sum to the frame's area, and no two
  overlap, checked with a separating-axis test); no piece is below the
  minimum area and no corner is sharper than `min_angle`; every cut ends on
  an edge of the piece it divides, never at an existing vertex, and passes
  through no vertex; every pane is at least 420 square points. Line-art
  pages with double or line bars pass the colourability check (regions of at
  least 40 mm2, strokes of at least 0.75 pt, ink under 55%); solid bars are
  deliberately heavy and report `colorable: false`. Meta reports
  `all_convex`, `tiles_frame`, `smallest_piece`, `sharpest_corner` and
  `colorable`. A page builds in under 15 ms.
