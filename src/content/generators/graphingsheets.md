---
title: "Graphing Sheets"
blurb: "Graphing sheets — 2 to 12 small coordinate planes per page for homework, numbered problems with equation lines"
category: paper
version: "1.0.0"
---
Small coordinate planes for homework: 2 to 12 to a page, each with its own
problem number and a line for the equation.

## What it is

A page of separate coordinate planes, laid out in an even grid. Each plane
is a square grid of 10 × 10 or 20 × 20 squares with:

- an **x axis and a y axis** on grid lines — crossing in the middle for
  all four quadrants (−5 to 5, or −10 to 10), or meeting in the corner for
  quadrant I only (0 to 10, or 0 to 20);
- **arrowheads** at the open ends of the axes and the letters **x** and
  **y**;
- optional **numbers** along the axes every 2 or every 5 squares;
- above it, a **problem number** and a blank **equation line** to copy the
  question onto.

Two planes give room for careful work; four, six or nine suit a homework
set; twelve fit a quick practice page of small sketches.

## How to use it

Copy the equation or question for each problem onto the line next to its
number, so your teacher can see which graph answers which question.

To plot a point such as (3, –2), start where the axes cross, count 3
squares right, then 2 squares down, and make a dot. For a line like
y = 2x + 1, make a small table of x values, work out each y, plot the
points and join them with a ruler, then draw arrowheads on the line's ends
to show it carries on. If your values are bigger than the axes show, let
each square stand for 2, 5 or 10 and write your scale along the axis. Use
the quadrant I sheets when every value is positive.

## Purpose

Algebra and coordinate-geometry homework asks for many small graphs at a
time: plotting points, graphing linear equations and inequalities,
comparing slopes, transformations, systems of equations solved by drawing.
One plane per question keeps the work tidy and easy to mark, and a sheet
of pre-drawn planes saves students from ruling axes by hand for every
problem. Teachers print them as homework and quiz sheets; in a book, they
make the practice pages of a graphing or algebra workbook.

## History

Graphs on two perpendicular axes go back to René Descartes's *La
Géométrie* (1637) and the work of Pierre de Fermat in the same years,
which tied equations to curves — the reason the plane is called
Cartesian. Squared paper became an ordinary school supply around the turn
of the 20th century, when reformers of mathematics teaching — John Perry
in Britain, E. H. Moore in the United States — urged graphing on squared
paper in secondary schools, and worksheets of several small
ready-drawn coordinate planes (four or six to a page, numbered −10 to 10)
are now a standard handout in middle-school and high-school maths.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `planes` (two, four, six,
  nine, twelve); `grid_size` (ten, twenty squares a side); `quadrants`
  (four, first); `numbers` (none, every_two, every_five); `arrows` and
  `letters` (on or off); `problem_numbers`, `start_number` (1–999, the
  first problem's number) and `equation_line`; `grid_ink` and `axis_ink`
  (named paper colours); `weight` (grid line weight in points, 0.1–2; the
  axes are drawn heavier).
- **Generation:** the content box is split into an even grid of cells (two
  is 1 × 2, six 2 × 3, twelve 3 × 4, turned to match the sheet) with a
  7 mm gutter. Text sizes come from the cell size; the room needed round
  the grid — arrow tips and letters beyond the positive ends, arrow tails
  for four quadrants, the numbers outside the corner for quadrant I — is
  measured from the labels' exact ink boxes, and the squares are the
  largest that fit what is left, the same in every plane. Each plane, with
  its header, is centred in its cell. Numbers sit beside the axes on white
  knockouts; when the asked spacing would make them touch they spread to
  every 5, 10 or 20 squares and the meta records `number_every_served`.
- **Solving:** nothing to solve — a page to graph on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** every plane is `n × n` exactly square squares with the
  origin on a grid line — the middle line both ways for four quadrants,
  the bottom-left corner for quadrant I (checked on every page size,
  orientation, plane count, grid size and quadrant setting); every axis,
  arrow, line and label stays inside its cell and the margins; no number,
  letter or problem number touches another or an axis or arrowhead; all
  ink, stroke widths included, stays inside the margins. A knob outside
  its range is clamped and the request recorded as `requested_<field>`.
