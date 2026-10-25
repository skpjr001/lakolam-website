---
title: "Kente Strip Cloth"
blurb: "A strip cloth in the manner of kente: narrow strips sewn edge to edge, warp stripes and weft blocks in a phase-offset checkerboard"
category: design
version: "1.0.0"
---
A cloth of narrow woven strips sewn edge to edge, in the manner of kente:
bright warp stripes and woven blocks falling into a shifting checkerboard.

## What it is

A design in the manner of kente, the strip-woven cloth of the Asante and Ewe
peoples. The cloth is made of a dozen or more long, narrow strips laid side by
side. Along each strip, stretches where the lengthwise warp stripes show
alternate with woven blocks that cover them: small geometric motifs —
zigzags, ladders, diamonds, stepped diagonals, hourglasses — or solid colour
crossed by bands. Every strip repeats its blocks at the same interval, and
each strip is shifted against its neighbour, so the blocks step across the
cloth like a checkerboard. Two strip designs alternate, and the cut warp
threads hang as a fringe at the top and bottom.

## How to use it

Follow one strip from top to bottom and notice how its blocks repeat; then
look across and see how the shift between strips makes the checkerboard. To
colour it, choose the line-art palette and give each strip design its own
colours — kente is read in the contrast between the stripes and the blocks.

## Purpose

A joyful, ordered page that shows how a woven cloth is built: one narrow loom,
one repeat, and the art of sewing the strips together.

## History

Kente is woven by Asante weavers, notably at Bonwire near Kumasi in Ghana, and
by Ewe weavers in south-eastern Ghana and Togo, on the narrow horizontal
treadle loom; strips about ten centimetres wide are sewn together into men's
and women's cloths. Asante cloths are known for silk and rayon in gold, green,
red and black; Ewe cloths often use a wider range of colours and figurative
blocks. Many designs have names and meanings, and some were reserved for
royalty. This page is a geometric grammar in the manner of the tradition: its
stripe orders and block motifs are drawn fresh and it never reproduces or
names a specific design. See Doran H. Ross, *Wrapped in Pride: Ghanaian Kente
and African American Identity* (UCLA Fowler Museum, 1998), and Malika Kraamer,
*Ghanaian Interweaving through the Ages* (2005), on Ewe weaving.

## This implementation

- **Spec knobs:** `strips` (12–24; 0 = fourteen to eighteen by seed), `phase`
  (offset between neighbouring strips as a fraction of the block period,
  0.1–0.9), `block_frac` (share of each period taken by the block, 0.2–0.8),
  `blocks` (mixed, motifs, solids), `palette` (auto, asante, ewe, line_art),
  `threads` (fine warp and weft lines), `fringe`, `stroke`, `width`,
  `height`, `margin`.
- **Generation:** the strip layout tiles the cloth exactly with role-tagged
  rectangles (warp stripes, blocks, seams) sharing every boundary
  coordinate; blocks are as long as the strip is wide, so the period is the
  strip width divided by `block_frac`, and strip s starts its blocks at
  −(s·phase mod 1)·period. Two strip designs alternate, each with a symmetric
  warp (broad colour stripes and thin accents) and a cycle of two or three
  blocks; motifs come from a cell grammar limited to chevrons, ladders,
  diamonds, stepped diagonals, half-checks and nested squares, exactly
  symmetric and kept clear of the block's edge.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  strips_share_period_and_tile_the_cloth_exactly`. Tested: every block on
  every strip starts on the common period; neighbouring strips are offset by
  exactly `phase` of a period (never zero); the pieces cover the cloth with
  no gap or overlap (areas sum to the cloth, pairwise intersections empty);
  all ink stays on the page for every option and extreme size.
