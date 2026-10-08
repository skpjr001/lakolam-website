---
title: "Crochet Chart"
blurb: "Crochet symbol charts — granny squares, solid grannies, flat circles and mandalas with a key, colourway and written rounds, every count re-derived from the placed stitches against the flat-circle and square-corner rules"
category: design
version: "1.0.0"
---
Crochet symbol charts worked in the round: granny squares, solid grannies,
flat circles and mandalas, with a key, a colourway and written rounds.

## What it is

A symbol chart for a piece of crochet worked in rounds from a magic ring,
drawn with the standard chart symbols: an oval for a chain, a dot for a slip
stitch, an X for single crochet, a T for half double crochet and a T with one
slash for double crochet. Every stitch is drawn from the place it is worked
into, so clusters fan out of their chain space and increases spread out of
their stitch in a V. Each round is shaded in its yarn colour and numbered.
The page also carries a key to the symbols and yarns and the written
instructions round by round in US terms, each ending with its stitch count.

The charts are a classic granny square (clusters of three double crochet with
chain spaces between), a solid granny square, a flat circle in single, half
double or double crochet, and a mandala that mixes increase rounds with lacy
chain-space rounds.

## How to use it

Read the chart from the centre outwards, one round at a time, starting where
the chain stack or the small triangle marks the start of the round. Work
round the chart in the direction the stitches follow and finish each round
with a slip stitch into the top of its first stitch (the dot). Where several
symbols spring from one place, work them all into that stitch or space. A
filled triangle means fasten off the old colour and join the new yarn there;
when a square is worked in one colour, slip stitch across the dots to the
next corner instead. Check your stitch count at the end of every round
against the number in brackets in the written instructions. If a circle
ruffles, try a smaller hook; if it cups, try a larger one. The flat-circle
counts are the usual rule of thumb, and your yarn and tension have the last
word.

## Purpose

A chart and its written pattern have to agree with each other and with how
crochet behaves. A flat circle gains the same number of stitches every
round: six for single crochet, eight for half double and twelve for double.
A granny square has four corners every round, and each side grows by the
same amount: one cluster of three on a classic granny, four stitches on a
solid one. The counts on this chart are not typed in. They are counted
again from the symbols on the page, and each must equal the count printed
in the instructions and the rule for its shape.

## History

Crochet as we know it appeared in Europe in the early 19th century, and the
granny square became one of its signature motifs. Squares worked in rounds
of clusters appear in pattern books from the late 1800s, and the granny
square blanket became an icon of 1960s and 1970s craft. Symbol charts were
developed in Japan in the mid-20th century as a language-free way to write
patterns, and the Craft Yarn Council later published a standard set of
symbols for English-language patterns. Mandalas, colourful circles of
crochet, became a popular modern form in the 2010s.

## This implementation

- **Spec knobs:** `kind` (auto, granny, solid, circle, mandala); `stitch`
  (auto, sc, hdc, dc; flat circles only, and choosing one with kind = auto
  makes a circle); `rounds` (2–12); `colours` (1–5, no more than the
  rounds); `palette` (auto, meadow, sunset, ocean, berry, mono);
  `instructions` (print the written rounds); `width`, `height`
  (144–3000 pt). Out-of-range values are clamped and reported as
  `requested_*`.
- **Generation:** every round is a list of placed symbols, each recording
  what it is worked into: the ring, a stitch of the round below or a chain
  space of the round below. A classic granny round works `(3 DC, CH 2, 3 DC)`
  into every corner space and three double crochet into every chain-1 space,
  with a chain 1 between clusters. A solid granny works a double crochet into
  every stitch and `(2 DC, CH 2, 2 DC)` into each corner. A flat circle puts
  6, 8 or 12 stitches in the ring, then works `*S IN NEXT n STS, 2 S IN NEXT
  ST*` round. A mandala uses the double-crochet circle and turns some rounds
  lacy, with a chain 1 in place of each extra stitch. The seed picks the
  kind and stitch on auto, the lacy rounds, the yarns from the palette and
  the colour of each round once every yarn has had a turn (never the same
  as the round before), and the corner a square starts at. Each symbol is
  drawn from the top of what it is worked into to its own place on the
  round, halfway between even spacing and straight above its base.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed. Every round is counted again from
  its placed symbols alone
  (`verification: counts_rederived_from_placed_stitches_flat_and_square_rules`).
  The stitches and chain spaces counted must equal the counts printed in the
  instructions. Every stitch must be worked into the ring (round 1 only), a
  real stitch or a real chain space of the round below. What the stitches
  are worked into must run once round in order, so no two stitches cross.
  The round below must be worked as the pattern says: every stitch and
  space of a circle at least once; every chain-1 space of a granny once and
  each corner twice; every stitch of a solid granny once and each corner
  twice. For circles, stitches plus chain-1 spaces of round r must be
  6r, 8r or 12r. For squares, there must be four corner spaces, four equal
  sides, and sides of 3, 6, 9… (classic) or 3, 7, 11… (solid) stitches.
  Neighbouring rounds must differ in colour when there are two or more
  yarns. Tests check the textbook counts directly, refuse charts broken by
  hand (a missing stitch, a wrong printed count, crossed stitches, a stitch
  worked into a chain, two rounds in one colour), show every option changes
  the page, and sweep every boundary value for a finite page inside its
  bounds. "Lies flat" is the standard rule of thumb, not a physical
  simulation.
