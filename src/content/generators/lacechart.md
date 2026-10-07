---
title: "Lace Charts"
blurb: "Knitted lace charts — eyelet diamonds, leaves, chevrons, zigzags and mesh, every row re-knitted to prove its stitch count balances and every yarn over is paired with a decrease leaning away from it"
category: design
version: "1.0.0"
---
Knitted lace charts in which every row keeps its stitch count and every
hole has the decrease that pays for it.

## What it is

A lace pattern drawn as a standard knitting chart, as a written row-by-row
pattern, or as a picture of the knitted fabric. The designs are eyelet
diamonds (sometimes nested), eyelet leaves, arrowhead chevrons, zigzag
faggoting and an allover eyelet mesh. They are made from the three classic
lace pairs: yarn over then slip-slip-knit, knit-two-together then yarn
over, and a centred double decrease with a yarn over either side. A red box
marks one pattern repeat, and a stitch count runs down the side.

## How to use it

Cast on the number of stitches given and read the chart from the bottom
right. Only right-side rows are charted, numbered 1, 3, 5 and so on. Work
them from right to left and purl every wrong-side row. A blank square is
knit, a circle is a yarn over, a stroke leaning right is K2TOG and one
leaning left is SSK. An upward point with a centre line is S2KP: slip two
together knitwise, knit one, pass the two slipped stitches over. Work the
edge stitches, then repeat the boxed section across, then the other edge
stitches. When the chart is done, start again from row 1. The stitch count
on the right never changes, so if your count is off at the end of a row the
mistake is in that row. Block lace hard when it is finished: pin it out wet
and let it dry, and the holes open up.

## Purpose

Lace is built from pairs: each yarn over adds a stitch and each decrease
takes one away. Charts that lose track of a pair leave a row a stitch long
or short. Charts that use the wrong decrease beside a hole give it a slanted,
half-closed look. Every chart here is knitted through stitch by stitch
before it is printed. Each row uses up exactly the stitches on the needle,
each yarn over sits beside its own decrease, and each decrease leans away
from its hole.

## History

Knitted lace grew up in the 18th and 19th centuries, from the Shetland
shawls of Unst to the Orenburg and Estonian traditions. Eyelet patterns,
feather-and-fan and faggoting appear in Victorian pattern books. In the
1960s and 1970s Barbara G. Walker's *Treasuries of Knitting Patterns*
collected hundreds of lace stitches. Her collection helped make the symbol
chart, with its circles for yarn overs and slanted strokes for decreases,
the standard way to write lace. Today charts are the norm in lace patterns
from shawl designers and yarn companies alike.

## This implementation

- **Spec knobs:** `motif` (auto, diamonds, leaves, chevrons, zigzag, mesh),
  `motif_size` (2–6), `repeats_across` (1–8), `repeats_up` (1–6), `edge`
  (0–6 plain stitches each side), `output` (chart, written, preview), `yarn`
  (auto, cream, rose, sage, sky, heather; preview only), `width`, `height`
  (144–3000 pt). Out-of-range values are clamped and reported as
  `requested_*`.
- **Generation:** one repeat is drawn on a grid of knit stitches by placing
  three balanced units: `yo, ssk` (hole right of its decrease), `k2tog, yo`
  (hole left of its decrease) and `yo, s2kp, yo`. A unit is placed only on
  plain stitches, so units never overlap. Diamonds and leaves set pairs of
  holes at c ± d along their outline, with the decrease on the outer side
  and a centred double decrease at each tip. Chevrons are half-diamonds.
  Zigzags step one stitch a row, with the decrease trailing the line, and
  are sometimes mirrored. The mesh is a half-drop grid of single eyelets or
  double eyelets. Seeds choose the motif (for auto), the gaps between
  repeats, nesting, leaf curvature, chevron direction and the mirrored
  zigzag, plus up to two plain stitches either side of the motif and the
  row the repeat starts on. The repeat is copied across and up between
  plain edge stitches.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed. Every chart is re-knitted from its
  cells (`verification:
  rows_reknitted_balanced_yarnovers_paired_leaning_away`). Each row must use
  exactly the stitches on the needle, and every yarn over must be claimed by
  exactly one decrease beside it: K2TOG takes the hole on its left, SSK the
  one on its right, and S2KP one on each side. Every repeat must also be
  identical, and the edges plain. Tests repeat this with an independent
  knitter that takes stitches off a needle, check the mirror symmetry of
  diamonds, leaves and chevrons, and read the written pattern back into
  stitches. They also refuse hand-broken charts, show every option changes
  the page, and sweep every boundary value for a finite page inside its
  bounds with drawable text.
