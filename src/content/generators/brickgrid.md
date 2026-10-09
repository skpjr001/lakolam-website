---
title: "Brick Grid"
blurb: "Brick grid paper — running, third or stack bond courses at exact brick sizes"
category: paper
version: "1.0.0"
---
Brick grid paper — courses of equal bricks, each course shifted half a brick
(or a third, or not at all), at exact brick sizes.

## What it is

Horizontal lines mark the courses; short upright lines mark the joints
between bricks, and the joints of each course are moved along from the course
below. Three bonds are offered:

- **Running bond** — every other course shifted half a brick: the wall of
  most brick houses, and the classic "subway tile" layout.
- **Third bond** — each course a third of a brick along from the last, a
  stepped, raking pattern used with long rectangular tiles.
- **Stack bond** — no shift: every joint in line, a plain grid of rectangles.

Bricks are 10, 15, 20 or 25 mm, ½ inch or 1 inch long and 5, 7, 10 or 12 mm,
¼ inch or ½ inch high. At the two ends of the wall the bricks are cut, by
whole halves (or thirds), just as a bricklayer cuts them.

## How to use it

Print at actual size ("Actual size" or "100%" in the print dialog, never "Fit
to page").

Plan a tiled splashback, a patio or a garden path by letting one brick stand
for one tile or paver; count how many whole and cut pieces you will need. Use
it for patchwork "brick" quilts and strip piecing, for drawing walls and
buildings in comics and models, or simply colour the bricks in for a mosaic.
Light terracotta ink looks like a real wall; grey or light blue stays out of
the way of your own marks.

## Purpose

Layout paper for tilers, landscapers, quilters, model makers and illustrators,
and a pattern page for children who like to colour. In a book it makes a
design notebook for home projects.

## History

The running (stretcher) bond, with each course of bricks overlapping the one
below by half a brick, is the most common way of laying brick: the overlap
ties the wall together so no joint runs straight down it. The same offset
became a tiling look of its own with the white 3 × 6 inch glazed tiles of the
New York City Subway, opened in 1904 — now simply called subway tile. Long
modern porcelain tiles are often laid at a third offset instead, because a
long tile is rarely perfectly flat, and setting its middle against the end of
its neighbour shows any bow.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `brick_width` (mm10, mm15,
  mm20, mm25, half_inch, inch); `brick_height` (mm5, mm7, mm10, mm12,
  quarter_inch, half_inch); `bond` (running, third, stack); `ink` (light_gray
  by default, or terracotta, gray, light_blue and every other named paper
  colour); `weight` in points (0.1–2).
- **Generation:** the courses are the largest whole number of brick heights
  that fits, the wall the largest whole number of brick parts (halves for
  running bond, thirds for third bond, whole bricks for stack bond) that fits,
  both centred in the content box. Course *n* has its joints at the part
  positions `k` with `k ≡ n` modulo the number of parts, so each course is
  one part along from the one above.
- **Solving:** nothing to solve — a page to plan on. The seed is unused: every
  seed gives the same sheet.
- **Guarantees:** bricks are exactly the chosen size (joints in a course one
  brick apart, courses one brick high, checked to 1e-9 pt on every page size,
  orientation, bond and a range of brick sizes), each course is shifted by
  exactly ½, ⅓ or 0 of a brick from the one before, end pieces are never
  longer than a brick, and all ink, stroke widths included, stays inside the
  margins. A knob outside its range is clamped and the request recorded as
  `requested_<field>` in the meta.
