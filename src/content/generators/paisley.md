---
title: "Paisley"
blurb: "Paisley art: curled boteh teardrops filled with nested henna ornament bands, as one motif, a pair or a half-drop repeat"
category: design
version: "1.0.0"
---
The curled teardrop of Persian and Kashmiri ornament, filled ring by ring
with henna-style bands: scallops, dots, petals, chevrons, lattice and tiny
botehs.

## What it is

A paisley design built round the boteh (also called buta): a teardrop with
a round body and a tip that curls over to one side. Inside its outline sit
smaller copies of the same shape, one within another, and every ring
between two of them carries its own ornament:

- **scallops** standing on the inner line, a dot in each;
- a row of **dots**, ringed where there is room;
- slanted **petals**, like the leaves of a vine;
- **chevron** teeth, a zigzag;
- a **lattice** of diamonds touching both lines;
- a procession of **tiny botehs** lying along the ring.

The heart of the shape holds a many-petalled rosette, a lotus fanning
toward the tip, or a diamond net, with a trail of shrinking dots running up
into the curl. A frill of scallops, flames or dots can edge the outline.

The page is one large boteh, a pair turned half a turn about each other so
their tips curl round one another, or an all-over repeat — columns of
botehs, every other column mirrored and dropped by half a row, as on a
printed shawl. Small henna fillers (flowers, leafy sprigs, dot flowers,
spirals) fill the spaces, and an ornamented border can frame the page.

Black outlines on white to colour in, or filled in a palette of shawl
colours with dark outlines.

## How to use it

Colour ring by ring. Give each band of the boteh its own ground colour and
pick out its scallops, petals or diamonds in a second, so the rings read
from the outline to the centre — or keep to two or three colours and
alternate them for the look of a woven shawl. The small shapes already
inked black are part of the design, like the solid fills of a henna
pattern. Finish with the fillers and the border. On a repeat page, colour
one boteh and copy it to the rest, or change the colours from column to
column. The colour version is ready to print as a card, a poster or wrapping
paper.

## Purpose

Paisley is one of the most widely loved ornaments in the world, and
colouring one is absorbing: the rings give a natural order to work in, and
the curl of the tip carries every band with it. The page also shows how the
motif works — one shape repeated inside itself, with a small vocabulary of
fills — so it is a starting point for drawing paisleys and henna patterns by
hand.

## History

The boteh is Persian: the word means a shrub or bush, and the motif — a
leaf or flowering spray bent at the top — is found in Iranian textiles and
architecture over many centuries, worn by the nobility on silk termeh cloth
woven with silver and gold. It travelled to Kashmir, where weavers made it
the chief motif of the famous shawls woven from pashmina goat's wool. Under
the Mughal emperors (Akbar's records of the 1500s already treat the shawls
as fashionable) the buta began as a naturalistic flowering plant; through
the 1700s and 1800s it grew stylised, denser and longer, curling at the tip
and packed with smaller ornament.

The East India Company carried Kashmir shawls to Britain in the 18th
century and they became a fashion. Weavers in Edinburgh and Norwich began
to imitate them in the 1790s, and from the early 1800s the Scottish weaving
town of Paisley, in Renfrewshire, became the leading producer, using
Jacquard looms after about 1820 and by 1860 weaving with as many as fifteen
colours. The town gave the pattern its English name. The shawl fashion
faded in the 1870s; the motif returned strongly in the 1960s, when
psychedelic fashion of the 1967 "Summer of Love" took it up, and it lives
on in bandanas, ties and fabrics.

In South Asia the motif has many names, several of them meaning mango:
kairi (Hindi and Urdu), ambi (Punjabi), kalka (Bengali), mankolam (Tamil).
It is a staple of mehndi, the henna body art of weddings and festivals,
where it is filled with exactly the vocabulary used here: rows of dots,
scallops, leaves and vines, chevrons, nets (jaal, a lattice from Mughal
and Rajput screens), flowers and lotuses.

Sources: "Paisley (design)", Wikipedia; Met Museum collection notes on
Kashmir shawls; Glasgow Guardian, "Unravelling the real history of the
paisley pattern" (2024).

## This implementation

**Spec knobs**

- `layout`: `single` (default), `pair` or `repeat`.
- `style`: `line` (black outlines to colour, default) or `colour`.
- `palette`: `kashmir` (default), `sunset`, `ocean`, `forest`, `berry`,
  `rainbow`, `ink_blue` — colour style only.
- `width`, `height` (144-2000 pt, default US Letter), `margin` (0-144 pt),
  `stroke` (0.75-4 pt; outlines are half again as heavy).
- `bands` (1-6): ornament rings inside each boteh; 0 (default) lets the
  seed choose 2-5 to keep rings about 24 pt thick (17 pt on a repeat).
- `curl` (60-200 degrees): how far the tip turns over; 0 lets the seed
  choose 115-185.
- `columns` (2-6, default 3): repeat layout only.
- `fringe`, `fillers`, `border` (all on by default).

Values outside a range are held to it and recorded as `requested_<field>`.

**Generation**

The boteh is a bent strip. Its spine is a unit-length curve whose heading
turns by `theta(u) = curl * u^power` (power 2.6-3.3), so it barely turns at
the bottom and sharply at the tip. The half-width is
`w(u) = width * sqrt(u) * (1 - u)^tail / max` — the square root rounds the
bottom, the power tapers the tail to a point — with the inside of the curl
narrower than the outside by `lean`, and held under 0.8 of the spine's
radius of curvature by a smooth minimum so the bent shape never folds. A
point (u, v) of the strip lands at `C(u) + v N(u)`. If a wide curl would
bring the tip back onto the body, the curl is unwound in 8% steps until the
outline is simple; the curl drawn is the one recorded.

Nested levels are similarities of the strip about a focus in the body:
level `s` maps (u, v) to (focus + s (u - focus), s v) before bending, so
every level curls with the tip and lies inside the one before. A ring
between two levels is cut into cells of equal length along its middle
line; each cell maps the unit square onto the ring, so every ornament is
drawn once and bends with the band. Cells squeezed thin at the tip are left
plain. The seed picks the shape, the core fraction (0.30-0.40), the ring
ornaments (no two neighbours alike), the core, the fringe and the border
ornament.

A pair turns the second boteh half a turn and searches 7 tilts x 24
directions for the closest gap-keeping offset that fits the page largest.
A repeat sets columns across the page, odd columns mirrored and dropped
half a row with one motif fewer. Fillers are scattered by seeded rejection
sampling, largest first, clear of every outline and of each other.

**Solving**

Nothing to solve: a design to colour or display. Meta records everything
that reproduces the art — the curve's coefficients and a plain-text
`formula`, the levels, ring ornaments, core, fringe, every placement
(offset, scale, rotation, mirror), the filler counts and the border — with
`rating_basis: "none: a design to colour or display"`.

**Guarantees**

- Same spec and seed, same page, byte for byte.
- Every level lies inside the one before it, and the outline never crosses
  itself (tested over many seeds).
- Pair and repeat motifs never overlap; fillers keep clear of the motifs.
- All ink stays inside the page margins.
- Line pages: every closed shape left white is at least 40 mm²; smaller
  closed shapes are inked solid. The default page passes the adult
  colouring check (`colorable: true` in meta, with `regions_to_colour` and
  `solid_small_shapes` counted). The check measures each closed outline;
  areas formed between strokes, such as the triangles beside a lattice of
  diamonds, are not measured separately.
