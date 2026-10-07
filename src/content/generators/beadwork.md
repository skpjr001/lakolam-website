---
title: "Beadwork"
blurb: "Bead charts in peyote, brick, loom and square stitch, with bead counts and a row-by-row word chart"
category: design
version: "1.0.0"
---
Bead charts for peyote, brick, loom and square stitch — with bead counts,
finished size and a row-by-row word chart.

## What it is

A pattern for beading: a picture made of small rounded beads, each one a
single colour, laid out the way the stitch lays them. In peyote the beads
stand in columns and every other column sits half a bead lower; in brick
stitch every other row is shifted half a bead sideways; loom work and
square stitch sit on a straight grid. The motifs — outlined medallions,
nested diamonds and zigzag chevrons — are mirror-symmetric, and the page
lists every colour with a letter and the number of beads you need. A second
page, the word chart, spells the pattern out row by row in the order you
work it.

## How to use it

Pick a bead colour for each letter in the key and count out the beads
listed (buy a few extra). Work the chart a row at a time, or follow the
word chart: `ROW 5 <  3A 2B 4C` means work row five from right to left,
picking up three A beads, two B and four C. In peyote, rows 1 and 2 are
strung together as one line at the start, and each later row adds one bead
in every other column. On an odd-count peyote chart, the word chart marks
the rows that begin with the odd-count turn (TURN) — the extra loop at the
edge that a row with no bead to pass through needs. Brick and square stitch
rows go back and forth; a loom row is strung left to right and woven in one
pass. The finished size is worked out for the bead you choose. The
colouring version is a colour-by-letter chart: shade each bead the colour
you plan for its letter to try out colourways before you buy.

## Purpose

Bead charts are the working documents of a large craft: a pattern is only
useful if the picture, the bead counts and the reading order agree. Here
the counts and the word chart are both derived from the chart and checked
against it, so a beader can shop from the key and stitch from the words
without recounting.

## History

People have strung beads for at least 75,000 years — shell beads from
Blombos Cave in South Africa are among the oldest known ornaments. The
peyote stitch (also called gourd stitch) takes its name from its use by the
Native American Church on ceremonial objects, though the same offset
technique appears in ancient Egyptian beadnets; brick stitch, often called
Comanche stitch, is common in Native American and South African beadwork.
Bead looms were in wide use in North America by the nineteenth century, when
glass seed beads from Venice and Bohemia became a trade staple. Cylinder
beads — precise tubes made in Japan from the 1980s — made the tight,
pixel-like grids of modern charts possible. The motifs here are original
geometric designs, not copies of any community's traditional patterns.

## This implementation

- **Spec knobs:** `width`, `height`, `margin`, `stitch` (peyote, brick,
  loom, square), `motif` (medallion, diamonds, chevron), `cols` (6–80),
  `rows` (6–120; for peyote, beads per column), `colours` (2–6), `palette`
  (jewel, earth, ocean, pastel), `bead` (delica11, seed11, seed8 — for the
  finished size), `line_art`, `stroke`.
- **Generation:** each bead is placed at its real position — beads are
  drawn with the hole axis's length against the diameter (about 1.3 × 1.6
  for cylinder beads), peyote columns dropped by half a bead, brick rows
  shifted by half. A seeded mirror-symmetric field is sampled at every bead
  centre: medallions (low-frequency cosine terms minus distance in a tile,
  repeated, sometimes half-dropped), nested diamonds (distance in a tile) or
  chevrons (height plus slope × distance from the centre line, banded). The
  field is split into bands at seeded quantiles — the ground takes a large
  share — and bands get colours cycling through the accents; on medallions
  and diamonds every motif bead touching the ground turns to the dark
  colour, outlining the shapes. Colours that end up unused are dropped from
  the key (`requested_colours` in the metadata). The word chart lists the
  worked rows: peyote strings rows 1–2 left to right and then works level by
  level, alternating direction; brick and square stitch alternate; loom rows
  all read left to right. Line art coarsens the grid until each bead is
  over the colouring floor (`grid_coarsened`).
- **Solving:** nothing to solve — a design.
- **Guarantees:** deterministic per seed. `verification:
  counts_and_word_chart_rederived`: every page re-reads its own word chart
  — parsing the text and placing the beads by the stitch's own geometry —
  and checks it reproduces the chart exactly, and the key's counts are the
  chart's. Tested: the word chart's runs sum to the key's counts; a word
  chart with two colours swapped or a row missing fails to read back;
  peyote rows alternate direction and hold half the columns (odd counts
  alternate the larger and smaller half), even counts need no special turn
  and odd counts mark it on every odd row from 3; medallions on straight
  grids are mirror-symmetric both ways; every colour in the key is used;
  line art passes the adult colourability check for every stitch.
