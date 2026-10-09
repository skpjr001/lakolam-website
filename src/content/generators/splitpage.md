---
title: "Split-Page Paper"
blurb: "Split-page paper — ruled lines on one part, grid, dots or a drawing box on the other"
category: paper
version: "1.0.0"
---
Lines on one part of the page and a grid, dots or an empty drawing box on
the other — for sketching and writing about it on the same sheet.

## What it is

A framed page divided in two:

- a **lined** part, ruled at US college or wide ruling, or at 6, 7, 8 or
  12 mm;
- a **drawing** part with a square grid (4 mm, 5 mm, ¼ inch or 1 cm),
  dots at the grid points, or nothing at all.

The parts sit one above the other or side by side, as equal halves or as
a third and two thirds, with the lines in whichever part you choose. The
whole frame is whole grid squares, and the line between the parts falls
on a grid line, so the drawing part has no cut squares.

## How to use it

Print at actual size. Draw, sketch or graph in the squared, dotted or
blank part, and write about it on the lines: an observation and what it
shows, a diagram and its labels, a worked maths problem and the
explanation, a picture and the story that goes with it. Use the grid to
keep drawings to scale — one square for one centimetre, one unit or one
step — and the dots for neat sketches and diagrams without heavy lines.
Turn the page sideways to put the drawing beside the writing.

## Purpose

Split pages pair the picture with the words. Primary teachers use them
for "draw and write" story paper and science journals, where children
draw what they observe and then describe it; older students for lab
observations, maths journals that show working beside an explanation,
and visual note-taking; designers, engineers and makers for a sketch
beside its notes and measurements; nature journalers for a drawing and
its field notes.

## History

Putting drawings beside written notes is as old as notebooks: naturalists,
inventors and engineers have long filled pages with sketches and
explanations side by side. Schools made it a printed format — primary
exercise books with a blank space for a picture above handwriting lines,
and science journals that pair a drawing space with lines and a squared
page — and notebook makers sell "half and half" books with graph ruling
and lined ruling on the same sheet for engineering and study.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `split` (top_bottom,
  left_right); `ratio` (equal, one_two, two_one — the first part to the
  second); `lines_first` (lines in the top or left part instead of the
  bottom or right); `other` (grid, dots, blank); `grid` (mm4, mm5,
  quarter_inch, cm1; default 5 mm); `ruling` (mm6, mm7, mm8, college,
  wide_ruled, mm12; default college); `ink` and `weight` (0.1–2 pt,
  default 0.4) for lines, grid and dots; `divider_ink` and
  `divider_weight` (0.25–3 pt, default 1.2) for the frame and divider.
- **Generation:** the frame is as many whole squares each way as fit
  inside the margins, centred. The divider is placed on the grid line
  nearest the asked ratio, keeping at least one square for the drawing
  part and room for one rule and a half for the lined part. Rules count
  down from the top of the lined part at exact steps and stop at least
  half a step above its bottom; the lined part's share is recorded as
  `lined_share`.
- **Solving:** nothing to solve — a page to draw and write on. The seed is
  unused: every seed gives the same page.
- **Guarantees:** grid squares and ruled lines are at exactly the chosen
  spacings (`square_mm`, `ruling_mm`, `spacing_exact`); the frame and
  drawing part are whole squares each way, the divider on a grid line;
  and all ink stays inside the margins, checked on every page size,
  orientation, margin, split, ratio, side and drawing style. A knob
  outside its range is clamped and recorded as `requested_<field>`.
