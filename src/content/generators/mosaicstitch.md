---
title: "Mosaic Stitch"
blurb: "Mosaic crochet and mosaic knitting charts — one colour a row, every drop and slip proven legal by re-making the fabric, as a chart, stitched preview or row-by-row pattern"
category: design
version: "1.0.0"
---
Mosaic crochet and mosaic knitting charts: two colours, one at a time, and
every stitch on the chart one you can actually work.

## What it is

A chart for one of the two "mosaic" crafts, where a two-colour picture is
made without ever holding two yarns at once. Rows take turns: one row (or
pair of rows) in colour A, the next in colour B. The other colour shows
through where a stitch reaches down to the row below.

The design is a blanket square, with a medallion of diamonds, stars,
lattices, squares or crosses inside a framed border, or stacked bands of
repeating motifs for a scarf or blanket strip. Every page is a chart with
row numbers and row colours, a preview of the finished fabric, or the
written row-by-row pattern.

## How to use it

**Crochet (overlay mosaic).** Chain one more than the stitch count in
colour A and work row 1 in single crochet. After that, work every row from
the right side, right to left, in the colour shown at the end of its row,
and fasten off at the end of each row. A plain square is a single crochet in
the back loop; work the first and last stitch of each row through both
loops. A square with an X is a double crochet in the front loop of the
stitch two rows below: it lies over the stitch in between and covers it, so
that square shows your working colour. Every X sits on a square of its own
colour, and no X is ever stacked straight on another X.

**Knitting (mosaic).** Each chart row is two rows: knit across on the right
side, then purl back on the wrong side, both in the colour at the end of the
row. A plain square is knitted (and purled back). A square with a dot is
slipped purlwise: with the yarn at the back on the right side, and with the
yarn in front on the wrong side. The slipped stitch carries up the colour of
the row below. Never slip the edge stitches. Carry the unused yarn loosely
up the side.

Read the chart from the bottom right. Thick lines mark every ten stitches
and rows. On a banded chart the red box shows one repeat. The black-and-grey
version prints well on any printer; colour A is white, colour B grey.

## Purpose

Mosaic charts are easy to draw and easy to get wrong. A picture that looks
fine as squares can ask for a double crochet on top of a double crochet, or
for a stitch to be slipped twice so it shows its own colour. Picture-to-chart
tools often do this, and the mistake only shows up half a blanket later.
Every chart here is checked by working it: the fabric is rebuilt stitch by
stitch from the instructions, and it must come out as the picture.

## History

Barbara G. Walker named and charted "mosaic knitting" in the 1960s and
1970s, in *A Second Treasury of Knitting Patterns* (1970) and *Mosaic
Knitting* (1976). Her method used two rows of one colour and slipped
stitches, and gave hundreds of geometric patterns a simple chart. Mosaic
crochet came later, in two forms: inset mosaic, with chain spaces, and
overlay mosaic, with back-loop single crochet and front-loop double crochet
dropped two rows. Overlay mosaic spread in the 2010s through designers'
charts marked with an X, and it has since become one of the most popular colourwork methods in crochet.
Both crafts grew out of geometric bands, Greek-key meanders, stepped
diagonals, stars and diamonds, and those are the forms the generator uses.

## This implementation

- **Spec knobs:** `craft` (crochet, knitting), `layout` (square, bands),
  `motif` (auto, diamonds, stars, lattice, squares, crosses), `output`
  (chart, preview, written), `stitches` (15–121), `rows` (11–161, bands
  only), `max_slips` (2–4, knitting), `palette` (auto, teal, navy, mustard,
  plum, forest, rust), `line_art`, `width`, `height`.
- **Generation:** a target picture is drawn from folded coordinates (the
  distance across and up from the centre), so it is mirror-symmetric both
  ways. A square is a frame with toothed corners, an outlined centre
  medallion in one motif and a surrounding field in another. Its size is
  rounded to 4n + 3 stitches, so the centre row is a colour-B row. Bands are
  palindromic stacks of 4k + 1-row bands (outlined diamonds, crossing
  diagonals, battlements, chevrons, crosses) on B-centred rows, separated by
  a B stripe. They repeat across a whole number of repeats plus three
  stitches. The picture is then made legal. Call a cell *off* when it shows
  the other row's colour. Off cells may not touch vertically, and the edges
  and first and last rows must be plain. Each column takes the legal
  pattern of off cells nearest to the picture. This is a small dynamic
  programme over the lower half of the column, mirrored, so the top-bottom
  symmetry is kept. In knitting, runs of more than `max_slips` slipped
  stitches are split symmetrically. Those changes only remove off cells, so
  legality is kept.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed. In crochet, a cell is worked as an
  X exactly when the cell below is off. In knitting, a cell is slipped
  exactly when it is off. The chart is then re-worked from these
  instructions alone. Every X has two rows below it and a single crochet
  between (no drop on a drop). Every slip brings up the other colour (no
  stitch slipped twice). Edges are never dropped or slipped, slip runs stay
  within the cap, and the fabric that results is exactly the chart
  (`verification`, `legal` in the metadata). Tests recheck the picture rule
  directly, refuse hand-made illegal charts, prove the column repair is
  minimal by exhaustion on short columns, re-read the written pattern back
  into stitches, check both mirror symmetries and sweep every option and
  boundary. The written pattern shrinks its type to fit the page. If a very
  large chart still does not fit, it ends with "follow the chart" and
  `written_rows_shown` says how many rows were written out.
