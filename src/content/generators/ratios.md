---
title: "Ratios and Percents"
blurb: "Ratios and percents — ratio tables, simplifying, sharing with bar models, unit rates, percent bars"
category: maths
version: "1.0.0"
---
Ratio tables, simplifying ratios, sharing in a ratio with bar models, unit
rates, percents of amounts and percent bars, with every answer coming out
exactly.

## What it is

A worksheet with a NAME and DATE line and three titled sections, or a
whole page of one kind. Ratio tables are two-row tables (flour and sugar,
red and blue beads, boys and girls) with some cells left empty. Simplify
questions give a ratio such as 12 : 18 with blanks for its simplest form.
Sharing questions ("Share 45 in the ratio 2 : 3") come with a bar model:
one bar per person, cut into as many equal boxes as their part of the
ratio, and a bracket showing the total. Unit-rate questions give an amount
and a count ("210 liters in 5 minutes") and ask how much for one. Percent
questions ask for a percent of a number, and percent bars show a bar cut
into equal parts over a double number line, with amounts above and
percents below and some of each left as empty boxes. The answer key
fills in every blank in red, and writes the value of one box in every box
of each bar model.

## How to use it

**Ratio tables.** Every column shows the same ratio. Find what one column
was multiplied (or divided) by to make another, and do the same to the
other row. When no column is a simple multiple of another, first divide a
full column down to its simplest form, then build up.

**Simplifying.** Divide every part of the ratio by a number that divides
them all. Repeat until no number bigger than 1 divides every part.

**Sharing in a ratio.** Add the parts of the ratio to find how many boxes
there are altogether. Divide the total by the number of boxes to find one
box, write it in every box, then add up each person's boxes.

**Unit rates.** Divide the amount by the count: 210 liters in 5 minutes is
210 / 5 = 42 liters per minute.

**Percent of a number.** 10% is one tenth, 50% is one half, 25% is one
quarter and 1% is one hundredth. Build other percents from these: 35% is
three lots of 10% and one of 5%. Percents above 100% are more than the
whole.

**Percent bars.** The whole bar is 100%. Each part is the same fraction of
the amount as it is of 100%. Work out one part, then count along. When the
whole is missing, use the pair you are given to find one part first.

## Purpose

Ratio and proportional reasoning is the heart of middle-school maths: it
is how recipes scale, maps work, prices compare and percents make sense.
Ratio tables, bar models and double number lines are the three pictures
used by Singapore maths and by US and UK curricula to make that reasoning
visible before it becomes algebra. The questions move from multiplying up
from a unit ratio, through sharing and unit rates, to finding a whole from
a part.

## History

Ratio and proportion fill Book V of Euclid's Elements, and the "rule of
three" for solving proportions was the most celebrated rule in merchants'
arithmetic from medieval India to Renaissance Italy. Percent comes from
the Latin per centum, "for each hundred", used for Roman taxes; the %
sign grew out of a scribal abbreviation in fifteenth-century Italian
manuscripts. Bar models were developed by the Singapore Ministry of
Education in the 1980s and are now used worldwide.

## This implementation

- **Spec knobs:** `difficulty`; `task` (`mixed`, `tables`, `simplify`,
  `share`, `unit_rates`, `percent`, `percent_bars`); `problems` for a
  single-task page (1-40; 0 = the usual number: 6 tables, 18 ratios to
  simplify, 6 sharing questions, 12 unit rates, 20 percents, 6 bars);
  `locale` (`us`: miles and liters; `uk`: miles and litres; `in`: km and
  litres with 12,34,567 grouping); page `width`, `height`, `line`.
- **Difficulty (grade):** Kids (grade 5-6) = ratio tables that start from
  the unit ratio, ratios with terms to 5 times a factor to 5, sharing in
  two parts, 10%, 50% and 100%; Easy (grade 6) = tables to 10 times,
  10/20/25/50/75%, bars in 4, 5 or 10 parts; Medium (grade 6-7) = tables that need not
  start from the unit ratio, unit rates, percents in steps of 5; Hard
  (grade 7) = tables with multipliers 2-15 in random order, three-part
  ratios, sharing in three parts, percents like 12%, 36% or 125%, bars
  where the whole must be found; Expert (grade 7-8) = six-column tables,
  decimal unit rates, percents such as 12.5% or 17.5% with answers to at
  most two decimal places, bars cut into eighths and totals with halves.
  A mixed page: Kids tables, simplify, share; Easy tables, bars,
  percents; Medium tables, share, unit rates; Hard bars, simplify,
  percents; Expert tables, share, percents.
- **Generation:** values are built from the answer outwards: tables from
  a ratio in simplest form times distinct multipliers; ratios to simplify
  from a simplest form times a common factor; shares from the value of
  one box times the parts; rates from a rate times a count; percents with
  the whole a multiple of the percent's denominator (so the answer is
  whole, or at Expert has at most two decimal places); bars from a total
  divisible by the number of parts. Problems are drawn without repeats
  (two tables showing the same ratio count as a repeat) under an attempt
  budget; a page that asks for more than exist, or more than fit, is
  refused with a clear message.
- **Solving:** exact arithmetic throughout (integers and scaled-integer
  decimals, never floating point).
- **Guarantees:** deterministic per seed. Checked by cross-multiplication
  with exact fractions before the page is drawn: every pair of columns in
  a ratio table has a x d = b x c, one column is shown in full and every
  other column shows one of its two cells, so each blank is determined; a
  simplified ratio has the same cross products and no common factor;
  shares add up to the total and keep the ratio; rate x count = amount;
  percent x whole = 100 x answer; on a bar every amount and percent sits
  at the right fraction of the whole, and at least one amount besides 0
  is shown. No problem repeats within a section. Tests prove these across
  every task and level, and recover every table blank from its column.
  Meta records `answers_checked`, `no_duplicates`, the grade,
  `rating_basis: number_size_and_skill`, and every question and answer.
  A page takes a few milliseconds.
