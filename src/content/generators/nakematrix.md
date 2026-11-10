---
title: "Nake Matrix"
blurb: "Plotter drawings in the spirit of Frieder Nake's Hommage à Paul Klee: bent bands of hatching chosen by a Markov matrix"
category: design
version: "1.0.0"
---
Bent bands of plotter hatching, filled field by field by a Markov chain — in
the spirit of Frieder Nake's *Hommage à Paul Klee* (1965).

## What it is

A pen drawing built from a few simple marks. Horizontal rule lines run
across the page, each bending a little at a few points, and cut it into
bands. Each band is cut again into fields, and every field is filled with
one kind of mark: upright hatching, hatching that rises to the right,
hatching that falls to the right, or nothing at all. What comes next is
decided by a small table of chances — after upright hatching, say, more
upright hatching is likely and an empty field is rare — so fields of the
same kind gather into runs and the page has a rhythm of its own. A few
circles and triangles are scattered among the bands. Under the drawing the
table itself is printed, like the listing a plotter program would print,
beside a count of what actually happened on this page.

It comes as black pen on cream paper, in coloured pens (each run of fields
takes a pen), or as white lines on black.

## How to use it

Print it as a poster or a card, or send the lines to a pen plotter. Compare
the two tables under the drawing: the left one gives the chances, the right
one counts what the page did — a page with a "sticky" table has long calm
runs, a "restless" one changes at almost every field. Turn the printed table
off for a clean picture. Fewer bands give large, bold fields; more bands and
fields give a dense weave closer to Klee's painting.

## Purpose

The page shows how a short rule plus chance can make a picture that looks
composed. A Markov chain — "the next choice depends only on the last one" —
is one of the simplest models of style, and here you can see one at work:
the table of chances is the whole recipe, and the drawing is one run of it.

## History

Frieder Nake (born 1938) was a mathematics student in Stuttgart, working at
the university's computing centre, when he began writing drawing programs
for its SEL ER 56 computer and Zuse Graphomat Z64 flatbed plotter in the
early 1960s. In November
1965 he showed them with Georg Nees at the Galerie Wendelin Niedlich in
Stuttgart, one of the first exhibitions of computer art. His *Hommage à Paul
Klee 13/9/65 Nr. 2*, plotted on 13 September 1965, took Paul Klee's painting
*Hauptweg und Nebenwege* (Highways and Byways, 1929, Museum Ludwig,
Cologne) as its starting point: horizontal bands with bent edges, filled
with vertical and oblique lines, with a few circles and triangles. Nake set
a framework of horizontals and verticals and let random variables decide
among the options; the drawing was later screenprinted in an edition (the
Victoria and Albert Museum holds one). Nake worked within Max Bense's
information aesthetics, which measured order and chance in pictures, and in
his series *Walk-Through-Raster* (1966) each sign was chosen from the one
before it by a probability distribution — the idea behind the matrix used
here. These pages are original compositions in that spirit; they do not
reproduce any of Nake's works.

## This implementation

- **Spec knobs:** `width`, `height` (144-2000 pt), `margin` (0-144 pt),
  `bands` (3-30, default 11), `bends` per rule line (0-8, default 3),
  `fields` per band at least (1-24, default 7), `matrix` (seeded, sticky,
  restless, uniform), `figures` (0-1, the chance a band gets a circle or
  triangle, default 0.45), `look` (pen, pens, inverted), `program_output`
  (print the matrix and the observed counts), `stroke` (0.25-3 pt). Values
  outside a range are clamped and reported as `requested_<field>`.
- **Generation:** the drawing area is a lattice of 32 columns. Band heights
  are random gaps scaled to fill the area. Each inner rule bends at
  `bends` lattice columns, each bend moved up or down by less than a third
  of the smaller neighbouring gap, so neighbouring rules never touch. A
  band is cut at the bends of both its rules plus random lattice columns
  until it has `fields` fields; every field is then a trapezoid with
  vertical sides and straight top and bottom. The matrix is in hundredths,
  every row summing to exactly 100 (seeded rows lean towards staying put).
  One chain walks the fields in reading order across all bands. Runs of
  equal fields share one spacing, angle (30-65°) and pen, and their lines
  sit on one phase, so a run reads as one field. Vertical lines run from
  rule to rule; oblique lines are clipped to the field (a convex
  quadrilateral). A divider is drawn where the element changes. A figure
  goes in the roomiest of four sampled fields of its band, with a radius
  under the distance from its centre to every side.
- **Guarantees:** deterministic per seed. `verification:
  lines_within_bands`: both ends of every hatch line and divider lie
  between their band's two rules and their field's sides (fields are
  convex, so the whole line does), every figure with its pen width lies in
  its field, and every rule lies strictly below the one above. The tests
  re-check this by interpolating the rules afresh, check the observed
  transition frequencies over thousands of fields against the matrix
  (within four standard errors) and a long chain against its stationary
  distribution, show that a line pushed out of its band is caught, and
  check that all ink stays on the page at every knob's ends. Meta carries
  the matrix, its stationary distribution, the observed transition counts
  and the fields of each element.
