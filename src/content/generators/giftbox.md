---
title: "Gift Boxes"
blurb: "Gift boxes and envelopes — true-size cut-and-fold templates for tuck, gable and pillow boxes and envelopes, fold-checked"
category: design
version: "1.0.0"
---
Print, cut, fold, glue: true-size templates for tuck boxes, gable boxes,
pillow boxes and envelopes, with every tab checked against the edge it
meets.

## What it is

A dieline — the flat shape a box is cut from — printed at actual size for
the inside measurements you choose. Four styles: a **tuck box** (the classic
retail carton, with lids that tuck in at top and bottom), a **gable box**
(a peaked roof with a carry handle, like a take-away carton), a **pillow
box** (a soft tube whose curved ends press closed) and a **glued
envelope** in the standard A2, A7, C6, DL and square sizes or sized to your
own card. The outside panels carry a seeded print — confetti, polka dots
or stripes — or can be left plain or white to decorate by hand.

## How to use it

Print at 100% (actual size, no "fit to page") on card for boxes — 160 to
250 g/m² — or paper for envelopes. Check the 50 mm bar with a ruler.

- **Solid lines:** cut.
- **Dash-dot lines (mountain folds):** fold away from you, so the print
  stays outside.
- **Dashed lines (valley folds):** fold towards you.
- **Grey curves (pillow box):** score gently and press the ends in along
  them.
- **Hatched areas:** glue. On the boxes this is the grey side tab: glue it
  inside the far edge of the front panel.

Score every fold first with a ruler and a dry ballpoint pen. For a tuck box,
glue the side seam, then close the bottom: fold in the two small flaps,
fold the base over them and push its tuck flap inside. The lid closes the
same way. For a gable box, close the bottom, then fold the triangular
gussets inwards along their dashed lines as you bring the two roof panels
together; the handles meet back to back. For an envelope, fold in the side
flaps, glue the bottom flap onto them along its hatched edges, slip in the
card and seal the top flap with the hatched strip at its tip.

If the box you asked for is too big for the paper, the template is printed
smaller and the heading says the largest size that fits.

## Purpose

Making your own gift box turns a present into a craft: a box exactly the
size of the thing inside, in a print that matches the card. Templates are
also a gentle introduction to packaging design — how a flat sheet becomes a
solid, why flaps are tapered, why lids tuck the way they do.

## History

Folding cartons date from the 1870s, when Robert Gair, a Brooklyn paper-bag
maker, found that a creasing rule and a cutting rule set in one die could
cut and score cardboard in a single stroke — the birth of the die-cut box
and of the word "dieline". The reverse tuck end became the standard retail
carton; the gable top was patented for milk cartons by John Van Wormer
(1915) and is still the shape of a juice carton; the pillow box is a
favourite of jewellers and wedding favours. Envelopes were folded by hand
until the 1840s, when envelope-folding machines and the penny post made
them everyday objects; the A-series sizes (A2, A7) are American stationery
standards, C6 and DL the ISO sizes for A6 cards and folded A4.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`; `style` (`tuck_box`,
  `gable_box`, `pillow_box`, `envelope`); `inner_width_mm`,
  `inner_depth_mm`, `inner_height_mm` (the inside size, 10–300 mm; the
  pillow box's depth is its thickness; a custom envelope takes the card's
  width and height); `envelope` (`a2`, `a7`, `c6`, `dl`, `square`,
  `custom`); `decoration` (`confetti`, `dots`, `stripes`, `plain`,
  `none`); `labels` (flap names, heading, legend and scale bar); `line`
  (cut-line weight).
- **Generation:** each rigid style is built twice: as flat convex panels
  in millimetres and as the folded box, each panel given its place in 3D.
  Tuck flaps are 55% of the depth (at most 45% of the height), dust flaps
  60% of the depth (at most 45% of the width), glue tabs 30% of the
  smaller side, all tapered. The gable roof rises at 45° to a ridge over
  the middle; its ends fold as milk-carton gussets whose side triangles
  lie flat under the roof (the roof always runs along the longer side, so
  the gussets never collide). The envelope's front is the standard
  envelope size; side flaps are 14% of its width, the bottom flap half its
  height, and the top flap reaches past the bottom flap's edge by 10% of
  the height (at least 10 mm). Fold lines are the edges two panels share;
  every other edge is a cut. The sheet is printed at true size, upright or
  turned a quarter, or shrunk to the largest size that fits. The seed
  picks the colourway and lays out the print, which runs on across folds.
- **Solving:** nothing to solve — a template to make.
- **Guarantees:** rigid styles pass `fold_checked`, an independent check of
  the flat sheet against the folded box: no two panels overlap; every
  placement is rigid; every fold line meets itself in 3D (a torn or
  misplaced panel fails); fold kinds are read off the folded geometry;
  the folded body is exactly the requested inside size with every outside
  panel's printed side facing out; every glue tab, glue strip and tuck or
  dust flap lies flat inside the panel it meets; edges that close the box
  (lid to front, base to back, side seam, gusset to roof, ridge, handle
  holes) are equal in length and meet end to end. The pillow box, being
  curved, passes `tabs_matched`: its glue tab is exactly as long as the
  edge it glues under, and all four end flaps are the same lens whose cut
  arc equals its score arc. Paper thickness is ignored: on heavy card the
  box is a fraction of a millimetre snug. Tests also break dielines on
  purpose (a long tab, a lid off its fold, a wall printed inside, a short
  pillow tab) and confirm the check fails.
