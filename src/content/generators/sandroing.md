---
title: "Sandroing Sand Drawings"
blurb: "Sandroing: Vanuatu-style sand drawings — one unbroken line traced over a frame of guide lines, every segment once, as an Euler circuit"
category: design
version: "1.0.0"
---
Drawings in the manner of Vanuatu sand drawing: a frame of guide lines in
the sand, then one finger tracing a single line over all of it without
lifting.

## What it is

A design in the manner of *sandroing*, the sand drawing of Vanuatu. The
drawer first marks a frame in smoothed sand, ash or clay: lines crossing
like a lattice, or rings crossed by spokes. Then, with one finger, they
trace a continuous line along the frame. The line runs over every piece of
the frame exactly once, swings round in loops past the loose ends of the
guide lines, and comes back to where it started, so the finger never
lifts and nothing is drawn twice. At each crossing the line either goes
straight on or turns. This page builds its figures the same way. Its frames
are a square lattice, the same lattice turned on its point, or rings and
spokes that open into a flower. The turns at the crossings are chosen so
the frame is traced as one unbroken line (or as several closed lines, if
you ask), often with a mirror or turning symmetry.

## How to use it

Put a finger on the line anywhere and follow it: at every crossing either go
straight over or follow the bend. You will pass along every part of the
frame once and come back to where you began. Where the line turns, the
guide lines show through in the little gap. Try drawing one yourself: rule
the guide lines lightly first, then trace the figure in one movement. The
charcoal style looks like a drawing on an ochre wall. The line-art style is
a page to colour or to trace.

## Purpose

A drawing that is also a piece of mathematics. Covering every line of a
frame once in a single closed stroke is exactly Euler's problem of the
bridges of Königsberg, and the drawings show how a choice made at each
crossing decides whether you get one line or several. The page is for
looking, copying and wondering how it was done.

## History

Sand drawing is practised across Vanuatu, the Y-shaped archipelago in the
south-west Pacific that was known as the New Hebrides until independence in
1980. People draw on the ground in sand, volcanic ash or clay with one
finger, in a continuous line over a grid they have marked first. The
drawings go with stories, songs, rituals and knowledge of the land. They
also carried messages between the speakers of the islands' many
languages. Drawing them well is valued knowledge, held by the people who
know the stories. UNESCO proclaimed Vanuatu sand drawings a Masterpiece of
the Oral and Intangible Heritage of Humanity in 2003. They were inscribed
on the Representative List of the Intangible Cultural Heritage of Humanity
in 2008.

The Cambridge anthropologist A. Bernard Deacon recorded many drawings on
Malakula (Malekula) and from neighbouring islands in 1926–27. He died on Malakula in 1927, and
his notes were published by Camilla Wedgwood in 1934 as *Geometrical
Drawings from Malekula and Other Islands of the New Hebrides* (Journal of
the Royal Anthropological Institute 64). John Layard also recorded drawings
in *Stone Men of Malekula* (1942). The mathematician Marcia Ascher
(1935–2013) analysed the drawings as graphs. She showed that their makers
were tracing Euler paths and circuits, often with symmetry and with rules
for building larger figures from smaller ones. See M. Ascher, "Graphs in
cultures: a study in ethnomathematics", *Historia Mathematica* 15 (1988),
and *Ethnomathematics: A Multicultural View of Mathematical Ideas* (1991),
chapter 2, "Tracing graphs in the sand". Leonhard Euler had settled the
Königsberg bridge problem in 1736. Many sand drawings have names, stories
and owners. This page invents fresh figures from the construction rule. It
does not reproduce or name any particular drawing or its story.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `margin` (0-200 pt).
  `lattice` is `square`, `diamond` (default) or `circles`. `cols` and
  `rows` (2-12 each, default 5) are the guide lines of the square and
  diamond frames. `rings` (1-8, default 3) and `spokes` (4-24, default
  12; an odd count is rounded to an even one) set up the circle frame.
  `symmetry` is `auto` (the default: the seed tries the symmetries the
  frame allows), `none`, `mirror`, `double`, `rotational` or `four_fold`.
  `cycles` (1-12; default 1, one unbroken line) is the number of closed
  lines. `turns` (0-1, default 0.5) is the share of crossings where the
  seed starts the line turning. `guides` is `lines`, `points` or `none`.
  `style` is `sand` (default), `charcoal` or `lines`. `stroke` (0.2-4,
  default 1) is the line weight relative to the guide spacing.
- **Generation:** the frame is a graph. Every crossing of two guide lines
  is a vertex with four ports. The guide segments between crossings are
  edges. The loose ends of the guide lines, half a spacing past the last
  crossing, are taken in order round the outside (or round the inside and
  outside of the rings) and joined in neighbouring pairs by loops, so
  every vertex has degree four. Which ends pair up is one of two (or, for
  rings, four) seeded offsets. At each crossing the line has three
  choices: go straight through, or turn one of two ways (a *transition
  system*). The crossings are grouped into orbits of the symmetry group,
  and a choice is carried round its orbit by the group's action on the
  ports, so the figure is exactly symmetric. Crossings the symmetry fixes
  get only the choices it maps to themselves. A seeded scatter puts turns
  at about `turns` of the orbits. A seeded local search then changes one
  orbit at a time towards the requested number of lines: downhill and
  sideways moves always, uphill moves now and then. Without symmetry,
  one line is always reached, because whenever two lines meet at a
  crossing, re-choosing that crossing merges them. A symmetry that cannot
  carry the requested count falls back (four-fold → half turn → mirror →
  none, reported as `requested_symmetry`). An unreachable count is
  reported as `requested_cycles`. The line is drawn smooth: along the
  guides, a crossing's straight pass is a straight cubic, and a turn is a
  near-circular cubic arc cut in 0.34 spacings before the crossing. Two
  strands turning at one crossing pass each other there and never touch.
- **Guarantees:** the traced figure covers every guide segment and every
  end loop exactly once. An independent check flattens the drawn lines
  and counts how many times they pass the middle of each segment. The
  number of closed lines is as requested: one, an Euler circuit, by
  default (tested over every lattice and many seeds). Every line is closed.
  The drawing maps onto itself under every element of the stated symmetry,
  checked point by point on the drawn geometry. All ink stays inside the
  page. `verification: every_segment_once_line_count_symmetric`. The
  line-art page reports the adult colourability check as `colorable`.
  Clamped knobs are reported as `requested_<field>`.
