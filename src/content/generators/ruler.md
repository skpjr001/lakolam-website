---
title: "Measuring Length"
blurb: "Measuring — objects on a true-size ruler in cm, mm or inches, and lines to draw"
category: maths
version: "1.0.0"
---
Pencils, crayons, keys, leaves and worms laid over a true-size ruler: measure
them, then draw lines of your own.

## What it is

A worksheet of three to six rows. Each row has a ruler printed at true size —
centimetres and millimetres, or inches down to eighths — and either a simple
drawing of an everyday object above it, with a line to write its length, or
a dot and an instruction to draw a line of a given length. At the top level
some objects do not start at the zero mark. The page says to print at 100%
and carries a check bar of 5 cm (or 2 inches) to confirm the printer kept the
size.

## How to play

- **Measure the object.** Find the mark under the left end of the object and
  the mark under its right end. If the left end is at 0, the length is the
  number at the right end. If it starts somewhere else, take the left
  number away from the right number (an object from 2 cm to 8.5 cm is 6.5 cm
  long). Count the small marks after the last whole number: on a centimetre
  ruler each small mark is one millimetre; on an inch ruler the longer marks
  are halves, then quarters, then eighths.
- **Draw a line.** Put the pencil on the dot, which sits over the 0 mark,
  and draw straight along the ruler until you reach the length asked for.
- To check the page printed at the right size, measure the check bar at the
  top with a real ruler.

## Purpose

Reading a ruler is a core measurement skill from the first school years:
starting at zero, counting whole units, then reading halves, quarters and
eighths of an inch or millimetres, and finally measuring from a mark that is
not zero. Because this page prints at true size, the same objects can be
measured again with a real ruler.

## History

Rulers marked in inches and their halving fractions go back centuries; the
metric ruler with millimetre marks followed the metric system from the
1790s. Measuring pictures of objects against a printed ruler has long been a
classroom worksheet staple.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`mixed`, `measure`, `draw`);
  `locale` (`us`, `uk`, `in`: default units and "centimeter" or
  "centimetre"); `units` (`auto`: inches for us, metric otherwise, or
  `metric`, `imperial`); `start` (`auto`: shifted at Expert only, or `zero`,
  `shifted`); `count` (3-6 rows); `guides` (faint lines from each object's
  ends to the ruler); `style` (`colour` or `line_art`); page `width` and
  `height`; `line`.
- **Generation:** Kids (about grades K-1) measures whole centimetres or whole
  inches from zero; Easy (grade 1-2) whole centimetres (with half-centimetre
  marks) or half inches; Medium (grade 2-3) half centimetres on a millimetre
  ruler, or quarter inches; Hard (grade 3-4) millimetres (half the answers
  asked in mm) or eighths of an inch; Expert (grade 4-5) the same, with
  objects starting at 1 or 2 units past zero. The ruler shows marks down to
  the level's precision. Lengths are drawn in whole steps of the precision,
  mostly ones that need it (a quarter-inch level mostly avoids whole and half
  inches), with no length repeated on a page; objects are all different. In
  `mixed` mode the last third of the rows are draw-a-line rows. The ruler is
  15 cm or 6 inches and shortens to fit a narrower page, but never changes
  scale.
- **Solving:** lengths are integers in millimetres or eighths of an inch, so
  the answer is exact: centimetres with one decimal, millimetres, or a
  reduced mixed number (3 5/8 in). The key writes each length in red and
  draws each requested line in red from the dot.
- **Guarantees:** deterministic per seed. The page is laid out in points at
  true size: 1 cm = 72 / 2.54 = 28.3465 pt and 1 in = 72 pt. The tests check
  every tick against that scale, check every object's bounding box — its
  length in points equals the stated measure, and it starts on the stated
  mark — at every level and in both unit systems, and check that both ends
  land on a drawn tick. Difficulty is the precision asked
  (`rating_basis: measuring_precision`).
