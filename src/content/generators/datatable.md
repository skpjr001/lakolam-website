---
title: "Data Table"
blurb: "Data table — a blank lab recording sheet with headed columns, units row, trial numbers and an observations box"
category: paper
version: "1.0.0"
---
A blank lab recording sheet — title, name and date lines, a ruled table of
headed columns with a units row and numbered trials, and a lined box for
observations.

## What it is

The data table of a science lesson or lab notebook, ready to fill in. At the
top, lines for the title of the experiment, your name and the date. Below
them a table of 2 to 10 columns and 10 to 40 rows:

- a tall **header box** at the top of each column for the name of the
  quantity measured;
- a **units row** under it, with brackets to write the unit in — "(cm)",
  "(°C)", "(s)";
- an optional **trial column** down the left, numbering the rows 1, 2, 3 …;
- every other row **tinted**, so a long row of numbers is easy to follow.

Underneath, a lined **OBSERVATIONS** box for what you noticed — colour
changes, anomalies, things that went wrong.

## How to use it

Write the title of the experiment, your name and the date first. In the
first column put the quantity you change on purpose (the independent
variable), and in the next columns the quantities you measure (the
dependent variables); write each name in its header box and its unit in the
brackets below, so the numbers in the table need no units of their own.
Record one trial or one reading per row, as you take it, in pen. If you
repeat a measurement, use the next row, and keep a column for the average.
Note anything unexpected in the observations box at the time, not later —
it is what explains an odd result when you come to draw the graph.

## Purpose

Science lessons, practical exams and lab work at school, college and home:
recording temperatures every minute, the period of a pendulum for each
length, plant heights day by day, titration readings, survey counts or
sports timings. Teachers print class sets so every group records data the
same way, and a sheet can be stapled into a lab notebook. In a book,
data-table pages make a science-investigation journal.

## History

Experimenters have kept records of their observations for as long as there
has been experimental science — Michael Faraday's laboratory diaries and
the bound, page-numbered lab notebooks of the 19th and 20th centuries mixed
written notes with columns of readings. The data table as taught in schools
today follows a few conventions: the quantity the experimenter controls in
the left-hand column, the measured quantities to its right, each column
headed by the quantity's name with its unit in brackets, and repeated
trials in numbered rows. Printed recording sheets with these parts are a
staple of science teaching because they make results quick to check and
easy to plot.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `header` (title, name and
  date lines); `columns` (2–10 data columns); `rows` (10–40);
  `row_height_mm` (5–15, default 8); `units_row`; `trial_column`;
  `row_tint`; `observations`; `ink` for the lines (the header boxes and row
  tints are pale shades of it) and `weight` (0.1–2 pt; the frame is twice
  as heavy).
- **Generation:** the sheet is laid out top to bottom. The header takes two
  9 mm writing lines; the column-header row is 1.6 rows tall, the units row
  one row; the trial column is 14 mm wide and the data columns share the
  rest of the width equally. If the rows do not fit at the asked height, the
  row height shrinks to fit (recorded as `requested_row_height_mm`), down to
  4 mm; below that, as many rows as fit are drawn (recorded as
  `requested_rows`). The observations box fills the rest of the sheet, with
  writing lines one row apart under its label; if fewer than two lines fit
  it is left out and `observations_omitted` is recorded. Every label is
  fitted inside its box (shrunk if it must be).
- **Solving:** nothing to solve — a sheet to record results on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** the data rows and observation lines are exactly one row
  height apart, the data columns are exactly equal, the trial numbers run
  from 1 to the number of rows, each in its own row, no label leaves its
  box or touches another, and all ink — strokes, tints and text — stays
  inside the margins (tested on every page size, orientation and
  combination of the on/off parts). A knob outside its range is clamped and
  the request recorded as `requested_<field>` in the meta.
