---
title: "Radar Chart"
blurb: "Radar (spider) chart blanks — 3-16 axes, polygon or circular rings with values, label boxes, 1-6 charts per page"
category: paper
version: "1.0.0"
---
Blank radar charts — spider-web grids with three to sixteen axes, ready for
self-assessments, skill profiles and product comparisons.

## What it is

A radar chart (also called a spider, web or star chart) gives each quality
its own axis: spokes leave a common centre at equal angles, the first
pointing straight up and the rest following clockwise. Rings round the
centre mark equal steps of value — polygons with a corner on every spoke
for the classic spider web, or circles — and can be numbered 1, 2, 3 … up
the first spoke, or marked in percent. At the end of each spoke is a blank
box or line for the axis's name, and above each chart a line for its title.
One, two, four or six charts fit on a page.

## How to use it

1. Write a title on the line above the chart, and a name in the box at the
   end of each spoke: the skills, subjects, qualities or features you want
   to compare.
2. Decide what the rings mean — for example 1 = beginner to 5 = expert.
3. For each axis, put a dot on its spoke at the ring for that score.
4. Join the dots round the chart with straight lines, and shade the shape
   if you like.
5. To compare two things on one chart, use two colours. To track progress,
   fill in a fresh chart each term or season, or use the two- to six-chart
   pages side by side.

A balanced profile makes a round, even shape; strengths stick out as
points, and gaps show as dents.

## Purpose

Seeing several scores at once: self-assessments and coaching "wheels",
skill and competency profiles, player or character stats, product and
supplier comparisons, quality and process audits, and classroom reflection
on learning goals. Drawing one by hand is quicker than any spreadsheet and
invites notes in the margins.

## History

Radar charts are usually credited to the German statistician Georg von
Mayr, who published one in 1877. The form has since gone by many names —
star plots, cobweb charts, Kiviat diagrams in computing performance work —
and became a staple of quality management, sports analysis and
self-assessment tools.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `axes` (3–16, default 6);
  `rings` (3–10, default 5); `ring_shape` (`polygon` or `circle`);
  `ring_values` (`none`, `count` for 1 to N, `percent`); `axis_labels`
  (`boxes`, `lines` or `none`); `charts` per page (`one`, `two`, `four`,
  `six`; two stack in portrait and sit side by side in landscape, six are
  2 × 3 or 3 × 2); `title_line`; `ink` (default gray); `weight` of the rings
  in points (0.1–2; spokes 1.5× and the outer ring 2× as heavy).
- **Generation:** the page is split into equal cells 8 mm apart. In each
  cell, spoke i points at −90° + 360° · i / n (screen angles, so the first
  is straight up). The outer radius is the largest that keeps the rings and
  every label slot inside the cell: the cell's width bounds it in closed
  form from each slot's reach along its spoke, and its height by bisection
  on the band of centre heights that still fit, so the drawing is centred
  down the cell even when an odd polygon sits off its own centre. Slots
  start at about a fifth of the cell and shrink until neighbours stand
  3 pt apart. Ring k sits at exactly k/N of the radius.
  Ring values are centred on the first spoke where it meets each ring, on a
  small paper-white backing that knocks the grid out behind the digits;
  when rings are too close for their values, every other ring is labelled,
  always including the outer one.
- **Solving:** nothing to solve — a page to fill in. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** the spokes are equally spaced with the first straight up;
  ring k is at exactly R · k / N with polygon corners on the spokes; every
  slot clears the outer ring and its neighbours; ring values never overlap;
  each chart stays in its own cell and all ink inside the margins —
  checked on every page size, orientation, chart count, slot style, axis
  count and margin extreme. A knob outside its range is clamped and the
  request recorded as `requested_<field>` in the meta.
