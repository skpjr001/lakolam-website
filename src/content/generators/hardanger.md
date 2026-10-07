---
title: "Hardanger"
blurb: "Hardanger cutwork charts — kloster-block squares, diamonds, stars, crosses and lattices with cut lines, bars and dove's eyes, every cut thread anchored by a kloster block at both ends"
category: design
version: "1.0.0"
---
Hardanger cutwork charts: kloster-block outlines, cut threads, bars and
dove's eyes, with every cut made where it will hold.

## What it is

A counted chart for Hardanger embroidery, the Norwegian whitework of satin
stitch blocks and cut, open squares. The chart shows every fabric thread.
On it are the kloster blocks (five satin stitches over four threads), red
lines where the threads are cut, the bars woven or wrapped over the threads
that remain, and dove's eyes in the holes closed in by four bars. The
motifs are squares, diamonds, eight-point stars, crosses and lattices of
small squares. Each is fourfold symmetric, and four small cut squares can
be set round it. A preview shows the finished work laid on dark cloth.

## How to use it

Work on Hardanger fabric or another evenweave, counting threads from the
chart: every square of the fine grid is one thread, and the heavier lines
mark groups of four. Stitch all the kloster blocks first, each one five
straight stitches over four threads, turning a corner where the chart
turns. Then cut, with small sharp scissors, only where the red lines are:
always at the end of a block, where the stitches run along the threads,
never at its side. Cut the same four threads at the opposite block and draw
them out. Four threads are cut and four are left, all the way across. Weave
or wrap the threads that are left into bars, adding dove's eyes as you
reach the holes marked for them.

## Purpose

The one rule a Hardanger stitcher must never break is to cut only where a
kloster block holds the cut ends. A thread cut at the side of a block, or
where no block is, frays out and opens a hole that cannot be mended. Every
chart here is laid out so that every cut has a block at both ends, turned
the right way. Every bar is held at both ends, every hole is closed in by
bars or blocks, and the motif is the same in all four directions.

## History

Hardanger embroidery takes its name from the Hardanger district of western
Norway. There, white-on-white cutwork decorated bridal and festival costume
in the 18th and 19th centuries. Its roots go back further, to Persian and
Asian counted work and the Italian *reticella* of the Renaissance. Norwegian
emigrants carried it to North America, and the 20th century made it a
favourite of needlework guilds, with kloster blocks, woven bars, dove's eyes
and picots as its signature stitches.

## This implementation

- **Spec knobs:** `shape` (auto, square, diamond, star, cross, lattice),
  `size` (2–8 squares of four threads), `satellites`, `bars` (woven,
  wrapped), `doves_eyes`, `view` (chart, preview), `fabric` (white, ivory,
  ecru, sky; preview only), `width`, `height` (144–3000 pt). Out-of-range
  values are clamped and reported as `requested_*`.
- **Generation:** the motif is a fourfold symmetric set of 4 × 4-thread
  squares to be cut, and notches are filled. Every square just outside that
  touches it along one side gets a kloster block along that side. On a
  stepped outline a square touches the area along two sides, and its block
  goes on the side whose threads are due to be cut, so the blocks turn at
  every step. A ground square that could not hold exactly one block (a
  notch, a one-square gap, or a step corner where both or neither of its
  thread groups are due to be cut) is added to the area until every square
  round it can, so the outline has no gaps. Satellites (small squares or
  diamonds on the axes, the diagonals or both) sit at least two squares
  clear of the motif. Alternate groups of four threads are due to be cut (in step
  with the centre square). A group's run across the area is cut only when
  blocks whose stitches run along it sit at both ends. A square where both
  groups are cut is a hole, one cut leaves a bar, and none leaves the ground
  whole. A diamond's steps need an odd count to turn their blocks, so when
  an outline cannot be cut at the requested size, the nearest size that can
  is used and reported as `size`, with `requested_size` when it differs.
  With `auto` a few shapes are tried. As a last resort a plain square, which
  always works, stands in and `fallback_square` says so; no test case needs
  it.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed. The cut is re-derived from the
  block list alone (`verification: cuts_anchored_by_klosters_both_ends`).
  Every cut run must end at a block on each side with its stitches along
  the cut threads, no two blocks may share a square, every block must
  face the cut area, and every ground square beside the area must hold a
  block (`outline_complete`). The holes and bars must match the cut runs, every bar
  must be held at both ends with no unsupported span longer than one
  square, and every hole must be closed in by bars or blocks. The whole
  chart must have the symmetry of the square. Tests repeat the anchoring
  check thread by thread with an independent stitcher. They check the
  textbook square (5 blocks a side, 3 groups cut each way, 9 holes, 1 dove's
  eye), refuse hand-broken charts, show every option changes the page, and
  sweep every boundary value for a finite page inside its bounds.
