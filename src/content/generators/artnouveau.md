---
title: "Art Nouveau Panel"
blurb: "Art Nouveau panel: whiplash stems with poppies, irises and ginkgo leaves under a horseshoe or Guimard arch"
category: design
version: "1.0.0"
---
Whiplash stems, poppies, irises and ginkgo leaves rising under a horseshoe arch, over leaded glass.

## What it is

A decorative panel in the manner of Art Nouveau (about 1890–1910): tall flower stems
grow from the foot of an arched opening, each running almost straight and then
snapping into a curve — the "whiplash" line of the style — and ending in a flower, a
fan-shaped ginkgo leaf or a tight curl. Behind them the ground is divided by lead lines
into panes of stained glass, with a golden halo where the flowers gather. The arch is
a horseshoe (a circle wider than the opening below it) or a Guimard arch of two
curving shoulders that meet in a dip, as on the Paris Métro entrances; curls fill the
top corners of the frame.

Three palettes: soft golds, sage and rose in the manner of Alphonse Mucha's posters;
peacock blues, teal and emerald with gold; and line art to colour.

## How to use it

Frame it as a print, or colour the line-art version as a stained-glass window: give
each pane between lead lines its own pale tint, the halo gold, the stems and leaves
greens, and the flowers strong colours. Keep the lead lines dark.

## Purpose

Decorative wall art in one of the most loved styles, and a calm, flowing colouring
page with large panes for beginners and fine detail in the flowers.

## History

Art Nouveau — Jugendstil in Germany, Secession in Vienna, Stile Liberty in Italy,
Modernisme in Catalonia — turned away from historical revival toward forms taken from
plants. Hermann Obrist's embroidery *Cyclamen* (1895) was nicknamed "the whiplash"
(*Peitschenhieb*), giving the style's signature line its name. Hector Guimard's
cast-iron entrances for the Paris Métro (1900) and Alphonse Mucha's posters, with
their haloes, arches and flowing plants, are its best-known images; stained glass
and leaded windows carried it into homes. The page follows the style's grammar and
does not copy any work.

Sources: Stephen Escritt, *Art Nouveau* (Phaidon, 2000); Victoria and Albert Museum,
*Art Nouveau 1890–1914* (2000); Jiří Mucha, *Alphonse Maria Mucha: His Life and Art*
(1989); Norio Miura and Kenjiro Yoshida's papers on log-aesthetic curves, for the
curvature model.

## This implementation

**Spec knobs:** `arch` (auto, horseshoe, guimard); `flower` (mixed, poppy, iris,
ginkgo); `stems` (3–12, 0 = 5–8 by the seed); `tendrils` (fraction of stems that end
in a curl, 0–1); `leaves`; `leads` (lead lines across the ground, 0–8); `palette`
(auto, mucha_pastel, peacock, line_art); `stroke`; page `width`, `height`, `margin`.

**Generation:** each stem is integrated from a whiplash curvature profile: a small
constant curvature for the first 66–78% of its length, then curvature growing
exponentially, the other way, to a hook (flower stems) or a tight curl (tendrils). A
stem starts on the foot of the opening, leaning with its position, and is kept only
if it stays inside the opening and keeps a fixed spacing from every stem, flower and
leaf already placed (checked against sample points in a spatial grid) — the mutual
repulsion that keeps the panel airy. Flowers sit on the stem's end tangent; leaves
spring from the stem at about a quarter and two-fifths of its length. The ground is
the planar arrangement of the opening, the halo circle, a few wavy lead lines and the
stems; each face is a pane with its own tint, gold inside the halo. The horseshoe arch
is a circle 12% wider than the opening (flattened to an ellipse on a wide page); the
Guimard shoulders are clothoids fitted from the vertical sides into a slight dip at
the apex.

**Solving:** Nothing to solve.

**Guarantees:** no two stems cross or touch; every stem's curvature, measured by
finite differences along the drawn polyline, matches its whiplash profile to within 2%
of its largest curvature, with a curl that turns back against the stem's early bend;
all ink is on the page.
