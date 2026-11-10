---
title: "Alpana Floor Art"
blurb: "Alpana: Bengal-style freehand rice-paste floor art — a whirling rosette of petals, spirals and dot rings, a curling creeper border and a paddy-sheaf row"
category: design
version: "1.0.0"
---
Floor art in the manner of Bengal's alpana: freehand white rice-paste
rosettes of lotus petals, spirals and dots, with a curling creeper border
and a row of paddy sheaves.

## What it is

A design in the manner of *alpana* (also written *alpona*), the floor
painting of Bengal. It is drawn with the fingers in *pithali*, a white
paste of soaked and ground rice, on a swept floor, a courtyard or a
red-earth threshold. Alpana is drawn freehand, without a grid of dots. Its
lines are round and flowing: lotus petals open ring after ring, spirals
and tendrils curl, creepers wind round the edge.

This page builds one such design. In the middle is a large round rosette.
A small whorl surrounds a central dot, and ring after ring is drawn round
it: lotus petals standing on a circle, big and small petals in turn,
double spirals, a creeper with a curl in every bend, rows of dots and
leaves that lean like a pinwheel. A scalloped rim closes the rosette.
Round the page runs a creeper (*lata*) border whose tendrils curl into
each bend, and inside it a row of paddy sheaves heavy with grain. Small
flowers or fish fill the corners.

## How to use it

Start at the centre and follow the rings outwards. Turn the page by one
petal, an eighth of a turn for an eight-fold rosette, and the rosette
looks exactly the same. The curls and leaves all turn the same way, which
makes the rosette seem to spin. Every line wobbles a little, as a line drawn
with a finger does. Follow the creeper round the page: it never breaks, it
turns each corner smoothly and comes back to where it started. The
line-art style is a colouring page: traditionally the ground is red earth
and the lines are white.

## Purpose

A celebration of a living tradition of women's floor art and of its
flowing, freehand geometry: rotation symmetry, rings that never crowd each
other, and a border that closes on itself. Made for looking, copying and
colouring, and as a pattern to draw by hand.

## History

Alpana is drawn across Bengal, in West Bengal in India and in Bangladesh.
It has long been made by women, on floors, courtyards, doorsteps and on
the low wooden seats and pots used in household rites. Many designs belong
to *bratas*, vows and rites kept by women and girls through the year, and
to festivals and family occasions such as harvest celebrations and
weddings. The paste is poured from a soaked rag or trailed from the
fingertips, so lines are smooth and continuous and dots are dabbed with a
fingertip. Favourite motifs include the lotus, paddy sheaves and rice
stores, creepers, fish, birds, the sun and moon, and many sacred signs
such as footprints of a goddess. This page keeps to the plant, fish and
geometric motifs and leaves sacred figures and signs out.

In the early twentieth century the artist Abanindranath Tagore wrote about
women's bratas and their alpana, and alpana became part of the teaching at
Kala Bhavana, the art school of Visva-Bharati in Santiniketan, under the
painter Nandalal Bose. Today alpana is drawn for festivals in homes, schools
and streets across Bengal. In Bangladesh, long alpanas are painted along
roads for Pohela Boishakh (the Bengali New Year) and for Language Movement
Day on 21 February. Alpana belongs to a wide family of Indian ritual floor
and wall art, including *kolam* in Tamil Nadu, *rangoli* in western and
northern India, *mandana* in Rajasthan and *aipan* in Kumaon. Unlike kolam
it uses no dot grid, and unlike rangoli it is drawn in paste, not coloured
powder. This page invents its own compositions in the manner of the
tradition. It does not reproduce any particular alpana or its ritual use.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000; default 600 × 800);
  `margin` (0-200 pt, default 16). `fold` (6-12, default 8) is the
  rosette's rotation symmetry. `rings` (3-7, default 4) is the number of
  motif rings between the centre and the rim. `borders` (0-2, default 2):
  0 none, 1 the creeper, 2 the creeper and a row of paddy sheaves.
  `corners` is `auto` (default: flowers or fish, picked by the seed),
  `none`, `flowers` or `fish`. `wobble` (0-1, default 0.5; 0 =
  ruler-true) is how much the freehand lines wander. `style` is
  `terracotta` (white paste on a red-earth floor, default), `dark_earth`
  (white on dark earth) or `lines` (black line art). `stroke` (0.3-3,
  default 1 = a fingertip) is the line and dot weight.
- **Generation:** the rosette's radius is split into annuli: a centre
  whorl, the chosen rings (the first is always a lotus; the rest are
  picked by the seed, never the same twice running) and a scalloped rim,
  each as deep as its kind needs. Each ring is drawn once in a wedge of
  angle 2π/`fold`. Petal widths are worked out so neighbouring petals
  nearly meet. Spirals and curls are Euler-spiral (clothoid) hooks. Each
  line is given its hand wobble (smooth seeded noise along its normal),
  then the wedge is rotated `fold` times. If a ring's motif does not fit
  its annulus and wedge, it is shrunk step by step until it does. Running
  lines (petal base circles, the creeper wave, the scalloped rim) are
  drawn per wedge from a radius that repeats every wedge, so the copies
  meet end to end. The creeper border is a wave `A·sin(2πs/λ)` about a
  rounded rectangle's centre line, with `λ` the perimeter over a whole
  number of waves. Its wobble is cross-faded over the loop, so the line
  still closes. A curl grows from every crest and trough, starting on
  the creeper with the creeper's own heading. It turns into the bend and
  is shortened until it clears the creeper and stays inside the band.
  Paddy sheaves are bowed stems with grains along the ear, a whole number
  of them round their own rounded rectangle. Corner motifs are as large
  as fits clear of the rosette.
- **Guarantees:** the rosette is exactly `fold`-fold rotationally
  symmetric: every line point and dot, turned by 2π/`fold`, lands on a
  point or dot of the rosette (to 10⁻⁶ of its radius), wobble included,
  for every fold from 6 to 12. No two rings overlap: every point of a ring,
  widened by its line half-width or dot radius, lies in that ring's own
  annulus, and the annuli follow each other in order. The creeper is one
  closed line with no gap, and no kink anywhere, its seam included
  (consecutive segments turn by less than 0.35 rad). Every curl starts
  exactly on the creeper along its tangent (G1, within 0.1 rad). Each
  border's ink lies inside its own band, and the corner motifs stay
  inside the field, clear of the rosette. All ink is inside the page, for
  every style and the page shapes tested.
  `verification: rosette_exactly_rotational_rings_apart_creeper_closes_g1`.
  The line-art page reports the adult colourability check as `colorable`.
  Clamped knobs are reported as `requested_<field>`.
