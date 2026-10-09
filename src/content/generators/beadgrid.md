---
title: "Bead Graph Paper"
blurb: "Bead graph paper — peyote, brick-stitch and loom charts with bead-shaped cells at an exact size"
category: paper
version: "1.0.0"
---
Bead graph paper for peyote, brick stitch and loom work — one bead-shaped
cell per bead, packed the way the stitch packs the beads.

## What it is

Each cell is one bead, drawn in a bead's proportion and laid out as the
beads lie in the finished piece:

- **Peyote** (gourd stitch) — beads in columns, every other column half a
  bead lower, because each new bead sits in the gap between two beads of the
  row before.
- **Brick stitch** (Comanche stitch) — beads in rows, every other row half a
  bead along, like courses of bricks.
- **Loom** — a straight grid with every bead in line, for loom weaving and
  square stitch.

A bead's proportion is its diameter against its length along the hole. In
peyote and on the loom the thread runs across the work, so each bead shows
its length as its width; in brick stitch the thread climbs up through each
bead, so the bead lies a quarter turn round and the page draws it wider than
tall. The bead size (3, 4, 5 or 6 mm, from 2 to 10 mm) and proportion (0.85,
1, 1.3 or 1.5, from 0.5 to 2) can be set, and beads can be drawn as rounded
rectangles, plain rectangles or ovals. Optional numbers count the columns
along the top and the rows down the left.

## How to use it

Choose the stitch you will bead, then colour one cell for each bead. A chart
at 4 mm is an enlargement — real seed beads are about 1.5 to 4 mm — so you can
colour comfortably; the proportion, not the size, is what keeps your design
true. Cylinder beads look best with a proportion near 1.3; round seed beads
with ovals. Rectangles are the easiest to fill with a marker.

Work peyote charts row by row, zig-zagging across the offset columns; work
brick-stitch charts row by row, each bead attached between two below. Turn
on the numbers to keep your place in a long bracelet.

## Purpose

Design paper for bead weavers: bracelets, earrings, amulet bags, and
pictures in beads. In a book it makes a beading pattern notebook.

## History

Peyote stitch is ancient: artefacts from the tomb of Tutankhamun use it. Its
English name comes from the objects it decorates in the ceremonies of the
Native American Church; it is also called gourd stitch, after the gourd
containers covered in it. Brick stitch, also called Comanche stitch, is the
same weave turned through a quarter, and loom work sets beads in a straight
grid between warp threads. Because a bead is rarely square and the stitches
stagger, ordinary graph paper misleads, and beaders draw on paper whose cells
match the beads.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `stitch` (peyote, brick,
  loom); `bead_mm`, the bead's length along its hole (2–10, default 4);
  `ratio`, diameter ÷ length (0.5–2, default 1.3); `shape` (rounded,
  rectangle, oval); `ink` (gray by default, or tan, blue_gray …); `weight` in
  points (0.1–2); `numbers` (off by default).
- **Generation:** a peyote or loom cell is `bead_mm` wide and `bead_mm ×
  ratio` tall; a brick-stitch cell is the same bead turned, `bead_mm × ratio`
  wide and `bead_mm` tall. As many whole beads as fit are laid out (peyote
  keeps every column the same length, so the block is half a bead taller than
  its rows; brick stitch keeps every row the same length, half a bead wider),
  centred in the content box after room for the numbers. Numbers stand over
  the first row's beads and beside the first column's, and thin to every
  2nd, 5th … when beads are too small to carry each one.
- **Solving:** nothing to solve — a page to design on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every cell is exactly the bead size; cells sit on an exact
  lattice — columns (or rows) one bead apart, the offset exactly half a bead
  in peyote and brick stitch and zero on the loom — so they never overlap
  (checked on every page size, orientation, stitch and a range of bead sizes
  and shapes), and all ink, numbers included, stays inside the margins. A
  knob outside its range is clamped and the request recorded as
  `requested_<field>` in the meta.
