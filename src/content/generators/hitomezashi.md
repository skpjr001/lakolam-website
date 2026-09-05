---
title: "Hitomezashi"
blurb: "Hitomezashi stitch patterns — two bit sequences, emergent two-colourable loops"
category: design
version: "1.0.0"
---
Stitch patterns from two sequences of coin flips: dashed lines alternate
on-off along every row and column, each line's starting phase is one bit, and
the stitches join into closed loops that tile the page.

## What it is

Hitomezashi ("one-stitch") is a style of sashiko, the Japanese running-stitch
embroidery used since the Edo period to strengthen and mend workwear. On a
grid, the whole design is determined by one bit per row and one per column —
and the emergent structure is the point: the segments always close into
loops, and the enclosed regions are exactly two-colourable, which makes every
page a natural colouring design.

## How to use it

Colour the regions with two colours (it always works — that is a theorem),
or follow any single loop with a pen. The `bias` knob stretches the texture:
balanced coin flips give long snaking regions, near-uniform phases collapse
into a regular weave of small cells.

## History

Sashiko needlework is documented from Japan's Edo period (1603–1868);
hitomezashi is its grid-aligned single-stitch family. The mathematical
structure — phase sequences, loop closure, two-colourability — was popularised
by Annalisa Crannell and Katherine Seaton's work and a 2021 Numberphile
episode, which is what turned a stitching pattern into a generative-art
staple.

## The implementation's guarantees

- The alternation invariant is tested per line, and the emergent regions are
  **measured, not assumed**: the page's metadata reports the region count and
  the smallest region from a flood fill over the actual segments.
- The bias knob's effect is pinned by a test — in the direction the
  measurement showed, which was the opposite of the first guess: extreme bias
  gives *more*, smaller regions (a regular weave), not fewer.
- Colourability runs with the adult rules; the escalation lever is stroke
  weight, since the pattern itself is fixed by its sequences.
- Rating basis: none — it is a design. The honesty fields are the region
  statistics and the segment count.
