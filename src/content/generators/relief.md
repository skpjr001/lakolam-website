---
title: "Contour Map"
blurb: "Contour maps — heights, slopes, river flow, summits and cols, and cross-sections from a seeded landscape, every answer checked against the height field"
category: maths
version: "1.0.0"
---
Read the brown lines: heights, steep slopes, which way the river runs, summits and cols, and a cross-section to draw — every answer checked against the land itself.

## What it is

A geography map-skills worksheet built round one contour map of an
imaginary piece of countryside two kilometres across: rounded hills with
cols between them, or a valley between ridges. Brown contour lines join
places of equal height, some of them labelled; spot heights mark
summits, a blue river runs downhill, and a north arrow, a scale bar and a
key sit beside the map. Lettered points carry four to eight questions:
the height of the land at a point, how much higher one point is than
another, which of two slopes is steeper, which way the river flows,
whether a marked place is a summit or a col, and a cross-section to draw
along a dashed line on printed axes. The answer key gives every answer
and plots the cross-section.

## How to play

1. Every point on a contour line is at that line's height. Neighbouring
   lines differ by the contour interval given in the box: 5, 10, 20 or 50
   metres.
2. Only some lines carry a number. To find an unlabelled line's height,
   start at a labelled one and count the lines, going up towards summits
   (closed rings and spot heights) and down towards rivers and the lower
   numbers.
3. **Height difference:** find both heights and subtract.
4. **Steeper slope:** the closer the contours, the steeper the land. Each
   slope joins two lettered points; the one that climbs more height in a
   shorter distance is steeper.
5. **River:** water flows downhill, from higher contours to lower. Give
   the direction from where the river starts to where it leaves the map
   (north, north-east, east…).
6. **Summit or col:** a summit is a hilltop ringed by closed contours. A
   col is the low point of a ridge between two summits, where the
   contours pinch together like an hourglass.
7. **Cross-section:** lay a strip of paper along the dashed line, mark
   where it crosses each contour and its height, then transfer the marks
   to the axes, plot each height above its place and join the points with
   a smooth curve. Give the highest contour the line crosses.

## Purpose

Reading relief from contours is a core map skill in geography courses:
India's ICSE class 10 sets a whole question on a Survey of India
topographical sheet, CBSE class 11 practical geography teaches contours
and cross-sections, and England's KS3 and GCSE courses use Ordnance Survey
maps. Turning flat lines into a picture of the land takes practice; the
cross-section shows the shape the contours describe, and the questions
cover the readings examiners ask for most.

## History

The first contour lines were drawn under water: Pieter Bruinss mapped the
depth of the river Merwede in 1584, and Edmond Halley drew lines of equal
compass variation in 1701. Philippe Buache drew depth contours of the
English Channel in 1752, and Charles Hutton used contours on land to work
out the volume of the Scottish mountain Schiehallion for the 1774
experiment that weighed the Earth. Contours became standard on national
survey maps in the nineteenth century, and Britain's Ordnance Survey
printed them from the 1840s.

## This implementation

- **Spec knobs:** `difficulty`; `interval` (`m5`, `m10`, `m20`, `m50`);
  `terrain` (`any`, `hills`, `valley`); `count` (4-8, clamped and
  recorded as `requested_count`); `width`, `height`, `line`.
- **Generation:** the land is a sum of Gaussian hills (two placed a col
  apart, one or two more), or a trough through the middle falling along its
  length with spurs, plus a tilt and gentle waves, sampled on an 81 × 81
  grid and scaled to between 8 and 12 contour intervals of relief.
  Contours come from marching squares. Summits are grid points above
  their eight neighbours with a closed contour round them; the river is
  traced by steepest descent from high ground to the map edge. Points for
  height questions are taken on contour lines, clear of the map edge,
  other contours and other letters. Easy labels every contour and asks
  heights, river flow and summits; Medium labels every second contour and
  adds height differences, steeper slopes and a cross-section; Hard and
  Expert label only every fifth (index) contour and add cols. Kids is
  served at Easy (meta `requested_difficulty`). A question the landscape
  cannot ask cleanly (no river pointing clearly one way, no clean col)
  becomes a height question.
- **Solving:** answers are checked against the height field, not the
  drawn lines: each point's height by bilinear interpolation must be its
  contour's level (to 2% of an interval); slopes are compared only when
  one is at least 1.5 times steeper; the river must fall at every step and
  its direction from source to mouth must be at least 10° from a compass
  sector boundary; a summit must stand above its neighbours with a closed
  contour round it; a col must have its neighbours rise and fall twice
  round it, a contour just above it closing into two separate rings
  round summits a whole interval higher, and lower ground a whole
  interval below on two sides (found by flood fill and steepest descent);
  the section's top must be at least 15% of an interval from any contour.
- **Guarantees:** `answers_checked` and `unique`. The tests read every
  height again by interpolating cell edges, resample each section at 1000
  points, recompute slope ratios and river ends, check summit and col
  detection on hand-built hills, catch changed answers and a point moved
  off its contour, and keep every printed character inside the font.
