---
title: "Otomi Embroidery"
blurb: "Otomi-style embroidery in the manner of Tenango de Doria: invented satin-stitched creatures and flowers packed densely on white cotton"
category: design
version: "1.0.0"
---
A cloth in the manner of the tenangos of Tenango de Doria: invented
creatures and flowers, flat silhouettes of satin stitch, crowded edge to
edge on white cotton.

## What it is

A design in the manner of the embroidered cloths, called *tenangos*,
made by Otomi (Hñähñu) women in and around Tenango de Doria in the state
of Hidalgo, Mexico. Every motif is a flat silhouette stitched solid in
satin stitch: long parallel stitches laid side by side, so the direction
of the thread shows. Birds with fanned tails, roosters with sickle
feathers, deer with branching antlers, rabbits, foxes, butterflies,
beetles, dragonflies, flowers and leafy plants fill the cloth, packed so
close that the white ground runs between them like paths. The stitch
direction changes from one part of an animal to the next, and a fine line
of bare cloth separates a wing from a body or a head from a neck. Eyes are
left unstitched. A cloth is often all one colour, deep red or blue, or each
creature has its own bright colour. This page invents its own creatures
from simple shapes and packs them across the cloth.

## How to use it

Look closely at one animal: each part has its own stitch direction, and
the thin white lines between the parts are where the stitching stops.
Then step back and see how the small flowers, buds and insects fill every
space between the big animals. Choose one colour for the classic look,
many colours for a festive one, or the mirrored layout for a cloth that
pairs every animal with its reflection. The line-art style is a colouring
page: fill each block with one colour, as an embroiderer would.

## Purpose

A celebration of a living textile art: its crowded, joyful bestiary and
the satin stitch that gives every shape its sheen. Made for looking,
printing and colouring.

## History

Tenango de Doria lies in the Sierra Otomí-Tepehua of eastern Hidalgo,
and the embroidery is made by Otomi women in the town and in nearby
communities such as San Nicolás. Otomi women had long embroidered their
own clothing. The tenango as it is known today, a whole cloth covered
with animals and plants and made to be sold, is usually said to have
begun in the 1960s. A drought and a poor harvest had left families
needing income, and women began to embroider cloths for sale. The
figures are commonly said to have been inspired by the rock paintings in
the area and by the plants and animals of the region. That account is
told by the embroiderers themselves, though historians note that older
Otomi textiles already carried many of the same creatures. Designs are
often first drawn on the cloth in pencil, sometimes by a specialist
draughtsman or draughtswoman, and then filled in with thread. A large
cloth can take months. Tenangos are now made as tablecloths, cushion
covers, wall hangings and clothing, and they are sold throughout Mexico
and abroad. Embroiderers have objected when companies copied their
designs without credit or payment. This page does not reproduce any
embroiderer's cloth. Its animals and plants are made up from
simple shapes in the spirit of the tradition. For the real thing, look
for cloths sold by the embroiderers and their cooperatives.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000; default 600 × 750).
  `style` is `one_colour` (default), `multicolour` or `lines` (black
  outlines to colour). `thread` is the one-colour thread: `red` (default),
  `blue`, `magenta`, `green`, `purple` or `black` (it also colours the hem).
  `layout` is `scatter` (default) or `mirrored` (each motif paired with its
  reflection across the centre line). `motifs` is `mixed` (default),
  `animals` or `flowers`. `gap` (1-12 pt at a 600-pt page, default 3) is
  the bare cloth kept between motifs. `stitch` (0.8-6 pt, default 1.7) is
  the satin-stitch spacing. `margin` (0-200 pt, default 22) is the hem
  margin; a running-stitch hem is drawn when it is at least 6 pt.
- **Generation:** each motif is built from parts in its own frame:
  superellipse bodies, round heads, tapered strips along centre lines
  integrated from a curvature profile (legs, necks, antlers, tails, stems,
  sickle feathers) and pointed petals (wings, ears, tail feathers, leaves,
  flower petals). Parts are drawn in order. Each later part, grown by
  about half a stitch, is cut out of the parts below with a polygon
  difference, which leaves a fine unstitched line. Eyes are holes. The
  cloth is an occupancy grid of about 320 cells across. A candidate motif,
  turned and maybe flipped, is rasterised conservatively: every cell its
  outline (sampled at a quarter cell) or inside touches, dilated by enough
  cells to cover half the gap. It is dropped at up to 160 random grid nodes
  until it fits. Motifs are placed in five size tiers, large creatures
  first and tiny rosettes last. A tier ends after a run of motifs finds no
  room. In the mirrored layout the grid is symmetric, and a motif and its
  reflection must both fit. Each block is stitched by its part's rule:
  rungs straight across a strip or petal, parallel lines at the part's own
  angle across a body, or rays from the centre of a flower. Every stitch
  is clipped to its block.
- **Guarantees:** motifs never overlap. The tests measure the distance
  between every pair of nearby silhouettes, vertex to edge both ways, and
  check that it is at least the gap and that neither has a point inside the
  other. Every stitch lies inside its block: points along it are tested
  by an independent ray-casting check. Coverage, the stitched area over
  the cloth's field, is between 0.28 and 0.6 at the default gap for every
  layout and motif set tested (typically 0.33-0.39). It matches a
  260 × 260 point sample to within 0.02. The mirrored layout is an exact
  reflection. All silhouettes lie in the field and all ink is inside the
  page. `verification: motifs_apart_stitches_inside_dense_coverage`. The
  line-art page reports the adult colourability check as `colorable` (its
  small blocks usually fail it). Clamped knobs are reported as
  `requested_<field>`.
