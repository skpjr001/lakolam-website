---
title: "Damask"
blurb: "Damask and arabesque ornament: mirror-symmetric medallions of S- and C-scrolls, acanthus leaves, buds and a central vase or palmette, alone or as a half-drop wallpaper"
category: design
version: "1.0.0"
---
Mirror-symmetric damask medallions of curling scrolls, acanthus leaves and
buds, alone or repeated as an all-over half-drop wallpaper.

## What it is

Damask is the classic ornament of patterned silks and wallpapers: a tall
medallion, the same on its left and right, built around a central stem. A
vase, palmette or onion dome sits on the axis with a pointed finial above
it and a pendant below, strung with beads. From the stem, scrolls sweep
outward and curl into tight spirals: C-scrolls that bend one way, S-scrolls
that bend one way and then the other. Leaves with lobed, notched edges like
the acanthus sprout from the scrolls, and buds, small flowers, curling
tendrils and beads fill the gaps. Every medallion is different, and every
one is exactly symmetric.

The page shows one large medallion, or a wallpaper of them in a half-drop
repeat: each column of medallions sits half a step lower than the columns
beside it, so the medallions interlock diagonally in the way damask
wallpaper and fabric are printed and woven.

## How to use it

As a colouring page, the line style gives black outlines on white. Every
shape is a closed outline with a little white ground between it and its
neighbours, so each can be filled on its own; the tiny beads are already
solid black. Because the two halves match exactly, a colour scheme repeated
on both sides looks deliberate and calm. Try two colours only for the
look of a woven damask, or colour each kind of shape (scrolls, leaves,
buds, the central vase) in its own colour.

The colour style prints the design ready to use: two-tone damask in gold on
burgundy, cream on navy, silver on charcoal, ivory on sage or rose on cream,
or a multi-colour jewel or tapestry scheme. Print the wallpaper as gift
wrap, a scrapbook or journal sheet, a card background or a framed print;
print one medallion for a card front, a stencil or an appliqué pattern.

## Purpose

Damask is one of the most recognised ornaments in interiors and stationery,
and one of the most satisfying to colour: large, flowing shapes in a strict
symmetry that makes even a quick colour scheme look composed. The generator
draws a fresh medallion for every seed while keeping what makes damask
read as damask: the axis, the stacked vase and finial, the curled scrolls
and leaves, the silhouette shapes separated by thin lines of ground, and
the half-drop repeat.

## History

The name comes from Damascus, a great centre of the silk trade in the
Middle Ages; Britannica ties the word to the fine patterned fabrics made
or traded there. True damask is a weave, not a print: one face of the
pattern is satin weave and the other a contrasting weave, so the design
shows as a play of light on cloth of a single colour (two-tone damask and
"tone on tone" both come from this). Italian silk weavers of the fourteenth
and fifteenth centuries made the large symmetric pomegranate and palmette
patterns that the word still calls to mind. Joseph-Marie Jacquard's
punched-card loom (1804) made complex figured weaving cheap, and damask
patterns spread to furnishing fabrics and table linen.

The ornament itself draws on two older traditions. The acanthus leaf,
with its deeply lobed edges, has decorated architecture since the
Corinthian capital of ancient Greece (Vitruvius tells the story of
Callimachus and the basket overgrown with acanthus). The arabesque, an
endless scrolling stem bearing leaves and flowers, was developed in
Islamic art and taken into European ornament in the Renaissance. Owen
Jones's The Grammar of Ornament (1856) set out the principles these
patterns share, among them symmetry, flowing lines growing from a parent
stem, and the repetition of a unit over a surface.

Damask moved to the wall as flock and printed wallpaper from the
seventeenth and eighteenth centuries, imitating the costly silk hangings
of the time, and stayed a favourite through the Victorian age and again
in the late twentieth century. Wallpaper and fabric designs are commonly
laid out as a half-drop repeat, in which every other column is shifted by
half the repeat height so that the motifs interlock diagonally.

Sources: Encyclopaedia Britannica, "damask"; Wikipedia, "Damask";
Vitruvius, De architectura, Book IV; Owen Jones, The Grammar of Ornament
(1856); Alois Riegl, Stilfragen (1893), on the acanthus and the arabesque.

## This implementation

**Spec knobs**

- `layout`: `allover` (default; a wallpaper in a half-drop repeat, clipped
  to the margins with a border line) or `single` (one large medallion).
- `style`: `line` (default; black outlines on white) or `colour`.
- `palette` (colour style only): `gold_on_burgundy`, `cream_on_navy`,
  `silver_on_charcoal`, `ivory_on_sage`, `rose_on_cream` (two-tone: every
  shape in the one ink, the vase's inlay cut back to the ground), `jewel`
  and `tapestry` (multi-colour by kind of shape).
- `columns` (allover only): medallion columns across the page, 1-6; 0 lets
  the seed choose 2 or 3.
- `detail`: how many leaves, buds, flowers, tendrils and beads, 1-5; 0
  lets the seed choose 2-4.
- `width`, `height` (144-2000 pt), `margin` (0-144 pt, at most 30% of the
  shorter side), `stroke` (0.75-4 pt).
- Out-of-range values are clamped and reported in meta as
  `requested_<field>`.

**Generation**

The medallion is built in a unit frame (axis x = 0, half-width 1,
half-height 1.3-1.5) inside an envelope of two superellipse halves, pointed
at top and bottom like an ogee. In order, each shape checked against all
placed ones (outline simple, inside the envelope, at least a gap from
every other shape, neither inside another):

1. The spine: finial (flame, bud or palmette), body (vase, palmette or
   onion dome, with a smaller copy nested inside as an inlay where it fits),
   pendant (drop, bud or downward palmette) and beads. Each piece is a half
   profile from axis to axis joined to its own reflection, and is narrowed
   until it fits.
2. Two or three scrolls on the right half (upper, lower, and often a
   waist scroll). A scroll's centre line is the curve whose curvature is
   `k(u) = c (u - u0) |u - u0|^(p-1)` along its length (`u0 = 0` gives a
   C-scroll, `u0 > 0` an S-scroll), integrated from a root beside the
   spine. Curvature growing monotonically away from the inflection makes
   each curled end a spiral whose osculating circles are nested
   (Tait-Kneser), so the centre line cannot cross itself. The ribbon's
   half-width tapers and is held under 0.45 of the radius of curvature, and
   turns of the curl are checked to stay apart. Of up to 70 seeded
   candidates the one with the largest area times turning is kept.
3. Acanthus leaves (2-4 lobes a side, notched, slightly bent) sprouting
   from the scrolls; then buds, five- or six-petalled flowers with a solid
   eye, small curled tendrils and beads in the gaps, larger first.
4. The right half is reflected (x negated, exactly) to make the left.

Outlines are drawn as Catmull-Rom splines (cubic Béziers) through knots
thinned from the dense outlines, with true corners at leaf tips and
notches. The half-drop repeat uses the smallest column spacing at which
the envelope and its neighbour half a row down stay a gap apart (found by
bisection). Meta records the envelope, every spine piece, every scroll's
root, heading, length, turning, power, inflection and width, the ornament
counts, the scale and the repeat in points.

**Solving**

Nothing to solve: a design to colour or display.

**Guarantees**

- Each medallion is exactly mirror-symmetric: every left-half shape is the
  bit-exact reflection of a right-half shape, and every axis piece is its
  own reflection (tested).
- Every outline is a simple closed curve; shapes in a medallion keep a
  gap of ground between them and lie inside its envelope; neighbouring
  medallions of the half-drop repeat never touch (tested).
- The default line page passes the design lane's colourability check
  (adult rules: regions of 40 mm² or more, strokes of at least 0.75 pt,
  ink under 55%); shapes too small to colour are drawn solid, and their
  count is in meta as `solid_accents`.
- All ink lies inside the margins (the wallpaper is clipped to them).
- Same spec and seed, same page.
