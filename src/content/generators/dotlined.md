---
title: "Dot-Lined Paper"
blurb: "Dot-lined paper — writing lines of evenly spaced dots, dot-ruled lines or a faint note grid, at US and metric rulings"
category: paper
version: "1.0.0"
---
Notebook ruling made light — writing lines of evenly spaced dots, solid rules
with dots marking columns, or a faint grid under solid writing lines.

## What it is

A writing page whose lines guide the hand without shouting. Three styles:

- **Dotted lines** — each writing line is a row of small dots at an exact
  pitch (2 mm by default). The line is there while you write and almost
  disappears under your handwriting.
- **Dot-ruled** — light solid rules with larger dots on them at an exact
  pitch, lined up down the page in columns. This is the Japanese "dot
  ruled" notebook: the dots line up the starts of sentences and give the
  corners of tables and diagrams.
- **Grid-lined** — a faint square grid with every writing line drawn
  solid: a note grid for pages that mix writing with sketches, charts and
  tables.

The rulings are the ones notebooks are sold in: US narrow (¼ in), college
(9/32 in) and wide (11/32 in), ⅜ in, and metric 5 to 10 mm. A red margin
line and a blank header band for a name and date are on by default.

## How to use it

Print the page at actual size: choose "Actual size" or "100%" in the print
dialog, never "Fit to page", so the ruling and the dots keep their true
spacing.

Write on the lines as you would on ordinary lined paper. On a dot-ruled
page, start each new paragraph or list item on the same column of dots, and
join dots straight down the page to draw tables, boxes and timelines that
stay square to the lines. On a grid-lined page, write on the solid lines and
use the faint squares in between for diagrams, small sketches and columns of
numbers. Keep the area left of the margin line for dates, headings and
questions.

## Purpose

For note-takers, students and journal writers who want the order of ruled
paper with some of the freedom of a dot grid: class notes that mix text and
diagrams, bullet journals, meeting notes, study notebooks and handwriting
practice for older pupils. In a book, dot-lined sections make a notebook or
journal with a lighter page than full rules.

## History

Ruled writing paper is centuries old; printing the rules as dots or pairing
them with a faint grid are modern refinements of notebook makers. The
best-known dot-ruled paper is Kokuyo's Campus "Dot Ruled" notebook from
Japan, which grew out of a joint project with a book on the notebooks of
students who passed the University of Tokyo entrance exam: the authors found
those notebooks consistently neat, with the beginnings of lines aligned, and
Kokuyo added evenly spaced dots along each rule to make aligning sentences,
tables and diagrams easy. Dotted lines and light note grids are now common
in planners and stationery from many makers.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `style` (dotted_lines,
  dot_ruled, grid_lined); `ruling` (narrow, college, wide,
  three_eighths_inch, mm5–mm10); `dot_pitch_mm` (0.5–20, default 2) and
  `dot_mm` (0.1–2, at most 80% of the pitch) for the dots; `ink` and
  `weight` (0.1–2 pt) for lines and dots; `divisions` (2–6 grid squares per
  ruling, grid-lined only); `margin_line`, `margin_line_mm` (10–80 mm from
  the page edge, default 31.75 = 1¼ in) and `margin_ink`; `header_mm`
  (0–80, default 15).
- **Generation:** the first line sits under the header band and the rest
  follow at `top + k × ruling`, as many as fit, never stretched. Dots sit at
  `start + k × pitch` across the page, the same columns on every line,
  centred left to right. Grid-lined squares are exactly `ruling ÷ divisions`
  on a side, so every solid line falls on a grid line, and the solid lines
  span the grid exactly. Dot-ruled rules are a lighter tint than their dots;
  grid lines are half the weight and a pale tint. Every mark of one style is
  one path.
- **Solving:** nothing to solve — a page to write on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** the ruling, dot pitch and grid square are exact (checked
  to 1e-9 pt on every page size, orientation, style and ruling), and all ink
  — dot discs and stroke widths included — stays inside the margins. A knob
  outside its range is clamped and the request recorded as
  `requested_<field>` in the meta.
