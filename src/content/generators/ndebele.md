---
title: "Ndebele Wall Painting"
blurb: "A wall painting in the manner of Ndebele house painting: mirror-symmetric panels of stepped motifs, every field outlined in black"
category: design
version: "1.0.0"
---
A bold, mirror-symmetric wall of stepped shapes in the manner of Ndebele house
painting: every field outlined in heavy black, every edge a stair step.

## What it is

A design in the manner of the wall paintings of the amaNdebele of South
Africa. The wall is divided into compartments, and each holds a bold stepped
motif: gabled houses with doorways, lamps, bow-ties, stacked chevrons,
lozenges with stepped rings, bars and staircases. Every coloured field is
outlined in thick black with a fine white rule just inside, and the whole
wall is a mirror image of itself about its centre. Three arrangements: a
house front with a stepped parapet, a central doorway and a dark plinth; a
single framed panel; and stacked friezes of repeated motifs.

## How to use it

Look for the mirror: everything on the left is repeated, reversed, on the
right. To colour it, choose the line-art palette and follow the painters'
rule — two fields that touch never share a colour, and a field and its
mirror image always do.

## Purpose

A strong, cheerful page about symmetry, colour and the stepped geometry of a
living mural tradition.

## History

Ndebele women in South Africa's Mpumalanga region and the former KwaNdebele
have painted the walls of their homesteads since at least the 1940s, first
with earth pigments and later with bright commercial paints; the practice
grew from earlier finger-painted designs and became a strong expression of
Ndebele identity. The paintings are made freehand, outlined first in black,
and are renewed regularly. Some painters have become internationally known;
this page imitates no individual artist and reproduces no specific wall. It
is a geometric grammar in the manner of the tradition. See Peter Rich and
Margaret Courtney-Clarke, *Ndebele: The Art of an African Tribe* (Rizzoli,
1986), and Elizabeth Schneider, "Ndebele Mural Art", *African Arts* 18:3
(1985).

## This implementation

- **Spec knobs:** `layout` (auto, facade, panel, border), `grid` (cells
  across, 15–61, made odd for a centre column; 0 = 27–37 by seed), `depth`
  (1–5 rounds of splitting), `palette` (auto, bright, earth, line_art),
  `outline` (black outline weight; 0 = a third of a cell), `inner_rule`,
  `width`, `height`, `margin`.
- **Generation:** the design is painted as part labels on a coarse grid.
  The area is split recursively — horizontal cuts across the width, vertical
  cuts always symmetric (side, centre, side), very tall compartments always
  cut — and each leaf gets an optional ground panel and a motif chosen to
  suit its shape (lamps, bars and stairs for tall leaves; bow-ties, chevrons
  and gables for wide ones). The right half is then overwritten with the
  mirror of the left (labels that reach the centre column keep their label;
  others get a mirror label). Fields are the 4-connected regions; mirror
  pairs are merged and the fields coloured greedily in smallest-last order,
  least-used colour first. Outlines are traced from the grid; the white rule
  is each field offset inward.
- **Solving:** Nothing to solve.
- **Guarantees:** deterministic per seed; `verification:
  mirror_symmetric_and_adjacent_fields_differ`. Tested: the fill of every
  cell equals the fill of its mirror cell, and every drawn fill is centred
  on the page's axis; fields that share an edge never share a colour, and
  six colours always suffice (planar graphs have a vertex of degree ≤ 5);
  all ink stays on the page for every layout, palette and extreme size.
