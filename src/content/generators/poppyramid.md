---
title: "Population Pyramid"
blurb: "Population pyramids — read or draw a pyramid of age bands, find the shares aged 0-14, 15-64 and 65+, the dependency ratio and the shape, every answer recomputed from bars that sum to exactly 100%"
category: maths
version: "1.0.0"
---
Read the bars, add up the ages, work out who depends on whom — a population pyramid whose every answer is recomputed from bars that sum to exactly 100%.

## What it is

A geography worksheet built round one population pyramid: a country's
people in seventeen five-year age groups, from 0-4 up to 80 and over, with
males to the left and females to the right. Each bar is the percentage of
the whole population in that age group and sex. In read mode the pyramid
is drawn; in draw mode a table of the percentages is printed beside blank
axes and pupils draw the bars themselves. Four to ten questions follow:
the value of one bar, the largest age group, which sex is larger in an age
group, the percentages aged 0-14, 15-64 and 65 and over, the dependency
ratio, the number of older people in millions, and whether the pyramid is
expansive, stationary or constrictive. The answer key fills in every
answer and, in draw mode, draws the pyramid.

## How to play

1. Each bar shows a percentage of the whole country. Read its length on
   the scale under its side: males on the left, females on the right.
2. To find a percentage for an age range, add the bars for both sexes in
   every age group in that range. Children are aged 0-14 (three age
   groups), the working age is 15-64 (ten age groups) and older people are
   65 and over (four age groups). The three answers add up to 100%.
3. **Dependency ratio:** add the percentages aged 0-14 and 65 and over,
   divide by the percentage aged 15-64, and multiply by 100. It tells you
   how many dependants there are for every 100 people of working age. The
   old-age dependency ratio uses only those aged 65 and over. Give ratios
   to one decimal place.
4. **People:** a percentage of a population in millions is that many
   hundredths of it: 12% of 40 million is 4.8 million.
5. **Shape:** an expansive pyramid has a wide base — more children (0-14)
   than young adults (15-29). A stationary one has about as many children
   as young adults. A constrictive one has a narrower base, with fewer
   children than young adults.
6. **Drawing:** for each age group draw a bar to the left for males and to
   the right for females, as long as the percentage in the table.

## Purpose

Population pyramids are a core skill of school geography: England's GCSE
(AQA Paper 2, population and development) and IGCSE ask pupils to draw,
read and interpret them, and India's CBSE geography uses them to compare
countries at different stages of development. The page joins graph skills
(reading a back-to-back bar chart, drawing one to scale) with arithmetic
(adding percentages, a ratio to one decimal place) and with the ideas
behind the demographic transition: why young countries have wide bases,
why ageing countries narrow at the bottom, and what that means for the
people of working age who support everyone else.

## History

The American statistician Francis Amasa Walker drew some of the first
population pyramids, from the 1870 census, for the *Statistical Atlas of
the United States* (1874), and the Swedish
demographer Gustav Sundbärg classified populations by their age shape in
1900 — "progressive", "stationary" and "regressive", the ancestors of the
expansive, stationary and constrictive types used in schools today. Warren
Thompson's demographic transition model (1929), later developed by Frank
Notestein, explained how a country's pyramid changes shape as its birth and
death rates fall. The dependency ratio became a standard United Nations
indicator in the 1950s.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`read`, `draw`); `shape` (`any`,
  `expansive`, `stationary`, `constrictive`); `count` (4-10, clamped and
  recorded as `requested_count`); `width`, `height`, `line`.
- **Generation:** the population is synthetic. Births change by a factor
  each five years (rising 8-14% for an expansive country, within 1.5% for
  a stationary one, falling 5-10% for a constrictive one); survival
  follows Gompertz mortality with women living longer and 5% more boys
  born; each bar gets up to 5% of seeded noise, and the 80+ bar sums five
  cohorts. The bars are rounded to halves of a percent (tenths for
  draw-mode tables from Hard) by largest remainder, each at least one step,
  so they sum to exactly 100.0. A population is kept only when its shape
  measure — the share aged 0-14 divided by the share aged 15-29 — is at
  least 1.15 (expansive), between 0.95 and 1.05 (stationary) or at most
  0.85 (constrictive). Easy asks for bars, the largest group, which sex is
  larger and the share aged 0-14; Medium adds the shares aged 15-64 and 65+
  and the shape; Hard adds the dependency ratio; Expert adds the old-age
  ratio and people in millions. Kids is served at Easy (meta
  `requested_difficulty`). A question this population cannot ask cleanly
  (no single largest group on a flat stationary pyramid) becomes a bar
  reading, and no question repeats.
- **Solving:** the checker recomputes every answer from the integer bars:
  sums over explicitly listed age groups, ratios rounded half up from exact
  integer division, people as an exact decimal, the largest group only
  when it beats the next by a whole step, and the shape from the measure.
- **Guarantees:** `answers_checked` and `unique`: the bars sum to exactly
  100%, each answer is exact (ratios to one decimal place, never within
  0.001 of a rounding tie), and the shape is never near a threshold. The
  tests work every answer again in floating point, check that expansive
  pyramids taper and constrictive ones are narrower at the base than in
  the middle, that every bar is drawn to one scale, catch a changed answer
  and a table that no longer sums to 100, and keep every printed character
  inside the font.
