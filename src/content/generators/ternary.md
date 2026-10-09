---
title: "Ternary Diagram"
blurb: "Ternary diagram paper — an equilateral triangle gridded in equal percentage steps for three-part mixtures"
category: paper
version: "1.0.0"
---
Triangle graph paper for three-part mixtures — an equilateral triangle ruled
in equal percentage steps, with numbered scales on all three sides.

## What it is

A ternary diagram plots anything made of three parts that add up to 100 %:
the corners are pure A (top), pure B (bottom left) and pure C (bottom right).
A point's share of each part is its distance from the side opposite that
part's corner, measured as a fraction of the triangle's height — and for
any point inside an equilateral triangle the three distances always add up
to the height, so the three shares always add up to 100 %.

The grid is three sets of lines, each parallel to one side, in equal steps:
5 steps of 20 %, 10 of 10 % or 20 of 5 % (anything from 2 to 50 steps). The
scales run **counter-clockwise** (A read on the left side, B along the
bottom, C on the right side — the common convention) or **clockwise**. Each
tick continues its grid line past the side, so its slant shows which set of
lines a number belongs to.

## How to use it

Find the A share first: the A lines run parallel to the bottom, and their
numbers are on the side the ticks point out from. Follow the line for your A
percentage, then do the same for B; where the two lines cross is the point —
the C line through it gives the remaining share, and it should make the
total 100 %. To read a point, follow each of its three lines back to its
scale along the slant of the ticks.

Mixtures that differ only in the amount of one part lie on a straight line
through that part's corner, and mixing two samples gives a point on the
straight line between them — so you can read mixing proportions with a ruler.

## Purpose

Phase diagrams in chemistry and metallurgy, rock and mineral classification
in geology (QAPF and sandstone diagrams), soil-texture triangles (sand, silt,
clay), ceramics and glaze recipes, alloy design, population genetics
(genotype frequencies) and any survey or vote split three ways. Teachers use
blank sheets for practice plotting; students and lab workers plot results by
hand.

## History

Barycentric coordinates — describing a point by three weights at the
corners of a triangle — were introduced by August Ferdinand Möbius in 1827.
J. Willard Gibbs proposed the equilateral triangle for showing the
composition of three-component systems in his work on heterogeneous
equilibrium in the 1870s, and in the 1890s H. W. Bakhuis Roozeboom made it the
standard tool for ternary phase diagrams. Soil scientists, petrologists and
geneticists have used the same triangle ever since.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `divisions` (2–50, default
  10); `labels` (percentages along the sides); `ticks` (tick marks);
  `vertex_letters` (A, B and C at the corners); `orientation`
  (counterclockwise, clockwise); `ink` (grid colour, default medium_gray;
  steel_blue and engineering_green match the usual alternatives); `weight`
  in points (0.1–2; the outline is three times as heavy).
- **Generation:** the ticks, numbers and letters stick out of the triangle by
  fixed amounts, so the layout measures them on a trial triangle and fits the
  largest triangle that leaves room for them, then centres the whole drawing
  in the content box. The grid lines for share t of a part join the two
  points t of the way from the opposite side to that part's corner. When the
  steps are finer than 10 % and divide it evenly, every 10 % line is heavier.
  Numbers are printed every step if they fit, else every 2, 4, 5 or 10 steps,
  so they stay at least 6 mm apart.
- **Solving:** nothing to solve — a page to plot on. The seed is unused:
  every seed gives the same sheet.
- **Guarantees:** the triangle is equilateral; every grid line of share t lies
  exactly t × height from the opposite side, and shares step by exactly
  1/divisions (checked to 1e-9 on every page size, orientation, step count
  and scale direction); three lines whose shares add to 100 % meet in one
  point; all ink, numbers and stroke widths included, stays inside the
  margins. A knob outside its range is clamped and recorded as
  `requested_<field>` in the meta.
