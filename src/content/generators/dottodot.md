---
title: "Dot-to-Dot"
blurb: "Connect the dots — parametric silhouettes with verified dot separation"
category: puzzle
version: "1.1.0"
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

Some pages are labelled for practice instead of with 1, 2, 3:

- **Counting on** — count in twos, fives, tens… from the enlarged dot.
- **Times tables** — each dot shows a multiplication fact such as 6×7.
  Work out the answers and join the dots from the smallest answer to the
  largest. The answer key prints the answers.
- **Alphabet** — A to Z, then AA, BB, CC…
- **Roman numerals** — I, II, III, IV…

## Why it is in the catalogue

A pillar of the activity-book category, and a generator whose craft is in the
*numbering*: a dot-to-dot fails when labels crowd or two dots sit so close
the pencil cannot tell which was meant.

## The implementation's guarantees

- **Spec knobs:** `shape`, `dots`, `size`, `dot`, `label`; `labels`
  (`numbers` — the default — `skip_count`, `times_table`, `alphabet`,
  `roman`); for `skip_count`, `step` (default 2) and `start` (0 = start at
  `step`). Times-table facts use factors 2–12, so a page holds at most as
  many dots as there are distinct products (the alphabet at most 52).
- **Additive:** a spec without `labels` is byte-identical to version 1.0 —
  page, key and metadata (checked over five specs × six seeds). The new
  schemes consume randomness only for the times-table facts, from their own
  stream (`dottodot/labels`), and add `labels`, `first_label`,
  `last_label` (and `step`/`start`) to the metadata only when switched on.
- **Every label is drawable and the order is unique:** tested — every label
  is covered by the stroke font (digits, capitals, `×`), and the labels rise
  strictly along the tracing order (counting, the alphabet, a numeral's
  value, a fact's answer), so there is one sensible tracing. Every printed
  fact is true and its answer is the key's label.
- **Wider labels, wider spacing:** for the new schemes the spacing floor
  grows to the widest label's measured width plus air, the sampler thins
  until every pair of dots clears it, and a hard corner crowding another
  closer than that floor is dropped rather than forced (the fish's tail
  notch) — the label could not be read there anyway. Each label stands off
  its dot by its own half-width in the direction it is pushed.

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
