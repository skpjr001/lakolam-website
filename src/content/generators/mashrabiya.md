---
title: "Mashrabiya"
blurb: "Mashrabiya screen of turned beads and spindles: fine upper lattice, open lower grid, central medallion"
category: design
version: "1.0.0"
---
A turned-wood lattice screen of beads and spindles — fine above, open below, with a medallion at its heart.

## What it is

A mashrabiya is a projecting window screen made of short lathe-turned wooden spindles
plugged into turned beads at every joint. The lattice lets air and a soft, broken light
through while hiding the people inside. Its patterns are made by which spindles are
put in: a plain grid, crosses of braced cells, eight-pointed stars, hexagons — and by
solid carved panels. A screen is divided into zones: a fine, close lattice high up
for privacy, a more open grid at eye level to look out through, often a round
medallion in the middle, and a solid panel at the foot.

This page draws such a screen in a rectangular or pointed-arch frame, with the light
glowing through it.

## How to use it

Display it as it is, or choose the line-art palette and colour it: each bead, each
spindle and each panel is its own shape. Colour the wood in one or two browns (or a
painted blue-green) and the light behind it in warm yellows fading to orange or dusk
blue. Fine felt-tips work best for the upper lattice.

## Purpose

A wall print of one of the great inventions of domestic architecture, and a detailed
colouring page whose small repeated parts are restful to fill.

## History

Turned-wood screens of this kind — mashrabiya in Egypt and the Levant, rawshan or
roshan in the Hijaz and Iraq, shanasheel in Basra — were built on houses across the
Islamic world from the Middle Ages to the early twentieth century; Cairo's surviving
examples are mostly Ottoman-period. The name is usually traced to a place where water
jars were set to cool in the breeze. Craftsmen (in Cairo, the *kharrat*, the turner)
assembled them from standard turned parts without glue, so a pattern is a choice of
which parts go where. The craft is still practised and revived, notably in Cairo. The
page is a geometric grammar in the manner of these screens; it does not copy any
particular building.

Sources: Hassan Fathy, *Natural Energy and Vernacular Architecture* (1986);
Jean-Claude Garcin et al., *Palais et maisons du Caire* (1982); Wikipedia,
"Mashrabiya"; Doris Behrens-Abouseif, *Islamic Architecture in Cairo* (1989).

## This implementation

**Spec knobs:** `frame` (auto, rect, arched); `grid` (auto, square, diagonal);
`upper` and `lower` zone patterns (auto, plain, cross, star, hexagonal, solid);
`medallion` (auto, star, cross, plain, none); `cells` (fine-lattice cells across,
8–40, 0 = 14–22 by the seed); `palette` (auto, walnut, dusk, painted, line_art);
`stroke`; page `width`, `height`, `margin`.

**Generation:** each pattern is a set of centre lines in lattice units about the
origin — the grid's nodes at half-integers so the origin is a cell centre: the plain
grid; the grid with plus-shaped clusters of cross-braced cells every four cells; an
eight-pointed star of a 5×5 square interlaced with a diamond of radius 4 (both through
grid nodes) every ten cells, with the grid between; or elongated hexagons on the
lattice spanned by (3, 1) and (3, −1). The pattern is placed with its origin at the
zone's centre, scaled by the zone's pitch (the lower grid is 1.6–2× coarser), turned
45° for the diagonal grid (hexagons stand upright instead), and clipped to the zone;
the medallion is clipped to the exact circle of its ring. Beads and capsule spindles
come from the clipped centre lines; a cut spindle runs to the rail, frame or ring it
was cut by. Light behind the screen is a radial glow centred on the medallion.

**Solving:** Nothing to solve.

**Guarantees:** every spindle and bead is connected, through other spindles, to the
frame (the test builds the planar graph of all centre lines and checks one component
with the frame, rails and ring); the plain, cross and star patterns have the full
symmetry of the square (D4) and the hexagons both mirrors (D2); every zone is mirror
symmetric about the screen's axis, and the medallion has four-fold rotational and
mirror symmetry; all ink is on the page.
