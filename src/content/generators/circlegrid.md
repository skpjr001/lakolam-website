---
title: "Circle Grid Paper"
blurb: "Circle grid paper — circles 5 mm to 1 inch on a square or hexagonal lattice, separate, touching or interlocking"
category: paper
version: "1.0.0"
---
Rows of exact circles — separate, touching, interlocking or overlapping —
on a square or honeycomb layout.

## What it is

A sheet of equal circles, 5 mm to 1 inch across, with their centres on a
lattice. On the **square** layout each circle has four nearest neighbours;
on the **hexagonal** (close-packed) layout, rows are shifted half a step and
each circle has six. The **fit** sets how close neighbours are:

- **Separate** — a gap of a quarter of a diameter, room to cut or stitch
  round each circle (the penny-rug layout).
- **Touching** — neighbours just meet, like bubble wrap.
- **Interlocking** — circles cross so that four meet at the centre of each
  square gap, or three at the centre of each triangular gap.
- **Flower** — every circle passes through the centres of its neighbours:
  on the hexagonal layout, the classic overlapping-circles "flower" pattern.

Any spacing from half a diameter to two diameters can also be set directly.

## How to use it

Print the page at actual size ("Actual size" or "100%" in the print dialog)
so each circle measures exactly its stated diameter.

Plan a penny rug or a button, bead or sequin layout by colouring the circles
you will use. Cut the circles out as templates for felt, fabric or paper.
Draw faces, planets, fruit or bubbles in each circle for cartoons and
stickers. On the interlocking and flower fits, colour the petals and lens
shapes where circles overlap to make geometric ornament; turn on centre dots
when you need to place a compass point or a stitch at each centre.

## Purpose

For quilters, rug hookers and felt crafters planning penny rugs and circle
appliqué; for teachers and children doing colouring, counting and
pattern work; for artists drawing dot art and overlapping-circle ornament;
and for anyone laying out round stickers, labels or buttons. In a book,
circle grid sections make a craft-planning or pattern-colouring workbook.

## History

Overlapping circles are among the oldest geometric ornaments: the
hexagonal pattern appears on an Assyrian palace threshold of the 7th century
BC, now in the Louvre, and in Roman mosaics, and the square form is the
kawung motif carved at the 9th-century temples of Prambanan in Java. Penny
rugs — mats of felted wool circles cut round coins used as templates, then
stacked and stitched — were made in America from the mid-1800s from
clothing scraps. Circle graph paper is printed for these crafts and for
drawing, with the circles on the same square and close-packed layouts.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `arrangement` (square,
  hexagonal); `diameter` (mm5, mm10, mm15, mm20, mm25, quarter_inch,
  half_inch, three_quarter_inch, inch); `fit` (separate, touching,
  interlocking, flower); `spacing_ratio` (0.5–2, centre distance ÷
  diameter, replaces `fit` when set); `ink`; `weight` (0.1–2 pt);
  `centre_dots`.
- **Generation:** the centre distance is `ratio × diameter`: separate 1.25,
  touching 1, interlocking 1/√2 on the square layout (the circle through a
  square's corners has radius side/√2) and √3/2 on the hexagonal one (the
  circle through a triangle's corners has radius side/√3), flower 1/2. Square
  centres sit on a lattice of that spacing; hexagonal rows sit `spacing ×
  √3/2` apart with alternate rows shifted half a step. Only whole circles
  are drawn, as many as fit, and the layout is centred in the content box.
  All circles are one path.
- **Solving:** nothing to solve — a page to draw, colour and plan on. The
  seed is unused: every seed gives the same sheet.
- **Guarantees:** every circle has exactly the stated diameter, nearest
  centres are exactly `ratio × diameter` apart with four (square) or six
  (hexagonal) such neighbours, interlocking circles pass exactly through
  the gap centres, and every circle with its stroke lies inside the margins
  on every page size, orientation, diameter and fit (all checked in the
  tests). A knob outside its range is clamped and recorded as
  `requested_<field>` in the meta.
