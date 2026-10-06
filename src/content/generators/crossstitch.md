---
title: "Folk Cross-Stitch"
blurb: "Folk cross-stitch band samplers: charts with symbol keys, stitch counts and finished sizes"
category: design
version: "1.0.0"
---
Band samplers to stitch: a border, rows of diamonds, stars and hooked
lozenges, zigzag dividers — charted with a symbol key, stitch counts and
finished sizes.

## What it is

A cross-stitch chart for a sampler in a generic folk style. A border of
solid and dotted lines frames the cloth; inside, bands run across it from
top to bottom: large motifs repeated side by side, smaller motifs between
them, and zigzag or dotted dividers. The motifs are built from diamonds on
the stitch grid: a diamond outline with anchor-shaped hooks at its points,
an eight-pointed star, nested stepped diamonds, and a stem with curling
ram's horns. Every band is centred, so the whole sampler is the same on
its left and right. A second page shows a preview of the stitched piece.

## How to use it

Each square on the chart is one cross stitch; its colour and symbol tell
you which thread to use, and the key lists every thread with the number of
stitches and the skeins to buy. Find the middle of your cloth by folding it
in half both ways, and start from the middle of the chart, marked by the
small triangles on its edges; every tenth line is darker to help you count.
Work each stitch as two diagonal stitches, with all the top stitches
crossing in the same direction. The finished size is printed for 14-, 16-
and 18-count cloth: allow at least 5 cm (2 inches) of extra cloth on every
side for framing.

## Purpose

Band samplers are the classic way to practise and show off counted motifs,
and their structure — symmetric motifs repeated in centred bands — makes a
chart that is easy to follow and pleasing to finish. Generating the chart
gives endless new samplers while guaranteeing the things a stitcher relies
on: exact symmetry, whole repeats, and counts that match the chart.

## History

Counted cross-stitch is one of the oldest and most widespread embroidery
techniques: stitches worked over counted threads of an even-weave cloth,
building motifs from the grid itself. Geometric motifs of diamonds, stars,
hooks and horns appear in the embroidery of many peoples across Europe,
the Mediterranean, the Middle East and Asia, each with its own motifs,
colours, names and meanings. The band sampler, a long strip of cloth used
to record and practise patterns, was common in Europe from the sixteenth
century. The designs on these pages are generic and original: they are not
copies of, or labelled as, the embroidery of any particular region, people
or tradition.

## This implementation

- **Spec knobs:** `width`, `height` (the page), `stitches_wide`,
  `stitches_high` (25 to 301, made odd so the design has a middle stitch),
  `palette` (red_black, red_black_gold, blues, garden), `output` (chart,
  preview).
- **Generation:** motifs are bitmaps defined on folded coordinates
  (|x|, |y|); the four-way motifs also depend only on the larger and
  smaller of the two, so they are symmetric under all eight symmetries of
  the square, and the ram's horn under both mirrors. Each motif band uses
  the largest motif that fits its rows, repeated as many times as fit with
  a gap chosen so the leftover splits evenly either side; odd gaps in large
  bands get a small cross. Dividers are a zigzag (a triangle wave measured
  from the middle column) or a dotted row. Bands alternate divider, large
  motif, divider, small motif, and the stack is centred inside a three-row
  border with a clear row inside it. Skein estimates assume about 1,800
  full stitches per 8 m skein of six-strand cotton worked with two strands
  on 14-count cloth, scaled with the stitch size for other counts.
- **Solving:** nothing to solve — a chart.
- **Guarantees:** deterministic per seed. Tested on the finished chart: it
  is its own mirror image across the middle column; every motif band is its
  own mirror image across its middle row; every motif is D2 (D4 for all
  but the ram's horn) and fills its own box; bands lie inside the border
  with the clear row kept; the stitch counts in the key equal the squares
  actually drawn in each colour on the chart; finished sizes are the
  stitch counts over the cloth count; the chart's text uses only drawable
  characters and names no region or tradition.
