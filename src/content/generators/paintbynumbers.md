---
title: "Paint by Numbers"
blurb: "Paint by numbers from a picture: an upload (or a built-in picture) quantised to a palette, cleaned into printable regions, outlined and numbered, with a palette key and the painted picture as the answer key"
category: design
version: "1.0.0"
---
Your picture as a paint-by-numbers page: outlined shapes, a number in each,
and a key that says which colour goes where.

## What it is

A page that turns a picture into a paint-by-numbers canvas. Upload a photo
or a drawing (or use one of the built-in pictures, set against a sunburst
backdrop) and the picture's colours are reduced to a small palette. Every
patch of one colour becomes a shape with an outline, and each shape carries
the number (or letter) of its colour. Below the picture, a key shows each
number beside a swatch of its colour. Paint or colour every shape in its
key colour and the picture comes back.

The answer page is the finished picture, painted. A tinted version of the
page, with each shape washed in a pale hint of its colour, is also available.

## How to use it

Find the colour key under the picture. Pick a colour, find every shape that
carries its number, and fill each one in, right up to its outline. Then move
on to the next colour. Working from light colours to dark ones keeps the
page clean, and filling the large background shapes first makes the picture
appear quickly. Paints, coloured pencils and felt pens all work; with
paint, a thin brush helps along the outlines. The numbers are printed in a
light grey so a coat of paint covers them.

For your own picture, choose one with a clear subject and a few strong
colours: a pet on a plain background, a flower, a bright landscape. Fewer
colours and larger shapes make a quicker, easier page; more colours and
smaller shapes make a more detailed one.

## Purpose

To make painting approachable: the page decides the shapes and the colours,
so anyone can produce a recognisable picture and learn to look at colour as
flat areas, which is how many painters plan a picture. It also turns a
family photo, a pet or a holiday view into a personal craft project.

## History

Numbered colour guides are old: Michelangelo's workshop and later
fresco-painters gave assistants marked-up cartoons, and nineteenth-century
colouring books for children sometimes printed coloured models beside the
outlines. The modern kit was devised by Dan Robbins, a commercial artist at
the Palmer Paint Company in Detroit, who in 1950 adapted the numbered
patterns Leonardo da Vinci was said to have used for his apprentices. Palmer
sold the kits as "Craft Master" from 1951; by 1954 they had sold some twelve
million, and paint by numbers became a defining craze of 1950s America
(Robbins told the story in *Whatever Happened to Paint-By-Numbers?*, 1997;
the Smithsonian's National Museum of American History held the exhibition
"Paint by Number" in 2001).

Making a kit from any photograph is a computing problem: reduce the colours
(colour quantisation — Paul Heckbert's median cut, 1982, or k-means
clustering, after Stuart Lloyd, 1957, published 1982, with the k-means++
start of Arthur and Vassilvitskii, 2007), clean the regions, and find room
for each number. The deepest point of a region, its "pole of
inaccessibility", is found with a Euclidean distance transform (Felzenszwalb
and Huttenlocher, 2004/2012); the outlines are simplified with the
Douglas–Peucker algorithm (1973) and rounded by Chaikin's corner cutting
(1974).

## This implementation

- **Spec knobs:** `image` (a PNG or JPEG as a data URL or base64; empty uses
  a built-in picture chosen by the seed), `colours` (palette size at most,
  6-30, default 12), `min_region_mm2` (detail: the smallest region in mm² at
  print size, 10-400, default 40), `labels` (numbers or letters),
  `palette_key` (the numbered swatches under the picture), `style` (line:
  outlines and numbers on white; colour: each region washed with a 30% tint
  of its colour), `stroke` (outline weight, 0.3-3 pt), `width`, `height`
  (144-2000 pt), `margin` (0-144 pt). Numbers out of range are clamped and
  the request recorded as `requested_<field>` in meta.
- **Generation:** the picture is read at 360 px on its longer side. A
  built-in picture (one of the icon set, chosen by the seed) is staged: lit
  from the top left so its flat colours shade, and its paper replaced by a
  graded backdrop with a 16-ray sunburst and a halo, from one of six named
  backdrops chosen by the seed. Colours are quantised by k-means in CIELAB
  (D65) from a seeded k-means++ start, over every exact colour (or 15-bit
  bins for photos with more than 4096 colours). A 3x3 majority filter (three
  passes) removes speckle. Then, repeatedly, every 4-connected region under
  the minimum area (times 1.15, so smoothing never takes a drawn region
  under it) or too narrow to hold its number at 5 pt joins the neighbour it
  shares the longest border with (ties: nearest colour, then lowest id).
  Boundaries are traced on the pixel-corner lattice into chains between
  junctions, each shared border drawn once, simplified (Douglas–Peucker,
  1.1 px) and rounded (two Chaikin rounds) with the junctions fixed. The
  palette is renumbered over the colours still used, lightest first. Each
  number sits on its region's deepest pixel by the distance transform, at
  the largest size from 5 to 9 pt that keeps its ink clear of the outline.
- **Solving:** nothing to solve. The answer key is the picture painted: each
  region filled in its palette colour, outlines faint, with the key.
- **Guarantees:** every region carries exactly one mark from the key, placed
  inside it, and the mark's ink box is checked against the drawn outline so
  it touches no line (meta `tightest_number_gap_pt`); every key colour is
  used; regions tile the picture; every region as drawn is at least
  `min_region_mm2`; all ink lies inside the margins (meta `page_checked`).
  The line page is checked with the adult colouring rules on its regions
  (each region a closed outline at the page's line weight): the default
  passes (`colorable: true`); a `min_region_mm2` below 40 can fall under the
  adult 40 mm² floor and the page then says `colorable: false`. Meta records
  the palette (marks, hex, CIELAB), the picture source, region count,
  smallest region and number sizes, and `rating_basis`.
