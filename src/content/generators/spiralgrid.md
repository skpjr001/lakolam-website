---
title: "Spiral Guide Paper"
blurb: "Spiral guide paper — an evenly spaced Archimedean or a golden (logarithmic) spiral, with spokes and turn rings"
category: paper
version: "1.0.0"
---
A spiral as large as the page — evenly spaced like a coiled rope, or
widening like a shell in the golden ratio — with optional spokes and rings.

## What it is

A sheet with one spiral drawn on it, centred and as big as fits, to write,
draw or design along. There are two kinds:

- **Archimedean** — the gap between one turn and the next is always the
  same, like a rolled-up rope or the groove of a record. Choose 1 to 30
  turns; the gap is the radius divided by the number of turns.
- **Logarithmic** — every quarter turn the spiral grows by the same ratio,
  so it keeps its shape as it widens, like a nautilus shell. Growing by the
  golden ratio (about 1.618) each quarter turn makes the golden spiral;
  1.2, 1.4 and 2 make tighter or more open coils.

Up to eight arms can wind together, evenly spaced. Spokes run from the
centre out to the outermost turn, and rings can mark the end of each whole
turn, so the spiral sits on its own faint polar grid. It can wind
clockwise or anticlockwise.

## How to use it

Print the page at actual size ("Actual size" or "100%" in the print
dialog).

For spiral writing, start at the outer end and write a poem, a word list
or a story along the line, turning the page as you go; the even gaps of the
Archimedean spiral keep every line of writing the same height. For art,
fill the bands between turns with patterns, colours or doodles, or use
several arms for a whirlpool or galaxy. Designers and photographers use
the golden spiral as a composition guide: trace it onto a layout and place
the centre of interest at its tight end. Use the spokes to divide each turn
into equal parts, for spiral calendars, timelines and board-game tracks.

## Purpose

Spiral paper is for spiral poems and handwriting practice, mindful
colouring and zentangle-style art, drawing lessons on curves and growth,
maths lessons on the difference between adding a fixed amount each turn
(Archimedean) and multiplying by a fixed ratio (logarithmic), and design
work with the golden spiral. In a book, a few spiral pages make an art or
journaling section.

## History

Archimedes described the spiral of constant spacing in his treatise
*On Spirals* around 225 BC. The logarithmic, or equiangular, spiral was
studied by René Descartes in 1638; Jacob Bernoulli called it the
*spira mirabilis*, "the marvellous spiral", for keeping its shape as it
grows, and asked for one on his tombstone in Basel — the mason carved an
Archimedean spiral instead. The golden spiral is the logarithmic spiral
that grows by the golden ratio every quarter turn; it is often drawn
roughly with quarter circles in nested golden rectangles, but this page
draws the true curve. Approximate logarithmic spirals appear in nautilus
shells, hurricanes and the arms of spiral galaxies.

## This implementation

- **Spec knobs:** `page` (letter, a4, a5, legal, tabloid, a3) and
  `landscape`; `margin_mm` (0–30, default 10); `spiral` (archimedean,
  logarithmic); `turns` (1–30, default 8); `growth` per quarter turn of a
  logarithmic spiral (golden, ratio_1_2, ratio_1_4, ratio_2); `arms`
  (1–8); `clockwise`; `spokes` (0–72, default 12); `rings` (turn rings on
  or off); `ink` for the spiral (default dark blue) and `guide_ink` for
  spokes and rings; `weight` (0.1–3 pt; guides at 60 % of it).
- **Generation:** the Archimedean arm is `r = R·t / (2π·n)` and the
  logarithmic arm `r = R·g^((t − 2π·n) / (π/2))`, for `t` from 0 to `2π·n`,
  with the outer end of the first arm pointing right; other arms are the
  same curve rotated by equal angles. Each arm is drawn as a polyline whose
  vertices lie exactly on the curve, the step chosen from the local
  curvature so every chord strays less than 0.005 pt from it. A logarithmic
  spiral stops where its radius would drop below 0.1 mm (the request is
  recorded when that cuts turns short). Spokes end where the ray meets the
  outermost turn; rings pass through the end of each whole turn (circles
  under 1 mm are left out). The whole drawing is measured, scaled to the
  largest size that fits the content box and centred.
- **Solving:** nothing to solve — a page to write and draw on. The seed is
  unused: every seed gives the same sheet.
- **Guarantees:** along any ray the Archimedean turns are exactly
  `R / n` apart (`R / (n·arms)` between neighbouring arms) and the
  logarithmic turns grow by exactly `g⁴` per turn — both measured on the
  drawn lines in the tests; vertices lie on the curve; the drawing is
  centred and touches the content box on its tighter side; and all ink —
  stroke widths included — stays inside the margins, on every page size,
  orientation, kind, growth and arm count tested. A knob outside its range
  is clamped and the request recorded as `requested_<field>` in the meta.
