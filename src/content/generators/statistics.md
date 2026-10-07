---
title: "Statistics"
blurb: "Statistics worksheet — stem-and-leaf diagrams, box plots, histograms, grouped data and scatter graphs"
category: maths
version: "1.0.0"
---
Stem-and-leaf diagrams, box plots, histograms, grouped data and scatter
graphs — read them, draw them, and find the averages and spread.

## What it is

A worksheet of two to six data questions. Some show a diagram to read: an
ordered stem-and-leaf diagram, a back-to-back diagram comparing two
groups, two box plots on one scale, a frequency table, a grouped frequency
table or a scatter graph. Others give the data and ask you to draw: a
stem-and-leaf diagram to complete, a box plot on a number line, a
histogram on empty axes, or a frequency density column and histogram for
classes of different widths. Each question has answer blanks — median,
mode, range, quartiles, interquartile range, mean, modal class, the class
holding the median, or the type of correlation. The answer key fills in
every leaf, bar, box and blank in red.

## How to play

- **Stem-and-leaf:** the stem is the tens digit and each leaf a units
  digit; the key shows how to read a row (2 | 5 = 25). In an ordered
  diagram the leaves run from smallest to largest. In a back-to-back
  diagram the left group's leaves read outwards from the stem, right to
  left.
- **Median:** the middle value when the data are in order — for n values,
  the (n + 1)/2th. With an even number of values, take halfway between the
  middle two. **Mode:** the most common value. **Range:** largest minus
  smallest.
- **Quartiles and box plots:** the lower quartile (Q1) is a quarter of the
  way through the ordered data, the upper quartile (Q3) three quarters.
  The key names the rule the page uses (the median of each half, leaving
  out the middle value; or the (n + 1)/4th and 3(n + 1)/4th values). A box
  plot draws a box from Q1 to Q3 with a line at the median, and whiskers
  out to the lowest and highest values. The interquartile range (IQR) is
  Q3 - Q1: the bigger it is, the more the middle half of the data is
  spread out.
- **Frequency tables:** a value with frequency 5 appears five times. The
  mean is (each value x its frequency, all added) / (total frequency).
- **Grouped tables:** each class runs from just above its lower number
  up to and including its upper number: the 20-to-30 class holds values
  more than 20 and at most 30. The modal class has the highest frequency; add the
  frequencies down the table to find the class holding the middle value.
  To estimate the mean, use each class's midpoint as if every value were
  there.
- **Histograms:** bars touch, one for each class. With equal widths the
  height is the frequency. With unequal widths the height is the
  frequency density = frequency / class width, so the area of each bar is
  its frequency.
- **Scatter graphs:** if the points rise from left to right, the
  correlation is positive; if they fall, negative; if they are scattered
  with no pattern, there is no correlation.

## Purpose

These are the statistics topics of middle school and lower secondary maths
— US grade 6 and 7 statistics (dot plots aside: stem-and-leaf, box plots,
measures of centre and spread), and Key Stage 3 and GCSE in England
(grouped data, histograms, frequency density, scatter graphs). They follow
on from bar charts and simple averages: the questions practise reading a
diagram accurately, choosing the right average and measure of spread,
summarising a data set in five numbers, and comparing two groups.

## History

Box plots and stem-and-leaf displays are young: John Tukey introduced both
in *Exploratory Data Analysis* (1977), as quick pencil-and-paper ways to
see a data set's shape. The histogram is older — Karl Pearson named it in
1891 — and Francis Galton's work on heredity in the 1880s gave scatter
diagrams and correlation, which Pearson put on a formal footing. Quartiles
themselves have no single agreed definition; textbooks, calculators and
exam boards use different rules, which is why this page names its rule.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`mixed`, `stem_and_leaf`,
  `box_plots`, `histograms`, `averages`, `scatter`); `locale` (the
  quartile rule: `us` takes the median of each half, leaving out the
  middle value; `uk` and `in` take the (n+1)/4th and 3(n+1)/4th values);
  `count` (2-6); `width` (300-2400 pt), `height` (300-3000 pt), `line`
  (0.25-4 pt). Out-of-range numbers are clamped.
- **Generation:** Easy reads ordered stem-and-leaf diagrams (11-17
  values, an odd number, with a single mode) and frequency tables (mode,
  median, range). Medium completes a stem-and-leaf diagram from a printed
  list (12-18 values), finds the five-number summary of a list and draws
  its box plot, finds the mean from a frequency table, the modal class
  and the median class from a grouped table, and draws a histogram with
  equal class widths. Hard adds back-to-back diagrams (9-12 values a
  group), comparing two box plots by their interquartile ranges, the IQR
  of a list, the estimated mean from grouped data, and scatter graphs
  (10-14 points). Expert adds frequency density with unequal class
  widths and longer lists for box plots. Kids is served as Easy, and
  single-topic pages at an honest level: stem-and-leaf tops out at Hard,
  averages at Hard, box plots and histograms start at Medium, and scatter
  graphs are Hard; meta then reports `requested_difficulty`. Each
  question on a page uses a different setting where it can.
- **Quartiles:** UK and Indian pages use only odd data sizes, where the
  (n+1)/4th position is a whole or half number and the two rules give
  the same quartiles; US pages also use even sizes, where only the
  median-of-halves rule applies. The key prints the rule beside the
  answers and meta records it as `quartile_rule`.
- **Solving:** every answer is an exact fraction printed as a terminating
  decimal; the key also writes the leaves, draws the box plot or the
  histogram bars, and fills in the frequency densities.
- **Guarantees:** a mode and a modal class are unique where asked; means,
  estimated means, medians, quartiles and densities terminate within two
  decimal places; grouped tables have an odd total, so the median class
  is the class of one middle value; two compared box plots differ in
  spread; a scatter graph's correlation is decided exactly from its
  points (positive or negative when r² ≥ 0.64, none when r² ≤ 0.04, and
  never in between). The tests recompute every answer by other means —
  medians by striking out the largest and smallest values in turn,
  quartiles by both rules in floating point (and check they agree on UK
  and Indian pages), modes from runs of equal values, median classes by
  listing every value's class, means in floating point, Pearson's r in
  floating point — and read the drawings back: stem-and-leaf digits row
  by row (a completed diagram must rebuild the printed list), box edges
  against the quartiles on the number line's scale, histogram bars
  against class bounds and frequencies or densities (the areas add up to
  the total frequency), and scatter crosses against the data points.
  Meta reports `answers_checked` and every question with its answers.
