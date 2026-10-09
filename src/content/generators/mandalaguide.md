---
title: "Mandala Guide"
blurb: "Mandala guide paper — concentric rings and equal symmetry sectors, with intersection dots and a centre mark"
category: paper
version: "1.0.0"
---
Blank radial guide paper for drawing your own mandalas — concentric rings,
equal symmetry sectors, dots where they cross and a centre mark.

## What it is

A light scaffold for circular, symmetric designs:

- **Rings** — 2 to 40 concentric circles at equal steps (6 for simple
  designs, 12 standard, 16–20 for detailed work). Every second or fourth
  ring, and the outer circle, is a little heavier so you can count them.
- **Sectors** — lines from the centre dividing the circle into equal wedges,
  the fold of the symmetry: 4 (a cross), 6 (hexagonal), 8, 10, 12 (classic),
  16 or more. The first points straight up, and lines along a quarter turn
  are heavier.
- **Dots** at every place a ring crosses a sector line — anchors for petals
  and points.
- **Half-sector lines**, dashed, if you want a mirror line inside each wedge.
- **A centre crosshair** to start from.

## How to use it

Print the sheet and draw in pencil first. Start at the centre and work
outwards one ring at a time: draw a shape in one wedge, then repeat it in
every wedge, using the dots and lines to place each copy exactly. Use the
dashed half-sector lines to make each motif mirror-symmetric. When the
design is finished, ink it and erase the pencil — or print the guide in a
pale colour and colour straight over it.

You can also lay a thin sheet of paper over the guide and trace through, so
the guide is never part of the finished drawing.

## Purpose

Mandala drawing and colouring for relaxation and art therapy, radial
symmetry lessons in maths and art classes, rosettes, compass roses, dot
mandalas, stained-glass and embroidery design, and rotational patterns for
logos. A section of guide pages makes a mandala-drawing workbook.

## History

"Mandala" is Sanskrit for "circle"; mandalas are central to Hindu and
Buddhist art, where they are laid out with careful geometry around a
centre. Circular, symmetric designs appear in many other traditions too,
from rose windows to Islamic geometric ornament. In the 20th century the
psychiatrist Carl Jung encouraged drawing mandalas as a reflective exercise,
and mandala drawing and colouring later became a popular pastime, with guide
sheets like this one to keep the symmetry true.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `rings` (2–40, default 12);
  `sectors` (2–72, default 12); `dots`; `crosshair`; `bisectors` (dashed
  half-sector lines); `ink` (named paper colours, default light_gray;
  light_blue, light_purple and light_green are the usual alternatives);
  `weight` in points (0.1–2).
- **Generation:** the outer circle is the largest that fits the content box,
  centred; ring i has radius i/rings of it, and sector k points k/sectors of
  a turn clockwise from straight up. With 8 rings or fewer every second ring
  is heavier, otherwise every fourth; the outermost always is. Sector lines
  pointing along a quarter turn are heavier.
- **Solving:** nothing to solve — a page to draw on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** rings step out by exactly the same distance and sectors are
  exactly equal (checked on every page size and orientation for 2–40 rings
  and 4–16 sectors); all ink, dots and stroke widths included, stays inside
  the margins. A knob outside its range is clamped and recorded as
  `requested_<field>` in the meta.
