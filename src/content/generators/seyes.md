---
title: "Seyès Paper"
blurb: "Seyès paper — French grands carreaux: 8 mm squares, 2 mm interlines and a red margin"
category: paper
version: "1.0.0"
---
French school paper — "grands carreaux": 8 mm squares, each split by three
light lines 2 mm apart, with a red margin line.

## What it is

The ruling of French exercise books (cahiers) and loose sheets (copies).
Heavy horizontal lines every 8 mm mark the writing lines; between each pair,
three light *interlines* divide the space into four bands of 2 mm; thin
vertical lines every 8 mm complete the large squares; and a red vertical
line on the left marks off the margin.

The 2 mm bands give the proportions of French cursive: small letters fill
one band above the writing line, tall letters such as *l* and *b* reach
three bands, and tails drop down into the bands below. Enlarged Seyès, with
2.5 mm or 3 mm interlines (10 mm or 12 mm squares), is made for children
just starting to write.

## How to use it

Print at actual size ("Actual size" or "100%", not "Fit to page") so the
squares measure 8 mm.

Write on the heavy lines. Small letters (a, c, e, o …) are one interline
tall, t and d two, tall loops (b, l, h, k) three; tails go down two or three
interlines below the line. Keep titles, dates and notes for the teacher to
the left of the red margin. The vertical lines help to start each line at
the same place and to line up columns of numbers.

## Purpose

The standard writing paper of French primary and secondary schools, also
used in Belgium and other French-speaking classrooms. It is excellent for
anyone learning French cursive and for practising even letter heights in
any language; in a book, Seyès pages make a cahier or the writing pages of
a French-language workbook.

## History

The ruling is named after Jean-Alexandre Seyès (1855–1937), a stationer in
Pontoise, who registered it with the tribunal there on 16 August 1892.
Before then French school notebooks had been plainly lined and later
squared to help pupils writing with a steel nib; shortly before the First
World War the Seyès ruling became the ordinary "cahier à grands carreaux",
and it remains the most widely used school ruling in France. Its usual
colours are violet writing lines and verticals, lighter blue or lilac
interlines and a red margin.

## This implementation

- **Spec knobs:** `page` (default a4) and `landscape`; `margin_mm` (0–30,
  default 10); `interline` (mm2 standard, mm2_5 and mm3 enlarged);
  `major_ink` for writing lines and verticals (default purple) and
  `minor_ink` for interlines (default light_purple); `weight` (0.1–2 pt,
  default 0.3; writing lines and margin twice as heavy); `vertical_grid`
  (on); `margin_line` (on), `margin_squares` (1–10, default 3) and
  `margin_ink` (default red).
- **Generation:** as many whole squares as fit are laid at exactly
  4 × interline and centred in the content box; the three interlines sit at
  exact quarters of every square. The margin line falls on a vertical,
  `margin_squares` squares in from the left of the ruling — French sheets
  have no single published margin width, so it is a knob.
- **Solving:** nothing to solve — a page to write on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** squares and interlines are exact (checked to 1e-9 pt on
  every page size, orientation and interline), the ruling is centred, and
  all ink stays inside the margins. A knob outside its range is clamped
  (the margin is also held to the squares the page has) and recorded as
  `requested_<field>` in the meta.
