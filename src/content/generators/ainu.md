---
title: "Ainu-Style Appliqué"
blurb: "Ainu-style appliqué in the manner of Ainu robes: mirror-symmetric bands curling into spirals and sprouting thorns, edged with chain stitch"
category: design
version: "1.0.0"
---
Bold mirror-symmetric bands that curl into spirals and sprout thorns, edged
with chain stitch, in the manner of the appliquéd robes of the Ainu.

## What it is

A design in the manner of Ainu robe decoration. Bands of dark cloth are
appliquéd onto lighter cloth, or light onto dark. They branch from a central
line, curl into spirals (*moreu*), put out pointed thorns (*ayus*) and
close round eye-like shapes (*sikurke*). A line of chain stitch follows
every edge, just inside the appliqué. The design is mirror-symmetric about
the centre line.

The page shows it in one of three ways. The default is the back of a robe:
a large design down the back, a band of repeating curls above the hem, and
bands at the sleeve cuffs. It can also be a rectangular panel with a large
design between two border bands, or a page of four border strips.

## How to use it

Fold the page down the middle, or hold a mirror to its centre line: the
two halves match exactly. Follow a band from the central spine out to the
tip of its curl, then look for the thorns on the outside of the curls and
the eye at the top of the spine. The chain stitch runs at the same distance
inside every edge, round every curl and into every thorn that has room
for it.

The line-art style is a colouring page. Colour the bands dark and leave the
cloth light, or the other way round, as Ainu makers did.

## Purpose

A celebration of a living textile art and of its grammar. A few shapes
(band, curl, thorn, eye) combine into flowing designs, and mirror symmetry
holds them together. Made for looking at and colouring.

## History

The Ainu are the Indigenous people of Hokkaido. They also lived in southern
Sakhalin, the Kuril Islands and the southern tip of Kamchatka. Their robes
are among the best-known Ainu arts. The *attus* is woven from the inner
bark fibre of the elm *at-ni* (*Ulmus laciniata*) and other trees. Later robes
were made of cotton obtained through trade. *Chikarkarpe* are cotton robes
decorated with appliqué and embroidery. *Ruunpe* are covered with
narrow appliquéd strips in curving patterns. Women made and decorated the
clothing, and the patterns were passed down from mother to daughter.

The designs are built from a small set of named shapes. *Moreu* is a
spiral or curl. *Ayus* is a thorn, a sharp point. *Sikurke* is an eye-like
shape. The decoration is placed on the back, at the hem, at the
openings of the sleeves and along the collar and front edges. It is
commonly said to protect the wearer, guarding the openings of the garment
against harmful spirits. Patterns and their meanings varied between
regions and families.

Under Japanese assimilation policies from the late nineteenth century,
Ainu language and customs were suppressed. Japan recognised the Ainu as an
Indigenous people in 2008, and an Ainu promotion law followed in 2019. The
Upopoy National Ainu Museum and Park opened in Shiraoi, Hokkaido, in 2020.
Today Ainu artists continue to make and teach embroidery and appliqué.

The designs on this page are invented from the general grammar of bands,
curls, thorns and eyes. They do not copy any robe, family pattern or
ceremonial object, and they are not Ainu work. They are an homage made by a
program.

## This implementation

- **Spec knobs:** `composition` is `robe` (default: the back of a robe
  with a back design, a hem band and two cuff bands), `panel` (a large
  design between two border bands) or `border` (four border strips).
  `style` is `indigo` (default: dark indigo appliqué on natural cloth,
  cream thread), `white` (white appliqué on indigo, red thread) or
  `line_art`. `weight` (0.5-2, default 1) scales the band width. `thorns`
  (default on) adds the thorns. `stitches` (default on) adds the chain
  stitch. `width`, `height` (200-3000 pt, default 600 × 800) and `margin`
  (0-200 pt and at most a quarter of the short side, default 24).
- **Generation:** everything is built on the right half and mirrored.
  Every band is a centre line stroked to a constant half-width with round
  caps. Curls are grown by stepping along the centre line and turning the
  heading, with a radius of curvature that shrinks linearly with the
  angle turned. The spiral tightens to an end radius still larger than
  the half-width, and its windings are kept a band and a gap apart. The
  large design starts with an eye (a lens-shaped ring with a lozenge) at
  the top of a spine on the centre line, ending in a thorn pointing down.
  The seed then grows two to four large curls from the spine. Up to 700
  smaller curls are tried from points along the bands already placed, each
  one kept only if its centre line stays a band width plus a gap away from
  every other band, from itself a turn round, and from its own mirror
  image, and only if its outline is a simple polygon. Thorns are curved
  spikes on the outside of curls, placed where the tip has room. Border
  strips have two bars and a row of units centred on the axis. Each unit
  is a stem with a pair of ram's-horn curls, and the seed picks whether
  units stand up, hang down or alternate (always matching their mirror
  partner). Thorns sit between the units. The cuffs are a strip turned
  upright on the right sleeve, then mirrored. All pieces, with their
  mirror images, are united into the appliqué. The chain stitch is the
  appliqué offset inward by 0.45 of the half-width, drawn as linked loops.
- **Guarantees:** the design is exactly mirror-symmetric: every vertex of
  the appliqué's outline, reflected in the centre line, lies on the
  outline (to 10⁻⁶ of the page size). Every band's outline is a simple
  polygon, and independently, no two points of a centre line a turn apart
  come closer than a band width, so no band overlaps itself. The united
  appliqué's rings are simple. Every vertex of the stitch line lies inside
  the appliqué at the stated inset from its edge (to 2 % of the half-width).
  Every border unit is placed on the pages tested (`dropped: 0`). All ink is inside the page.
  `verification: mirror_symmetric_simple_bands_constant_stitch_inset`. The
  line-art page reports the adult colourability check as `colorable`.
  Clamped knobs are reported as `requested_<field>`.
