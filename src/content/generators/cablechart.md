---
title: "Cable Chart"
blurb: "Aran cable panel charts — ropes, braids, honeycomb, XOXO and travelling diamonds on a purl ground with standard cross symbols and written rows, every row re-knit as a permutation and the vertical repeat closed"
category: design
version: "1.0.0"
---
Aran cable panel charts: ropes, braids, honeycomb, XOXO and travelling
diamonds on a purl ground, with written rows, every row knitted again before
it is printed.

## What it is

A knitting chart for an Aran-style cable panel, the kind worked up the front
of a fisherman sweater or along a scarf. A centre panel (a travelling
diamond, honeycomb, XOXO or a plait) is flanked by narrower cables (ropes,
waves, braids, horseshoes and twisted columns), mirrored left and right and
separated by columns of reverse stocking stitch or moss stitch. Each square is
one stitch: blank for knit, a dot for purl, and the standard cable-cross
symbols for crosses such as 2/2 RC and 2/1 LPC. The cable stitches can be
tinted so the cords read at a glance. A key under the chart says how to work
every symbol, and a second page gives the same pattern in words, row by row.

## How to use it

Cast on the number of stitches in the title. Read the chart from the bottom
up. Right-side rows have their numbers on the right and are read right to
left; wrong-side rows have their numbers on the left and are read left to
right, knitting the stitches that show as dots and purling the blank ones.
Stitch 1 is at the right-hand edge. Work a cross as its key line says: slip
the stitches to a cable needle, hold it at the back for a right cross or in
front for a left cross, work the next stitches, then work the ones from the
cable needle. When you reach the top, start again at row 1. A red line marks
each repeat. If you prefer words, the second page spells out every row of one
repeat. The flanking cables are mirror images of each other, so the panel can
be centred on the front of a sweater with an edge of plain or moss stitch on
either side.

## Purpose

Cable charts go wrong in quiet ways. A cross drawn one square too wide splits
a cord, a purl cross drawn the wrong way round puts a purl stitch in front of
a cable, and a repeat that does not quite close leaves a rope one stitch off
when the chart is stacked. Each chart here is knitted again by following
every stitch through every row. A row must use exactly the stitches it makes,
every cord must stay whole and in order, and at the top of the repeat the
cords must stand where they started. The written instructions are read back
and must give the same chart.

## History

Twisted and crossed stitches are old. They appear in Bavarian and Austrian
knitting and in the fishermen's ganseys of Britain and the Channel Islands.
The heavily cabled Aran sweater grew up on the Aran Islands off the west
coast of Ireland in the early 20th century. A photograph in *Mary Thomas's
Knitting Book* (1938) brought it to wider notice, and in the 1950s writers
and traders such as Heinz Kiewe made it famous. They also gave the stitches
romantic stories, such as fishermen's ropes and honeycomb bees. Barbara G.
Walker's *Treasury* books and the designs of Elizabeth Zimmermann and Alice
Starmore made cables part of every knitter's vocabulary. Charts largely
replaced row-by-row words from the 1970s on. The symbols and names here
follow the Craft Yarn Council's chart conventions, such as 2/2 RC and 2/1 LPC.

## This implementation

- **Spec knobs:** `centre` (auto, diamond, honeycomb, xoxo, braid,
  horseshoe, rope, wave, twist), `panels` (1–9 across, rounded up to odd),
  `cross_rows` (4–16 rows between rope crossings, rounded to a multiple of
  4), `cord` (2–3 stitches per cord), `gutter` (1–6 ground stitches between
  panels and at the edges), `fill` (purl, moss), `repeats` (1–4 vertical
  repeats drawn), `style` (shaded, symbols), `tint` (auto, cream, blue, sage,
  rose, grey; ignored for symbols), `width`, `height` (144–3000 pt).
  Out-of-range values are clamped and reported as `requested_*`.
- **Generation:** the seed picks the centre (when auto) and the flanking
  cables, never two alike side by side. It also picks each rope's direction
  and the row at which each panel first crosses. The left flanks are mirrored
  to the right, with right crosses becoming left crosses. Ropes cross every
  `cross_rows`. Braids, honeycomb and XOXO cross every half of that, and waves
  alternate direction. A diamond's two cords cross at the waist, then travel
  one stitch a right-side row with 2/1 purl crosses (3/1 for wider cords), out
  `cross_rows / 2 − 1` stitches and back, so it is two `cross_rows` tall.
  Crosses fall only on right-side rows. The chart is a whole number of
  repeats of the least common multiple of the panels' heights.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed. The chart is knitted again stitch
  by stitch
  (`verification: chart_reknit_rows_permute_cords_whole_repeat_closes`):
  - every row is a permutation of the stitches, so the count never changes;
  - a cross moves stitches only within its own adjacent block;
  - the front of every cross is cable stitches, a purled back group is
    ground and a knitted one cable, and no cable stitch is ever purled;
  - every cord stays whole and in order after every row, so nothing is split
    or merged;
  - after each repeat the cords stand on their starting columns (the repeats
    until each cord is home again are given as `strand_period`);
  - the written rows parse back to the chart.

  Tests re-check closure with an independent column-only permutation, check
  the cross names and their working against the standard abbreviations,
  refuse hand-broken charts, check mirror symmetry, show every option
  changes the page, and sweep every boundary value for a finite page inside
  its bounds.
