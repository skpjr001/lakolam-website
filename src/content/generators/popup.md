---
title: "Pop-up Cards"
blurb: "Pop-up cards — 90° origamic architecture: cities, castles, staircases and ziggurats cut and folded from one sheet, fold-checked open and closed"
category: design
version: "1.0.0"
---
One sheet of card, cut and folded: open it to a right angle and a city, a
castle, a staircase or a stepped pyramid stands up out of the fold — close
it and everything folds flat again.

## What it is

A 90° pop-up card in the style of origamic architecture: no glue and no
extra pieces, just cuts and folds in a single sheet. The page prints the
flat card at actual size — solid cut lines, dash-dot mountain folds and
dashed valley folds — with a picture of the card standing open beneath
it. Four motifs: a **city** skyline of blocks, setback buildings and
towers with rows of windows; a **castle** of battlemented towers and
walls with arrow slits; a **staircase** between two pillars, sometimes
with lower flights either side; and a **ziggurat**, a stepped pyramid
crowned with a temple or climbed by a stair up its face.

## How to use it

Print at 100% (actual size, no "fit to page") on card — 160 to 220 g/m²
works well — and check the 50 mm bar with a ruler.

1. **Cut** every solid line with a craft knife and a metal ruler, on a
   cutting mat. Cut the small window rectangles right out. Do not cut the
   outside line until the end, so the sheet stays flat while you work.
2. **Score** every dashed and dash-dot line lightly with an empty ballpoint
   pen or a blunt knife, against the ruler.
3. **Fold.** Hold the card printed side up. Dash-dot lines (mountain folds)
   rise towards you like the ridge of a roof; dashed lines (valley folds)
   sink away from you like a crease in an open book. Push each cut shape
   gently forward from behind while you close the card along the long
   dashed line across the middle: the shapes stand up inside, every step
   and face folding at once.
4. Press the card closed under a book for a few minutes, then open it to a
   right angle. Cut round the outside line, and mount the card on a
   slightly larger folded card of a contrasting colour if you like —
   the cut-outs then show the colour behind.

## Purpose

Pop-up cards are a satisfying craft with a touch of engineering: a few
straight cuts turn a flat sheet into a little building. Ready-to-cut
templates make them easy to start, and the variety of motifs and sizes
suits birthday and holiday cards, classroom geometry lessons and
architecture models.

## History

Origamic architecture was developed by the Japanese architect Masahiro
Chatani in the early 1980s, who made pop-up cards cut from a single sheet
as greetings and published many books of patterns, with Keiko Nakazawa
and Takaaki Kihara. Earlier movable books, from Lothar Meggendorfer in the
nineteenth century to the paper engineers of the twentieth, used glued
pieces; Chatani's cards use only cuts and folds. The mathematics was
studied later: the 90° designs in which every fold is parallel to the
spine were characterised by Erik Demaine and colleagues (2013), who
showed that any such polygonal shape can be built, and Low and others
(2013) automated the design of 90° pop-ups from 3D models.

## This implementation

- **Spec knobs:** `width`, `height`, `margin` (page, in points); `motif`
  (`city`, `castle`, `staircase`, `ziggurat`); `count` (buildings, towers,
  steps or tiers, 1–12 — fewer if they do not fit, reported as
  `requested_count`); `card_width_mm` (along the spine, 60–250) and
  `card_height_mm` (the folded card's height, 50–200); `min_feature_mm`
  (narrowest strip, face, gap or window margin, 2–15); `windows` (ignored
  for the staircase); `preview` (the opened card); `labels` (title, line
  legend, 50 mm check bar); `line` (cut-line weight). Any value out of
  range is clamped and reported as `requested_<field>` in meta.
- **Generation:** the parallel-fold model. The sheet is divided across the
  spine into columns, each following a staircase path from wall to floor
  (out, down, out, down — a box, a setback block, a flight of steps, a
  tier). A path that starts at height `z0` on the wall and ends `y1` out on
  the floor has length `z0 + y1`, exactly the stretch of sheet it is cut
  from, so it always folds flat. The seed lays out the motif: building
  widths, gaps, heights and depths, setbacks and towers; tower and wall
  heights, the keep and the battlements; stair proportions, pillars and
  side flights; tier proportions and the crown — and the paper colour of
  the preview. Plain card is kept at both ends and above and in front of
  every shape (about 8% of the card) so the sheet stays strong. Each
  convex corner satisfies `out + up ≤ card height − margin`, so nothing
  peeks out of the closed card. Cuts run along a column's sides wherever it
  parts company with its neighbour; windows are cut from the front faces
  in a centred grid (or slits), clear of every edge. Neighbouring columns
  with the same path merge. If a combination is too tight for the motif
  (a tiny card with a huge minimum feature) a single plain block is used
  and meta says `simplified` with `requested_motif`. The page lays out the
  flat card true size where the page allows (`true_size`), scaling it down
  otherwise (`print_scale`), with the preview below or beside.
- **Solving:** nothing to solve — a craft template.
- **Guarantees:** every page passes `fold_checked`. The card is
  re-simulated from the flat drawing alone — a set of rigid rectangles,
  each horizontal or vertical when standing — at 0°, 30°, 45°, 60°, 90°,
  135° and 180°: the patches tile the sheet; laid flat they are exactly the
  printed drawing; every edge two patches share stays joined at every
  angle unless it is cut; folds run parallel to the spine and cuts across
  it; the sheet is one connected piece; nothing passes behind the wall,
  under the floor or (closed) past the card's edge; no two faces collide
  while it opens; windows sit inside their faces; and every strip, face
  and window margin is at least `min_feature_mm`. Tests rebuild each open
  card independently from the column paths, and show the checker rejects
  a torn face, a missing cut, a cut that frees a piece, a box that sticks
  out of the closed card, a face turned the wrong way, a too-thin face and
  a window on an edge. The preview is drawn by painting columns left to
  right, each from the back, which is exact for this viewing angle. Not
  modelled: paper thickness (very thick card wants a slightly smaller
  design) and curved or slanted (non-90°) pop-ups.
