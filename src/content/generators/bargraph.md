---
title: "Bar Graph Template"
blurb: "Bar graph template — blank classroom bar graphs with title, numbered or blank scale, 3-12 labelled bar slots, 1, 2 or 4 per page"
category: paper
version: "1.0.0"
---
Blank bar graphs ready for a class to fill in: a title line, a numbered or
blank scale, 3 to 12 bar slots with label lines, and one, two or four
graphs to a page.

## What it is

An empty bar graph with everything drawn except the data. Each graph has:

- a **title line** at the top;
- a **value axis** with a tick at every step and either printed numbers —
  0, 1, 2 … or 0, 5, 10 …, counting in the step you choose — or blank
  ticks for students to number themselves;
- a **category axis** divided into 3 to 12 equal bar slots, with a gap
  either side of every bar and a short line under each slot for its name;
- **gridlines**: a line at every step for reading heights, or a full grid
  of boxes to colour the bars into, or none;
- optional **Y-AXIS LABEL** and **X-AXIS LABEL** lines beside the axes.

Bars can stand up from the bottom (a column chart) or run across from the
left, and a page holds one large graph, two, or four small ones.

## How to use it

Collect your data first: a tally of favourite fruits, the weather each
day, the number of pets in each family. Write a title on the title line
that says what the graph shows. Write one category name on each label line
under the bars.

Look at your biggest number and pick a scale that fits it. If the scale is
printed, check it reaches your biggest value; if it is blank, number the
ticks yourself, starting from 0 at the axis and counting up by the same
amount every step (1, 2, 5 or 10 at a time). Name the axes on the axis
label lines: the categories on one, what you counted on the other.

Then draw each bar up to its value, the same width as its slot, and colour
it in. Leave the gaps between bars empty so each bar stands on its own.
Read the finished graph: which bar is tallest, which is shortest, and how
many more is one than another?

## Purpose

Bar graphs are where most children first learn to show data: early-years
and primary maths ask pupils to draw and read them from a tally or a
pictograph, and they come back in science reports, geography fieldwork and
surveys all through school. A ready-ruled template saves the ruler work so
a lesson can be about choosing a scale, labelling and reading the data.
Teachers print one-to-a-page sheets for class charts and two- or
four-to-a-page sheets for practice and homework; in a book, they make a
graphing section of a maths workbook or a data journal.

## History

The bar chart is usually credited to the Scottish engineer and economist
William Playfair, whose *Commercial and Political Atlas* (1786) drew
Scotland's imports and exports with each of its trading partners for one
year, 1780–81, as pairs of bars. Playfair turned to bars because he had
only that single year of figures for Scotland, where the rest of the atlas
used line graphs over time. Earlier diagrams with bar-like shapes exist —
Nicole Oresme's 14th-century drawings of changing qualities are often
cited — but Playfair's is the first chart of measured quantities drawn as
bars. The form spread through statistical atlases in the 19th century and
into school maths in the 20th, where blank graph templates became a
standard classroom handout.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `per_page` (one, two,
  four); `orientation` (vertical, horizontal); `categories` (3–12 bar
  slots, default 6); `rows` (4–20 scale steps, default 10); `scale_step`
  (0–1000, default 1: the value of one step; 0 leaves the ticks blank);
  `grid` (none, value_lines, squares); `title` and `axis_labels` (writing
  lines on or off); `grid_ink` and `axis_ink` (named paper colours);
  `weight` (gridline weight in points, 0.1–2; the axes are drawn heavier).
- **Generation:** the content box is split along its longer side into one,
  two or four equal graph boxes with a 10 mm gutter. In each box the title
  line comes first, then the axis-label lines and their captions, then room
  for the scale numbers (measured from the widest number the scale will
  print) and the category label lines; the plot takes what is left. The
  category axis is cut into `2n + 1` equal units — gap, bar, gap … gap — so
  every bar slot is the same width with the same gap either side, and the
  value axis into `rows` equal steps. Numbers go on every step when they
  fit, otherwise every 2, 5, 10 or 20 steps so no two ever touch. The
  Y-AXIS LABEL caption is turned to read upwards beside its line.
- **Solving:** nothing to solve — a template to fill in. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** every graph has exactly `rows + 1` evenly spaced ticks
  and `n` equal bar slots each with one label line (checked on every page
  size, orientation, graphs per page and bar direction); every word and
  number is laid out with its exact ink box, stays inside the margins and
  touches no other; all ink — stroke widths included — stays inside the
  margins. A knob outside its range is clamped and the request recorded as
  `requested_<field>` in the meta.
