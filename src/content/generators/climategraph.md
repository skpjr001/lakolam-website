---
title: "Climate Graph"
blurb: "Climate graphs — read or draw an invented station's rainfall bars and temperature line, find extremes, totals and ranges, and name the climate from a key"
category: maths
version: "1.0.0"
---
Read (or draw) a weather station's year of rainfall bars and temperature line, then name its climate from the key.

## What it is

A geography worksheet built round one climate graph: twelve bars for each
month's rainfall and a line for each month's average temperature, on one
grid with temperature on the left scale and rainfall on the right. Every
value sits exactly on a grid line, so it can be read without guessing.
Four to ten questions ask for a month's rainfall or temperature, the
wettest, driest, warmest and coldest months, the temperature range, the
year's total rainfall, how many months pass a rainfall, the hemisphere,
the mean temperature, whether summer or winter is wetter, and — with the
printed key — the climate type. In draw mode the page gives the data in a
table and empty axes to draw the graph on first. The stations are
invented, so every number is exact. The answer key fills in every answer
and, in draw mode, shows the finished graph.

## How to play

1. Rainfall is read from the bars against the right-hand scale (mm);
   temperature from the dots on the line against the left-hand scale (°C).
   Follow the grid line across to the scale.
2. **Wettest, driest, warmest, coldest:** find the tallest or shortest bar,
   or the highest or lowest point of the line, and name its month.
3. **Temperature range:** warmest month's temperature minus the coldest
   month's (remember that taking away a negative number adds).
4. **Total rainfall:** add all twelve bars.
5. **Hemisphere:** if the warmest months are June to August, the station
   is in the northern hemisphere; if they are December to February, the
   southern.
6. **Climate type:** go down the key from rule 1 and stop at the first rule
   the station fits.
7. **Drawing the graph:** for each month draw a bar up to its rainfall,
   then mark its temperature with a dot in the middle of the month and join
   the dots with straight lines.

## Purpose

Climate graphs are a staple of England's Key Stage 3 and GCSE geography,
of Australian and Indian school geography, and of US world-geography
courses: pupils must draw them, read them and use them to describe and
explain the climates of places — equatorial rainforests, monsoon and
savanna lands, hot deserts, Mediterranean coasts, mild maritime and harsh
continental climates and the polar tundra. The page practises the reading
and the arithmetic (ranges with negative numbers, totals) and ties the
shapes of the graph to the climate types through a simple, printed key.

## History

Wladimir Köppen published the first quantitative climate classification
in 1884 and refined it until 1936; it groups climates by temperature and
rainfall thresholds much like the simplified key on this page, and with
Rudolf Geiger's revisions is still the most used scheme. The combined bar
and line climate chart (sometimes called a climograph or
Walter–Lieth-style diagram, after Heinrich Walter and Helmut Lieth's 1960
climate-diagram atlas) became the standard way to show a place's year at
a glance.

## This implementation

- **Spec knobs:** `difficulty`; `mode` (`read` the drawn graph, or `draw`
  it from a table — the key shows it); `climate` (`any`, chosen by the
  seed, or one of `equatorial`, `tropical_wet_dry`, `hot_desert`,
  `mediterranean`, `temperate_maritime`, `continental`, `polar`); `count`
  (4-10, clamped and recorded as `requested_count`; a question that cannot
  be asked of a station — the hemisphere of an equatorial one, a mean that
  is not a whole or half degree — is dropped and meta `questions_served`
  says how many remain); `width`, `height`, `line`.
- **Generation:** each climate is a template — a mean temperature and a
  seasonal swing, a wet and a dry season (wet in summer for most, in
  winter for Mediterranean stations) — with seeded variation, mirrored for
  the southern hemisphere. Temperatures are rounded to 2 °C steps and
  rainfall to 5, 10 or 20 mm steps, and the grid lines are chosen so that
  every step of both scales is a line. A station is kept only when the key
  classifies it as its template, every threshold the key tests is met or
  missed by a clear margin (2 °C, 5 mm, 40 mm a year), the wettest and
  driest (and, except for equatorial stations, warmest and coldest) months
  are unique, and the three warmest months are clearly the three warmest.
  Easy asks single readings and the wettest and warmest months; Medium
  adds the driest and coldest months, the range and months over a
  rainfall; Hard adds the annual total, the hemisphere and the climate
  type; Expert adds the mean temperature, the rainfall range and the
  wetter season. Kids is served at Easy (meta `requested_difficulty`).
- **Solving:** every answer is recomputed from the data table; the climate
  key is an ordered rule list ("the first rule that fits"), so every
  station has exactly one climate.
- **Guarantees:** `answers_checked` and `unique`. The tests classify every
  station a second way, recompute every answer independently, check that
  every value lies on a grid line and the scales cover the data, that an
  off-grid value or a changed answer is caught, that all seven climates
  occur, and that the graph and questions stay inside the page.
