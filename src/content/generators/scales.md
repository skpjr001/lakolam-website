---
title: "Reading Scales"
blurb: "Reading scales — thermometers, measuring jugs and kitchen scales to read and shade"
category: maths
version: "1.0.0"
---
Thermometers, measuring jugs and kitchen scales: read the amount, or shade
the liquid and draw the pointer to show it.

## What it is

A worksheet of three to nine instruments. Thermometers are marked in °C or
°F, with temperatures below zero at the higher levels; measuring jugs (cups)
in millilitres or litres; kitchen scales have a round dial in grams and
kilograms or pounds and ounces. Only some marks carry a number, as on real
scales. Some instruments show the liquid or pointer and ask for the amount;
others give the amount and ask for the liquid to be shaded or the pointer
drawn.

## How to play

1. Find two numbered marks next to each other and work out how much they
   differ.
2. Count the spaces between them. Divide the difference by the number of
   spaces: that is what each small mark is worth. (From 0 to 250 with five
   spaces, each mark is 50.)
3. Find the top of the liquid, or where the pointer points, and count on in
   those steps from the numbered mark below it.
4. On a thermometer below zero, count down from 0: the marks get further
   below zero as they go down (-2, -4, -6...).
5. To shade or draw, find the mark for the amount the same way, then shade
   up to it from the bottom or draw the pointer from the centre to it.

## Purpose

Reading a scale where not every mark is numbered is one of the skills
children most often get wrong in primary maths and science tests: it needs
the interval between marks, not just counting. Three kinds of instrument,
with steps of 1, 2, 5, 25, 50, 100, 200 and 250, give that practice in
familiar settings.

## History

Graduated scales have been read on thermometers since the 1700s (Fahrenheit
in 1724, Celsius in 1742), on measuring vessels and on spring balances and
kitchen scales since the 1800s. Worksheets with pictured scales became a
standard part of primary measurement teaching.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`mixed`, `read`, `shade`);
  `instruments` (`all`, `thermometer`, `jug`, `scale`); `locale` (`us`,
  `uk`, `in`: °F and pounds for us, °C and grams otherwise; "cup" or "jug");
  `units` (`auto`, `metric`, `imperial`); `count` (3-9); `style` (`colour`
  or `line_art` greys); page `width` and `height`; `line`.
- **Generation:** each instrument has a scale per level — a range, a mark
  interval and a label interval. Kids (about grades K-1) reads numbered marks
  only (thermometer 0-50 °C in tens, jug 0-500 ml in hundreds, scale 0-1000 g,
  or whole pounds). Easy (grades 1-2) has one or two unnumbered marks between
  numbers (steps of 5 degrees, 100 ml between 200s, half pounds). Medium
  (grades 2-3) has several marks between labels (2 degrees, 50 ml between
  250s, 100 g between half kilograms, quarter pounds) and °C goes below zero.
  Hard (grades 3-4) reads litres and kilograms as decimals (0.1 L, 250 g
  steps, 2 oz) with more negative temperatures. Expert (grades 4-5) uses
  awkward intervals: 4 °F marks, 50 ml in litres, 200 g in kilograms, single
  ounces. Values are whole numbers of marks, never empty or full, mostly
  between labels, and not repeated on the same kind of instrument. In
  `mixed` mode the first half of the rows are read and the rest shaded.
- **Solving:** values are integers in degrees, millilitres, grams or
  ounces, so each answer is exact (e.g. -4 °C, 1.35 L, 1 LB 6 OZ). The key
  writes every reading in red and shades each liquid or draws each pointer
  in red.
- **Guarantees:** deterministic per seed. One function maps a value to a
  height (thermometers, jugs) or an angle (a 300-degree dial) for each
  instrument, and ticks, liquid and pointer are all drawn through it. The
  tests record where every liquid top and pointer was drawn, on the page and
  in the key, and read the value back from the one tick it lands on, with
  tick positions recomputed independently — at every level, in both unit
  systems. Difficulty is the scale interval
  (`rating_basis: scale_interval`).
