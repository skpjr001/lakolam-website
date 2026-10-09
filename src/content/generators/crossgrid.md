---
title: "Cross Grid Paper"
blurb: "Cross grid paper — small plus marks at exact 3 mm to ½ inch grid intersections"
category: paper
version: "1.0.0"
---
Small plus marks at the corners of an exact square grid — the guidance of
graph paper without its lines.

## What it is

A sheet with a little cross (+) wherever the lines of a square grid would
meet, and nothing in between. The crosses keep writing level and drawings
square, but leave open paper between them, so the page reads lighter than
graph paper and busier than dot paper. Spacings are 3, 5 and 7 mm, 1 cm,
¼ inch and ½ inch; crosses come small, medium or large (arms of 0.8, 1.5
or 2.5 mm from the centre), in grey, light blue, dark grey, warm grey or
another ink.

## How to use it

Print the page at actual size: in the print dialog choose "Actual size" or
"100%", never "Fit to page", so crosses are exactly the chosen spacing
apart.

Write along the rows of crosses as you would on lined paper. Use the
crosses as corners when you draw boxes, tables, storyboards and layouts,
and the arms as short guides for straight lines in both directions.
Sketch freely between them: the marks are there when you need a reference
and out of the way when you don't.

## Purpose

A notebook and planning page for designers, engineers, architects,
students and journal keepers who want a quiet reference grid —
wireframes, diagrams, sketch notes, lettering and layout. In a book, cross
grid sections make a design notebook.

## History

Grids of small crosses are an old measuring device: the réseau of a
photogrammetric camera is a glass plate engraved with a regular grid of
fine crosses, photographed onto every frame so that film distortion can be
measured and corrected. On paper the same idea gives a reference grid
that interferes as little as possible with what is drawn over it, and
cross-grid pages now sit beside dot grid in notebooks and printable paper
collections.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `spacing` (mm3, mm5, mm7,
  cm1, quarter_inch, half_inch; default mm5); `cross_size` (small,
  medium, large — arms 0.8, 1.5, 2.5 mm); `ink` (one of the named paper
  colours; default gray); `weight` in points (0.1–2, default 0.3; the
  reference site offers 0.2, 0.3 and 0.5).
- **Generation:** cross centres sit at `start + k × spacing` across and
  down — as many as fit with a full arm and half the stroke clear of the
  margin, never stretched — centred in the content box. Each cross is two
  strokes of twice the arm length, all in one path. An arm is held to 40%
  of the spacing, so neighbouring crosses never join into lines (large
  crosses at 3 or 5 mm spacing, and medium crosses at 3 mm, are
  shortened); the shortening is recorded as `requested_cross_size` and the
  arm drawn as `cross_arm_mm` in the meta.
- **Solving:** nothing to solve — a page to write and draw on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** the spacing is exact (every gap equals the chosen pitch,
  checked to 1e-9 pt on every page size, orientation, spacing, cross size
  and weight), the lattice is centred, there is always a gap between
  neighbouring crosses, and every cross, arms and stroke included, lies
  inside the margins. A knob outside its range is clamped and the request
  recorded as `requested_<field>` in the meta.
