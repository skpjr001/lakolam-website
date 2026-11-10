---
title: "Paper Cut-Outs"
blurb: "Paper cut-outs in the spirit of Matisse's late gouaches découpées: algae, coral, leaves and stars"
category: design
version: "1.0.0"
---
Flat sheets of bright colour cut freehand into seaweed, coral, leaves,
stars and spirals, in the spirit of Matisse's late cut-outs.

## What it is

A page of cut paper shapes laid on flat colour. Each shape looks as if it
had been cut straight out of a painted sheet with scissors: fronds of
seaweed with rounded leaflets, branching coral, leaves with deep lobes,
lopsided stars, thick spirals and rolling waves, their edges slightly
uneven, with the little straight snips scissors leave. They sit on one
flat ground in a balanced composition, one to a cell on a mosaic of
coloured rectangles, or in rows along a frieze, where they reach over the
edges of the band. This is a tribute to a way of working, not a copy:
every shape is invented by the page, and none of Matisse's own
compositions or figures is reproduced.

## How to use it

Print the colour pages as posters, cards or wrapping paper, or use them
as a model for real cut paper: paint sheets with gouache, let them dry
and cut the shapes freehand without drawing first. Pick the vivid gouache
palette for ultramarine, magenta, orange, green, yellow and black, or the
muted palette for earthy ochre, terracotta, sage and slate. The line-art
palette makes a colouring page: colour the ground rectangles first, then
choose a colour for each shape that stands out against its ground.

## Purpose

A joyful, simple-looking kind of picture with a few clear rules behind
it: bold organic shapes, strong contrasting colour, and a composition
that feels balanced without being symmetrical.

## History

Henri Matisse (1869–1954) used cut paper as a working tool from the early
1930s, planning the *Dance* mural for the Barnes Foundation (1930–33) with
painted sheets pinned to the wall. After major abdominal surgery in 1941
left him often confined to bed or a wheelchair, cutting into
gouache-painted paper, which his studio assistants prepared, became his
main medium: "drawing with scissors", cutting directly into colour, as he
put it. The book *Jazz* (Tériade, 1947) reproduced twenty of his cut-out
compositions; *Oceania, the Sky* and *Oceania, the Sea* (1946) recalled
his 1930 voyage to Tahiti; *Polynesia* (1946) set white birds and sea
creatures on a chequer of blue rectangles; *The Swimming Pool* (1952)
ran a frieze of blue swimmers round a white band in his dining room; and
*The Snail* (1953) is built from large rectangles of colour. He also
designed the stained glass of the Chapel of the Rosary at Vence
(1948–51) from cut-outs. He died in Nice on 3 November 1954. The 2014
exhibition *Henri Matisse: The Cut-Outs* at Tate Modern and the Museum of
Modern Art brought the late works together.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `ground`
  (`single`, `mosaic`, `frieze`; default `mosaic`); `motif` (`mix`,
  `algae`, `coral`, `leaf`, `star`, `spiral`, `wave`); `palette`
  (`gouache`, `muted`, `line_art`); `shapes` (3-40, default 12; a mosaic
  has about one cell per shape, a frieze splits them over its bands);
  `edge` (hand-cut irregularity, 0-1, default 0.5); `stroke` (line art,
  0.2-4).
- **Generation:** each form is a smooth union (a polynomial smooth
  maximum) of simple pieces, as a field positive inside: algae is a
  swaying stem of tapered capsules with five to eight alternating
  leaflets, half with a finger-like sub-lobe; coral is a branching tree of
  capsules, four or five levels deep, forking in two or three, with
  rounded tips, pruning any branch that would come close to another;
  a leaf is a polar outline, an ellipse cut by five to nine deep notches;
  a star has five to seven jittered points with slightly bowed edges; a
  spiral is an Archimedean arm of capsules thickening outward, kept
  apart from the next turn; a wave is the band between a rolling base and
  a row of crests that rise slowly and break steeply. Seeded value noise
  is added to the field before tracing — at most 0.028 of the form's half
  size and under 0.3 of its thinnest piece — and the zero level is traced
  by marching squares and simplified with a tolerance that grows with
  `edge`, leaving straight scissor snips. *Single:* the largest form sits
  on a rule-of-thirds point; each further form, from large to small, is
  the best of 48 placements that keep a gap of 1.8 % of the short side
  from every placed form (checked against each one's distance field) and
  pull the area-weighted centre of the forms toward the middle, shrinking
  when nothing fits. *Mosaic:* columns and rows of seeded widths, no two
  neighbouring cells the same colour, one form fitted into each cell.
  *Frieze:* one or two bands across the page, a row of two alternating
  forms in two colours, reaching over the band edges. Form colours are
  chosen to contrast with the ground under them. Line art outlines the
  ground rectangles inside a margin and keeps frieze forms inside their
  band.
- **Guarantees:** deterministic per seed. Every outline is a closed
  simple polygon; no two forms touch, cross or contain one another
  (tested by segment intersection and containment), and on a single
  ground they keep the full gap; the edge irregularity is bounded (at
  most 5 % of the form's size from the clean cut, growing with `edge`,
  tested). The ground rectangles tile the page exactly (the framed area
  in line art): their areas sum to it and none overlap. Mosaic
  neighbours differ in colour and every form contrasts with its cell. All
  ink is inside the page. `verification:
  forms_disjoint_simple_grounds_tile`. The line-art pages pass the adult
  colourability check. Clamped knobs are reported as `requested_<field>`.
