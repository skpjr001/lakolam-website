---
title: "Khokhloma-Style Lacquer Painting"
blurb: "Khokhloma-style lacquer painting: curling travka vines, berries and leaves in red and black on gold, or gold on black or red"
category: design
version: "1.0.0"
---
Curling grass, rowan berries and strawberries brushed in red and black on gold,
in the manner of the lacquered wooden tableware of the Nizhny Novgorod region.

## What it is

A painted wooden ware seen from above — a round plate, a bowl, a rectangular
panel or a spoon — decorated in the manner of Khokhloma painting. Its heart is
*travka*, "little grass": a main vine that sweeps across the ware in an S and
ends in spiral curls, with side shoots that leave it smoothly and end in more
curls, in clusters of rowan berries, currants, strawberries, leaves or small
flowers. Along every stem sit single brush strokes — commas with a pressed
head and a hairline tail, slender sedge blades (*osochka*) pointed at both
ends, and droplets — alternating sides and colours. A plate or bowl has a
painted rim band with a brushed wave and droplets in its hollows.

Four styles: *verkhovoe* ("upper" painting), red and black strokes on a gold
ground; two kinds of *fonovoe* ("background" painting), where the motifs
stay gold and the ground round them is painted black or red; and black line
art for colouring.

## How to use it

Print the colour pages as pictures, or use them as a plan for painting a
wooden plate, box lid or spoon. Painters work freehand with a soft squirrel-hair
brush: lay the main stem first, then the shoots, then the grass strokes — each
one a single touch, pressing and lifting the brush — and finish with the
berries, round and full, with a tiny light dot of highlight. To colour the
line-art page, keep to the three Khokhloma colours: gold (yellow or ochre)
for the ground, red and black for the strokes and berries, and use the two
stroke colours in turn along a stem.

## Purpose

Khokhloma is a brush grammar: a small set of strokes, each made with one
movement, combined by simple rules into rich, living ornament. These pages
grow new compositions from those rules, so every one is different but each
reads as travka — smooth vines, rhythmic strokes, nothing crowding anything
else.

## History

Khokhloma painting takes its name from the trading village of Khokhloma on
the left bank of the Volga, in today's Nizhny Novgorod region, where wares
from the surrounding forest villages were sold from the seventeenth century
onward. Its famous gold contains no gold: turned wooden ware is primed with
clay, oiled, rubbed with tin powder (aluminium powder since the twentieth
century), painted, coated with linseed varnish and baked in an oven, where the
varnish turns amber and the silver metal beneath it glows like gold. Painters
distinguish *verkhovoe* (upper) painting, in which red and black motifs are
laid over the gold — travka grass, the "under-the-leaf" and "berry" patterns
— from *fonovoe* (background) painting, in which the ground is filled in
black or red so the motifs remain gold, including the curling *kudrina*.
The craft is carried on today chiefly in the town of Semyonov and in the
villages of the Koverninsky district, where the enterprises "Khokhlomskaya
Rospis" and "Khokhlomskoy Khudozhnik" train painters. The compositions on
these pages are original arrangements in the manner of the tradition; they
copy no particular painter's or workshop's work.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000); `ware` (`auto`,
  `plate` — the default — `bowl`, `panel`, `spoon`; auto picks by seed);
  `style` (`verkhovoe` — default — `fonovoe_black`, `fonovoe_red`, `lines`);
  `density` (0.2-1, default 0.75: shoots, grass strokes and gap shoots grow
  denser); `berries` (end some shoots in rowan, currants and strawberries);
  `rim` (the painted rim band); `brush` (0.5-2, default 1: stroke weight).
- **Generation:** every mark is a tapered brush stroke round a centreline
  grown by integrating a curvature profile; widths follow per-stroke profiles
  (comma, droplet, blade, leaf) and are clamped to 0.7 of the local radius of
  curvature, so the two edges never fold over. The main vine is an S of two
  arms whose curvature rises as a power of arc length (a curl: curvature that
  only grows has nested osculating circles, so it never crosses itself); on
  a panel the arms also wave, a bowl gets a wavy garland round its wall with
  curls at both ends and a rosette in the well, a spoon an S in its bowl and
  a waving vine up the handle. Each vine is scaled down from oversize until it
  fits the field with room to spare. Shoots leave a vine at one of its
  samples with the vine's heading and turn away through a quickly relaxing
  fillet; they are tried at shrinking lengths until they fit. Then shoots
  reach from the nearest vine into the largest remaining gaps, and grass
  strokes sit along every vine, alternating sides and red/black. An occupancy
  grid of inked discs (with a gap) keeps every piece clear of the others; a
  piece that cannot fit is dropped, never squeezed. Line art fills stems and
  marks too small to colour (under about 40 mm²) in black.
- **Guarantees:** deterministic per seed. Tested: every brush mark is a
  simple polygon; every mark and berry lies inside the ware's silhouette; vines
  are G1 — no step turns more than 0.35 rad or leaves its heading, and every
  shoot starts at a parent sample with exactly the parent's heading; the ware
  and its shadow lie on the page; the line-art page passes the adult
  colourability check. `verification: strokes_simple_inside_ware_vines_g1`.
  Clamped knobs are reported as `requested_<field>`.
