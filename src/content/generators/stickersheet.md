---
title: "Planner Sticker Sheets"
blurb: "Planner sticker sheets — headers, checklists, date dots, trackers, tabs, washi and icons, with kiss-cut lines checked for bleed, gap and cut area"
category: design
version: "1.0.0"
---
A full sheet of planner stickers — headers, checklists, date dots, habit
trackers, weekday tabs, washi strips and little picture badges — laid out
for a cutting machine, with every kiss-cut line checked.

## What it is

A printable sheet of functional and decorative planner stickers in one
palette. Each sticker has a white border and a kiss-cut line around it,
shown on the page as a thin pink line. The stickers sit inside a cutting
machine's print-then-cut area (6.75 × 9.25 in), framed by registration
marks; a second page holds the same marks with the cut lines alone, ready
to use as a cut file. Kits choose the mix: a bit of everything, working
stickers (checklists, trackers, tabs, headers), a month of date dots, or
decoration (washi strips, picture badges, cheerful headers).

## How to use it

1. Print the sheet at 100% (no "fit to page") on printable sticker paper.
   For a cutting machine, turn the pink cut lines off before printing.
2. **With a cutting machine:** load the print, use the cut-line page as
   the cut file, and set a kiss cut (through the sticker, not the backing)
   so the stickers stay on their sheet. The registration marks let the
   machine find the print.
3. **By hand:** cut along the pink lines with scissors or a craft knife.
4. Peel and stick: tabs on page edges, date dots on a monthly spread,
   checklists and trackers in a weekly layout, washi strips as dividers.
   Colour or write on the white areas with a fine pen.

## Purpose

Planner stickers are one of the most popular printables there are, and
the hard part of making them is not the art but the cutting: a cut line
too close to the ink nicks the design when the machine drifts, two cut
lines too close tear the sheet, and anything outside the machine's area
simply is not cut. This sheet is laid out so none of that can happen.

## History

Planner stickers grew out of scrapbooking and the paper-planner revival of
the 2010s, when decorated weekly spreads in ring-bound and notebook
planners became a hobby of their own and functional sticker kits — date
covers, checklists, trackers, headers — became a staple of craft shops.
Kiss cutting, cutting the face of a sticker but not its backing, lets a
whole kit stay on one sheet; home cutting machines with a print-then-cut
mode read printed registration marks to cut around home-printed art.

## This implementation

- **Spec knobs:** `width`, `height` (page, points); `kit` (`mixed`,
  `functional`, `dates`, `decorative`); `palette` (`pastel`, `bright`,
  `earthy`, `mono`); `scale` (sticker size, 0.5–2); `bleed` (white border
  between ink and cut line, 1–12 pt); `gap` (smallest distance between
  cut lines, 2–36 pt); `safe_margin` (inset from the cut area's edge,
  0–36 pt, at most 15% of its shorter side); `cut_lines` (show the cut
  lines on the printed page); `labels` (title and printing note outside
  the marks, where there is room); `line` (cut-line weight).
- **Generation:** the cut area is centred on the page (shrunk only when the
  page is smaller than 6.75 × 9.25 in plus room for the marks). The kit's
  sticker kinds come round in a seeded order, one kind per row; each row
  takes as many stickers as fit, and rows stack until no kind fits. Rows
  and stickers are spread evenly over the spare room. Content rolls on
  sticker by sticker — shuffled header words (month names for the dates
  kit), dates 1–31 in order, weekdays in order, checklist titles with three
  to five boxes, habit names, washi patterns (stripes, dots, chevrons,
  gingham, confetti) and picture badges. Each cut line is the sticker
  body's exact offset — a rounded rectangle grows into a rounded
  rectangle, a disc into a disc — by the bleed plus half the outline. If
  not one sticker fits at the requested scale, the scale shrinks until
  one does, and meta records `requested_scale`; every other clamped value
  is recorded as `requested_<field>` too.
- **Solving:** nothing to solve — a sheet to print, cut and stick.
- **Guarantees:** every page passes `kiss_cut_checked`, re-proved from the
  drawn items rather than the layout: each sticker's art is flattened as a
  renderer would (text to strokes, clips kept, a stroke's ink reaching half
  its width past its centreline) and measured against its contour's
  polyline exactly; every contour is one closed curve, at least the bleed
  outside every bit of its sticker's ink, at least the gap from every
  other contour with none inside another, and inside the safe zone of the
  cut area; the registration marks lie on the page and outside the cut
  area. Meta reports sticker counts and sizes (in mm, by kind) and the
  smallest bleed and gap measured. Tests show the check catches art
  pushed past its line, overlapping and nested contours, and stickers
  outside the cut area.
