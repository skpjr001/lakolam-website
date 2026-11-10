---
title: "Coiled Baskets"
blurb: "Coiled baskets seen from above, in the manner of Rwandan agaseke and Zulu imbenge: stars, zigzags and triangles stitched round a spiral coil"
category: design
version: "1.0.0"
---
Coiled baskets seen from above, in the manner of Rwandan agaseke and Zulu
imbenge: stars, zigzags and triangles stitched round and round a spiral coil.

## What it is

A page of coiled baskets, seen from straight above. A coiled basket is one
long bundle of fibre wound round and round from the centre, each round sewn
to the one before with wrapping stitches. Every stitch is a small slanted
wrap over the bundle, and the pattern comes from which stitches are worked
in which colour. So every design is built from steps of two sizes: one
stitch round the coil, and one turn out across it.

The baskets here are in the manner of two African traditions. Rwandan
*agaseke* are fine baskets in natural straw with black (sometimes dark red)
zigzags, triangles and star bands. Zulu *imbenge* are bold plates of bright
colour, today often woven from coated telephone wire. Each basket has a star,
a band of points or a ring at the centre, then bands of zigzags, triangles,
diamonds, stepping spirals or blocks, and a rim.

## How to use it

Start at the centre and follow the coil outward with a finger. It is one
unbroken spiral, and the last round thins out to finish the rim. Then count
the points of the centre star and turn the page by that fraction of a full
turn: the pattern repeats exactly. Look for the stripes that lean one
stitch further round on every turn. That lean is how a spiral is woven.

The line-art style is a colouring page. Bold lines mark where one colour
ends and the next begins, and fine lines show the stitches inside the
pattern. Colour the patterned areas dark and leave the rest pale, as on an
agaseke, or give every band its own bright colour, as on wire imbenge.

## Purpose

A celebration of two living crafts, and of the simple arithmetic behind
them. The pattern lives on a grid of turns and stitches, and repeats evenly
round the basket. The number of stitches in each turn grows as the coil
gets wider. Made for looking at, colouring, or planning a real basket.

## History

Coiling is one of the oldest ways of making a basket, and it is found all
over the world. In Rwanda, the *agaseke* (plural *uduseke*) is a lidded
basket with a tall pointed lid. It is coiled by women from sweetgrass or
papyrus, wrapped with sisal that is often dyed. Uduseke were given at
weddings and other important moments, and were used to keep precious
things. Their patterns are geometric: triangles, zigzags, diamonds and
stars, usually black on natural. A basket of this kind appears on Rwanda's
national seal. After the 1994 genocide against the Tutsi, women's weaving
cooperatives made the agaseke a well-known symbol of peace and
reconciliation, sold around the world as "peace baskets".

In KwaZulu-Natal, South Africa, the *imbenge* was a shallow coiled lid,
traditionally woven from grass or ilala palm, used to cover the *ukhamba*,
the clay pot for sorghum beer. From the second half of the twentieth
century, Zulu weavers in and around Durban began to make them from the
brightly coloured plastic-coated copper wire used in telephone cables. The
craft is often said to have begun with night watchmen who wrapped the wire
round their sticks. Wire imbenge are woven in the same spiral as grass
ones, so their designs follow the same rule of stitch and turn: concentric
rings, star bursts, triangles and stepping spirals in strong colours.

The baskets on this page are invented. They follow the craft's rules for
how a pattern may grow, but they do not copy any particular basket or
weaver's design.

## This implementation

- **Spec knobs:** `layout` is `single` (default, one large basket) or `wall`
  (six baskets of slightly different sizes, each with its own pattern).
  `pattern` is `auto` (default: a different motif for each band, chosen by
  the seed), `stars`, `zigzag`, `triangles`, `diamonds`, `spiral` or
  `rings`. `style` is `imbenge` (default: wire colours on a strong ground,
  chosen by the seed from five matched sets), `agaseke` (black and a little
  dark red on natural straw) or `line_art`. `fold` (3-12, default 6) is the
  pattern's rotational symmetry. `turns` (6-60, default 24) is the number of
  turns from centre to rim; on the wall it is capped so each coil stays at
  least 3 pt wide. `stitch` (0.3-1.5, default 0.6) is the stitch length as a
  fraction of the coil's width. `width`, `height` (200-3000 pt, default
  600 × 800) and `margin` (0-200 pt and at most a quarter of the short side,
  default 24).
- **Generation:** the coil is an Archimedean spiral `r(θ) = w/2 + w·θ/2π`,
  `w` the coil width, so each turn lies exactly against the next. A point
  of the coil is `P(θ, u)` with `u` in [−½, ½] across the bundle. The last
  turn tapers to nothing, so the rim is a true circle. Turn `t` holds
  `fold · m_t` stitches, with `m_t` set by the turn's length over the
  wanted stitch length (rounded). The count grows with the radius and the
  stitch size stays the same. Stitch boundaries are slanted lines
  `θ = θ_j + δ(θ_j)·(u + ½)`, whose slant depends only on where the
  boundary starts. So neighbours share one boundary, even where one turn
  meets the next. The pattern is planned as bands of turns: a centre, a
  star or first motif, more motifs with plain turns or single coloured
  rings between them, and a rim. Each band's motif is a function of the row
  in the band and the position inside one `1/fold` sector, repeated so
  that a motif is about as wide as it is tall. A stitch's colour reads only
  its turn and its index modulo `m_t`. Stitches are drawn slightly smaller
  than their cell so that the darker core of the bundle shows between
  them. The line-art style draws the coil, bold lines where the colour
  changes, and fine stitch lines inside the pattern.
- **Guarantees:** the stitches tile the coil. Their summed areas equal the
  area of the coil worked out from the spiral's formula (the rim's disc less
  the sliver inside the first turn) to 0.2 %. No sampled point lies inside
  two stitches, except on a shared edge. The pattern is exactly
  `fold`-fold symmetric: in every turn, stitch `j` and stitch `j + m_t` have
  the same colour. The coil is continuous: stitch boundaries run without a
  gap from θ = 0 to the end of the last turn, and each turn's outer edge is
  the next turn's inner edge. Every stitch is within 0.82-1.2 of the
  wanted length once a sector holds three or more. All ink is inside the
  page. `verification: stitches_tile_coil_pattern_k_fold_coil_continuous`.
  The line-art page reports the adult colourability check as `colorable`
  (usually false: the stitches inside the pattern are small cells). Clamped
  knobs are reported as `requested_<field>`.
