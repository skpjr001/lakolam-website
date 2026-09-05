---
title: "Dot-to-Dot"
blurb: "Connect the dots — parametric silhouettes with verified dot separation"
category: puzzle
version: "1.0.0"
---
A silhouette sampled into numbered dots: connect 1, 2, 3… and the picture
appears.

## What it is

Parametric silhouettes — heart, star, flower, fish, house, rocket — sampled
along their outlines into a numbered tracing order. The shapes are curves and
vertex lists, not clipart, so stars vary their point count and inner radius,
flowers their petal count, and orientation varies by seed where the shape
survives rotation (an upside-down heart reads as a mistake, so it stays
upright).

## How to play

Start at the enlarged dot 1 and draw to each next number in turn; the final
dot connects back to 1. The answer key shows the traced outline.

## Why it is in the catalogue

A pillar of the activity-book category, and a generator whose craft is in the
*numbering*: a dot-to-dot fails when labels crowd or two dots sit so close
the pencil cannot tell which was meant.

## The implementation's guarantees

- **Spacing is the mandatory check**: every pair of dots — consecutive or not
  — must clear a floor derived from the label size, and the sampler thins the
  dot count until it holds. The metadata reports both the requested and the
  surviving count, and the measured `min_gap_pt`.
- **Corners survive resampling**: polygon vertices are always dots — a star
  with its points rounded off is not a star.
- Labels are placed outward from the shape's centroid, where the drawn line
  will not run through them.
- Rating basis: `dot_count` (Easy ≤ 25, Medium ≤ 55, Hard above). `unique`
  means the numbering admits one sensible tracing under the spacing floor.
