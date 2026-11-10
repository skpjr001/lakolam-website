---
title: "Ajrak-Style Block Print"
blurb: "Ajrak-style block print in the manner of Sindh and Kutch: one exactly symmetric star block stamped in madder and indigo, framed by border bands"
category: design
version: "1.0.0"
---
A cloth block-printed in the manner of ajrak: star and rosette medallions in
madder red and indigo, stamped edge to edge from one carved block and framed
by bands of smaller repeats.

## What it is

A design in the manner of ajrak, the resist-printed cotton of Sindh and
Kutch. The field is one square block printed over and over: a medallion in
the middle — an eight-pointed star made of two squares, a sixteen-lobed
rosette or a four-lobed quatrefoil — with small flowers, stars or rings on
its corners and edge midpoints, where four impressions meet to complete
them, and sprigs or little arches on the diagonals between. The blocks sit
in straight rows or in a half-drop, every other column shifted by half a
block. Each impression lands a hair off the last, as a hand-set block does.
Round the field run two to four border bands — a row of resist dots, a
zigzag, lozenges, arches or flowers in diamonds — that turn the corners on
small squares of their own, with the end borders deeper than the sides.
The colours are the dyer's: deep red, indigo, black outlines and fine white
dots where the resist kept the dye out.

## How to use it

Print the colour page as a textile study or a wrapping sheet, or the faded
version for an old, much-washed cloth. The line-art page is a colouring
sheet: ajrak is read in two colours, so pick a red and a blue, give the
ground one and the medallions the other, keep the centres black, and leave
the dots white. Follow one medallion out to its neighbours and you will
find the whole field is one block repeated; follow a border round a corner
and see how it closes on its corner square.

## Purpose

A page that shows how a block-printed cloth is made: one carved design,
exactly symmetric, set down again and again by hand, and a frame of bands
measured to close at every corner.

## History

Ajrak is made by Khatri printing communities in Sindh, in today's Pakistan,
and in Kutch in Gujarat, India, where after the 2001 earthquake many
printing families of Dhamadka resettled in a new village they named
Ajrakhpur.
The cloth passes through many stages — cleaning, mordanting, printing with
resist pastes of lime, gum or clay, dyeing in indigo and in madder (later
alizarin), washing and drying in the sun — so that red and blue, black and
white come out of separate printings that must register with one another.
Ajrak is worn as a shawl, turban or hip-cloth and given as a mark of
respect, and it is a widely recognised emblem of Sindhi identity. A trefoil
pattern on the robe of the so-called "priest-king" sculpture from
Mohenjo-daro (c. 2000 BC) is often compared with ajrak motifs, though no
unbroken line between them can be shown. On the craft see Eiluned Edwards,
*Textiles and Dress of Gujarat* (V&A Publishing, 2011), and Noorjehan
Bilgrami, *Sindh jo Ajrak* (Department of Culture and Tourism, Government
of Sindh, 1990). This page follows the tradition's geometry — compass-drawn
stars and rosettes, trefoils, resist dots, a field of one block and banded
borders — but its blocks are invented fresh and never copy a printer's
real block.

## This implementation

- **Spec knobs:** `layout` (`square`, `half_drop`); `medallion` (`auto`,
  `star`, `rosette`, `quatrefoil`; auto is chosen by the seed); `palette`
  (`traditional`, `faded`, `line_art`); `repeats` (blocks across the field,
  2-12, default 5); `bands` (border bands, 2-4, default 3); `jitter`
  (largest registration offset of an impression, 0-3 points, default 0.6);
  `resist_dots` (the white resist dots, on by default); `stroke` (outline
  weight, 0.2-4 points, default 0.8); `width`, `height` (144-2400 points);
  `margin`.
- **Generation:** the block is drawn in the square [-1, 1]². The medallion
  is built with compass and ruler: the eight-pointed star is two squares of
  the same circumradius, its notches where their sides cross
  (r·cos 45°/cos 22.5°); the rosette is r(θ) = R(0.84 + 0.16|cos 8θ|); the
  quatrefoil is the union of four circles on the axes. A linking motif
  (eight-petal flower, four-pointed star or ring) sits on each corner and
  edge midpoint, so neighbouring blocks complete it in either layout, and a
  trefoil or pointed arch sits on each diagonal. Every element is symmetric
  about its own axis and placed in an orbit of quarter turns written as
  exact coordinate swaps. The ground colour (red or indigo), the link and
  sprig kinds, and the medallion and link radii come from the seed. The
  block size is the largest that fits `repeats` across plus the borders;
  whole rows fill the height, and leftover room deepens the borders up to
  twice their depth. Each stamp is the same list of drawing items under a
  translation to its grid position plus a jitter drawn uniformly from a
  disc of radius `jitter`, clipped to its own square. Border bands take a
  guard (dots or zigzag), a main band (flowers or arches) and then a
  narrow band and the other main band; each side holds a whole number of
  units, rounded from the band's natural unit length.
- **Guarantees:** deterministic per seed; `verification:
  block_d4_exact_field_one_block_jitter_bounded_bands_close`. Tested: the
  block's control points, grouped by ink, are invariant under all eight
  symmetries of the square; every impression in the drawn field carries
  the identical item list (equal digests) under a pure translation that
  differs from its grid position by at most `jitter`, the grid positions
  lie exactly on the square or half-drop lattice, and the blocks cover the
  field; each band's inner edge is the previous band's outer edge, its
  units and corner squares tile its ring exactly with the last unit ending
  on the far corner, and no band motif reaches into the field; all ink
  stays on the page for every option and extreme size. The line-art page
  reports the adult colourability check as `colorable`. Clamped knobs are
  reported as `requested_<field>`.
