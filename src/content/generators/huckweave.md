---
title: "Swedish Weaving"
blurb: "Swedish weaving charts for monk's cloth and huck — waves, diamonds, loops and braids whose yarns pass only under floats, mirror about the centre and run selvedge to selvedge"
category: design
version: "1.0.0"
---
Swedish weaving (huck embroidery) charts for monk's cloth and huck
towelling: yarns that slide under the floats and never through the cloth.

## What it is

A chart for a border of Swedish weaving, also called huck embroidery or
huck weaving. The yarn is threaded along the surface of the cloth, under
the little vertical floats woven into it, to make waves, diamonds, looped
waves and braids in several colours. The chart shows every float and the
path of each yarn across the band. It can be drawn for monk's cloth, whose
floats sit on a square grid, or for huck towelling, whose floats sit on
every other square in a staggered, brick-like pattern. A second layout puts
the band across the top and bottom of an afghan, and a preview shows the
finished cloth. A band chart is printed with a preview of the same band
beneath it.

## How to use it

Use a blunt tapestry needle and soft yarn. Find the centre float of the
cloth and the centre column of the chart (it is numbered), and start each
yarn there with half its length pulled through. Weave out to one side,
then turn the work and weave the other half. Or simply work from the left
edge to the right. Slide the needle only under the floats the chart shows,
never through the cloth. Where a yarn turns back on itself to throw a loop,
pass it back under the float above and then on over itself. Keep the yarn
lying flat and loose; do not pull the cloth. Every yarn finishes at both
edges, so tuck the ends into the hem or under the last floats.

## Purpose

Swedish weaving is simple to learn but easy to chart badly. A path can ask
for a float the cloth does not have (on huck, half the squares have none),
jump too far to stitch neatly, go under the same float twice the same way,
or run lopsided so the two ends of a border do not match. Every chart here
is re-walked yarn by yarn before it is printed. The checks make sure each
pass is under a real float, each step is short, no float is used twice the
same way or crowded with more than two yarns, every yarn runs from edge to
edge, and the border mirrors about its centre.

## History

Huck embroidery grew up with huckaback towelling in the 18th and 19th
centuries, as a way to decorate the floats of the weave. It spread as
"Swedish weaving" in North America in the 20th century, where it became a
favourite of schools, church groups and home crafters in the 1930s and
again in the 1950s and 1960s. Monk's cloth afghans with deep woven borders
are still a much-loved project today. The motifs are traditional: waves,
diamonds, arrows, loops and plaits worked in bands of colour.

## This implementation

- **Spec knobs:** `motif` (auto, waves, diamonds, loops, braid), `cloth`
  (monks_cloth, huck), `width_floats` (21–121, rounded up to odd),
  `amplitude` (1–6 rows), `yarns` (1–5), `layout` (band, afghan), `look`
  (chart, preview), `palette` (auto, rainbow, ocean, autumn, berry, mono),
  `width`, `height` (144–3000 pt). Out-of-range values are clamped and
  reported as `requested_*`. Diamonds use yarns in pairs, and braids are
  limited to the number of distinct phases the swing allows (half as many on
  huck). The number of yarns drawn is reported, with `requested_yarns`
  when it differs.
- **Generation:** each yarn follows a triangle wave measured from the centre
  column with a seeded phase, so it is symmetric. Rows are nudged onto
  huck's float parity, where a float sits at column c of row r only when
  c + r is even. Waves stack two rows apart. Diamonds pair a wave with its
  upside-down twin so they cross and share floats. Loops turn back at each
  crest, under the float two rows up going left, and then cross over
  themselves. Braids use three or more strands, offset by a fraction of the
  swing. The left half is built and the right half is its mirror image,
  walked in reverse. The afghan layout repeats the band upside down at the
  foot of an odd number of rows, so it stays on huck's floats.
- **Solving:** nothing to solve; it is a design.
- **Guarantees:** deterministic per seed. Every yarn is re-walked
  (`verification: yarn_paths_rewalked_under_floats_mirrored`). Every pass
  must be under a float of the chosen cloth. Steps are at most one column
  and three rows, and a yarn only turns back to loop. No yarn passes under a
  float twice in the same direction, and no float carries more than two
  yarns. Every yarn starts at the left edge and ends at the right one, both
  going right, and the design mirrors about the centre column. Tests repeat
  the walk independently, check that loops really turn back and diamonds
  really share their crossing floats, refuse hand-broken designs, show every
  option changes the page, and sweep every boundary value for a finite page
  inside its bounds.
