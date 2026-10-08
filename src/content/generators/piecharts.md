---
title: "Pie Charts"
blurb: "Pie charts — read fractions, counts and percentages, work out the angles, draw from a table and compare two charts, every angle a whole number of degrees summing to 360"
category: maths
version: "1.0.0"
---
Read, work out, draw and compare pie charts — every angle a whole number of degrees, and the angles always add up to 360°.

## What it is

A worksheet of two to eight questions on pie charts (circle graphs).
Some questions show a pie chart of a survey — favourite fruit, how
pupils travel to school, favourite sport, pets, colours or lunches —
with the angle of each sector marked, and ask what fraction, how many or
what percentage chose one answer. Others give a frequency table to turn
into angles, or a table and an empty circle to draw the pie chart in.
Comparison questions show two pie charts of groups of different sizes,
where the bigger sector can stand for fewer people. The answer key
writes every answer in red and draws the finished pie charts.

## How to play

- **A whole circle is 360°.** A sector's angle out of 360 is the fraction
  of the people in that sector. A 90° sector is 90/360 = 1/4 of everyone.
- **How many?** Divide the angle by 360 and multiply by the number of
  people asked. If 60 pupils were asked, a 90° sector is 60 × 90 ÷ 360 =
  15 pupils.
- **Percentages:** divide the angle by 3.6. A 72° sector is 20%.
- **From one known sector:** if 12 people make a 72° sector, each degree
  stands for 12 ÷ 72 of a person, so the whole circle is 12 × 360 ÷ 72 =
  60 people. Use that to find any other sector.
- **A missing angle:** the angles add up to 360°, so subtract the others
  from 360.
- **Working out the angles:** each person gets 360 ÷ (total) degrees.
  Multiply each frequency by that. Check the angles add up to 360°.
- **Drawing:** start at the line already drawn from the centre. Put the
  protractor's centre on the centre of the circle, measure the first
  angle, and draw the next radius; measure each angle from the line you
  just drew. Label every sector.
- **Comparing:** a bigger sector only means a bigger share of its own
  group. Work out the actual numbers before deciding which group had
  more.

## Purpose

Interpreting and constructing pie charts is statutory in England in Year
6 ("interpret and construct pie charts and line graphs and use these to
solve problems") and returns at KS3 and GCSE; in India it is the "Data
Handling" chapter of NCERT class 8 (central angles of a circle graph);
in the US circle graphs appear in middle-school statistics. The page
practises fractions and proportion of 360, percentages, and the
misconception that a larger sector always means more people.

## History

William Playfair drew the first known pie chart in his *Statistical
Breviary* of 1801, showing the land of the Turkish Empire across three
continents. Florence Nightingale's "coxcomb" diagrams of 1858 — a polar
relative of the pie chart — persuaded Parliament that most soldiers in
the Crimean War died of preventable disease. The name "pie chart" is
twentieth-century; French readers still call it a *camembert*.

## This implementation

- **Spec knobs:** `difficulty`; `topic` (`mixed`, `read`, `angles`,
  `draw`, `compare`); `locale` (`uk` pupils, colour and football and the
  title "pie charts"; `us` students, color, soccer and "circle graphs";
  `in` students and "pie charts (circle graphs)"); `count` (2-8);
  `shade` (light grey sectors, or white); `width` (300-2000 Pt) and
  `height` (300-3000 Pt). Out-of-range values are clamped and reported in
  meta as `requested_*`.
- **Generation:** every chart is built from whole units — `t` units of
  360/t degrees (t a divisor of 360), each sector a whole number of units
  above a minimum size, and a whole number of people per unit — so every
  angle is a whole number of degrees, the angles sum to exactly 360, and
  every count is a whole number. Easy: two to four sectors in multiples
  of 30° or 45°, totals that divide 360, "what fraction?". Medium: four
  or five sectors, "how many?", percentages (only when they are whole),
  and comparisons. Hard: totals that do not divide 360 and counts from
  one known sector. Expert: five or six sectors in any whole number of
  degrees (each at least 18°) and a missing sector. A comparison makes
  the bigger sector the smaller count on purpose.
- **Solving:** each answer is recomputed from the printed angles and
  totals with exact fractions: angle/360 of the total, 100 × angle/360,
  the total from one sector as count × 360 / angle, a missing angle as
  360 minus the rest, and each table angle as frequency × 360 / total.
- **Guarantees:** angles are whole degrees, at least 10° (18° or more in
  practice, so labels fit), and sum to exactly 360; every count and
  percentage asked for is exact; the comparison's bigger sector is always
  the smaller group. Comparing starts at Medium; a lower request is served
  at Medium and the meta records `requested_difficulty`. Meta:
  `answers_checked`, `unique`, `difficulty`, `rating_basis`
  (`question_forms_by_level`), `angles`.
