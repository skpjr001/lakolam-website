---
title: "Aipan Rice-Paste Designs"
blurb: "Aipan: Kumaon-style rice-paste designs on red geru — a symmetric lotus chowki, dotted borders and a vasudhara threshold"
category: design
version: "1.0.0"
---
Designs in the manner of Kumaon aipan: white rice-paste lines and dots on a
red ochre ground, a lotus seat in the middle, borders all round and a
threshold of falling stripes.

## What it is

A design in the manner of *aipan*, the floor and wall art of Kumaon in the
hills of Uttarakhand, India. A surface is first coated with *geru*, a red
ochre clay. Then designs are drawn on it with the fingertips in *biswar*,
a white paste of soaked and ground rice: fine lines, rows of dots, petals
and creepers. This page builds one such composition. In the middle is a
*chowki*, a square or round seat-like diagram. Rings of lotus petals,
dots, waves, ladders and zigzags circle a central dot, and the chowki is
closed by a scalloped edge, a square frame or an eight-pointed star.
Round the page run nested borders of small repeated motifs. Near the foot
is a *vasudhara* band, a doorstep line with groups of white stripes
running down from it, each ending in a dot or a bud.

## How to use it

Look at the centre first: turn the page a quarter (or an eighth) of the way
round, or hold it to a mirror, and the chowki looks the same, although every
line wobbles a little like a hand-drawn one. Then follow a border all the
way round: its motif repeats evenly along every side and turns the corners
without a break. The line-art style is a colouring page. Traditionally
the ground is red and the lines are white, but any colours will do.

## Purpose

A celebration of a living folk art and of the geometry under it: rotation
and mirror symmetry, even spacing, bands that nest inside each other. Made
for looking, copying and colouring.

## History

Aipan (also written *aipana*; the word is usually traced to the Sanskrit
*alimpana*, "to smear or plaster") is practised in the Kumaon division of
Uttarakhand, in districts such as Almora, Nainital, Pithoragarh and
Bageshwar. It is mostly made by women and passed down from mother to
daughter. Aipan is drawn on courtyards, thresholds, steps, doorways and
the walls of shrines, and on wooden boards and seats used in ceremonies.
It is made for festivals such as Diwali, and for household rites like a
naming ceremony, a sacred-thread ceremony or a wedding. The ground is
geru, red ochre clay mixed with water. The designs are drawn in biswar
with the last fingers of the hand, which makes a dot-and-line style.

Different occasions call for different *chowkis*, the diagrams on which
a deity or a person is seated during a rite. The *vasudhara*, white
vertical lines drawn down the edges of steps, doorways and platforms, is
read as a stream of plenty. Traditional aipan also includes figures of
deities, footprints and sacred signs. This page leaves all of them out
and keeps to the decorative geometry: lotus, dots, creepers, waves,
ladders and stripes. Aipan is one of many Indian traditions of ritual
floor and wall painting, alongside *rangoli*, *alpana* in Bengal,
*mandana* in Rajasthan and *kolam* in Tamil Nadu. In recent decades it
has moved onto paper, cloth and household goods, and artists and
cooperatives in Kumaon teach and sell it. This page invents its own
compositions from the tradition's grammar. It does not reproduce any
particular chowki or its ritual use.

## This implementation

- **Spec knobs:** `width`, `height` (points, 200-3000; default 600 × 800);
  `margin` (0-200 pt, default 16). `fold` is `four` or `eight` (default):
  the chowki's symmetry. `chowki` is `auto` (default, picked by the seed),
  `round` or `square`; square gives a square seat at four-fold and an
  eight-pointed star of two squares at eight-fold. `borders` (0-5,
  default 3) is the number of nested borders. `vasudhara` (default on) is
  the threshold band. `dots` (default on) turns on the dotted fills.
  `wobble` (0-1, default 0.5; 0 = ruler-true) is how much the hand-drawn
  lines wander. `style` is `geru` (white paste on red ochre, default) or
  `lines` (black line art). `stroke` (0.3-3, default 1) is the line and
  dot weight.
- **Generation:** the page is divided into regions that do not overlap.
  Each border is a ring one band wide inside the last, and inside them
  the field is split into an upper part and the vasudhara band.
  The chowki is the largest square that fits the upper part, and small
  eight-petal flowers go in its corners when they fit clear of the chowki.
  The chowki is built from shapes placed in orbits of the dihedral group
  (order 8 or 16): an inner lotus of `fold` or `2·fold` petals, two rings
  of different small motifs (dots, wave, ladder, petals, zigzag), an outer
  lotus, and the closing outline. Every count is a multiple of the fold,
  and every circle and polygon is sampled at points the group maps onto
  each other. The hand wobble then moves each point along its radius by a
  seeded smooth noise (the workspace's ornament wobble noise) that depends
  only on the radius and on the angle folded into one wedge of the group,
  so every copy wobbles alike. Each border side holds `round(side /
  wanted pitch)` motif cells at pitch side / count, with corner cells at
  the four corners. Running motifs (waves, creepers, zigzags) are drawn
  as one closed line that turns each corner on a quarter circle, wobbled
  as a whole so it closes. Border and vasudhara lines get their own
  seeded wobble, and their dots a slight jitter. Every line sits at least
  (wobble + half its width) inside its region. The border motifs on one
  page are all different, picked by the seed.
- **Guarantees:** the chowki is exactly symmetric under its dihedral group:
  every line point and every dot, rotated or reflected by any group
  element, lands on a point of the design (to 10⁻⁶ of the radius), with the
  wobble on. Borders close seamlessly: count × pitch equals each side's
  length. Measured on a dot border, the motif positions are equally spaced
  and half a step from each corner cell, and the running lines are single
  closed lines with no gaps. No two bands overlap: every point of a
  border, widened by its line half-width or dot radius, lies inside its own
  ring and outside the next. The chowki, the vasudhara and the corner
  flowers also stay inside their own regions. All ink is inside the page,
  for every border count and page shape tested.
  `verification: chowki_exactly_symmetric_borders_close_bands_apart`. The
  line-art page reports the adult colourability check as `colorable`.
  Clamped knobs are reported as `requested_<field>`.
