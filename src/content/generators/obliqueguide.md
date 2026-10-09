---
title: "Oblique Guide Sheets"
blurb: "Oblique guide sheets — Copperplate 3:2:3 and Spencerian rows with 52° or 55° slant lines"
category: paper
version: "1.0.0"
---
Pointed-pen calligraphy guide sheets — Copperplate 3:2:3 or Spencerian rows
under slant lines at 52°, 55° or any of the classic angles.

## What it is

Practice paper for the slanted scripts written with a pointed pen. Each
writing row has an **ascender line**, a **waistline** (the top of the small
letters), a heavier **baseline** and a **descender line**, in the
proportions of the script:

- **Copperplate** (English roundhand) — ascender : x-height : descender =
  3 : 2 : 3, the proportion found in many 18th-century examples;
- **Spencerian** — taller loops, 4 : 2 : 4, as in the Spencer copybooks;
- **Plain** — rows of the x-height alone, for drills and italic.

A field of **slant lines** crosses the rows at the script's angle from the
baseline: 52° for Spencerian, 55° for Copperplate, or 45°, 60°, 70° and an
italic 83° (about 7° off upright). A dashed line halfway up the x-height
helps place the joins and the shoulders of letters.

## How to use it

Print at actual size ("Actual size" or "100%", not "Fit to page"). Many
calligraphers lay the guide under thin layout paper and write on top.

Sit each letter on the heavy baseline with its body reaching the waistline;
loops and capitals rise to the ascender line and tails fall to the
descender line. Keep every downstroke parallel to the slant lines — that
even slope is what makes the script look right. Start with a large
x-height and widely spaced slant lines, then move to smaller ones.

## Purpose

Practice sheets for Copperplate, Spencerian, Engrosser's script and
modern pointed-pen calligraphy, for wedding invitation and envelope
lettering, and for improving a slanted everyday hand. In a book, guide
sheets make the practice pages of a calligraphy workbook.

## History

Copperplate takes its name from the engraved copper plates of the 18th-
century English writing masters, whose copybooks — George Bickham's *The
Universal Penman* (1733–1741) is the best known — spread the round hand
across the trading world. In the United States, Platt Rogers Spencer
developed the Spencerian system in the mid-19th century, and it was taught
in American schools and business colleges until the simpler Palmer method
(published 1894) displaced it in the early 20th century. Both are written at
a steep, consistent slope — commonly given as 55° from the baseline for
Copperplate and 52° for Spencerian — and guide sheets with ruled slant lines
have long been the way to learn it.

## This implementation

- **Spec knobs:** `page` and `landscape`; `margin_mm` (0–30, default 10);
  `slant` (deg45, spencerian 52°, copperplate 55°, deg60, deg70, italic
  83°; default copperplate); `x_height` (mm4, mm5, mm6, mm8, mm10, mm12,
  mm15; default mm6); `proportion` (copperplate 3:2:3, spencerian 4:2:4,
  plain); `slant_spacing_mm` (2–20, default 5); `ink` for the rows (default
  blue), `slant_ink` (default amber); `weight` (0.1–2 pt, default 0.4);
  `midline` (on).
- **Generation:** rows of ascender + x-height + descender are stacked so
  that one row's descender line is the next row's ascender line (as in
  copybooks), as many as fit, centred down the page. Slant lines are rays
  at exactly the chosen angle whose feet sit `slant_spacing_mm` apart along
  the bottom line, pinned so one passes through the centre of the ruled
  block, then cut to the block.
- **Solving:** nothing to solve — a page to write on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** the zones are exactly the asked proportions and rows repeat
  at an exact pitch; every slant line runs at the asked angle (to 1e-9°) and
  the lines are the asked distance apart; all ink stays inside the margins
  on every page size and orientation. A knob outside its range is clamped
  and recorded as `requested_<field>` in the meta.
